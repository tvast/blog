# π DJ Icon Setup - Quick Start

Fast-track guide to set up application icons for Electron builds.

## ⚡ 2-Minute Setup

### 1. Install ImageMagick

```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows (with Chocolatey)
choco install imagemagick
```

### 2. Generate All Icons

```bash
npm run icons:generate
```

That's it! ✅

---

## 📁 What Gets Generated

The script creates:

```
src-electron/icons/
├── icon-16x16.png
├── icon-24x24.png
├── icon-32x32.png
├── icon-48x48.png
├── icon-64x64.png
├── icon-128x128.png
├── icon-256x256.png
├── icon-512x512.png
├── icon-1024x1024.png
├── icon.png (fallback)
├── icon.icns (macOS)
├── icon.ico (Windows)
└── README.md (documentation)
```

---

## 🚀 Build Electron Apps

Now you can build for any platform:

```bash
# macOS
npm run build:electron -- -m

# Windows
npm run build:electron -- -w

# Linux
npm run build:electron -- -l

# All platforms
npm run build:electron
```

---

## ❓ Troubleshooting

### ImageMagick not found
```bash
# Install it first
brew install imagemagick  # or apt-get install imagemagick
```

### Source image not found
```bash
# Use custom source image
npm run icons:generate:custom /path/to/logo.png
```

### Icons look blurry
- Source image must be 512x512 or larger
- Use `public/logo-pi-tomato.png` (1024x1024)

### .icns won't generate (macOS)
- Install Xcode command line tools: `xcode-select --install`
- Or use online converter: https://icoconvert.com

### .ico won't generate (Windows)
- Use online converter: https://icoconvert.com
- Or install ImageMagick properly

---

## 📊 File Sizes (Typical)

| File | Size |
|------|------|
| icon-16x16.png | ~1 KB |
| icon-32x32.png | ~3 KB |
| icon-64x64.png | ~5 KB |
| icon-128x128.png | ~8 KB |
| icon-256x256.png | ~15 KB |
| icon-512x512.png | ~35 KB |
| icon.icns | ~50 KB |
| icon.ico | ~45 KB |

---

## ✅ Verification

### Check icons were created:
```bash
ls -la src-electron/icons/
```

### Test on each platform:
1. **macOS**: Icon appears in Dock ✓
2. **Windows**: Icon shows in taskbar ✓
3. **Linux**: Icon in app launcher ✓

---

## 📚 More Info

- Full guide: [ICON_SETUP.md](ICON_SETUP.md)
- Electron docs: https://www.electronjs.org/docs
- electron-builder: https://www.electron.build/

---

## 🎯 Common Tasks

### Update icon from new source
```bash
npm run icons:generate:custom public/my-logo.png
```

### Use online icon converter (no ImageMagick)
1. Visit https://icoconvert.com
2. Upload `public/logo-pi-tomato.png`
3. Download all sizes
4. Place files in `src-electron/icons/`

### Add custom icon sizes
Edit `scripts/generate-icons.sh` and modify:
```bash
ICON_SIZES=(16 24 32 48 64 128 256 512 1024 2048)
```

---

**Done!** Your π DJ app now has professional icons across all platforms. 🍅✨
