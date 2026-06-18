# Codex for OSS Application Draft

Use this for the OpenAI Codex for Open Source application.

Official form:

```text
https://openai.com/form/codex-for-oss/
```

Official program page:

```text
https://developers.openai.com/community/codex-for-oss/
```

## Pre-submit Check

Checked on 2026-06-18 against the official OpenAI form and program page.

- The form requires first name, last name, email, GitHub username, repository URL, maintainer role, qualification text, OpenAI Organization ID, API-credit usage text, and an optional final note.
- The form states 500-character limits for `Why does this repository qualify?`, `How will you use API credits for your project?`, and `Anything else we should know?`.
- The program page says active open-source maintainers can apply, and OpenAI looks for usage, ecosystem importance, and evidence of active maintenance.
- Current drafts are within the form limits: qualification 365 chars, API-credit usage 370 chars, final note 340 chars.

## Current Public Repo Facts

- Repository: https://github.com/premier-svg/hitl-flow-kit
- Release: https://github.com/premier-svg/hitl-flow-kit/releases/tag/v0.1.0
- Visibility: public
- Current stars: 0
- Current forks: 0
- Current open issues: 8
- CI: passing
- Topics: `ai-agents`, `hitl`, `workflow`, `human-in-the-loop`, `automation`, `workflow-engine`, `developer-tools`, `codex`, `oss`, `audit-log`

## Form Fields

### First Name

Fill manually.

### Last Name

Fill manually.

### Email

Fill manually with the email associated with the ChatGPT account.

### GitHub Username

```text
premier-svg
```

### GitHub Repository URL

```text
https://github.com/premier-svg/hitl-flow-kit
```

### Role

Select:

```text
Primary maintainer
```

Suggested text:

```text
I am the primary maintainer and original author. I created the repository, designed the workflow schema and local runner, wrote the examples and documentation, set up CI, created the v0.1.0 release, and opened the initial good-first-issue and help-wanted backlog.
```

### Why does this repository qualify?

Maximum 500 characters.

```text
HITL Flow Kit addresses a growing OSS need: safe human-in-the-loop AI agent workflows. It provides reusable primitives for approvals, audit logs, retries, handoffs, mock adapters, schemas, and examples for issue triage, content review, and appointment coordination. v0.1.0 is public with CI, release docs, security/redaction policy, and 8 maintainer-curated issues.
```

### Interested In

Select:

```text
API credits for my project
Codex Security
```

### OpenAI Organization ID

Fill manually from:

```text
https://platform.openai.com/settings/organization/general
```

Do not commit or share private organization details publicly.

### How will you use API credits for your project?

Maximum 500 characters.

```text
I will use API credits for core OSS maintenance: issue triage, workflow schema review, adapter implementation review, edge-case test generation, release checklist automation, docs synchronization, and security-focused review of workflow examples. Credits will support safe local-first examples and maintainer automation, not private customer data or production outreach.
```

### Anything else we should know?

Maximum 500 characters.

```text
The project is intentionally local-only in v0.1.0: no credentials, no production URLs, no background jobs, no default network calls, and mock adapters only. This makes it a safe base for contributors. I am applying early because Codex can help keep schemas, runner code, examples, docs, tests, and future adapters consistent as usage grows.
```

## Shorter Backup Versions

Use these if the form counts characters differently.

### Why this repo qualifies, shorter

```text
HITL Flow Kit provides reusable OSS primitives for safe human-in-the-loop AI agent workflows: approvals, audit logs, retries, handoffs, mock adapters, schemas, and public examples. v0.1.0 is public with CI, release docs, a security/redaction policy, and 8 maintainer-curated issues.
```

### API credits, shorter

```text
I will use API credits for OSS maintenance: issue triage, schema review, adapter review, edge-case test generation, release checklist automation, docs synchronization, and security-focused review of workflow examples. Credits will not be used with private customer data.
```

### Anything else, shorter

```text
v0.1.0 is intentionally local-only: no credentials, production URLs, background jobs, default network calls, or real adapters. Codex can help keep the schema, runner, examples, tests, docs, and future adapters consistent as the project grows.
```

## Submission Notes

- Do not claim adoption yet.
- Do not claim stars or downloads beyond current reality.
- Emphasize ecosystem importance and active maintenance evidence.
- Mention the release, CI, issue backlog, safety model, and maintainer responsibilities.
- After the first launch posts, update current stars only if they changed.
