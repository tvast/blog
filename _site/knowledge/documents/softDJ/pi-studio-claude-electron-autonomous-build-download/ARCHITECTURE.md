# π DJ Architecture

Complete technical architecture and system design for the audio-reactive ASCII art visualization application.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Core Systems](#core-systems)
5. [Data Flow](#data-flow)
6. [Component Hierarchy](#component-hierarchy)

---

## Project Overview

**π DJ** is a browser-based audio-reactive ASCII art visualization engine built with Vue 3 and Quasar Framework. It combines real-time audio analysis with procedural 3D ASCII rendering to create dynamic, music-driven visualizations.

### Key Capabilities

- **Real-time Audio Analysis** — Microphone, audio files, video files
- **6 ASCII Art Scenes** — Donut, Matrix, Plasma, Waves, Starfield, Conway's Life
- **Shader-based Rendering** — Three.js with GLSL vertex/fragment shaders
- **Responsive UI** — Desktop and mobile layouts
- **Multi-platform** — Web, Electron desktop, GitHub Pages hosting

---

## Technology Stack

### Frontend Framework
- **Vue 3** — Composition API with `<script setup>` syntax
- **Quasar Framework** — Material Design components and CLI
- **TypeScript** — Type safety (configured but optional)

### Graphics & Audio
- **Three.js** — WebGL 3D rendering engine (v184)
- **Web Audio API** — Real-time audio analysis and frequency detection
- **GLSL Shaders** — Custom vertex/fragment shaders for effects

### Build & Deployment
- **Vite** — Lightning-fast build tool
- **npm** — Package management
- **GitHub Actions** — CI/CD pipeline
- **Electron** — Cross-platform desktop app
- **icon-genie** — Icon generation for all platforms

### State Management
- **Pinia** — Lightweight store for reactive state
- **Vue Reactivity** — Composables for shared logic

---

## Directory Structure

```
ascii-studio/
├── src/
│   ├── components/              # Reusable Vue components
│   │   ├── AsciiCanvas.vue      # Main visualization component
│   │   ├── ControlPanel.vue     # Settings & control interface
│   │   ├── SliderRow.vue        # Control component
│   │   └── ColorField.vue       # Color picker component
│   │
│   ├── composables/             # Reusable logic (Composition API)
│   │   ├── useAsciiEngine.ts    # Animation & rendering loop
│   │   ├── useI18n.ts           # Internationalization
│   │   └── useMediaHandler.ts   # Audio/video input handling
│   │
│   ├── layouts/                 # Page layouts
│   │   └── MainLayout.vue       # Root layout wrapper
│   │
│   ├── pages/                   # Route pages
│   │   └── IndexPage.vue        # Main application page
│   │
│   ├── scenes/                  # ASCII art scene definitions
│   │   ├── donut.js             # 3D rotating donut
│   │   ├── matrix.js            # Matrix rain effect
│   │   ├── plasma.js            # Plasma waves
│   │   ├── waves.js             # Audio-reactive waves
│   │   ├── starfield.js         # Star field
│   │   ├── life.js              # Conway's Game of Life
│   │   └── index.js             # Scene registry
│   │
│   ├── stores/                  # Pinia state management
│   │   └── config.ts            # Application state
│   │
│   ├── css/                     # Global styles
│   │   ├── app.scss             # App styles
│   │   ├── animations.scss      # Animation definitions
│   │   └── variables.scss       # Design tokens
│   │
│   └── App.vue                  # Root component
│
├── public/                      # Static assets
│   ├── logo-pi-tomato.png       # Application logo
│   └── logo-ai.gif              # AI Premium Studio logo
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
│
├── quasar.conf.js               # Quasar configuration
├── vite.config.ts               # Vite build configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # User documentation
```

---

## Core Systems

### 1. Audio Reactivity System

**Components:**
- `useMediaHandler.ts` — Audio input management (mic, file, video)
- `AsciiCanvas.vue` — Audio analysis & frequency detection
- Web Audio API Analyser Node — FFT-based frequency analysis

**Flow:**
```
Audio Input (Microphone/File/Video)
    ↓
Web Audio Context
    ↓
Analyser Node (FFT 512)
    ↓
Frequency Data (byte array)
    ↓
Scene Renderer (uses for parameter modulation)
```

**Frequency Bands:**
- **LOW** (0-25%) — Bass/sub-bass frequencies
- **MID** (25-50%) — Midrange frequencies
- **HIGH** (50-100%) — Treble/high frequencies
- **RMS** — Overall signal power

### 2. Rendering System

**Components:**
- `useAsciiEngine.ts` — Main animation loop with requestAnimationFrame
- `AsciiCanvas.vue` — Canvas management and scene orchestration
- Scene objects — Individual visualization algorithms
- GLSL Shaders — GPU-accelerated effects

**Rendering Pipeline:**
```
requestAnimationFrame Loop (60 FPS)
    ↓
Scene.render(frame_data)
    ↓
ASCII Ramp Mapping (pixel to character)
    ↓
Color Application (via palette)
    ↓
Character Buffer → String Output
    ↓
DOM Update (pre element)
```

### 3. State Management

**Pinia Store** (`src/stores/config.ts`):
```javascript
{
  // Scene Selection
  scene: string              // Current scene ID
  sceneList: Array           // Available scenes
  
  // Playback
  playing: boolean           // Animation playing state
  
  // Display
  cols: number               // Terminal columns
  rows: number               // Terminal rows
  fontSize: number           // Text size in pixels
  
  // Colors
  fgColor: string            // Text color (hex)
  bgColor: string            // Background color (hex)
  glow: boolean              // Glow effect toggle
  
  // Audio
  autoScenes: boolean        // Auto-transition scenes
  autoSceneInterval: number  // Scene transition interval (seconds)
  autoSceneBlend: number     // Scene blend duration
  
  // Internationalization
  locale: string             // Current language code
}
```

### 4. Composition API Pattern

All reusable logic uses Vue 3 Composition API:

```javascript
// composables/useMyFeature.ts
import { ref, computed, watch } from 'vue'

export function useMyFeature() {
  const state = ref(initialValue)
  const derived = computed(() => process(state.value))
  
  watch(state, (newVal) => {
    // Handle side effects
  })
  
  return { state, derived }
}

// In components:
import { useMyFeature } from '@/composables/useMyFeature'

export default {
  setup() {
    const { state, derived } = useMyFeature()
    return { state, derived }
  }
}
```

---

## Data Flow

### Audio-to-Visualization Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Audio Input Layer                                           │
│ ├─ Microphone (getUserMedia)                               │
│ ├─ Audio File (MediaElement)                               │
│ └─ Video File (MediaElement + audio track)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│ Web Audio API Layer                                         │
│ ├─ AudioContext                                             │
│ ├─ MediaStreamAudioSource (for microphone)                  │
│ ├─ MediaElementAudioSource (for files/video)               │
│ └─ AnalyserNode (FFT size: 512)                             │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│ Frequency Analysis                                          │
│ ├─ getByteFrequencyData() → Uint8Array                      │
│ ├─ Band Extraction (LOW, MID, HIGH, RMS)                    │
│ └─ Normalization (0-100%)                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│ Scene Parameter Modulation                                  │
│ ├─ Sinusoidal oscillation                                   │
│ ├─ Frequency-driven scaling                                 │
│ └─ Parameter smoothing                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│ ASCII Rendering                                             │
│ ├─ Scene.render(params, freq_data)                          │
│ ├─ Character ramp mapping                                   │
│ ├─ Color palette application                                │
│ └─ Frame buffer assembly                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│ DOM Update                                                  │
│ ├─ Pre element text content                                 │
│ ├─ CSS text-shadow (glow effect)                            │
│ └─ Dynamic font sizing                                      │
└─────────────────────────────────────────────────────────────┘
```

### State Management Flow

```
User Interaction
    ↓
IndexPage / ControlPanel
    ↓
Store Action (e.g., store.togglePlay())
    ↓
Pinia Store Update (reactive)
    ↓
Watchers Triggered (components, composables)
    ↓
UI/Animation Update
```

---

## Component Hierarchy

```
App.vue
└── MainLayout.vue
    └── IndexPage.vue
        ├── AsciiCanvas.vue (visualization)
        │   ├── Canvas element (Three.js rendered)
        │   ├── Pre element (ASCII art)
        │   ├── Video element (media playback)
        │   └── HUD overlay (controls)
        │
        └── ControlPanel.vue (right sidebar)
            ├── Quick Actions (play, reseed, language)
            ├── Tab Navigation
            │   ├── Scene Tab
            │   │   ├─ Scene selector
            │   │   └─ Scene-specific controls
            │   ├── Grid Tab (canvas size)
            │   ├── Charset Tab (character selection)
            │   ├── Appearance Tab (colors, themes)
            │   ├── Audio Tab (audio knobs + meters)
            │   ├── Video Tab (video controls)
            │   └── Effects Tab (visual effects knobs)
            └── Status Info
```

### Component Responsibilities

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **AsciiCanvas** | Main visualization engine | Rendering loop, audio analysis, video handling |
| **ControlPanel** | Settings & parameters | Tabs, knobs, file inputs, color picker |
| **IndexPage** | Page layout & orchestration | Route page, page-level state |
| **MainLayout** | App shell | Header/footer/navigation |

---

## Reactive State Pattern

All state uses Vue 3 Composition API with Pinia for global state:

```javascript
// Store definition
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    scene: 'donut',
    playing: false,
    cols: 240,
    rows: 60,
    // ...
  }),
  
  getters: {
    currentScene() {
      return this.sceneList.find(s => s.value === this.scene)
    }
  },
  
  actions: {
    togglePlay() {
      this.playing = !this.playing
    }
  }
})

// In components (reactive updates)
const store = useConfigStore()
watch(() => store.playing, (newVal) => {
  // Automatically updates when store changes
})
```

---

## Key Design Patterns

### 1. Composition API for Logic Reuse
- `useAsciiEngine()` — Animation loop, frame generation
- `useMediaHandler()` — Audio/video input management
- `useI18n()` — Internationalization

### 2. Pinia Stores for Global State
- Centralized, reactive state
- Time-travel debugging support
- DevTools integration

### 3. Functional Scenes
Each scene is a function that returns an object with `render()` method:
```javascript
export default {
  id: 'myScene',
  label: 'My Scene',
  defaults: { speed: 1 },
  controls: [ /* param definitions */ ],
  create() {
    return {
      render({ cols, rows, t, params, charset, freq }) {
        // Return ASCII string
      }
    }
  }
}
```

### 4. Reactive Props & Events
- Props flow down (data)
- Events flow up (actions)
- Store for cross-component communication

---

## Performance Considerations

### Optimization Strategies

1. **Memoization** — Precompute lookup tables
2. **Lazy Rendering** — Skip frames if no visual change
3. **GPU Acceleration** — Three.js for heavy lifting
4. **Web Workers** — Consider for complex calculations
5. **Debouncing** — Batch DOM updates

### Frame Budget
- Target: 60 FPS (16.67ms per frame)
- Analysis: ~2ms (FFT)
- Rendering: ~8ms (scene algorithm)
- DOM update: ~4ms (pre element)
- Headroom: ~2ms buffer

---

## Future Architecture Considerations

### Potential Enhancements

1. **Shader System** — More sophisticated GPU effects
2. **Plugin System** — Custom scene development
3. **Network Streaming** — Real-time collaboration
4. **WebAssembly** — Performance-critical algorithms
5. **WebGL2** — Advanced rendering features

---

**Last Updated:** June 2026  
**Version:** 1.0.0  
**Maintainer:** ai-premium.studio
