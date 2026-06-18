# GitHub Publishing Checklist

Use this before making the repository public.

## Repository Metadata

Repository name:

```text
hitl-flow-kit
```

Description:

```text
Open-source workflow canvas and runner for human-in-the-loop AI agent operations.
```

Website:

```text
Leave blank until a docs site exists.
```

Topics:

```text
ai-agents
hitl
workflow
human-in-the-loop
automation
workflow-engine
developer-tools
codex
oss
audit-log
```

## Public Launch Checklist

- [ ] `npm run check` passes locally
- [ ] README demo image renders on GitHub
- [ ] `CHANGELOG.md` has the `v0.1.0` release note
- [ ] No real credentials or private URLs
- [ ] No real customer, lead, meeting, or production log data
- [ ] GitHub description is set
- [ ] GitHub topics are set
- [ ] Issues are enabled
- [ ] Discussions are enabled only if there is time to respond
- [ ] The first five good-first-issues are created
- [ ] The first three help-wanted issues are created
- [ ] `v0.1.0` release is created

## v0.1.0 Release Title

```text
v0.1.0 - Initial public preview
```

## v0.1.0 Release Notes

~~~md
HITL Flow Kit is an open-source workflow canvas and runner for human-in-the-loop AI agent operations.

This first public preview focuses on safe local primitives:

- local workflow runner
- workflow validation
- mock adapter simulation
- static canvas preview
- public-safe example workflows
- JSON workflow schema
- public secret-pattern scan

The included examples cover issue triage, content review, and appointment coordination. The repository intentionally avoids real API adapters, production URLs, credentials, background jobs, and customer data in v0.1.0.

Run:

```bash
npm run check
```
~~~

## Suggested First Milestone

Milestone:

```text
v0.2.0 - Adapter interface and generated canvas preview
```

Goals:

- GitHub Issues adapter prototype
- Generated canvas preview from workflow JSON
- More validation fixtures
- Release checklist workflow example
- Exportable audit log fixture

## Pre-public Sanity Commands

```bash
npm run check
git status --short
rg -n "sk-|gh[pousr]_|xox[baprs]-|AIza|AKIA|PRIVATE KEY" .
```

If any command finds sensitive material, stop and remove it before publishing.
