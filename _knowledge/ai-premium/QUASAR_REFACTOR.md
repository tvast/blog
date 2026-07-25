# Quasar Component Refactoring Guide

## Overview

All major components have been refactored to use Quasar components with **selective imports** for better maintainability and reduced bundle size.

**Key Principle:** Only import what you need - not global imports.

---

## Refactored Components

### 1. **FloatingActionButton.vue** ✅
**Changes:** 
- Replaced `<button>` with `<q-btn>`
- Uses Quasar Material Icons
- Selective imports: `QBtn`

**Before:**
```html
<button class="fab-main" @click="toggleMenu">
  <span>⚙️</span>
</button>
```

**After:**
```html
<q-btn
  round
  flat
  icon="settings"
  size="lg"
  @click="toggleMenu"
/>
```

**Imports:**
```javascript
import { QBtn } from 'quasar'
```

---

### 2. **Contact.vue** ✅
**Changes:**
- Replaced `<a>` tags with `<q-btn type="a">`
- Uses Quasar color props (`color="primary"`)
- Selective imports: `QBtn`

**Before:**
```html
<a href="..." class="btn btn-large">
  Download Resume
</a>
```

**After:**
```html
<q-btn
  label="Download Resume"
  href="..."
  type="a"
  color="primary"
  size="lg"
  unelevated
/>
```

**Imports:**
```javascript
import { QBtn } from 'quasar'
```

---

### 3. **Hero.vue** ✅
**Changes:**
- CTA buttons now use `<q-btn>`
- Integrated with Quasar theme colors
- Selective imports: `QBtn`

**Usage:**
```html
<q-btn
  label="View My Work"
  href="#portfolio"
  color="primary"
  size="lg"
/>
```

---

### 4. **Landing.vue** ✅
**Changes:**
- Scroll indicator uses `<q-icon>`
- Replaces material-icons with Quasar icon system
- Selective imports: `QIcon`

**Before:**
```html
<svg>...</svg>
```

**After:**
```html
<q-icon
  name="expand_more"
  size="xl"
  color="primary"
/>
```

---

### 5. **FeaturedProjects.vue** (Masonry) ✅✅✅
**Major Refactor:**
- Replaced custom card divs with `<q-card>`
- Lightbox now uses `<q-dialog>`
- Images use `<q-img>` with lazy loading
- Navigation buttons use `<q-btn>`
- Selective imports: `QCard`, `QCardSection`, `QImg`, `QBtn`, `QDialog`

**Before:**
```html
<div class="item" @click="openLightbox">
  <img :src="item.screenshot" />
  <p>{{ item.title }}</p>
</div>
<div class="lightbox" v-if="lightboxVisible">
  <!-- complex custom lightbox -->
</div>
```

**After:**
```html
<q-card class="item" clickable @click="openLightbox">
  <q-img :src="item.screenshot" loading="lazy" />
  <q-card-section>{{ item.title }}</q-card-section>
</q-card>

<q-dialog v-model="lightboxVisible">
  <q-card class="lightbox-card">
    <!-- q-btn, q-img, q-card-section -->
  </q-card>
</q-dialog>
```

**Imports:**
```javascript
import { QCard, QCardSection, QImg, QBtn, QDialog } from 'quasar'
```

---

### 6. **About.vue** ✅
**Changes:**
- Skill cards now use `<q-card>`
- Icons use `<q-icon>` with color props
- Selective imports: `QCard`, `QCardSection`, `QIcon`

**Before:**
```html
<div class="skill-card">
  <div class="skill-icon">
    <span class="material-icons">web</span>
  </div>
  <h3>Title</h3>
</div>
```

**After:**
```html
<q-card class="skill-card">
  <q-card-section class="skill-icon-section">
    <q-icon name="web" size="3rem" color="primary" />
  </q-card-section>
  <q-card-section>
    <h3>Title</h3>
  </q-card-section>
</q-card>
```

---

## Selective Imports Pattern

### ❌ DON'T - Global Import
```javascript
import Quasar from 'quasar'
// or
app.use(Quasar)
```

### ✅ DO - Selective Import
```javascript
import { QBtn, QCard, QIcon } from 'quasar'
```

**Benefits:**
- 🎯 Smaller bundle size (tree-shaking works)
- 📦 Only load what you use
- 🔍 Clear dependencies
- ⚡ Better performance

---

## Quasar Components Used

| Component | Files | Purpose |
|-----------|-------|---------|
| `QBtn` | Hero, Contact, FeaturedProjects, FloatingActionButton | Buttons with built-in styling |
| `QIcon` | Landing, About, FloatingActionButton | Material Icons |
| `QCard` | FeaturedProjects, About | Containers with built-in styling |
| `QCardSection` | FeaturedProjects, About | Card content sections |
| `QImg` | FeaturedProjects | Optimized image with lazy loading |
| `QDialog` | FeaturedProjects | Modal/lightbox |
| `QSkeleton` | ProjectSkeleton | Placeholder while loading |

---

## Using Theme Colors with Quasar

### Color Props
All Quasar components support color props:

```html
<!-- Uses --primary from theme -->
<q-btn color="primary" label="Submit" />

<!-- Uses --secondary -->
<q-icon name="settings" color="secondary" />

<!-- Uses --accent -->
<q-btn color="accent" label="Success" />
```

### CSS Variables (for styling)
```vue
<style scoped>
.my-element {
  color: var(--primary);
  background: var(--current-line);
  box-shadow: var(--shadow-2);
}
</style>
```

---

## Adding Selective Imports to New Components

When creating a new component that needs Quasar:

```javascript
<script setup>
import { QBtn, QCard, QIcon } from 'quasar'
// Only import what you actually use!
</script>
```

**DO NOT:**
```javascript
import * as Quasar from 'quasar'
// or use global Quasar
```

---

## Component Props

### QBtn Common Props
```html
<!-- Appearance -->
<q-btn
  label="Click me"
  color="primary"
  size="lg"
  icon="check"
  round
  flat
  unelevated
/>

<!-- Interaction -->
<q-btn
  type="a"
  href="/page"
  target="_blank"
  @click="handleClick"
/>
```

### QIcon Common Props
```html
<q-icon
  name="settings"
  size="lg"
  color="primary"
  class="custom-class"
/>
```

### QCard Common Props
```html
<q-card
  flat
  bordered
  clickable
  @click="handleClick"
>
  <q-card-section>Content</q-card-section>
</q-card>
```

### QDialog Common Props
```html
<q-dialog v-model="isOpen" full-width full-height>
  <q-card>Content</q-card>
</q-dialog>
```

---

## Styling Quasar Components

### Using Theme Variables
```vue
<style scoped>
.my-card {
  background: var(--current-line);
  border: 1px solid var(--dracula-purple-light);
  color: var(--fg);
  box-shadow: var(--shadow-2);
}

.my-card:hover {
  background: var(--selection);
  box-shadow: var(--shadow-3);
}
</style>
```

### Overriding Quasar Styles
```vue
<style scoped>
.q-btn {
  border-radius: var(--border-radius-lg);
  transition: var(--transition);
}

.q-card {
  border-color: var(--dracula-purple-light);
}
</style>
```

---

## Migration Checklist

When refactoring a component:

- [ ] Replace HTML elements with Quasar components
- [ ] Add selective imports (not global)
- [ ] Update props to use Quasar API
- [ ] Replace hardcoded colors with theme colors
- [ ] Update CSS to use CSS variables
- [ ] Test responsiveness
- [ ] Verify dark/light mode works
- [ ] Check bundle size impact

---

## Benefits of This Approach

✅ **Better Maintainability**
- Consistent component API
- Less custom CSS needed
- Easier to update styling globally

✅ **Smaller Bundle**
- Tree-shaking removes unused components
- Selective imports only

✅ **Better UX**
- Consistent interactions
- Built-in accessibility
- Responsive by default

✅ **Easier to Theme**
- Color props work automatically
- Theme changes propagate instantly
- Dark mode built-in

✅ **Better Performance**
- Optimized components
- Built-in lazy loading
- Efficient rendering

---

## Next Steps

1. **Continue migrating remaining components:**
   - Portfolio.vue
   - Timeline.vue
   - Other utility components

2. **Standardize patterns:**
   - All buttons → `<q-btn>`
   - All cards → `<q-card>`
   - All icons → `<q-icon>`

3. **Remove custom styles:**
   - Buttons don't need custom `.btn` classes
   - Cards don't need custom `.card` classes

4. **Maintain selectivity:**
   - Always selective imports
   - Never global Quasar imports

---

## Resources

- [Quasar Components](https://quasar.dev/vue-components)
- [Quasar Colors](https://quasar.dev/style/color)
- [Quasar Theming](https://quasar.dev/style/theme-builder)
- [Theme System](./THEME_SYSTEM.md)
- [Quick Reference](./THEME_QUICK_REFERENCE.md)
