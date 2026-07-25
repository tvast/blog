# 🌌 K0SM0S Micro-Frontend

Unified 3D navigation experience consolidating **pl4n3t**, **galax0und**, and **m00vies-front** using **cr1bl3** as the main router and build tool (replacing Vite).

## Project Structure

```
micro-front/
├── src/
│   ├── main.js              # cr1bl3 app entry point
│   ├── router.js            # CR1BL3Router orchestrator
│   ├── crash-test.js        # Component manifest generator
│   ├── zebpage.html         # Crash test UI (load all components)
│   ├── components/
│   │   ├── MainLayout.js    # m00vies MainLayout wrapper
│   │   ├── VueComponentBridge.js  # Vue component loader
│   │   └── [auto-loaded components]
│   ├── layouts/
│   │   └── [m00vies + galax0und layouts]
│   ├── pages/
│   │   └── [consolidated views]
│   ├── integration/
│   │   └── PlanetBridge.js  # pl4n3t ↔ galax0und bridge
│   └── utils/
├── public/
│   └── index.html           # Main entry (contains app shell + Three.js canvas)
├── cr1bl3.config.json       # cr1bl3 build config
├── package.json
└── README.md
```

## Key Integration Points

### 1. **cr1bl3 as Main Router** (`src/router.js`)
```javascript
// Routes control navigation flow:
/planet/:id      → Navigate to planet in galax0und
/zone/:zoneId    → Focus zone in pl4n3t
/dashboard       → Show m00vies dashboard
/                → Home view
```

### 2. **PlanetBridge** (`src/integration/PlanetBridge.js`)
Coordinates:
- Zone click in pl4n3t → Route to planet
- Transition animation (fade/camera)
- Scene load in galax0und
- Audio sync

### 3. **VueComponentBridge** (`src/components/VueComponentBridge.js`)
Loads Vue components from external projects:
- m00vies-front (HomeView, LoginView, Layouts)
- galax0und (scenes, components)
- pl4n3t (3D navigation)

## Zebpage Crash Test

Load **all components** from the three projects simultaneously to test:
- Import compatibility
- Load times
- Memory usage
- Error handling

### Run Crash Test
```bash
npm run test:crash
```

Opens: `http://localhost:5173/src/zebpage.html`

Shows:
- Component load status (✅/❌)
- Load times per component
- Memory usage
- Console logs + errors

## Development

### Start Dev Server
```bash
npm run dev
```
- cr1bl3 handles bundling (no Vite)
- Hot reload via WebSocket
- Serves on `http://localhost:5173`

### Build for Production
```bash
npm run build
```
- Minified bundle to `/dist`
- Three.js optimized
- Sourcemaps included

### Preview Build
```bash
npm run preview
```

## Architecture

```
User Action (click, URL)
    ↓
cr1bl3 Router (navigateToPlanet, navigateToZone)
    ↓
    ├─→ PlanetBridge (transition logic)
    │       ├─→ pl4n3t (update camera/zone)
    │       └─→ galax0und (load scene + audio)
    │
    └─→ m00vies-front (show dashboard/home)
```

## File Consolidation

All source files from the three projects are automatically scanned and indexed:

### m00vies-front
- Components (HomeView, LoginView, AnimatedVideoHero, etc.)
- Layouts (MainLayout, DashboardLayout, ViewerLayout)
- Composables (reusable Vue logic)

### galax0und
- ThorusScene (audio visualization)
- PlanetComponents (audio planets)
- Layouts (consolidated into micro-front)

### pl4n3t
- Core 3D navigation (globe + orbit)
- Transport (event communication)
- UI components (zone selectors)

## Configuration

### cr1bl3.config.json
```json
{
  "entry": "src/main.js",
  "port": 5173,
  "dev": {
    "wsPort": 2702,
    "hotReload": true
  },
  "external": {
    "aliases": {
      "@pl4n3t": "../pl4n3t/src",
      "@galax0und": "../galax0und/src",
      "@m00vies": "../m00vies-front/src"
    }
  }
}
```

## Performance Targets

- **Desktop**: 60 FPS (Three.js + Vue rendering)
- **Mobile**: 30 FPS fallback (reduced shader complexity)
- **Bundle**: <500KB gzipped
- **Load Time**: <2s (interactive)

## Debugging

Enable dev mode in `public/index.html`:
```javascript
window.DEBUG_MODE = true;  // Verbose logging
window.PERFORMANCE_MONITOR = true;  // FPS counter
```

## Troubleshooting

### WebSocket Connection Failed
- Ensure cr1bl3 dev server is running on port 2702
- Check firewall settings

### Components Not Loading
- Run `npm run test:crash` to check component paths
- Check browser console for import errors

### Three.js Canvas Not Rendering
- Verify WebGL support in browser
- Check `main.js` for `initThreeJS()` call

## Next Steps

1. ✅ Consolidate all components into `/micro-front`
2. ✅ Set cr1bl3 as main build tool
3. ✅ Create router orchestration layer
4. ✅ Implement PlanetBridge integration
5. ✅ Build zebpage crash test
6. ⏳ Run crash test and fix import errors
7. ⏳ Optimize bundle size
8. ⏳ Add performance monitoring

---

**Built with cr1bl3 🌌 Micro-Frontend Framework**
