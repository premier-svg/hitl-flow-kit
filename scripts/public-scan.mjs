import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", "coverage", "dist", "tmp"]);
const secretPatterns = [
  { name: "OpenAI-style key", pattern: /sk-[A-Za-z0-9_-]{20,}/g },
  { name: "GitHub token", pattern: /gh[pousr]_[A-Za-z0-9_]{20,}/g },
  { name: "Slack token", pattern: /xox[baprs]-[A-Za-z0-9-]{20,}/g },
  { name: "Google API key", pattern: /AIza[A-Za-z0-9_-]{20,}/g },
  { name: "AWS access key", pattern: /AKIA[0-9A-Z]{16}/g },
  { name: "Private key block", pattern: /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/g }
];

const riskyFiles = new Set([".env", "token.json", "credentials.json"]);
const findings = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) {
      continue;
    }

    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(filePath);
      continue;
    }

    if (riskyFiles.has(entry.name)) {
      findings.push({ filePath, name: "risky filename" });
      continue;
    }

    const raw = await readFile(filePath, "utf8").catch(() => "");
    for (const { name, pattern } of secretPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(raw)) {
        findings.push({ filePath, name });
      }
    }
  }
}

await walk(root);

if (findings.length > 0) {
  for (const finding of findings) {
    console.error(`FAIL ${path.relative(root, finding.filePath)}: ${finding.name}`);
  }
  process.exit(1);
}

console.log("OK public scan found no high-risk secret patterns");
