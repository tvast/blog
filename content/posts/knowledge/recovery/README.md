# Recovery UI 🔎

An **Electron-first Quasar** desktop app for scanning a hard drive, USB volume,
or **iCloud Drive** for crypto-wallet recovery artifacts. It's the GUI version of
the original `money.sh` / `package.sh` / `pkg.sh` recovery scripts.

> ⚠️ **Use on drives you own.** This is a recovery tool for finding *your own* lost
> wallet files (e.g. a `wallet.dat` on an old disk). Don't point it at storage you
> don't have the right to scan.

## Architecture (Electron-first)

```
┌──────────────────────────┐        IPC bridge        ┌───────────────────────────┐
│  Renderer (Quasar / Vue) │  ───  preload.js  ───▶   │  Main process (Node)      │
│  src/App.vue             │   window.recovery.*      │  electron/scanner.js      │
│  • pick source           │  ◀── progress/match ──   │  • walks the filesystem   │
│  • edit patterns         │      events              │  • filename glob match    │
│  • view live results     │                          │  • byte-pattern scan      │
└──────────────────────────┘                          └───────────────────────────┘
```

All filesystem access lives in the **main process**. The UI has **no Node access**
(`contextIsolation: true`, `nodeIntegration: false`) and talks to it only through a
small, explicit `window.recovery` API exposed in `electron/preload.js`.

## What it scans (ported from the scripts)

- **Filename / path patterns** (from `money.sh`): `*wallet*`, `*key*`, `*seed*`,
  `wallet.dat`, `*.dat`, `*.keystore`, `UTC--*`, `*.eth`, `*.btc`, `*.txt`, `*.pdf`,
  `*.json`, plus path globs like `*/eth/*`. All editable in the UI.
- **Deep content scan** (from `package.sh` / `pkg.sh`): streams file bytes looking
  for Berkeley-DB wallet markers — `orderposnext`, `addrIncoming`, `bestblock`,
  `defaultkey`, `acentry`, `wallet.dat` — and reports the byte offset of each hit.

Sources are auto-discovered: every mounted `/Volumes/*`, your Home folder,
**iCloud Drive**, Desktop/Documents/Downloads, plus a **Browse…** picker.

## Run it

```bash
cd recovery-ui
npm install
npm run dev        # builds the Electron main/preload, starts Vite, launches the app
```

### Build a distributable

```bash
npm run dist       # vite build + electron-builder → release/
```

## macOS permissions

Scanning external volumes and iCloud requires disk access. If results look empty,
grant the app (or your terminal, during `npm run dev`) **Full Disk Access** in
*System Settings → Privacy & Security → Full Disk Access*.

## Project layout

```
recovery-ui/
├── electron/
│   ├── main.js        # window + IPC handlers
│   ├── preload.js     # contextBridge → window.recovery
│   └── scanner.js     # the recovery engine (filename + byte scan)
├── src/
│   ├── App.vue        # the whole UI
│   ├── main.js        # Quasar bootstrap
│   └── css/quasar.variables.scss
├── index.html
├── vite.config.mjs
└── package.json
```
