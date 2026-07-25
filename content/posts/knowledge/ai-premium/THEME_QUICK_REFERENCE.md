# Theme Quick Reference

## CSS Variables (Use in Vue Templates)

### Colors
```css
var(--primary)              /* #bd93f9 - Purple */
var(--secondary)            /* #8be9fd - Cyan */
var(--accent)               /* #50fa7b - Green */
var(--positive)             /* #50fa7b - Success */
var(--negative)             /* #ff5555 - Error */
var(--info)                 /* #8be9fd - Info */
var(--warning)              /* #ffb86c - Warning */
var(--bg)                   /* Background color */
var(--fg)                   /* Foreground/text color */
var(--current-line)         /* Highlight/selection */
var(--comment)              /* Muted text */
```

### Design Tokens
```css
var(--border-radius)        /* 8px */
var(--border-radius-sm)     /* 4px */
var(--border-radius-lg)     /* 12px */
var(--border-radius-full)   /* 9999px */
var(--transition)           /* 0.3s ease */
var(--transition-fast)      /* 0.15s ease */
var(--transition-slow)      /* 0.5s ease */
var(--shadow-1)             /* Subtle shadow */
var(--shadow-2)             /* Light shadow */
var(--shadow-3)             /* Medium shadow */
var(--shadow-4)             /* Strong shadow */
```

### Extended Colors
```css
var(--dracula-cyan)         /* #8be9fd */
var(--dracula-green)        /* #50fa7b */
var(--dracula-orange)       /* #ffb86c */
var(--dracula-pink)         /* #ff79c6 */
var(--dracula-purple)       /* #bd93f9 */
var(--dracula-red)          /* #ff5555 */
var(--dracula-yellow)       /* #f1fa8c */
var(--dracula-gold)         /* #ffd700 */
```

### Transparent Variants (15% opacity)
```css
var(--dracula-cyan-light)       /* rgba(139, 233, 253, 0.15) */
var(--dracula-green-light)      /* rgba(80, 250, 123, 0.15) */
var(--dracula-orange-light)     /* rgba(255, 184, 108, 0.15) */
var(--dracula-pink-light)       /* rgba(255, 121, 198, 0.15) */
var(--dracula-purple-light)     /* rgba(189, 147, 249, 0.15) */
var(--dracula-red-light)        /* rgba(255, 85, 85, 0.15) */
var(--dracula-yellow-light)     /* rgba(241, 250, 140, 0.15) */
```

---

## SCSS Variables (Use in .scss files)

### Colors
```scss
$primary           /* #bd93f9 */
$secondary         /* #8be9fd */
$accent            /* #50fa7b */
$positive          /* #50fa7b */
$negative          /* #ff5555 */
$info              /* #8be9fd */
$warning           /* #ffb86c */
$dark              /* #282a36 */
$light-bg          /* #f5f5f5 (light mode) */
```

### Design Tokens
```scss
$border-radius-base        /* 8px */
$border-radius-sm          /* 4px */
$border-radius-lg          /* 12px */
$border-radius-full        /* 9999px */
$transition-base           /* 0.3s ease */
$transition-fast           /* 0.15s ease */
$transition-slow           /* 0.5s ease */
$shadow-1                  /* 0 1px 5px... */
$shadow-2                  /* 0 2px 8px... */
$shadow-3                  /* 0 3px 12px... */
$shadow-4                  /* 0 4px 16px... */
```

---

## JavaScript (Use in .js files)

```javascript
import { dracula, colorPalette } from '@/quasar-theme'

// Primary colors
dracula.primary          // '#bd93f9'
dracula.secondary        // '#8be9fd'
dracula.accent           // '#50fa7b'

// Status colors
dracula.positive         // '#50fa7b'
dracula.negative         // '#ff5555'
dracula.info             // '#8be9fd'
dracula.warning          // '#ffb86c'

// With opacity variants
colorPalette.primary.base      // '#bd93f9'
colorPalette.primary.light     // 'rgba(189, 147, 249, 0.15)'
colorPalette.primary.lighter   // 'rgba(189, 147, 249, 0.1)'
colorPalette.primary.dark      // '#9d4edd'
```

---

## Common Patterns

### Button
```vue
<button :style="{
  background: 'var(--primary)',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: 'var(--border-radius)',
  transition: 'var(--transition)',
  cursor: 'pointer'
}">
  Click me
</button>
```

### Card
```vue
<div :style="{
  background: 'var(--current-line)',
  color: 'var(--fg)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-2)',
  padding: '16px'
}">
  Card content
</div>
```

### Error Message
```vue
<div v-if="error" :style="{
  background: 'var(--negative)',
  color: 'white',
  padding: '8px 12px',
  borderRadius: 'var(--border-radius)',
  marginBottom: '12px'
}">
  {{ error }}
</div>
```

### Gradient Background
```vue
<div :style="{
  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
  padding: '40px',
  borderRadius: 'var(--border-radius-lg)'
}">
  Content
</div>
```

### Link
```vue
<a :style="{
  color: 'var(--primary)',
  textDecoration: 'none',
  transition: 'var(--transition)',
  cursor: 'pointer'
}"
   @mouseenter="e => e.target.style.color = 'var(--secondary)'"
   @mouseleave="e => e.target.style.color = 'var(--primary)'">
  Link text
</a>
```

### Alert
```vue
<div :style="{
  background: 'var(--info)',
  color: 'white',
  padding: '12px',
  borderRadius: 'var(--border-radius)',
  borderLeft: `4px solid var(--secondary)`
}">
  Information message
</div>
```

---

## Quasar Components (Automatic)

All Quasar components automatically use the theme:

```vue
<!-- Uses --primary automatically -->
<q-btn label="Submit" color="primary" />

<!-- Uses --secondary -->
<q-chip color="secondary">Tag</q-chip>

<!-- Uses --positive -->
<q-icon name="check" color="positive" />
```

---

## Dark/Light Mode

Automatically handled by theme system. No changes needed in components.

When user toggles theme:
```javascript
// Light mode is set via data-theme="light" on HTML
document.documentElement.setAttribute('data-theme', 'light')
document.documentElement.setAttribute('data-theme', 'dark')
```

All CSS variables update automatically.

---

## Adding New Colors

1. Add to `src/quasar-theme.js`:
   ```javascript
   export const dracula = {
     myColor: '#ff00ff',
   }
   ```

2. Use in component:
   ```javascript
   import { dracula } from '@/quasar-theme'
   const color = dracula.myColor
   ```

---

## Tips

✅ Always use CSS variables for colors
✅ Use transition variables for smooth animations
✅ Use shadow variables for depth consistency
✅ Use border-radius variables for consistent corners
✅ Use transparent variants for overlays
✅ Trust the automatic dark/light mode switching
✅ Don't hardcode hex colors - use variables
✅ Check THEME_SYSTEM.md for detailed info
