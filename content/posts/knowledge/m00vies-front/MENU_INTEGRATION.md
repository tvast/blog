# 🎬 Menu Integration Guide

## New Routes Added

### 1️⃣ Mock Backend Demo
**Path:** `/demo/mock-data`

**Icon:** `mock_location` 📍
**Tone:** Warning (orange)
**Group:** Secondary menu

**What it does:**
- Run the full stepper without any backend API
- Auto-progressing mock jobs
- Browser console tools for testing
- Perfect for UI testing & development

**Access:**
- Click menu button (top-right corner)
- Select "Mock Backend Demo"
- Or navigate directly: `/demo/mock-data`

**Console commands available:**
```javascript
__MOOVIES_MOCK_DEV__.testFlow()        // Auto-progress job
__MOOVIES_MOCK_DEV__.setJobStatus(...) // Manual status control
__MOOVIES_MOCK_DEV__.logJobs()         // View all mock jobs
```

---

### 2️⃣ Parallax Stepper Demo
**Path:** `/demo/parallax-stepper`

**Icon:** `auto_awesome` ✨
**Tone:** Success (green)
**Group:** Secondary menu

**What it does:**
- Compare 3 versions of the stepper
- Original (no parallax)
- Parallax V1 (advanced multi-layer)
- Parallax V2 (optimized recommended)
- Test mouse tracking & mobile tilt
- Side-by-side comparison table

**Access:**
- Click menu button (top-right corner)
- Select "Parallax Stepper Demo"
- Or navigate directly: `/demo/parallax-stepper`

**Features:**
- Click cards to switch between versions
- Move mouse to see parallax effect
- View comparison table
- Performance tips included

---

## Menu Structure

```
Menu (⌘K / Ctrl+K)
├─ Primary Group
│  ├── marketing
│  ├── gallery
│  ├── reel
│  └── launch
│
├─ Secondary Group (NEW)
│  ├── home
│  ├── Mock Backend Demo        ← NEW 🎬
│  └── Parallax Stepper Demo    ← NEW ✨
│
└─ Utility Group
   └── (internal routes)
```

---

## Files Changed

### Router Configuration
- **`src/router/routes.ts`**
  - Added lazy imports for demo views
  - Added 2 new routes to `childRoutes` array
  - Configured menu metadata

### New View Components
- **`src/views/DemoMockDataView.vue`** (170 lines)
  - Mock backend demo interface
  - Quick start guide
  - Console tools documentation

- **`src/views/DemoParallaxStepperView.vue`** (280 lines)
  - Version selector
  - Live stepper demos (x3)
  - Comparison table
  - Feature tips

---

## How It Works

### 1. Menu System
The app uses a **MenuLauncher** component that reads from `launcherMenuRoutes`:

```
MenuLauncher.vue
  ↓
reads launcherMenuRoutes
  ↓
from catalog.ts
  ↓
derived from routes.ts
  ↓
All inMenu=true routes show up
```

### 2. Route Registration Flow
```
routes.ts (childRoutes)
  ↓
catalog.ts (routeRegistry)
  ↓
MenuLauncher (launcherMenuRoutes)
  ↓
Menu UI renders available routes
```

### 3. Navigation
When user clicks a menu item:
1. `MenuLauncher.goTo(path)` called
2. Router navigates to `/demo/mock-data` or `/demo/parallax-stepper`
3. Corresponding view component renders
4. URL updates

---

## Keyboard Shortcut

Open menu anytime with: **⌘K** (Mac) or **Ctrl+K** (Windows/Linux)

Shows all available routes with:
- Active badge on current route
- Tone indicator (color dot)
- Description & availability status
- One-click navigation

---

## Configuration Details

### Mock Backend Demo Route
```typescript
route('demo/mock-data', DemoMockDataView, {
  label: 'Mock Backend Demo',           // Menu text
  description: 'Test stepper...',       // Menu description
  icon: 'mock_location',                // Material icon
  tone: 'warning',                      // Orange color
  group: 'secondary',                   // Menu group
  inMenu: true,                         // Show in menu
  menuPath: '/demo/mock-data',          // Navigation path
  funnelStage: 'activate',              // Funnel stage
  entryIntent: 'launch',                // User intent
  redirectKind: 'none',                 // No redirect
})
```

### Parallax Stepper Demo Route
```typescript
route('demo/parallax-stepper', DemoParallaxStepperView, {
  label: 'Parallax Stepper Demo',       // Menu text
  description: 'Test 3D parallax...',   // Menu description
  icon: 'auto_awesome',                 // Sparkles icon
  tone: 'success',                      // Green color
  group: 'secondary',                   // Menu group
  inMenu: true,                         // Show in menu
  menuPath: '/demo/parallax-stepper',   // Navigation path
  funnelStage: 'activate',              // Funnel stage
  entryIntent: 'launch',                // User intent
  redirectKind: 'none',                 // No redirect
})
```

---

## Testing the Integration

### 1. Verify Routes Exist
```bash
# Visit directly in browser:
http://localhost:5173/demo/mock-data
http://localhost:5173/demo/parallax-stepper
```

### 2. Check Menu
```bash
# Open menu with keyboard shortcut:
⌘K (Mac) or Ctrl+K (Windows/Linux)

# Should see both demo routes listed
# With warning (orange) and success (green) badges
```

### 3. Test Navigation
```bash
# Click menu items
# Verify page changes
# URL updates correctly
# Page loads smoothly
```

### 4. Test Mock Data
```bash
# On /demo/mock-data page
# Press F12 to open console
# Type: __MOOVIES_MOCK_DEV__.testFlow()
# Watch job auto-progress
```

### 5. Test Parallax
```bash
# On /demo/parallax-stepper page
# Click version selector cards
# Move mouse across stepper
# On mobile: tilt device (if V2 selected)
```

---

## Customization

### Change Menu Text
Edit in `routes.ts`:
```typescript
label: 'Custom Label',        // What shows in menu
description: 'Custom desc',   // Hover text
```

### Change Icon
Edit in `routes.ts`:
```typescript
icon: 'different_icon',  // Any Material Design icon
```

### Change Color
Edit in `routes.ts`:
```typescript
tone: 'primary' | 'success' | 'warning',
```

### Hide from Menu
Edit in `routes.ts`:
```typescript
inMenu: false,  // Won't show in menu
```

---

## Advanced: Menu Groups

Available groups:
- **`primary`** — Main navigation (marketing, gallery, launch)
- **`secondary`** — Secondary features (home, demos)
- **`utility`** — Internal/utility routes (hidden by default)

Change grouping:
```typescript
group: 'primary',  // Move to main menu section
```

---

## Browser Compatibility

✅ All modern browsers
✅ Desktop & mobile
✅ Keyboard navigation
✅ Touch-friendly

**Keyboard Shortcut:**
- Mac: ⌘K
- Windows/Linux: Ctrl+K

---

## Performance Notes

- Routes lazy-loaded (bundle size not affected)
- Views render on-demand
- Menu is pre-computed at startup
- No API calls to fetch menu

---

## Related Documentation

- **Mock Data:** See `MOCK_DATA_GUIDE.md`
- **Parallax:** See `PARALLAX_STEPPER_GUIDE.md`
- **Implementation:** See `IMPLEMENTATION_SUMMARY.md`

---

**Status:** ✅ Ready to use
**Last Updated:** April 2, 2026
**Maintainer:** Claude Code
