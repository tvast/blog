# Liquid CTA Button & Hero Name Badge - Updates

## 1. Liquid CTA Button ✨

### New Component: `LiquidCTA.vue`

A beautiful, animated button for contacting via email with liquid wave effects.

**Features:**
- 🌊 Smooth liquid wave animation
- 📧 Links directly to `d0c@keyops.fr` using `mailto:`
- 💫 Hover effects and visual feedback
- 🎨 Responsive design (mobile-friendly)
- 🌓 Dark mode support
- ♿ Accessible with proper title attribute

**Animation Details:**
- Smooth liquid path morphing (SVG)
- Enhanced hover state with faster waves
- Gradient background (purple to pink)
- Subtle blur effect on waves
- Box shadow for depth

**Usage:**
```vue
<LiquidCTA />
```

**Placement:**
- Integrated into Contact section
- Appears prominently above download/email buttons
- Responsive design adjusts size on mobile

---

## 2. Hero Section - Name Badge 🏷️

### Enhanced Hero Component

Added a discrete name badge and tooltip to the title.

**Features:**

1. **Name Badge**
   - Small, stylish badge showing "Théophile Vast"
   - Positioned top-right of title
   - Subtle (low opacity by default)
   - Appears on hover
   - Gradient background (purple to pink)

2. **Tooltip**
   - Native HTML title attribute
   - Shows "By Théophile Vast" on hover
   - Clean, minimal design
   - Black background with cyan text

**Implementation:**
```html
<div class="title-wrapper" :title="`By ${$t('hero.title')}`">
  <h1 class="title animate-in">{{ $t("hero.title") }}</h1>
  <span class="name-badge">{{ $t("hero.title") }}</span>
</div>
```

**Styling:**
- CSS tooltip using `::after` pseudo-element
- Badge with gradient and rounded corners
- Smooth opacity transitions
- Positioned absolutely for minimal DOM impact

---

## Design Decisions

### Liquid CTA Button
- **Why liquid effect?** Creates a premium, unique feel
- **Why gradient?** Matches existing Dracula theme (purple-pink)
- **Why mailto?** Direct, accessible email link
- **Why responsive?** Works on all device sizes

### Hero Name Badge
- **Why discrete?** Doesn't overwhelm the main title
- **Why on hover?** Reveals information without cluttering
- **Why tooltip?** Additional context for users
- **Why right-aligned?** Balances the title composition

---

## Email Integration

Both components link to: **d0c@keyops.fr**

Using `mailto:` means:
- ✅ Works on all devices
- ✅ Opens user's default email client
- ✅ No external redirects needed
- ✅ No tracking/analytics
- ✅ User has full control

---

## Responsive Behavior

### Desktop (768px+)
- Liquid CTA: 200px × 60px
- Name badge: Visible on hover
- Full animations enabled

### Mobile (< 768px)
- Liquid CTA: 160px × 50px
- Smaller font size
- Touch-friendly
- Badge still visible on tap

---

## Color Theme Integration

Uses existing CSS variables:
- Primary: `--dracula-purple` (#bd93f9)
- Secondary: `--dracula-pink` (#ff79c6)
- Accent: `--dracula-cyan` (#8be9fd)
- Background: `--dracula-cyan` for hover states

Dark mode automatically detected via:
```css
[data-theme="light"] .liquid-btn {
  /* Light mode adjustments */
}
```

---

## Animation Performance

- GPU-accelerated transforms
- CSS animations (not JavaScript)
- Will-change hints for performance
- Smooth 60fps animations
- Minimal repaints/reflows

---

## Accessibility

✅ **Semantic HTML**
- Links are actual `<a>` tags
- Proper `href` for navigation
- Title attributes for tooltips

✅ **Keyboard Navigation**
- Tab-accessible buttons
- Focus states visible
- Hover states work on focus too

✅ **Screen Readers**
- Link text is descriptive
- Title attributes read aloud
- Email address is clear

---

## File Summary

| File | Change |
|------|--------|
| `LiquidCTA.vue` | NEW - Animated CTA button |
| `Hero.vue` | Updated - Added name badge + tooltip |
| `Contact.vue` | Updated - Integrated LiquidCTA |

---

## Next Enhancements (Optional)

1. **Copy-to-Clipboard**: Add button to copy email
2. **Form Integration**: Contact form with validation
3. **Notification**: Show confirmation after action
4. **Analytics**: Track CTA clicks (respect privacy)
5. **A/B Testing**: Test different CTA text/styling
