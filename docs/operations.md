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

GitHub server-side branch protection requires pull requests for `main`, enforces the `quality` and `secret-scan` checks, requires a current branch, blocks force pushes and deletion, and applies to administrators. Each clone should also enable the tracked local guardrails once:

```sh
npm run hooks:install
```

This sets the clone-local `core.hooksPath` to `.githooks`. The pre-push hook blocks pushes whose destination is `main` and runs the repository secret scan before other pushes. Confirm setup with `git config --local --get core.hooksPath`. GitHub Secret scanning and Push protection provide server-side secret controls, while CI also checks every future `main` push against GitHub's read-only pull-request API. The local hook and `main-push-guard` remain defense-in-depth controls; investigate any failed guard run.

Concurrent workers must use different branches or Git worktrees. One writer owns a given change scope.

## Recovery

The service has no persistent data at this stage. Stop with `Ctrl-C` or `docker compose down`; restart using the commands in the README. Never place recovery credentials in this repository.
