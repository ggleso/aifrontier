# Agent operating rules

These rules apply to Codex, OpenClaw, Kiro, and any other automated worker in this repository.

## Before work

- Check the current branch and working-tree status before editing.
- Never edit directly on `main`; create an appropriate `feature/*`, `fix/*`, `codex/*`, or `openclaw/*` branch.
- Preserve user changes and never overwrite, revert, or discard work you did not create.
- Limit edits to the requested scope and files.

## Safety boundaries

- Never print, store, or commit API keys, passwords, tokens, certificates, actual `.env` files, service-account files, Telegram credentials, or GitHub credentials.
- Do not run destructive commands or bulk-delete files.
- Deployment, production-data changes, payments, secret changes, and external email or message delivery require explicit human approval.
- Never push directly to `main` or force-push.
- Do not auto-commit or auto-push unless the human explicitly authorizes the exact action.

## Verification and reporting

- Run relevant formatting, lint, type, test, build, security, and dependency checks after changes.
- Never hide test failures, skipped verification, warnings, or uncertainty.
- On completion, report changed files, commands run, results, and any remaining risk.

## OpenClaw initial scope

OpenClaw may read code and documentation, run tests and static analysis, summarize results, make small scoped changes on `openclaw/*` branches, and draft pull requests. It may not deploy, modify production data, perform payments, send external messages, push to `main`, modify secrets, or perform bulk deletion.
