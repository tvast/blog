# π DJ Audio System Documentation

Complete documentation of the audio reactivity system that drives π DJ's real-time visualizations.

## Table of Contents

1. [Overview](#overview)
2. [Audio Initialization](#audio-initialization)
3. [Input Sources](#input-sources)
4. [Frequency Analysis](#frequency-analysis)
5. [Parameter Modulation](#parameter-modulation)
6. [Integration Points](#integration-points)

---

## Overview

The π DJ audio system processes real-time sound input and converts it into parameter modifications that drive the ASCII art visualization. The system supports three input sources:

1. **Microphone Input** — Live audio capture
2. **Audio Files** — MP3, WAV, OGG, etc.
3. **Video Files** — Video with audio track

### Key Components

| Component | Role |
|-----------|------|
| Web Audio API | Low-level audio processing |
| AnalyserNode | FFT-based frequency analysis |
| Frequency Bands | Split spectrum into (Low, Mid, High, RMS) |
| Parameter Modulation | Convert frequency data to scene parameters |
| Scene Rendering | Apply modulated parameters to visualization |

---

## Audio Initialization

### AudioContext Setup

```javascript
// In AsciiCanvas.vue composable
async function ensureAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  
  if (!analyser) {
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048          // 2048-point FFT
    analyser.smoothingTimeConstant = 0.85  // Smoothing factor
  }
  
  // Resume context if suspended (user interaction required)
  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }
  
  return { audioContext, analyser }
}
```

### Configuration Details

**FFT Size:** 2048 points
- Provides 1024 frequency bins
- Frequency resolution: ~21.5 Hz per bin (at 44.1 kHz)
- Good balance between precision and responsiveness

**Smoothing:** 0.85
- Exponential smoothing applied to frequency data
- Reduces jitter and creates smoother transitions
- Formula: `smoothedValue = 0.85 * previous + 0.15 * current`

**Sample Rate:** Browser-dependent (typically 44.1 or 48 kHz)

---

## Input Sources

### 1. Microphone Input

**Implementation:**
```javascript
async function toggleMicrophone() {
  const audio = await ensureAudio()
  
  if (microphone) {
    // Disable microphone
    microphone.getTracks().forEach(track => track.stop())
    microphone = null
    currentAudioSource?.disconnect()
    return
  }
  
  // Enable microphone
  microphone = await navigator.mediaDevices.getUserMedia({ audio: true })
  const source = audioContext.createMediaStreamSource(microphone)
  currentAudioSource = source
  source.connect(analyser)
  source.connect(audioContext.destination)  // Pass-through to speakers
  
  updateFrequencyMeters()  // Start analysis
}
```

**Permissions:**
- Requires user consent via browser prompt
- HTTPS required (or localhost)
- Permissions are browser-specific

**Use Cases:**
- Live performances
- Real-time audio visualization
- Testing during development

---

### 2. Audio File Input

**Implementation:**
```javascript
async function loadAudioFile(file) {
  const audio = await ensureAudio()
  const fileUrl = URL.createObjectURL(file)
  
  // Create HTML5 audio element
  const audioElement = new Audio()
  audioElement.src = fileUrl
  audioElement.crossOrigin = 'anonymous'
  
  // Connect to analyser
  const source = audioContext.createMediaElementAudioSource(audioElement)
  currentAudioSource = source
  source.connect(analyser)
  source.connect(audioContext.destination)
  
  // Play
  audioElement.play()
  updateFrequencyMeters()
}
```

**Supported Formats:**
- MP3 (MPEG-3)
- WAV (Waveform Audio)
- OGG (Ogg Vorbis)
- FLAC (Free Lossless Audio)
- AAC (via browser support)

**Advantages:**
- No microphone permissions needed
- Can batch load multiple files
- Precise timeline control

---

### 3. Video File Input

**Implementation:**
```javascript
async function loadVideoFile(file) {
  const audio = await ensureAudio()
  const fileUrl = URL.createObjectURL(file)
  
  // Create hidden video element
  const videoElement = document.createElement('video')
  videoElement.src = fileUrl
  videoElement.crossOrigin = 'anonymous'
  videoElement.controls = false
  
  // Extract and connect audio
  const source = audioContext.createMediaElementAudioSource(videoElement)
  currentAudioSource = source
  source.connect(analyser)
  source.connect(audioContext.destination)
  
  // Display video
  displayVideo(videoElement)
  videoElement.play()
  updateFrequencyMeters()
}
```

**Supported Formats:**
- MP4 (H.264 + AAC)
- WebM (VP8/VP9 + Vorbis)
- OGG (Theora + Vorbis)
- MOV (QuickTime)
- AVI, MKV (browser dependent)

**Features:**
- Audio extracted and analyzed
- Video displayed as overlay
- Opacity control for blending with visualization

---

## Frequency Analysis

### FFT Analysis Pipeline

```javascript
function updateFrequencyMeters() {
  if (!analyser) return
  
  // Request next animation frame
  requestAnimationFrame(updateFrequencyMeters)
  
  // Get frequency data (0-255 for each bin)
  const frequencyData = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(frequencyData)
  
  // Analyze bands
  const bands = analyzeBands(frequencyData)
  
  // Update meters
  updateMeters(bands)
}
```

### Band Extraction

**Frequency Band Mapping:**
```javascript
function analyzeBands(dataArray) {
  const length = dataArray.length  // 1024 bins
  
  // LOW: 0-25% (0-256 Hz, bass/sub-bass)
  const lowBins = dataArray.slice(0, length * 0.25)
  const lowAvg = lowBins.reduce((a, b) => a + b) / lowBins.length
  const lowPercent = (lowAvg / 255) * 100
  
  // MID: 25-50% (256-512 Hz, vocals/midrange)
  const midBins = dataArray.slice(length * 0.25, length * 0.5)
  const midAvg = midBins.reduce((a, b) => a + b) / midBins.length
  const midPercent = (midAvg / 255) * 100
  
  // HIGH: 50-100% (512-2048 Hz, treble/cymbal)
  const highBins = dataArray.slice(length * 0.5)
  const highAvg = highBins.reduce((a, b) => a + b) / highBins.length
  const highPercent = (highAvg / 255) * 100
  
  // RMS: Overall signal power
  let rms = 0
  for (let i = 0; i < length; i++) {
    const normalized = dataArray[i] / 255
    rms += normalized * normalized
  }
  const rmsPercent = Math.sqrt(rms / length) * 100
  
  return {
    low: Math.min(100, lowPercent),
    mid: Math.min(100, midPercent),
    high: Math.min(100, highPercent),
    rms: Math.min(100, rmsPercent)
  }
}
```

### Frequency Ranges by Sample Rate

**At 44.1 kHz Sample Rate:**
- Bin frequency resolution: ~21.5 Hz per bin
- Nyquist frequency: 22.05 kHz

| Band | Frequency Range | Bins |
|------|-----------------|------|
| LOW | 0-256 Hz | 0-12 |
| MID | 256-512 Hz | 12-24 |
| HIGH | 512-2048 Hz | 24-95 |

**At 48 kHz Sample Rate:**
- Bin frequency resolution: ~23.4 Hz per bin
- Nyquist frequency: 24 kHz

---

## Parameter Modulation

### Sinusoidal Oscillation

Scenes use frequency data to modulate parameters through sinusoidal curves:

```javascript
function modulateParameter(baseValue, frequency, amplitude) {
  const time = Date.now() * 0.001  // Seconds
  const oscillation = Math.sin(time * frequency) * amplitude
  return baseValue + oscillation
}

// In scene rendering:
const scale = 1 + (frequencies.low / 100) * 0.5  // 1.0 to 1.5 scale
const rotation = modulateParameter(angle, 2, frequencies.mid / 100)
const opacity = 0.5 + (frequencies.high / 100) * 0.5
```

### Parameter Types

1. **Audio-Driven Parameters**
   - Respond directly to frequency bands
   - Update 60 times per second
   - Range-limited (0-100% typical)

2. **Time-Driven Parameters**
   - Sinusoidal oscillation independent of audio
   - Smooth, continuous animation
   - Provides motion when silent

3. **Combined Parameters**
   - Blend audio and time modulation
   - Example: `baseOscillation + audioBoost * frequency`

### Example: Wave Scene

```javascript
// Wave generation with audio reactivity
function renderWaves(params, frequencies) {
  const rows = []
  
  for (let y = 0; y < height; y++) {
    let row = ''
    for (let x = 0; x < width; x++) {
      // Base wave
      const baseWave = Math.sin((x + time) * 0.1 + y * 0.02)
      
      // Audio modulation
      const bassWave = Math.sin((x + time) * 0.05) * (frequencies.low / 100)
      const trebleWave = Math.cos((y + time) * 0.1) * (frequencies.high / 100)
      
      // Combined height
      const height = baseWave + bassWave + trebleWave
      
      // Character from ramp based on height
      const charIndex = Math.floor((height + 1) / 2 * charset.length)
      row += charset[charIndex]
    }
    rows.push(row)
  }
  
  return rows.join('\n')
}
```

---

## Integration Points

### Scene Integration

Scenes receive frequency data via the render context:

```javascript
// Scene interface
{
  render({ 
    cols,           // Canvas width
    rows,           // Canvas height
    t,              // Time (seconds)
    params,         // Scene parameters
    charset,        // Character ramp string
    freq: {         // Frequency bands
      low: 0-100,   // Bass frequencies
      mid: 0-100,   // Midrange frequencies
      high: 0-100,  // Treble frequencies
      rms: 0-100    // Overall power
    }
  }) {
    // Return ASCII frame string
  }
}
```

### Display Updates

Frequency meters display real-time values:

```vue
<template>
  <div class="meter-group">
    <label>LOW</label>
    <div class="meter-bar">
      <div class="meter-fill" :style="{ width: meters.low + '%' }" />
    </div>
    <span>{{ Math.round(meters.low) }}%</span>
  </div>
</template>
```

### Control Panel Knobs

Audio parameter knobs adjust the frequency sensitivity:

```vue
<template>
  <q-knob
    v-model="audioControls.bassBoot"
    :min="0"
    :max="200"
    :step="10"
    @update:model-value="applyAudioBoost"
  />
</template>

<script setup>
function applyAudioBoost(value) {
  // Apply multiplier to bass band
  const boostedBass = meterValues.low * (value / 100)
  updateScene(boostedBass)
}
</script>
```

---

## Performance Optimization

### Memory Management

```javascript
// Reuse frequency data array
const frequencyData = new Uint8Array(analyser.frequencyBinCount)

function analyzeFrequencies() {
  // Reuse array instead of creating new ones
  analyser.getByteFrequencyData(frequencyData)
  
  // Process data
  const bands = processBands(frequencyData)
  return bands
}
```

### Update Frequency

- Analysis: Every frame (~60 Hz)
- DOM updates: Debounced if necessary
- Scene rendering: Synchronized with display refresh

### CPU Considerations

- FFT computation: ~1-2ms per frame
- Frequency band extraction: <1ms
- Scene rendering: 8-10ms (depends on algorithm)
- Total budget: 16.67ms per frame (60 FPS)

---

## Browser Compatibility

### Web Audio API Support

| Browser | AudioContext | getUserMedia | Status |
|---------|-------------|--------------|--------|
| Chrome | ✅ | ✅ | Full support |
| Firefox | ✅ | ✅ | Full support |
| Safari | ✅ | ✅ | Full support (iOS 13+) |
| Edge | ✅ | ✅ | Full support |
| Opera | ✅ | ✅ | Full support |

### Polyfills

```javascript
const AudioContext = window.AudioContext || window.webkitAudioContext
const mediaDevices = navigator.mediaDevices || navigator.webkitGetUserMedia
```

### HTTPS Requirement

- Microphone access requires HTTPS (except localhost)
- Web Audio API works on HTTP
- getUserMedia is restricted to secure contexts

---

## Troubleshooting

### Microphone Not Working

**Symptoms:** No audio input, permission prompt doesn't appear

**Solutions:**
1. Verify HTTPS or localhost
2. Check browser permissions (Settings → Privacy)
3. Ensure microphone is connected and enabled
4. Grant permission when browser prompts

### Audio File Won't Load

**Symptoms:** File selector works but no sound

**Solutions:**
1. Verify file format is supported
2. Check for CORS issues
3. Ensure audioContext is resumed (user interaction)
4. Check browser console for errors

### Frequency Analysis Not Working

**Symptoms:** Meters are static (0%)

**Solutions:**
1. Verify audio is actually playing
2. Check analyser is connected to destination
3. Ensure updateFrequencyMeters() is being called
4. Check FFT size is reasonable (1024-2048)

### Audio Drops Out

**Symptoms:** Audio glitches or stops intermittently

**Solutions:**
1. Reduce visual complexity (FPS drops affect audio)
2. Check system resources (CPU usage)
3. Try different input source (mic vs file)
4. Close other audio-consuming applications

---

## Future Enhancements

### Potential Improvements

1. **Beat Detection** — Detect kick drums, hi-hats
2. **Pitch Detection** — Identify note frequencies
3. **Spectral Analysis** — More detailed frequency breakdown
4. **Audio Effects** — Apply EQ, reverb to input
5. **Multi-source Mixing** — Blend multiple audio inputs
6. **Recording** — Save analysis data for playback

---

**Last Updated:** June 2026  
**Version:** 1.0.0
