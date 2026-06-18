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
