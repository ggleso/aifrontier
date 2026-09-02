# aifrontier

A security-first TypeScript and Node.js 26 foundation for AI frontier experiments and services. The specific product domain will be refined in a later decision record.

## Current scope

- Local development with npm or Docker/Colima
- A responsive example landing page at `GET /`
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
npm run hooks:install
cp .env.example .env
npm run dev
```

Run `npm run hooks:install` once after each clone. It enables the repository's tracked pre-push hook for that clone.

The server binds to `127.0.0.1:3000` by default. Open the example page at
<http://127.0.0.1:3000/> or verify both routes with:

```sh
curl -sS -D - -o /dev/null http://127.0.0.1:3000/
curl http://127.0.0.1:3000/health
```

The landing page uses only repository-native HTML and CSS. It does not load
external fonts, images, scripts, analytics, APIs, or AI models.

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
