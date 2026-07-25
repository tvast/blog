# π DJ Components Documentation

Detailed documentation of all Vue 3 components in the π DJ application.

## Table of Contents

1. [Page Components](#page-components)
2. [Layout Components](#layout-components)
3. [Feature Components](#feature-components)
4. [Shared Components](#shared-components)

---

## Page Components

### IndexPage.vue

**Location:** `src/pages/IndexPage.vue`

**Purpose:** Main application page that orchestrates the visualization and control interface.

**Key Features:**
- Studio layout (visualization + control panel)
- Logo toggle for expanding/collapsing controls
- Play/pause button with unified playback control
- Action rail (language, copy, export)
- Responsive grid layout

**Props:** None (route page)

**Data:**
```javascript
{
  studioOpen: boolean              // Control panel visibility
  isMobile: computed               // Responsive breakpoint
  mobileRandomPresetApplied: boolean
}
```

**Methods:**
- `toggleStudio()` — Toggle control panel visibility
- `copyFrame()` — Copy ASCII art to clipboard
- `downloadFrame()` — Export frame as .txt file
- `togglePlayback()` — Play/pause with video sync

**Watchers:**
- `store.playing` → Auto-sync video playback
- `isMobile` → Adjust layout for small screens

**Styling:**
- CSS Grid layout (1 column on mobile, 2 on desktop)
- Glassmorphism effects (blur, backdrop-filter)
- Smooth transitions for panel slide animation

---

## Layout Components

### MainLayout.vue

**Location:** `src/layouts/MainLayout.vue`

**Purpose:** Root layout wrapper providing consistent page structure.

**Key Features:**
- App header/navigation
- Page container
- Global styling foundation
- Navigation between routes

**Template Structure:**
```
<q-layout>
  ├─ Header
  ├─ Navigation
  ├─ <router-view /> (page content)
  └─ Footer
</q-layout>
```

**Responsive Behavior:**
- Mobile: hamburger menu, collapsible nav
- Desktop: full navigation bar
- Drawer for mobile navigation

---

## Feature Components

### AsciiCanvas.vue

**Location:** `src/components/AsciiCanvas.vue`

**Purpose:** Core visualization engine rendering ASCII art and managing audio reactivity.

**Key Features:**
- Three.js canvas rendering (optional)
- ASCII art generation from scenes
- Real-time audio analysis
- Microphone/file/video input handling
- Video playback with audio sync
- Visual effects (glow, color, size)

**Props:**
```javascript
{
  frame: String                 // Current ASCII frame (from engine)
}
```

**Data:**
```javascript
{
  // Audio
  micOn: boolean               // Microphone active state
  audioContext: AudioContext
  analyser: AnalyserNode
  micStream: MediaStream
  
  // Video
  videoLoaded: boolean
  videoFileName: string
  videoDuration: number
  videoCurrentTime: number
  videoOpacity: number (0-1)
  
  // Scene
  preset: string              // Visualization preset
  
  // UI
  hudVisible: boolean         // HUD overlay toggle
}
```

**Methods:**
```javascript
toggleMic()                    // Enable/disable microphone
loadFile(event)               // Load audio file
loadVideo(event)              // Load video file
loadClipsFolder(event)        // Load folder of audio clips
seekVideo(event)              // Seek to video position
closeVideo()                  // Close video playback
toggleFullscreen()            // Enter fullscreen mode
```

**Computed Properties:**
```javascript
{
  stageStyle: Object          // Canvas styling
  preStyle: Object            // ASCII display styling
  audioFrequency: Array       // Current frequency data
}
```

**Watchers:**
- `store.playing` → Control animation playback
- `store.fontSize` → Update text size
- `store.glow` → Apply/remove glow effect
- `videoCurrentTime` → Update timeline display

**Audio System:**
The component manages the Web Audio API pipeline:
```javascript
// Audio initialization
async ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (!analyser) {
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
  }
  return { audioContext, analyser }
}

// Audio source connection
// Microphone: MediaStreamAudioSource
// Files: MediaElementAudioSource
// Video: MediaElementAudioSource (from video element)
```

**Video Integration:**
- Creates hidden `<video>` element
- Connects video audio to analyser
- Plays/pauses with store.playing state
- Emits time updates to timeline

---

### ControlPanel.vue

**Location:** `src/components/ControlPanel.vue`

**Purpose:** Settings and parameter control interface with tabs for different feature areas.

**Key Features:**
- Tab navigation (Scene, Grid, Charset, Appearance, Audio, Video, Effects)
- Quick action buttons (Play, Reseed, Language, Copy, Export)
- Media input controls (Mic, Audio, Video, Clips)
- Scene-specific parameter controls
- Color theme picker
- Knob controls for audio/visual effects

**Props:**
```javascript
{
  media: Object               // Media handler (from AsciiCanvas)
}
```

**Data:**
```javascript
{
  mainTab: string            // Active main tab
  sceneTab: computed         // Current scene selection
  
  // Audio Controls
  audioControls: {
    bassBoot: number         // Bass boost (0-200%)
    treble: number           // Treble control (0-200%)
    sensitivity: number      // Audio sensitivity (50-300%)
  }
  
  // Effect Controls
  effectControls: {
    brightness: number       // Brightness (30-150%)
    contrast: number         // Contrast (50-200%)
    saturation: number       // Saturation (0-200%)
  }
  
  // Frequency Meters
  meterValues: {
    low: number
    mid: number
    high: number
  }
}
```

**Tabs:**

#### Scene Tab
- Auto-scene transition toggle
- Interval & blend controls
- Scene parameter controls (dynamic per scene)
- Scene reset button

#### Grid Tab
- Canvas width/height controls
- Font size adjustment
- FPS targeting

#### Charset Tab
- Character set selection
- Preset character ramps
- Custom character input

#### Appearance Tab
- Color theme presets
- Custom color pickers (foreground, background)
- Glow toggle
- Live theme preview

#### Audio Tab
- Bass knob (0-200%)
- Treble knob (0-200%)
- Sensitivity knob (50-300%)
- Real-time frequency meters (Low, Mid, High)

#### Video Tab
- Video file loader
- Supported format info

#### Effects Tab
- Brightness knob (30-150%)
- Contrast knob (50-200%)
- Saturation knob (0-200%)
- Glow effect toggle

**Methods:**
```javascript
togglePlayback()             // Unified play/pause control
reseed()                     // Generate new random seed
copyFrame()                  // Copy ASCII to clipboard
downloadFrame()              // Export as text file
triggerFullscreen()          // Enter fullscreen
```

---

### SliderRow.vue

**Location:** `src/components/SliderRow.vue`

**Purpose:** Reusable slider component for parameter control.

**Props:**
```javascript
{
  label: String              // Control label
  value: Number              // Current value
  min: Number                // Minimum value
  max: Number                // Maximum value
  step: Number               // Step increment
  suffix: String             // Units (e.g., " s", " %")
}
```

**Events:**
```javascript
@input(newValue: number)     // Emitted on change
```

**Features:**
- Labeled slider with input feedback
- Unit suffixes (seconds, percentage, etc.)
- Numeric display
- Smooth value transitions
- Keyboard support (arrow keys)

---

### ColorField.vue

**Location:** `src/components/ColorField.vue`

**Purpose:** Color picker component for selecting foreground/background colors.

**Props:**
```javascript
{
  modelValue: String         // Hex color (e.g., "#ff694d")
  label: String              // Field label
}
```

**Events:**
```javascript
@update:modelValue(hex)      // Emitted on color change
```

**Features:**
- Visual color preview
- Hex input field
- Color palette presets
- Real-time color update
- Accessibility features

---

## Shared Components

These components are used throughout the application but don't have dedicated documentation files.

### Common Quasar Components Used

| Component | Usage | Purpose |
|-----------|-------|---------|
| `q-page` | All pages | Page container |
| `q-btn` | UI actions | Buttons with icons |
| `q-icon` | Icons | Material Design icons |
| `q-tabs` | Navigation | Tab-based navigation |
| `q-tab-panels` | Content | Tab content areas |
| `q-slider` | Parameters | Value adjustment |
| `q-knob` | Audio/effects | Circular dial controls |
| `q-toggle` | Switches | Boolean toggles |
| `q-separator` | Layout | Visual dividers |
| `q-tooltip` | Help | Hover tooltips |
| `q-menu` | Dropdowns | Context menus |

---

## Component Communication

### Props Down Pattern
```
ParentComponent
  ↓ props
ChildComponent
```

Example: `IndexPage` passes `frame` prop to `AsciiCanvas`

### Events Up Pattern
```
ChildComponent
  ↑ @click, @change
ParentComponent
```

Example: `ControlPanel` emits events handled by parent

### Store Sharing (Global State)
```
Component A ← store → Component B
     ↓              ↓
  (watches)      (watches)
     ↓              ↓
  updates       updates
```

Example: `AsciiCanvas` and `ControlPanel` both read/write to Pinia store

---

## Styling Architecture

### Global Styles
- `src/css/app.scss` — App-level styles
- `src/css/variables.scss` — Design tokens (colors, spacing)
- `src/css/animations.scss` — Keyframe animations

### Component Scoping
All components use `<style scoped>` to prevent CSS conflicts:
```vue
<style scoped>
.my-component {
  /* Only applies to this component */
}
</style>
```

### Quasar Integration
- Quasar CSS classes available globally
- Custom theme colors in `quasar.conf.js`
- Dark mode support built-in

### Design System
- **Primary Color:** Tomato Red (#ff694d)
- **Secondary Color:** Purple (#b5a7ff)
- **Accent Color:** Light Tomato (#ff8f7a)
- **Background:** Dark Navy (#05071a)
- **Text:** Cream (#f8f8f2)

---

## Component Lifecycle

### Typical Lifecycle Flow

```
setup() {
  // Initialize state
  const state = ref(initialValue)
  
  // Create watchers
  watch(dependencies, () => {
    // React to changes
  })
  
  // Return exposed properties
  return { state }
}

<template>
  <!-- Reactive bindings -->
  {{ state }}
</template>
```

### Mount/Unmount Hooks

```javascript
import { onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    onMounted(() => {
      // Start animation loop, attach listeners
      requestAnimationFrame(update)
    })
    
    onBeforeUnmount(() => {
      // Clean up: stop loops, remove listeners
      cancelAnimationFrame(rafId)
    })
  }
}
```

---

## Best Practices

### ✅ Do
- Use `<script setup>` syntax
- Prefer composition functions for reusable logic
- Use Pinia for global state
- Scope styles with `<style scoped>`
- Add type annotations for props
- Use reactive refs for state

### ❌ Don't
- Modify props directly (use events or store)
- Create global mutable state (use Pinia)
- Use inline styles for complex styling
- Create prop drilling chains (use store)
- Ignore TypeScript opportunities

---

**Last Updated:** June 2026  
**Version:** 1.0.0
