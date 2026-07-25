---
name: craftsmanship_standards_ci_cd_tests
description: "Quality standards, CI/CD pipeline, and test architecture for cr1bl3-next monorepo"
metadata: 
  node_type: memory
  type: project
  originSessionId: 977326c4-4943-4de5-8276-89aade735d91
---

## cr1bl3-next Quality Foundation (2025-06-29)

Established comprehensive testing and CI/CD standards prioritizing **software craftsmanship** over delivering features quickly.

### Quality Gates (Every PR)

All changes must pass:

1. **ESLint + Prettier** — `pnpm lint` (code quality + formatting)
2. **TypeScript strict** — `pnpm typecheck` (no `any`, all types explicit)
3. **Unit tests** — `pnpm test` (70% coverage minimum)
4. **Build** — `pnpm build` (no broken code shipped)

Pre-commit hooks (Husky) catch mistakes locally before CI.

**Why:** Catching issues early prevents regressions and keeps the codebase maintainable. Type safety + tests = confidence.

**How to apply:** Every new package needs tsconfig.json, ESLint config, tests. No exceptions for "quick" features.

### Test Architecture

**Test Pyramid** (what gets tested):
- Unit tests (70%) — pure functions, type validation, single modules
- Integration tests (20%) — multiple modules together
- E2E tests (10%) — full user workflows

**Coverage requirements:**
- Core packages (types, core, graph, plugin-sdk): 70% minimum
- UI packages: 60% minimum (visual testing is hard)
- Measured via Vitest + coverage reports

**Fixture strategy:** Reusable test data in `__fixtures__/` directories used across related tests (consistency).

### Key Files Created

**Configuration:**
- `tsconfig.json` — TypeScript strict mode (no `any`, explicit returns, etc)
- `.eslintrc.json` — ESLint strict rules + type-aware linting
- `.prettierrc.json` — Consistent formatting
- `vitest.config.ts` — Test runner with 70% coverage threshold
- `.lintstagedrc.json` — Lint-staged config for pre-commit

**CI/CD:**
- `.github/workflows/ci.yml` — GitHub Actions: lint → typecheck → test → build (on both Node 18 & 20)
- Coverage upload to Codecov on main/develop

**Documentation:**
- `CONTRIBUTING.md` — Developer workflow, commit message format, standards
- `docs/TESTING.md` — Detailed test strategy and patterns
- `docs/architecture/QUALITY.md` — Quality decisions and tooling overview
- `QUICKSTART.md` — 5-minute setup guide
- `.github/pull_request_template.md` — PR checklist

**Foundation Packages:**
- `packages/types/` — Core type definitions (GraphNode, Evidence, Plugin contract)
  - Comprehensive tests documenting contracts
  - Fixture file with reusable test data
- `packages/plugin-sdk/` — Base classes for plugins (BasePlugin, PluginValidator)
  - Tests showing how to validate plugins and results
  - Mock plugin factory for other tests to use

### Standards Enforced

**No shortcuts:**
- No `any` types without `// explanation` comment
- All functions must have explicit return types
- No `console.log` in production code (warn in tests only)
- No unused variables (or prefix with `_`)

**Test requirements:**
- Every feature needs tests before it's considered complete
- Write fixtures for reusable test data
- Tests document the contract (what the module is supposed to do)

**Commit hygiene:**
- Format: `type(scope): short description` (feat, fix, test, docs, refactor, style, chore)
- Meaningful commit messages (not "fix bug" or "update code")
- Small commits (one logical change per commit)

**Release strategy:**
- `feat` commit → minor version bump
- `fix` commit → patch version bump
- `BREAKING CHANGE:` in commit body → major version bump

### Tools Selected & Why

| Tool | Why |
|------|-----|
| Vitest | Fast, native ESM, great TypeScript support |
| ESLint strict | Catches bugs early, prevents `any`, enforces consistency |
| TypeScript strict | Strong types = fewer surprises |
| Husky + lint-staged | Catch mistakes before CI runs (faster feedback) |
| Turbo | Monorepo orchestration, caching for faster builds |
| pnpm workspaces | Dependency management in monorepo |
| Prettier | No style debates, auto-format |

### Decision Points

**70% coverage, not 80%+:** Diminishing returns past 70%. Allows pragmatic decisions (some code is hard to test). Exception: UI can be 60%.

**Pre-commit hooks:** Faster feedback than waiting for CI. Runs locally, catches lint/type errors instantly.

**Fixtures in `__fixtures__/`:** Shared test data prevents inconsistency and duplication across packages.

**No `any` ever:** Forces correct types upfront. Rare legitimate exceptions documented with comments.

### How Future Work Should Fit

1. **New packages** — Copy structure from `plugin-sdk` (package.json, tsconfig, tests)
2. **New features** — Write tests first (test-driven), use fixtures
3. **Bug fixes** — Add test case that reproduces bug, then fix
4. **Refactors** — Commit message explains why, tests ensure no regressions

### Metrics to Watch

- Test suite speed (target: < 30 seconds full run)
- Coverage trends (should stay 70%+)
- CI pass rate (should be 95%+)
- Time to fix a broken CI (ideally < 1 hour)

### Related Docs

- `CONTRIBUTING.md` — Developer rules
- `docs/TESTING.md` — Test patterns
- `docs/architecture/QUALITY.md` — Architecture decisions
- `QUICKSTART.md` — Getting started
