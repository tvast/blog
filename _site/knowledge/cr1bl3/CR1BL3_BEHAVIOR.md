# CR1BL3 Behavior Guide 🍩

This document describes how **CR1BL3** behaves in your repo: what runs in Node (CLI/server/build), what runs in the browser (app + router + components), and how the files are expected to be served and bundled.

---

## Mental model

CR1BL3 is two worlds that cooperate:

- **Node world (CLI + Dev Server + Build)**
  - Starts an HTTP server
  - Optionally bundles your browser entry with **esbuild**
  - Runs a WebSocket for hot reload
  - Never uses `document` or `window`

- **Browser world (App + Router + Components + Three.js)**
  - Renders UI into a mount container (`#app`)
  - Loads route components (lazy import or bundled)
  - Uses DOM APIs (`document`, `HTMLElement`) and Web APIs (`WebSocket`, `history`)

Keeping these two worlds separate avoids the classic “Cannot use import statement outside a module” and “document is not defined” headaches.

---

## Repository layout (your tree)

Your monorepo-like structure is:

```
CR1BL3/
  @d0c/
    cr1bl3-cli/           # Node world
    cr1bl3-lib/           # Browser library (and shared core)
  public/                 # Web entry assets served by the dev server
  dist/                   # Bundled output (bundle.js)
  index.html, index.js    # Root files (can be used, but be consistent)
  cr1bl3.config.json      # Build config used by CLI
```

---

## The CR1BL3 CLI (Node world)

### What it does

`cr1bl3` CLI provides commands like:

- `cr1bl3 dev --port 2702 --animate`
- `cr1bl3 build --sourcemap`

Behavior:
1. Parses CLI args into `{ command, flags, values }`
2. Runs the command handler (dev/build/animate/help)
3. Prints Dracula-ish output (optional ASCII donut animation)

### What it must NOT do

The CLI must not:
- call `document.querySelector(...)`
- import browser-only modules that execute DOM code at import time

If you need to “use the lib” from CLI, do it only through:
- filesystem operations (build)
- metadata extraction (read config)
- text output
- bundling (esbuild)

---

## Dev Server behavior (Node world)

### Routing and static serving

Your dev server is a single HTTP server with SPA behavior:

- If the request has a **file extension** (like `.js`, `.css`, `.png`), it is treated as a **static asset**
- If the request has **no extension** (`/about`, `/hero`), it is treated as a **client route**, so the server returns **index.html**

This makes client-side routing work on refresh:

- `/about` refresh does not 404
- Server returns `index.html`
- Browser Router reads `window.location.pathname` and renders the correct component

### WebSocket hot reload

The dev server creates a WebSocket server on the same port:

- Browser connects to `ws://localhost:2702`
- When a rebuild happens, the server broadcasts `reload`
- Browser receives `reload` and refreshes the page

Message format supported:
- raw string: `"reload"`
- or JSON: `{ "type": "reload" }`

### Watch and rebuild

If an entry point exists, dev server:
1. Bundles with esbuild into `dist/bundle.js`
2. Watches files (via esbuild + fs.watch)
3. On change: rebuild then WS broadcast reload

This is why it is highly recommended to load `/dist/bundle.js` in your HTML.

---

## Build behavior (Node world)

### Entry resolution

The browser bundle entry point is determined by:

1. `cr1bl3.config.json` `entry` (best)
2. fallback candidates in repo root:
   - `index.js`
   - `src/index.js`
   - `src/main.js`
   - `main.js`

Output:
- `dist/bundle.js`
- optional `dist/bundle.js.map`

### Why you want a dedicated browser entry

If you point entry to a “barrel” `index.js` that also exports CLI utilities, you risk bundling Node-only code into the browser build.

Best practice:
- Create a dedicated browser entry (example: `public/index.js`)
- In `cr1bl3.config.json` set `"entry": "public/index.js"`

---

## Browser app behavior (cr1bl3 class)

### Mounting concept

The app should render into a single container, usually:

```html
<div id="app"></div>
```

Browser entry does:

```js
const host = document.getElementById("app");
host.innerHTML = "";
host.appendChild(createAppLayout());
```

Recommended pattern:
- `app.root` points to the mount element
- `app.outlet` points to the route outlet element (usually `#content`)

### Utility CSS injection

CR1BL3 generates margin/padding utility classes based on `config.spacing` and injects them as a `<style>` tag.

Examples:
- `.m-16 { margin: 16px }`
- `.pt-8 { padding-top: 8px }`

### Components system

CR1BL3 can:
- register components: `app.registerComponent(name, component)`
- lazy import a component by naming convention: `./components/<kebab>.js`
- render configured components list (when used)

### Three.js integration

The class can initialize a Three.js scene:

- creates `Scene`, `Camera`, `Renderer`
- appends the canvas to a container inside your app
- runs an animation loop

Important:
- Three.js methods are browser-only
- container resolution should be scoped to your app (prefer querying inside `app.root`)

---

## Router behavior (Browser world)

### Lazy loading routes

Router holds a map:

```js
routes["/"] = () => import("./components/H0m3.js");
routes["/about"] = () => import("./components/4bout.js");
```

On navigation:
1. resolves loader by path
2. shows a loading placeholder in the outlet
3. dynamic import the route component
4. mounts component into `#content`
5. updates browser history via `history.pushState`

### Component contract

A route module default export should be a function that returns either:

- an `HTMLElement`
- or an object with a `render()` method returning an `HTMLElement`

Optional:
- if the object has `destroy()`, Router calls it on route change for cleanup

### SPA navigation

Router intercepts clicks (event delegation) and calls `navigate(href)` instead of full page reload.

Also listens to:
- `window.onpopstate` for back/forward navigation

---

## “Build the lib but do not expose it” strategy

### Goal

You want:
- app works in browser
- lib code is included
- browser cannot import `/@d0c/cr1bl3-lib/*` as separate files

### How

1) Bundle everything:
- browser entry imports lib via filesystem path (build-time)
- esbuild produces `dist/bundle.js` that contains the lib code

2) Only serve `public/` and `dist/`:
- dev server must not serve repo root or `@d0c/cr1bl3-lib/` paths
- `index.html` loads only `/dist/bundle.js`

3) HTML example:

```html
<script type="module" src="/dist/bundle.js"></script>
```

Reality check:
- The code is still in the bundle (viewable if someone downloads it)
- But your module files are not directly accessible one-by-one via HTTP

---

## Recommended “known good” setup

### 1) `cr1bl3.config.json`

```json
{
  "entry": "public/index.js",
  "publicDir": "public",
  "outdir": "dist"
}
```

### 2) `public/index.html`

```html
<div id="app"></div>
<script type="module" src="/dist/bundle.js"></script>
```

### 3) `public/index.js` (browser entry)

```js
import { cr1bl3 } from "../@d0c/cr1bl3-lib/index.js";
import Router from "../@d0c/cr1bl3-lib/Router.js";

function createAppLayout() {
  const root = document.createElement("div");
  root.innerHTML = `<nav>...</nav><main id="content"></main>`;
  return root;
}

(async () => {
  const app = new cr1bl3({ dev: { wsUrl: "ws://localhost:2702" } });

  const host = document.getElementById("app");
  host.innerHTML = "";
  host.appendChild(createAppLayout());

  app.root = host;
  app.outlet = host.querySelector("#content");

  Router.attach?.(app);
  await Router.loadComponents();
  Router.setupLinkNavigation();
  Router.handlePopState();
  await Router.navigate(window.location.pathname || "/");
})();
```

### 4) Run

- Dev:
  - `cr1bl3 dev --port 2702`
- Build:
  - `cr1bl3 build`

---

## Common errors and what they mean

### “Failed to resolve module specifier '@d0c/...'”
Cause:
- Native ESM in browser does not support bare specifiers without an import map or bundler.

Fix:
- Use `/`, `./`, `../` paths or bundle with esbuild and load `/dist/bundle.js`.

### “Missing <div id='app'>”
Cause:
- The served HTML is not the file you think (wrong public dir, fallback HTML, wrong index served).

Fix:
- Ensure the dev server serves the correct `index.html`
- Use absolute script paths like `/dist/bundle.js`

### 404 for `/index.js`
Cause:
- dev server serves only `public/` but `index.js` is in repo root.

Fix:
- Put browser entry in `public/`, or load `/dist/bundle.js`, or expand server resolution.

---

## Quick glossary

- **Entry**: the first browser JS file esbuild bundles.
- **Bundle**: one JS output containing app + lib code.
- **Outlet**: the DOM node where route content is rendered.
- **SPA fallback**: serving `index.html` for non-file routes like `/about`.

---

## Final vibe check 🍩

- CLI = Node only
- Browser = DOM only
- Build = filesystem only
- Serve = public + dist
- Router + app = outlet-driven rendering
