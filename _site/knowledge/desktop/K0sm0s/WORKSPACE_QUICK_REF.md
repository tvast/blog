# K0SM0S Workspace - Quick Reference

## 🚀 Quick Start

```bash
# From K0sm0s root directory
cd /Users/d0c/Desktop/K0sm0s

# Install everything
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Run crash test
npm run test:crash
# → http://localhost:5173/src/zebpage.html
```

---

## 📦 Workspace Structure

```
K0sm0s/                          (root workspace)
├── package.json                 (workspace config)
├── .npmrc                       (npm settings)
│
├── cr1bl3/                      (framework - not a workspace root)
│   └── @d0c/
│       ├── cr1bl3-cli/          (Build CLI)
│       └── cr1bl3-lib/          (Core framework)
│
└── micro-front/                 (application)
    ├── package.json            (uses workspace:* protocol)
    ├── public/
    │   └── index.html
    └── src/
        ├── main.js             (entry point)
        ├── router.js
        └── integration/
```

---

## 📋 Common Commands

### From Root Directory

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run test:crash       # Run crash test (all 209 components)

# Utilities
npm install              # Install all workspace packages
npm list                 # List all workspace packages
npm outdated             # Check for outdated packages
npm update               # Update all packages

# Workspace-specific
npm -w micro-front run dev              # Micro-front dev
npm -w @d0c/cr1bl3-lib run build        # Build cr1bl3
```

### From micro-front Directory

```bash
cd micro-front

npm run dev              # Start dev server
npm run build            # Build for production
npm run test:crash       # Crash test
npm install              # Install deps for micro-front
```

---

## 🔌 Workspace Packages

### @d0c/cr1bl3-cli
**Location**: `cr1bl3/@d0c/cr1bl3-cli/`  
**Purpose**: Build tools, dev server, CLI commands  
**Entry**: `cli.js`  
**Used by**: micro-front via npm scripts

### @d0c/cr1bl3-lib
**Location**: `cr1bl3/@d0c/cr1bl3-lib/`  
**Purpose**: Core framework (Router, components, Three.js)  
**Entry**: `index.js`  
**Exports**: `cr1bl3` class, Router, components  
**Used by**: micro-front directly

### @d0c/micro-front
**Location**: `micro-front/`  
**Purpose**: Main application  
**Depends on**: @d0c/cr1bl3-lib, @d0c/cr1bl3-cli  
**Entry**: `src/main.js`

---

## 📥 Importing Between Workspaces

### In micro-front, import from cr1bl3:

```javascript
// Core framework
import { cr1bl3 } from '@d0c/cr1bl3-lib';

// Router
import { Router } from '@d0c/cr1bl3-lib/Router.js';

// Components
import H3R0 from '@d0c/cr1bl3-lib/components/H3R0.js';
```

### From micro-front modules:

```javascript
// In src/router.js
export const createRouter = (app) => {
  // Uses app instance from @d0c/cr1bl3-lib
};

// In src/integration/PlanetBridge.js
import gsap from 'gsap';
export class PlanetBridge { ... }
```

---

## 🔧 Package.json (Root)

```json
{
  "name": "@d0c/k0sm0s",
  "private": true,
  "workspaces": [
    "cr1bl3/@d0c/cr1bl3-cli",
    "cr1bl3/@d0c/cr1bl3-lib",
    "micro-front"
  ],
  "scripts": {
    "dev": "npm -w micro-front run dev",
    "build": "npm -w micro-front run build"
  }
}
```

## 🔧 Package.json (micro-front)

```json
{
  "name": "@d0c/micro-front",
  "dependencies": {
    "@d0c/cr1bl3-lib": "workspace:*",
    "@d0c/cr1bl3-cli": "workspace:*",
    "three": "^r150",
    "vue": "^3.3.4",
    "gsap": "^3.12.2"
  }
}
```

---

## 🌐 Environment Variables

```bash
# Dev server port (default: 5173)
CR1BL3_PORT=5173

# WebSocket server port (default: 2702)
CR1BL3_WS_PORT=2702

# Build output directory
CR1BL3_OUTPUT=dist

# Enable source maps
CR1BL3_SOURCEMAPS=true

# Example usage
CR1BL3_PORT=3000 npm run dev
```

---

## 🧪 Testing

### Crash Test (All 209 Components)

```bash
npm run test:crash
# Opens: http://localhost:5173/src/zebpage.html
```

Shows:
- ✅ Load status per component
- ⏱️ Load time
- 💾 Memory usage
- 📊 Real-time logs

### Dev Server Tests

```bash
# Start dev server
npm run dev

# In another terminal
curl http://localhost:5173
# Should return HTML
```

---

## 🚨 Troubleshooting

### Issue: Cannot find module '@d0c/cr1bl3-lib'

**Solution:**
```bash
# From root
npm install
npm list @d0c/cr1bl3-lib
```

### Issue: Dependencies not installing

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Find process
lsof -i :5173

# Use different port
CR1BL3_PORT=3000 npm run dev
```

### Issue: WebSocket connection failed

**Solution:**
```bash
# Ensure dev server is running
npm run dev

# Check port 2702 is free
lsof -i :2702
```

---

## 📂 File Locations

| File | Path | Purpose |
|------|------|---------|
| Workspace Root | `/Users/d0c/Desktop/K0sm0s/` | npm workspace |
| Root Config | `package.json` | Defines workspaces |
| npm Config | `.npmrc` | npm settings |
| cr1bl3 | `cr1bl3/` | Framework packages |
| Micro-front | `micro-front/` | Application |
| Dev Server | `localhost:5173` | Live app |
| WebSocket | `localhost:2702` | Hot reload |
| Crash Test | `micro-front/src/zebpage.html` | Component test |
| Build Output | `micro-front/dist/` | Production build |

---

## 📚 Documentation

| File | Location | Content |
|------|----------|---------|
| This file | `WORKSPACE_QUICK_REF.md` | Quick reference |
| Workspace Setup | `WORKSPACE_SETUP.md` | Detailed setup |
| Micro-front Docs | `micro-front/README.md` | App documentation |
| Integration Guide | `micro-front/INTEGRATION_GUIDE.md` | How it works |
| Architecture | `micro-front/ARCHITECTURE.txt` | Visual diagrams |
| Start Here | `micro-front/START_HERE.md` | Quick start |

---

## 🎯 Typical Workflow

```bash
# 1. Setup (first time)
cd /Users/d0c/Desktop/K0sm0s
npm install

# 2. Development
npm run dev
# → http://localhost:5173
# Edit files in micro-front/src/
# Auto hot-reload via WebSocket

# 3. Testing
npm run test:crash
# → http://localhost:5173/src/zebpage.html

# 4. Production
npm run build
# → micro-front/dist/

# 5. Deploy dist/ folder to server
```

---

## 💡 Tips

- ✅ Always run `npm install` from root after pulling changes
- ✅ Use `npm -w` flag to run commands in specific workspaces
- ✅ Workspace:* protocol automatically resolves to local versions
- ✅ Hot reload works via WebSocket on port 2702
- ✅ Crash test validates all 209 components load
- ✅ Check browser console for errors (DevTools F12)

---

## 📞 Help

**For detailed setup**: `WORKSPACE_SETUP.md`  
**For app features**: `micro-front/README.md`  
**For architecture**: `micro-front/ARCHITECTURE.txt`  
**For quick start**: `micro-front/START_HERE.md`

---

**K0SM0S Workspace v1.0**  
**Framework**: cr1bl3 + npm workspaces  
**Status**: ✅ Ready for development
