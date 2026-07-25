# Legacy Boundaries

The historical projects are source material only. They should be frozen first, then selectively migrated through reviewed packages.

## Restricted

- `_script_4TTACK_JS/` -> `legacy/restricted/script-4ttack-js/`
- `extracted_files/` security tools -> `legacy/restricted/extracted-security-tools/`

Restricted tools must not be integrated into `.connect`, published to npm, exposed in the UI, or callable by AI.

## Cold Archive

- `Archive/` -> `legacy/archive/`

Archive content should be documented by origin and date, then left unloaded by default.

## Migratable UI And Framework Material

- `CR1BL3/` -> `legacy/cr1bl3-old/`
- `jh4ck-front/` -> `legacy/jh4ck-front/`

Useful pieces can be migrated into `apps/connect-web`, `packages/ui`, `packages/logger`, `packages/auth`, `packages/crypto`, and `packages/ai-orchestrator`.
