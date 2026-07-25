# Quasar Integration Guide - Lightweight Setup

This project uses **Quasar Framework** with a lightweight configuration. Components and styling are imported directly to keep bundle size minimal.

✅ **Setup Complete** - Dev server running with Quasar!

## What's Included

### Quasar CSS & Components
- Direct CSS import from `quasar/dist/quasar.css`
- All components available for use without plugin configuration
- Tree-shaking automatically removes unused styles

### Available Components
Components can be used directly in your templates. Common lightweight components:

#### Essential UI Components
```vue
<!-- Buttons -->
<q-btn label="Click me" color="primary" />
<q-btn icon="close" round flat />

<!-- Form Inputs -->
<q-input v-model="name" label="Name" outlined />
<q-select v-model="option" :options="options" />
<q-checkbox v-model="agree" label="I agree" />

<!-- Spinners & Progress -->
<q-spinner color="primary" />
<q-linear-progress :value="progress" />
<q-circular-progress :value="progress" />

<!-- Cards & Containers -->
<q-card class="my-card">
  <q-card-section>
    Card content
  </q-card-section>
</q-card>

<!-- Menus & Dropdowns -->
<q-menu>
  <q-list>
    <q-item>Option 1</q-item>
    <q-item>Option 2</q-item>
  </q-list>
</q-menu>

<!-- Dialogs & Modals -->
<q-dialog v-model="showDialog">
  <q-card>
    <q-card-section>Dialog content</q-card-section>
  </q-card>
</q-dialog>

<!-- Typography -->
<q-banner class="bg-blue">
  Important announcement
</q-banner>

<!-- Separators -->
<q-separator />
```

## Using Quasar Components Directly

Simply use `<q-` prefixed components in your templates:

```vue
<!-- Buttons -->
<q-btn label="Click me" color="primary" @click="handleClick" />
<q-btn icon="close" round flat />

<!-- Inputs -->
<q-input v-model="text" label="Enter text" outlined dense />
<q-select v-model="selected" :options="options" />

<!-- Dialogs & Cards -->
<q-dialog v-model="showDialog">
  <q-card>Content</q-card>
</q-dialog>

<!-- Icons -->
<q-icon name="expand_more" size="lg" />
```

## Dark Mode Control

Use the custom `useTheme()` composable:

```javascript
import { useTheme } from '@/composables/useTheme'

export default {
  setup() {
    const { isDark, toggleTheme } = useTheme()

    return { isDark, toggleTheme }
  }
}
```

This syncs with your custom theme system and `data-theme` attribute on the HTML element.

## Tailoring for Lightweight Bundle

To keep the bundle lightweight, follow these practices:

### ✅ DO
- Import only components you use
- Use `q-` prefixed components
- Leverage Quasar plugins instead of installing extra packages
- Use Quasar icons (`q-icon` with Material Icons)

### ❌ DON'T
- Don't import unnecessary Quasar plugins
- Avoid using multiple UI frameworks together
- Don't use Quasar full theme if only using specific components

## CSS Customization

Customize Quasar theme variables in `src/quasar-variables.scss`:

```scss
$primary: #bd93f9;
$secondary: #8be9fd;
$accent: #50fa7b;
$dark: #282a36;
```

## Current Weight Impact

- **Quasar Core**: ~30KB gzipped (with tree-shaking)
- **Plugins Loaded**: Dark + Notify + Dialog (~5KB)
- **Total Additional**: ~35KB gzipped

This is minimal compared to alternative UI frameworks for the functionality gained.

## Next Steps

1. Replace hard-coded buttons with `<q-btn>`
2. Add `<q-notify>` for user feedback in forms
3. Use `<q-dialog>` for confirmations
4. Leverage `<q-card>` for better structured layouts
5. Add `<q-input>` for better form handling

## Resources

- [Quasar Docs](https://quasar.dev)
- [Component Library](https://quasar.dev/vue-components)
- [Dark Mode Guide](https://quasar.dev/features/dark)
