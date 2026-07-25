# @cr1bl3/plugin-sdk

Base classes and utilities for building cr1bl3 plugins.

Plugins are the primary extension point. They:
1. Receive a single input (username, email, wallet, etc)
2. Execute authorized collection/analysis
3. Return normalized nodes, edges, and evidence
4. Must declare risk level, inputs, and outputs

## Architecture

A plugin follows this contract:

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

### Plugin Lifecycle

```
1. Load plugin (verify contract)
2. Call scan(input, context)
3. Validate result (has nodes/edges/evidence)
4. Normalize to graph
5. Store evidence
6. Build relationships
```

## Building a Plugin

### Basic Example

```ts
import { BasePlugin, PluginInput, PluginContext, PluginResult } from '@cr1bl3/plugin-sdk'
import type { Cr1bl3Plugin } from '@cr1bl3/types'

export const myPlugin: Cr1bl3Plugin = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '0.1.0',
  description: 'Does something useful',
  capabilities: ['collection.data'],
  inputs: ['email', 'username'],
  outputs: ['person', 'account', 'evidence'],
  riskLevel: 'safe',
}

export class MyPlugin extends BasePlugin {
  constructor() {
    super(myPlugin)
  }

  async scan(input: PluginInput, context: PluginContext): Promise<PluginResult> {
    const nodes = []
    const edges = []
    const evidence = []

    // Your logic here
    if (!input.value) {
      return { nodes, edges, evidence, summary: 'No input provided' }
    }

    // Collect data (authorized sources only)
    // Normalize to nodes/edges/evidence

    return {
      nodes,
      edges,
      evidence,
      summary: `Found ${nodes.length} nodes`,
    }
  }
}
```

## Design Principles

1. **Single Input** — Plugin receives one value to process
2. **Normalized Output** — Always nodes, edges, evidence
3. **Immutable Results** — Plugin results don't change graph directly
4. **Authorized Only** — Public data or user's own backups
5. **Clear Risk Level** — Every plugin declares its risk
6. **Type Safe** — All inputs/outputs typed

## Risk Levels

- **safe** — Public data, no side effects
- **sensitive** — Personal data, local artifacts
- **restricted** — Dangerous, isolated, not exposed in UI

## Testing Plugins

Every plugin must be tested:

```ts
import { describe, it, expect } from 'vitest'
import { MyPlugin } from './my-plugin'

describe('MyPlugin', () => {
  it('should return empty result for empty input', async () => {
    const plugin = new MyPlugin()
    const result = await plugin.scan({ value: '' }, {})

    expect(result.nodes).toHaveLength(0)
    expect(result.evidence).toHaveLength(0)
  })

  it('should handle missing context gracefully', async () => {
    const plugin = new MyPlugin()
    const result = await plugin.scan({ value: 'test' }, {})

    expect(result).toHaveProperty('nodes')
    expect(result).toHaveProperty('edges')
    expect(result).toHaveProperty('evidence')
    expect(result).toHaveProperty('summary')
  })
})
```

## Publishing Plugins

Plugins are published as npm packages:

```json
{
  "name": "@cr1bl3/plugin-my-plugin",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

Then loaded dynamically:

```ts
const plugin = await pluginLoader.load('@cr1bl3/plugin-my-plugin')
```

## Contributing a Plugin

1. Create package in `plugins/` directory
2. Follow SDK patterns
3. Add comprehensive tests (70%+ coverage)
4. Document inputs, outputs, risk level
5. Update PLUGINS.md registry
