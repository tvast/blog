# Music Color Parameters

A system for dynamically modulating ASCII studio colors based on AI insights describing music characteristics.

## Overview

The `MusicColorParameters` class generates color palettes based on musical attributes (mood, intensity, energy, tempo) and descriptive keywords. It uses color theory to interpolate, adjust, and transform colors in response to these parameters.

## Architecture

### Core Components

1. **MusicColorParameters** (`src/utils/MusicColorParameters.js`)
   - Color manipulation utilities (HSL/RGB conversion, interpolation, hue rotation)
   - AI insight parsing (converts mood/intensity/energy to color parameters)
   - Music data analysis (infers mood from audio features)
   - Color transition animations

2. **useMusicColorParameters** (`src/composables/useMusicColorParameters.js`)
   - Vue 3 composable for reactive color state
   - Integration with Vue components
   - Promise-based transitions

3. **musicColorExample Scene** (`src/scenes/musicColorExample.js`)
   - Example scene showing color parameter integration
   - Demonstrates real-time color updates

## Usage

### Basic Usage

```javascript
import MusicColorParameters from '@/utils/MusicColorParameters'

const colorParams = new MusicColorParameters()

// Create an AI insight
const insight = {
  mood: 'energetic',
  intensity: 0.8,
  tempo: 0.7,
  energy: 0.9,
  colorKeywords: ['vivid', 'bright']
}

// Parse insight into colors
const colors = colorParams.parseAIInsight(insight)
console.log(colors)
// {
//   foreground: '#ff6633',
//   background: '#1a0000',
//   accent: '#ff9966',
//   params: { intensity, tempo, energy, mood }
// }

// Apply colors to your scene
scene.setColors(colors)
```

### With Music Analysis Data

```javascript
const musicData = {
  tempo: 140,
  energy: 0.8,
  danceability: 0.9,
  acousticness: 0.2,
  genre: 'electronic',
  mood: 'energetic'
}

// Generate insight from audio features
const insight = await colorParams.generateInsightFromMusicData(musicData)
const colors = colorParams.parseAIInsight(insight)
```

### In Vue Components (Composable)

```vue
<script setup>
import { useMusicColorParameters } from '@/composables/useMusicColorParameters'

const {
  generateColorsFromMusic,
  applyInsight,
  transitionColors,
  getCurrentColors,
  colorParams,
  isGeneratingInsight
} = useMusicColorParameters()

// Generate colors from music
const handleMusicAnalysis = async (musicData) => {
  await generateColorsFromMusic(musicData)
  const colors = getCurrentColors()
  applySceneColors(colors)
}

// Manual insight
const handleMoodChange = (mood) => {
  applyInsight({
    mood,
    intensity: 0.7,
    tempo: 0.5,
    energy: 0.6,
    colorKeywords: []
  })
}

// Smooth transition
const smoothTransition = async () => {
  const newColors = {
    foreground: '#00ff88',
    background: '#001100',
    accent: '#00ffaa'
  }
  await transitionColors(newColors, 2000)
}
</script>
```

## Color Theory

### Mood-Based Color Mapping

- **Happy**: Yellow (#ffff00)
- **Sad**: Blue (#0066ff)
- **Energetic**: Red (#ff0000)
- **Calm**: Green (#00ff88)
- **Dark**: Purple (#220055)
- **Warm**: Orange (#ff8800)
- **Cool**: Cyan (#00ffff)
- **Neutral**: Matrix Green (#41ff6e)

### Parameter Effects

- **Intensity** (0-1): Adjusts brightness of foreground color
- **Tempo** (0-1): Rotates hue (0-360 degrees)
- **Energy** (0-1): Controls background brightness and vibrancy
- **Color Keywords**: Additional hue rotation based on genre/style

## API Reference

### `parseAIInsight(insight)`

Converts an AI insight object into color parameters.

**Input:**
```javascript
{
  mood: string,           // 'happy', 'sad', 'energetic', etc.
  intensity: number,      // 0-1
  tempo: number,          // 0-1
  energy: number,         // 0-1
  colorKeywords: array    // ['cyan', 'neon', 'bright', etc.]
}
```

**Output:**
```javascript
{
  foreground: string,     // hex color
  background: string,     // hex color
  accent: string,         // hex color
  params: { ... }         // normalized parameters
}
```

### Color Manipulation Methods

#### `hexToRgb(hex) → {r, g, b}`
Convert hex color to RGB values.

#### `rgbToHex(r, g, b) → string`
Convert RGB values to hex color.

#### `interpolateColors(color1, color2, factor) → string`
Blend two colors. Factor: 0 = color1, 1 = color2, 0.5 = mix.

#### `adjustBrightness(hex, factor) → string`
Adjust brightness. Factor: -1 = black, 0 = no change, 1 = white.

#### `rotateHue(hex, degrees) → string`
Rotate hue by 0-360 degrees.

### Animation

#### `transitionColors(targetParams, duration, onUpdate)`
Animate color transition over time.

```javascript
colorParams.transitionColors(
  { foreground: '#ff0000', background: '#000000', accent: '#ff3333' },
  2000,  // 2 seconds
  (colors, progress) => {
    console.log('Transition', progress * 100, '%')
    updateSceneColors(colors)
  }
)
```

## Integration Examples

### With Quasar Video Knob

```javascript
// When knob changes, update mood
const handleKnobChange = (value) => {
  const moods = ['calm', 'neutral', 'energetic']
  const mood = moods[Math.floor(value * moods.length)]
  applyInsight({ mood, intensity: value, tempo: 0.5, energy: value })
}
```

### Real-Time Music Analysis

```javascript
// In audio analysis loop
const analyzeAndUpdateColors = (audioBuffer) => {
  const stats = analyzeAudioBuffer(audioBuffer)
  generateColorsFromMusic({
    tempo: stats.tempo,
    energy: stats.energy,
    danceability: stats.danceability,
    genre: currentGenre,
    mood: inferMoodFromAudio(audioBuffer)
  })
}
```

## Color Palette Examples

### Energetic Electronic
- Mood: energetic
- Intensity: 0.9
- Energy: 0.9
- Result: Bright cyan/neon colors

### Calm Ambient
- Mood: calm
- Intensity: 0.3
- Energy: 0.4
- Result: Soft green/blue tones

### Dark Metal
- Mood: dark
- Intensity: 0.7
- Energy: 0.8
- Result: Deep purples with red accents

## Future Enhancements

- [ ] Claude API integration for natural language music descriptions
- [ ] Real-time audio feature extraction
- [ ] Palette preset saving/loading
- [ ] More sophisticated color theory (CIELAB, color harmonies)
- [ ] Perceptual color matching for consistent output
