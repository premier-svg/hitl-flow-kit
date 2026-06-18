# Changelog

## v0.1.0 - Initial Public Preview

AgentOps Flow Kit starts as a small, credential-free public preview for designing and running human-in-the-loop AI agent workflows.

### Added

- Local workflow runner
- Workflow validation for required fields, duplicate steps, missing dependencies, and cycles
- Mock adapter simulation
- Static workflow canvas preview
- Public-safe example workflows:
  - Issue triage
  - Content review
  - Appointment coordination
- JSON workflow schema
- Public secret-pattern scan
- Dummy sample data
- GitHub issue templates
- Pull request safety checklist
- Contributor, security, code of conduct, and redaction docs

### Safety Notes

- No runtime dependencies
- No real API adapters
- No production URLs
- No default external network calls
- No customer data
- No background jobs or cron

### Verification

```bash
npm run check
```

Expected result:

- Tests pass
- Example workflows validate
- Public scan finds no high-risk secret patterns
