---
name: design_system
description: Damsterdam CSS theme - Tokyo-inspired dark UI with custom fonts and neon colors
metadata: 
  node_type: memory
  type: reference
  originSessionId: 8d908243-0a9a-49bb-b6b1-fb3bc88de0ed
---

## Design Tokens (in `src/style.css`)

### Fonts
- **Brand**: Damsterdam (gold text shadows, playful)
- **UI**: Linographer (monospace, clean)
- **Fat**: Porkys (bold, impact)
- **Mono**: Courier New (fallback)

### Color Palette
- **Primary**: #7aa2f7 (neon blue)
- **Secondary**: #bb9af7 (purple)
- **Accent**: #ff9e64 (orange)
- **Gold**: #f2d35c (brand color, text-shadow effects)
- **Cyan**: #3fe0b5 (interactive highlights)
- **Pink**: #ff5c8a (neon pink, shadows)
- **Backgrounds**: Dark gradients with glassy overlays

### Components Using Theme
- `.tokyo-panel` - frosted glass effect with gradients
- `.tokyo-glass` - neon pink glass borders
- `.tokyo-title` - gold text with shadow
- `.menu-header` - centered logo with subtitle
- `.hamburger-icon` - fixed top-left, blue gradient
- `.street-stats` - stat chips with hover lift effect

### Spacing System
- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px, 2xl: 24px, 3xl: 32px
- Consistent gap: `var(--space-lg)` (16px)

**Keep in mind**: Damsterdam font gives the app its unique personality. Use it for headings/branding.
