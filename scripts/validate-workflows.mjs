import { readdir } from "node:fs/promises";
import path from "node:path";
import { loadWorkflow, validateWorkflow } from "../src/runner/index.mjs";

const examplesDir = path.resolve("examples");
const entries = await readdir(examplesDir, { withFileTypes: true });
const workflowFiles = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(examplesDir, entry.name, "workflow.json"));

let failed = false;

for (const file of workflowFiles) {
  const workflow = await loadWorkflow(file);
  const errors = validateWorkflow(workflow);

  if (errors.length > 0) {
    failed = true;
    console.error(`FAIL ${file}`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
  } else {
    console.log(`OK ${file}`);
  }
}

if (failed) {
  process.exit(1);
}
