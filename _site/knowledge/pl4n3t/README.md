# PL4N3T

PL4N3T is a deterministic orbital atlas inspired by the Soviet Globus and reinterpreted as a modern, poetic navigation system. The web layer renders Earth in Three.js, computes a satellite position from time alone, detects explorable zones, and shapes metadata for iPhone and Apple Watch delivery.

## Features

- Deterministic orbit simulation driven only by time and initial orbital parameters
- 3D Earth rendered with `SphereGeometry` and a procedural monochrome texture
- Real-time satellite marker and orbit progress
- Zone registry with enter/leave detection and discovery-based reveal logic
- Dark experimental mode with grain, monochrome treatment, pulsing zones, and subtle orbit drift
- WatchConnectivity payload model plus SwiftUI watch UI example

## Structure

```text
.
├── index.html
├── package.json
├── src
│   ├── core
│   │   ├── OrbitSimulator.js
│   │   ├── ZoneRegistry.js
│   │   ├── constants.js
│   │   └── geo.js
│   ├── data
│   │   └── zones.js
│   ├── render
│   │   ├── GlobeScene.js
│   │   └── earthTexture.js
│   ├── transport
│   │   ├── watchBridge.js
│   │   └── watchConnectivityExample.js
│   ├── ui
│   │   └── createApp.js
│   ├── main.js
│   └── styles.css
└── watch
    ├── Shared
    │   └── OrbitStateDTO.swift
    ├── iPhone
    │   └── OrbitConnectivityManager.swift
    └── WatchApp
        ├── OrbitWatchView.swift
        └── WatchOrbitConnectivityManager.swift
```

## Run

1. Install dependencies with `npm install`
2. Start the development server with `npm run dev`
3. Build for production with `npm run build`

## Integration Notes

- The orbit engine is deterministic: `getPosition(t)` depends only on `epochMs`, orbital period, inclination, ascending node, Earth rotation period, and the optional artistic drift.
- `ZoneRegistry` supports hidden-until-discovered zones and emits `enter` / `leave` transitions.
- The web layer dispatches `orbit:state`, `orbit:enter`, and `orbit:leave` DOM events for native bridges.
- `src/transport/watchConnectivityExample.js` shows how a WebView host can forward updates into native iPhone code.
- The Swift files are drop-in examples for a paired iPhone/watchOS project using `WatchConnectivity`.
