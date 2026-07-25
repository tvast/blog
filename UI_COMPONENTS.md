# Blog UI Components

## Overview
The blog features a modern, modular React component architecture with responsive design and automatic menu generation from the blog folder structure.

## Component Structure

### `/src/gatsby-theme-blog/components/`

#### 1. **Header** (`header.js`)
- Sticky header with branding and navigation
- Responsive design with mobile/desktop variants
- Features:
  - Site title linking to home
  - Navigation menu with icons
  - Backdrop blur effect
  - Sticky positioning at top

#### 2. **Navigation** (`navigation.js`)
- Responsive navigation menu
- Features:
  - Desktop: Horizontal menu bar
  - Mobile: Hamburger toggle with dropdown
  - Dynamic menu items from `menuData.js`
  - Hover effects and transitions
  - Icon + text labels

#### 3. **Sidebar Menu** (`sidebar-menu.js`)
- Collapsible sidebar navigation
- Features:
  - Shows on desktop (768px+)
  - Expandable/collapsible submenus
  - Current page highlighting
  - Left border accent on submenu items
  - Smooth transitions and hover states

#### 4. **Post Card** (`post-card.js`)
- Reusable card component for displaying articles
- Features:
  - Icon display
  - Title with link
  - Formatted date
  - Excerpt text
  - "Read More" button with hover animation
  - Hover transform effect
  - Responsive padding

#### 5. **Footer** (`footer.js`)
- Full-width footer with multiple sections
- Features:
  - About section
  - Quick links
  - Social media links (Twitter, GitHub)
  - Copyright notice
  - Grid layout that's responsive
  - Circular social icons with hover effects

#### 6. **Layout** (`layout.js`)
- Main layout wrapper component
- Features:
  - Header at top
  - Sidebar navigation on desktop
  - Main content area
  - Footer at bottom
  - Flexbox layout for sticky footer
  - Responsive container widths

## Menu Data Structure

### `/src/utils/menuData.js`
Centralized menu configuration with automatic routing:

```javascript
menuItems = [
  {
    id: "home",
    title: "Home",
    path: "/",
    icon: "🏠",
  },
  {
    id: "posts",
    title: "Articles",
    path: "/",
    icon: "📚",
    submenu: [
      {
        title: "Article Title",
        path: "/article-slug",
        date: "2019-07-03",
        icon: "🚀",
      },
      // ... more articles
    ],
  },
  // ... more menu items
]
```

## Theming

### `/src/gatsby-theme-blog/gatsby-plugin-theme-ui/`

#### Colors Config (`colors.js`)
- **Light Mode:**
  - Primary: `#00d084` (Vibrant teal)
  - Secondary: `#6c5ce7` (Purple)
  - Accent: `#ff7675` (Coral)
  - Background: `#ffffff`
  - Text: `#1a1a1a`

- **Dark Mode:**
  - Background: `#0a0e27` (Dark navy)
  - Text: `#e8e8e8`
  - Primary: `#00d084` (Same teal)
  - Secondary: `#a78bfa` (Light purple)

#### Theme Config (`index.js`)
Complete theme-ui configuration including:
- Spacing scale (0-256px)
- Font stacks (Inter, Fira Code)
- Responsive breakpoints
- Font sizes, weights, and line heights
- Border radius scale
- Shadow depth scale
- Z-index scale
- Global styles for all HTML elements

## Responsive Design

### Breakpoints
- Mobile: 0px (default)
- Tablet: 640px
- Desktop: 768px
- Large Desktop: 1024px
- Extra Large: 1280px

### Layout Behavior
- **Mobile:** Full-width, header only
- **Tablet:** Header + single column content
- **Desktop:** Header + sidebar + content + footer
- **Large Desktop:** Maximum width container

## Key Features

### 1. Automatic Menu Generation
Menu items dynamically link to blog posts with:
- Emoji icons for visual appeal
- Post dates and paths
- Hierarchical structure (main menu + submenus)
- Active state highlighting

### 2. Responsive Components
All components use theme-ui's responsive array syntax:
```javascript
sx={{
  display: ["block", "none"],  // Mobile: block, Desktop: none
  fontSize: [14, 16, 18],       // Progressive sizing
}}
```

### 3. Accessibility
- Semantic HTML elements
- Proper link navigation
- Color contrast compliance
- Keyboard navigation support

### 4. Performance
- CSS-in-JS for scoped styling
- No unused CSS
- Optimized hover states
- Smooth transitions only where needed

## Color Usage Guidelines

### Primary (`#00d084`)
- Call-to-action buttons
- Links and interactive elements
- Accent borders and highlights

### Secondary (`#6c5ce7`)
- Headings
- Sidebar borders
- Important text emphasis

### Accent (`#ff7675`)
- Social hover states
- Warning/attention elements
- Hover effects on secondary elements

### Neutral Grays
- `muted`: Light backgrounds and borders
- `border`: Structural dividers
- Varying opacity for text hierarchy

## Customization

To customize colors, edit:
1. `/src/gatsby-theme-blog/gatsby-plugin-theme-ui/colors.js` - Color definitions
2. `/src/gatsby-theme-blog/gatsby-plugin-theme-ui/index.js` - Theme-wide styling

To customize menu items, edit:
1. `/src/utils/menuData.js` - Menu structure and links

To customize component styling, edit individual component files in:
1. `/src/gatsby-theme-blog/components/` - Individual component sx props
