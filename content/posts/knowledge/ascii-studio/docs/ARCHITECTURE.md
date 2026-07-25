# 🏗️ Architecture

## System Overview

```
┌─────────────────────────────────────────┐
│         User Interface (Vue 3)          │
├─────────────────────────────────────────┤
│  ControlPanel  │  ThemeSelector         │
│  SceneSelect   │  OutputCanvas          │
├─────────────────────────────────────────┤
│         State Management (Pinia)        │
├─────────────────────────────────────────┤
│  Audio Store   │  Scene Store           │
│  Config Store  │  Recording Store       │
├─────────────────────────────────────────┤
│        Rendering Engine (Three.js)      │
├─────────────────────────────────────────┤
│  Scenes        │  Shaders               │
│  Geometry      │  Materials             │
├─────────────────────────────────────────┤
│      Audio Processing (Web Audio)       │
├─────────────────────────────────────────┤
│  FFT Analysis  │  Frequency Metering    │
│  Input Handler │  Level Detection       │
└─────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── IndexPage (Main Layout)
│   ├── Header (Navigation)
│   ├── Sidebar (Scene Selection)
│   ├── MainCanvas
│   │   └── AsciiCanvas (Rendering)
│   ├── ControlPanel
│   │   ├── ParameterSlider (30x)
│   │   ├── ThemeSelector
│   │   └── PresetManager
│   └── Footer (Info)
```

## Data Flow

```
Audio Input
    ↓
Web Audio API
    ↓
FFT Analysis
    ↓
Pinia Audio Store
    ↓
Scene Composables
    ↓
Three.js Rendering
    ↓
Canvas Output
```

## Key Classes

### SceneBase
Base class for all generative scenes
```javascript
class SceneBase {
  constructor(canvas, audioAnalyzer)
  init()
  update(audioData)
  render()
  dispose()
  setParameter(name, value)
}
```

### AudioAnalyzer
Handles Web Audio API analysis
```javascript
class AudioAnalyzer {
  constructor(audioContext)
  analyzeFrequencies()
  getMetrics() // { low, mid, high, rms }
  setThreshold(value)
  smoothing: 0-1
}
```

### ColorParameters
Color manipulation and animation
```javascript
class ColorParameters {
  generateColorsFromMusic(frequencies)
  transitionColors(target, duration)
  applyHueRotation(degrees)
  adjustSaturation(factor)
}
```

## Stores (Pinia)

### Config Store
```javascript
{
  darkMode: boolean,
  currentTheme: string,
  quality: 'low' | 'medium' | 'high',
  language: 'en' | 'es' | 'fr',
  
  actions: {
    toggleDarkMode(),
    setTheme(name),
    savePreset(name),
    loadPreset(name)
  }
}
```

### Audio Store
```javascript
{
  frequencies: Uint8Array[256],
  metrics: { low, mid, high, rms },
  isPlaying: boolean,
  volume: 0-1,
  
  actions: {
    loadFile(file),
    startMicrophone(),
    analyzeFrame(),
    setVolume(value)
  }
}
```

### Scene Store
```javascript
{
  currentScene: string,
  parameters: { ... },
  presets: Preset[],
  
  actions: {
    switchScene(name),
    updateParameter(name, value),
    savePreset(name),
    loadPreset(name)
  }
}
```

## Rendering Pipeline

### Frame Loop (60 FPS)
```
1. requestAnimationFrame
   ↓
2. Audio Analysis (FFT)
   ↓
3. Update Scene Parameters
   ↓
4. Update Geometry/Materials
   ↓
5. Render Three.js Scene
   ↓
6. Post-Processing (Bloom, etc)
   ↓
7. Display to Canvas
```

### WebGL Rendering
- **Vertex Shader** - Geometry transformation
- **Fragment Shader** - Color/light calculation
- **Texture Sampling** - Pattern generation
- **Normal Mapping** - Surface detail

## Memory Management

### Assets
- Scenes pre-loaded (11 total)
- Geometries reused via instancing
- Textures cached & compressed
- Materials pooled for efficiency

### Audio
- FFT buffer: ~1KB
- Frequency history: ~10KB
- Audio context single instance
- Source nodes recycled

### Rendering
- WebGL context: ~50MB
- Textures: ~20-100MB
- Buffers: ~10-20MB
- Total typical: <200MB

## Performance Optimization

### GPU Optimization
- Geometry instancing
- Frustum culling
- Level-of-detail (LOD)
- Texture atlasing
- Batch rendering

### CPU Optimization
- Scene graph pruning
- Object pooling
- Animation frame throttling
- Audio analysis caching
- Lazy component loading

### Memory Optimization
- Geometry deduplication
- Texture compression
- Buffer reuse
- WeakMap for caching
- Garbage collection hints

## Extension Points

### Custom Scenes
```javascript
export class CustomScene extends SceneBase {
  init() { /* setup */ }
  update(audioData) { /* animate */ }
  render() { /* draw */ }
}
```

### Custom Shaders
```glsl
#include <common>

uniform float uTime;
uniform float uAudioLevel;

void main() {
  // Custom shader logic
}
```

### Custom Effects
```javascript
composer.addPass(new CustomEffectPass())
```

## Deployment

### Build Output
```
dist/
├── spa/          # Web version
├── electron/     # Desktop app
└── dist.zip      # Archive
```

### Assets
- Static files: images, fonts
- Audio samples: demo tracks
- Documentation: markdown files
- Config: theme definitions

---

Built with modern web standards for performance & scalability
