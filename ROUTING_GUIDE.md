# Blog Routing & Content Rendering Guide

## Architecture Overview

The blog uses Gatsby's dynamic page generation to create pages from markdown files and provides full routing with integrated UI components.

## File Structure

```
/blog
├── gatsby-node.js                    # Page generation logic
├── gatsby-config.js                  # Gatsby configuration
├── content/posts/                    # Markdown content
│   ├── begining/
│   ├── developer_knowledge/
│   ├── Goodbye_for_loop/
│   ├── moving_to_amadeus/
│   └── redesign_transport_order_monitoring_app/
├── src/
│   ├── pages/
│   │   ├── index.js                 # Home page with all posts
│   │   ├── about.js                 # About page
│   │   └── contact.js               # Contact page
│   ├── templates/
│   │   └── blog-post.js             # Individual post template
│   └── gatsby-theme-blog/
│       └── components/              # Reusable UI components
```

## How It Works

### 1. Page Generation (`gatsby-node.js`)

```javascript
exports.onCreateNode = ({ node, getNode, actions })
// Creates slug fields for each markdown file

exports.createPages = async ({ graphql, actions })
// Queries all markdown files and creates pages dynamically
```

**Flow:**
1. Gatsby reads markdown files from `content/posts/`
2. `onCreateNode` hook creates slug fields (e.g., `/begining/`)
3. `createPages` hook queries all posts and creates a page for each
4. Each page uses `blog-post.js` template
5. Home, About, and Contact pages are created from `/src/pages/`

### 2. Routing Structure

#### Static Routes
- `/` → Home page (lists all posts)
- `/about` → About page
- `/contact` → Contact page

#### Dynamic Routes
- `/begining/` → Blog post
- `/developer-knowledge/` → Blog post
- `/redesign-transport-order-monitoring-app/` → Blog post
- `/a-new-challenge/` → Blog post
- `/goodbye-for-loop/` → Blog post

### 3. Content Rendering

#### Home Page (`src/pages/index.js`)
1. Queries all markdown files with GraphQL
2. Renders `PostCard` components in a grid
3. Shows post title, date, excerpt
4. Links to individual post pages

```graphql
query {
  allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
    edges {
      node {
        id
        excerpt
        fields { slug }
        frontmatter { date, title }
      }
    }
  }
}
```

#### Blog Post Page (`src/templates/blog-post.js`)
1. Receives `slug` from URL
2. Queries specific markdown file
3. Renders full article with:
   - Title and date
   - HTML content (from markdown)
   - Author info
   - Back to articles link
   - Tags (if present in frontmatter)

```graphql
query ($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter { title, date, tags }
  }
}
```

### 4. Component Integration

#### Header
- Uses `Link` from Gatsby for home navigation
- Contains responsive Navigation component
- Sticky positioning

#### Navigation
- Main menu items (Home, About, Contact)
- Uses `Link` for client-side routing
- Mobile hamburger menu

#### Sidebar Menu
- Shows all articles in submenu
- Expands/collapses with state
- Uses `Link` for navigation
- Sticky positioning

#### Post Card
- Links to individual posts
- Shows title, date, excerpt, icon
- Hover effects and animations

#### Footer
- Quick links to main pages
- Social media links
- Uses `Link` for internal navigation

## Markdown Frontmatter

Each markdown file should have YAML frontmatter:

```yaml
---
title: Article Title
date: 2019-07-03
tags: [tag1, tag2]  # Optional
---

Article content in markdown...
```

## Adding New Articles

1. Create new folder in `content/posts/`
2. Add markdown file with frontmatter
3. Run `gatsby develop` to regenerate pages
4. New post automatically appears on home page

Example:
```
content/posts/
├── my-new-article/
│   └── index.md
```

## GraphQL Queries

### Get All Posts
```graphql
{
  allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
    edges {
      node {
        fields { slug }
        frontmatter { title, date }
      }
    }
  }
}
```

### Get Single Post
```graphql
{
  markdownRemark(fields: { slug: { eq: "/my-article/" } }) {
    html
    frontmatter { title, date, tags }
  }
}
```

## Navigation Flow

```
Header/Navigation
├── Home (/) → index.js
├── About (/about) → about.js
├── Contact (/contact) → contact.js
└── SidebarMenu
    └── Articles (submenu)
        ├── Article 1 (/article-1) → blog-post.js
        ├── Article 2 (/article-2) → blog-post.js
        └── Article N (/article-n) → blog-post.js
```

## Build Process

1. `gatsby develop` - Start dev server with hot reload
2. Gatsby runs `gatsby-node.js` hooks
3. Markdown files are transformed and pages created
4. React components render with theme-ui styling
5. Client-side navigation via Gatsby `Link` component

## Performance Notes

- Static site generation (SSG) for fast load times
- Pre-built pages for all content
- Client-side navigation with `Link` (no full page reload)
- CSS-in-JS with theme-ui for scoped styling
- Markdown parsing with `gatsby-transformer-remark`

## Customization

### Adding New Static Page
1. Create `src/pages/page-name.js`
2. Export React component
3. Automatic route: `/page-name`

### Changing Post URL Format
Edit `gatsby-node.js`:
```javascript
const slug = createFilePath({ 
  node, 
  getNode, 
  basePath: "posts",
  trailingSlash: false  // Remove trailing slash
})
```

### Custom Post Template
1. Update `src/templates/blog-post.js`
2. Modify GraphQL query
3. Changes apply to all posts
