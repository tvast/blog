# π DJ

> Audio-reactive 3D generative visualization from **ai-premium.studio** suite

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5+-blue.svg)](https://vuejs.org/)
[![Quasar](https://img.shields.io/badge/Quasar-2.20+-orange.svg)](https://quasar.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-184+-purple.svg)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎵 Features

### Core Visualization
- **Audio-Reactive 3D**: Real-time response to microphone input or audio files
- **Sinusoidal Parameter Modulation**: Smooth, autonomous animation evolution
- **Dual Rendering Modes**:
  - 3D Shader-based visualization (plasma, vortex, crystal, fire)
  - ASCII art scenes (donut, matrix, plasma, waves, starfield, life)

### Audio System
- 🎤 **Live Microphone Input**: Real-time frequency analysis
- 📁 **Clips Folder Auto-Loop**: Automatically play all audio files in sequence
- 📊 **Audio Meters**: Visual frequency spectrum (low, mid, high, RMS)
- 💾 **Local Storage**: Remember clip folder selection

### User Interface
- 🎨 **π Branding**: Tomato-red tomato logo with purple accents
- 🎛️ **Interactive studio dock**: Control visualizations, load audio, toggle fullscreen
- 📱 **Responsive Design**: Works on desktop and mobile
- ⌨️ **Keyboard Control**: Press `H` to toggle the studio

### Technical Features
- ✨ **Cross-Platform**: Electron (macOS, Windows, Linux) + Web
- 🎯 **High Performance**: GPU-accelerated WebGL rendering
- 🔧 **Modular Architecture**: Vue 3 Composition API, Pinia store
- 📦 **Icon Generation**: Icon-genie for all platform icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Electron (for desktop app)

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/π-dj.git
cd π-dj

# Install dependencies
npm install

# Run development server (Electron)
npm run dev:electron

# Or run web version
npm run dev

# Build for production
npm run build

# Build Electron app
npm run build:electron
```

### First Run
1. **Launch the app** — π DJ opens with 3D visualization
2. **Load Audio** — Click "CLIPS" button to select an audio folder
3. **Start Playing** — Audio auto-loops, visualization reacts
4. **Explore Scenes** — Use the dock tabs to switch visualizations
5. **Toggle the studio** — Press `H` or click the logo to show/hide controls

## 📋 Architecture

### Project Structure

```
π-dj/
├── src/
│   ├── components/
│   │   └── AsciiCanvas.vue        # Main 3D visualization + studio dock
│   ├── scenes/
│   │   ├── donut.js               # ASCII donut
│   │   ├── matrix.js              # Matrix rain
│   │   ├── plasma.js              # Plasma field
│   │   ├── waves.js               # Ripple waves
│   │   ├── starfield.js           # Warp-speed stars
│   │   └── life.js                # Conway's Life
│   ├── layouts/
│   │   └── MainLayout.vue         # App layout wrapper
│   ├── pages/
│   │   ├── IndexPage.vue          # Main page
│   │   └── ErrorNotFound.vue      # 404 page
│   ├── stores/
│   │   └── config.js              # Pinia config store
│   ├── router/
│   │   ├── index.js               # Router setup
│   │   └── routes.js              # Route definitions
│   ├── App.vue                    # Root component
│   ├── main.js                    # App entry point
│   └── css/
│       └── app.scss               # Global styles
├── src-electron/
│   ├── electron-main.js           # Electron main process
│   └── electron-preload.js        # Preload script
├── public/
│   ├── favicon.ico                # App favicon
│   ├── icons/                     # Various favicon sizes
│   └── logo-pi-tomato.png         # Brand logo
├── index.html                     # HTML entry point
├── package.json                   # Dependencies & scripts
├── quasar.config.js               # Quasar framework config
└── README.md                      # This file
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Vue 3 + Composition API |
| **State Management** | Pinia |
| **Build Tool** | Vite (via Quasar) |
| **3D Graphics** | Three.js |
| **Shader System** | GLSL |
| **Desktop App** | Electron |
| **CSS Framework** | Quasar (Material Design) |
| **Audio Analysis** | Web Audio API |

## 🎮 Controls

### Studio Dock Controls
- **MIC**: Toggle microphone input
- **LOAD**: Select single audio file
- **CLIPS**: Select folder for auto-looping
- **FULL**: Toggle fullscreen mode
- **3D Visualization**: Choose shader mode (Plasma/Vortex/Crystal/Fire)
- **ASCII Scenes**: Choose ASCII art animation

### Keyboard Shortcuts
- `H` — Toggle studio visibility
- `Esc` — Close the studio or exit fullscreen
- `F11` — Toggle browser fullscreen

### Audio Meters
- **LOW**: Sub-bass frequency response (0-256 Hz)
- **MID**: Mid-range frequency response (256-2048 Hz)
- **HI**: High-frequency response (2048+ Hz)
- **RMS**: Overall energy/volume

## 🎨 Customization

### Change Brand Colors

Edit `quasar.config.js`:
```javascript
framework: {
  config: {
    brand: {
      primary: '#ff694d',      // Tomato red
      secondary: '#b5a7ff',    // Purple
      accent: '#ff8f7a'        // Coral
    }
  }
}
```

### Modify Shader Parameters

Edit `src/components/AsciiCanvas.vue` `VisualizationShaders` class:
```javascript
getPaletteShift() {
  return (Math.sin(this.time * 0.15) + 1) * 2  // Adjust frequency
}
```

### Add New ASCII Scenes

Create new file in `src/scenes/` following the scene template:
```javascript
export default {
  id: 'myScene',
  label: 'My Scene',
  defaults: { param1: 0.5 },
  controls: [
    { key: 'param1', label: 'Parameter', type: 'slider', min: 0, max: 1 }
  ],
  create() {
    return {
      render({ cols, rows, t, params, charset }) {
        // Return ASCII art string
      }
    }
  }
}
```

## 🌐 GitHub Pages Deployment

### Step 1: Create GitHub Repository

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: π DJ audio-reactive visualization"

# Create repo on GitHub at github.com/YOUR_USERNAME/π-dj
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/π-dj.git
git branch -M main
git push -u origin main
```

### Step 2: Configure for GitHub Pages

The web version can be deployed to GitHub Pages (note: audio input requires HTTPS).

**Option A: GitHub Actions (Recommended)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build for production
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/spa
```

**Option B: Manual Deployment**

```bash
# Build production bundle
npm run build

# Deploy dist/spa folder to GitHub Pages
# Settings → Pages → Source: Deploy from branch
```

### Step 3: Enable GitHub Pages

1. Go to **Settings → Pages**
2. **Source**: Select "Deploy from a branch"
3. **Branch**: Select `main`, folder `/` (after moving build output)
4. Click **Save**

Your site will be available at:
- `https://YOUR_USERNAME.github.io/π-dj`

## 📱 Hosting Options

### Web Hosting (GitHub Pages)
- ✅ Free hosting
- ✅ Automatic HTTPS
- ⚠️ Microphone requires HTTPS (use file upload instead)
- ⚠️ Static hosting only

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist/spa
```

### Docker (Self-hosted)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/spa ./dist/spa
EXPOSE 3000
CMD ["npx", "http-server", "dist/spa", "-p", "3000"]
```

## 🔧 Development

### Code Quality

```bash
# Build and verify
npm run build

# Test production build locally
npx serve -s dist/spa
```

### Build Targets

```bash
# SPA (web)
npm run build

# Electron (desktop)
npm run build:electron

# Both
npm run build && npm run build:electron
```

## 📊 Performance

### Optimization Tips

1. **Reduce Audio Processing**: Adjust FFT size in `AsciiCanvas.vue`
2. **Lower Frame Rate**: Adjust requestAnimationFrame frequency
3. **Simplify Shaders**: Remove expensive computations

## 🐛 Troubleshooting

### Microphone Not Working
- Check browser permissions
- Ensure HTTPS (required for microphone access)
- Try audio file upload instead

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .quasar
npm install
npm run build
```

### Electron App Won't Launch
```bash
npm rebuild
npm run dev:electron
```

## 📚 Resources

- [Quasar Documentation](https://quasar.dev/)
- [Vue 3 Guide](https://vuejs.org/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

## 📄 License

MIT License — See LICENSE file for details

## 👤 Author

**Theophile Vast** — ai-premium.studio

- Email: theophile.vast@gmail.com

---

**π DJ** — Where audio meets generative art. 🍅✨

Made with ❤️ from ai-premium.studio
