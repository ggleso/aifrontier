# aifrontier

A security-first TypeScript and Node.js 26 foundation for AI frontier experiments and services. The specific product domain will be refined in a later decision record.

## Current scope

- Local development with npm or Docker/Colima
- A minimal HTTP health endpoint at `GET /health`
- No deployment target
- No external API or service integration
- No credentials required

## Requirements

- Node.js 26 and npm 11
- Optional: Docker CLI with Colima

## Local development

```sh
npm ci
cp .env.example .env
npm run dev
```

The server binds to `127.0.0.1:3000` by default. Verify it with:

```sh
curl http://127.0.0.1:3000/health
```

## Quality checks

```sh
npm run check
npm run audit
```

`npm run check` verifies formatting, lint, types, tests, build output, and common secret signatures.

## Container

```sh
colima start
docker compose up --build
```

The container port is exposed only on the local loopback interface.

## Collaboration

Never work directly on `main`. Use `feature/*`, `fix/*`, `codex/*`, or `openclaw/*` branches and merge through a reviewed pull request after CI passes. See [AGENTS.md](AGENTS.md) and [docs/operations.md](docs/operations.md).
