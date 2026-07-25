# 🎬 Moovies Frontend - Demos & Features

## What's New? ✨

Two new demo systems added to test the funnel stepper:

### 1️⃣ Mock Backend Demo 🔶
**No API calls. No server needed. Full workflow testing.**

- Access: Click menu → "Mock Backend Demo" or visit `/demo/mock-data`
- Features:
  - ✅ Complete mock API (estimation, launch, approval)
  - ✅ Auto-progressing jobs every 3 seconds
  - ✅ Browser console dev tools
  - ✅ Full workflow simulation

**Console commands:**
```javascript
__MOOVIES_MOCK_DEV__.testFlow()  // Auto-progress job
__MOOVIES_MOCK_DEV__.setJobStatus('job-id', 'DONE')  // Manual control
__MOOVIES_MOCK_DEV__.logJobs()  // View all jobs
```

### 2️⃣ Parallax Stepper Demo ✨
**3D depth effect with mouse & tilt tracking.**

- Access: Click menu → "Parallax Stepper Demo" or visit `/demo/parallax-stepper`
- Features:
  - ✅ Compare 3 versions (Original, V1, V2)
  - ✅ Live side-by-side comparison
  - ✅ Mouse parallax tracking
  - ✅ Mobile device tilt support
  - ✅ 60fps performance
  - ✅ Feature comparison table

---

## 🎯 Quick Access

### Via Menu (Easiest)
1. Press `⌘K` (Mac) or `Ctrl+K` (Windows)
2. See the new items:
   - 🔶 Mock Backend Demo
   - ✨ Parallax Stepper Demo
3. Click to navigate

### Direct URLs
```
Mock Demo:     http://localhost:5173/demo/mock-data
Parallax Demo: http://localhost:5173/demo/parallax-stepper
```

---

## 📚 Documentation

### For Demos
- **[QUICK_START_DEMOS.md](./QUICK_START_DEMOS.md)** ← START HERE
  - How to access the demos
  - Step-by-step usage guide
  - Keyboard shortcuts
  - Troubleshooting

### For Mock Backend
- **[MOCK_DATA_GUIDE.md](./MOCK_DATA_GUIDE.md)**
  - Complete mock system guide
  - Console tools reference
  - Test scenarios
  - Implementation details

### For Parallax Stepper
- **[PARALLAX_STEPPER_GUIDE.md](./PARALLAX_STEPPER_GUIDE.md)**
  - Parallax configuration
  - Performance optimization
  - Customization guide
  - Browser compatibility

### Technical Details
- **[MENU_INTEGRATION.md](./MENU_INTEGRATION.md)**
  - Route configuration
  - Menu structure
  - How it works

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)**
  - Full architecture
  - Feature comparison
  - File structure

- **[CHANGES_MADE.md](./CHANGES_MADE.md)**
  - Complete changelist
  - Files created/modified
  - Statistics

---

## 🚀 Getting Started

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Open Menu
Press `⌘K` (Mac) or `Ctrl+K` (Windows)

### 3. Try Mock Backend
1. Click "Mock Backend Demo"
2. Open browser console (F12)
3. Type: `__MOOVIES_MOCK_DEV__.testFlow()`
4. Watch job auto-progress

### 4. Try Parallax Stepper
1. Click "Parallax Stepper Demo"
2. Click "V2" card (recommended)
3. Move your mouse across stepper
4. See parallax depth effect

### 5. Combine Both (Advanced)
```env
# .env
VITE_USE_MOCK_DATA=true
```
Then use `FunnelStepperParallaxV2` for ultimate demo experience!

---

## 📊 Feature Overview

| Feature | Mock Demo | Parallax V2 |
|---------|-----------|------------|
| No backend needed | ✅ | ✅ |
| Full workflow | ✅ | ✅ |
| Console tools | ✅ | - |
| Mouse parallax | - | ✅ |
| Mobile tilt | - | ✅ |
| 60fps perf | ✅ | ✅ |
| Customizable | ✅ | ✅ |

---

## 🎓 Learning Resources

### Understanding Mock System
1. Read: [QUICK_START_DEMOS.md](./QUICK_START_DEMOS.md)
2. Try: Console commands in `/demo/mock-data`
3. Explore: [MOCK_DATA_GUIDE.md](./MOCK_DATA_GUIDE.md)

### Understanding Parallax
1. Read: [QUICK_START_DEMOS.md](./QUICK_START_DEMOS.md)
2. Try: All 3 versions in `/demo/parallax-stepper`
3. Explore: [PARALLAX_STEPPER_GUIDE.md](./PARALLAX_STEPPER_GUIDE.md)

### Technical Deep Dive
1. Check: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
2. Review: [MENU_INTEGRATION.md](./MENU_INTEGRATION.md)
3. Inspect: Source code in `src/lib/` and `src/composables/`

---

## 🔧 Configuration

### Enable Mock Data
```env
# .env
VITE_USE_MOCK_DATA=true
```

### Customize Parallax
```typescript
// In FunnelStepperParallaxV2.vue
const { getTransform2D } = useParallax({
  sensitivity: 8,      // 1-50, higher = more dramatic
  scalarX: 15,        // X-axis rotation amount
  scalarY: 15,        // Y-axis rotation amount
  enableTilt: true,   // Mobile device orientation
})
```

---

## 📞 Support

### Q: Do I need the backend running?
**A:** No! Both demos work without any backend server.

### Q: Is this production-ready?
**A:** The components are. The demos are dev-only routes (safe to commit).

### Q: Can I use Parallax V2 in production?
**A:** Yes! It's fully optimized, accessible, and recommended.

### Q: What about mobile?
**A:** Both demos are mobile-friendly. Parallax V2 includes device tilt support.

---

## ✅ What's Included

### New Components
```
✨ src/components/funnel/FunnelStepperParallax.vue (V1)
✨ src/components/funnel/FunnelStepperParallaxV2.vue (V2 - Recommended)
✨ src/composables/useParallax.ts
✨ src/lib/mock-gateway.ts
✨ src/lib/mock-dev-utils.ts
```

### New Demo Pages
```
✨ src/views/DemoMockDataView.vue
✨ src/views/DemoParallaxStepperView.vue
```

### Updated Routes
```
⚙️ src/router/routes.ts (2 new routes added)
```

### Documentation
```
📖 QUICK_START_DEMOS.md
📖 MOCK_DATA_GUIDE.md
📖 PARALLAX_STEPPER_GUIDE.md
📖 MENU_INTEGRATION.md
📖 IMPLEMENTATION_SUMMARY.md
📖 CHANGES_MADE.md
📖 README_DEMOS.md (this file)
```

---

## 🎯 Recommended Reading Order

1. **[QUICK_START_DEMOS.md](./QUICK_START_DEMOS.md)** ← Start here!
2. Try the demos
3. [MOCK_DATA_GUIDE.md](./MOCK_DATA_GUIDE.md) ← If you want details
4. [PARALLAX_STEPPER_GUIDE.md](./PARALLAX_STEPPER_GUIDE.md) ← If you want to customize
5. [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) ← For architecture

---

## 🎉 Summary

Two powerful demo systems ready to use:

✅ **Mock Backend Demo**
- Test stepper without API
- Console dev tools
- Full workflow simulation

✅ **Parallax Stepper Demo**
- Compare 3 versions
- 3D depth effect
- Mouse & tilt tracking

Both are:
- 🚀 Ready to use immediately
- 📖 Fully documented
- ⚙️ Properly integrated
- 🎯 Easy to access (⌘K or /demo/*)
- 💪 Production quality

**Get started:** Press `⌘K` or `Ctrl+K` and click a demo!

---

**Last Updated:** April 2, 2026
**Status:** ✅ Complete & Ready
**Version:** 1.0
