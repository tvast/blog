# Building a cr1bl3 Plugin

This guide shows how to create a plugin following cr1bl3's quality standards.

## Plugin Philosophy

A plugin is a **pure collector**, not a decision-maker:

1. Receives **one input** (email, username, wallet, domain)
2. Collects **authorized data only** (public API or user's own backups)
3. Returns **normalized nodes, edges, and evidence**
4. Declares **risk level** and **output types**
5. Never **invents facts** — only states what was found

## Step 1: Define Plugin Metadata

Every plugin starts with a metadata declaration:

```ts
// plugins/sherlock/src/plugin.ts
import type { Cr1bl3Plugin } from '@cr1bl3/types'

export const sherlockPlugin: Cr1bl3Plugin = {
  id: 'sherlock',
  name: 'Sherlock OSINT',
  version: '0.1.0',
  description: 'Search authorized public profiles from a username',
  
  capabilities: ['osint.username.lookup'],
  inputs: ['username', 'email'],
  outputs: ['alias', 'account', 'evidence'],
  
  riskLevel: 'sensitive',  // Accesses public APIs
}
```

### Metadata Fields

- **id** — Unique identifier (kebab-case)
- **name** — Human-readable name
- **version** — Semantic versioning
- **description** — What it does in one sentence
- **capabilities** — What operations it can do
- **inputs** — What types of data it accepts
- **outputs** — What node types it creates
- **riskLevel** — `safe` | `sensitive` | `restricted`

## Step 2: Create Package Structure

```bash
mkdir -p plugins/sherlock/{src,src/__tests__,src/__fixtures__}
touch plugins/sherlock/{package.json,tsconfig.json,README.md}
```

### package.json template

```json
{
  "name": "@cr1bl3/plugin-sherlock",
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
  "dependencies": {
    "@cr1bl3/types": "workspace:*",
    "@cr1bl3/plugin-sdk": "workspace:*"
  },
  "devDependencies": {
    "typescript": "workspace:*",
    "vitest": "workspace:*"
  }
}
```

### tsconfig.json template

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": false
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Step 3: Implement the Plugin Class

```ts
// plugins/sherlock/src/sherlock-plugin.ts
import { BasePlugin } from '@cr1bl3/plugin-sdk'
import type { 
  PluginInput, 
  PluginContext, 
  PluginResult 
} from '@cr1bl3/types'

export class SherlockPlugin extends BasePlugin {
  async scan(input: PluginInput, context: PluginContext): Promise<PluginResult> {
    const nodes = []
    const edges = []
    const evidence = []

    // Validate input
    if (!input.value || !input.value.trim()) {
      return {
        nodes: [],
        edges: [],
        evidence: [],
        summary: 'No username provided',
      }
    }

    // Collect data from authorized source
    try {
      const results = await this.searchSherlock(input.value)

      if (results.length === 0) {
        return {
          nodes: [],
          edges: [],
          evidence: [],
          summary: `No public profiles found for "${input.value}"`,
        }
      }

      // Transform results into graph structure
      for (const result of results) {
        nodes.push({
          id: `alias-${result.username}`,
          type: 'alias',
          label: result.username,
          sourcePlugin: this.getId(),
          confidence: 0.95,
          metadata: { platform: result.platform },
        })

        evidence.push({
          id: `evidence-${result.id}`,
          source: result.url,
          sourcePlugin: this.getId(),
          type: 'public_profile',
          value: result.url,
          timestamp: new Date().toISOString(),
          confidence: 0.95,
          sensitive: false,
        })
      }

      return {
        nodes,
        edges,
        evidence,
        summary: `Found ${nodes.length} public profiles for "${input.value}"`,
      }
    } catch (error) {
      return {
        nodes: [],
        edges: [],
        evidence: [],
        summary: `Error searching for "${input.value}": ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  private async searchSherlock(username: string): Promise<any[]> {
    // Call actual API or use subprocess
    // Return normalized results
    return []
  }
}
```

## Step 4: Export and Register

```ts
// plugins/sherlock/src/index.ts
export { sherlockPlugin } from './plugin'
export { SherlockPlugin } from './sherlock-plugin'
```

## Step 5: Write Tests (CRITICAL)

Tests document what the plugin does and ensure it stays correct.

### Test fixtures

```ts
// plugins/sherlock/src/__fixtures__/mock-results.ts
export const mockSherlockResults = [
  {
    id: '1',
    username: 'johndoe123',
    platform: 'twitter',
    url: 'https://twitter.com/johndoe123',
  },
  {
    id: '2',
    username: 'johndoe123',
    platform: 'github',
    url: 'https://github.com/johndoe123',
  },
]
```

### Test cases

```ts
// plugins/sherlock/src/sherlock-plugin.test.ts
import { describe, it, expect, vi } from 'vitest'
import { SherlockPlugin } from './sherlock-plugin'
import { sherlockPlugin } from './plugin'
import { mockSherlockResults } from './__fixtures__/mock-results'

describe('SherlockPlugin', () => {
  describe('metadata', () => {
    it('should declare required metadata', () => {
      expect(sherlockPlugin.id).toBe('sherlock')
      expect(sherlockPlugin.riskLevel).toBe('sensitive')
      expect(sherlockPlugin.inputs).toContain('username')
    })
  })

  describe('scan', () => {
    let plugin: SherlockPlugin

    beforeEach(() => {
      plugin = new SherlockPlugin(sherlockPlugin)
    })

    it('should return empty result for empty input', async () => {
      const result = await plugin.scan({ value: '' }, {})

      expect(result.nodes).toHaveLength(0)
      expect(result.evidence).toHaveLength(0)
      expect(result.summary).toContain('No username')
    })

    it('should find public profiles', async () => {
      // Mock the search method
      vi.spyOn(plugin as any, 'searchSherlock').mockResolvedValue(mockSherlockResults)

      const result = await plugin.scan({ value: 'johndoe123' }, {})

      expect(result.nodes).toHaveLength(2)
      expect(result.evidence).toHaveLength(2)
      expect(result.summary).toContain('Found 2 public profiles')
    })

    it('should create nodes with correct type and confidence', async () => {
      vi.spyOn(plugin as any, 'searchSherlock').mockResolvedValue(mockSherlockResults)

      const result = await plugin.scan({ value: 'johndoe123' }, {})
      const node = result.nodes[0]

      expect(node.type).toBe('alias')
      expect(node.confidence).toBeGreaterThan(0.9)
      expect(node.sourcePlugin).toBe('sherlock')
    })

    it('should handle search errors gracefully', async () => {
      vi.spyOn(plugin as any, 'searchSherlock').mockRejectedValue(
        new Error('API rate limit exceeded')
      )

      const result = await plugin.scan({ value: 'johndoe123' }, {})

      expect(result.nodes).toHaveLength(0)
      expect(result.summary).toContain('Error')
    })
  })
})
```

## Step 6: Document in README

```markdown
# @cr1bl3/plugin-sherlock

Searches public profiles from a username using authorized OSINT sources.

## Input

- Username (e.g., "johndoe123")
- Optional: email

## Output

Creates nodes for:
- `alias` — The username itself
- `account` — Verified accounts on platforms

Evidence includes:
- Public profile URLs
- Discovery timestamp
- Platform information

## Risk Level

Sensitive — Uses public APIs only, no authentication bypass.

## Usage

```ts
import { SherlockPlugin, sherlockPlugin } from '@cr1bl3/plugin-sherlock'

const plugin = new SherlockPlugin(sherlockPlugin)
const result = await plugin.scan({ value: 'johndoe123' }, {})

console.log(`Found ${result.nodes.length} profiles`)
```

## Limitations

- Rate-limited by source APIs
- Only finds profiles that link to the exact username
- Confidence depends on profile verification
```

## Quality Checklist

Before publishing:

- [ ] All tests pass (`pnpm test`)
- [ ] Coverage ≥ 70% (`pnpm test:coverage`)
- [ ] TypeScript strict (`pnpm typecheck`)
- [ ] ESLint/Prettier pass (`pnpm lint`)
- [ ] Builds without errors (`pnpm build`)
- [ ] README explains purpose, inputs, outputs, risk
- [ ] No hardcoded credentials or API keys
- [ ] Error handling doesn't crash (returns summary with error)
- [ ] All nodes reference sourcePlugin
- [ ] All evidence has timestamp and confidence
- [ ] Commit message follows format: `feat(plugin-sherlock): initial implementation`

## Running in CI

Add plugin to GitHub Actions:

```yaml
- name: Test plugin-sherlock
  run: pnpm test -- plugins/sherlock
```

## Common Mistakes to Avoid

❌ **Don't** invent data when source doesn't have it
```ts
// Bad
return { summary: 'User is probably a bot' }  // No evidence!
```

✅ **Do** only state what you found
```ts
// Good
return { summary: 'No behavioral data to analyze' }
```

---

❌ **Don't** skip error handling
```ts
// Bad
const data = await externalApi.search(username)  // Crashes if API is down
```

✅ **Do** handle gracefully
```ts
// Good
try {
  const data = await externalApi.search(username)
} catch (error) {
  return { nodes: [], edges: [], evidence: [], summary: `Error: ${error.message}` }
}
```

---

❌ **Don't** use `any` types
```ts
// Bad
const result: any = await search(input)
```

✅ **Do** type everything
```ts
// Good
interface SearchResult {
  id: string
  username: string
  platform: string
  url: string
}
const result: SearchResult[] = await search(input)
```

## Next Steps

1. Read `docs/TESTING.md` for testing patterns
2. Look at `@cr1bl3/plugin-sdk` for base classes
3. Review `docs/architecture/QUALITY.md` for standards
4. Open a PR when ready
