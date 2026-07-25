# CR1BL3 TypeScript Guide

## 100% TypeScript Friendly

All CR1BL3 core modules are written in **pure TypeScript** with:
- ✅ Full type safety
- ✅ JSDoc comments for all public APIs
- ✅ Interface-based design
- ✅ Zero `any` types in core
- ✅ Strict mode enabled

## Getting Started with TypeScript

### Installation

```bash
# TypeScript already installed as devDependency
npm install -D typescript
# or
yarn add -D typescript
```

### Type Checking

```bash
# Check types without compiling
tsc --noEmit

# Watch mode
tsc --watch

# Generate declaration files
tsc --emitDeclarationOnly
```

## Project Structure

```
src/
├── types/index.ts          # All type definitions
├── core/
│   ├── cr1bl3.ts          # Main app class
│   └── DOMGateway.ts      # DOM operations
├── reactive/
│   └── ReactiveState.ts   # State management
├── components/
│   ├── ComponentRegistry.ts
│   └── ComponentLoader.ts
├── ws/
│   ├── WebSocketManager.ts
│   └── ComponentInjector.ts
└── index.ts               # Main export
```

## Type Definitions

### Core Types

```typescript
import type { cr1bl3, AppConfig, IComponent } from '@d0c/cr1bl3-lib';

const config: AppConfig = {
  colors: { primary: '#007bff' },
  spacing: [0, 4, 8, 16, 32],
  dev: { wsUrl: 'ws://localhost:2702' }
};

const app = new cr1bl3(config);
```

### Component Types

```typescript
import type { IComponent, ComponentFactory, ComponentProps } from '@d0c/cr1bl3-lib';

interface MyComponentProps extends ComponentProps {
  title: string;
  onClick?: (value: string) => void;
}

class MyComponent implements IComponent {
  constructor(private props?: MyComponentProps) {}

  render(): HTMLElement {
    const div = document.createElement('div');
    div.textContent = this.props?.title || 'Hello';
    return div;
  }

  destroy(): void {
    console.log('Cleanup');
  }
}

export default function createMyComponent(
  props?: MyComponentProps
): IComponent {
  return new MyComponent(props);
}
```

### State Types

```typescript
import { ReactiveState } from '@d0c/cr1bl3-lib';
import type { Observer, StateChangeEvent } from '@d0c/cr1bl3-lib';

interface AppState {
  count: number;
  user: { name: string; email: string };
  loading: boolean;
}

const state = new ReactiveState<AppState>({
  count: 0,
  user: { name: '', email: '' },
  loading: false
});

const observer: Observer<AppState> = {
  onStateChange(key, newValue, oldValue) {
    console.log(`${key} changed:`, { oldValue, newValue });
  }
};

state.subscribe(observer);

// Type-safe state updates
state.getState().count = 5;
state.getState().user.name = 'John';
```

### WebSocket Types

```typescript
import type { WSMessage, ComponentInjectionPayload } from '@d0c/cr1bl3-lib';

const injectMessage: WSMessage = {
  type: 'inject-component',
  payload: {
    name: 'DynamicComp',
    code: 'export default function() { ... }',
    version: 1
  } as ComponentInjectionPayload
};
```

## Best Practices

### 1. Component Class with Types

```typescript
import type { IComponent, ComponentProps } from '@d0c/cr1bl3-lib';

interface ButtonProps extends ComponentProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export class Button implements IComponent {
  private button: HTMLButtonElement | null = null;

  constructor(private props: ButtonProps = { label: 'Click' }) {}

  render(): HTMLElement {
    this.button = document.createElement('button');
    this.button.textContent = this.props.label;
    this.button.disabled = this.props.disabled || false;
    this.button.onclick = () => this.props.onClick?.();
    return this.button;
  }

  destroy(): void {
    if (this.button) {
      this.button.onclick = null;
    }
  }
}
```

### 2. Reactive Component with State

```typescript
import { ReactiveState } from '@d0c/cr1bl3-lib';
import type { IComponent, Observer } from '@d0c/cr1bl3-lib';

export class CounterComponent implements IComponent {
  private element: HTMLDivElement | null = null;
  private unsubscribe: (() => void) | null = null;

  constructor(private state: ReactiveState<{ count: number }>) {}

  render(): HTMLElement {
    this.element = document.createElement('div');

    const observer: Observer = {
      onStateChange: (key) => {
        if (key === 'count') {
          this.updateDisplay();
        }
      }
    };

    this.unsubscribe = this.state.subscribe(observer);
    this.updateDisplay();
    return this.element;
  }

  private updateDisplay(): void {
    if (this.element) {
      this.element.textContent = `Count: ${this.state.getState().count}`;
    }
  }

  destroy(): void {
    this.unsubscribe?.();
  }
}
```

### 3. Type-Safe Component Factory

```typescript
import type { ComponentFactory } from '@d0c/cr1bl3-lib';

interface DialogProps {
  title: string;
  content: string;
  onClose?: () => void;
}

const createDialog: ComponentFactory<DialogProps> = (props) => {
  return {
    render() {
      const div = document.createElement('div');
      div.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 20px;">
          <h2>${props?.title || 'Dialog'}</h2>
          <p>${props?.content || ''}</p>
          <button onclick="close()">Close</button>
        </div>
      `;
      return div;
    },
    destroy() {
      console.log('Dialog closed');
      props?.onClose?.();
    }
  };
};

app.registerComponent('Dialog', createDialog);
```

### 4. App with Full Typing

```typescript
import { cr1bl3 } from '@d0c/cr1bl3-lib';
import type { PartialAppConfig } from '@d0c/cr1bl3-lib';

const appConfig: PartialAppConfig = {
  colors: {
    primary: '#1976d2',
    secondary: '#f50057',
    success: '#4caf50',
    danger: '#f44336'
  },
  spacing: [0, 4, 8, 16, 32, 64, 128],
  dev: {
    wsUrl: 'ws://localhost:2702',
    hotReload: true,
    reconnect: true,
    reconnectMaxDelayMs: 10000
  },
  initialState: {
    user: null,
    loading: false,
    error: null
  }
};

const app = new cr1bl3(appConfig);

app.mount('#root', (app) => {
  const layout = document.createElement('div');
  layout.innerHTML = '<div id="content"></div>';
  return layout;
});

// Type-safe operations
const state = app.getState();
const registry = app.getRegistry();
const loader = app.getComponentLoader();
```

## Type Inference

CR1BL3 TypeScript types are designed for maximum inference:

```typescript
// No explicit types needed - inferred from app config
const state = app.getState();
state.getState().myField = 'value'; // ✅ Works

// Component types inferred from factory
app.registerComponent('MyComp', (props) => {
  // props type inferred
  return { render: () => document.createElement('div') };
});

// Loader types inferred
const comp = await app.getComponentLoader().loadComponent('MyComp', {
  // props type inferred
});
```

## Strict Mode Configuration

The `tsconfig.json` enables:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true
  }
}
```

This ensures:
- ✅ No implicit `any`
- ✅ All variables used
- ✅ All code paths return
- ✅ All cases handled in switches

## IDE Support

TypeScript gives you:
- ✅ IntelliSense on all APIs
- ✅ Type checking on hover
- ✅ Refactoring support
- ✅ Auto-completion
- ✅ Go to definition

## Migration from JavaScript

### Step 1: Rename files

```bash
mv src/myComponent.js src/myComponent.ts
```

### Step 2: Add types

```typescript
// Before (JS)
export default function MyComp(props) {
  return { render: () => div };
}

// After (TS)
import type { IComponent, ComponentProps } from '@d0c/cr1bl3-lib';

interface MyCompProps extends ComponentProps {
  title: string;
}

export default function MyComp(props?: MyCompProps): IComponent {
  return { render: () => div };
}
```

### Step 3: Run type check

```bash
tsc --noEmit
```

## Resources

- `/src/types/index.ts` - All type definitions
- `/src/core/cr1bl3.ts` - App class (see JSDoc)
- `/src/components/ExampleComponent.ts` - Full example
- `/README_MODULAR.md` - Feature overview

---

**CR1BL3 is 100% TypeScript friendly - enjoy type safety! 🎉**
