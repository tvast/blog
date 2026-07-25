# 🎯 Fullscreen Overlay Menu

A modern, keyboard-navigable fullscreen menu that displays all available routes in a beautiful grid layout with looping navigation.

## ✨ Features

### Visual Design
- **Dark theme** with glassmorphism effect
- **Grid layout** (1 col mobile, 2 col tablet, 3 col desktop)
- **Animated transitions** with smooth scaling
- **Active item highlighting** with cyan accent color
- **Background grid pattern** for depth

### Interaction
- **Mouse click** - Select and navigate to any route
- **Keyboard navigation**:
  - `←` `→` `↑` `↓` - Navigate between items (loops)
  - `Enter` - Select current item
  - `Esc` - Close menu
  - `Cmd+K` / `Ctrl+K` - Toggle menu (global shortcut)

### Loop & Navigation
- Routes loop infinitely in both directions
- Active item is highlighted and scaled up
- Current position shown as "N / Total"
- Visual indicators for keyboard shortcuts

## 🏗️ Architecture

### Files Created

1. **`src/stores/useOverlayStore.ts`**
   - Pinia store managing overlay state
   - `isOpen` - Menu visibility
   - `activeIndex` - Currently selected route
   - `totalItems` - Total number of routes
   - Methods: `toggle()`, `open()`, `close()`, `nextItem()`, `prevItem()`

2. **`src/components/ui/FullscreenOverlayMenu.vue`**
   - Fullscreen overlay component
   - Displays routes in grid
   - Handles keyboard & mouse interactions
   - Auto-scales based on active selection

3. **`src/layouts/MainLayout.vue`** (updated)
   - Integrated overlay component
   - Added toggle button in header (dashboard icon)
   - Added global Cmd+K / Ctrl+K shortcut
   - Added keyboard event listeners

## 🚀 Usage

### Open the Menu

**Option 1: Click button**
```
Click the dashboard icon (⊞) in the header
```

**Option 2: Keyboard shortcut**
```
Press Cmd+K (Mac) or Ctrl+K (Windows/Linux)
```

### Navigate

```
Arrow keys (←→↑↓) to loop through routes
Enter to select
Esc to close
```

### Close

```
Press Esc
Click the × button
Click outside the menu
```

## 📋 Route Display

The menu displays all routes from `launcherMenuRoutes` which includes:

- **Home** (🏠)
- **Marketing** (📊)
- **Gallery** (🎬)
- **Reel** (🎞️)
- **Launch** (🚀)
- **Poems** (📖)
- **Scenarios** (🎭)
- **Profile** (👤)
- **Demo routes** (🧪, ✨)

Each route card shows:
- Icon & label
- Description
- Route path
- Group/category

## 🎨 Customization

### Add Custom Routes

Edit `src/router/routes.ts` and add `inMenu: true` to any route you want displayed:

```typescript
route('mypage', MyPageComponent, {
  label: 'my page',
  description: 'My custom page',
  icon: 'my_icon',
  inMenu: true,  // ← Required
  group: 'primary',
  // ... other meta
})
```

### Change Colors

Edit `FullscreenOverlayMenu.vue` styles:

```vue
<!-- Active state -->
<div :class="[
  index === activeIndex
    ? 'border-cyan-500 bg-cyan-500/10'  // ← Change these
    : 'border-gray-700 bg-gray-900/50'
]">
```

### Adjust Grid Columns

```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 col (mobile), 2 cols (tablet), 3 cols (desktop) -->
</div>
```

Change to `lg:grid-cols-4` for 4-column layout on large screens.

### Custom Keyboard Shortcuts

Edit `MainLayout.vue`:

```typescript
const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {  // ← Change 'k'
    e.preventDefault();
    toggleOverlay();
  }
};
```

## 🔄 State Management

### Store Actions

```typescript
import { useOverlayStore } from '@/stores/useOverlayStore'

const overlay = useOverlayStore()

// Toggle menu
overlay.toggle()

// Open menu
overlay.open()

// Close menu
overlay.close()

// Navigate
overlay.nextItem()
overlay.prevItem()

// Set active
overlay.setActive(index)
```

### Reactive Properties

```vue
<script setup>
import { computed } from 'vue'
import { useOverlayStore } from '@/stores/useOverlayStore'

const overlay = useOverlayStore()

// Use in component
const isMenuOpen = computed(() => overlay.isOpen)
const currentIndex = computed(() => overlay.activeIndex)
</script>
```

## 🎯 Integration Points

### In MainLayout
- Header button shows menu toggle
- Global keyboard listener for Cmd+K
- Overlay mounted at layout level (via Teleport)

### In Router
- Uses `launcherMenuRoutes` from `src/router/catalog.ts`
- Navigates via `router.push(path)`
- Automatically closes after navigation

### In Stores
- Pinia store for state persistence
- Accessible from any component
- Reactive to route changes

## 📱 Responsive Design

### Mobile (< 600px)
- 1 column grid
- Full padding
- Touch-friendly buttons

### Tablet (600px - 1024px)
- 2 column grid
- Medium padding

### Desktop (> 1024px)
- 3 column grid
- Spacious layout
- Keyboard hint visible

## 🔌 Advanced Usage

### Programmatic Control

```vue
<script setup>
import { useOverlayStore } from '@/stores/useOverlayStore'

const overlay = useOverlayStore()

// Open menu when user clicks something
const handleClick = () => {
  overlay.open()
}

// Close after selection
const handleSelect = (route) => {
  overlay.close()
  router.push(route.path)
}
</script>
```

### Custom Navigation Logic

```typescript
// Extend the store with custom methods
const overlay = useOverlayStore()

// Navigate to first item
overlay.setActive(0)

// Navigate to specific route
const myRoute = displayRoutes.find(r => r.path === '/gallery')
const index = displayRoutes.indexOf(myRoute)
overlay.setActive(index)
```

### Keyboard Customization

Add more shortcuts in `MainLayout.vue`:

```typescript
const handleGlobalKeydown = (e: KeyboardEvent) => {
  // Cmd+K to toggle overlay
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    toggleOverlay()
  }

  // Cmd+J for quick search (example)
  if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
    e.preventDefault()
    overlay.open()
  }
}
```

## 🎬 Demo

The fullscreen overlay is now available on all pages. Try:

1. Click the dashboard icon (⊞) in the top header
2. Or press `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
3. Use arrow keys to navigate
4. Press Enter or click to select
5. Press Esc to close

---

**Status:** ✅ Ready to use
**Integration:** Automatic in MainLayout
**Keyboard Shortcut:** Cmd+K / Ctrl+K
**Navigation:** Arrow keys + Enter
**Close:** Esc or click button/outside
