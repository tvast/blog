# Navigation System Guide

## Overview

The new navigation system uses **Quasar's native layout components** with the **Tokyo Night theme** for a professional, responsive experience across all devices.

## Architecture

```
AppLayout.vue (Root)
├── q-header
│   ├── q-toolbar (Logo + Actions)
│   └── q-tabs (Fullwidth Navigation Overlay)
├── q-drawer (Desktop Sidebar)
├── q-page-container (Content Area)
└── q-page-sticky (Mobile FAB - Optional)
```

## Components

### Header (q-header)
- **Logo**: Icon + branding text
- **Language Switcher**: Top right
- **Settings**: Top right
- **User Menu**: Top right dropdown

### Tabs Overlay (q-tabs)
- **Full width** navigation tabs
- **Icon + label** display
- **Active color**: Tokyo Night blue (#7aa2f7)
- **Responsive**: Adapts to screen size

### Desktop Drawer (q-drawer)
- **280px width**
- **Visible on**: Desktop (1024px+)
- **Contains**:
  - Navigation items with descriptions
  - Quick stats (notes, passports)
  - Logout button
  - Active item indicators

### Mobile Experience
- **FAB Button**: Floating action button for menu
- **Popup Menu**: Quick access to navigation
- **Tabs**: Always visible at top

## Navigation Items

| Icon | Label | Description | Route |
|------|-------|-------------|-------|
| `apps` | Dashboard | Main dashboard | `/` |
| `edit_note` | Notes | Create & manage | `/notes` |
| `badge` | Passports | Digital profiles | `/passport` |
| `shopping_cart` | Payments | Manage payments | `/payments` |
| `location_on` | Map | Explore world | `/map` |

## Tokyo Night Colors

```
Primary:   #7aa2f7 (Blue)
Secondary: #bb9af7 (Purple)
Accent:    #ff9e64 (Orange)
Positive:  #9ece6a (Green)
Negative:  #f7768e (Red)
Info:      #7dcfff (Cyan)
Warning:   #e0af68 (Yellow)
Dark BG:   #16161e
```

## Usage in App.vue

```vue
<template>
  <AppLayout />
</template>

<script setup>
import AppLayout from '@/components/AppLayout.vue'
</script>
```

## Responsive Breakpoints

| Screen | Display | Feature |
|--------|---------|---------|
| **Mobile** (<768px) | Tabs + FAB | Quick navigation |
| **Tablet** (768-1023px) | Tabs + Content | Full navigation |
| **Desktop** (1024px+) | Sidebar + Tabs + Content | Full experience |

## Features

✅ **Fullwidth Tabs**: Spans entire header width
✅ **Desktop Sidebar**: Rich navigation with descriptions
✅ **Mobile FAB**: Floating menu button
✅ **Active Indicators**: Clear visual feedback
✅ **Smooth Transitions**: Fade animation on page change
✅ **Language Support**: i18n integrated
✅ **Tokyo Night Theme**: Professional dark theme
✅ **Responsive Design**: Works on all devices
✅ **Router Integration**: Automatic route sync
✅ **Quick Stats**: Dashboard preview in sidebar

## Styling

All colors use **CSS variables** for easy customization:

```css
--color-bg: #1a1b26
--color-bg-dark: #16161e
--color-fg: #c0caf5
--color-blue: #7aa2f7
/* ... etc */
```

## Customization

### Change Colors
Edit `AppLayout.vue` CSS variables:

```css
:root {
  --color-blue: #your-color;
}
```

### Add Navigation Item
Edit `navItems` array in `AppLayout.vue`:

```typescript
const navItems = [
  // ... existing items
  {
    id: 'newpage',
    icon: 'new_icon',
    label: 'New Page',
    description: 'Description',
    route: '/newpage'
  }
]
```

### Hide Drawer on Desktop
Change q-drawer breakpoint:

```vue
<q-drawer breakpoint="1200">
```

## Performance

- ✅ Lazy routing with `router-view`
- ✅ Transition animations for smooth UX
- ✅ Native Quasar components (optimized)
- ✅ CSS variables (no runtime overhead)
- ✅ Minimal bundle size

## Accessibility

- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Color contrast
- ✅ Semantic HTML

## File Structure

```
src/
├── components/
│   ├── AppLayout.vue (Main layout)
│   ├── LanguageSwitcher.vue
│   └── ... other components
├── config/
│   └── tokyoNightTheme.ts
└── App.vue (Uses AppLayout)
```

## Next Steps

1. Add content pages for each route
2. Update stats dynamically
3. Add breadcrumb navigation
4. Implement user profile page
5. Add theme customization UI

---

**Status**: ✅ Production Ready
**Theme**: 🌙 Tokyo Night
**Layout**: 📱 Fully Responsive
