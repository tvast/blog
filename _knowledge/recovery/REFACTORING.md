# App.vue Refactoring: Feature-Based Modular Architecture

## Overview

This document describes the refactoring of the monolithic `App.vue` into a feature-based modular architecture with clear separation of concerns.

### Before & After

**Before**: Single 1000+ line `App.vue` file with:
- All UI embedded in one template
- Mixed business logic and presentation
- State scattered throughout
- Hard to maintain and test

**After**: Organized modular structure with:
- Dedicated composables for business logic
- Reusable UI components
- Clear feature boundaries
- Improved maintainability and testability

## What Was Changed

### 1. **Extracted Composables** (Business Logic Layer)

Created 6 focused composables in `src/composables/`:

#### `useSourceManagement.js`
Handles data source discovery and selection:
```javascript
- sourceOptions, loadingSources, rootPath
- isTskSource (computed)
- loadSources(), browse(), reveal()
```

#### `useScanControl.js`
Core scanning engine orchestration (most complex):
```javascript
- Configuration: namePatterns, contentNeedles, maxFileSizeMB, excludeNodeModules
- Runtime: running, currentPath, matches, filter
- Stats: scanned, matched, bytes, skipped
- Methods: start(), stop(), resetStats()
- Event subscriptions: onProgress(), onMatch(), onDone(), onError()
```

#### `useRemoteManagement.js`
Remote data source (NAS, email) configuration:
```javascript
- State: remotesDialog, connectors, remotes, form
- Computed: connectorToggle, currentConnector, currentFields, canSave
- Methods: CRUD operations, type changes, validation
```

#### `useImageScanning.js`
Sleuth Kit disk image support:
```javascript
- tsk state (ok, version, hint)
- includeDeleted toggle
- initializeTsk(), openImage()
```

#### `useAppleBackups.js`
macOS device backup detection:
```javascript
- selectAppleBackup() - Returns {path, label} or null
```

#### `useRecovery.js`
File recovery operations:
```javascript
- recover(row) - Recover from raw images
- reveal(path) - Open in system explorer
```

### 2. **Refactored App.vue**

Simplified to a 300-line orchestrator:

**Old structure** (embedded everything):
```vue
<q-select v-model="rootPath" :options="sourceOptions" ... />
<q-slider v-model="maxFileSizeMB" ... />
<q-table :rows="matches" :columns="columns" ... />
<!-- etc. -->
```

**New structure** (delegates to components):
```vue
<ControlPanel 
  v-model:root-path="sources.rootPath"
  :source-options="sources.sourceOptions"
  @start="handleStartScan"
/>
<ResultsPanel 
  :stats="scan.stats"
  :matches="scan.matches"
  @recover="recovery.recover"
/>
```

**Key improvements**:
- Clear parent-child communication via props/emits
- Readable at a glance
- Each feature cleanly delegated
- Subscription management in one place
- Proper cleanup on unmount

### 3. **Created Modular Components**

Created 10+ reusable components in `src/components/`:

#### Layout Components
- **AppHeader.vue** - Header with branding, status, language selector
- **ControlPanel.vue** - Left sidebar orchestrator
- **ResultsPanel.vue** - Main content area orchestrator

#### Control Sub-components
- **SourceSelector.vue** - Source selection and source actions
- **PatternSelector.vue** - Filename pattern configuration
- **ContentScanner.vue** - Content scanning options

#### Results Sub-components
- **StatsGauges.vue** - Retro LED gauge panels
- **ResultsTable.vue** - Results table with filters and actions

#### Dialog Components
- **RemotesManagerDialog.vue** - Remote sources management
- **GmailViewerDialog.vue** - Gmail results viewer

### 4. **Created Utilities Layer**

`src/utils/formatters.js`:
```javascript
- fmt(n) - Number formatting
- fmtBytes(n) - Bytes to human-readable
- parseFmtBytes(str) - Parse formatted bytes
- sourceIcon(type) - Get icon for source type
- ledStr(n) - LED display formatting
- ledGhost(s) - LED background padding
```

These functions were scattered throughout App.vue, now centralized and reusable.

### 5. **Created Architecture Documentation**

`src/ARCHITECTURE.md` - Comprehensive guide including:
- Directory structure overview
- Feature modules description
- Component hierarchy
- Data flow diagrams
- State management patterns
- Backend integration points
- Testing strategy

## Migration Path

### For Components Using App State

**Old way** (props drilling):
```vue
<!-- App.vue -->
<Component :stats="stats" :matches="matches" @recover="recover" />
```

**New way** (composable pattern):
```vue
<!-- App.vue -->
<script setup>
const scan = useScanControl(api)
const recovery = useRecovery(api)
</script>

<!-- ResultsPanel.vue -->
<StatsGauges :stats="stats" />
<ResultsTable @recover="recovery.recover" />
```

### For Event Handling

**Old way** (mixed concerns):
```javascript
async function start() {
  matches.value = []
  running.value = true
  await api.startScan({...})
  // Plus validation, notification logic...
}
```

**New way** (in composables):
```javascript
// useScanControl.js
async function start(rootPath) {
  matches.value = []
  running.value = true
  await api.startScan({...})
}

// App.vue - just orchestration
async function handleStartScan() {
  await scan.start(sources.rootPath.value)
}
```

## Benefits Achieved

### ✅ **Maintainability**
- Each feature in its own file
- Clear boundaries and dependencies
- Easy to locate and modify functionality

### ✅ **Reusability**
- Composables can be used in other components
- Utilities available app-wide
- Components follow Vue best practices

### ✅ **Testability**
- Composables testable independently with mock API
- Components can be snapshot tested
- Event handlers isolated and mockable

### ✅ **Scalability**
- Adding features doesn't bloat App.vue
- New components plug in cleanly
- Clear extension points

### ✅ **Developer Experience**
- Reduced cognitive load per file
- Easier onboarding for new developers
- Better IDE support with smaller files

### ✅ **Performance**
- Code splitting friendly
- Tree-shaking friendly
- Lazy loading possible for dialogs

## Key Design Decisions

### 1. **Composables Don't Import Each Other**
Each composable is independent. App.vue orchestrates and connects them.

```javascript
// ✅ Good: orchestration in App.vue
const scan = useScanControl(api)
const sources = useSourceManagement(api)
// Connect them in handlers

// ❌ Avoid: nested composable calls
const sources = useSourceManagement(api)
const scan = useScanControl(api, sources) // tight coupling
```

### 2. **Props for Configuration, Emits for Events**
Components are dumb presenters:

```vue
<!-- Good -->
<ControlPanel 
  v-model:root-path="rootPath"
  :loading="loading"
  @start="start"
/>

<!-- Avoid -->
<ControlPanel :composable="scan" />
```

### 3. **Composables Return Refs**
Allows full reactivity in templates:

```javascript
// Good
return {
  running,      // ref, reactive in template
  start,        // function
  matches       // ref array
}
```

### 4. **API Passed to Composables**
Doesn't hardcode `window.recovery`:

```javascript
export function useScanControl(api) {
  // Testable with mock API
}
```

## File Structure Summary

```
src/
├── App.vue                           # Main orchestrator (300 lines)
├── ARCHITECTURE.md                   # Architecture guide
├── components/
│   ├── AppHeader.vue
│   ├── ControlPanel.vue
│   ├── ResultsPanel.vue
│   ├── controls/
│   │   ├── SourceSelector.vue
│   │   ├── PatternSelector.vue
│   │   └── ContentScanner.vue
│   ├── results/
│   │   ├── StatsGauges.vue
│   │   └── ResultsTable.vue
│   ├── dialogs/
│   │   ├── RemotesManagerDialog.vue
│   │   └── GmailViewerDialog.vue
│   └── GmailDashboard.vue            # (existing)
├── composables/
│   ├── useSourceManagement.js
│   ├── useScanControl.js
│   ├── useRemoteManagement.js
│   ├── useImageScanning.js
│   ├── useAppleBackups.js
│   └── useRecovery.js
├── utils/
│   └── formatters.js
└── (other existing files)
```

## Testing Strategy

### Unit Tests (Composables)
```javascript
// composables/__tests__/useScanControl.test.js
describe('useScanControl', () => {
  it('starts a scan with given config', async () => {
    const mockApi = { startScan: jest.fn() }
    const { start, running } = useScanControl(mockApi)
    
    await start('/path')
    
    expect(mockApi.startScan).toHaveBeenCalled()
    expect(running.value).toBe(true)
  })
})
```

### Component Tests
```javascript
// components/__tests__/ControlPanel.test.js
describe('ControlPanel', () => {
  it('emits start event with root path', async () => {
    const wrapper = mount(ControlPanel, {
      props: { apiReady: true, running: false }
    })
    
    await wrapper.vm.$emit('start')
    
    expect(wrapper.emitted().start).toBeTruthy()
  })
})
```

### Integration Tests
```javascript
// __tests__/App.integration.test.js
describe('App Flow', () => {
  it('scans files end-to-end', async () => {
    // Mount app with mock API
    // Select source
    // Start scan
    // Verify results populated
  })
})
```

## Migration Checklist

When working with the refactored code:

- [ ] Review ARCHITECTURE.md for high-level understanding
- [ ] Check composables for business logic
- [ ] Use components for UI without logic
- [ ] Add new features as new composables + components
- [ ] Keep App.vue as orchestrator only
- [ ] Test composables independently
- [ ] Test components with mock props

## Future Improvements

1. **TypeScript Migration**
   - Add type definitions to composables
   - Strengthen component prop validation

2. **More Granular Components**
   - Split RemotesManagerDialog into RemoteForm + RemoteList
   - Extract table header into HeaderControl component

3. **State Persistence**
   - Cache defaults in localStorage
   - Remember recent sources

4. **Error Handling**
   - Add error boundaries
   - Graceful fallbacks for API failures

5. **Performance**
   - Lazy load dialogs
   - Virtual scrolling for large lists (already done)
   - Memoize expensive computations

## Questions & Answers

**Q: Why not use Pinia/Vuex for state?**
A: Composables are sufficient for this app's complexity. No need for centralized store yet.

**Q: Can I use these composables elsewhere?**
A: Yes! They're pure Vue 3 composables. Can be imported in any component.

**Q: What if I need to add a new feature?**
A: Create composable for logic + component for UI + add to App.vue orchestration.

**Q: How do I handle cross-feature communication?**
A: Go through App.vue. It's the single point where features connect.

---

## Author Notes

This refactoring was motivated by:
- App.vue became too large and hard to maintain (1000+ lines)
- Multiple developers struggling to locate code
- Difficulty testing individual features
- No clear boundaries between features
- Props drilling through multiple levels

The new structure is inspired by best practices from:
- Vue 3 Composition API patterns
- Feature-based folder structure (common in Next.js/React)
- Atomic Design principles (components organized by size)
- Separation of concerns principles
