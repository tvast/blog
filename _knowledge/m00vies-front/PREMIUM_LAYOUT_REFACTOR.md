# Premium Layout Refactor — Moovies UI

**Clean, modern, & sophisticated — Built with glassmorphism, micro-interactions, and premium feels**

---

## 🎨 Design Principles

### 1. **Glassmorphism**
- Header: `backdrop-filter: blur(20px)` with semi-transparent background
- Page content: Subtle frosted glass effect
- Modern, elegant, & sophisticated

### 2. **Micro-Interactions**
- Smooth cubic-bezier transitions: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- All interactive elements have 200-240ms transitions
- Hover states with copper accent color

### 3. **Spacing & Hierarchy**
- 28px padding in content areas
- 12px gaps in toolbars
- Consistent vertical rhythm throughout

### 4. **Premium Color Palette**
```css
--tools-bg: #050505              /* Pure black background */
--tools-text: #f3f1ed            /* Warm off-white text */
--tools-copper: #a86f48          /* Primary copper accent */
--tools-copper-soft: #c3875d     /* Lighter copper for hovers */
--tools-border: rgba(..., 0.08)  /* Subtle borders */
```

---

## 📐 Header Layout

```
┌─────────────────────────────────────────────────────────────┐
│  📽️ Logo    Marquee Strip (Desktop)    🔍 ⊕ 🔔 🛒         │
└─────────────────────────────────────────────────────────────┘
```

### Components

#### **Left Section**
- **Brand Logo Button**: Premium rounded pill shape with hover effect
- Navigates to home on click
- Opacity transition on hover

#### **Center Section**
- **Marquee Strip**: Horizontal scrolling announcement ticker
- Desktop only (hidden on mobile)
- Flexible width with flex: 1

#### **Right Section** (`tools-actions`)
- **Command Menu Button** — Cmd+K to open
  - Pure icon button
  - Elegant tooltip with keyboard shortcut
  - Premium animation on overlay

- **Apps Dropdown** (Desktop only)
  - Icon: `apps`
  - Lists all hero routes
  - Dropdown menu with smooth animations
  - Hidden on mobile (too cramped)

- **Notifications Button**
  - Floating badge with count
  - Tooltip: "Notifications"
  - Badge auto-positions with floating

- **Cart Button** (CartNotif component)
  - Shows cart icon + badge
  - Opens merch drawer

---

## 🎯 Key Features

### Command Menu Button
```vue
<CommandMenuButton />
```

**What it does:**
- ✅ Cmd+K (Mac) / Ctrl+K (Windows) to open
- ✅ Real-time search filtering
- ✅ 6 categorized commands
- ✅ Premium overlay with glassmorphism
- ✅ Keyboard navigation support

**Animations:**
- Overlay fade-in: 300ms
- Panel scale + translate: 400ms
- Smooth item hover effects

### Apps Dropdown
```vue
<q-btn-dropdown
  flat dense round icon="apps"
  class="tools-icon-btn"
  dropdown-icon="none"
>
  <!-- Hero routes listed -->
</q-btn-dropdown>
```

**Benefits:**
- Space-efficient navigation
- Only shows on desktop (viewport > 600px)
- Fast access to key tools
- Premium styling with hover effects

### Workspace Launcher (Right Drawer)
- Smooth slide-in from right
- Search + filter tools
- Active route highlighting
- Auto-close on route click

---

## 🎨 Color System

### Text Colors
```css
--tools-text: #f3f1ed          /* Primary text (headings, labels) */
--tools-text-soft: #b9b1a7     /* Secondary text (subtle) */
--tools-text-muted: #8e857c    /* Tertiary text (very subtle) */
```

### Background Layers
```css
--tools-bg: #050505            /* Base background */
--tools-surface: rgba(21, 21, 23, 0.92)    /* Cards */
--tools-surface-2: rgba(31, 31, 34, 0.95)  /* Hover cards */
--tools-surface-3: #2a2a2d                 /* Accent surfaces */
```

### Copper Accent (Call-to-Action)
```css
--tools-copper: #a86f48        /* Standard copper */
--tools-copper-soft: #c3875d   /* Lighter for hovers */
```

---

## 🖼️ Spacing Scheme

```
Header Height:        64px
Toolbar Padding:      12px horizontal
Card Padding:         28px (desktop) / 16px (mobile)
Gutter Between Items: 12px (toolbar) / 8px (icons)
Page Padding:         24px (desktop) / 12px (mobile)
Border Radius:        28px (content) / 12-14px (small elements)
```

---

## ⚡ Transition & Animation Library

### Cubic-Bezier Easing
```css
/* Premium spring feel */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Used for: */
- Button hovers
- Panel opens
- Color transitions
- Scale transforms
```

### Transition Durations
```css
200ms  - UI state changes (hover, active)
240ms  - Component-level interactions
300ms  - Overlay/modal fades
400ms  - Full panel animations
```

---

## 📱 Responsive Breakpoints

### Desktop (≥ 1024px)
- ✅ Marquee strip visible
- ✅ Apps dropdown visible
- ✅ All navigation options available
- ✅ Full 28px padding

### Tablet (600-1023px)
- ✅ Marquee strip visible
- ❌ Apps dropdown hidden
- ✅ Core navigation visible
- ✅ 20px padding

### Mobile (< 600px)
- ❌ Marquee strip hidden
- ❌ Apps dropdown hidden
- ✅ Essential icons only
- ✅ 12px padding
- ✅ Compact toolbar

---

## 🔧 Component Composition

```
MainLayout.vue
├── Header (q-header)
│   └── Toolbar (q-toolbar)
│       ├── Brand Logo Button
│       ├── Marquee Strip (hidden-sm)
│       ├── q-space (flexible spacer)
│       └── Tools Actions
│           ├── CommandMenuButton
│           ├── Apps Dropdown (hidden-sm)
│           ├── Notifications Button
│           └── CartNotif
├── Drawer (q-drawer - right side)
│   └── Workspace Launcher
├── Page Container
│   └── Router View (actual page content)
└── MerchDrawer (side drawer)
```

---

## 🎬 Animation Examples

### Button Hover
```css
transition: all 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);

background: rgba(195, 135, 93, 0.08);
color: var(--tools-text);
```
→ **Result**: Smooth color + background shift with spring easing

### Command Menu Open
```
1. Overlay fade-in: 300ms opacity
2. Backdrop blur: 0px → 8px
3. Panel scale: 0.92 → 1.0
4. Panel translate: -20px → 0px
```
→ **Result**: Premium entrance animation that feels responsive

### Workspace Drawer
```css
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateX(100%);  /* Initially off-screen */
```
→ **Result**: Smooth slide-in from right when opened

---

## 💎 Premium Styling Details

### 1. **Glassmorphism Header**
```css
background: linear-gradient(
  180deg,
  rgba(10, 10, 11, 0.92) 0%,
  rgba(5, 5, 5, 0.88) 100%
);
backdrop-filter: blur(20px);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
```
→ Frosted glass effect with subtle shadow

### 2. **Content Cards**
```css
background: linear-gradient(
  180deg,
  rgba(20, 20, 22, 0.8) 0%,
  rgba(14, 14, 16, 0.72) 100%
);
border: 1px solid var(--tools-border);
box-shadow:
  0 18px 42px rgba(0, 0, 0, 0.24),
  inset 0 1px 0 rgba(255, 255, 255, 0.02);
backdrop-filter: blur(8px);
```
→ Layered gradients with inset highlight

### 3. **Subtle Borders**
```css
border: 1px solid rgba(243, 241, 237, 0.08);  /* Very subtle */
border-color: rgba(195, 135, 93, 0.18);       /* On hover */
```
→ Minimal visual weight, increases on interaction

### 4. **Tooltips**
```css
background: rgba(31, 31, 31, 0.96) !important;
border: 1px solid rgba(195, 135, 93, 0.16);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
```
→ Sophisticated popovers with proper depth

---

## 📊 Performance Optimizations

- **CSS-only animations**: Uses `transform` & `opacity` (GPU-accelerated)
- **No JS animations**: Quasar/CSS handles all transitions
- **Lazy-loaded components**: Drawers only render when opened
- **Minimal repaints**: Backdrop-filter on GPU
- **Bundle impact**: ~2KB (just CSS, no new JS dependencies)

---

## 🚀 Implementation Checklist

- ✅ CommandMenuButton component created
- ✅ MainLayout refactored with premium styling
- ✅ Glassmorphism effects implemented
- ✅ Micro-interactions added
- ✅ Responsive design tested
- ✅ Color palette applied throughout
- ✅ Animation curves refined
- ✅ Documentation complete

---

## 🔄 Future Enhancements

### Phase 2: Advanced Features
1. **Theme Switcher**
   - Light/Dark mode toggle
   - Custom color palette selection
   - Persistent preference storage

2. **User Profile Menu**
   - Avatar dropdown with settings
   - Quick actions (logout, preferences)
   - Account information

3. **Advanced Search**
   - Global search with Cmd+/
   - Fuzzy matching on routes
   - Recent searches history

4. **Notifications Center**
   - Detailed notification list
   - Grouping by category
   - Mark as read/unread

5. **Analytics Bar**
   - Real-time metrics
   - Current project status
   - Quick stats display

---

## 📚 References

- **Design System**: Dracula theme + Custom copper accents
- **Inspiration**: Modern SaaS apps (Linear, Vercel, Framer)
- **Framework**: Quasar Framework + Vue 3 Composition API
- **Animation**: Custom cubic-bezier curves for premium feel

---

**Status**: ✅ Production Ready
**Last Updated**: 2026-03-20
**Version**: 1.0

