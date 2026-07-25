# K0SM0S Workspace Setup

## NPM Workspace Configuration

The K0SM0S project is now configured as an **npm workspace** with cr1bl3 as the main framework.

### Structure

```
K0sm0s/ (root workspace)
├── package.json                    (workspace definition)
├── .npmrc                          (npm config)
├── cr1bl3/                         (framework workspace)
│   ├── package.json
│   └── @d0c/
│       ├── cr1bl3-cli/            (Build tools)
│       └── cr1bl3-lib/            (Core framework)
└── micro-front/                    (Application)
    ├── package.json               (uses workspace:* protocol)
    └── src/
```

### Workspace Packages

#### Root (`@d0c/k0sm0s`)
- Defines workspace structure
- Provides convenience scripts
- Manages dependencies across workspaces

#### cr1bl3 (`@d0c/cr1bl3`)
- **@d0c/cr1bl3-cli** - Build tools, dev server, bundler
- **@d0c/cr1bl3-lib** - Core framework (Router, components, Three.js)

#### micro-front (`@d0c/micro-front`)
- Application using cr1bl3
- Consolidates pl4n3t, galax0und, m00vies-front
- Entry point: `src/main.js`

---

## Installation

### From Root Directory

```bash
# Navigate to K0sm0s root
cd /Users/d0c/Desktop/K0sm0s

# Install all workspace dependencies
npm install
```

This automatically:
- Installs root dependencies
- Installs cr1bl3 packages
- Links micro-front to cr1bl3 (workspace:* protocol)
- Sets up node_modules correctly

### Verify Installation

```bash
npm list -w @d0c/micro-front @d0c/cr1bl3-lib
```

Should show micro-front → @d0c/cr1bl3-lib linked.

---

## Running the Application

### From Root (Recommended)

```bash
# Start dev server
npm run dev

# Or from micro-front directory
cd micro-front
npm run dev

# Both open: http://localhost:5173
```

### Workspace Scripts

Run any script from root using workspace flag:

```bash
npm -w micro-front run dev        # Dev server
npm -w micro-front run build      # Build
npm -w micro-front run test:crash # Crash test
```

Or from micro-front directory:

```bash
cd micro-front
npm run dev
npm run build
npm run test:crash
```

---

## Importing Between Workspaces

### In micro-front, import from cr1bl3:

```javascript
// ✅ Correct - using workspace package names
import { cr1bl3 } from '@d0c/cr1bl3-lib';
import { Router } from '@d0c/cr1bl3-lib/Router.js';

// ✅ Also correct - relative to workspace root
import router from '@d0c/cr1bl3-lib/Router.js';
```

### In src files:

```javascript
// main.js
import { cr1bl3 } from '@d0c/cr1bl3-lib';
import { createRouter } from './router.js';
import { PlanetBridge } from './integration/PlanetBridge.js';
```

### External imports (outside workspace):

```javascript
// If someone installs @d0c/micro-front
import app from '@d0c/micro-front/src/main.js';
```

---

## Workspace Protocol

The `workspace:*` protocol in micro-front's package.json means:

```json
{
  "dependencies": {
    "@d0c/cr1bl3-lib": "workspace:*",
    "@d0c/cr1bl3-cli": "workspace:*"
  }
}
```

This tells npm:
- Resolve from local workspace
- Not from npm registry
- Always use the local version
- No version constraints

### Workspace Specifiers

| Specifier | Meaning |
|-----------|---------|
| `workspace:*` | Any version in workspace |
| `workspace:^1.0.0` | Compatible with 1.0.0 |
| `workspace:~1.2.0` | Patch-level compatible |
| `workspace:1.0.0` | Exact match required |

---

## Dependencies

### Root package.json
- Empty (workspaces don't inherit)
- Only defines workspace structure

### cr1bl3 package.json
- Contains cr1bl3 framework dependencies
- Shared by cli and lib

### micro-front package.json
- Depends on cr1bl3 packages (workspace:*)
- Application-specific deps:
  - three (Three.js)
  - vue (Vue 3)
  - vue-router
  - gsap (animations)

---

## Linking & Publishing

### Local Development (No Publishing Needed)

Workspace automatically links packages:

```bash
# Inside micro-front node_modules
node_modules/@d0c/cr1bl3-lib → ../../../cr1bl3/@d0c/cr1bl3-lib

# Direct file access
import { cr1bl3 } from '@d0c/cr1bl3-lib'
# Resolves to: cr1bl3/@d0c/cr1bl3-lib/index.js
```

### Publishing to npm (Future)

```bash
# From root
npm publish -w @d0c/cr1bl3-lib
npm publish -w @d0c/cr1bl3-cli
npm publish -w @d0c/micro-front
```

After publishing, external users would install:

```bash
npm install @d0c/cr1bl3-lib @d0c/micro-front
```

---

## Troubleshooting

### "Cannot find module '@d0c/cr1bl3-lib'"

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "workspace:* not resolved"

Make sure `package.json` has correct workspace paths:

```bash
npm ls -w
# Should list all workspaces
```

### Dependencies not updating

```bash
# Update specific workspace
npm install -w @d0c/cr1bl3-lib

# Or from that workspace
cd cr1bl3/@d0c/cr1bl3-lib
npm install
```

### Port 2702 already in use

```bash
# Find process using port
lsof -i :2702

# Or use different port
CR1BL3_WS_PORT=2703 npm run dev
```

---

## Workflow

### Development Cycle

```bash
# 1. From root, start dev server
npm run dev

# 2. Opens http://localhost:5173

# 3. Edit files in micro-front/src/
# Hot reload via WebSocket

# 4. Test crash page
# http://localhost:5173/src/zebpage.html

# 5. Build when ready
npm run build
# Output: micro-front/dist/
```

### Adding New Dependencies

```bash
# Add to micro-front
cd micro-front
npm install some-package

# Or from root
npm -w micro-front install some-package

# Add to cr1bl3
cd cr1bl3
npm install some-package
```

### Updating Workspace Packages

```bash
# Update all workspaces
npm update

# Update specific workspace
npm update -w @d0c/cr1bl3-lib

# Check outdated
npm outdated
```

---

## Configuration Files

### package.json (Root)

Defines workspaces and convenience scripts:

```json
{
  "workspaces": [
    "cr1bl3/@d0c/cr1bl3-cli",
    "cr1bl3/@d0c/cr1bl3-lib",
    "micro-front"
  ],
  "scripts": {
    "dev": "npm -w micro-front run dev",
    "build": "npm -w micro-front run build",
    "setup": "npm install && npm run dev"
  }
}
```

### package.json (micro-front)

Uses workspace protocol:

```json
{
  "dependencies": {
    "@d0c/cr1bl3-lib": "workspace:*",
    "@d0c/cr1bl3-cli": "workspace:*"
  }
}
```

### .npmrc

Workspace and peer dependency settings:

```
node-linker=hoisted
auto-install-peers=true
strict-peer-dependencies=false
legacy-peer-deps=true
```

---

## Advanced Topics

### Monorepo vs Workspace

This is a **monorepo** (multiple packages in one repo) managed as an **npm workspace** (not yarn/lerna).

Advantages:
- Single `node_modules` tree (faster installs)
- Easy cross-workspace imports
- Simplified CI/CD
- Standard npm (no extra tools)

### Private Workspaces

Set `"private": true` in workspaces you don't publish:

```json
{
  "name": "@d0c/micro-front",
  "private": true
}
```

This prevents accidental publishing.

### Peer Dependencies

cr1bl3 might declare peer deps:

```json
{
  "peerDependencies": {
    "three": "^r150"
  }
}
```

micro-front must install them too. Both do, so it works.

---

## Next Steps

1. **Verify workspace setup**
   ```bash
   npm ls
   ```

2. **Start developing**
   ```bash
   npm run dev
   ```

3. **Run crash test**
   ```bash
   npm run test:crash
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## Resources

- [npm Workspaces Docs](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [npm workspace: protocol](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#workspaces)
- K0SM0S micro-front: `./micro-front/README.md`
- cr1bl3 framework: `./cr1bl3/README.md`

---

**Created**: 2024-04-24  
**Workspace**: @d0c/k0sm0s  
**Main Entry**: @d0c/micro-front → @d0c/cr1bl3-lib  
**Status**: ✅ Ready
