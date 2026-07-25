# Micro-Frontend Integration Guide

## 📊 Project Consolidation Status

### Component Inventory
- **pl4n3t**: 11 components (core 3D navigation)
- **galax0und**: 48 components (audio + planets)
- **m00vies-front**: 150 components (UI + layouts)
- **TOTAL**: 209 components indexed

All components are catalogued in `/src/component-manifest.json`

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│         public/index.html (Main Shell)          │
│         Canvas + Root DOM + Loading State       │
└────────────────────┬────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │  cr1bl3 Framework   │
          │  (Router + Build)   │
          └──┬──────┬──────┬────┘
             │      │      │
    ┌────────▼──┐  ┌▼──────┴────┐  ┌──────────┐
    │  Router   │  │ Three.js   │  │ WebSocket│
    │ (nav.js)  │  │ Context    │  │ Dev Svr  │
    └────────┬──┘  └────────────┘  └──────────┘
             │
      ┌──────▼─────────────────────────────┐
      │   Integration Layer (PlanetBridge)   │
      │  - Coordinates transitions           │
      │  - Manages scene loading             │
      │  - Syncs audio                       │
      └──────┬────────────┬────────────┬────┘
             │            │            │
    ┌────────▼────┐  ┌────▼────┐  ┌──▼─────────┐
    │  pl4n3t     │  │galax0und│  │m00vies-    │
    │  (3D Nav)   │  │(Audio)  │  │front (UI)  │
    └─────────────┘  └─────────┘  └────────────┘
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /Users/d0c/Desktop/K0sm0s/micro-front
npm install
```

### 2. Run Development Server
```bash
npm run dev
# Starts cr1bl3 dev server on http://localhost:5173
```

### 3. Run Crash Test
```bash
npm run test:crash
# Generates manifest and opens http://localhost:5173/src/zebpage.html
```

## 📁 Folder Organization

```
micro-front/src/
├── main.js                 # cr1bl3 initialization
├── router.js              # Route orchestration
├── crash-test.js          # Component scanner
├── zebpage.html           # Crash test UI
├── component-manifest.json # Auto-generated index
│
├── components/            # cr1bl3 components
│   ├── MainLayout.js      # Wrapped m00vies layout
│   ├── VueComponentBridge.js
│   └── [auto-registered components]
│
├── integration/           # Cross-project coordination
│   └── PlanetBridge.js    # pl4n3t ↔ galax0und bridge
│
└── utils/                 # Shared utilities
    ├── performance.js     # FPS monitor
    ├── logger.js          # Debug logging
    └── constants.js       # Shared constants
```

## 🔗 Integration Points

### Router Configuration (cr1bl3)

Routes are defined in `src/router.js`:

```javascript
// Navigate to planet (load galax0und scene)
router.navigateToPlanet('earth', 'fade')
  // Emits: 'planet:navigate', 'scene:load'

// Navigate to zone (update pl4n3t camera)
router.navigateToZone('zone_north', 'camera')
  // Emits: 'zone:focus'

// Navigate to dashboard (show m00vies view)
router.navigateToDashboard()
  // Emits: 'view:load'
```

### Event Flow

```
User clicks zone in pl4n3t
    ↓
PlanetBridge.onZoneSelected(zoneId)
    ↓
router.navigateToPlanet(zoneId)
    ↓
[Emit] planet:navigate
    ↓
[Listen] PlanetBridge.transitionBetweenZones()
    ↓
[Animate] fade/camera transition
    ↓
[Emit] scene:load with sceneId
    ↓
[Listen] galax0und loads scene
    ↓
[Sync] Audio starts
    ↓
[Update] pl4n3t visualization
```

## 🧪 Zebpage Crash Test

### What It Tests
1. **Import Viability**: Can all 209 components be imported?
2. **Load Times**: How long does each component take?
3. **Memory Usage**: Total heap size during load
4. **Error Handling**: Graceful degradation on failure

### View Results at
```
http://localhost:5173/src/zebpage.html
```

### Metrics Shown
- ✅ Components loaded
- ❌ Components failed
- ⏱️ Total load time (ms)
- 💾 Memory used (MB)
- 📊 Real-time console logs

## 📦 External Module Aliases

Defined in `cr1bl3.config.json`:

```javascript
import '@pl4n3t/core/OrbitSimulator'        // → pl4n3t/src/core/OrbitSimulator.js
import '@galax0und/components/Planet'      // → galax0und/src/components/Planet.js
import '@m00vies/layouts/MainLayout.vue'   // → m00vies-front/src/layouts/MainLayout.vue
import '@cr1bl3/index'                     // → cr1bl3/@d0c/cr1bl3-lib/index.js
```

## 🎨 Component Loading Strategies

### Strategy 1: Direct Registration (cr1bl3 native)
```javascript
import H3R0 from './components/H3R0.js'
app.registerComponent('H3R0', H3R0)
```

### Strategy 2: Vue Component Bridge (for external Vue components)
```javascript
const bridge = new VueComponentBridge(
  '../../../m00vies-front/src/components/HomeView.vue',
  { /* props */ }
)
const html = await bridge.render()
```

### Strategy 3: Dynamic Import (lazy loading)
```javascript
const module = await import('@m00vies/pages/Dashboard.vue')
const component = module.default
```

## 🔧 Build Configuration

### Development
```json
{
  "entry": "src/main.js",
  "port": 5173,
  "dev": {
    "wsPort": 2702,
    "hotReload": true
  }
}
```

### Production
```json
{
  "build": {
    "target": "es2020",
    "minify": true,
    "sourcemaps": true
  },
  "outDir": "dist"
}
```

## ⚡ Performance Optimization

### Current Targets
- **Desktop**: 60 FPS
- **Mobile**: 30 FPS (fallback)
- **Bundle**: <500KB gzipped
- **First Paint**: <1s
- **Interactive**: <2s

### Implemented Optimizations
1. ✅ Component lazy loading via dynamic import
2. ✅ Three.js auto-disposal of scenes
3. ✅ Event debouncing (transitions)
4. ✅ Canvas resize optimization
5. ✅ Memory leak prevention in unmount handlers

### Future Optimizations
1. ⏳ Code splitting by route
2. ⏳ Shader compilation caching
3. ⏳ Audio buffer pooling
4. ⏳ Geometry instance reuse

## 🐛 Debugging

### Enable Debug Mode
```javascript
// In public/index.html
window.DEBUG_MODE = true
window.PERFORMANCE_MONITOR = true
window.LOG_EVENTS = true
```

### Console Output
- `🚀 Navigating to planet: earth`
- `🎬 Scene loaded: earth`
- `⚡ Transition: earth → mars (fade)`
- `🔇 Scene unloading: earth`

### Browser DevTools
1. **Elements**: Check DOM structure
2. **Console**: View cr1bl3 logs
3. **Network**: Monitor imports
4. **Performance**: Profile frame times
5. **Memory**: Watch for leaks

## 📝 Common Tasks

### Add a New Component
1. Create file in `src/components/NewComponent.js`
2. Export as default
3. cr1bl3 auto-loads it

### Connect External Component
1. Use `VueComponentBridge` for Vue components
2. Or import directly and adapt interface

### Add a New Route
1. Edit `src/router.js`
2. Add `navigateToXxx()` method
3. Emit appropriate events
4. Create listener in PlanetBridge

### Deploy to Production
```bash
npm run build
# Output in /dist
# Deploy dist/ to web server
```

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Components not loading | Run `npm run test:crash`, check console for import paths |
| WebSocket connection failed | Ensure cr1bl3 dev server running, check port 2702 |
| Three.js canvas black | Verify WebGL support, check `initThreeJS()` call |
| Vue components show errors | Use VueComponentBridge wrapper, ensure Vue 3 compatible |
| Memory usage grows | Check event listeners not removed, scene disposal |

## 📚 Related Documentation

- **cr1bl3**: `/Users/d0c/Desktop/K0sm0s/cr1bl3/README.md`
- **pl4n3t**: `/Users/d0c/Desktop/K0sm0s/pl4n3t/README.md`
- **galax0und**: `/Users/d0c/Desktop/K0sm0s/galax0und/README.md`
- **m00vies-front**: `/Users/d0c/Desktop/K0sm0s/m00vies-front/README.md`

## ✅ Checklist

- [x] Consolidate all 209 components into index
- [x] Replace Vite with cr1bl3
- [x] Create router orchestration layer
- [x] Implement PlanetBridge integration
- [x] Build zebpage crash test
- [ ] Run crash test and fix import errors
- [ ] Optimize bundle size
- [ ] Add analytics/monitoring
- [ ] Deploy to production

---

**Last Updated**: 2024-04-24  
**Framework**: cr1bl3 Micro-Frontend  
**Status**: Integration Phase
