# Redaction Policy

HITL Flow Kit is designed for public examples. Keep it safe by default.

## Public OK

- Workflow schemas
- Local runner logic
- Mock adapters
- Dummy sample data
- Synthetic issue, content, and meeting examples
- Documentation about approval, retry, handoff, and audit patterns

## Never Commit

- API keys
- OAuth credentials
- Tokens
- Webhook URLs
- Production URLs
- Customer data
- Real phone numbers
- Real email addresses
- Production logs
- Private project names
- Background jobs that contact external systems

## Example Data Rules

- Use fictional names
- Use `example.com` email addresses if an email is needed
- Use local mock IDs
- Avoid realistic secrets in examples
- Prefer small datasets that can be inspected by eye

## Public Scan

Run:

```bash
npm run scan:public
```

This scan is intentionally conservative. Passing it does not replace human review.
