# Project Architecture & Structure

**Version**: 2.0 (Post-Refactoring) | **Last Updated**: April 2026

---

## 📁 Folder Structure

### Root Level
```
/
├── docs/                    # Documentation (you are here)
├── public/                  # Static assets (images, videos, fonts)
├── src/                     # Source code
├── package.json             # Dependencies and scripts
├── vite.config.js          # Build configuration
├── index.html              # Entry HTML
└── README.md               # Project overview
```

### Source Code (`/src`)
```
src/
├── components/             # Vue components (organized by type)
├── styles/                 # Global styles and SCSS mixins
├── locales/                # Internationalization (i18n)
├── assets/                 # Project data and configurations
├── App.vue                 # Root component
├── main.js                 # Application entry point
├── style.css               # Global CSS variables
├── i18n.js                 # i18n setup
├── quasar-theme.js         # Theme configuration
├── quasar-variables.scss   # SCSS variables and mixin imports
└── vite-env.d.ts          # TypeScript definitions
```

### Components (`/src/components`)

**New organized structure**:

```
components/
├── layout/                 # Structural layout components
│   ├── Header.vue         # Fixed header with logo
│   ├── Footer.vue         # Footer wrapper
│   └── ...                # Future layout components
│
├── sections/              # Page content blocks/sections
│   ├── SplashScreen.vue  # Initial splash screen
│   ├── Landing.vue       # Landing/intro section
│   ├── Hero.vue          # Hero section with avatar
│   ├── About.vue         # About/skills section
│   ├── Contact.vue       # Contact section
│   ├── Timeline.vue      # Experience timeline
│   ├── Portfolio.vue     # Featured projects showcase
│   └── Advantages.vue    # Benefits/advantages list
│
├── ui/                    # Reusable UI components
│   ├── buttons/          # Button components
│   │   ├── BrandButton.vue      # Custom styled button
│   │   ├── LiquidCTA.vue        # Animated liquid button
│   │   └── FloatingActionButton.vue # FAB menu
│   │
│   ├── navigation/       # Navigation components
│   │   └── LanguageSwitcher.vue # Language toggle
│   │
│   ├── branding/         # Brand components
│   │   └── BrandLogo.vue        # Logo component
│   │
│   └── ...               # Future forms/, inputs/, modals/
│
├── animations/           # Animation & effect components
│   ├── AnimatedWave.vue # Wave animation effects
│   ├── heroParticles.vue # Particle system for hero
│   └── ...              # Future animation effects
│
├── loading/              # Loading & skeleton components
│   └── ProjectSkeleton.vue # Masonry skeleton loader
│
├── footer/               # Footer sub-components
│   ├── FooterCopyright.vue # Copyright info
│   ├── FooterLegalLinks.vue # Legal navigation
│   └── FooterFishAnimation.vue # Decorative animation
│
└── legal/                # Policy & legal pages
    ├── PrivacyPolicy.vue
    ├── CookiePolicy.vue
    ├── TermsOfService.vue
    ├── MentionsLegales.vue
    └── License.vue
```

---

## 🧩 Component Types

### Layout Components
**Location**: `/src/components/layout/`  
**Purpose**: Structural components that wrap page content

Examples:
- `Header.vue` - Fixed navigation header with logo
- `Footer.vue` - Footer layout and content
- `Sidebar.vue` - (future) Side navigation

**Usage in App.vue**:
```vue
<template>
  <Header />
  <main><!-- page sections --></main>
  <Footer />
</template>
```

### Section Components
**Location**: `/src/components/sections/`  
**Purpose**: Full-page or major content sections

Examples:
- `Hero.vue` - Hero section with heading and CTA
- `Portfolio.vue` - Project showcase/gallery
- `Contact.vue` - Contact form and information

**Characteristics**:
- Typically full width or max-width contained
- Often use `@mixin sectionPadding()`
- May contain sub-components from `/ui`
- Have their own styling and responsive design

### UI Components
**Location**: `/src/components/ui/`  
**Purpose**: Reusable, atomic UI components

**Subfolders**:
- `buttons/` - Button variations
- `navigation/` - Nav elements
- `branding/` - Brand/logo components
- `forms/` - (future) Form inputs
- `inputs/` - (future) Input fields
- `modals/` - (future) Modal dialogs

**Characteristics**:
- Small, focused, single responsibility
- Accept props for configuration
- Emit events for user interactions
- Reusable across multiple sections
- Often wrap Quasar components

### Animation Components
**Location**: `/src/components/animations/`  
**Purpose**: Animation and visual effect components

Examples:
- `AnimatedWave.vue` - Reusable wave effect
- `heroParticles.vue` - Particle system

**Characteristics**:
- Might have canvas or SVG elements
- Use animation mixins
- Can be expensive (render optimization)
- Often decorative/non-critical

### Loading Components
**Location**: `/src/components/loading/`  
**Purpose**: Loading states and skeleton screens

Examples:
- `ProjectSkeleton.vue` - Masonry grid skeleton

**Usage**: Show while async data loads

---

## 📊 Component Dependency Map

```
App.vue
├── Header (layout)
│   └── BrandLogo (ui/branding)
│
├── SplashScreen (sections)
│   └── BrandLogo (ui/branding)
│
├── Landing (sections)
│   └── AnimatedWave (animations)
│
├── Hero (sections)
│   ├── BrandLogo (ui/branding)
│   ├── LanguageSwitcher (ui/navigation)
│   └── heroParticles (animations)
│
├── About (sections)
│   └── (uses Quasar components)
│
├── Timeline (sections)
│   └── (uses Quasar components)
│
├── Portfolio (sections)
│   ├── ProjectSkeleton (loading)
│   └── (uses Quasar components)
│
├── Contact (sections)
│   └── LiquidCTA (ui/buttons)
│
├── Footer (layout)
│   ├── FooterCopyright (footer)
│   ├── FooterLegalLinks (footer)
│   └── FooterFishAnimation (footer)
│
└── FloatingActionButton (ui/buttons)
```

---

## 🎯 Naming Conventions

### Component Names
- **PascalCase**: `MyComponent.vue`
- **Descriptive**: `ProjectCard.vue` not `Card.vue`
- **Avoid generic**: `Container`, `Wrapper` (too vague)

### Files & Folders
- **kebab-case**: `my-folder/`, `my-file.js`
- **Except components**: PascalCase (Vue convention)

### CSS Classes
- **BEM when complex**: `.block__element--modifier`
- **kebab-case**: `.my-class`
- **Scope**: Use `<style scoped>` always

### Props & Events
- **Props**: camelCase, descriptive (`isLoading`, `itemCount`)
- **Events**: kebab-case verbs (`@item-selected`, `@form-submitted`)

---

## 🔄 Data Flow

### Global State Management
Currently using **Composition API with composables**:

```js
// useTheme.js
export function useTheme() {
  const isDark = ref(false)
  const toggleTheme = () => { /* ... */ }
  return { isDark, toggleTheme }
}

// In components:
import { useTheme } from '@/composables/useTheme'
const { isDark, toggleTheme } = useTheme()
```

### i18n (Translations)
```js
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
// Usage: {{ t('hero.title') }}
```

### Quasar Integration
```js
import { QBtn, QCard, QIcon } from 'quasar'
// Selective imports for tree-shaking
```

---

## 📦 Build & Distribution

### Development
```bash
npm install    # Install dependencies
npm run dev    # Start dev server on http://localhost:5173
```

### Production
```bash
npm run build   # Build for production
npm run preview # Preview production build locally
```

### Build Output
- `/dist` folder contains:
  - `index.html` - Entry point
  - `assets/` - Bundled JavaScript, CSS
  - Static files copied from `/public`

---

## 🎨 Styling Architecture

### Three-Layer System

**1. JavaScript (Source of Truth)**
```js
// src/quasar-theme.js
export const dracula = {
  primary: '#bd93f9',
  // ...
}
```

**2. SCSS Variables**
```scss
// src/quasar-variables.scss
$primary: #bd93f9;
@import './styles/mixins';
```

**3. CSS Variables** (Runtime)
```css
/* src/style.css */
:root {
  --primary: #bd93f9;
  --shadow-1: 0 2px 8px rgba(0,0,0,0.15);
}
```

### Using in Components

**SCSS**:
```vue
<style scoped lang="scss">
.myElement {
  @include gradientBg(135deg, $primary, $secondary);
  @include hoverElevateGlow(3px, $cyan);
}
</style>
```

**CSS Variables**:
```vue
<style scoped>
.myElement {
  color: var(--primary);
  box-shadow: var(--shadow-2);
}
</style>
```

---

## 🌐 Internationalization

### Language Files
```
src/locales/
├── en.json    # English translations
└── fr.json    # French translations
```

### Structure
```json
{
  "hero": {
    "title": "Théophile Vast",
    "subtitle": "Digital Dreamer & Code Poet"
  }
}
```

### Usage
```vue
{{ $t('hero.title') }}  <!-- In templates -->
{{ t('hero.title') }}   <!-- In JavaScript (with useI18n) -->
```

---

## ✨ Key Principles

### 1. Semantic Organization
- Components grouped by **purpose**, not just type
- Clear mental model for finding components
- Folders represent feature areas

### 2. Component Isolation
- Each component has single responsibility
- Props for input, events for output
- Minimal external dependencies

### 3. DRY (Don't Repeat Yourself)
- Styles: Use SCSS mixins
- Logic: Use composables
- Templates: Extract sub-components

### 4. Performance
- Selective Quasar imports (tree-shaking)
- Lazy load routes/components
- Optimize images and assets

### 5. Maintainability
- Clear naming conventions
- Consistent code style
- Well-documented patterns

---

## 📝 Adding New Features

### Adding a New Page Section
1. Create file in `/src/components/sections/MySection.vue`
2. Add imports of needed UI components
3. Use `@mixin sectionPadding()` for spacing
4. Add i18n translations to `/src/locales/`
5. Import and add to `App.vue`

### Adding a New UI Component
1. Create folder in `/src/components/ui/my-type/`
2. Create `MyComponent.vue`
3. Define props, events, slots
4. Use Quasar components when possible
5. Document with JSDoc comments

### Adding Animations
1. Add to `/src/styles/mixins.scss` if reusable
2. Or create component in `/src/components/animations/`
3. Use `@keyframes` or canvas/SVG
4. Document animation timing

---

## 🔗 Related Documentation

- **[STYLING.md](./STYLING.md)** - SCSS mixins and styling patterns
- **[COMPONENTS.md](./COMPONENTS.md)** - Component patterns and conventions
- **[QUASAR.md](./QUASAR.md)** - Quasar component usage
- **[MIGRATION.md](./MIGRATION.md)** - Details of this restructuring

---

**Last Updated**: April 2026
