# 🔌 API Documentation

## Audio Analyzer API

### useAudioAnalyzer()

Get real-time frequency data from audio input.

```javascript
import { useAudioAnalyzer } from '@/composables'

const {
  frequencies,      // Uint8Array[256] - Frequency bins
  low,             // number 0-255 - Low frequency (0-250Hz)
  mid,             // number 0-255 - Mid frequency (250-2kHz)
  high,            // number 0-255 - High frequency (2k-20kHz)
  rms              // number 0-1 - RMS level
} = useAudioAnalyzer()
```

### Properties

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| frequencies | Uint8Array | 0-255 | 256-point FFT analysis |
| low | number | 0-255 | Low band amplitude |
| mid | number | 0-255 | Mid band amplitude |
| high | number | 0-255 | High band amplitude |
| rms | number | 0-1 | Overall level |

### Example

```javascript
onMounted(() => {
  const analyzer = useAudioAnalyzer()
  
  const animate = () => {
    console.log(`Low: ${analyzer.low}, Mid: ${analyzer.mid}`)
    requestAnimationFrame(animate)
  }
  animate()
})
```

---

## Color Parameters API

### useMusicColorParameters()

Generate and animate colors based on audio data.

```javascript
import { useMusicColorParameters } from '@/composables'

const colors = useMusicColorParameters()
colors.generateColorsFromMusic(frequencies)
colors.transitionColors(targetColors, 500)
colors.rotateHue(45)
```

### Methods

#### generateColorsFromMusic(frequencies)
Generate color palette from frequency data.

```javascript
const palette = colors.generateColorsFromMusic(
  audioAnalyzer.frequencies
)
// Returns: [r, g, b, r, g, b, ...]
```

#### transitionColors(target, duration)
Smoothly transition to target colors.

```javascript
colors.transitionColors(
  [255, 100, 50, ...],  // Target RGB values
  500                    // Duration in ms
)
```

#### rotateHue(degrees)
Rotate color hue by specified degrees.

```javascript
colors.rotateHue(90)  // Shift 90 degrees
```

#### adjustSaturation(factor)
Adjust color saturation.

```javascript
colors.adjustSaturation(1.5)  // Increase by 50%
colors.adjustSaturation(0.5)  // Decrease by 50%
```

---

## Scene Control API

### useScene()

Control scene rendering and parameters.

```javascript
import { useScene } from '@/stores/scene'

const scene = useScene()

// Switch scene
scene.switchScene('torusKnot')

// Update parameter
scene.updateParameter('scale', 1.5)

// Reset to defaults
scene.reset()

// Get current state
scene.currentScene    // string
scene.parameters     // object
```

### Available Scenes

| Scene | ID | Type |
|-------|-----|------|
| Torus Knot | torusKnot | 3D Geometry |
| Plasma Field | plasmaField | Shader |
| Particles | particles | Physics |
| Spiral | spiral | 2D Pattern |
| ASCII Grid | asciiGrid | Text |
| Snake | lowPolySnake | 3D Animation |
| Torus Glow | torusGlow | 3D + Effects |
| Wave | waveForm | Audio Viz |
| Kaleidoscope | kaleidoscope | Pattern |
| Orb Matrix | orbMatrix | Particle |
| Grid Flow | gridFlow | Vector Field |

---

## Theme API

### useDarkMode()

Manage dark/light theme switching.

```javascript
import { useDarkMode } from '@/composables'

const theme = useDarkMode()

// Toggle theme
theme.toggle()

// Set specific mode
theme.setDark()
theme.setLight()

// Navigate themes
theme.nextTheme()
theme.prevTheme()

// Get current state
theme.isDark       // boolean
theme.currentTheme // string
```

### Available Themes

**Dark (6):**
- matrix
- brand
- amberCrt
- ice
- magenta
- neon

**Light (6):**
- paper
- highContrast
- soft
- warm
- cool
- minty

---

## Config Store API

### useConfig()

Access and modify global configuration.

```javascript
import { useConfig } from '@/stores/config'

const config = useConfig()

// Properties
config.darkMode           // boolean
config.currentThemeIndex  // number
config.quality           // 'low' | 'medium' | 'high'
config.language          // 'en' | 'es' | 'fr'

// Methods
config.setDarkMode(true)
config.setQuality('high')
config.setLanguage('es')
```

---

## Recording API

### useRecording()

Capture and export output.

```javascript
import { useRecording } from '@/stores/recording'

const recorder = useRecording()

// Start recording
recorder.start({ format: 'mp4' })

// Stop recording
recorder.stop()

// Export frame
recorder.captureFrame('png')

// Get status
recorder.isRecording   // boolean
recorder.duration      // number (ms)
```

---

## Event System

### Audio Events

```javascript
// Listen for audio level changes
emitter.on('audio:level', (level) => {
  console.log('RMS:', level)
})

// Listen for frequency update
emitter.on('audio:frequencies', (data) => {
  console.log('FFT:', data)
})
```

### Scene Events

```javascript
// Scene switched
emitter.on('scene:changed', (sceneName) => {})

// Parameter updated
emitter.on('parameter:changed', (name, value) => {})

// Reset occurred
emitter.on('scene:reset', () => {})
```

### Theme Events

```javascript
// Theme switched
emitter.on('theme:changed', (themeName) => {})

// Dark mode toggled
emitter.on('theme:darkMode', (isDark) => {})
```

---

## Performance API

### usePerformanceMonitor()

Monitor FPS and performance metrics.

```javascript
import { usePerformanceMonitor } from '@/composables'

const perf = usePerformanceMonitor()

perf.fps          // Current FPS
perf.avgFps       // Average FPS
perf.memoryUsage  // MB
perf.gpuLoad      // 0-1
```

---

## MIDI API

### useMidiController()

Connect and control via MIDI.

```javascript
import { useMidiController } from '@/composables'

const midi = useMidiController()

// List available devices
const devices = midi.getDevices()

// Connect device
midi.connect(devices[0])

// Map control to parameter
midi.map('scene.scale', 1)  // CC1 -> scale
```

---

## WebSocket API

### useRemoteControl()

Enable remote control via WebSocket.

```javascript
import { useRemoteControl } from '@/composables'

const remote = useRemoteControl()

// Start server
remote.start({ port: 8080 })

// Remote client can send:
{
  "action": "setParameter",
  "scene": "torusKnot",
  "parameter": "scale",
  "value": 1.5
}
```

---

## Export API

### Export Formats

```javascript
// Frame capture
recorder.export({ 
  format: 'png',
  width: 1920,
  height: 1080
})

// Video export
recorder.export({
  format: 'mp4',
  bitrate: '10M',
  fps: 60,
  duration: 30000  // ms
})

// Sequence
recorder.export({
  format: 'sequence',
  frameCount: 300,
  prefix: 'frame-'
})
```

---

## Error Handling

### Try-Catch Pattern

```javascript
try {
  scene.switchScene('invalid')
} catch (error) {
  console.error('Scene error:', error.message)
}
```

### Error Types

```javascript
// SceneNotFoundError
// AudioContextError
// ParameterOutOfRangeError
// RecordingError
```

---

Made for developers, by developers
