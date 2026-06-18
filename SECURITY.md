# Security Policy

## Reporting a Vulnerability

Please do not open public issues containing secrets, tokens, private URLs, customer data, production logs, or exploit details.

For now, report sensitive security issues by opening a minimal public issue that says a private security report is needed, without including sensitive details.

## Public Example Rules

- Use dummy data only
- Use `.env.example` for placeholder configuration
- Do not commit `.env`, token files, credentials, or production logs
- Do not add external network calls to examples
- Keep mock adapters as the default path

## Supported Versions

| Version | Supported |
| --- | --- |
| 0.1.x | Yes |
