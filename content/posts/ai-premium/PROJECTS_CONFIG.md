# 📋 Projects Configuration Guide

The portfolio now supports a flexible projects configuration system with both legacy and new projects.

## 📁 Project File Structure

```
src/
├── data/
│   └── projects.json          # New projects configuration
└── components/
    └── Portfolio.vue          # Imports and displays projects
```

## 🆕 New Projects Added

Four new projects have been added to the portfolio:

### 1. Knit0rdie
- **Name**: knit0rdie
- **URL**: https://knit0rdie.web.app/
- **Description**: Creative knitting and fiber arts community platform
- **Screenshot**: `screenshots/knit0rdie.png`

### 2. JH4CK.io
- **Name**: jh4ck-io
- **URL**: https://jh4ck-io.web.app/dashboard
- **Description**: Dashboard and analytics platform for security testing
- **Screenshot**: `screenshots/jh4ck-io.png`

### 3. Elihpoeht 2026
- **Name**: elihpoeht-2026
- **URL**: https://elihpoeht-2026.web.app/poems
- **Description**: Poetry collection and literary works showcase
- **Screenshot**: `screenshots/elihpoeht-2026.png`

### 4. Elihpoeht Art
- **Name**: elihpoeht-art
- **URL**: https://elihpoeht-art.web.app/
- **Description**: Visual art portfolio and creative gallery
- **Screenshot**: `screenshots/elihpoeht-art.png`

## 📝 Projects Configuration Format

### `src/data/projects.json`
```json
{
  "projects": [
    {
      "id": 11,
      "name": "knit0rdie",
      "url": "https://knit0rdie.web.app/",
      "path": "/",
      "screenshot": "screenshots/knit0rdie.png",
      "title": "Knit0rdie",
      "description": "Creative knitting and fiber arts community platform",
      "thumb": "screenshots/knit0rdie.png",
      "image": "screenshots/knit0rdie.png",
      "link": "https://knit0rdie.web.app/"
    }
    // ... more projects
  ],
  "generatedAt": "2026-04-15T00:00:00Z"
}
```

### Project Object Fields
| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier (11-14 for new projects) |
| `name` | string | Project slug/identifier |
| `url` | string | Live project URL |
| `path` | string | Path to append to domain |
| `screenshot` | string | Path to screenshot image |
| `title` | string | Display title in gallery |
| `description` | string | Short description of project |
| `thumb` | string | Thumbnail image path |
| `image` | string | Full-size image for modal |
| `link` | string | Clickable link for project |

## 🖼️ Adding Screenshots

To add screenshots for the new projects:

1. **Create screenshots directory**:
   ```bash
   mkdir -p public/screenshots
   ```

2. **Add screenshot images**:
   - `public/screenshots/knit0rdie.png` (800x600px recommended)
   - `public/screenshots/jh4ck-io.png`
   - `public/screenshots/elihpoeht-2026.png`
   - `public/screenshots/elihpoeht-art.png`

3. **Update paths in projects.json** if using different locations

## 📊 Project Organization

### Legacy Projects (IDs 1-10)
- Original portfolio projects
- Stored directly in `Portfolio.vue` component
- Maintained for backward compatibility

### New Projects (IDs 11-14)
- Loaded from `src/data/projects.json`
- Easy to update without modifying components
- Scalable for adding more projects

### Combined Display
All projects (legacy + new) are merged and displayed together in the gallery:
```javascript
const projects = ref([...legacyProjects, ...projectsData.projects])
```

## 🔧 Managing Projects

### Adding a New Project

1. **Add to `src/data/projects.json`**:
```json
{
  "id": 15,
  "name": "my-new-project",
  "url": "https://my-project.com/",
  "path": "/",
  "screenshot": "screenshots/my-new-project.png",
  "title": "My New Project",
  "description": "Description of your project",
  "thumb": "screenshots/my-new-project.png",
  "image": "screenshots/my-new-project.png",
  "link": "https://my-project.com/"
}
```

2. **Add screenshot** to `public/screenshots/`

3. **Update generatedAt** timestamp

### Updating a Project

Simply edit the corresponding project object in `src/data/projects.json`:
```json
{
  "id": 11,
  "title": "Updated Title",
  "description": "Updated description",
  "link": "https://new-url.com/"
}
```

### Removing a Project

Delete the project object from `src/data/projects.json` array.

## 🎨 Display in Portfolio

### In Gallery
Projects appear in the grid with:
- Thumbnail image
- Hover overlay showing "View Project"
- Title below thumbnail

### In Modal
Clicking a project shows:
- Full-size image
- Title and description
- "Visit Project →" link button

## 📱 Responsive Behavior

- **Desktop**: 3-4 projects per row
- **Tablet**: 2 projects per row
- **Mobile**: 1 project per row

Grid is responsive and auto-adjusts based on screen size.

## 💡 Best Practices

### Screenshot Guidelines
- **Size**: 800x600px or similar aspect ratio
- **Format**: PNG or JPG
- **Quality**: High quality, representative of the project
- **Naming**: Lowercase, hyphenated (e.g., `my-project.png`)

### Title Guidelines
- Keep titles concise (2-3 words)
- Use title case capitalization
- Make them descriptive

### Description Guidelines
- Keep descriptions brief (10-20 words)
- Highlight key features
- Use active voice

### URL Guidelines
- Use full URLs with protocol (https://)
- Test that links work before adding
- Update if URLs change

## 🔄 Project Data Flow

```
Portfolio.vue Component
  ↓
Imports from src/data/projects.json
  ↓
Merges with legacy projects array
  ↓
Renders in grid layout
  ↓
Click to open modal with details
  ↓
Click "Visit Project" to open link
```

## 📄 Example Complete Project

```json
{
  "id": 12,
  "name": "jh4ck-io",
  "url": "https://jh4ck-io.web.app/dashboard",
  "path": "/dashboard",
  "screenshot": "screenshots/jh4ck-io.png",
  "title": "JH4CK.io",
  "description": "Dashboard and analytics platform for security testing",
  "thumb": "screenshots/jh4ck-io.png",
  "image": "screenshots/jh4ck-io.png",
  "link": "https://jh4ck-io.web.app/dashboard"
}
```

## 🚀 Future Enhancements

Potential improvements to the project system:

- [ ] Add project tags/categories for filtering
- [ ] Add project dates (start/completion)
- [ ] Add team members/contributors
- [ ] Add technology stack tags
- [ ] Add GitHub repository links
- [ ] Add Figma/design links
- [ ] Add video demos
- [ ] Sort projects by date or category
- [ ] Search/filter functionality

## ✅ Checklist for New Projects

- [ ] Project data added to `projects.json`
- [ ] Screenshot image created (800x600px)
- [ ] Screenshot placed in `public/screenshots/`
- [ ] All URLs tested and working
- [ ] Description is concise and clear
- [ ] Title uses title case
- [ ] `generatedAt` timestamp updated
- [ ] Project displays correctly in gallery
- [ ] Modal opens and displays properly
- [ ] "Visit Project" link works

---

**Your portfolio now supports both legacy and modern project management! 🎯**
