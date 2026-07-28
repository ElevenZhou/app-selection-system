# Security

This repository intentionally excludes account credentials, cookies, tokens,
webhooks, private vendor exports, Feishu delivery receipts, local environment
files, and hosting metadata.

Inject runtime secrets through environment variables or the deployment
platform's secret manager. Never commit them to reports, website data, examples,
logs, screenshots, or test fixtures.

If a credential is exposed, revoke or rotate it before opening an issue.
