# @cr1bl3/types

Core type definitions for the cr1bl3 framework.

This package defines the foundational data contracts for:
- Graph nodes and edges
- Evidence records
- Plugin specifications
- Plugin inputs/outputs

## Core Types

### GraphNode
Represents any entity in the graph (person, email, wallet, etc).

```ts
interface GraphNode {
  id: string
  type: Cr1bl3NodeType
  label: string
  sourcePlugin: string
  confidence: number // 0-1
  createdAt?: string
  metadata?: Record<string, unknown>
}
```

### GraphEdge
Connects two nodes with a labeled relationship.

```ts
interface GraphEdge {
  id: string
  from: string // node id
  to: string // node id
  relation: GraphRelation
  confidence: number
  evidenceIds: string[]
}
```

### Evidence
Immutable proof of a fact, linked to its source.

```ts
interface Evidence {
  id: string
  source: string
  sourcePlugin: string
  type: EvidenceType
  value: string
  hash?: string
  timestamp?: string
  confidence: number // 0-1
  sensitive: boolean
}
```

### Cr1bl3Plugin
Metadata about a plugin that can extend cr1bl3.

```ts
interface Cr1bl3Plugin {
  id: string
  name: string
  version: string
  description: string
  capabilities: string[]
  inputs: string[]
  outputs: Cr1bl3NodeType[]
  riskLevel: 'safe' | 'sensitive' | 'restricted'
}
```

## Design Principles

1. **Immutability** — Evidence never changes, only new evidence is added.
2. **Traceability** — Every node/edge/evidence knows its source plugin.
3. **Confidence** — Every fact has a confidence score (0-1).
4. **Sensitivity** — Evidence knows if it contains sensitive data.
5. **Relationships** — Edges must have an explicit relation type; no ambiguous connections.

## Testing

Run tests to verify type contracts:

```bash
pnpm test
```

The tests in `index.test.ts` serve as living documentation of type usage and validation rules.

## Contributing

When adding new types:
1. Update the type definition
2. Add test cases in `index.test.ts`
3. Update this README
4. Follow existing naming patterns
