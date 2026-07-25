# Thorus Visualizer - Architecture Overview

## System Flow Diagram

```
ThorusScene.vue
    ↓
MonolithScene (class)
    ├─→ createPlanet(songData)
    │   └─→ NEW: EnhancedPlanet
    │       ├─→ PlanetVisualizerConfig (generates unique settings)
    │       ├─→ planetMesh (main sphere with shader)
    │       ├─→ visualizationShapes[] (4-12 shapes)
    │       │   ├─ Torus
    │       │   ├─ Sphere
    │       │   ├─ Icosahedron
    │       │   ├─ Dodecahedron
    │       │   └─ Tetrahedron
    │       ├─→ ringMesh (optional Saturn-like ring)
    │       └─→ buttonMesh (play button)
    │
    ├─→ animate()
    │   └─→ planet.update(delta) for each planet
    │       ├─→ Update planetMesh shader (time, audio)
    │       ├─→ Rotate visualizationShapes
    │       ├─→ Deform shapes based on audio
    │       ├─→ Scale ringMesh with audio
    │       └─→ Animate buttonMesh
    │
    ├─→ onPointerDown(event)
    │   └─→ planet.toggleAudio()
    │
    └─→ onPointerMove(event)
        └─→ Show tooltip with song name


AudioManager
    ├─→ loadAudio(url)
    ├─→ playAudio(audio)
    ├─→ getAudioData()  ←─── Used by planet.update()
    └─→ stopAll()
```

## Component Breakdown

### 1. EnhancedPlanet

**Composition:**
```
EnhancedPlanet (single object per song)
├── planetMesh
│   ├── Geometry: SphereGeometry (configurable radius, segments)
│   ├── Material: ShaderMaterial (vertex + fragment shader)
│   └── Uniforms: time, alpha, audioLevel, colors
│
├── visualizationShapes[] (4-12 shapes)
│   ├── Each has:
│   │   ├── Geometry (Torus/Sphere/Icosahedron/etc.)
│   │   ├── ShaderMaterial (unique per shape)
│   │   ├── Rotation speeds
│   │   ├── Audio reactivity
│   │   └── Original positions (for deformation)
│   └── Arranged in circle around planetMesh
│
├── ringMesh (optional)
│   ├── Geometry: RingGeometry
│   ├── Material: MeshPhoneMaterial
│   ├── Scales with audio
│   └── Rotates independently
│
└── buttonMesh
    ├── Geometry: SphereGeometry (0.3 radius)
    ├── Material: MeshPhongMaterial
    └── Orbits above planet with pulsing
```

### 2. PlanetVisualizerConfig

**Generation Process:**
```
PlanetVisualizerConfig()
├── randomRange(min, max)
├── randomChoice(array)
├── randomShapeTypes()
├── randomColorScheme()
└── getColorSchemeAsThreeColors()
    
Returns config with:
├── shapeCount: 4-12
├── shapeTypes: [type1, type2, ...]
├── idleRotationSpeed: 0.002-0.008
├── audioReactivity: 0.5-1.5
├── colorScheme: {primary, accent, glow}
├── hasRing: boolean
├── sphereGeometry: {radius, widthSegments, heightSegments}
├── ring: {innerRadius, outerRadius, opacity, segments}
└── shaderConfig: {frequency, amplitude, timeScale}
```

### 3. Audio Reactivity Flow

```
AudioContext (Web Audio API)
    ↓
analyser.getByteFrequencyData()
    ↓
audioManager.getAudioData()
    ↓
planet.update(delta)
    ├─→ planetMesh.material.uniforms.audioLevel = audioData
    ├─→ Rotate visualizationShapes at speed * (1 + audioLevel * reactivity)
    ├─→ Deform geometry based on audio
    ├─→ Scale ringMesh with audioLevel
    └─→ Renderer renders all objects
```

## Key Features

### Per-Planet Uniqueness

Each planet is completely unique:

| Feature | Variance |
|---------|----------|
| Shape Count | 4-12 |
| Shape Types | Mixed varieties |
| Colors | 6 different schemes |
| Rotation Speed | 0.002-0.008 rad/frame |
| Audio Reactivity | 0.5-1.5x multiplier |
| Wireframe | 50% chance |
| Has Ring | 40% chance |
| Sphere Size | 1.0-1.8 radius |
| Position Offset | ±15 units X, ±10 units Y, ±15 units Z |
| Scale | 0.8-1.3x |

### Shader Customization

Each planet's visualization shapes use shaders with unique parameters:
- Wave frequency per planet
- Wave amplitude per planet
- Time scale per planet
- Color mixing ratios per planet

### Audio-Driven Animation

```javascript
// Pseudo-code for shape animation
const audioLevel = audioManager.getAudioData() * 0.01;

visualizationShapes.forEach(shape => {
  // Rotation intensifies with audio
  shape.rotation.x += speed * (1 + audioLevel * config.audioReactivity);
  shape.rotation.y += speed * 1.5 * (1 + audioLevel * config.audioReactivity);
  
  // Geometry deforms with audio
  const deformation = noise * audioLevel * config.noiseAmplitude;
  positionAttribute.array[i] += deformation;
});

// Ring pulses with audio
ringMesh.scale.set(1 + audioLevel * reactivity);
ringMesh.material.opacity = baseOpacity + audioLevel * 0.4;
```

## Interaction Map

```
User Action → Handler → Effect
───────────────────────────

Click on Shape
    ↓
onPointerDown()
    ↓
raycaster.intersectObjects()
    ↓
planet.toggleAudio()
    ├─→ If not loaded: Load audio
    ├─→ If paused: Play audio
    └─→ If playing: Pause audio
        ↓
    Button scales up/down
    Song title displayed
    Shapes react to audio

Hover over Shape
    ↓
onPointerMove()
    ↓
raycaster.intersectObjects()
    ↓
Show tooltip
    └─→ Displays song title

Resize Window
    ↓
onResize()
    ↓
Update camera & renderer
```

## Color Schemes

6 unique color schemes used randomly:

```javascript
Scheme 1: Deep Blue
  Primary: rgb(64, 64, 122)
  Accent:  rgb(52, 172, 224)
  Glow:    rgb(0, 200, 255)

Scheme 2: Warm Orange
  Primary: rgb(255, 177, 66)
  Accent:  rgb(255, 82, 82)
  Glow:    rgb(255, 100, 0)

Scheme 3: Teal Green
  Primary: rgb(33, 140, 116)
  Accent:  rgb(51, 217, 178)
  Glow:    rgb(0, 255, 200)

Scheme 4: Purple Magenta
  Primary: rgb(200, 100, 255)
  Accent:  rgb(255, 100, 200)
  Glow:    rgb(200, 0, 255)

Scheme 5: Cyan Yellow
  Primary: rgb(100, 255, 200)
  Accent:  rgb(255, 200, 100)
  Glow:    rgb(0, 255, 100)

Scheme 6: Red Blue
  Primary: rgb(255, 100, 100)
  Accent:  rgb(100, 100, 255)
  Glow:    rgb(255, 0, 0)
```

## Performance Characteristics

```
Per Planet:
├── 1 planetMesh (1 geometry, 1 shader material)
├── 4-12 visualizationShapes (4-12 geometries, 4-12 shader materials)
├── 1 ringMesh (optional, 1 geometry, 1 material)
├── 1 buttonMesh (1 geometry, 1 material)
└── Total: ~6-15 THREE.js objects per planet

For 25 Planets:
├── Geometries: ~150-375
├── Materials: ~150-375
├── Total Objects: ~150-375
├── Triangles per shape: ~2,000-4,000
├── Total Triangles: ~600K-1.5M (reasonable for modern GPUs)

Rendering Pipeline per frame:
├── Read audio data: 1-2ms
├── Update uniforms: <1ms per planet
├── Update geometries: 2-4ms per planet
├── Raycasting (on interaction): <1ms
└── Render: 5-15ms (depends on GPU/resolution)
```

## Data Flow During Animation

```
Frame Timing:
├─ Δt = time since last frame
│
├─ audioManager.getAudioData()
│  └─ Read frequency data from Web Audio API
│
├─ FOR EACH PLANET:
│  ├─ planet.update(Δt)
│  │  ├─ Update planetMesh.material.uniforms.time
│  │  ├─ FOR EACH visualization shape:
│  │  │  ├─ Update material.uniforms.time
│  │  │  ├─ Update rotation (base + audio reactivity)
│  │  │  ├─ Update geometry positions (deformation)
│  │  │  └─ Mark for GPU update
│  │  ├─ Update ringMesh scale and opacity
│  │  └─ Update buttonMesh position and scale
│
├─ renderer.render(scene, camera)
│  ├─ Compile shader changes
│  ├─ Upload geometry changes to GPU
│  ├─ Execute vertex shaders for all geometries
│  ├─ Execute fragment shaders for all pixels
│  └─ Render to screen
│
└─ requestAnimationFrame (next frame)
```

## Integration Points

```
ThorusScene.vue ← Old system still works
    ↓
MonolithScene (initialization)
    ├─→ Creates AudioManager
    ├─→ Fetches song list
    ├─→ FOR EACH SONG → NEW: EnhancedPlanet
    └─→ Starts animation loop
        ├─→ planet.update() ← Calls EnhancedPlanet.update()
        ├─→ raycaster.intersectObjects() ← Works with all planet objects
        └─→ renderer.render() ← Renders all planets

Old files still available:
├─ src/components/Thorus.vue (card-based visualizer)
├─ src/utils/DonutsVisualizer.js (standalone visualizer)
├─ src/Thorus_Core/Planet.js (simple planet - not used)

New files integrated:
├─ src/Thorus_Core/EnhancedPlanet.js (main component)
├─ src/Thorus_Core/PlanetVisualizerConfig.js (config generator)
└─ src/components/ThorusScene.vue (UPDATED to use EnhancedPlanet)
```

## Customization Hooks

```
If you want to customize:

1. Visual Appearance:
   └─ Edit PlanetVisualizerConfig.randomColorScheme()

2. Animation Speed:
   └─ Edit PlanetVisualizerConfig range values
      (idleRotationSpeed, audioReactivity, etc.)

3. Shape Variety:
   └─ Edit PlanetVisualizerConfig.randomShapeTypes()
      or EnhancedPlanet.createVisualizationShapes()

4. Audio Sensitivity:
   └─ Edit EnhancedPlanet.deformGeometry()
      or config.audioReactivity range

5. Planet Count:
   └─ Edit ThorusScene fetchPlanets()
      (returns songsList.value)

6. Shader Effects:
   └─ Edit fragment/vertex shaders in:
      - EnhancedPlanet (planetMesh shader)
      - EnhancedPlanet (visualizationShapes shader)
      - ThorusScene (backgroundMesh shader)
```
