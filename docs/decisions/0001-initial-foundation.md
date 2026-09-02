# 0001: Initial foundation

- Status: Accepted
- Date: 2026-09-02

## Decision

Begin with TypeScript on Node.js 26, npm for local execution, and Docker/Colima as an optional isolated runtime. Use no external APIs and define no deployment target initially. The product purpose is a generic foundation for AI frontier experiments and services pending later domain refinement.

## Consequences

The initial implementation stays small and auditable. Domain-specific components, persistence, network exposure, and deployment require later decisions and explicit security review.
