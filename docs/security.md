# Security baseline

- The service binds to `127.0.0.1` by default.
- The container runs as a non-root user with a read-only filesystem, no Linux capabilities, and `no-new-privileges`.
- Runtime dependencies are initially zero.
- Secrets are never committed; `.env.example` contains names and descriptions only.
- CI runs a repository secret scanner and a high-severity npm audit.
- GitHub Actions permissions are read-only unless a reviewed workflow explicitly requires more.
- Deployment and external side effects are outside the initial scope.

Before adding an external API, document data flow, credential storage, permissions, rate limits, retention, failure behavior, and revocation in a decision record.
