# Contributing to cr1bl3

## Our Values

This project follows **software craftsmanship** principles:

1. **Clarity over cleverness** — Readable code is better than smart code.
2. **Tests are documentation** — Tests should explain the intent and contract.
3. **Types are contracts** — TypeScript strict mode catches mistakes early.
4. **Evidence over assumption** — Every claim must be provable.
5. **Incremental refinement** — Small, focused commits are better than big changes.

## Development Setup

```bash
pnpm install
pnpm run prepare  # Install husky hooks
```

## Before You Code

1. **Check existing issues** — Avoid duplicate work.
2. **Discuss large changes** — File an issue first if it's architectural.
3. **Branch naming** — `feature/foo`, `fix/bar`, or `docs/baz`.

## While You Code

### Type Safety

Enable TypeScript strict mode. No `any` without a comment explaining why.

```bash
pnpm typecheck
```

### Linting

Keep code clean and consistent.

```bash
pnpm lint          # Check ESLint and Prettier
pnpm format        # Auto-fix formatting
```

### Testing

Every package must have tests. Use Vitest.

**Test pyramid:**
- **Unit tests** (most): Single functions, pure logic
- **Integration tests** (some): Multiple modules together
- **E2E tests** (few): User workflows

```bash
pnpm test              # Run all tests
pnpm test:ui           # Interactive test UI
pnpm test:coverage     # Coverage report
```

**Coverage minimums:**
- Lines: 70%
- Functions: 70%
- Branches: 65%
- Statements: 70%

### Commit Messages

Format: `type(scope): short description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(types): add PersonaNode type
fix(plugin-sdk): handle missing context gracefully
test(graph): add edge validation tests
docs: update CONTRIBUTING guide
```

Pre-commit hooks will check your message format.

## Package Structure

Every package should follow this structure:

```
packages/my-package/
├── src/
│   ├── index.ts
│   ├── types.ts (if complex)
│   └── module.ts
├── src/__tests__/
│   ├── index.test.ts
│   └── module.test.ts
├── package.json
├── tsconfig.json
├── README.md
└── vitest.config.ts (if custom)
```

### package.json template

```json
{
  "name": "@cr1bl3/my-package",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "test": "vitest"
  },
  "devDependencies": {
    "typescript": "workspace:*",
    "vitest": "workspace:*"
  },
  "dependencies": {}
}
```

### README template

Every package needs a clear README explaining:
1. What it does (1 sentence)
2. Core types/exports
3. Usage examples
4. Design principles

## Before You Push

```bash
pnpm lint           # ESLint + Prettier check
pnpm typecheck      # TypeScript
pnpm test           # Unit tests
pnpm test:coverage  # Coverage report
pnpm build          # Ensure it builds
```

Or run the full CI suite locally:

```bash
pnpm run ci
```

## Code Review Expectations

- **Tests**: Every feature needs tests. 70% coverage minimum.
- **Types**: No `any`. TypeScript strict mode.
- **Commits**: Small, focused, meaningful commit messages.
- **Documentation**: Update README if you change the contract.

## After Your PR Merges

The package version will be bumped automatically based on commit types:
- `feat` → minor version bump
- `fix` → patch version bump
- `BREAKING CHANGE:` in commit body → major version bump

## Common Commands

```bash
# Development
pnpm dev
pnpm typecheck

# Testing
pnpm test
pnpm test:ui
pnpm test:coverage

# Quality
pnpm lint
pnpm format
pnpm ci  # Full pipeline

# Building
pnpm build
```

## Troubleshooting

### Pre-commit hook failed
Your code doesn't pass linting. Run:
```bash
pnpm format
pnpm lint:eslint --fix
```

### Tests failing
Ensure you're running the right test:
```bash
pnpm test -- packages/my-package
```

### Type errors
Check strict mode:
```bash
pnpm typecheck
```

## Questions?

- Check existing docs in `/docs`
- Search closed issues for context
- Ask in an issue or PR

Thanks for contributing to cr1bl3! 🔍
