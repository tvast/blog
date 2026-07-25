# K0SM0S Workspace Manifest

## ✅ Workspace Configuration Complete

**Date**: 2024-04-24  
**Status**: Ready for Development  
**Framework**: cr1bl3 (npm workspace)  
**Packages**: 3 workspaces  

---

## 📦 Workspace Definition

### Root Workspace (`@d0c/k0sm0s`)

**Location**: `/Users/d0c/Desktop/K0sm0s/`

**Files**:
- `package.json` - Workspace configuration
- `.npmrc` - npm settings
- `WORKSPACE_SETUP.md` - Detailed setup guide
- `WORKSPACE_QUICK_REF.md` - Quick reference

**Contains**:
```
workspaces:
  - cr1bl3/@d0c/cr1bl3-cli
  - cr1bl3/@d0c/cr1bl3-lib
  - micro-front
```

**Scripts** (convenience commands):
```json
{
  "dev": "npm -w micro-front run dev",
  "build": "npm -w micro-front run build",
  "preview": "npm -w micro-front run preview",
  "test:crash": "npm -w micro-front run test:crash",
  "setup": "npm install && npm run dev"
}
```

---

### Workspace 1: cr1bl3-cli

**Package**: `@d0c/cr1bl3-cli`  
**Location**: `cr1bl3/@d0c/cr1bl3-cli/`  
**Scope**: Build tools + dev server  

**Key Files**:
- `cli.js` - Main CLI entry
- `build.js` - Build command
- `buildBrowserBundle.js` - Bundle generator
- `commands.js` - Command registry
- `prompt.js` - Interactive prompts
- `animate.js` - Animation utilities
- `package.json` - CLI dependencies

**Used By**: micro-front (via npm run dev/build)

**Run**:
```bash
npm -w @d0c/cr1bl3-cli run [command]
```

---

### Workspace 2: cr1bl3-lib

**Package**: `@d0c/cr1bl3-lib`  
**Location**: `cr1bl3/@d0c/cr1bl3-lib/`  
**Scope**: Core framework  

**Key Files**:
- `index.js` - Main export (cr1bl3 class)
- `Router.js` - Routing system
- `media3dUtility.js` - Three.js utilities
- `style.css` - Default styles
- `package.json` - Framework dependencies

**Components** (`components/` directory):
- `H3R0.js` - Hero component
- `NAVB4R.js` - Navigation bar
- `H0m3.js` - Home page
- `4bout.js` - About page
- `C0NT3NT.js` - Content wrapper
- `M3nu.js` - Menu
- `T1TL3.js` - Title
- `input-component.js` - Form input
- `layouts/l4yout.js` - Layout base
- `components.js` - Component registry

**Exports** (import these in micro-front):
```javascript
import { cr1bl3 } from '@d0c/cr1bl3-lib';
import { Router } from '@d0c/cr1bl3-lib/Router.js';
import H3R0 from '@d0c/cr1bl3-lib/components/H3R0.js';
```

**Used By**: micro-front (dependency)

---

### Workspace 3: micro-front

**Package**: `@d0c/micro-front`  
**Location**: `micro-front/`  
**Scope**: Main application (consolidated from 3 projects)  

**Depends On** (workspace:* protocol):
```json
{
  "@d0c/cr1bl3-cli": "workspace:*",
  "@d0c/cr1bl3-lib": "workspace:*",
  "three": "^r150",
  "vue": "^3.3.4",
  "gsap": "^3.12.2"
}
```

**Structure**:
```
micro-front/
├── public/
│   └── index.html              (App shell)
├── src/
│   ├── main.js                 (Entry point using cr1bl3)
│   ├── router.js               (Route orchestration)
│   ├── crash-test.js           (Component scanner)
│   ├── zebpage.html            (Test page - 209 components)
│   ├── components/
│   │   ├── MainLayout.js
│   │   └── VueComponentBridge.js
│   ├── integration/
│   │   └── PlanetBridge.js     (Transition coordinator)
│   └── utils/
├── cr1bl3.config.json          (Build config)
├── package.json                (Workspace deps)
└── [Documentation]
```

**Scripts**:
```json
{
  "dev": "cr1bl3 dev",
  "build": "cr1bl3 build",
  "preview": "cr1bl3 preview",
  "test:crash": "node src/crash-test.js"
}
```

**Components Consolidated**: 209
- pl4n3t: 11
- galax0und: 48
- m00vies-front: 150

---

## 🔗 Workspace Dependencies

```
micro-front
    ├─→ @d0c/cr1bl3-lib (workspace:*)
    │       └─→ three
    │       └─→ other core deps
    │
    ├─→ @d0c/cr1bl3-cli (workspace:*)
    │       └─→ @d0c/cr1bl3-lib (inherits)
    │
    ├─→ vue (direct)
    ├─→ gsap (direct)
    └─→ vue-router (direct)
```

---

## 📥 Import Path Resolution

### From micro-front, importing cr1bl3:

```javascript
// ✅ Framework main
import { cr1bl3 } from '@d0c/cr1bl3-lib';

// ✅ Router
import { Router } from '@d0c/cr1bl3-lib/Router.js';

// ✅ Components
import H3R0 from '@d0c/cr1bl3-lib/components/H3R0.js';
import NAVB4R from '@d0c/cr1bl3-lib/components/NAVB4R.js';
```

**Resolves to**:
```
node_modules/@d0c/cr1bl3-lib → 
  ../../cr1bl3/@d0c/cr1bl3-lib (symlink)
```

---

## 🚀 Setup Process

### Step 1: Install Workspace

```bash
cd /Users/d0c/Desktop/K0sm0s
npm install
```

This:
- Installs root dependencies (none)
- Installs cr1bl3-cli dependencies
- Installs cr1bl3-lib dependencies
- Installs micro-front dependencies
- Creates workspace symlinks
- Links micro-front → cr1bl3-lib (workspace:*)

### Step 2: Verify Installation

```bash
npm list
# Should show workspace structure

npm list @d0c/cr1bl3-lib
# Should resolve to cr1bl3/@d0c/cr1bl3-lib
```

### Step 3: Start Development

```bash
npm run dev
# Runs: npm -w micro-front run dev
# Which runs: cr1bl3 dev
# From: micro-front directory
# Dev server: http://localhost:5173
# WebSocket: ws://localhost:2702
```

---

## 📊 Workspace Commands

### From Root

```bash
npm install                          # Install all workspaces
npm list                            # List workspace structure
npm outdated                        # Check for updates
npm update                          # Update all
npm run dev                         # Start dev (micro-front)
npm run build                       # Build (micro-front)
npm run test:crash                  # Crash test

npm -w micro-front run dev          # Specific workspace command
npm -w @d0c/cr1bl3-lib run build    # cr1bl3-lib command
```

### From micro-front

```bash
cd micro-front

npm install                         # Install micro-front deps
npm run dev                         # Dev server
npm run build                       # Build
npm run test:crash                  # Crash test
```

---

## 🔧 Configuration Files

### Root: package.json

```json
{
  "name": "@d0c/k0sm0s",
  "private": true,
  "workspaces": [
    "cr1bl3/@d0c/cr1bl3-cli",
    "cr1bl3/@d0c/cr1bl3-lib",
    "micro-front"
  ]
}
```

### Root: .npmrc

```
node-linker=hoisted
auto-install-peers=true
strict-peer-dependencies=false
legacy-peer-deps=true
```

### micro-front: package.json

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

## 📁 File Tree

```
K0sm0s/
├── package.json                    (workspace root)
├── .npmrc                          (npm config)
├── WORKSPACE_MANIFEST.md           (this file)
├── WORKSPACE_QUICK_REF.md          (quick start)
├── WORKSPACE_SETUP.md              (detailed guide)
│
├── cr1bl3/
│   ├── package.json
│   └── @d0c/
│       ├── cr1bl3-cli/
│       │   ├── cli.js
│       │   ├── build.js
│       │   └── package.json
│       └── cr1bl3-lib/
│           ├── index.js
│           ├── Router.js
│           ├── components/
│           │   ├── H3R0.js
│           │   ├── NAVB4R.js
│           │   └── ... (10 more)
│           └── package.json
│
└── micro-front/
    ├── package.json                (uses workspace:*)
    ├── cr1bl3.config.json
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── main.js                 (imports @d0c/cr1bl3-lib)
    │   ├── router.js
    │   ├── zebpage.html
    │   ├── components/
    │   ├── integration/
    │   └── utils/
    └── [docs]
```

---

## ✨ Key Features

### ✅ Workspace Protocol (`workspace:*`)

- Resolves to local packages
- No version constraints
- Automatic linking
- Standard npm (no yarn/lerna needed)

### ✅ Hot Reload

- WebSocket dev server (port 2702)
- Auto-reload on file change
- Works across workspace packages

### ✅ Component Consolidation

- 209 components indexed
- Import manifest auto-generated
- Path resolution via aliases

### ✅ cr1bl3 Framework

- Main build system
- Three.js integration
- Component management
- Router system

---

## 🎯 Typical Workflow

```bash
# Setup (first time only)
cd /Users/d0c/Desktop/K0sm0s
npm install

# Development
npm run dev
# → http://localhost:5173
# Edit files, see hot reload

# Testing
npm run test:crash
# → http://localhost:5173/src/zebpage.html
# Tests all 209 components

# Production
npm run build
# → micro-front/dist/

# Deploy
# Upload dist/ to server
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `WORKSPACE_MANIFEST.md` | This file - workspace overview |
| `WORKSPACE_QUICK_REF.md` | Quick commands reference |
| `WORKSPACE_SETUP.md` | Detailed setup & configuration |
| `micro-front/START_HERE.md` | Quick start for app |
| `micro-front/README.md` | App documentation |
| `micro-front/INTEGRATION_GUIDE.md` | How modules integrate |
| `micro-front/ARCHITECTURE.txt` | Visual diagrams |

---

## 🔍 Verify Workspace

```bash
# From root
npm list
# Shows workspace structure

npm list @d0c/cr1bl3-lib
# Shows micro-front → cr1bl3-lib resolved

npm -w
# Lists all workspaces

cd micro-front && npm list @d0c/cr1bl3-lib
# Shows @d0c/cr1bl3-lib installed in micro-front
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Module not found | `npm install` from root |
| Workspace not linked | Clear `node_modules`, run `npm install` |
| Port 5173 in use | `CR1BL3_PORT=3000 npm run dev` |
| WebSocket failed | Ensure dev server running on 2702 |

---

## 📞 Next Steps

1. **Verify workspace**: `npm list`
2. **Install deps**: `npm install`
3. **Start dev**: `npm run dev`
4. **Test**: `npm run test:crash`
5. **Build**: `npm run build`

---

**K0SM0S Workspace v1.0**  
**Status**: ✅ Configured & Ready  
**Framework**: cr1bl3 (npm workspaces)  
**Components**: 209 consolidated  

Created: 2024-04-24
