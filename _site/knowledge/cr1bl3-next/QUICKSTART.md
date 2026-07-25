# cr1bl3 Development Quickstart

Welcome to cr1bl3. This guide gets you from zero to contributing in 5 minutes.

## Prerequisites

- Node.js 18+ (or 20+)
- pnpm 8+

## Setup

```bash
cd cr1bl3-next
pnpm install
pnpm run prepare  # Install git hooks
```

## First Command

Verify everything works:

```bash
pnpm run ci
```

This runs: lint → typecheck → test → build. If this passes, you're good to code.

## What Should I Code?

Start here, in order:

1. **Understand the architecture** — Read `docs/architecture/QUALITY.md`
2. **Understand testing** — Read `docs/TESTING.md`
3. **Review types** — Look at `packages/types/src/index.ts`
4. **Review plugin-sdk** — Look at `packages/plugin-sdk/src/`
5. **Create your own package** — Copy the structure from `plugin-sdk`

## Making a Change

### 1. Create a branch

```bash
git checkout -b feature/my-feature
```

### 2. Make the change

- Edit files in `packages/`, `apps/`, or `plugins/`
- Follow the patterns you see (types → tests → implementation)
- Keep commits small and focused

### 3. Test locally

```bash
# TypeScript check
pnpm typecheck

# Linting
pnpm lint

# Run tests
pnpm test

# Full pipeline
pnpm run ci
```

### 4. Commit

Use the format: `type(scope): description`

Examples:
```bash
git commit -m "feat(types): add PersonaNode interface"
git commit -m "test(plugin-sdk): add validator tests"
git commit -m "docs: update CONTRIBUTING guide"
```

### 5. Push and PR

```bash
git push origin feature/my-feature
```

Open a PR on GitHub. CI will run automatically.

## Common Tasks

### Create a new package

```bash
mkdir packages/my-package/src
touch packages/my-package/package.json
touch packages/my-package/tsconfig.json
touch packages/my-package/README.md
```

Follow the template in `packages/plugin-sdk/package.json`.

### Run tests for one package

```bash
pnpm test -- packages/my-package
```

### Watch mode (while developing)

```bash
pnpm test -- --watch
```

### See test UI

```bash
pnpm test:ui
```

Opens a browser interface for tests.

### Check coverage

```bash
pnpm test:coverage
```

Minimum: 70% across lines, functions, branches, statements.

### Format code

```bash
pnpm format
```

Fixes Prettier issues automatically.

### Fix linting

```bash
pnpm lint:eslint --fix
```

Fixes ESLint issues (may need manual fixes).

## Standards

Every change must:

- [ ] Pass `pnpm lint` (ESLint + Prettier)
- [ ] Pass `pnpm typecheck` (TypeScript strict)
- [ ] Pass `pnpm test` (all tests)
- [ ] Have 70%+ coverage (except UI: 60%)
- [ ] Build without errors: `pnpm build`

## File Structure

```
cr1bl3-next/
├── packages/           ← Shared libraries
│   ├── types/         ← Type definitions
│   ├── plugin-sdk/    ← Base classes for plugins
│   ├── core/          ← Main logic (not yet)
│   └── ...
├── apps/              ← User-facing applications
│   └── connect-web/   ← Web UI (not yet)
├── plugins/           ← Capability modules
│   └── (empty yet)
├── docs/              ← Architecture, decisions
│   ├── architecture/
│   ├── TESTING.md
│   └── QUALITY.md
├── .github/workflows/ ← CI/CD
└── CONTRIBUTING.md    ← Rules and patterns
```

## Understanding the Data Model

Core concept: **Everything is evidence**

```
Input (email, username, wallet)
  ↓
Plugin (collector)
  ↓
Nodes (person, account, wallet, etc)
Edges (relationships: same_as, uses, owns)
Evidence (proof: source, timestamp, confidence)
  ↓
Graph (interconnected entities)
  ↓
Persona (grouped identity)
  ↓
Dashboard (visual presentation)
```

See `packages/types/src/index.ts` for contracts.

## First Package to Explore

Start with `packages/plugin-sdk`:

1. Read `README.md` — explains purpose
2. Read `src/base-plugin.ts` — the abstraction
3. Read `src/plugin-validator.ts` — validation rules
4. Read `src/base-plugin.test.ts` — test patterns

This is your reference implementation.

## Get Help

- **Architecture questions** → Read `docs/architecture/`
- **Testing questions** → Read `docs/TESTING.md`
- **Coding standards** → Read `CONTRIBUTING.md`
- **Code examples** → Look at `packages/plugin-sdk/src/`

## Next Steps

1. Run `pnpm run ci` — verify setup
2. Read `CONTRIBUTING.md` — learn the rules
3. Read `docs/architecture/QUALITY.md` — understand standards
4. Pick a package and add a test
5. Make a real change and open a PR

Happy coding! 🔍
