import { readFile } from "node:fs/promises";

const VALID_STEP_TYPES = new Set(["task", "approval", "adapter_call", "wait", "notify"]);

export async function loadWorkflow(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export function validateWorkflow(workflow) {
  const errors = [];

  if (!workflow || typeof workflow !== "object") {
    return ["workflow must be an object"];
  }

  for (const field of ["id", "version", "name"]) {
    if (!workflow[field] || typeof workflow[field] !== "string") {
      errors.push(`workflow.${field} must be a non-empty string`);
    }
  }

  if (!Array.isArray(workflow.steps) || workflow.steps.length === 0) {
    errors.push("workflow.steps must be a non-empty array");
    return errors;
  }

  const stepIds = new Set();

  for (const [index, step] of workflow.steps.entries()) {
    const prefix = `steps[${index}]`;

    if (!step || typeof step !== "object") {
      errors.push(`${prefix} must be an object`);
      continue;
    }

    if (!step.id || typeof step.id !== "string") {
      errors.push(`${prefix}.id must be a non-empty string`);
    } else if (stepIds.has(step.id)) {
      errors.push(`duplicate step id: ${step.id}`);
    } else {
      stepIds.add(step.id);
    }

    if (!VALID_STEP_TYPES.has(step.type)) {
      errors.push(`${prefix}.type must be one of ${Array.from(VALID_STEP_TYPES).join(", ")}`);
    }

    if (!step.name || typeof step.name !== "string") {
      errors.push(`${prefix}.name must be a non-empty string`);
    }

    if (step.dependsOn !== undefined && !Array.isArray(step.dependsOn)) {
      errors.push(`${prefix}.dependsOn must be an array when provided`);
    }

    if (step.type === "approval") {
      if (!step.approval?.role || !step.approval?.prompt) {
        errors.push(`${prefix}.approval requires role and prompt`);
      }
    }

    if (step.type === "adapter_call") {
      if (!step.adapter?.name || !step.adapter?.action) {
        errors.push(`${prefix}.adapter requires name and action`);
      }
    }

    if (step.retry) {
      if (!Number.isInteger(step.retry.maxAttempts) || step.retry.maxAttempts < 1) {
        errors.push(`${prefix}.retry.maxAttempts must be an integer >= 1`);
      }
      if (!Number.isInteger(step.retry.delaySeconds) || step.retry.delaySeconds < 0) {
        errors.push(`${prefix}.retry.delaySeconds must be an integer >= 0`);
      }
    }
  }

  for (const step of workflow.steps) {
    if (!step || typeof step !== "object") {
      continue;
    }

    for (const dependency of step.dependsOn ?? []) {
      if (!stepIds.has(dependency)) {
        errors.push(`step ${step.id} depends on missing step ${dependency}`);
      }
      if (dependency === step.id) {
        errors.push(`step ${step.id} cannot depend on itself`);
      }
    }
  }

  const cycle = findCycle(workflow.steps.filter((step) => step && typeof step === "object"));
  if (cycle.length > 0) {
    errors.push(`cycle detected: ${cycle.join(" -> ")}`);
  }

  return errors;
}

export function getExecutionOrder(workflow) {
  const errors = validateWorkflow(workflow);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const byId = new Map(workflow.steps.map((step) => [step.id, step]));
  const visited = new Set();
  const order = [];

  function visit(step) {
    if (visited.has(step.id)) {
      return;
    }

    for (const dependency of step.dependsOn ?? []) {
      visit(byId.get(dependency));
    }

    visited.add(step.id);
    order.push(step);
  }

  for (const step of workflow.steps) {
    visit(step);
  }

  return order;
}

export async function runWorkflow(workflow, options = {}) {
  const executionOrder = getExecutionOrder(workflow);
  const autoApprove = options.autoApprove ?? true;
  const auditLog = [];
  const outputs = {};

  for (const step of executionOrder) {
    const event = await simulateStep(step, { autoApprove });
    auditLog.push({
      stepId: step.id,
      stepType: step.type,
      status: event.status,
      message: event.message
    });
    outputs[step.id] = event.output ?? {};
  }

  return {
    workflowId: workflow.id,
    status: "completed",
    stepsRun: executionOrder.length,
    outputs,
    auditLog
  };
}

async function simulateStep(step, { autoApprove }) {
  if (step.type === "approval") {
    return {
      status: autoApprove ? "approved" : "waiting_for_approval",
      message: `${step.approval.role} approval ${autoApprove ? "auto-approved" : "required"}`,
      output: { approved: autoApprove }
    };
  }

  if (step.type === "adapter_call") {
    return {
      status: "simulated",
      message: `mock adapter call: ${step.adapter.name}.${step.adapter.action}`,
      output: {
        adapter: step.adapter.name,
        action: step.adapter.action,
        simulated: true
      }
    };
  }

  if (step.type === "wait") {
    return {
      status: "skipped_wait",
      message: "wait step represented but not delayed in local runner"
    };
  }

  if (step.type === "notify") {
    return {
      status: "recorded",
      message: step.description ?? "notification recorded"
    };
  }

  return {
    status: "completed",
    message: step.description ?? `${step.name} completed`,
    output: step.output ?? {}
  };
}

function findCycle(steps) {
  const byId = new Map(steps.filter(Boolean).map((step) => [step.id, step]));
  const visiting = new Set();
  const visited = new Set();

  function visit(step, path) {
    if (!step?.id) {
      return [];
    }
    if (visiting.has(step.id)) {
      const cycleStart = path.indexOf(step.id);
      return path.slice(cycleStart).concat(step.id);
    }
    if (visited.has(step.id)) {
      return [];
    }

    visiting.add(step.id);
    for (const dependency of step.dependsOn ?? []) {
      const cycle = visit(byId.get(dependency), path.concat(step.id));
      if (cycle.length > 0) {
        return cycle;
      }
    }
    visiting.delete(step.id);
    visited.add(step.id);
    return [];
  }

  for (const step of steps) {
    const cycle = visit(step, []);
    if (cycle.length > 0) {
      return cycle;
    }
  }

  return [];
}
