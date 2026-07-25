# Quality Architecture

## Overview

cr1bl3 prioritizes **software craftsmanship**:
- Strong types catch mistakes early
- Tests document intent
- Clear architecture prevents complexity
- Incremental refinement over big rewrites

This document outlines our quality standards and tooling.

## Quality Gates

Every commit must pass these gates (enforced by CI):

```
Pre-commit hooks
     ↓
ESLint + Prettier
     ↓
TypeScript strict mode
     ↓
Unit tests (70% coverage)
     ↓
Build succeeds
```

### Pre-commit (Husky)

Runs locally before you commit:

- ESLint fix
- Prettier format
- Commit message validation

Install once:
```bash
pnpm run prepare
```

### Linting (ESLint)

Enforces code quality and style:

```bash
pnpm lint:eslint --fix
```

Rules:
- No `any` without explanation
- Unused variables are errors
- All functions must have return types
- `console.log` only in tests

### Type Safety (TypeScript)

Strict mode catches mistakes:

```bash
pnpm typecheck
```

Required:
- Explicit return types on all functions
- No implicit `any`
- Non-null assertions must be commented

### Testing (Vitest)

70% coverage minimum:

```bash
pnpm test
pnpm test:coverage
```

Strategy:
- Unit tests for pure logic (most)
- Integration tests for module interactions
- E2E tests for user workflows

### Build (Turbo)

Ensures the code actually works:

```bash
pnpm build
```

All packages must:
- Compile without errors
- Generate `.d.ts` files
- Not include source maps by default

## TypeScript Configuration

Root `tsconfig.json`:
- `strict: true` — Strictest possible
- `noEmitOnError: true` — Don't emit broken code
- `declaration: true` — Generate `.d.ts` for consumers
- `sourceMap: true` — Debug built code
- Path aliases for imports (`@cr1bl3/types`)

Each package extends root config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

## Test Structure

### Test Pyramid

```
┌─────────────┐
│   E2E (10%) │  Full workflows, UI, integration
├─────────────┤
│  Integ (20%)│  Multiple modules together
├─────────────┤
│Unit (70%)   │  Pure functions, single modules
└─────────────┘
```

### Coverage Tiers

By package type:

- **Core packages** (types, core, graph): 70% minimum
- **Plugins**: 70% minimum
- **UI packages**: 60% (visual testing is hard)

### Test Fixtures

Reusable test data:

```
packages/my-package/
└── src/__fixtures__/
    ├── sample-graph.ts
    ├── sample-nodes.ts
    └── mock-plugin.ts
```

Used across related packages to ensure consistency.

## Naming Conventions

### Files

- Source: `camelCase.ts`
- Tests: `camelCase.test.ts`
- Fixtures: `__fixtures__/descriptive-name.ts`

### Commits

Format: `type(scope): short description`

```
feat(types): add PersonaNode interface
fix(graph): handle self-loops correctly
test(plugin-sdk): add mock plugin factory
docs(contributing): explain test pyramid
```

Types: `feat`, `fix`, `test`, `docs`, `refactor`, `style`, `chore`

### Branches

- Feature: `feature/short-description`
- Bug fix: `fix/issue-123`
- Docs: `docs/topic-name`

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **Setup** (Node 18.x + 20.x)
2. **Type checking** — `pnpm typecheck`
3. **Linting** — ESLint + Prettier
4. **Testing** — `pnpm test`
5. **Build** — `pnpm build`
6. **Coverage** — Upload to Codecov

Runs on:
- Every push to `main` or `develop`
- Every pull request

Must pass before merge.

## Code Review Checklist

When reviewing PRs:

- [ ] Tests added/updated for changes
- [ ] Coverage maintained or improved
- [ ] No `any` types without explanation
- [ ] All functions have return types
- [ ] Commit messages follow format
- [ ] TypeScript strict mode passes
- [ ] No console.log in production code
- [ ] README/docs updated if needed

## Performance Considerations

### Build Time

- Turbo caches builds — only rebuild what changed
- Vitest parallelizes tests
- Keep packages focused (less to rebuild)

### Test Speed

- Unit tests should be < 1ms each
- Mock external services
- Avoid real file I/O in unit tests
- Use integration tests sparingly

Target: Full test suite < 30 seconds

### Type Checking

- Should complete < 10 seconds
- Use project references if it gets slow
- Keep strict mode (no shortcuts)

## Package Quality Checklist

New packages need:

- [ ] `package.json` with correct metadata
- [ ] `tsconfig.json` extending root config
- [ ] `src/index.ts` with exports
- [ ] `src/*.test.ts` for all modules (70% coverage)
- [ ] `README.md` explaining purpose and API
- [ ] `dist/` build output (git-ignored)

## Tools We Use

| Tool | Purpose | Config |
|------|---------|--------|
| **TypeScript** | Type safety | `tsconfig.json` |
| **ESLint** | Code quality | `.eslintrc.json` |
| **Prettier** | Formatting | `.prettierrc.json` |
| **Vitest** | Testing | `vitest.config.ts` |
| **Husky** | Pre-commit hooks | `.husky/` |
| **Lint-staged** | Run on changed files | `.lintstagedrc.json` |
| **Turbo** | Monorepo orchestration | `turbo.json` |

## Decisions

### Why Vitest?

- Fast (native ESM support)
- Great TypeScript support
- Modern API (closer to Jest)
- Built-in coverage

### Why ESLint strict?

- Catches bugs early
- Prevents common mistakes
- Keeps code consistent
- No `any` = more maintainable

### Why 70% coverage minimum?

- Catches most regressions
- Not too high (diminishing returns > 80%)
- Allows pragmatic decisions
- Enough for confidence

### Why pre-commit hooks?

- Catches mistakes before CI
- Faster feedback loop
- Prevents formatting churn
- Enforces standards locally

## When Exceptions Happen

### Can I skip a type check?

No. Rewrite the code differently.

### Can I use `any`?

Only with a comment explaining why:

```ts
const someValue: any = externalLib.process() // external lib has no types
```

### Can I skip tests?

Only for trivial code (re-exports, 1-line utilities with no logic).

Everything else needs tests.

### Can I skip linting?

No. Fix the style.

### Can coverage be lower?

For UI packages: yes, 60% is acceptable.

For core packages: no, maintain 70%+.

## Future Improvements

- [ ] Benchmark test suite performance
- [ ] Add visual regression tests (UI)
- [ ] Set up automatic dependency updates
- [ ] Integrate security scanning
- [ ] Add performance profiling
- [ ] Set up automatic releases

## Resources

- See `TESTING.md` for detailed testing guide
- See `CONTRIBUTING.md` for developer workflow
- See `.github/workflows/ci.yml` for full pipeline
