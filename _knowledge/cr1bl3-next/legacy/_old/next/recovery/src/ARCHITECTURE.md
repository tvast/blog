# Architecture Documentation

## Overview

Recovery Studio uses a feature-based modular architecture with clear separation of concerns:

- **Composables**: Business logic and state management
- **Components**: UI presentation and user interaction
- **Utils**: Reusable formatting and helper functions

## Directory Structure

```
src/
├── components/
│   ├── AppHeader.vue              # Main header with language selector & status
│   ├── ControlPanel.vue           # Left sidebar with all scan configuration
│   ├── ResultsPanel.vue           # Main content area showing results
│   ├── controls/                  # Control sub-components
│   │   ├── SourceSelector.vue     # Data source selection
│   │   ├── PatternSelector.vue    # Filename pattern configuration
│   │   └── ContentScanner.vue     # File content scanning options
│   ├── results/                   # Results display sub-components
│   │   ├── StatsGauges.vue        # LED gauge panels
│   │   └── ResultsTable.vue       # Results table with actions
│   ├── dialogs/                   # Dialog modals
│   │   ├── RemotesManagerDialog.vue
│   │   └── GmailViewerDialog.vue
│   └── GmailDashboard.vue         # (existing Gmail component)
│
├── composables/                   # Reusable logic and state management
│   ├── useSourceManagement.js     # Local & remote source handling
│   ├── useScanControl.js          # Scan lifecycle and configuration
│   ├── useRemoteManagement.js     # NAS/email remote sources
│   ├── useImageScanning.js        # Sleuth Kit image file scanning
│   ├── useAppleBackups.js         # macOS iPhone/iPad backup detection
│   └── useRecovery.js             # File recovery operations
│
├── utils/                         # Reusable utilities
│   └── formatters.js              # Display formatting functions
│
├── App.vue                        # Main app orchestrator (simplified)
└── ARCHITECTURE.md                # This file
```

## Feature Modules

### 1. Source Management (`useSourceManagement.js`)
Handles data source discovery and selection:
- Lists available sources (local folders, NAS, email, images)
- Allows manual folder browsing
- Manages source list
- Detects Sleuth Kit (TSK) image sources

**Related Components**:
- `SourceSelector.vue` - UI for source selection

### 2. Scan Control (`useScanControl.js`)
Core scanning engine orchestration:
- Configuration: name patterns, content needles, size limits
- Runtime: start/stop scan, progress tracking
- Results: matches list, filtering
- Event subscriptions: progress, match found, completion, errors

**Related Components**:
- `ControlPanel.vue` - Configuration UI
- `PatternSelector.vue` - Pattern configuration
- `ContentScanner.vue` - Content scan settings
- `ResultsPanel.vue` - Results display

### 3. Remote Management (`useRemoteManagement.js`)
Configures and manages remote data sources:
- NAS (SMB/AFP) connections
- Email account connections
- Dynamic field generation based on connector type
- CRUD operations for remote configurations

**Related Components**:
- `RemotesManagerDialog.vue` - Remote configuration UI

### 4. Image Scanning (`useImageScanning.js`)
Sleuth Kit disk image support:
- TSK availability detection
- Image file picking
- Include deleted files option

### 5. Apple Backups (`useAppleBackups.js`)
macOS-specific device backup scanning:
- Detects local iPhone/iPad backups
- User selection dialog
- Adds backup to sources

### 6. Recovery Operations (`useRecovery.js`)
File recovery from scan results:
- Recover files from raw images
- Reveal files in system explorer

**Related Components**:
- `ResultsTable.vue` - Recovery action buttons

## Component Hierarchy

```
App.vue (main orchestrator)
├── AppHeader.vue
├── ControlPanel.vue
│   ├── SourceSelector.vue
│   ├── PatternSelector.vue
│   └── ContentScanner.vue
├── ResultsPanel.vue
│   ├── StatsGauges.vue
│   └── ResultsTable.vue
├── RemotesManagerDialog.vue
└── GmailViewerDialog.vue
    └── GmailDashboard.vue
```

## Data Flow

### Initialization
1. `App.vue` mounts
2. Load defaults: name patterns, content needles
3. Load available sources
4. Initialize TSK if available
5. Subscribe to backend events

### Scan Execution
1. User configures options and selects source
2. User clicks "Engage" (start scan)
3. Backend emits progress/match/done events
4. UI updates in real-time
5. Results accumulate in matches list

### Remote Configuration
1. User opens remotes dialog
2. Lists configured remotes
3. User creates/edits/deletes remote
4. Configuration persists in backend
5. Remote appears in source dropdown

## Utilities

### formatters.js
```javascript
fmt(n)                    // Number formatting with separators
fmtBytes(n)              // Bytes to human-readable (B, KB, MB, etc)
parseFmtBytes(str)       // Parse formatted bytes string
sourceIcon(type)         // Icon name for source type
ledStr(n)                // LED display formatting
ledGhost(s)              // LED background padding
```

## State Management Pattern

Each composable manages its own state:

```javascript
// Example: useScanControl
export function useScanControl(api) {
  // Configuration state
  const namePatterns = ref([])
  const scanContent = ref(false)
  
  // Runtime state
  const running = ref(false)
  const matches = ref([])
  
  // Methods
  async function start(rootPath) { ... }
  async function stop() { ... }
  
  // Computed
  const canStart = computed(() => !!rootPath)
  
  return {
    // Expose state and methods
    namePatterns,
    running,
    matches,
    start,
    stop,
    canStart
  }
}
```

## Communication Patterns

1. **Parent to Child**: Props and v-models
   ```vue
   <ControlPanel 
     v-model:rootPath="rootPath"
     :apiReady="apiReady"
     @start="start"
   />
   ```

2. **Child to Parent**: Emits
   ```javascript
   defineEmits(['update:rootPath', 'start', 'stop'])
   ```

3. **Composable to Component**: Injection and return values
   ```javascript
   const { running, start } = useScanControl(api)
   ```

## Backend Integration

All composables accept an `api` object (from `window.recovery`):
- `api.listSources()` - Get available sources
- `api.startScan(config)` - Begin scan
- `api.onProgress(cb)` - Progress events
- `api.recoverFile(params)` - Recover a file
- etc.

This allows composables to work independently of component implementation.

## Testing Strategy

### Composables
- Unit test each composable with mock API
- Verify state transitions (start → running → stopped)
- Test computed values

### Components
- Snapshot tests for structure
- Event emission tests (clicks, form submission)
- Props validation

### Integration
- Full app flow: select source → configure → scan → results

## Future Improvements

1. **Extract more sub-components**
   - `RemoteForm.vue` - Extracted form logic
   - `RemoteList.vue` - Extracted list logic

2. **State persistence**
   - Store defaults in localStorage
   - Persist recent sources

3. **Error boundaries**
   - Capture composable errors
   - Graceful UI fallbacks

4. **TypeScript migration**
   - Add type safety to composables
   - Component prop validation via types

5. **Performance optimization**
   - Virtual scrolling for large result sets (already using)
   - Pagination for remote sources list
   - Debouncing search/filter

## Glossary

- **Composable**: Vue 3 function returning reactive state and methods
- **TSK**: Sleuth Kit - forensic analysis tool for disk images
- **Source**: Data location (folder, NAS, image, backup)
- **Pattern**: Filename filter rule
- **Match**: Found file matching search criteria
- **Remote**: Network-accessible data source (NAS, email)
- **Connector**: Backend plugin for remote source type
