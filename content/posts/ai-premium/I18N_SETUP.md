# Vue.js Portfolio with i18n Setup

This portfolio has been converted to a modern Vue.js 3 + Vite project with full internationalization support.

## 🌍 Languages Supported

- **English** (en)
- **French** (fr)

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.vue                    # Hero section with language switcher
│   ├── Portfolio.vue               # Project gallery
│   ├── About.vue                   # About & skills section
│   ├── FeaturedProjects.vue        # Featured projects showcase
│   ├── Contact.vue                 # Contact & footer
│   └── LanguageSwitcher.vue        # Language selector component
├── locales/
│   ├── en.json                     # English translations
│   └── fr.json                     # French translations
├── i18n.js                         # i18n configuration
├── App.vue                         # Root component
├── main.js                         # App entry point
└── style.css                       # Global styles
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Using Translations in Components

### Using the i18n Plugin

All components have access to the `$t()` method through the i18n plugin:

```vue
<template>
  <h1>{{ $t('hero.title') }}</h1>
  <p>{{ $t('hero.subtitle') }}</p>
</template>
```

### Language Switcher

The language switcher component is available in the Hero section. Users can switch between English and French at any time. The selected language is persisted in localStorage.

## 📝 Adding New Translations

### 1. Add keys to both translation files

**src/locales/en.json:**
```json
{
  "mySection": {
    "newKey": "English text"
  }
}
```

**src/locales/fr.json:**
```json
{
  "mySection": {
    "newKey": "Texte français"
  }
}
```

### 2. Use in component

```vue
<template>
  <p>{{ $t('mySection.newKey') }}</p>
</template>
```

## 🎯 Translation Keys Structure

Translation keys are organized hierarchically:

- **header**: Navigation and header text
- **hero**: Hero section content
- **portfolio**: Portfolio/playground section
- **projects**: Individual project details
- **about**: About section and skills
- **featured**: Featured projects section
- **contact**: Contact section and CTAs

## 💾 Language Persistence

The selected language is automatically saved to localStorage and will be restored on the next visit.

## 🔧 i18n Configuration

The i18n instance is configured in `src/i18n.js`:

```javascript
const i18n = createI18n({
  legacy: false,              // Use Composition API mode
  locale: localStorage.getItem('language') || 'en', // Default to English
  fallbackLocale: 'en',       // Fallback to English if translation missing
  messages: {                 // Translation files
    en,
    fr
  }
})
```

## 📦 Dependencies

- **Vue 3.5.0** - Progressive JavaScript framework
- **Vue i18n 9.10.0** - Internationalization plugin
- **Vite 5.0.0** - Modern frontend build tool
- **GSAP 3.12.2** - Animation library

## 🎨 Features

- ✨ Modern Vue 3 Composition API
- 🌐 Full i18n support (English/French)
- 🎯 Language persistence
- 🚀 Fast development with Vite
- 📱 Responsive design
- 🎬 Smooth animations
- ♿ Accessible components

## 📄 License

This project is created by Théophile Vast

---

Happy coding! 🚀
