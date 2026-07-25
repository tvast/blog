# BrandLogo Component Guide

A reusable, configurable logo component that consolidates all logo styling and animation across the application.

## Location

`src/components/ui/branding/BrandLogo.vue`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | String | **required** | Image source path |
| `alt` | String | `"Brand Logo"` | Alt text for accessibility |
| `size` | String | `"md"` | Size variant: `xs`, `sm`, `md`, `lg`, `xl` |
| `animate` | Boolean | `true` | Enable breathing animation |
| `showGlow` | Boolean | `true` | Show radial glow backdrop |
| `inverted` | Boolean | `false` | White/bright on dark (invert) mode |
| `glowIntensity` | String | `"medium"` | Glow intensity: `soft`, `medium`, `intense` |

## Usage Examples

### Splash Screen (Inverted, Dark Background)
```vue
<BrandLogo
  :src="logo"
  alt="AI Premium Studio Logo"
  size="lg"
  :inverted="true"
  glow-intensity="medium"
  :animate="true"
/>
```

### Landing Page (Normal, Light Background)
```vue
<BrandLogo
  :src="logo"
  alt="AI Premium Studio Logo"
  size="lg"
  :inverted="false"
  glow-intensity="medium"
  :animate="true"
/>
```

### Header/Navigation (Small)
```vue
<BrandLogo
  :src="logo"
  size="sm"
  :inverted="false"
  glow-intensity="soft"
  :animate="false"
/>
```

### Footer (Extra Large)
```vue
<BrandLogo
  :src="logo"
  size="xl"
  :inverted="true"
  glow-intensity="intense"
  :animate="true"
/>
```

## Size Variants

- **xs**: 40px width
- **sm**: 60px width
- **md**: 120px width (default)
- **lg**: 140px width
- **xl**: 180px width

## Glow Intensities

### soft
- Minimal glow effect
- Best for compact spaces
- Drop-shadows: 8px + 12px

### medium (default)
- Balanced glow
- Suitable for most use cases
- Drop-shadows: 12px + 24px + 40px

### intense
- Maximum glow effect
- Creates bold visual impact
- Drop-shadows: 15px + 30px + 60px

## Features

### Inverted Mode
When `inverted="true"`, the logo is:
- Converted to white/bright (`brightness(0) invert(1)`)
- Enhanced with drop-shadow glows
- Perfect for dark backgrounds (splash screen, dark sections)

### Normal Mode
When `inverted="false"`, the logo is:
- Displayed as-is with subtle drop-shadow glows
- Best for light backgrounds
- Maintains original color scheme

### Animation
When `animate="true"`:
- Breathing scale animation (1 to 1.04)
- 4-second duration
- Opacity pulse from 0.95 to 1

### Glow Backdrop
When `showGlow="true"`:
- Radial gradient glow behind logo
- Pulse animation every 3 seconds
- Adds depth and polish

## Migration from Inline Styles

### Before (SplashScreen.vue)
```vue
<div class="splash-logo">
  <img :src="logo" alt="AI Premium Studio Logo" class="logo-image" />
</div>
```

With 50+ lines of CSS rules for logo styling.

### After (SplashScreen.vue)
```vue
<BrandLogo
  :src="logo"
  alt="AI Premium Studio Logo"
  size="lg"
  :inverted="true"
  glow-intensity="medium"
  :animate="true"
/>
```

**Benefits:**
- ✅ Reduced component code
- ✅ Single source of truth for logo styling
- ✅ Easy configuration through props
- ✅ Consistent branding across app
- ✅ Reusable across sections and pages

## Styling Architecture

The component uses **scoped SCSS** with:
- Size variants using `&.size-*` nesting
- Conditional styles via class bindings
- Keyframe animations for breathing and glow-pulse
- CSS transitions for interactive states

All logo styling is encapsulated in this component—no duplicate CSS in parent sections.

## Customization

To extend or customize the component:

1. Edit `src/components/ui/branding/BrandLogo.vue`
2. Add new props if needed
3. Update size or glow intensity variants
4. Modify keyframe animations

Then use the updated component everywhere it's imported—changes propagate automatically.

## Current Usage

- **SplashScreen**: Inverted, lg, medium glow
- **Landing**: Normal, lg, medium glow
- Future: Header, Footer, About, etc.

## Import Statement

```javascript
import BrandLogo from "@/components/ui/branding/BrandLogo.vue"
```
