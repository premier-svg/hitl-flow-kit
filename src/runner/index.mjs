import { readFile } from "node:fs/promises";

const VALID_STEP_TYPES = new Set(["task", "approval", "adapter_call", "wait", "notify"]);

export async function loadWorkflow(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export function validateWorkflow(workflow) {
  const errors = [];

  if (!workflow || typeof workflow !== "object") {
    return ["[Validation Error] The workflow definition must be a valid JSON object."];
  }

  for (const field of ["id", "version", "name"]) {
    if (!workflow[field] || typeof workflow[field] !== "string") {
      errors.push(`[Validation Error] Missing root field: 'workflow.${field}' must be a non-empty string.`);
    }
  }

  if (!Array.isArray(workflow.steps) || workflow.steps.length === 0) {
    errors.push("[Validation Error] 'workflow.steps' must be an array containing at least one step.");
    return errors;
  }

  const stepIds = new Set();

  for (const [index, step] of workflow.steps.entries()) {
    // DX Improvement: Try to use the step ID for context, fallback to index
    const stepRef = step?.id ? `Step '${step.id}'` : `Step at index ${index}`;

    if (!step || typeof step !== "object") {
      errors.push(`[Validation Error] ${stepRef} must be a valid JSON object.`);
      continue;
    }

    if (!step.id || typeof step.id !== "string") {
      errors.push(`[Validation Error] ${stepRef} is missing a required 'id' string.`);
    } else if (stepIds.has(step.id)) {
      errors.push(`[Validation Error] Duplicate step ID found: '${step.id}'. Step IDs must be unique.`);
    } else {
      stepIds.add(step.id);
    }

    if (!VALID_STEP_TYPES.has(step.type)) {
      errors.push(`[Validation Error] ${stepRef} has an invalid type '${step.type}'. Allowed types: ${Array.from(VALID_STEP_TYPES).join(", ")}.`);
    }

    if (!step.name || typeof step.name !== "string") {
      errors.push(`[Validation Error] ${stepRef} is missing a required 'name' string.`);
    }

    if (step.dependsOn !== undefined && !Array.isArray(step.dependsOn)) {
      errors.push(`[Validation Error] ${stepRef} 'dependsOn' property must be an array of string IDs.`);
    }

    if (step.type === "approval") {
      if (!step.approval?.role || !step.approval?.prompt) {
        errors.push(`[Validation Error] ${stepRef} is type 'approval' but missing required 'approval.role' or 'approval.prompt' properties.`);
      }
    }

    if (step.type === "adapter_call") {
      if (!step.adapter?.name || !step.adapter?.action) {
        errors.push(`[Validation Error] ${stepRef} is type 'adapter_call' but missing required 'adapter.name' or 'adapter.action' properties.`);
      }
    }

    if (step.retry) {
      if (!Number.isInteger(step.retry.maxAttempts) || step.retry.maxAttempts < 1) {
        errors.push(`[Validation Error] ${stepRef} 'retry.maxAttempts' must be an integer >= 1.`);
      }
      if (!Number.isInteger(step.retry.delaySeconds) || step.retry.delaySeconds < 0) {
        errors.push(`[Validation Error] ${stepRef} 'retry.delaySeconds' must be an integer >= 0.`);
      }
    }
  }

  for (const step of workflow.steps) {
    if (!step || typeof step !== "object") {
      continue;
    }

    for (const dependency of step.dependsOn ?? []) {
      if (!stepIds.has(dependency)) {
        errors.push(`[Validation Error] Step '${step.id}' depends on '${dependency}', but that step ID does not exist in this workflow.`);
      }
      if (dependency === step.id) {
        errors.push(`[Validation Error] Step '${step.id}' cannot depend on itself.`);
      }
    }
  }

  const cycle = findCycle(workflow.steps.filter((step) => step && typeof step === "object"));
  if (cycle.length > 0) {
    errors.push(`[Validation Error] Infinite loop (cycle) detected in dependencies: ${cycle.join(" -> ")}. Please break this cycle.`);
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
