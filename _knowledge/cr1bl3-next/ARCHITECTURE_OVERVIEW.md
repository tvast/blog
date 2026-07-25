# Architecture Overview

A visual guide to cr1bl3-next's structure and how pieces fit together.

## Three Layers

```
┌─────────────────────────────────────┐
│  apps/                              │  User-facing applications
│  - connect-web  (TODO: web UI)      │
│  - connect-api  (TODO: GraphQL)     │
└─────────────────────────────────────┘
          ↓ depends on ↓
┌─────────────────────────────────────┐
│  packages/                          │  Shared, reusable libraries
│  - types       (✓ done)             │
│  - plugin-sdk  (✓ done)             │
│  - core        (TODO)               │
│  - graph       (TODO)               │
│  - evidence    (TODO)               │
│  - insight     (TODO)               │
│  - ui          (TODO)               │
└─────────────────────────────────────┘
          ↓ uses ↓
┌─────────────────────────────────────┐
│  plugins/                           │  Pluggable collectors
│  - sherlock     (TODO)              │
│  - crypto-finder (TODO)             │
│  - browser-artifacts (TODO)         │
│  - file-indexer (TODO)              │
└─────────────────────────────────────┘
```

## Dependency Tree

```
types (no dependencies)
  ↑
  ├── plugin-sdk (depends on types)
  │    ↑
  │    └── plugins/* (depend on plugin-sdk, types)
  │
  ├── core (depends on types)
  ├── graph (depends on types, core)
  ├── evidence (depends on types, graph)
  └── ui (depends on types, everything)
        ↑
        └── apps/* (depend on all packages)
```

## Data Flow

```
User Input
  (email / username / wallet / domain)
        ↓
  plugins/ (collectors)
  
  ┌─ sherlock (OSINT)
  ├─ crypto-finder (local scan)
  ├─ browser-artifacts (local browser data)
  └─ file-indexer (local files)
        ↓
  Plugin Result
  (nodes[] / edges[] / evidence[])
        ↓
  @cr1bl3/core
  (normalizer, graph builder)
        ↓
  @cr1bl3/graph
  (entity deduplication, relationship scoring)
        ↓
  @cr1bl3/evidence
  (immutable store, audit trail)
        ↓
  @cr1bl3/insight
  (confidence scoring, anomaly detection)
        ↓
  @cr1bl3/ui + Dashboard Composer
  (render interactive graph)
        ↓
  @cr1bl3/ai-orchestrator
  (select relevant views, summarize findings)
        ↓
  apps/connect-web
  (display dashboard)
```

## Created Files (Foundation Phase)

### Configuration Files (Root)

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript strict mode config |
| `.eslintrc.json` | ESLint rules (strict) |
| `.prettierrc.json` | Prettier formatting rules |
| `vitest.config.ts` | Vitest test runner config |
| `.lintstagedrc.json` | Lint-staged pre-commit config |
| `turbo.json` | Turbo monorepo orchestration |
| `pnpm-workspace.yaml` | pnpm workspace setup |

### Documentation (Root + docs/)

| File | Purpose |
|------|---------|
| `QUICKSTART.md` | 5-minute setup guide |
| `SETUP_COMPLETE.md` | What was built and how to use it |
| `CONTRIBUTING.md` | Developer rules and workflow |
| `ARCHITECTURE_OVERVIEW.md` | This file |
| `docs/TESTING.md` | Comprehensive testing guide |
| `docs/PLUGIN_GUIDE.md` | How to build a plugin |
| `docs/architecture/QUALITY.md` | Quality standards and decisions |

### CI/CD

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | GitHub Actions pipeline |
| `.github/pull_request_template.md` | PR checklist |

### Packages (Foundation)

#### @cr1bl3/types — Core type definitions

```
packages/types/
├── src/
│   ├── index.ts              # Type exports (GraphNode, Evidence, Plugin, etc)
│   ├── index.test.ts         # Type contract tests
│   └── __fixtures__/
│       └── sample-graph.ts   # Reusable test data
├── package.json
├── tsconfig.json
└── README.md
```

**Exports:**
- `GraphNode` — Entity in the graph
- `GraphEdge` — Relationship between nodes
- `Evidence` — Immutable proof
- `Cr1bl3Plugin` — Plugin metadata contract
- `PluginInput/PluginContext/PluginResult` — Plugin execution interface

**Tests:** 60+ tests validating each type contract

#### @cr1bl3/plugin-sdk — Plugin base classes

```
packages/plugin-sdk/
├── src/
│   ├── index.ts                 # Public exports
│   ├── base-plugin.ts           # Abstract base class
│   ├── base-plugin.test.ts      # BasePlugin tests
│   ├── plugin-validator.ts      # Validation utility
│   ├── plugin-validator.test.ts # Validator tests (40+)
│   └── __fixtures__/
│       └── mock-plugin.ts       # Reusable mock for testing
├── package.json
├── tsconfig.json
└── README.md
```

**Exports:**
- `BasePlugin` — Abstract class to extend
- `PluginValidator` — Validates plugin metadata and results
- All types from `@cr1bl3/types`

**Tests:** 50+ tests showing how to validate and use plugins

## Test Architecture

```
Every package has:

src/
├── module.ts           ← Implementation
├── module.test.ts      ← Unit tests (same file)
└── __fixtures__/       ← Reusable test data
    └── mock-*.ts

Tests follow pattern:
├── Pure functions     (most tests)
├── Error cases        (critical paths)
├── Type contracts     (edge cases)
└── Integration        (rare, between modules)
```

## Quality Pipeline

```
┌──────────────────────────────────┐
│ Developer commits code           │
└──────────────────────────────────┘
                ↓
┌──────────────────────────────────┐
│ Husky pre-commit hook            │
│ - ESLint fix                     │
│ - Prettier format                │
│ - Validate commit message        │
└──────────────────────────────────┘
                ↓
┌──────────────────────────────────┐
│ Developer pushes to remote       │
└──────────────────────────────────┘
                ↓
┌──────────────────────────────────┐
│ GitHub Actions CI on every commit│
│                                  │
│ 1. ESLint + Prettier check      │
│ 2. TypeScript strict check      │
│ 3. Vitest (all unit tests)      │
│ 4. pnpm build (all packages)    │
│ 5. Coverage upload to Codecov   │
└──────────────────────────────────┘
                ↓
┌──────────────────────────────────┐
│ Must pass before merge to main   │
└──────────────────────────────────┘
```

## Naming Conventions

### Packages
```
@cr1bl3/core
@cr1bl3/types
@cr1bl3/plugin-sherlock
```

### Files
- Source: `camelCase.ts`
- Tests: `camelCase.test.ts`
- Fixtures: `__fixtures__/descriptive-name.ts`

### Commits
```
type(scope): description

feat(types): add PersonaNode interface
fix(plugin-sdk): validate edges reference existing nodes
test(graph): add deduplication tests
docs(contributing): clarify test requirements
```

### Branches
```
feature/short-description
fix/issue-123
docs/topic-name
```

## Principles

1. **Type safety first** — TypeScript strict, no exceptions
2. **Tests document contracts** — Tests are specifications
3. **Fixtures prevent duplication** — Reuse test data
4. **Incremental builds** — Turbo caches between runs
5. **Small, focused commits** — One logical change per commit
6. **Evidence over assumption** — Proof in nodes, not rumors

## How to Navigate This

**Just starting?**
1. Read `QUICKSTART.md` — Set up in 5 min
2. Run `pnpm run ci` — Verify everything works
3. Read `CONTRIBUTING.md` — Understand the rules

**Want to build something?**
1. Read `docs/architecture/QUALITY.md` — Understand standards
2. Copy structure from `packages/plugin-sdk` — Template
3. Read `docs/TESTING.md` — Test patterns
4. Read `docs/PLUGIN_GUIDE.md` — Plugin specifics

**Questions?**
- Architecture → `docs/architecture/`
- Testing → `docs/TESTING.md`
- Contributing → `CONTRIBUTING.md`
- Examples → See `packages/plugin-sdk/src/`

## What's Next

### Phase 2: Core Engine
- `packages/core` — Normalizer, plugin executor
- `packages/graph` — Graph operations, deduplication
- `packages/evidence` — Evidence store, audit trail

### Phase 3: Insight & Dashboards
- `packages/insight` — Scoring, anomaly detection
- `packages/dashboard-composer` — Dynamic UI generation
- `packages/ai-orchestrator` — View selection, summarization

### Phase 4: Plugins
- `plugins/sherlock/` — OSINT username lookup
- `plugins/crypto-finder/` — Local wallet detection
- `plugins/browser-artifacts/` — Browser history, cookies
- `plugins/file-indexer/` — Local file search

### Phase 5: Applications
- `apps/connect-web/` — Web dashboard
- `apps/connect-api/` — GraphQL API
- `apps/connect-desktop/` — Electron app

## Summary

This foundation establishes **software craftsmanship** as non-negotiable:

✓ Strong types catch mistakes early
✓ Tests document intent
✓ Quality gates prevent regressions
✓ Fixtures prevent duplication
✓ Clear architecture prevents chaos

All future work inherits these standards.
