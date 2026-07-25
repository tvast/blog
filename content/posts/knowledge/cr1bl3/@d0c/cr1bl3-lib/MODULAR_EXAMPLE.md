# CR1BL3 Modular Architecture - Complete Example

## Example: Todo App with Dynamic Components

### 1. Initialize App with Reactive State

```javascript
import { cr1bl3 } from '@d0c/cr1bl3-lib';

// Create app with initial state
const app = new cr1bl3({
  initialState: {
    todos: [],
    filter: 'all',
    loading: false
  },
  spacing: [0, 4, 8, 16, 32]
});

// Mount to DOM with layout
app.mount('#app', (app) => {
  const layout = document.createElement('div');
  layout.className = 'm-16';
  layout.innerHTML = `
    <header class="mb-32">
      <h1>📝 Todo App</h1>
    </header>
    <main id="content" class="p-16"></main>
    <footer class="mt-32">
      Built with CR1BL3 • Powered by Reactive State
    </footer>
  `;
  return layout;
});
```

### 2. Define Modular Components

**TodoForm.js**
```javascript
export default function TodoForm(props) {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  input.placeholder = 'Add a todo...';
  input.type = 'text';
  button.textContent = 'Add';
  button.type = 'submit';

  form.appendChild(input);
  form.appendChild(button);

  form.onsubmit = (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      // Trigger action in parent
      props?.onAdd?.(input.value);
      input.value = '';
    }
  };

  return {
    render: () => form,
    destroy: () => {
      form.onsubmit = null;
    }
  };
}
```

**TodoList.js**
```javascript
export default function TodoList(props) {
  const ul = document.createElement('ul');
  const todos = props?.todos || [];

  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'p-8 mb-4';
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="ml-8" data-index="${idx}">✕</button>
    `;
    
    li.querySelector('button').onclick = () => {
      props?.onRemove?.(idx);
    };

    ul.appendChild(li);
  });

  return {
    render: () => ul,
    destroy: () => console.log('TodoList destroyed')
  };
}
```

### 3. Use Reactive State & Components

```javascript
// Reference reactive state
const state = app.getState();

// Subscribe to state changes
state.subscribe({
  onStateChange(key, newVal, oldVal) {
    console.log(`State updated: ${key}`, { oldVal, newVal });
    
    if (key === 'todos') {
      renderTodos();
    }
  }
});

// Render initial components
async function initialize() {
  // Load TodoForm component
  await app.loadAndRender('TodoForm', {
    onAdd: (text) => {
      // Update state (triggers subscriber)
      const todos = state.getState().todos;
      todos.push({ text, done: false });
      state.getState().todos = [...todos]; // Trigger change detection
    }
  });

  // Load initial TodoList
  await renderTodos();
}

async function renderTodos() {
  const outlet = app.getOutlet();
  if (!outlet) return;

  // Clear and re-render
  const listContainer = outlet.querySelector('[data-todos-list]');
  if (listContainer) {
    listContainer.remove();
  }

  const container = document.createElement('div');
  container.setAttribute('data-todos-list', '');

  await app.loadAndRender('TodoList', {
    todos: state.getState().todos,
    onRemove: (idx) => {
      const todos = state.getState().todos;
      todos.splice(idx, 1);
      state.getState().todos = [...todos]; // Trigger change detection
    }
  });
}

// Start app
initialize();
```

### 4. WebSocket Component Injection (Dev Server)

When running the dev server, you can inject components dynamically:

```javascript
// Dev server sends this message via WebSocket
const injectMessage = {
  type: 'inject-component',
  payload: {
    name: 'TodoStats',
    code: `
      export default function TodoStats(props) {
        const div = document.createElement('div');
        const todos = props?.todos || [];
        const completed = todos.filter(t => t.done).length;
        div.innerHTML = \`
          <p>Total: \${todos.length} | Done: \${completed}</p>
        \`;
        return { render: () => div };
      }
    `,
    version: 1
  }
};

// Framework automatically:
// 1. Compiles the code safely
// 2. Registers in ComponentRegistry
// 3. Makes available for loading

// Now you can use it immediately:
await app.loadAndRender('TodoStats', {
  todos: state.getState().todos
});
```

### 5. Advanced: Custom Observers

```javascript
// Create custom observer for specific state changes
const todoObserver = {
  onStateChange(key, newVal, oldVal) {
    if (key === 'todos' && newVal.length > oldVal.length) {
      console.log(`✅ New todo added!`);
      // Play sound, show notification, etc.
    }
  }
};

const unsubscribe = state.subscribe(todoObserver);

// Later: unsubscribe from updates
unsubscribe();
```

### 6. Component Lifecycle

```javascript
// Components have render/destroy lifecycle
const component = {
  render() {
    const el = document.createElement('div');
    
    // Setup event listeners
    el.addEventListener('click', this.handleClick);
    
    return el;
  },
  
  destroy() {
    // Cleanup before removal
    this.el?.removeEventListener('click', this.handleClick);
    console.log('Component cleaned up');
  },
  
  handleClick() { /* ... */ }
};

app.registerComponent('CustomComp', () => component);
```

### 7. State History & Snapshots

```javascript
const state = app.getState();

// Take snapshot
const snapshot = state.snapshot();
console.log('State at this moment:', snapshot);

// Get change history
const recent = state.getHistoricalState(5);
console.log('Last 5 changes:', recent);

// Reset to specific state
state.reset({ todos: [], filter: 'all' });

// Clear history
state.clearHistory();
```

### 8. Programmatic WebSocket Control

```javascript
const ws = app.getWebSocketManager();

// Send custom message to dev server
ws.send({
  type: 'custom-event',
  payload: {
    event: 'todo-added',
    todoCount: state.getState().todos.length
  }
});

// Check connection status
if (ws.isReady()) {
  console.log('Connected to dev server');
}

// Disconnect gracefully
ws.disconnect();
```

## Architecture Diagrams

### Data Flow

```
┌─────────────────────────────────────────┐
│         User Interaction                │
│    (click, input, etc.)                 │
└────────────────┬────────────────────────┘
                 │
                 ▼
       ┌─────────────────────┐
       │  Component Handler  │
       │  (onClick, etc.)    │
       └─────────────────────┘
                 │
                 ▼
       ┌──────────────────────────────┐
       │  Update ReactiveState        │
       │  state.getState().x = value  │
       └──────────────┬───────────────┘
                      │
                      ▼
       ┌──────────────────────────────┐
       │  Proxy detects change        │
       │  Notifies Observers          │
       └──────────────┬───────────────┘
                      │
                      ▼
       ┌──────────────────────────────┐
       │  Observer.onStateChange()    │
       │  Re-render components        │
       └──────────────────────────────┘
```

### Module Dependencies

```
┌──────────────────────────────────────────────┐
│                   cr1bl3                     │
│         (Main App Class - v2.0)              │
└────────────┬─────────────────────────────────┘
             │
    ┌────────┼────────┬──────────┬──────────┐
    │        │        │          │          │
    ▼        ▼        ▼          ▼          ▼
┌────────┐┌──────┐┌─────────┐┌───────┐┌────────┐
│  DOM   ││React.││Component││WebSock││Config │
│Gateway ││State ││Registry ││Manager││       │
└────────┘└──────┘└─────────┘└───────┘└────────┘
    │        │        │          │
    └────────┼────────┴──────────┘
             │
    ┌────────▼──────────────────┐
    │  Browser APIs (native)    │
    │  - Proxy                  │
    │  - WebSocket              │
    │  - Function()             │
    │  - DOM APIs               │
    └───────────────────────────┘
```

## Performance Characteristics

| Metric | Value |
|--------|-------|
| **Bundle Size** | ~15KB minified |
| **Runtime Dependencies** | 0 |
| **State Change Detection** | O(1) |
| **Component Injection** | < 10ms |
| **Memory per Observer** | ~100 bytes |
| **Max Cached Components** | Configurable |
| **WebSocket Reconnect** | Exponential backoff |

## Best Practices

1. **State Design**
   ```javascript
   // Good: normalized, flat structure
   { todos: [], filter: 'all', userId: '123' }
   
   // Avoid: deeply nested
   { user: { profile: { settings: { theme } } } }
   ```

2. **Component Composition**
   ```javascript
   // Break into small, focused components
   <TodoApp>
     <TodoForm />
     <TodoList>
       <TodoItem />
     </TodoList>
     <TodoStats />
   </TodoApp>
   ```

3. **Reactive Subscriptions**
   ```javascript
   // Only subscribe to specific state keys you care about
   state.subscribe({
     onStateChange(key, newVal, oldVal) {
       if (key === 'todos') {
         // Only handle todo changes
         renderTodos();
       }
     }
   });
   ```

4. **Component Cleanup**
   ```javascript
   // Always implement destroy() for cleanup
   destroy() {
     this.el?.removeEventListener('...', this.handler);
     this.timer && clearInterval(this.timer);
     console.log('Cleanup done');
   }
   ```

5. **WebSocket Resilience**
   ```javascript
   // Framework handles reconnection automatically
   // Config controls retry behavior
   const app = new cr1bl3({
     dev: {
       reconnect: true,
       reconnectMaxDelayMs: 10000
     }
   });
   ```

---

This example demonstrates the full power of the modular cr1bl3 architecture:
- **Reactive** state with Proxy observation
- **Modular** component system
- **Dynamic** WebSocket injection
- **Zero** runtime dependencies
- **Type-safe** with TypeScript sources

Start building! 🚀
