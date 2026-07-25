# Portfolio Images Guide

## How to Add Custom Images to Projects

The Portfolio component now supports manual image specification directly in `src/assets/masonry.json`.

### Method 1: Add image to entire project

All variants of a project will use this image unless overridden:

```json
{
  "id": "my-project",
  "name": "My Project",
  "category": "app",
  "description": "Project description",
  "variants": [...],
  "thumbnail": "https://...",
  "image": "/project/MY_PROJECT.png",
  "tags": ["vue", "firebase"],
  "status": "active"
}
```

### Method 2: Add image per variant

Override the project image for specific variants:

```json
{
  "id": "my-project",
  "name": "My Project",
  "category": "app",
  "variants": [
    {
      "env": "prod",
      "projectId": "my-project-prod",
      "url": "https://my-project-prod.web.app",
      "image": "/project/MY_PROJECT_v1.png"
    },
    {
      "env": "alt",
      "projectId": "my-project-alt",
      "url": "https://my-project-alt.web.app",
      "image": "/project/MY_PROJECT_v2.png"
    }
  ],
  "image": "/project/MY_PROJECT.png"
}
```

### Method 3: Automatic mapping (legacy)

If no custom image is specified, the component falls back to automatic mapping in `getProjectImage()`:

```javascript
const imageMap = {
  'b01': '/project/FULL.png',
  'chope': '/project/SH0P.png',
  'g4l4xound': '/project/THORUS.png',
  // ... more mappings
}
```

### Priority Order

The component uses this priority order for images:

1. **Variant image** - `variant.image` (highest priority)
2. **Project image** - `project.image`
3. **Automatic mapping** - `imageMap[projectId]`
4. **Fallback** - `project.screenshot` or `project.thumbnail`

### File Location

Store your carousel images in `/public/project/` directory:

```
/public/project/
├── FULL.png
├── SH0P.png
├── THORUS.png
├── PORTFOLIO.png
├── ELIHPOEHT.png
├── JH4CK.png
└── ...
```

### Example: Add image to a new project

```json
{
  "id": "my-awesome-project",
  "name": "My Awesome Project",
  "category": "creative",
  "description": "An amazing creative project",
  "variants": [
    {
      "env": "main",
      "projectId": "my-awesome-prod",
      "url": "https://my-awesome.web.app"
    }
  ],
  "thumbnail": "https://image.thum.io/get/width/800/crop/800/fullpage/https://my-awesome.web.app",
  "image": "/project/MY_AWESOME.png",
  "tags": ["creative", "art"],
  "status": "active"
}
```

## Component Features (Quasar Flavor)

The Portfolio component is now Quasar-flavored with:

- **QBtn** for filter buttons (Category & Tags)
- **QCard** for carousel container
- **QImg** for project images
- **QChip** for tags (with removable option)
- **QBadge** for category badge
- **QLinearProgress** for filtering progress indicator
- **QLinearProgress** showing filter results

## Carousel Controls

- **Drag/Swipe**: Click and drag left/right to navigate
- **Dots**: Click any dot to jump to that project
- **Arrow buttons**: Navigate previous/next
- **Filter buttons**: Click to filter by category or tags
