# Recovery Studio - Source Code Guide

## Quick Start

Recovery Studio is a Vue 3 file recovery application with a retro industrial UI.

### Key Directories

```
src/
├── App.vue                    # Main app orchestrator
├── components/                # Vue components
│   ├── AppHeader.vue          # Header (toolbar, language selector)
│   ├── ControlPanel.vue       # Left sidebar (scan configuration)
│   ├── ResultsPanel.vue       # Main content (results display)
│   ├── controls/              # Configuration sub-components
│   ├── results/               # Results display sub-components
│   └── dialogs/               # Modal dialogs
├── composables/               # Business logic (Vue 3 Composition API)
│   ├── useSourceManagement.js # Source handling
│   ├── useScanControl.js      # Scan engine
│   ├── useRemoteManagement.js # NAS/email remotes
│   ├── useImageScanning.js    # Disk image scanning (TSK)
│   ├── useAppleBackups.js     # iPhone/iPad backups
│   └── useRecovery.js         # File recovery
└── utils/                     # Utilities
    └── formatters.js          # Display formatting
```

## Understanding the Code

### 1. How Features Work

Each feature is split into:

**Composable** (`useFeatureName.js`)
```javascript
export function useFeatureName(api) {
  // State
  const value = ref(initialValue)
  
  // Methods
  function doSomething() { ... }
  
  // Return public API
  return { value, doSomething }
}
```

**Components** (`Feature.vue` / `SubFeature.vue`)
```vue
<template>
  <!-- UI for the feature -->
</template>

<script setup>
// Receive state and methods via props
defineProps({ value, onAction })
</script>
```

### 2. App.vue Flow

1. **Initialize composables** with backend API
2. **Mount components** with composable state via v-models
3. **Listen to events** from components and update state
4. **Subscribe to backend** events and update composables
5. **Cleanup** on unmount

### 3. Adding a New Feature

1. Create `src/composables/useMyFeature.js`
```javascript
export function useMyFeature(api) {
  const state = ref(...)
  return { state, method: async () => {...} }
}
```

2. Create component(s) `src/components/MyFeature.vue`
```vue
<template><div>{{ state }}</div></template>
<script setup>
defineProps({ state })
defineEmits(['action'])
</script>
```

3. Use in App.vue
```javascript
const myFeature = useMyFeature(api)

// In template
<MyFeature :state="myFeature.state" @action="myFeature.method" />
```

## Component Relationships

```
App.vue (orchestrator)
├── AppHeader (display only)
├── ControlPanel (configuration)
│   ├── SourceSelector (source selection)
│   ├── PatternSelector (filename patterns)
│   └── ContentScanner (content search config)
├── ResultsPanel (results display)
│   ├── StatsGauges (metrics panels)
│   └── ResultsTable (results with actions)
├── GmailViewerDialog (modal)
└── RemotesManagerDialog (modal)
```

## State Management Pattern

Each composable manages its own state and returns refs for reactivity:

```javascript
const scan = useScanControl(api)

// Access state
console.log(scan.running.value)  // ref
console.log(scan.matches.value)  // ref array

// Call methods
await scan.start(rootPath)
await scan.stop()

// Subscribe to events
scan.onProgress(data => { ... })
```

## API Integration

All composables receive `window.recovery` (backend API):

```javascript
export function useSourceManagement(api) {
  async function loadSources() {
    sourceOptions.value = await api.listSources()
  }
  
  // Event subscriptions
  unsub.push(api.onProgress(data => {...}))
}
```

The API connection happens in App.vue before composable initialization.

## Common Patterns

### Using v-model with Composables

```vue
<!-- Parent -->
<template>
  <Component 
    v-model:property="composable.refProperty"
    @event="composable.method"
  />
</template>

<script setup>
const scan = useScanControl(api)
</script>

<!-- Child -->
<template>
  <input v-model="modelValue" />
</template>

<script setup>
defineProps({ modelValue: [String, Array] })
defineEmits(['update:modelValue'])

// Binding
@input="$emit('update:modelValue', $event)"
</script>
```

### Computed Properties in Components

```javascript
// When you need computed values in components
const columns = computed(() => [
  { name: 'file', field: 'name', ... },
  // Column definitions based on i18n or other state
])
```

### Event Handling in App.vue

```javascript
async function handleStartScan() {
  // Orchestration logic here
  if (!sources.rootPath.value) return
  
  // Call composable methods
  await scan.start(sources.rootPath.value)
}
```

## Testing Approach

### Composables (Pure logic)
```javascript
it('loads sources from API', async () => {
  const mockApi = { listSources: () => [{ label: 'test' }] }
  const { sourceOptions, loadSources } = useSourceManagement(mockApi)
  
  await loadSources()
  
  expect(sourceOptions.value).toHaveLength(1)
})
```

### Components (UI only)
```javascript
it('displays controls', () => {
  const wrapper = mount(ControlPanel, {
    props: { apiReady: true, running: false }
  })
  
  expect(wrapper.find('input').exists()).toBe(true)
})
```

## Style Guide

### File Naming
- Components: `PascalCase.vue` (AppHeader.vue)
- Composables: `useCamelCase.js` (useSourceManagement.js)
- Utils: `camelCase.js` (formatters.js)

### Component Organization
1. Template (clear structure)
2. Script (setup, props, emits, logic)
3. Style (scoped)

### Composable Organization
1. State initialization (refs, reactives)
2. Computed values
3. Methods
4. Return object

## Documentation Files

- **ARCHITECTURE.md** - Detailed architecture guide
- **REFACTORING.md** - Why and how we refactored
- **README.md** (this file) - Quick reference

## Common Issues & Solutions

**Issue**: Component receives undefined props
- Solution: Check App.vue is passing props correctly

**Issue**: Reactivity not working in template
- Solution: Make sure values come from ref/reactive in composable

**Issue**: Events not firing
- Solution: Component must emit with exact name App.vue is listening for

**Issue**: API not initialized
- Solution: Check `window.recovery` exists before using composables

## Getting Help

1. Check ARCHITECTURE.md for high-level overview
2. Look at similar features for patterns
3. Read composable return values carefully
4. Check component props/emits definitions
5. Look at App.vue orchestration for integration

---

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md)
For refactoring context, see [REFACTORING.md](../REFACTORING.md)
