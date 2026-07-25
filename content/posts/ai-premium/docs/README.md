# AI-Premium.Studio Documentation

Welcome to the comprehensive documentation for the AI-Premium.Studio project. This folder contains all guides, references, and architectural information.

## 📚 Quick Navigation

### Getting Started
- **[SETUP.md](./SETUP.md)** - Initial project setup, installation, and configuration guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project structure, folder organization, and component patterns

### Design & Styling
- **[THEME.md](./THEME.md)** - Color theme system, Dracula theme, CSS variables, and dark/light mode
- **[STYLING.md](./STYLING.md)** - SCSS mixins guide, reusable style patterns, and CSS best practices

### Development
- **[COMPONENTS.md](./COMPONENTS.md)** - Component patterns, conventions, reusable component library
- **[QUASAR.md](./QUASAR.md)** - Quasar framework integration, component usage, and utilities
- **[ANIMATIONS.md](./ANIMATIONS.md)** - Animation system, wave effects, particle systems, keyframes
- **[I18N.md](./I18N.md)** - Internationalization setup, language switching, translation management

### Advanced Topics
- **[PERFORMANCE.md](./PERFORMANCE.md)** - Bundle optimization, performance tips, tree-shaking strategy
- **[MIGRATION.md](./MIGRATION.md)** - 2026 Refactoring guide, architecture cleanup, SCSS consolidation

---

## 📋 Document Descriptions

### SETUP.md
Complete guide to setting up the project from scratch. Includes:
- Prerequisites and dependencies
- Installation instructions
- Quasar configuration
- Development server startup
- Build and deployment

### ARCHITECTURE.md
Overview of the project structure and organization:
- Folder hierarchy and naming conventions
- Component categorization (layout, sections, ui, animations)
- Module dependencies and imports
- Best practices for new features

### THEME.md
Everything about styling and theming:
- Dracula color palette
- CSS variables and dark mode
- Theme customization
- Color usage guidelines
- Typography system

### STYLING.md
SCSS mixins and reusable style patterns:
- All available mixins (gradients, animations, shadows, effects)
- How to use mixins in components
- Naming conventions
- Migration from custom CSS to mixins

### COMPONENTS.md
Component patterns and conventions:
- Component structure and templates
- Props and events conventions
- Composition patterns
- Reusable component examples

### QUASAR.md
Quasar framework integration guide:
- Quasar components in use
- How to use Quasar components
- Selective imports for tree-shaking
- Available utilities and directives

### ANIMATIONS.md
Animation system documentation:
- Built-in animations and keyframes
- Wave effects and particles
- Using animations in components
- Performance considerations

### I18N.md
Internationalization implementation:
- Language switching
- Translation keys and structure
- Adding new languages
- Component locale integration

### PERFORMANCE.md
Performance optimization guide:
- Bundle size analysis
- Tree-shaking strategy
- Lazy loading components
- Lighthouse audit tips

### MIGRATION.md
Refactoring and migration guide (2026):
- Overview of architectural cleanup
- SCSS consolidation details
- Component reorganization steps
- Update paths and imports

---

## 🎯 For Different Roles

### 👤 New Developer
Start here:
1. [SETUP.md](./SETUP.md) - Get the project running
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the structure
3. [COMPONENTS.md](./COMPONENTS.md) - Learn component patterns

### 🎨 Designer/Frontend Developer
Focus on:
- [THEME.md](./THEME.md) - Colors and styling
- [STYLING.md](./STYLING.md) - Available mixins
- [ANIMATIONS.md](./ANIMATIONS.md) - Animation effects

### 🔧 Full-Stack Developer
Deep dive into:
- [QUASAR.md](./QUASAR.md) - Component library
- [I18N.md](./I18N.md) - Multilingual support
- [PERFORMANCE.md](./PERFORMANCE.md) - Optimization

### 📚 Project Maintainer
Essential reads:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [MIGRATION.md](./MIGRATION.md) - Recent changes
- [PERFORMANCE.md](./PERFORMANCE.md) - Health checks

---

## 🔄 Documentation Maintenance

These docs are maintained alongside the codebase. When making changes:

1. **Code First**: Update code and tests
2. **Docs Second**: Update relevant documentation
3. **Keep Current**: Remove outdated information
4. **Link Related**: Cross-reference related docs

Documentation files use:
- **Markdown** (.md) format for readability
- **Code blocks** with language tags for examples
- **Header hierarchy** (H1 → H6) for structure
- **Bullet lists** for organization

---

## 📝 Quick Reference

### Key Technologies
- **Vue 3** - JavaScript framework
- **Vite** - Build tool
- **Quasar** - UI component library
- **SCSS** - Styling with mixins
- **i18n** - Internationalization
- **TypeScript** (optional) - Type safety

### Important Paths
- `/src/components/` - Vue components
- `/src/styles/` - Global styles and mixins
- `/src/locales/` - Translation files
- `/src/quasar-theme.js` - Theme configuration
- `/docs/` - Documentation (this folder)

### Useful Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Production build
npm run preview     # Preview production build
```

---

## 🚀 Getting Help

- **Have questions?** Check the relevant documentation file
- **Found a bug?** File an issue with reproduction steps
- **Want to contribute?** Follow the patterns in [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Documentation unclear?** Help us improve by suggesting changes

---

**Last Updated**: April 2026 | **Version**: 2.0 (Post-Refactoring)
