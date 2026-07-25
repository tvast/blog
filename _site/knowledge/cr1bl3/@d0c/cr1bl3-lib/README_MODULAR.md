# CR1BL3 v2.0 - Modular TypeScript Framework

A lightweight, **0-dependency** modular framework for building reactive UIs with dynamic component injection via WebSocket.

## Features ✨

- **✅ 0 Dependencies** - Pure vanilla JavaScript/TypeScript, no external packages at runtime
- **✅ Modular Architecture** - Separated concerns (core, reactive, components, WebSocket)
- **✅ TypeScript Support** - Full type definitions (source files in `src/`)
- **✅ Reactive State** - Proxy-based state management with automatic change detection
- **✅ WebSocket Injection** - Dynamic component injection without rebuilds
- **✅ Backward Compatible** - Legacy components still work

## Architecture

```
src/
├── core/
│   ├── cr1bl3.ts     # Main app class
│   └── DOMGateway.ts # Scoped DOM API
├── reactive/
│   └── ReactiveState.ts  # Proxy-based state
├── components/
│   ├── ComponentRegistry.ts
│   └── ComponentLoader.ts
├── ws/
│   ├── WebSocketManager.ts
│   └── ComponentInjector.ts
├── types/
│   ├── component.ts
│   ├── reactive.ts
│   ├── ws.ts
│   └── config.ts
└── index.ts          # Main export
```

## Quick Start

### 1. Basic App Setup

```javascript
import { cr1bl3 } from '@d0c/cr1bl3-lib';

// Create app instance
const app = new cr1bl3({
  colors: { primary: '#007bff' },
  spacing: [0, 4, 8, 16, 32, 64],
  dev: {
    wsUrl: 'ws://localhost:2702',
    hotReload: true,
    reconnect: true
  }
});

// Mount to DOM
app.mount('#root', (app) => {
  const layout = document.createElement('div');
  layout.innerHTML = `
    <header>My App</header>
    <main id="content"></main>
    <footer>© 2026</footer>
  `;
  return layout;
});
```

### 2. Reactive State

```javascript
const state = app.getState();

// Subscribe to changes
state.subscribe({
  onStateChange(key, newValue, oldValue) {
    console.log(`${key}: ${oldValue} → ${newValue}`);
  }
});

// Update state (triggers subscribers)
state.getState().user = { name: 'Alice' };
state.getState().count = 42;
```

### 3. Components

```javascript
// Define a component
function Counter(props) {
  const div = document.createElement('div');
  let count = props?.initialCount || 0;

  const btn = document.createElement('button');
  btn.textContent = `Count: ${count}`;
  btn.onclick = () => {
    count++;
    btn.textContent = `Count: ${count}`;
  };

  div.appendChild(btn);

  return {
    render: () => div,
    destroy: () => console.log('Counter destroyed')
  };
}

// Register component
app.registerComponent('Counter', Counter);

// Load and render
await app.loadAndRender('Counter', { initialCount: 10 });
```

### 4. WebSocket Component Injection

The dev server sends component injection messages via WebSocket:

```json
{
  "type": "inject-component",
  "payload": {
    "name": "DynamicButton",
    "code": "export default function DynamicButton(props) { const btn = document.createElement('button'); btn.textContent = props.text || 'Click me'; return btn; }",
    "version": 1
  }
}
```

The framework automatically:
- Compiles the component code safely (using `Function()`)
- Registers it in the ComponentRegistry
- Makes it available immediately for loading

```javascript
// Component is now available to load (injected from server)
await app.loadAndRender('DynamicButton', { text: 'Hello' });
```

## Class API

### `cr1bl3`

Main application class.

```typescript
// Constructor
const app = new cr1bl3(config?: PartialAppConfig);

// Methods
app.mount(root, layoutFactory?: (app) => HTMLElement): cr1bl3
app.loadAndRender(componentName: string, props?: any): Promise<HTMLElement>
app.registerComponent(name: string, factory: any): void
app.getState(): ReactiveState
app.getRegistry(): ComponentRegistry
app.getDom(): DOMGateway
app.getWebSocketManager(): WebSocketManager | null
app.isMounted(): boolean
app.destroy(): void
```

### `ReactiveState<T>`

Reactive state management with Proxy.

```typescript
const state = new ReactiveState({ count: 0 });

// Subscribe to changes
const unsubscribe = state.subscribe({
  onStateChange(key, newVal, oldVal) { /* ... */ }
});

// Update state
state.getState().count = 5;

// History
state.getHistoricalState(10);
state.snapshot();
state.reset({ count: 0 });
state.clearHistory();
```

### `ComponentRegistry`

Component storage and instantiation.

```typescript
const registry = app.getRegistry();

registry.register('MyComp', componentFactory);
registry.has('MyComp');
registry.list(); // ['MyComp']
registry.instantiate('MyComp', props);
```

### `ComponentLoader`

Lazy loading and auto-loading components.

```typescript
const loader = app.getComponentLoader();

// Load by name (auto-imports from ./components/{name}.js)
await loader.loadComponent('HomePage');

// Preload multiple
await loader.preloadMultiple(['Page1', 'Page2', 'Page3']);
```

### `WebSocketManager`

Bi-directional WebSocket for hot reload and component injection.

```typescript
const ws = app.getWebSocketManager();

ws.send({ type: 'ping' });
ws.isReady(); // boolean
ws.disconnect();
```

### `ComponentInjector`

Safely compiles and injects components from code strings.

```typescript
const injector = app.getComponentInjector();

const componentCode = `export default function MyComp() { return document.createElement('div'); }`;
await injector.injectComponent('MyComp', componentCode, 1);

injector.hasComponent('MyComp');
injector.clearCache();
```

### `DOMGateway`

App-scoped DOM access (no global pollution).

```typescript
const dom = app.getDom();

dom.create('div');
dom.byId('content');
dom.query('.item');
dom.appendToRoot(el);
dom.injectStyle('body { color: red; }');
```

## Configuration

```typescript
interface AppConfig {
  colors: { primary, secondary, success, danger };
  spacing: number[]; // px values for utility classes
  components: any[];
  dev: {
    wsUrl: string;        // ws://localhost:2702
    hotReload: boolean;   // true
    reconnect: boolean;   // true
    reconnectMaxDelayMs: number; // 5000
  };
  initialState?: Record<string, any>;
}
```

## TypeScript Support

The source files in `src/` are written in **TypeScript** for type safety.

```typescript
// src/types/component.ts
export interface IComponent {
  render(): HTMLElement | Promise<HTMLElement>;
  destroy?(): void | Promise<void>;
}
```

To generate `.d.ts` files:

```bash
cd @d0c/cr1bl3-lib
tsc --emitDeclarationOnly
```

## WebSocket Protocol

### Messages from Server

```json
{
  "type": "reload",
  "payload": null
}
```

```json
{
  "type": "inject-component",
  "payload": {
    "name": "MyComponent",
    "code": "export default function MyComponent() { ... }",
    "version": 1
  }
}
```

### Messages from Client

```json
{
  "type": "component-ready",
  "payload": { "name": "MyComponent" }
}
```

```json
{
  "type": "pong"
}
```

## Utility Classes

Auto-generated margin/padding classes based on `spacing` config:

```css
.m-0, .m-4, .m-8, .m-16, .m-32, .m-64     /* margin */
.mt-0, .mt-4, .mt-8                        /* margin-top */
.mb-0, .mb-4, .mb-8                        /* margin-bottom */
/* similar for: .ml-*, .mr-*, .p-*, .pt-*, .pb-*, .pl-*, .pr-* */
```

## Component Lifecycle

```javascript
export default function MyComponent(props) {
  // Initialize
  const el = document.createElement('div');

  return {
    // Render phase (called when app.loadAndRender() is invoked)
    render() {
      return el;
    },

    // Cleanup phase (called on destroy or navigation)
    destroy() {
      // Remove event listeners, cleanup resources
      console.log('Component destroyed');
    }
  };
}
```

## Migration from v1.x

### Old API (Still Works)

```javascript
import { cr1bl3 } from '@d0c/cr1bl3-lib/legacy';
```

### New API

```javascript
import { cr1bl3 } from '@d0c/cr1bl3-lib';
```

Both import paths work - the new API is the recommended approach.

## Development Workflow

1. **Start dev server:**
   ```bash
   yarn dev
   ```

2. **Components hot-reload** via WebSocket

3. **Inject components at runtime:**
   - Dev server sends `inject-component` messages
   - Components available immediately (no rebuild)

4. **Full reload on demand:**
   - Server sends `reload` message
   - Browser page reloads

## Build & Bundle

The framework uses **esbuild** for bundling. All dependencies are optional/peer:

```bash
yarn build
```

Outputs to `dist/` with tree-shaking and minification.

## Performance

- **~15KB minified** (core framework)
- **0 external dependencies** at runtime
- **Instant component injection** via WebSocket
- **Efficient re-renders** via Proxy-based reactivity

## License

MIT

---

**Need help?** Check the examples in `components/` or open an issue on GitHub.
