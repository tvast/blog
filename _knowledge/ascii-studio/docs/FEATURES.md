# ✨ Features

## Audio Reactivity

### Real-Time Analysis
- **Frequency Bins** - 256-point FFT analysis
- **Low/Mid/High Meters** - Separate band metering
- **RMS Level** - Overall amplitude detection
- **Adaptive Thresholding** - Smart sensitivity
- **Smooth Interpolation** - Natural transitions

### Data Points
```javascript
{
  frequencies: Uint8Array[256],  // Frequency bins 0-255
  low: number,                    // 0-255 (0-250Hz)
  mid: number,                    // 0-255 (250-2000Hz)
  high: number,                   // 0-255 (2000-20kHz)
  rms: number                     // 0-1 (RMS amplitude)
}
```

---

## 3D Graphics

### Rendering Pipeline
- **WebGL 2.0** - Modern graphics
- **Three.js** - 3D library
- **GLSL Shaders** - Custom effects
- **Deferred Rendering** - Multiple lights
- **Post-Processing** - Bloom, glow, FXAA

### Performance
- **60 FPS** target on modern hardware
- **4K Resolution** support
- **Adaptive Quality** based on device
- **GPU Acceleration** with texture atlasing

---

## ASCII Rendering

### Character Sets
- **Standard ASCII** - 95 printable characters
- **Extended ASCII** - 256 characters
- **Custom Charsets** - User-defined sets
- **Density Ramps** - Brightness mapping

### Algorithms
- **Luminance Mapping** - Brightness to character
- **Dithering** - Error diffusion
- **Aspect Ratio Correction** - Character shape
- **Anti-Aliasing** - Smooth rendering

---

## Color System

### 12 Professional Themes
- **6 Dark Themes** - High contrast, vibrant
- **6 Light Themes** - Soft, readable
- **Real-Time Switching** - Instant change
- **Custom Colors** - User palette

### Color Operations
- **Hue Rotation** - Shift color wheel
- **Saturation Control** - Color intensity
- **Brightness Adjustment** - Adaptive contrast
- **RGB/HSL Conversion** - Color space flexibility

---

## Parameter Control

### 30+ Real-Time Parameters

| Category | Parameters |
|----------|-----------|
| **Render** | Grid size, resolution, quality |
| **Animation** | Speed, rotation, scale, zoom |
| **Audio** | Threshold, sensitivity, smoothing |
| **Effects** | Glow, bloom, saturation, hue |
| **Particles** | Count, lifetime, emission |
| **Shader** | Intensity, frequency scale |

---

## Input Sources

### Audio Input
- **File Upload** - MP3, WAV, OGG
- **Microphone** - Live input
- **System Audio** - Playback loopback
- **URL Stream** - Remote audio

### Video Input
- **MP4 / WebM** - Video files
- **Camera Feed** - Webcam
- **Canvas** - Generated content
- **Screen Share** - Display capture

---

## Export & Recording

### Capture Options
- **Frame Export** - PNG/JPEG
- **Video Recording** - MP4/WebM
- **Sequence Export** - Numbered frames
- **GIF Creation** - Animated GIF

### Encoding
- **H.264** - MP4 codec
- **VP9** - WebM codec
- **Lossless** - PNG/TIFF
- **Quality Control** - Bitrate adjustment

---

## UI & Controls

### Control Panel
- **Scene Selector** - 11 scenes
- **Parameter Sliders** - Real-time adjustment
- **Theme Picker** - 12 colors
- **Input Manager** - File/mic/stream
- **Preset System** - Save/load configs

### Keyboard Shortcuts
- `Space` - Play/pause
- `L` - Toggle light/dark
- `S` - Screenshot
- `R` - Reset parameters
- `H` - Show/hide UI

---

## Performance Metrics

### Optimization
- **Memory Usage** - < 200MB typical
- **CPU Usage** - 10-30% (WebGL)
- **GPU Usage** - 20-50% (3D)
- **Latency** - <50ms audio-to-visual

### Scaling
- **Mobile** - Reduced quality
- **Tablet** - Medium quality
- **Desktop** - Full quality
- **4K** - Ultra quality

---

## Languages & i18n

### Supported Languages
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇫🇷 French

### UI Translation
- Full interface localization
- Right-to-left support (RTL)
- Date/time formatting
- Number formatting

---

## Accessibility

### Support
- **Keyboard Navigation** - Full keyboard control
- **Screen Readers** - ARIA labels
- **Color Contrast** - WCAG AA compliant
- **Text Scaling** - Responsive typography

---

## Integration

### API Endpoints
- REST API for remote control
- WebSocket for real-time data
- MIDI support for controllers
- OSC (Open Sound Control)

### Plugins
- Custom scene system
- Shader plugin interface
- Effect plugin system
- Color transformer plugins

---

Made with ♥ for creators
