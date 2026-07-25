# Configuration Files Guide

Reference for all config files in the root directory and their purposes.

## Build & Language

| File | Purpose | When it matters |
|------|---------|-----------------|
| `tsconfig.json` | TypeScript strict mode | Every `.ts` file compilation |
| `vitest.config.ts` | Test runner config | `pnpm test` |
| `turbo.json` | Monorepo task orchestration | `pnpm build`, `pnpm dev` |
| `.browserslistrc` | Browser target versions | If we have browser code (future UI) |

## Code Quality

| File | Purpose | When it matters |
|------|---------|-----------------|
| `.eslintrc.json` | Linting rules | `pnpm lint:eslint` |
| `.prettierrc.json` | Code formatting | `pnpm format` |
| `.editorconfig` | Editor settings (IDE-agnostic) | Ensures consistency across editors |
| `.lintstagedrc.json` | Pre-commit hook tasks | Before every commit (Husky) |

## Git & Version Control

| File | Purpose | When it matters |
|------|---------|-----------------|
| `.gitignore` | Files to exclude from git | Every commit |
| `.gitattributes` | Line ending normalization | Across Windows/Mac/Linux |

## Package Management

| File | Purpose | When it matters |
|------|---------|-----------------|
| `.npmrc` | npm/pnpm configuration | `pnpm install` |
| `pnpm-workspace.yaml` | Monorepo workspace setup | Resolving dependencies between packages |

## Environment

| File | Purpose | When it matters |
|------|---------|-----------------|
| `.env.example` | Template for env vars | Onboarding (copy to `.env.local`) |

## CI/CD

| File | Purpose | When it matters |
|------|---------|-----------------|
| `.github/workflows/ci.yml` | GitHub Actions pipeline | Every push/PR |
| `.github/pull_request_template.md` | PR checklist | Creating new PRs |

---

## Detailed Explanations

### tsconfig.json

**TypeScript compiler options.**

Key settings:
- `strict: true` — Strictest type checking
- `noEmit: false` — Emit compiled JS (in packages)
- `noEmitOnError: true` — Don't emit if there are errors
- `declaration: true` — Generate `.d.ts` files
- `paths` — Path aliases for imports (`@cr1bl3/*`)

**When to change:**
- When adding a new package (extend in package tsconfig.json)
- When changing TypeScript version
- Never loosen strict mode

### vitest.config.ts

**Test runner configuration.**

Key settings:
- `environment: 'node'` — Tests run in Node (not browser)
- `coverage.lines: 70` — Minimum coverage threshold
- `resolve.alias` — Path aliases for test imports

**When to change:**
- When coverage requirements change
- When adding UI tests (add `environment: 'jsdom'`)

### turbo.json

**Monorepo build orchestration.**

Defines task dependencies and caching:
- `build` — Depends on `^build` (deps must build first)
- `test` — No caching (always run)
- `dev` — Persistent, no caching

**When to change:**
- When adding new scripts (lint, test, etc)
- When task dependencies change

### .eslintrc.json

**Linting rules (code quality).**

Key rules:
- No `any` types without comment
- Explicit return types on all functions
- No unused variables
- `console.log` only in tests

**When to change:**
- When enforcing new rules
- When relaxing rules for specific cases (be careful!)

### .prettierrc.json

**Code formatting.**

Settings:
- 2-space indentation
- Single quotes
- 100 character line width
- Trailing commas (ES5)

**When to change:**
- Rarely. Consistency matters more than personal preference.

### .editorconfig

**Cross-editor settings (VS Code, IntelliJ, Vim, etc).**

Ensures:
- Consistent indentation (2 spaces)
- Line endings (LF)
- Character encoding (UTF-8)
- Trimmed whitespace

**When to change:**
- When onboarding different editor types
- When standardizing on different indentation

### .lintstagedrc.json

**Pre-commit hook tasks (Husky).**

Runs before commit:
- `eslint --fix` on `.ts` files
- `prettier --write` on all files

**When to change:**
- When adding/removing linting tools
- When changing commit-time checks

### .gitignore

**Files to never commit.**

Excludes:
- `node_modules/`, `dist/`, build outputs
- `.env`, credentials, API keys
- IDE/OS files (`.DS_Store`, `.vscode/`)
- Logs, temporary files

**When to change:**
- When adding new build output directories
- When new IDE configurations appear

### .gitattributes

**Git line ending settings.**

Ensures:
- LF line endings on all source files (cross-platform)
- Proper handling of binary files

**When to change:**
- Rarely. Prevents line ending issues.

### .npmrc

**npm/pnpm package manager settings.**

Key settings:
- `engine-strict = true` — Enforce pnpm (required for workspace)
- `save-exact = true` — Save exact versions
- `link-workspace-packages = true` — Link between packages

**When to change:**
- When changing package manager rules
- When changing dependency resolution

### pnpm-workspace.yaml

**Monorepo workspace definition.**

Defines:
- `packages:` — Glob patterns for workspaces
- Currently: `apps/*`, `packages/*`, `plugins/*`

**When to change:**
- When changing monorepo structure
- When adding new workspace types

### .env.example

**Environment variable template.**

Copy to `.env.local` and fill in values.

Settings include:
- `NODE_ENV` — development/production
- API keys (commented out)
- Plugin configuration
- Debug/logging flags

**When to change:**
- When adding new environment variables
- When changing configuration options

### .github/workflows/ci.yml

**GitHub Actions CI pipeline.**

Runs on:
- Every push to `main` or `develop`
- Every pull request

Tasks:
1. Type checking (`pnpm typecheck`)
2. Linting (`pnpm lint`)
3. Tests (`pnpm test`)
4. Build (`pnpm build`)
5. Coverage upload

**When to change:**
- When adding new CI steps
- When changing node versions to test
- When changing coverage requirements

### .github/pull_request_template.md

**PR checklist shown when creating PRs.**

Reminds developers to:
- Add tests
- Maintain coverage
- Follow commit format
- Update docs

**When to change:**
- When adding new requirements
- When refining the process

---

## File Order (Priority)

Most to least critical:

1. **Must not break**: `tsconfig.json`, `.eslintrc.json`, `vitest.config.ts`
2. **Critical for workflow**: `.gitignore`, `.npmrc`, `turbo.json`
3. **Important for consistency**: `.prettierrc.json`, `.editorconfig`, `.gitattributes`
4. **Nice to have**: `.env.example`, `.browserslistrc`

---

## Adding New Config Files

When adding new tools:

1. **Create config file** (e.g., `.stylelintrc.json`)
2. **Document it here** in CONFIG_FILES.md
3. **Add to .prettierignore** if it shouldn't be formatted
4. **Add to .gitignore** if needed

Example:
```md
| `.stylelintrc.json` | CSS/SCSS linting | `pnpm lint:styles` |
```

---

## Troubleshooting Config Issues

**"My editor doesn't respect indentation"**
- Ensure EditorConfig plugin is installed
- Check `.editorconfig` is in root

**"Prettier and ESLint fight over formatting"**
- Ensure ESLint extends prettier config
- Run `pnpm format` to fix

**"Pre-commit hook is slow"**
- Pre-commit runs on changed files only
- Lint-staged is configured for this

**"CI fails but local tests pass"**
- Check Node version (CI tests 18 + 20)
- Check `.env` vars not set (use `.env.example`)

---

## Best Practices

1. **Don't commit `.env`** — Use `.env.example` as template
2. **Don't edit configs without reason** — Consistency matters
3. **Document config changes** — Update this file
4. **Test config changes** — Run `pnpm run ci` before pushing
5. **Keep files small** — Don't put logic in config

---

## See Also

- `CONTRIBUTING.md` — How to contribute
- `docs/architecture/QUALITY.md` — Quality standards
- `QUICKSTART.md` — Getting started
