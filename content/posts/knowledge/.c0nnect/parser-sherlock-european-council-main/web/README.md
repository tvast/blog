# Dashboard of One — web client

command : .venv/bin/python app.py

#

cd web && npm install && npm run dev # http://127.0.0.1:5173
A maintainable **Vite + Vue 3 + TypeScript + Quasar** rebuild of the EU Council
signals dashboard. Theming is Dracula, keyed on lavender (`#bd93f9`) + tomato
(`#ff6347`).

## Architecture

```
src/
  types/        domain models (single source of truth)
  firebase/     modular SDK init, gated on env vars
  services/     api client · signals · scraper · watchlist (repository pattern)
  composables/  useSignals · useWatchlist · useScraper (reactive state + lifecycle)
  components/   AppHeader · SignalsFeed · PersonCard · OutreachItem · ScrapeFab
  styles/       quasar brand vars (sass) + Dracula theme (css)
  App.vue       layout orchestrator — wires composables to components
```

The UI depends only on **composables**, composables depend only on **services**,
and services hide the backend. The watchlist has two interchangeable
implementations behind `WatchlistRepository`:

- **Firestore** — real-time, multi-device, scalable (used when the
  `VITE_FIREBASE_*` env vars are set).
- **Flask HTTP** — talks to the existing `/api/watchlist` endpoints and polls.
  Zero-config fallback, so the app runs before any Firebase setup.

Swapping or adding a backend never touches a component.

## Run

The Flask app still serves the signals + scraper API. Start it first:

```bash
# repo root
.venv/bin/python app.py        # → http://127.0.0.1:5000
```

Then the SPA (Vite proxies `/api` → Flask):

```bash
cd web
npm install
cp .env.example .env.local      # optional: add Firebase creds
npm run dev                      # → http://127.0.0.1:5173
```

## Scripts

| Command             | What                                    |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Vite dev server with HMR + `/api` proxy |
| `npm run typecheck` | `vue-tsc --noEmit` (strict)             |
| `npm run build`     | type-check then production bundle       |
| `npm run preview`   | serve the built bundle                  |

## IP Access

The Flask backend only allows API access from configured client IPs. By default
this repo allows the current Mac Wi-Fi IP plus loopback:
`192.168.1.3`, `127.0.0.1`, and `::1`.

To change it, start Flask with `ALLOWED_CLIENT_IPS`:

```bash
ALLOWED_CLIENT_IPS=127.0.0.1,::1,192.168.1.3 .venv/bin/python app.py
```

## Firestore Watchlist

1. Create a Firebase project and enable **Firestore**.
2. Put the web-app config into `.env.local` (`VITE_FIREBASE_*`).
3. The watchlist lives in the `watchlist` collection, synced live. If Firebase
   config is blank, the app falls back to the Flask CSV-backed watchlist API.

Suggested Firestore rules for a private project:

```
match /watchlist/{id} {
  allow read, write: if false;
}
```
