# Testing Strategy

## Pyramid: What We Test

```
       E2E / workflows
      Integration tests
   Unit tests (majority)
```

- **Unit tests** (70%): Pure functions, type validation, single module logic
- **Integration tests** (20%): Multiple modules working together (graph building, plugin execution)
- **E2E tests** (10%): Full workflows, UI flows, dashboard rendering

## Tools

- **Vitest**: Unit & integration tests (fast, good TypeScript support)
- **@testing-library/react**: Component testing (if we have UI)
- **Manual testing**: Dashboard flows, plugin outputs

## Conventions

### File Placement

Tests live next to source code:

```
src/
  ├── index.ts
  ├── index.test.ts         ← for index.ts
  ├── graph.ts
  ├── graph.test.ts         ← for graph.ts
  └── __fixtures__/
      ├── sample-nodes.ts
      └── sample-edges.ts
```

### Test Structure

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('MyModule', () => {
  describe('pure functions', () => {
    it('should compute X when given Y', () => {
      const result = myFunction(input)
      expect(result).toBe(expected)
    })
  })

  describe('side effects', () => {
    it('should update state when triggered', async () => {
      const state = new MyState()
      await state.process(input)
      expect(state.value).toBe(expected)
    })
  })
})
```

### Naming Patterns

- **Test file**: `module.test.ts` or `module.spec.ts`
- **Test suite**: `describe('ModuleName', ...)` — matches the module
- **Test case**: `it('should [verb] when [condition]', ...)` — reads like a requirement

### Fixtures

Reusable test data lives in `__fixtures__`:

```ts
// __fixtures__/sample-graph.ts
export const sampleNodes = [
  {
    id: 'node-1',
    type: 'person',
    label: 'Test Person',
    sourcePlugin: 'test',
    confidence: 1,
  },
  // ... more nodes
]

export const sampleEdges = [
  {
    id: 'edge-1',
    from: 'node-1',
    to: 'node-2',
    relation: 'same_as',
    confidence: 0.95,
    evidenceIds: [],
  },
]
```

Import and use:

```ts
import { sampleNodes, sampleEdges } from './__fixtures__/sample-graph'

describe('GraphBuilder', () => {
  it('should link nodes correctly', () => {
    const graph = new Graph(sampleNodes, sampleEdges)
    expect(graph.nodes).toHaveLength(sampleNodes.length)
  })
})
```

## Coverage

Run coverage:

```bash
pnpm test:coverage
```

Minimums per package:
- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 65%
- **Statements**: 70%

Exception: UI/component packages can be 60% (visual testing is hard).

## Types of Tests by Package

### @cr1bl3/types

- ✅ Type instantiation tests (verify contracts)
- ✅ Type validation tests (confidence scores in range)
- ✅ Discriminated union tests (relation types, node types)
- ❌ No integration tests needed

Example:

```ts
describe('GraphNode', () => {
  it('should require sourcePlugin to be non-empty string', () => {
    const node: GraphNode = {
      id: 'n1',
      type: 'person',
      label: 'test',
      sourcePlugin: '', // ← should fail validation
      confidence: 1,
    }
    expect(node.sourcePlugin).toBeTruthy()
  })
})
```

### @cr1bl3/plugin-sdk

- ✅ Plugin contract validation
- ✅ Plugin execution with fixtures
- ✅ Error handling and fallbacks
- ✅ Mock plugin implementations

Example:

```ts
describe('PluginExecutor', () => {
  it('should execute plugin and return normalized result', async () => {
    const plugin = mockPlugin({ outputs: ['person'] })
    const result = await executor.run(plugin, { value: 'test' })
    expect(result.nodes).toBeInstanceOf(Array)
  })
})
```

### @cr1bl3/core

- ✅ Graph building logic
- ✅ Evidence normalization
- ✅ Node/edge deduplication
- ✅ Pipeline execution

### @cr1bl3/graph

- ✅ Graph operations (add node, add edge, query)
- ✅ Relationship validation
- ✅ Confidence aggregation
- ✅ Traversal algorithms

### apps/connect-web

- ✅ Route mounting
- ✅ State management
- ✅ Plugin runner UI
- ⚠️ Visual snapshots (manual)

## Mocking Strategy

### What to Mock

- External APIs (sherlock, etc)
- File system access
- Timestamps
- Randomness

### What NOT to Mock

- Internal modules (use real instances)
- Type definitions
- Graph structure (use fixtures)

### Mock pattern

```ts
import { vi } from 'vitest'

describe('ExternalService', () => {
  it('should handle API errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
    const service = new Service(mockFetch)

    await expect(service.search('query')).rejects.toThrow('Network error')
  })
})
```

## Integration Tests

Run multiple modules together to verify they work.

```ts
describe('Plugin Execution Pipeline', () => {
  it('should execute plugin and build graph', async () => {
    const plugin = await loadPlugin('sherlock')
    const result = await plugin.scan({ value: 'username' }, {})
    const graph = GraphBuilder.fromPluginResult(result)

    expect(graph.nodes).toHaveLength(greaterThan(0))
    expect(graph.edges).toHaveLength(greaterThanOrEqual(0))
  })
})
```

## What Gets Tested

### Every package must test:

1. **Public API surface** — all exports work as typed
2. **Error cases** — invalid inputs, edge cases, missing data
3. **Type contracts** — confidence scores, node IDs, plugin metadata
4. **Business logic** — evidence correlation, graph building, scoring

### Do NOT test:

- Implementation details (private methods)
- Node internals (unless they're public)
- Obvious code (1-liner utilities without logic)
- External libraries (assume they work)

## CI/CD Integration

Every PR must pass:

1. `pnpm lint` — ESLint + Prettier
2. `pnpm typecheck` — TypeScript strict mode
3. `pnpm test` — All unit tests pass
4. `pnpm test:coverage` — Meets minimum coverage
5. `pnpm build` — Builds without errors

## Running Tests

```bash
# All tests
pnpm test

# Watch mode (during development)
pnpm test -- --watch

# Single package
pnpm test -- packages/types

# UI mode (helpful for debugging)
pnpm test:ui

# Coverage report
pnpm test:coverage
pnpm test:coverage -- --reporter=html  # Open in browser
```

## Debugging Tests

### Print debug info

```ts
import { describe, it, expect } from 'vitest'

it('should debug', () => {
  console.log('Debug output:', myValue)
  expect(myValue).toBe(true)
})
```

### Run single test

```bash
pnpm test -- -t "should debug"
```

### Use test.only for focus

```ts
it.only('should debug this one', () => {
  expect(true).toBe(true)
})
```

## Continuous Improvement

- Review coverage reports monthly
- Identify patterns in test failures
- Refactor tests that become brittle
- Add tests for bugs BEFORE fixing them
