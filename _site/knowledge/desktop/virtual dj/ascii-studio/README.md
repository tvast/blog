# ASCII Studio

A configurable **ASCII-art animation studio** — a desktop app where you pick a
scene, tweak it live from a control panel, and watch it render as text.

**Stack:** Quasar 2 (app-vite v2) · Electron · Vue 3 (`<script setup>`) · Pinia.

![scenes: donut · matrix · plasma · waves · starfield · life](#)

## Features

- **6 animation scenes**, each self-describing with its own live controls:
  - **Spinning Donut** — the classic raymarched ASCII torus (rotation speed, tube thickness)
  - **Matrix Rain** — falling katakana columns with fading comet trails (density, trail, speed)
  - **Plasma Field** — overlapping sine waves (scale, speed)
  - **Ripple Waves** — concentric ripples from the centre (wavelength, speed)
  - **Starfield** — warp-speed flight (star count, warp speed)
  - **Conway's Life** — cellular automaton, FPS = generation speed (seed density, edge wrap)
- **Configurable everything:** grid size (columns × rows), target FPS, font size,
  the character density ramp (with presets), text/background colours (with themes
  and pickers), and a phosphor-glow toggle.
- **State conservation:** all settings — including per-scene parameters — are held
  in a **Pinia** store and auto-persisted to `localStorage`, so your setup is
  restored on reload or app restart.
- **Export:** copy the current frame to the clipboard or download it as `.txt`.
- Play/pause with the toolbar button or the **spacebar**; **reseed** stateful scenes.

## Run it

```bash
cd ascii-studio
npm install

# Desktop app (Electron) — the intended experience
npm run dev:electron

# …or in the browser as an SPA
npm run dev
```

### Build

```bash
npm run build            # SPA → dist/spa
npm run build:electron   # packaged desktop app → dist/electron
```

> `build:electron` uses `@electron/packager` and emits a platform bundle for the
> host OS. The dev/build configuration lives in `quasar.config.js → electron`.

## How it's wired

```
src/
├── scenes/                 # the animation engine — pure & stateful generators
│   ├── index.js            #   registry; each scene = { id, label, defaults, controls, create() }
│   ├── donut.js  matrix.js  plasma.js  waves.js  starfield.js  life.js
├── composables/
│   └── useAsciiEngine.js   # rAF loop, FPS throttle, pausable clock, scene lifecycle
├── stores/
│   └── config.js           # Pinia store (persisted) — all configurable state
├── components/
│   ├── AsciiCanvas.vue     # renders the frame string into a styled <pre>
│   ├── ControlPanel.vue    # the configuration UI (drawer)
│   ├── SliderRow.vue  ColorField.vue
├── layouts/MainLayout.vue  # header + control drawer + page
├── pages/IndexPage.vue     # canvas + status bar (fps, copy, export)
├── boot/pinia.js           # Pinia setup + tiny localStorage persistence plugin
└── router/                 # hash-mode routing (works under Electron file://)
src-electron/
├── electron-main.js        # BrowserWindow + dev/prod loading
└── electron-preload.js     # contextBridge → window.asciiStudio
```

### Adding a scene

Drop a module in `src/scenes/` exporting
`{ id, label, defaults, controls, create() }` where `create()` returns an object
with `render(ctx) → string`. `ctx = { cols, rows, t, dt, frame, params, charset }`.
Register it in `src/scenes/index.js` — the store, control panel, and engine pick
it up automatically.

## Notes

- `npm audit` reports a couple of advisories in the dev-only packaging toolchain
  (`@electron/packager` transitive deps); they don't ship in the app.
- Built/served over HTTP — opening `index.html` directly over `file://` won't work
  for the SPA build (Electron's production mode handles this via `loadFile`).
