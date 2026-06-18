#!/usr/bin/env node
import { loadWorkflow, runWorkflow, validateWorkflow } from "./index.mjs";

const [, , filePath] = process.argv;

if (!filePath) {
  console.error("Usage: node src/runner/cli.mjs <workflow.json>");
  process.exit(1);
}

const workflow = await loadWorkflow(filePath);
const errors = validateWorkflow(workflow);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const result = await runWorkflow(workflow, {
  autoApprove: process.env.HITL_FLOW_AUTO_APPROVE !== "false"
});

console.log(JSON.stringify(result, null, 2));
