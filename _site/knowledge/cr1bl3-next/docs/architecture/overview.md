# Architecture Overview

## Target Pipeline

```txt
1. Input
2. Plugin Runner
3. Normalizer
4. Evidence Store
5. Graph Builder
6. Timeline Builder
7. Persona Builder
8. Population Builder
9. Insight Engine
10. AI Orchestrator
11. Dashboard Composer
```

## Target Apps

- `apps/connect-web`: primary cockpit and dashboard shell.
- `apps/connect-desktop`: local-first desktop experience.
- `apps/connect-api`: local or private API surface.
- `apps/connect-worker`: background scans, normalization, and indexing.

## Target Packages

- `@cr1bl3/types`: shared contracts.
- `@cr1bl3/core`: orchestration and runtime primitives.
- `@cr1bl3/plugin-sdk`: plugin authoring contract.
- `@cr1bl3/evidence`: evidence storage and hashing.
- `@cr1bl3/graph`: node and edge construction.
- `@cr1bl3/timeline`: event reconstruction.
- `@cr1bl3/persona`: persona snapshots.
- `@cr1bl3/population`: persona clustering.
- `@cr1bl3/insight`: scoring, priorities, anomalies.
- `@cr1bl3/ai-orchestrator`: factual widget and action selection.
- `@cr1bl3/dashboard-composer`: dashboard layouts from graph snapshots.
