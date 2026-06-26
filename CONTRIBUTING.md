# Contributing

Thanks for improving HITL Flow Kit.

## Local Setup

```bash
npm test
npm run validate
npm run scan:public
```

The project has no runtime dependencies in `v0.1.0`.

## Good Contributions

- Improve docs and examples
- Add workflow validation tests
- Add mock adapter examples
- Improve the static canvas preview
- Add safe sample data

## Contribution Map

Good first contributions should be useful without requiring credentials or live services.

| Area | Good starter task | Why it helps |
| --- | --- | --- |
| Examples | Add a pull-request review workflow | Shows another common maintainer workflow. |
| Tests | Add invalid workflow fixtures | Makes the schema safer for contributors. |
| Docs | Expand the mock adapter contract | Clarifies the boundary before real adapters exist. |
| Canvas | Generate a preview from one workflow JSON file | Makes examples easier to inspect visually. |
| Audit logs | Commit stable sample runner outputs | Gives users concrete output to compare against. |

## Before Opening a PR

- Run `npm test`
- Run `npm run validate`
- Run `npm run scan:public`
- Confirm that examples use dummy data only
- Do not include real credentials, logs, URLs, or customer data

## Design Principles

- Human approval is a first-class workflow step
- Adapters should be replaceable
- Examples should be runnable without credentials
- Audit logs should explain what happened and why
- Safety beats clever automation
- Real adapters should start disabled and be testable without live network calls
