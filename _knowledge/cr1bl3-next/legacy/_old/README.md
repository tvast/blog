# Legacy POC Imports

This directory contains source snapshots imported for staged migration into `cr1bl3-next`.

## Snapshots

- `parser-sherlock-european-council/`: European Council OSINT parser, Flask prototype, Vue/Firebase web app, functions, and Sherlock suite sources.
- `next/escortme/`: Vue/Quasar EscortMe prototype with map, passport, payments, and Firebase flows.
- `next/recovery/`: Recovery/Gmail parsing prototype with browser extension, Electron, local indexing, and dashboard sources.

## Import Policy

These snapshots intentionally exclude vendored dependencies, generated build outputs, release artifacts, caches, lockfiles, and local environment backups. Treat them as migration references first; promote code into `apps/`, `packages/`, or `plugins/` only through focused follow-up changes.

## Follow-Up Migration Targets

- Promote reusable Sherlock parsing logic into `plugins/sherlock`.
- Extract shared Vue/Quasar shell and navigation patterns into `apps/connect-web`.
- Convert recovery indexing and Gmail parsing into isolated services or plugins with explicit data-boundary documentation.
- Audit Firebase, payment, email, and local data flows before enabling runtime integration.
