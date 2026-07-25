# 🎨 Théophile Vast - Modern Portfolio

A beautiful, modern portfolio website built with Vue.js 3, Vite, and full internationalization support.

## ✨ Features

- 🚀 **Modern Stack**: Vue.js 3 + Vite for optimal performance
- 🌍 **Multi-language**: English and French support with persistent language selection
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎬 **Smooth Animations**: Canvas particles, transitions, and GSAP animations
- 🎯 **Project Gallery**: Interactive gallery with modal previews
- ♿ **Accessible**: Built with accessibility in mind
- ⚡ **Fast**: Optimized build with lazy loading and code splitting

## 🏗️ Project Structure

```
portfolio-theophile-vast/
├── src/
│   ├── components/          # Vue components
│   ├── locales/            # Translation files (en.json, fr.json)
│   ├── App.vue             # Root component
│   ├── main.js             # Entry point
│   ├── style.css           # Global styles
│   └── i18n.js             # i18n configuration
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Language Support

The portfolio supports **English** and **French**. Users can switch languages using the language switcher in the hero section. The language preference is saved in localStorage.

### Supported Locales

- `en` - English
- `fr` - Français

For more details on i18n setup, see [I18N_SETUP.md](./I18N_SETUP.md)

## 📦 Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Create optimized production build
npm run preview  # Preview the production build locally
```

## 🛠️ Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite 5** - Next-generation frontend tooling
- **Vue i18n 9** - Internationalization for Vue
- **GSAP 3** - Professional-grade animation library
- **CSS3** - Modern styling with animations

## 📄 Component Overview

### Hero Component
- Welcome section with animated background
- Language switcher
- CTA buttons
- Canvas particle animation

### Portfolio Component
- Project gallery with grid layout
- Interactive project cards
- Modal popup with project details
- Hover animations

### About Component
- About the creator
- Skills/expertise showcase
- Three skill cards with icons
- Synergy section

### Featured Projects Component
- Showcase of latest projects
- Image gallery
- Links to live projects

### Contact Component
- Call-to-action section
- Resume download link
- Email contact link
- Social media links
- Footer

### LanguageSwitcher Component
- Language selection buttons
- Current language indication
- localStorage persistence

## 🎨 Styling

The portfolio uses modern CSS with:
- CSS Grid and Flexbox layouts
- CSS animations and transitions
- CSS variables for theming
- Responsive design with media queries
- Mobile-first approach

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🔄 Building & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deployment Options

The built app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🌟 Key Features Explained

### Multi-Language Support
- All text content is translatable
- Language preference is saved in localStorage
- Fallback language is English
- Easy to add more languages

### Performance
- Code splitting for optimal bundle size
- Tree-shaking removes unused code
- Lazy loading of components
- Optimized images and assets

### Animations
- Hero section particle animations
- Smooth component transitions
- CSS animations for text effects
- GSAP library for complex animations

## 📝 Content Areas

### Portfolio Items
The portfolio includes examples of various projects:
- Video games (Cosmic Civil War)
- Web platforms (CEREBRO)
- Hardware projects (Hackathon NAO)
- Websites and web apps
- Music projects
- Interactive generators

### Skills
- Front-end specialist
- Fullstack experience
- Agile methodology knowledge

## 🔧 Configuration

### Customize Language Switcher
Edit `src/components/LanguageSwitcher.vue`

### Add New Languages
1. Create new locale file in `src/locales/` (e.g., `es.json`)
2. Add to languages array in `LanguageSwitcher.vue`
3. Register in `src/i18n.js`

### Modify Theme Colors
Update CSS variables in `src/style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... other variables */
}
```

## 📚 Learning Resources

- [Vue.js 3 Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)
- [Vue i18n Documentation](https://vue-i18n.intlify.dev)
- [GSAP Documentation](https://greensock.com/docs)

## 🤝 Contributing

Feel free to fork, modify, and use this portfolio as a base for your own projects!

## 📄 License

This portfolio is created by **Théophile Vast**.

---

Built with ❤️ using Vue.js & Vite
