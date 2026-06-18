import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadWorkflow, runWorkflow, validateWorkflow } from "../src/runner/index.mjs";

describe("workflow validation", () => {
  it("accepts all public example workflows", async () => {
    for (const file of [
      "examples/issue-triage-workflow/workflow.json",
      "examples/content-review-workflow/workflow.json",
      "examples/appointment-workflow/workflow.json"
    ]) {
      const workflow = await loadWorkflow(file);
      assert.deepEqual(validateWorkflow(workflow), []);
    }
  });

  it("rejects duplicate step ids", () => {
    const workflow = {
      id: "duplicate",
      version: "0.1.0",
      name: "Duplicate",
      steps: [
        { id: "same", type: "task", name: "One" },
        { id: "same", type: "task", name: "Two" }
      ]
    };

    assert.match(validateWorkflow(workflow).join("\n"), /duplicate step id/);
  });

  it("rejects missing dependencies", () => {
    const workflow = {
      id: "missing-dependency",
      version: "0.1.0",
      name: "Missing Dependency",
      steps: [
        { id: "second", type: "task", name: "Second", dependsOn: ["first"] }
      ]
    };

    assert.match(validateWorkflow(workflow).join("\n"), /depends on missing step/);
  });

  it("detects cycles", () => {
    const workflow = {
      id: "cycle",
      version: "0.1.0",
      name: "Cycle",
      steps: [
        { id: "a", type: "task", name: "A", dependsOn: ["b"] },
        { id: "b", type: "task", name: "B", dependsOn: ["a"] }
      ]
    };

    assert.match(validateWorkflow(workflow).join("\n"), /cycle detected/);
  });
});

describe("workflow runner", () => {
  it("runs a public workflow and returns audit events", async () => {
    const workflow = await loadWorkflow("examples/issue-triage-workflow/workflow.json");
    const result = await runWorkflow(workflow);

    assert.equal(result.status, "completed");
    assert.equal(result.workflowId, "issue-triage");
    assert.equal(result.auditLog.length, workflow.steps.length);
    assert.equal(result.outputs["maintainer-approval"].approved, true);
  });
});
