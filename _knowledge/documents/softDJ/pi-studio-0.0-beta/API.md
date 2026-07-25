# π DJ API & Composables Documentation

Complete API reference for all composables, utilities, and stores used in π DJ.

## Table of Contents

1. [Composables](#composables)
2. [Pinia Stores](#pinia-stores)
3. [Utilities](#utilities)
4. [Scene Interface](#scene-interface)

---

## Composables

Composables are reusable logic units following Vue 3 Composition API patterns.

### useAsciiEngine

**Location:** `src/composables/useAsciiEngine.ts`

**Purpose:** Core animation loop and frame generation engine.

**Returns:**
```javascript
{
  frame: Ref<string>          // Current ASCII frame
  actualFps: Ref<number>      // Actual frame rate
  startEngine: () => void     // Start animation loop
  stopEngine: () => void      // Stop animation loop
}
```

**Usage:**
```javascript
import { useAsciiEngine } from '@/composables/useAsciiEngine'

export default {
  setup() {
    const { frame, actualFps } = useAsciiEngine()
    
    return { frame, actualFps }
  }
}
```

**Internals:**
- Maintains requestAnimationFrame loop
- Calls active scene's render() method
- Updates frame 60 times per second
- Tracks actual FPS performance
- Syncs with store.playing state

**Frame Generation Flow:**
```
requestAnimationFrame
  ↓
Get scene from store
  ↓
Call scene.render({ cols, rows, t, params, charset, freq })
  ↓
Update frame.value
  ↓
Components reactively update (pre element)
```

---

### useMediaHandler

**Location:** `src/composables/useMediaHandler.ts` (or in AsciiCanvas.vue)

**Purpose:** Handle audio/video input and playback.

**Methods:**
```javascript
{
  // Microphone
  async toggleMic(): Promise<void>
  
  // Audio Files
  async loadFile(event: Event): Promise<void>
  
  // Video Files
  async loadVideo(event: Event): Promise<void>
  
  // Video Control
  seekVideo(event: Event): void
  closeVideo(): void
  formatTime(seconds: number): string
  
  // Clips Folder
  async loadClipsFolder(event: Event): Promise<void>
}
```

**Properties:**
```javascript
{
  micOn: Ref<boolean>
  
  videoLoaded: Ref<boolean>
  videoFileName: Ref<string>
  videoDuration: Ref<number>
  videoCurrentTime: Ref<number>
  videoOpacity: Ref<number>
  
  clips: Ref<File[]>
  currentClipIndex: Ref<number>
}
```

**Usage:**
```javascript
const { toggleMic, loadFile, videoLoaded } = useMediaHandler()

// Enable microphone
await toggleMic()

// Load audio file
const fileInput = document.querySelector('input[type=file]')
await loadFile({ target: fileInput })

// Check video status
if (videoLoaded.value) {
  console.log('Video is playing')
}
```

---

### useI18n

**Location:** `src/composables/useI18n.ts`

**Purpose:** Internationalization support for multiple languages.

**Returns:**
```javascript
{
  t: (key: string, params?: object) => string  // Translate key
  localeOptions: Array<{
    value: string       // Language code (e.g., 'en', 'de')
    label: string       // Display name
  }>
}
```

**Supported Languages:**
- `en` — English
- `de` — German
- `fr` — French
- `es` — Spanish
- `ja` — Japanese
- `zh` — Simplified Chinese

**Usage:**
```javascript
import { useI18n } from '@/composables/useI18n'

export default {
  setup() {
    const { t } = useI18n()
    
    return {
      playLabel: t('actions.play'),
      pauseLabel: t('actions.pause'),
      errorMsg: t('status.error', { code: 500 })
    }
  }
}
```

**Key Paths:**
- `actions.*` — Button labels (play, pause, reseed, etc.)
- `panel.*` — Control panel labels
- `status.*` — Feedback messages
- `locale.*` — Language names
- `panel.*` — Settings labels

---

## Pinia Stores

### useConfigStore

**Location:** `src/stores/config.ts`

**Purpose:** Central state management for application configuration.

#### State

```javascript
{
  // Scene Management
  scene: string                   // Current scene ID
  sceneList: Array<SceneOption>  // Available scenes
  currentScene: ComputedRef      // Full scene object
  currentControls: Array         // Scene-specific params
  
  // Display Settings
  cols: number                   // Terminal columns
  rows: number                   // Terminal rows
  fontSize: number               // Font size in pixels
  
  // Colors
  fgColor: string                // Foreground color hex
  bgColor: string                // Background color hex
  glow: boolean                  // Glow effect enabled
  
  // Playback
  playing: boolean               // Animation playing
  autoScenes: boolean            // Auto-transition scenes
  autoSceneInterval: number      // Transition interval (s)
  autoSceneBlend: number         // Blend duration (s)
  
  // Performance
  fps: number                    // Target FPS
  charset: string                // Character ramp
  
  // Internationalization
  locale: string                 // Language code
}
```

#### Getters

```javascript
{
  currentScene: SceneObject      // Current scene definition
  currentControls: Array         // Controls for active scene
  sceneParams: Object            // Parameters for current scene
}
```

#### Actions

```javascript
{
  // Scene Control
  setScene(sceneId: string): void
  resetParams(): void            // Reset to scene defaults
  updateParam(key: string, value: any): void
  
  // Playback
  togglePlay(): void             // Toggle playing state
  play(): void                   // Start animation
  pause(): void                  // Pause animation
  
  // Random Generation
  reseed(): void                 // Generate random parameters
  
  // Color Themes
  applyTheme(theme: object): void
  
  // Persistence
  saveState(): void              // localStorage save
  loadState(): void              // localStorage load
}
```

#### Usage

```javascript
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const store = useConfigStore()
    
    // Direct access
    console.log(store.scene)
    
    // Reactive destructuring
    const { playing, fps, cols } = storeToRefs(store)
    
    // Call actions
    store.togglePlay()
    store.setScene('waves')
    
    return { store }
  }
}
```

#### Persistence

State is automatically saved to localStorage:
```javascript
// Auto-save on change
watch(() => store.state, () => {
  store.saveState()
}, { deep: true })

// Auto-load on startup
onMounted(() => {
  store.loadState()
})
```

---

## Utilities

### Character Ramps

**Location:** `src/stores/config.ts`

Preset character ramps for ASCII rendering:

```javascript
{
  'default': ' .:-=+*#%@',
  'smooth': ' ░▒▓█',
  'dense': '@%#*+=-:. ',
  'blocks': '▀▄█▌▐',
  'gradual': '·:▪▫▬▭▮▯'
}
```

**Usage:**
```javascript
const ramp = store.charset
const brightness = Math.floor(value * (ramp.length - 1))
const char = ramp[brightness]
```

### Color Themes

**Location:** `src/stores/config.ts`

Preset color themes:

```javascript
{
  'default': {
    fg: '#f8f8f2',      // Cream text
    bg: '#05071a'       // Navy background
  },
  'matrix': {
    fg: '#00ff00',      // Matrix green
    bg: '#000000'       // Black
  },
  'sunset': {
    fg: '#fff8dc',      // Cornsilk
    bg: '#ff6347'       // Tomato
  },
  'monochrome': {
    fg: '#ffffff',      // White
    bg: '#000000'       // Black
  }
}
```

---

## Scene Interface

### Scene Definition Format

Every scene must export an object with this structure:

```javascript
export default {
  // Required
  id: string,                    // Unique identifier
  label: string,                 // Display name
  
  // Optional
  defaults: Object,              // Default parameter values
  controls: Array<ControlDef>,  // Parameter definitions
  
  // Factory method
  create() {
    return {
      render(context): string   // Return ASCII frame
    }
  }
}
```

### Control Definition

Parameters shown in the control panel:

```javascript
{
  key: string,                   // Parameter key
  label: string,                 // Display label
  type: 'slider' | 'toggle',    // Input type
  min?: number,                  // Minimum value
  max?: number,                  // Maximum value
  step?: number,                 // Step increment
  default?: any                  // Default value
}
```

### Render Context

Function signature and parameters:

```javascript
render({
  cols: number,                  // Canvas width
  rows: number,                  // Canvas height
  t: number,                     // Elapsed time (seconds)
  params: Object,                // Current parameters
  charset: string,               // Character ramp
  freq: {                        // Frequency analysis
    low: number,                 // 0-100 %
    mid: number,                 // 0-100 %
    high: number,                // 0-100 %
    rms: number                  // 0-100 %
  }
}): string                       // Returns ASCII frame
```

### Scene Example

```javascript
export default {
  id: 'waves',
  label: 'Audio Waves',
  defaults: {
    speed: 1.0,
    amplitude: 1.0
  },
  controls: [
    {
      key: 'speed',
      label: 'Wave Speed',
      type: 'slider',
      min: 0.1,
      max: 5,
      step: 0.1
    }
  ],
  
  create() {
    return {
      render({ cols, rows, t, params, charset, freq }) {
        const lines = []
        
        for (let y = 0; y < rows; y++) {
          let line = ''
          for (let x = 0; x < cols; x++) {
            // Base wave with time modulation
            const wave = Math.sin(
              (x + t * params.speed) * 0.1 + 
              (freq.low / 100) * Math.PI
            )
            
            // Map to character
            const idx = Math.floor((wave + 1) / 2 * charset.length)
            line += charset[idx]
          }
          lines.push(line)
        }
        
        return lines.join('\n')
      }
    }
  }
}
```

---

## Helper Functions

### Time Formatting

```javascript
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

// Usage
formatTime(65) // "1:05"
```

### Frequency Band Calculation

```javascript
function calculateBands(frequencyData: Uint8Array) {
  const length = frequencyData.length
  
  let low = 0, mid = 0, high = 0
  for (let i = 0; i < length; i++) {
    if (i < length * 0.25) low += frequencyData[i]
    else if (i < length * 0.5) mid += frequencyData[i]
    else high += frequencyData[i]
  }
  
  return {
    low: (low / (length * 0.25 * 255)) * 100,
    mid: (mid / (length * 0.25 * 255)) * 100,
    high: (high / (length * 0.5 * 255)) * 100
  }
}
```

### Parameter Smoothing

```javascript
function smoothParameter(current: number, target: number, alpha: number = 0.1): number {
  return current * (1 - alpha) + target * alpha
}

// Usage
let value = 0
const target = 100
value = smoothParameter(value, target, 0.15)  // Smooth transition
```

---

## Event System

### Custom Events

Components emit domain-specific events:

```javascript
// Play/pause
@click="store.togglePlay()"

// Scene change
@click="store.setScene(sceneId)"

// Parameter update
@input="store.updateParam(key, value)"

// File loading
@change="media.loadFile"
@change="media.loadVideo"
```

### Store Watchers

```javascript
import { watch } from 'vue'
import { useConfigStore } from '@/stores/config'

const store = useConfigStore()

// Watch for scene changes
watch(() => store.scene, (newScene) => {
  console.log('Scene changed to:', newScene)
})

// Watch for playback state
watch(() => store.playing, (isPlaying) => {
  if (isPlaying) {
    startAnimation()
  } else {
    pauseAnimation()
  }
})
```

---

## Performance Tips

### Optimize Renders
```javascript
// ❌ Avoid: Recalculates every render
const scene = store.sceneList.find(s => s.value === store.scene)

// ✅ Better: Use computed
const currentScene = computed(() => 
  store.sceneList.find(s => s.value === store.scene)
)
```

### Batch Updates
```javascript
// ❌ Triggers 3 renders
store.cols = 200
store.rows = 100
store.fontSize = 12

// ✅ Better: Single action
store.updateDisplay({ cols: 200, rows: 100, fontSize: 12 })
```

### Debounce Frequent Changes
```javascript
// ❌ Updates every pixel change
watch(() => store.fontSize, () => updateUI())

// ✅ Better: Debounce updates
const debouncedUpdate = debounce(() => updateUI(), 300)
watch(() => store.fontSize, debouncedUpdate)
```

---

**Last Updated:** June 2026  
**Version:** 1.0.0
