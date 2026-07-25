# 🚀 Vue.js Vite Portfolio - Complete Setup Guide

## What Was Done

Your portfolio has been completely rewritten from a jQuery/Materialize CSS site into a modern **Vue.js 3 + Vite** project with full **i18n (internationalization)** support.

## 📦 Project Files Created

### Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite build configuration
- `index.html` - HTML entry point
- `.gitignore` - Git ignore rules

### Vue Components (in `src/components/`)
1. **Hero.vue** - Landing section with language switcher and particle animation
2. **Portfolio.vue** - Project gallery with modal preview
3. **About.vue** - Skills and expertise section
4. **FeaturedProjects.vue** - Latest projects showcase
5. **Contact.vue** - Contact section with footer
6. **LanguageSwitcher.vue** - Multi-language selector

### Core Files (in `src/`)
- **App.vue** - Root component that imports all sections
- **main.js** - Application entry point with i18n
- **i18n.js** - i18n configuration and setup
- **style.css** - Global styles and animations

### Translation Files (in `src/locales/`)
- **en.json** - English translations (all UI text)
- **fr.json** - French translations (all UI text)

### Documentation
- **README.md** - Full project documentation
- **I18N_SETUP.md** - Detailed i18n setup guide
- **SETUP_GUIDE.md** - This file

## 🌐 i18n Integration

### How It Works
1. **Language Switcher** in the Hero section allows users to switch between English and French
2. **Persistent Storage** - Selected language is saved in localStorage
3. **Global Access** - All components access translations via `$t()` method
4. **Translation Keys** - Organized hierarchically in JSON files

### Example Usage in Components
```vue
<template>
  <h1>{{ $t('hero.title') }}</h1>
  <p>{{ $t('hero.subtitle') }}</p>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
// Can access/change locale.value
</script>
```

### Translation Structure
```
en.json
├── header (navigation)
├── hero (landing section)
├── portfolio (gallery)
├── projects (individual project details)
├── about (skills section)
├── featured (featured projects)
└── contact (contact section)
```

## 🎯 Key Features

### 1. **Modern Vue 3 with Composition API**
- Uses `<script setup>` syntax
- Reactive state management
- Composable logic

### 2. **Vite for Fast Development**
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds
- ESM-first approach

### 3. **Multi-Language Support**
- English & French built-in
- Easy to add more languages
- Automatic language persistence

### 4. **Responsive Design**
- Mobile-first approach
- CSS Grid & Flexbox
- Media queries for all breakpoints

### 5. **Smooth Animations**
- Canvas particle effects
- CSS transitions
- Component animations
- GSAP library ready

## 📥 Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 🔄 What Changed from Original

### Before (Old Setup)
- ❌ jQuery dependencies
- ❌ Materialize CSS framework
- ❌ Static HTML pages
- ❌ Manual DOM manipulation
- ❌ No build tool

### After (New Setup)
- ✅ Vue.js 3 reactive components
- ✅ Modern CSS with variables
- ✅ Component-based architecture
- ✅ Declarative templating
- ✅ Vite build optimization
- ✅ Full i18n support
- ✅ Better performance
- ✅ Easier maintenance

## 🌍 Language Implementation

### Current Translations
- **English** - Complete
- **French** - Complete

### Adding a New Language (Example: Spanish)

1. **Create translation file** `src/locales/es.json`:
```json
{
  "header": { ... },
  "hero": { ... },
  // ... all keys with Spanish translations
}
```

2. **Import in i18n.js**:
```javascript
import es from './locales/es.json'

const i18n = createI18n({
  messages: {
    en,
    fr,
    es  // Add this
  }
})
```

3. **Add to LanguageSwitcher.vue**:
```javascript
const languages = ['en', 'fr', 'es']
```

## 📊 Component Hierarchy

```
App.vue (root)
├── Hero.vue
│   └── LanguageSwitcher.vue
├── Portfolio.vue
├── About.vue
├── FeaturedProjects.vue
└── Contact.vue
```

## 🎨 Customization

### Change Primary Color
Edit `src/style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Modify Hero Section
Edit `src/components/Hero.vue`:
- Update text via translation files
- Modify particle animation in `onMounted()`
- Change gradient colors

### Add/Edit Projects
Edit `src/components/Portfolio.vue`:
```javascript
const projects = ref([
  {
    id: 1,
    title: 'Project Name',
    description: 'Description',
    thumb: 'path/to/thumb.jpg',
    image: 'path/to/image.jpg',
    link: 'https://project-url.com'
  }
])
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Deploy to Popular Platforms

**Vercel**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages**
- Push to GitHub
- Enable Pages in repository settings
- Point to `dist` folder

## 📚 Resources

- [Vue.js 3 Docs](https://vuejs.org)
- [Vite Docs](https://vitejs.dev)
- [Vue i18n Docs](https://vue-i18n.intlify.dev)

## ✅ Next Steps

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Customize translations** in `src/locales/`
4. **Update project data** in component files
5. **Deploy to production**: `npm run build`

## 💡 Tips

- Use Vue DevTools extension for debugging
- Check browser localStorage for language preference
- Use `$t()` for all user-facing text
- Keep translation keys organized hierarchically
- Test both languages during development

---

**You now have a modern, maintainable, multi-language portfolio! 🎉**
