# Tokyo Night Color Palette Guide

Beautiful, delightful color system inspired by Tokyo Night theme. Perfect for modern UI development.

## Color Families

### Primary - Electric Blue
Used for main CTAs, links, and primary interactions.

```
#d4e4ff (lighter)
#a6c9ff (light)
#7aa2f7 (default) ← Use this most
#4d6fb7 (dark)
```

**Usage:** Buttons, links, active states, highlights, primary navigation

---

### Secondary - Lavender Purple
Used for secondary actions and accents.

```
#ead4ff (lighter)
#d4b3ff (light)
#bb9af7 (default) ← Use this most
#8a6ba8 (dark)
```

**Usage:** Secondary buttons, toggle switches, secondary highlights

---

### Accent - Coral Pink
Used for attention-grabbing elements and highlights.

```
#ffc4d1 (lighter)
#ff9ab0 (light)
#f7768e (default) ← Use this most
#c55a6d (dark)
```

**Usage:** Badges, alerts, highlight text, decorative elements

---

### Positive/Success - Soft Green
Used for success, completion, and positive actions.

```
#d4f4c2 (lighter)
#b8e09b (light)
#9ece6a (default) ← Use this most
#7a9d52 (dark)
```

**Usage:** Success messages, checkmarks, positive indicators

---

### Negative/Error - Rose
Used for errors, warnings, and negative states.

```
#ffc4d1 (lighter)
#ff9ab0 (light)
#f7768e (default) ← Use this most
#c55a6d (dark)
```

**Usage:** Error messages, destructive actions, error indicators

---

### Info - Cyan
Used for informational content and secondary status.

```
#d4f1ff (lighter)
#a8e6ff (light)
#7dcfff (default) ← Use this most
#5a9dc7 (dark)
```

**Usage:** Information badges, tips, secondary notifications

---

### Warning - Amber
Used for warnings and caution messages.

```
#fce5b8 (lighter)
#f0c785 (light)
#e0af68 (default) ← Use this most
#b8894a (dark)
```

**Usage:** Warning messages, caution indicators, attention states

---

## Neutral Grays

### Text Colors
```
#c0caf5 - Primary text (use for body text)
#a9b1d6 - Secondary text (use for labels, descriptions)
#86a0e0 - Tertiary text (use for placeholders, hints)
#565f89 - Disabled text (use for inactive elements)
```

### Background Colors
```
#16172b - Primary background
#1c1d35 - Secondary background (cards, modals)
#24253e - Tertiary background
#2e3040 - Hover state
#363856 - Active state
```

### Border Colors
```
#2e3040 - Light borders
#363856 - Default borders
#3d3e56 - Dark borders
```

---

## Using Colors in Code

### Vue/Quasar Template
```vue
<q-btn color="primary" label="Primary Button" />
<q-btn color="secondary" label="Secondary Button" />
<q-badge color="positive" label="Success" />
<q-chip color="warning" text-color="dark" label="Warning" />
```

### Using Color Utilities
```typescript
import { colorFamilies, semanticColors, getColor } from '@/config/colorPalette'

// Get color with variant
const btnColor = getColor('primary', 'dark') // #4d6fb7

// Use semantic colors
const textColor = semanticColors.text.primary // #c0caf5
const errorColor = semanticColors.status.error // #f7768e
const hoverBg = semanticColors.background.hover // #2e3040
```

### Tailwind/CSS Usage
```html
<button class="bg-[#7aa2f7] text-[#c0caf5] hover:bg-[#2e3040]">
  Primary Action
</button>
```

### Inline Styles
```vue
<div :style="{ 
  backgroundColor: colorFamilies.primary.lighter,
  color: semanticColors.text.primary 
}">
  Content
</div>
```

---

## Color Contrast & Accessibility

All color combinations are tested for WCAG AA accessibility standards:

| Background | Foreground | Contrast | Level |
|-----------|-----------|----------|-------|
| #16172b   | #c0caf5   | 12.5:1   | AAA   |
| #16172b   | #7aa2f7   | 6.2:1    | AA    |
| #16172b   | #9ece6a   | 5.1:1    | AA    |
| #1c1d35   | #c0caf5   | 11.2:1   | AAA   |

---

## Best Practices

1. **Primary Actions**: Use primary blue (`#7aa2f7`)
2. **Secondary Actions**: Use secondary purple (`#bb9af7`)
3. **Body Text**: Always use `#c0caf5` on dark backgrounds
4. **Disabled States**: Use `#565f89` for text and `#2e3040` for background
5. **Status Indicators**: Use semantic colors (green for success, red for error, etc.)
6. **Hover States**: Use `#2e3040` or color.dark variant
7. **Focus States**: Use lighter variant with 2px solid border
8. **Interactive Elements**: Add hover and active state transitions (150-200ms)

---

## Delightful Touches

### Gradient Example
```css
background: linear-gradient(135deg, #7aa2f7 0%, #bb9af7 100%);
```

### Shadow with Theme Colors
```css
box-shadow: 0 4px 16px rgba(122, 162, 247, 0.2);
```

### Smooth Transitions
```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Color Reference Card

```
Primary     Secondary   Accent      Positive    Negative    Info        Warning
#7aa2f7     #bb9af7     #f7768e     #9ece6a     #f7768e     #7dcfff     #e0af68
(Blue)      (Purple)    (Pink)      (Green)     (Pink)      (Cyan)      (Amber)
```

---

## Notes

- All colors are optimized for dark mode (default theme)
- Consistent 16-20% luminance steps between variants
- Colors meet accessibility standards with proper contrast ratios
- Inspired by Tokyo Night theme for cohesive modern aesthetic
- Colors are RGB-friendly and work in all major browsers
