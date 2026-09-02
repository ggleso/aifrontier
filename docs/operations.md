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

GitHub Free does not enforce branch protection for this private repository. Each clone must enable the tracked local guardrails once:

```sh
npm run hooks:install
```

This sets the clone-local `core.hooksPath` to `.githooks`. The pre-push hook blocks pushes whose destination is `main` and runs the repository secret scan before other pushes. Confirm setup with `git config --local --get core.hooksPath`. Hooks can be bypassed locally, so CI also checks every future `main` push against GitHub's read-only pull-request API and fails visibly if the new commit is not the merge result of a pull request. These controls are practical guardrails, not equivalent to server-enforced branch protection: repository administrators must still avoid bypassing hooks or pushing with `--no-verify`, and must investigate any failed `main-push-guard` run.

Concurrent workers must use different branches or Git worktrees. One writer owns a given change scope.

## Recovery

The service has no persistent data at this stage. Stop with `Ctrl-C` or `docker compose down`; restart using the commands in the README. Never place recovery credentials in this repository.
