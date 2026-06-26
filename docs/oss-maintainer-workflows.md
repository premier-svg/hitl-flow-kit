# OSS Maintainer Workflows

HITL Flow Kit is designed for maintainers who want agent assistance without turning repository operations into an opaque bot.

The examples in this repository stay local, mock-based, and credential-free. They show the workflow boundary first, then leave real adapters as an explicit future step.

## Patterns Included

| Pattern | Example | Human gate | Mock adapter |
| --- | --- | --- | --- |
| Issue triage | `examples/issue-triage-workflow` | Maintainer approves labels and reply path | `mock.github.apply_labels` |
| Content review | `examples/content-review-workflow` | Editor approves suggested edit path | None in `v0.1.0` |
| Appointment coordination | `examples/appointment-workflow` | Operator approves scheduling path | `mock.calendar.create_hold` |
| Release checklist | `examples/release-checklist-workflow` | Maintainer approves release scope and verification | `mock.github.draft_release_notes` |

## Why This Matters for OSS

Agent workflows often start with useful automation and then become hard to review. Maintainers need to know:

- which action was suggested
- which human role approved it
- which adapter would have run
- which retry or failure rule applied
- which audit event explains the outcome

HITL Flow Kit keeps those decisions in JSON workflow files so they can be reviewed in pull requests before any real integration exists.

## What Codex or API Credits Would Improve

Useful maintainer automation should help with review work, not bypass it. The most valuable uses are:

- generating edge-case validation tests for workflow schemas
- reviewing adapter boundaries before real API integrations are added
- drafting release checklist updates from changelog entries
- keeping README examples, schemas, and sample workflows synchronized
- reviewing public examples for privacy and credential leakage risks
- triaging contributor issues into small, safe follow-up tasks

## Adapter Rule of Thumb

Real adapters should not be added until the workflow is useful with a mock adapter.

Before a real adapter is accepted, it should document:

- required configuration
- required permissions
- whether it can create external side effects
- how failures are represented
- which human approval step must precede it
- how tests avoid live network calls

## Good Next Contributions

- Add a pull-request review workflow example
- Add fixture-based tests for invalid workflows
- Generate the canvas preview from workflow JSON
- Add stable audit-log fixtures for each example
- Expand the mock adapter contract in `adapters/mock/README.md`
