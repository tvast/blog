# π DJ Icon Setup & Mapping Guide

Complete guide for generating and configuring icons for the Electron desktop application.

## Table of Contents

1. [Icon Requirements](#icon-requirements)
2. [Icon Generation](#icon-generation)
3. [Icon Mapping](#icon-mapping)
4. [Platform-Specific Setup](#platform-specific-setup)
5. [Verification & Testing](#verification--testing)

---

## Icon Requirements

### Required Icon Sizes

| Size | Purpose | Platforms |
|------|---------|-----------|
| 16x16 | Menu bar, taskbar | macOS, Windows, Linux |
| 24x24 | Small toolbar | Windows, Linux |
| 32x32 | Taskbar | Windows, Linux |
| 48x48 | Window title bar | Windows, Linux |
| 64x64 | ALT-Tab switcher | Windows, Linux |
| 128x128 | App stores, folders | macOS, Windows, Linux |
| 256x256 | Installer, Finder | macOS, Windows |
| 512x512 | App stores | macOS, Windows |
| 1024x1024 | Source master | All |

### File Formats Required

| Format | Platform | Sizes |
|--------|----------|-------|
| `.icns` | macOS | 1024, 512, 256, 128, 64, 32, 16 |
| `.exe` | Windows Installer | Single resource |
| `.png` | Windows/Linux | Individual files |
| `.ico` | Windows | Standard icon file |

---

## Icon Generation

### Option 1: Using ImageMagick (Recommended)

**Installation:**
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows (using Chocolatey)
choco install imagemagick
```

**Generate PNG Icons from Source:**

```bash
#!/bin/bash
# Generate all PNG sizes from 1024x1024 master

SOURCE="public/logo-pi-tomato.png"
TARGET_DIR="src-electron/icons"

# Create target directory
mkdir -p "$TARGET_DIR"

# Generate PNG icons
convert "$SOURCE" -resize 16x16 "$TARGET_DIR/icon-16x16.png"
convert "$SOURCE" -resize 24x24 "$TARGET_DIR/icon-24x24.png"
convert "$SOURCE" -resize 32x32 "$TARGET_DIR/icon-32x32.png"
convert "$SOURCE" -resize 48x48 "$TARGET_DIR/icon-48x48.png"
convert "$SOURCE" -resize 64x64 "$TARGET_DIR/icon-64x64.png"
convert "$SOURCE" -resize 128x128 "$TARGET_DIR/icon-128x128.png"
convert "$SOURCE" -resize 256x256 "$TARGET_DIR/icon-256x256.png"
convert "$SOURCE" -resize 512x512 "$TARGET_DIR/icon-512x512.png"
convert "$SOURCE" -resize 1024x1024 "$TARGET_DIR/icon-1024x1024.png"

echo "✅ PNG icons generated"
```

### Option 2: Using Online Tool (Quick)

1. Visit [icoconvert.com](https://icoconvert.com)
2. Upload `public/logo-pi-tomato.png`
3. Select desired sizes
4. Download generated files
5. Place in `src-electron/icons/`

### Option 3: Using Python/Pillow

```python
#!/usr/bin/env python3
from PIL import Image
import os

SOURCE = "public/logo-pi-tomato.png"
TARGET_DIR = "src-electron/icons"

sizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024]

os.makedirs(TARGET_DIR, exist_ok=True)

img = Image.open(SOURCE)

for size in sizes:
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    filename = f"{TARGET_DIR}/icon-{size}x{size}.png"
    resized.save(filename)
    print(f"✅ Generated {filename}")

print("Done!")
```

---

## Icon Mapping

### Directory Structure

```
src-electron/
├── icons/
│   ├── icon.png                 # Generic fallback
│   ├── icon-16x16.png           # Taskbar/menu
│   ├── icon-24x24.png           # Small UI
│   ├── icon-32x32.png           # Standard
│   ├── icon-48x48.png           # Window title
│   ├── icon-64x64.png           # ALT-Tab
│   ├── icon-128x128.png         # App folders
│   ├── icon-256x256.png         # Finder/Explorer
│   ├── icon-512x512.png         # High-res
│   ├── icon-1024x1024.png       # Master source
│   ├── icon.icns                # macOS (generated)
│   ├── icon.ico                 # Windows (generated)
│   └── icon.svg                 # Vector (optional)
└── electron-main.ts            # Main process config
```

### Electron Configuration

**File:** `src-electron/electron-main.ts`

```typescript
import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'

const iconPath = path.join(__dirname, 'icons', 'icon.png')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    
    // Icon mapping
    icon: iconPath,  // Linux & Windows
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: false
    }
  })

  if (process.env.DEV) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    win.loadURL(`file://${path.join(__dirname, '../www/index.html')}`)
  }

  return win
}

app.on('ready', () => {
  createWindow()
  
  // Create application menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'π DJ',
      submenu: [
        {
          label: 'About',
          click: () => {
            // Show about dialog
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  ])
  
  Menu.setApplicationMenu(menu)
})
```

---

## Platform-Specific Setup

### macOS (.icns)

**Generate .icns from PNG:**

```bash
# Using ImageMagick
convert icon-1024x1024.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.icns

# Or using Icon Composer (included with Xcode)
# Open icon-1024x1024.png and export as .icns
```

**Configuration in `electron-builder.json`:**

```json
{
  "mac": {
    "icon": "src-electron/icons/icon.icns",
    "category": "public.app-category.utilities",
    "target": ["dmg", "zip"]
  }
}
```

**Build:**
```bash
npm run build:electron -- -m
```

### Windows (.ico)

**Generate .ico from PNG:**

```bash
# Using ImageMagick
convert icon-256x256.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico

# Or online: icoconvert.com
```

**Configuration in `electron-builder.json`:**

```json
{
  "win": {
    "icon": "src-electron/icons/icon.ico",
    "certificateFile": null,
    "certificatePassword": null,
    "signingHashAlgorithms": ["sha256"]
  },
  "nsis": {
    "installerIcon": "src-electron/icons/icon.ico",
    "uninstallerIcon": "src-electron/icons/icon.ico",
    "installerHeaderIcon": "src-electron/icons/icon.ico"
  }
}
```

**Build:**
```bash
npm run build:electron -- -w
```

### Linux (.png)

**No conversion needed, use PNG directly:**

```json
{
  "linux": {
    "icon": "src-electron/icons/icon.png",
    "category": "Utility",
    "target": ["AppImage", "deb"]
  }
}
```

**Build:**
```bash
npm run build:electron -- -l
```

---

## Complete Build Configuration

**File:** `electron-builder.json` (in project root)

```json
{
  "appId": "studio.aipremium.πdj",
  "productName": "π DJ",
  "directories": {
    "output": "dist/electron",
    "buildResources": "src-electron/icons"
  },

  "files": [
    "dist/electron/**/*",
    "node_modules/**/*"
  ],

  "extraMetadata": {
    "name": "π-dj"
  },

  "mac": {
    "icon": "src-electron/icons/icon.icns",
    "category": "public.app-category.utilities",
    "target": ["dmg", "zip"],
    "artifactName": "${productName}-${version}-${arch}.${ext}"
  },

  "dmg": {
    "contents": [
      {
        "x": 110,
        "y": 150,
        "type": "file"
      },
      {
        "x": 240,
        "y": 150,
        "type": "link",
        "path": "/Applications"
      }
    ]
  },

  "win": {
    "icon": "src-electron/icons/icon.ico",
    "target": ["nsis", "portable", "msi"],
    "artifactName": "${productName}-${version}-${arch}.${ext}"
  },

  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "π DJ",
    "installerIcon": "src-electron/icons/icon.ico",
    "uninstallerIcon": "src-electron/icons/icon.ico",
    "installerHeaderIcon": "src-electron/icons/icon.ico"
  },

  "linux": {
    "icon": "src-electron/icons/icon.png",
    "category": "Utility",
    "target": ["AppImage", "deb"],
    "artifactName": "${productName}-${version}-${arch}.${ext}"
  },

  "deb": {
    "depends": ["libappindicator1", "libnotify-bin"]
  }
}
```

---

## Icon Verification & Testing

### Checklist

- ✅ All PNG sizes created (16-1024px)
- ✅ `.icns` generated for macOS
- ✅ `.ico` generated for Windows
- ✅ Icons placed in `src-electron/icons/`
- ✅ `electron-builder.json` configured
- ✅ Icon paths in `electron-main.ts` correct

### Testing on Each Platform

**macOS:**
```bash
npm run build:electron -- -m
# Check: Application icon in Dock
# Check: Icon in /Applications folder
# Check: Menubar icon visible
```

**Windows:**
```bash
npm run build:electron -- -w
# Check: Desktop shortcut icon
# Check: Taskbar icon
# Check: Start Menu icon
# Check: ALT-Tab preview
```

**Linux:**
```bash
npm run build:electron -- -l
# Check: Application launcher icon
# Check: Taskbar icon
# Check: File manager icons
```

### Visual Verification

1. **Taskbar/Dock** — Icon should be crisp, not pixelated
2. **File Manager** — Icon should display correctly in folders
3. **High DPI** — On Retina/4K displays, should remain sharp
4. **Dark Mode** — Icon should be visible in light and dark themes
5. **Scaling** — Icon should look good at various sizes

---

## Icon Requirements Summary

### Minimum Icon Set

For basic functionality, you need:

```
src-electron/icons/
├── icon.png          # Fallback (any size, 512x512+ recommended)
├── icon.icns         # macOS (required for macOS builds)
└── icon.ico          # Windows (required for Windows builds)
```

### Recommended Complete Set

For professional builds with all features:

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
├── icon.png          # Symlink to largest or composite
├── icon.icns         # macOS master
├── icon.ico          # Windows master
└── icon.svg          # Optional vector format
```

---

## Automated Icon Generation Script

**File:** `scripts/generate-icons.sh`

```bash
#!/bin/bash

set -e

SOURCE="${1:-public/logo-pi-tomato.png}"
TARGET_DIR="src-electron/icons"

if [ ! -f "$SOURCE" ]; then
  echo "❌ Source icon not found: $SOURCE"
  exit 1
fi

echo "🎨 Generating icons from $SOURCE..."
mkdir -p "$TARGET_DIR"

# PNG sizes
for size in 16 24 32 48 64 128 256 512 1024; do
  output="$TARGET_DIR/icon-${size}x${size}.png"
  convert "$SOURCE" -resize ${size}x${size} "$output"
  echo "✅ Generated $output"
done

# macOS .icns
echo "🍎 Generating macOS icon..."
convert "$SOURCE" -define icon:auto-resize=256,128,96,64,48,32,16 \
  "$TARGET_DIR/icon.icns" 2>/dev/null || \
  echo "⚠️  .icns generation skipped (install ImageMagick)"

# Windows .ico
echo "🪟 Generating Windows icon..."
convert "$SOURCE" -define icon:auto-resize=256,128,96,64,48,32,16 \
  "$TARGET_DIR/icon.ico" 2>/dev/null || \
  echo "⚠️  .ico generation skipped"

# Create fallback
cp "$TARGET_DIR/icon-512x512.png" "$TARGET_DIR/icon.png"
echo "✅ Created fallback icon"

echo "🎉 Icon generation complete!"
echo "📁 Icons available in: $TARGET_DIR"
```

**Usage:**
```bash
chmod +x scripts/generate-icons.sh
./scripts/generate-icons.sh public/logo-pi-tomato.png
```

---

## Platform Specific Notes

### macOS
- `.icns` format required for distribution
- Icon appears in Dock, Finder, and menus
- Support for High DPI (Retina) displays
- DMG package shows icon in installer

### Windows
- `.ico` format for executable
- Separate icons for installer (NSIS)
- Taskbar icon (16, 32, 48px most visible)
- ALT-Tab preview uses 64-128px version

### Linux
- PNG format standard
- AppImage uses icon from `.desktop` file
- Installer (.deb) includes icon metadata
- Desktop environment icons configurable

---

## Troubleshooting

### Icon Not Showing in Taskbar
**Solution:** Ensure 32x32 and 48x48 versions exist

### Blurry on High-DPI Displays
**Solution:** Generate from larger source (1024x1024+)

### macOS App Won't Launch
**Solution:** Verify `.icns` format valid with:
```bash
file icon.icns  # Should show: "icon.icns: MS Windows icon resource"
```

### Windows Build Fails
**Solution:** Verify `.ico` is valid Windows format:
```bash
file icon.ico
```

---

## Best Practices

✅ **Do:**
- Start with vector source (if possible)
- Generate from 1024x1024 or larger master
- Test on actual devices before distribution
- Include all recommended sizes
- Keep icon simple and recognizable at small sizes

❌ **Don't:**
- Upscale small icons
- Use compressed formats for source
- Skip platform-specific formats
- Ignore high-DPI requirements
- Use transparent backgrounds for executables

---

**Last Updated:** June 2026  
**Version:** 1.0.0
