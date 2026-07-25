# CR1BL3 🍩

A lightweight frontend framework with dynamic auto-import components, Three.js integration, and a funky CLI dev server.

## Project Structure

```
CR1BL3/
├── cr1bl3-cli/          # Build tools and dev server
├── cr1bl3-lib/          # Framework and components
├── src/                 # Your application code
│   └── _save.js         # App entry point
├── public/              # Static files
│   └── index.html       # HTML template
└── dist/                # Built output
```

## Quick Start

### From Root Directory

```bash
# Install dependencies
yarn install

# 🚀 PRO MODE - Start dev server with interactive CLI
yarn dev

# Interactive commands available:
cr1bl3 ❯ status    # Show server status
cr1bl3 ❯ reload    # Trigger hot reload
cr1bl3 ❯ open      # Open browser
cr1bl3 ❯ help      # Show all commands

# 🍩 Start with funky ASCII donut animation
yarn dev:animate

# 📦 Build for production
yarn build

# 💡 Show help
yarn help

# 🎨 Just the animation
yarn animate
```

## Development

The CLI will automatically:
- ✅ Detect `src/_save.js` as entry point
- 🔥 Hot reload on file changes
- 📦 Bundle with esbuild
- 🌐 Serve on http://localhost:2702
- 🎨 Beautiful Dracula-themed terminal output
- 💬 Interactive command prompt

## 🚀 PRO MODE - Router Integration

The example app (`src/_save.js`) demonstrates full router integration:

### Features:
- 🎯 **Client-side routing** with CR1BL3 Router
- 🔄 **Lazy-loaded components** for performance
- 🎨 **Dracula-themed UI** with smooth transitions
- 🔥 **Hot reload** - changes reflect instantly
- 📍 **Browser history** support with back/forward buttons

### How It Works:

```javascript
import { cr1bl3 } from '../cr1bl3-lib/_save.js';
import Router from '../cr1bl3-lib/Router.js';

// Initialize framework
const app = new cr1bl3({
  colors: { primary: '#bd93f9' }
});

// Initialize Router with routes
await Router.loadComponents();  // Registers /, /about, /hero
Router.setupLinkNavigation();   // Click handling
Router.handlePopState();         // Browser back/forward

// Navigate programmatically
await Router.navigate('/about');
```

### Available Routes:
- **/** - Home page component
- **/about** - About page component
- **/hero** - Hero component

Click the navigation links to see instant component switching!

## Available Components

From `cr1bl3-lib/components/`:
- `H0m3` - Home page component
- `H3R0` - Hero component
- `About` - About page
- `NavBar` - Navigation bar
- `Menu` - Menu component
- `Title` - Title component
- `Content` - Content component

## CLI Commands

```bash
yarn dev              # Start dev server
yarn dev:animate      # Start with ASCII animation
yarn build            # Build for production
yarn animate          # Show animation only
yarn help             # Show help
```

## Features

### Framework (cr1bl3-lib)
- 🎨 Utility CSS classes (margins, padding)
- 🔄 Dynamic component loading
- 🎭 Routing with Router
- 🎮 Three.js integration
- 📱 Responsive utilities

### CLI (cr1bl3-cli)
- ⚡ Lightning-fast esbuild
- 🔥 Hot module reload
- 🎨 Dracula theme terminal output
- 🍩 ASCII donut animation
- 📡 WebSocket live reload
- 📦 Production builds

## Configuration

Create `cr1bl3.config.json` in root:
```json
{
  "entry": "src/_save.js",
  "port": 2702,
  "dist": "dist",
  "public": "public"
}
```

## Publishing

```bash
# Publish library
yarn publish:lib

# Publish CLI
yarn publish:cli

# Publish both
yarn publish:all
```

## Made by d0c 🍩

Built with ❤️ and 🍩
