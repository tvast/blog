# Markdown Rendering System

## Overview

Complete markdown rendering system with:
- **Syntax Highlighting**: Prism.js powered code blocks
- **Table of Contents**: Auto-generated from headings
- **Heading Anchors**: Click to link to sections
- **Markdown Validator**: Pre-publish validation
- **Preview Component**: Test rendering before publish

## Features

### 1. Syntax Highlighting

Code blocks are automatically highlighted with Prism.js:

````markdown
```javascript
// Your code here with syntax highlighting
const hello = "world"
```
````

**Supported Languages:**
- JavaScript/TypeScript
- Python
- HTML/CSS
- SQL
- Bash/Shell
- JSON
- And 100+ more

**Features:**
- Line numbers (enabled by default)
- Automatic language detection
- Inline code with basic styling

### 2. Table of Contents

Automatically generated from h2 and h3 headings:
- Clickable links to sections
- Collapsible/expandable
- Smooth scroll to anchor
- Current section highlighting

```markdown
## Section One
### Subsection One.A
## Section Two
```

Generates a TOC with all headings linked.

### 3. Heading Anchors

All headings automatically get anchor links:
```markdown
## My Section  →  id="my-section"
```

Scroll offset is 100px to account for sticky header.

### 4. Markdown Validator

Pre-publish validation checks:
- ✅ YAML frontmatter present
- ✅ Title field exists
- ✅ Valid frontmatter syntax
- ✅ Heading structure
- ✅ Image links (HTTP vs HTTPS)
- ✅ Broken links
- ✅ Code block pairs
- ✅ Line length (warns on >120 chars)

**Access:** Click "Validate" button on post preview

### 5. Enhanced Formatting

Automatic styling for:
- **Lists**: Proper indentation and spacing
- **Blockquotes**: Left border, italics, background
- **Images**: Rounded corners, border, responsive
- **Tables**: Bordered, striped rows, readable
- **Links**: Color-coded, hover effects
- **Inline Code**: Background highlight, monospace
- **Code Blocks**: Dark theme, line numbers, scrollable

## Components

### MarkdownRenderer
Renders HTML with comprehensive styling.

```javascript
import MarkdownRenderer from "./markdown-renderer"

<MarkdownRenderer html={htmlContent} />
```

### TableOfContents
Generates collapsible TOC from headings.

```javascript
import TableOfContents from "./table-of-contents"

<TableOfContents headings={headings} />
```

**Props:**
- `headings`: Array of heading objects with id, value, depth

### MarkdownValidator
Pre-publish validation tool.

```javascript
import MarkdownValidator from "./markdown-validator"

<MarkdownValidator content={rawMarkdown} />
```

**Validates:**
- Frontmatter structure
- Required fields
- Link integrity
- Code block syntax
- Line formatting

### MarkdownPreview
Complete preview with validator + TOC + metadata.

```javascript
import MarkdownPreview from "./markdown-preview"

<MarkdownPreview 
  rawMarkdown={rawContent}
  headings={headings}
/>
```

## Configuration

### gatsby-config.js

Remark plugins configured in gatsby-config.js:

```javascript
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-autolink-headers`,
        options: { offsetY: `100` }
      },
      {
        resolve: `gatsby-remark-prismjs`,
        options: { showLineNumbers: true }
      },
      {
        resolve: `gatsby-remark-images`,
        options: { maxWidth: 800 }
      }
    ]
  }
}
```

### Syntax Highlighting Theme

Modify `/src/prismjs-theme.css` to change colors:
- `.token.keyword`: Keywords
- `.token.string`: Strings
- `.token.number`: Numbers
- `.token.comment`: Comments
- `.token.function`: Function names

## Best Practices

### Frontmatter
Always include:
```yaml
---
title: Your Article Title
date: 2024-01-01
tags: [tag1, tag2]  # Optional
---
```

### Markdown Structure
```markdown
# Main Title (h1)

## Section (h2)
Content here

### Subsection (h3)
More content

#### Details (h4)
```

**Good:** Hierarchical h2 → h3 → h4
**Bad:** Skipping levels or using h1 in body

### Code Blocks
Specify language for syntax highlighting:

````markdown
```javascript
const x = 42
```

```python
x = 42
```

```
Plain text without highlighting
```
````

### Links
```markdown
[Link text](https://example.com)
![Image alt](https://example.com/image.jpg)
```

### Lists
```markdown
- Item 1
  - Nested item 1a
  - Nested item 1b
- Item 2

1. First
2. Second
3. Third
```

## Styling Customization

Edit `/src/gatsby-theme-blog/components/markdown-renderer.js` to change:
- Heading sizes and spacing
- Code block colors
- Link styles
- Image borders
- Table formatting

Example:
```javascript
"& h2": {
  fontSize: 28,        // Change size
  mt: 4,               // Top margin
  mb: 2,               // Bottom margin
  color: "heading",    // Color
}
```

## GraphQL Query

Posts now include heading information:

```graphql
query {
  markdownRemark {
    html
    headings {
      id
      value
      depth
    }
    frontmatter {
      title
      date
    }
  }
}
```

## Plugin Dependencies

Installed packages:
- `gatsby-transformer-remark@^6.13.0`: Markdown processor
- `gatsby-remark-prismjs@^7.13.0`: Syntax highlighting
- `gatsby-remark-autolink-headers@^6.13.0`: Heading anchors
- `gatsby-remark-images@^7.13.0`: Image optimization
- `prismjs@^1.29.0`: Highlighting library
- `remark-gfm@^3.0.1`: GitHub Flavored Markdown

## Troubleshooting

### Code highlighting not working
1. Ensure `gatsby-remark-prismjs` is in gatsby-config.js
2. Check that language is specified in code block
3. Clear cache: `yarn clean`

### Broken heading anchors
1. Headings must use #, ##, ### syntax
2. Cannot have h1 inside post body
3. Ensure heading text is unique

### Validation keeps failing
1. Check frontmatter format (--- before/after)
2. Ensure title field exists
3. Check for unclosed code blocks (```)
4. Validate against the validator tool

---

**Version**: 1.0.0
**Last Updated**: 2024
