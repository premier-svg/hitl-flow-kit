# Mock Adapter

The mock adapter documents adapter calls without contacting external services.

Use it for examples, docs, tests, and public demos.

Example:

```json
{
  "name": "mock.github",
  "action": "apply_labels",
  "input": {
    "labels": ["needs-triage"]
  }
}
```

Real adapters should be added behind explicit configuration, tests, and safety docs.
