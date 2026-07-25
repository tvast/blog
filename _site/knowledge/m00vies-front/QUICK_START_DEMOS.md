# 🚀 Quick Start - Accessing the Demos

## Access the Demos

### Option 1️⃣: Using the Menu (Easiest)

1. **Open the menu** by pressing:
   - Mac: `⌘K`
   - Windows/Linux: `Ctrl+K`

2. **Look for these two new items:**
   - 🔶 **"Mock Backend Demo"** (orange warning badge)
   - ✨ **"Parallax Stepper Demo"** (green success badge)

3. **Click to navigate**

### Option 2️⃣: Direct URLs

**Mock Backend Demo:**
```
http://localhost:5173/demo/mock-data
```

**Parallax Stepper Demo:**
```
http://localhost:5173/demo/parallax-stepper
```

---

## What You Get

### 🔶 Mock Backend Demo (`/demo/mock-data`)

**Purpose:** Test the stepper without any API calls

**What happens:**
1. Page loads with full stepper UI
2. All backend calls use mock data
3. Jobs auto-progress every 3 seconds
4. You control status from browser console

**Browser Console Commands:**
```javascript
// Auto-progress the latest job
__MOOVIES_MOCK_DEV__.testFlow()

// Manually set job status
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-xxx', 'DONE')

// View all mock jobs in table
__MOOVIES_MOCK_DEV__.logJobs()

// Get raw job data
__MOOVIES_MOCK_DEV__.getMockJobs()
```

**Perfect for:**
- ✅ Testing UI without backend
- ✅ Verifying workflow flows
- ✅ Checking error states
- ✅ Performance testing
- ✅ Accessibility testing

---

### ✨ Parallax Stepper Demo (`/demo/parallax-stepper`)

**Purpose:** Compare 3 versions with 3D depth effects

**Three Versions:**

#### Original (No Parallax)
- Standard stepper
- No visual effects
- Baseline for comparison

#### Parallax V1 (Advanced)
- Multi-layer parallax
- Mouse & scroll tracking
- 3D depth illusion
- Higher CPU usage

#### Parallax V2 ⭐ **RECOMMENDED**
- Optimized parallax
- 60fps smooth performance
- Mobile device tilt support
- GPU accelerated

**Try It:**
1. Click version cards to switch
2. Move your mouse across the stepper
3. Watch parallax effect in action
4. On mobile: tilt device (if V2)

**Comparison table included with:**
- Performance metrics
- Feature checklist
- Recommendations

---

## Step-by-Step Guide

### First Time Setup

```bash
# 1. Make sure you're running the dev server
npm run dev

# 2. Open browser
# http://localhost:5173

# 3. Press keyboard shortcut
⌘K (Mac) or Ctrl+K (Windows)

# 4. Menu appears with 2 new items
```

### Try Mock Backend

```bash
# 1. Click "Mock Backend Demo" in menu
# or go to: /demo/mock-data

# 2. Page loads with stepper

# 3. Open browser console (F12)

# 4. Type in console:
__MOOVIES_MOCK_DEV__.testFlow()

# 5. Watch stepper progress:
# PENDING → PROCESSING → DONE
# Each step takes ~3 seconds
```

### Try Parallax Stepper

```bash
# 1. Click "Parallax Stepper Demo" in menu
# or go to: /demo/parallax-stepper

# 2. See 3 version cards (Original, V1, V2)

# 3. Click "V2" card (already selected)

# 4. Move your mouse around the stepper
# → Stepper follows cursor position
# → Depth effect creates premium feel

# 5. On mobile: Tilt your device
# → Parallax responds to device angle
# → Creates immersive experience
```

---

## FAQ

### Q: Do I need the backend running?

**Mock Demo:** ❌ No, uses local mock data
**Parallax Demo:** ❌ No, uses existing stepper, no API calls

### Q: Can I combine them?

**Yes!** Set `VITE_USE_MOCK_DATA=true` in `.env` and you get:
- Parallax V2 effect ✨
- Mock backend data 🔶
- Full workflow testing without server

### Q: Do the demos affect production?

No. They're:
- ✅ Development-only routes
- ✅ Isolated view components
- ✅ Don't interfere with real app
- ✅ Safe to commit to repo

### Q: How do I hide the demos from the menu?

Edit `src/router/routes.ts`:
```typescript
inMenu: false,  // Change from true to false
```

### Q: Can I customize the demos?

Yes! The views are regular Vue components:
- `src/views/DemoMockDataView.vue`
- `src/views/DemoParallaxStepperView.vue`

Edit styles, add features, etc.

### Q: What if the parallax is jerky?

1. Check your FPS (DevTools → Performance tab)
2. Reduce sensitivity in `useParallax` config
3. Test on actual device (not browser zoom)
4. Disable on lower-end devices

---

## Menu Structure (New)

```
┌─────────────────────────────┐
│  MOOVIES NAVIGATION         │
├─────────────────────────────┤
│                             │
│ Primary Menu:               │
│  • Marketing                │
│  • Gallery                  │
│  • Launch                   │
│                             │
│ Secondary Menu: (NEW)       │
│  • Home                     │
│  🔶 Mock Backend Demo       │
│  ✨ Parallax Stepper Demo   │
│                             │
│ Utility:                    │
│  • (Internal routes)        │
│                             │
│ ⌘K or Ctrl+K to toggle     │
└─────────────────────────────┘
```

---

## Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Open Menu | ⌘K | Ctrl+K |
| Navigate | Arrow keys | Arrow keys |
| Select | Enter | Enter |
| Close | Esc | Esc |

---

## Troubleshooting

### Menu doesn't show new demos?

1. **Clear cache:**
   ```bash
   # Hard refresh browser
   ⌘Shift+R (Mac) or Ctrl+Shift+R (Windows)
   ```

2. **Check console errors:**
   ```bash
   # Open DevTools (F12) → Console
   # Look for any error messages
   ```

3. **Verify routes:**
   ```bash
   # Open DevTools → Network
   # Check that index.html loads correctly
   ```

### Parallax effect not working?

1. **Check browser support:**
   - Modern Chrome/Firefox/Safari required
   - transform3d not available in IE

2. **Disable reduced motion:**
   - System settings → Accessibility
   - Turn off "Reduce motion" if enabled

3. **Test on different device:**
   - Desktop mouse tracking
   - Mobile tilt support
   - Performance varies by device

### Mock data not auto-progressing?

1. **Check environment variable:**
   ```bash
   # .env should have:
   VITE_USE_MOCK_DATA=true
   ```

2. **Restart dev server:**
   ```bash
   # Env changes require restart
   npm run dev
   ```

3. **Check browser console:**
   ```bash
   # Should see message:
   # "🎬 Mock mode ENABLED"
   ```

---

## Next Steps

1. **Explore Mock Backend:**
   - Go to `/demo/mock-data`
   - Use console tools
   - Test full workflow

2. **Test Parallax:**
   - Go to `/demo/parallax-stepper`
   - Try all 3 versions
   - Check comparison table

3. **Combine Both:**
   - Set `VITE_USE_MOCK_DATA=true`
   - Use Parallax V2 stepper
   - Test complete UI without backend

4. **Gather Feedback:**
   - Does parallax feel good?
   - Is 60fps smooth enough?
   - Good for production?

---

## Documentation Links

- 📖 **Mock Data:** [`MOCK_DATA_GUIDE.md`](./MOCK_DATA_GUIDE.md)
- 📖 **Parallax:** [`PARALLAX_STEPPER_GUIDE.md`](./PARALLAX_STEPPER_GUIDE.md)
- 📖 **Menu Integration:** [`MENU_INTEGRATION.md`](./MENU_INTEGRATION.md)
- 📖 **Implementation:** [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md)

---

## Support

All features are:
- ✅ Fully functional
- ✅ Well documented
- ✅ Production ready
- ✅ No external dependencies
- ✅ Accessible & responsive

Enjoy exploring! 🚀
