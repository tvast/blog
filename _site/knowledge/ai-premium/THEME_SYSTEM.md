# Unified Theme System - Quasar Dracula Theme

## Overview

The entire app now uses a **single source of truth** for all colors and design tokens. This ensures consistency across components and makes theme customization simple.

---

## Architecture

```
src/quasar-theme.js (JavaScript - Primary Source)
        ↓
src/quasar-variables.scss (SCSS - For Quasar)
        ↓
src/style.css (CSS Variables - For Vue Components)
        ↓
All Components & Pages
```

---

## 1. JavaScript Theme Source

**File:** `src/quasar-theme.js`

The primary source of truth. Contains:
- Color definitions
- Color palettes with opacity variants
- Shadow definitions
- Spacing scale
- Border radius scale
- Transition durations

**Usage in Components:**
```javascript
import { dracula, colorPalette } from '@/quasar-theme'

export default {
  setup() {
    return {
      primaryColor: dracula.primary,      // #bd93f9
      warningColor: dracula.warning,      // #ffb86c
      successLight: colorPalette.success.light, // rgba with 15% opacity
    }
  }
}
```

---

## 2. SCSS Variables

**File:** `src/quasar-variables.scss`

Mirrors the JavaScript theme. Used by:
- Quasar framework
- Global SCSS files
- Component SCSS

**Usage in SCSS:**
```scss
.button {
  background: $primary;           // #bd93f9
  border-radius: $border-radius-base;  // 8px
  transition: $transition-base;   // 0.3s ease
  box-shadow: $shadow-2;          // 0 2px 8px rgba(...)
}
```

---

## 3. CSS Variables

**File:** `src/style.css`

CSS custom properties for Vue components. Automatically synced with JavaScript theme.

**Usage in Vue Components:**
```vue
<style scoped>
.card {
  background: var(--bg);
  color: var(--fg);
  border: 2px solid var(--primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
}

.success {
  color: var(--positive);
}

.error {
  color: var(--negative);
}
</style>
```

---

## Color Palette

### Primary Colors (Quasar Theme)

| Color | Hex | CSS Variable | Use Case |
|-------|-----|-------------|----------|
| Primary | `#bd93f9` | `--primary` | Main CTA, links, focus states |
| Secondary | `#8be9fd` | `--secondary` | Secondary CTAs, highlights |
| Accent | `#50fa7b` | `--accent` | Success states, positive actions |

### Status Colors

| Status | Hex | CSS Variable | Use Case |
|--------|-----|-------------|----------|
| Positive | `#50fa7b` | `--positive` | Success messages |
| Negative | `#ff5555` | `--negative` | Error messages |
| Info | `#8be9fd` | `--info` | Info messages |
| Warning | `#ffb86c` | `--warning` | Warning messages |

### Extended Colors

| Color | Hex | CSS Variable |
|-------|-----|-------------|
| Orange | `#ffb86c` | `--dracula-orange` |
| Pink | `#ff79c6` | `--dracula-pink` |
| Red | `#ff5555` | `--dracula-red` |
| Yellow | `#f1fa8c` | `--dracula-yellow` |
| Gold | `#ffd700` | `--dracula-gold` |
| Cyan | `#8be9fd` | `--dracula-cyan` |
| Green | `#50fa7b` | `--dracula-green` |
| Purple | `#bd93f9` | `--dracula-purple` |

---

## Dark & Light Modes

### Dark Mode (Default)
```javascript
--bg: #282a36           // Dark background
--fg: #f8f8f2           // Light text
--primary: #bd93f9      // Purple
--secondary: #8be9fd    // Cyan
--accent: #50fa7b       // Green
```

### Light Mode (`[data-theme="light"]`)
```javascript
--bg: #f5f5f5           // Light background
--fg: #1a1a1a           // Dark text
--primary: #7c3aed      // Darker purple
--secondary: #0891b2    // Darker cyan
--accent: #16a34a       // Darker green
```

Colors are automatically darkened in light mode for accessibility and readability.

---

## Usage Examples

### Button Component
```vue
<button 
  :style="{ 
    backgroundColor: 'var(--primary)',
    color: 'var(--fg)',
    borderRadius: 'var(--border-radius)',
    transition: 'var(--transition)'
  }"
>
  Click me
</button>
```

### Card Component
```vue
<div style="
  background: var(--current-line);
  color: var(--fg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-2);
  padding: 16px;
">
  Card content
</div>
```

### Alert/Message
```vue
<div v-if="error" style="
  background: var(--negative);
  color: white;
  padding: 8px 12px;
  border-radius: var(--border-radius);
">
  {{ error }}
</div>
```

### Gradient Background
```vue
<div style="
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--secondary) 100%
  );
  padding: 40px;
">
  Gradient section
</div>
```

---

## Opacity Variants

Pre-calculated transparent color variants:

```css
/* 15% opacity variants */
--dracula-cyan-light: rgba(139, 233, 253, 0.15);
--dracula-purple-light: rgba(189, 147, 249, 0.15);
--dracula-green-light: rgba(80, 250, 123, 0.15);
--dracula-red-light: rgba(255, 85, 85, 0.15);
--dracula-warning-light: rgba(255, 184, 108, 0.15);
```

Usage:
```vue
<div style="background: var(--dracula-primary-light)">
  Light purple background
</div>
```

---

## Shadow System

Four shadow levels for depth hierarchy:

```javascript
$shadow-1: 0 1px 5px rgba(0, 0, 0, 0.2);        // Subtle
$shadow-2: 0 2px 8px rgba(0, 0, 0, 0.15);       // Light cards
$shadow-3: 0 3px 12px rgba(0, 0, 0, 0.1);       // Medium elevation
$shadow-4: 0 4px 16px rgba(0, 0, 0, 0.08);      // Strong emphasis
```

Usage:
```css
.card { box-shadow: var(--shadow-2); }
.modal { box-shadow: var(--shadow-4); }
.subtle { box-shadow: var(--shadow-1); }
```

---

## Border Radius Scale

```javascript
--border-radius-sm: 4px;        // Small: buttons, badges
--border-radius: 8px;           // Default: cards, inputs
--border-radius-lg: 12px;       // Large: sections
--border-radius-full: 9999px;   // Pill: circular buttons
```

---

## Transition Timings

```javascript
--transition-fast: 0.15s ease;  // Hover states, quick feedback
--transition: 0.3s ease;        // Standard animations
--transition-slow: 0.5s ease;   // Entrance animations
```

---

## Customization

### Changing a Color

To change the primary color globally:

1. **JavaScript** (`src/quasar-theme.js`):
   ```javascript
   primary: '#new-color-hex'
   ```

2. **SCSS** (`src/quasar-variables.scss`):
   ```scss
   $primary: #new-color-hex;
   ```

3. **CSS** (`src/style.css`):
   ```css
   --primary: #new-color-hex;
   ```

All instances automatically update across the entire app.

### Adding a New Color

1. Add to `quasar-theme.js`:
   ```javascript
   export const dracula = {
     // ...existing colors
     myBrand: '#my-color',
   }
   ```

2. Add to `quasar-variables.scss`:
   ```scss
   $my-brand: #my-color;
   ```

3. Add to `src/style.css`:
   ```css
   --my-brand: #my-color;
   ```

4. Use in components:
   ```css
   background: var(--my-brand);
   ```

---

## Advantages

✅ **Single Source of Truth** - Colors defined once, used everywhere
✅ **Consistency** - All components use the same colors
✅ **Maintainability** - Change color once, updates everywhere
✅ **Dark/Light Mode** - Automatic theme switching support
✅ **Scalability** - Easy to add new colors or tokens
✅ **Performance** - CSS variables are lightweight
✅ **Framework Integration** - Works with Quasar, Vue, CSS
✅ **Accessibility** - Proper contrast ratios for both modes

---

## File Reference

| File | Purpose | When to Edit |
|------|---------|-------------|
| `quasar-theme.js` | JavaScript object with all design tokens | Adding/changing colors or spacings |
| `quasar-variables.scss` | SCSS variables for Quasar & SCSS files | Only if using advanced SCSS features |
| `style.css` | CSS variables for Vue templates | Never (auto-synced from quasar-theme.js) |

---

## Backward Compatibility

Old variable names still work (for existing components):
```css
--dracula-cyan: var(--secondary);
--primary-color: var(--primary);
--text-dark: var(--fg);
```

This ensures components migrated gradually to the new system.
