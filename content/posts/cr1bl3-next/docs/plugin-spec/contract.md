# Plugin Contract

Plugins convert authorized inputs into normalized graph nodes, edges, and evidence. They do not write directly to dashboards.

```ts
export type Cr1bl3NodeType =
  | 'person'
  | 'alias'
  | 'email'
  | 'account'
  | 'wallet'
  | 'device'
  | 'file'
  | 'backup'
  | 'domain'
  | 'event'
  | 'evidence'

export interface Cr1bl3Plugin {
  id: string
  name: string
  version: string
  description: string
  capabilities: string[]
  inputs: string[]
  outputs: Cr1bl3NodeType[]
  riskLevel: 'safe' | 'sensitive' | 'restricted'
  scan(input: PluginInput, context: PluginContext): Promise<PluginResult>
}
```

## Rule

Every plugin result must cite source evidence. Confidence scores are allowed; unsupported claims are not.
