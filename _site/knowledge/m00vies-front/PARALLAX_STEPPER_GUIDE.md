# 🎬 Parallax Stepper Guide

Enhanced funnel stepper with smooth 3D parallax depth effects. Two versions available: simple and advanced.

## Overview

### What is Parallax?

Parallax is a visual effect where elements move at different speeds based on mouse position or scroll, creating an illusion of 3D depth and layering. This makes the stepper feel more interactive and premium.

**Reference:** Based on [matthew.wagerfield.com/parallax](https://matthew.wagerfield.com/parallax)

## Two Versions

### Version 1: `FunnelStepperParallax.vue`
- ✅ Mouse-based parallax layers
- ✅ Multi-layer depth effect (background, mid, foreground)
- ✅ Scroll-aware positioning
- ✅ Scale/rotation on step tabs
- ⚠️ More CPU intensive on lower-end devices

### Version 2: `FunnelStepperParallaxV2.vue` ⭐ RECOMMENDED
- ✅ Optimized with `useParallax` composable
- ✅ Smooth 60fps mouse tracking
- ✅ Mobile device orientation (tilt) support
- ✅ Throttled updates for performance
- ✅ 3D perspective transforms
- ✅ Respects `prefers-reduced-motion`

## Installation

Both versions are drop-in replacements for the original `FunnelStepper.vue`.

### Option A: Replace Original Stepper

**In your router or view that uses the stepper:**

```vue
<script setup>
// Before:
import FunnelStepper from '@/components/funnel/FunnelStepper.vue'

// After (v2 - recommended):
import FunnelStepper from '@/components/funnel/FunnelStepperParallaxV2.vue'
// Or (v1 - advanced):
import FunnelStepper from '@/components/funnel/FunnelStepperParallax.vue'
</script>
```

The API is identical — no changes needed to parent components.

### Option B: Side-by-Side Testing

Keep both versions and A/B test:

```vue
<script setup>
const showParallax = ref(true)
</script>

<template>
  <div v-if="showParallax">
    <FunnelStepperParallaxV2 />
  </div>
  <div v-else>
    <FunnelStepper /> <!-- Original -->
  </div>

  <button @click="showParallax = !showParallax">
    Toggle Parallax
  </button>
</template>
```

## Features

### V2 Recommended Features

#### 1. Mouse Parallax
```javascript
// Automatically tracks mouse position
// Elements move smoothly based on cursor location
// Creates "follow" effect that feels responsive
```

**Visual Effect:**
- Move mouse left → stepper shifts right
- Move mouse up → stepper shifts down
- Effect is subtle but noticeable (feels premium)

#### 2. Device Tilt (Mobile)
```javascript
// On iOS 13+ and Android: uses device orientation
// Tilt phone → stepper responds with perspective shift
// Creates immersive experience on mobile

// Respects user's permission preference
```

#### 3. Depth Layers
Each step has a different `depth` value (0.7 → 1.16):
- Earlier steps (Brief, Config) move slower = feel "further away"
- Later steps (Monitor, Shop) move faster = feel "closer"
- Creates natural visual hierarchy

#### 4. Performance Optimized
```javascript
// Throttled to 60fps (16ms intervals)
// Uses transform3d for GPU acceleration
// Disables on devices preferring reduced motion
// Mobile-friendly with automatic fallback
```

## Configuration

### useParallax Composable Options

```typescript
const { getTransform2D } = useParallax({
  // Sensitivity: 1-50 (default: 10)
  // Higher = more exaggerated parallax effect
  sensitivity: 8,

  // X-axis rotation scalar (default: 10)
  scalarX: 15,

  // Y-axis rotation scalar (default: 10)
  scalarY: 15,

  // Update throttle interval in milliseconds (default: 16)
  throttleInterval: 16, // ~60fps

  // Enable device orientation on mobile (default: false)
  enableTilt: true,
})
```

### Step Depth Configuration

In `FunnelStepperParallaxV2.vue`, adjust depth values in STEPS array:

```typescript
const STEPS = [
  { name: 1, depth: 0.7 },   // Further = slower parallax
  { name: 2, depth: 0.78 },
  { name: 3, depth: 0.86 },
  // ...
  { name: 7, depth: 1.16 },  // Closer = faster parallax
]
```

## Usage Examples

### Basic Usage (No Changes Needed)

```vue
<template>
  <!-- Works exactly like original FunnelStepper -->
  <FunnelStepperParallaxV2 />
</template>
```

### Custom Parallax Sensitivity

Create a variant with different settings:

```vue
<script setup>
// In a new component: FunnelStepperParallaxCustom.vue
const { getTransform2D } = useParallax({
  sensitivity: 15,  // More dramatic effect
  scalarX: 20,
  scalarY: 20,
  enableTilt: true,
})
</script>
```

### Disable Parallax on Mobile

```vue
<script setup>
const isMobile = ref(window.innerWidth < 768)

const parallaxOptions = isMobile.value
  ? { sensitivity: 0 }  // Disabled
  : { sensitivity: 8 }  // Enabled
</script>
```

## Browser Support

| Feature | Support |
|---------|---------|
| Mouse Parallax | All modern browsers |
| 3D Transforms | Chrome, Firefox, Safari, Edge |
| Device Orientation | iOS 13+, Android 5+ |
| GPU Acceleration | All modern browsers |
| Reduced Motion | All modern browsers |

## Performance Tips

### ✅ Do's
- Use V2 (optimized version)
- Enable GPU acceleration (uses `transform3d`)
- Test on actual devices, not just desktop
- Use `prefers-reduced-motion` detection
- Throttle updates (default: 16ms = 60fps)

### ❌ Don'ts
- Don't use `top`/`left` CSS properties (causes repaints)
- Don't disable throttling
- Don't use very high sensitivity values on mobile
- Don't remove transform3d usage

### Debug Performance

```javascript
// In browser DevTools:
// 1. Open DevTools (F12)
// 2. Go to Performance tab
// 3. Record while interacting
// 4. Look for steady 60fps (green line at top)

// If dropping below 60fps:
// - Reduce sensitivity
// - Increase throttleInterval
// - Disable tilt on mobile
```

## Customization

### Change Color Scheme

The parallax stepper uses CSS variables. Override in your global styles:

```css
:root {
  --funnel-text: #f3f1ed;
  --funnel-muted: rgba(243, 241, 237, 0.7);
  --funnel-border: rgba(243, 241, 237, 0.08);
}
```

### Adjust Border Radius

```css
.parallax-stepper-main {
  border-radius: 20px; /* Change this value */
}
```

### Custom Gradient Background

In the scoped `<style>`:

```css
.parallax-stepper-main :deep(.q-stepper__header) {
  background: linear-gradient(
    135deg,
    your-color-1 0%,
    your-color-2 100%
  ) !important;
}
```

## Troubleshooting

### "Parallax feels jerky/stuttery"

**Solution:** Increase throttle interval
```typescript
useParallax({
  throttleInterval: 32,  // 30fps instead of 60
})
```

### "Mobile orientation not working"

**Solution:** Check iOS permission
```javascript
// iOS 13+ requires explicit permission
if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
  DeviceOrientationEvent.requestPermission()
    .then(permission => console.log(permission))
}
```

### "Effect too subtle / too strong"

**Adjust sensitivity:**
```typescript
// Too subtle:
useParallax({ sensitivity: 15 })  // Increase to 15

// Too strong:
useParallax({ sensitivity: 4 })   // Decrease to 4
```

### "Looks bad on my device"

**Fallback to original:**
```vue
<template>
  <FunnelStepper v-if="!supportsParallax" />
  <FunnelStepperParallaxV2 v-else />
</template>

<script setup>
const supportsParallax = ref(!matchMedia('(prefers-reduced-motion: reduce)').matches)
</script>
```

## Comparison

| Feature | Original | ParallaxV1 | ParallaxV2 |
|---------|----------|-----------|-----------|
| Mouse tracking | ❌ | ✅ | ✅ |
| Mobile tilt | ❌ | ❌ | ✅ |
| Depth layers | ❌ | ✅ | ✅ |
| Performance | ✅✅ | ✅ | ✅✅ |
| Accessibility | ✅✅ | ✅ | ✅✅ |
| Complexity | Low | High | Medium |

## Next Steps

1. **Try V2 version:** Replace import in your view
2. **Test on devices:** Mouse and mobile
3. **Adjust settings:** Sensitivity, depth, tilt
4. **Monitor performance:** Use DevTools Performance tab
5. **Gather feedback:** A/B test with users

## File Reference

- **V1:** `src/components/funnel/FunnelStepperParallax.vue` (241 lines)
- **V2:** `src/components/funnel/FunnelStepperParallaxV2.vue` (320 lines)
- **Composable:** `src/composables/useParallax.ts` (170 lines)

All components maintain 100% API compatibility with original `FunnelStepper.vue`.

---

**Made with 🎬 for Moovies**
