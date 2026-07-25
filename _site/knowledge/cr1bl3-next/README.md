# .connect / cr1bl3 Next

cr1bl3 is the engine. `.connect` is the cockpit.

Everything starts with a clue.

## Vision

`.connect` is a modular Digital Intelligence platform for connecting authorized traces into evidence graphs, personas, population dashboards, and recovery insights.

The product should become a correlation framework, not a loose collection of tools:

```txt
Input -> Collectors -> Normalizer -> Evidence Graph -> Insight Engine -> Dashboard
```

## Principles

1. Every clue becomes a node.
2. Every node can join a graph.
3. Evidence comes before assumptions.
4. AI orchestrates structured observations; it does not invent facts.
5. Sensitive data stays local unless the user explicitly consents.
6. Legacy offensive modules stay isolated, neutralized, or archived.
7. The core should work offline-first wherever possible.

## Workspace

This proposal uses `pnpm workspaces` with Turborepo.

```txt
apps/       .connect applications
packages/   reusable @cr1bl3/* modules
plugins/    authorized collectors and scanners
legacy/     frozen historical projects and restricted archives
docs/       architecture, security, migration, prompts, plugin specs
scripts/    migration, audit, build, release helpers
tests/      fixtures, integration, and e2e coverage
```

## MVP Sequence

1. Foundation: `types`, `core`, `plugin-sdk`, `ui`, `graph`, `evidence`, `connect-web`.
2. Crypto Recovery: local authorized artifact plugins and wallet timeline.
3. Authorized OSINT: username, GitHub, and domain plugins.
4. Insight AI: dashboard composer and factual orchestrator.

## Safety Boundary

Historical security tooling is kept under `legacy/restricted/` and must not be exposed in the main UI, published to npm, or invoked by the AI orchestrator.
