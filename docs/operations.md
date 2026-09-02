# Operations

## Local run

Use `npm run dev` during development or `npm run build && npm start` to exercise compiled output. The default bind address is loopback-only.

## Branches and pull requests

- `main`: reviewed and verified code only
- `feature/*`: feature development
- `fix/*`: bug fixes
- `codex/*`: Codex work
- `openclaw/*`: OpenClaw automation work

All changes merge through pull requests. Required gates are formatting, lint, type checking, unit tests, build, secret scanning, dependency audit, and human review. Force pushes and direct pushes to `main` are prohibited. Deployments, when introduced, must use a protected environment with human approval.

Concurrent workers must use different branches or Git worktrees. One writer owns a given change scope.

## Recovery

The service has no persistent data at this stage. Stop with `Ctrl-C` or `docker compose down`; restart using the commands in the README. Never place recovery credentials in this repository.
