# π DJ Application Icons

## Icon Files

### PNG Icons (Raster)
- `icon-16x16.png` — Taskbar, menu bar, small UI
- `icon-24x24.png` — Small toolbar icons
- `icon-32x32.png` — Standard taskbar, window icons
- `icon-48x48.png` — Window title bar, window decorations
- `icon-64x64.png` — ALT-Tab switcher, larger UI elements
- `icon-128x128.png` — Application folders, app stores
- `icon-256x256.png` — Finder/Explorer, installer
- `icon-512x512.png` — High-resolution displays, app stores
- `icon-1024x1024.png` — Master source icon
- `icon.png` — Fallback icon (symlink to 512x512)

### Platform-Specific Icons
- `icon.icns` — macOS application icon (required for macOS builds)
- `icon.ico` — Windows application icon (required for Windows builds)
- `icon.svg` — Vector icon (optional, for scalability)

### Favicon
- `favicon-32x32.png` — Favicon for web

## Usage

### In Electron Main Process
```typescript
import path from 'path'

const iconPath = path.join(__dirname, 'icons', 'icon.png')

const win = new BrowserWindow({
  icon: iconPath
})
```

### In electron-builder.json
```json
{
  "mac": { "icon": "src-electron/icons/icon.icns" },
  "win": { "icon": "src-electron/icons/icon.ico" },
  "linux": { "icon": "src-electron/icons/icon.png" }
}
```

## Platform Requirements

### macOS
- `icon.icns` — Required for distribution
- Supports all screen resolutions including Retina displays
- Used in Dock, Finder, menus, and installer

### Windows
- `icon.ico` — Required for executable
- `icon.png` sizes — For taskbar, shortcuts, folder icons
- Used in taskbar, Start Menu, ALT-Tab, file manager

### Linux
- `icon.png` sizes — Standard format
- Used in application launchers, taskbars, file managers

## Generation

To regenerate icons:
```bash
./scripts/generate-icons.sh public/logo-pi-tomato.png
```

## Quality Assurance

✅ Icons should be:
- Crisp and sharp at all sizes
- Clearly visible at small sizes (16x16, 32x32)
- Professional appearance
- Recognizable as π DJ branding
- Consistent across platforms

⚠️ Common issues:
- Blurry on Retina displays → Regenerate from larger source
- Platform-specific icons missing → Run generation script again
- Icon not showing → Verify electron-builder.json paths

---

**Generated:** $(date)
**Tool:** ImageMagick
**Source:** ../../../public/logo-pi-tomato.png
