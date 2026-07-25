# Migration Plan

## 1. Freeze

Move existing projects into `legacy/` without behavioral changes.

Imported POC source snapshots now live under `legacy/pocs/`:

- `parser-sherlock-european-council`
- `next/escortme`
- `next/recovery`

These snapshots are references for migration work and are not part of the active workspace build.

## 2. Foundation Packages

Create:

- `packages/types`
- `packages/plugin-sdk`
- `packages/core`
- `packages/evidence`
- `packages/graph`

Goal: the graph works without a UI.

## 3. UI Shell

Create `apps/connect-web` and `packages/ui`.

Initial routes:

- `/`
- `/inputs`
- `/personas`
- `/populations`
- `/graph`
- `/timeline`
- `/evidence`
- `/settings`

## 4. First Safe Plugin

Start with `plugins/file-indexer`, then add scanners only after the evidence contract is stable.

## 5. Dashboard Composer

Transform `GraphSnapshot + PersonaSnapshot + Evidence[]` into `DashboardLayout`.

## 6. AI Orchestrator

Only pass validated JSON to the orchestrator. Require evidence IDs in every factual summary.
