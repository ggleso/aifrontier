# Architecture

## Baseline

`aifrontier` starts as a small Node.js service written in strict TypeScript. It intentionally uses the Node.js standard library for the initial HTTP boundary so that the runtime dependency surface is zero.

- `src/app.ts`: request handling and server construction
- `src/config.ts`: validated environment configuration
- `src/index.ts`: process lifecycle and server startup
- `tests/`: unit and integration-level HTTP tests

The initial architecture is deliberately generic until the product domain and external integrations are decided. New integrations require a decision record, explicit secret handling, tests, and a threat review.
