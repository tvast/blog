# 🌐 i18n Integration Guide - Home Page

Complete internationalization setup for the Home page with support for **3 languages**.

## ✅ What's Included

### 1️⃣ Translation Files Updated
```
✅ src/i18n/locales/fr.json    → French translations
✅ src/i18n/locales/en.json    → English translations
✅ src/i18n/locales/es.json    → Spanish translations
```

### 2️⃣ New Component
```
✅ src/components/HomeView-i18n.vue   → i18n-enabled home page
```

All translations are nested under `home.*` keys in each locale file.

---

## 📋 Supported Languages

### 🇫🇷 Français (FR)
```json
{
  "home": {
    "brand": "MOOVIES AI",
    "hero": {
      "title": "Story first.\nMotion second.\nImpact always.",
      "subtitle": "Une surface éditoriale et cinématique...",
      ...
    }
  }
}
```

### 🇬🇧 English (EN)
```json
{
  "home": {
    "brand": "MOOVIES AI",
    "hero": {
      "title": "Story first.\nMotion second.\nImpact always.",
      "subtitle": "An editorial and cinematic interface...",
      ...
    }
  }
}
```

### 🇪🇸 Español (ES)
```json
{
  "home": {
    "brand": "MOOVIES AI",
    "hero": {
      "title": "Historia primero.\nMovimiento segundo.\nImpacto siempre.",
      "subtitle": "Una interfaz editorial y cinematográfica...",
      ...
    }
  }
}
```

---

## 🔄 How to Integrate

### Option A: Replace Current HomeView

**Before:**
```vue
<script setup>
import HomeView from '@/components/HomeView.vue'
</script>
```

**After:**
```vue
<script setup>
import HomeView from '@/components/HomeView-i18n.vue'
</script>
```

### Option B: Side-by-side Testing

Keep both versions and test:

```vue
<script setup>
const useI18nVersion = ref(true)
</script>

<template>
  <HomeView v-if="!useI18nVersion" />
  <HomeViewI18n v-else />

  <button @click="useI18nVersion = !useI18nVersion">
    Toggle i18n
  </button>
</template>
```

### Option C: Update Routes

Edit `src/router/routes.ts`:

```typescript
const HomeView = () => import('@/components/HomeView-i18n.vue')
```

---

## 📝 Translation Keys Structure

### Hero Section
```
home.brand                    → Brand name
home.hero.title              → Hero title
home.hero.subtitle           → Hero subtitle
home.hero.launch_cta         → Launch button text
home.hero.catalog_cta        → Catalog button text
```

### Stats Section
```
home.stats.steps             → "7 launch steps" / "7 étapes..."
home.stats.control           → "24/7 creative control" / "24/7 contrôle créatif"
home.stats.branches          → "∞ narrative branches" / "∞ branches narratives"
```

### Portals Section
```
home.portals.kicker          → "PORTALS" / "PORTES"
home.portals.title           → Portal section title
home.portals.subtitle        → Portal section subtitle
```

### Pipeline Section
```
home.pipeline.kicker         → "PIPELINE"
home.pipeline.title          → "Le tunnel comme mise en scène"
home.pipeline.subtitle       → Pipeline description
home.pipeline.neural_core    → "NEURAL CORE"
home.pipeline.cockpit_title  → Cockpit title
home.pipeline.cockpit_desc   → Cockpit description
home.pipeline.cockpit_cta    → "Go to launch" button
```

### Discover Section
```
home.discover.kicker         → "DISCOVER" / "DÉCOUVRE"
home.discover.title          → "Univers parallèles" / "Parallel universes"
home.discover.subtitle       → Section description
```

### Content Section
```
home.content.poems_title     → "Poems" / "Poèmes"
home.content.poems_desc      → Poems description
home.content.scenarios_title → "Scenarios" / "Scénarios"
home.content.scenarios_desc  → Scenarios description
home.content.reel_title      → "Reel"
home.content.reel_desc       → Reel description
```

### Footer
```
home.footer.tagline          → Footer tagline
```

---

## 🔧 Usage in Component

### Using `t()` for translations:

```vue
<template>
  <!-- Simple translation -->
  <h1>{{ t('home.hero.title') }}</h1>

  <!-- With newlines (use \n) -->
  <h1 style="white-space: pre-line">
    {{ t('home.hero.title') }}
  </h1>

  <!-- For stats, computed property -->
  <div v-for="item in stats" :key="item.label">
    <div class="stat-label">{{ item.label }}</div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = computed(() => [
  { value: '7', label: t('home.stats.steps') },
  { value: '24/7', label: t('home.stats.control') },
  { value: '∞', label: t('home.stats.branches') },
])
</script>
```

---

## 🌍 Language Switching

The app should have a language switcher (check `LanguageSwitcher.vue`):

```vue
<!-- Click to change locale -->
<LanguageSwitcher />

<!-- Home page automatically re-renders with new locale -->
```

---

## ✨ Features

### ✅ Complete Coverage
- All hero text
- All section titles and descriptions
- All buttons and CTAs
- All stats and metrics
- Footer content

### ✅ Consistent Naming
- Flat structure: `home.section.key`
- Easy to find and update
- Self-documenting keys

### ✅ Reactive
- Change language, page updates instantly
- No page reload needed
- Smooth transitions

### ✅ Maintainable
- All text in JSON files
- Easy to add new languages
- Consistent formatting

---

## 📱 Adding New Languages

To add German (DE) or French Canadian (FR-CA):

### 1. Create locale file
```bash
src/i18n/locales/de.json
```

### 2. Copy structure from FR/EN
```json
{
  "home": {
    "brand": "MOOVIES AI",
    "hero": {
      "title": "Geschichte zuerst...",
      ...
    }
  }
}
```

### 3. Register in i18n config
Update `src/i18n/index.ts`:
```typescript
import de from './locales/de.json'

const messages = {
  en, fr, es, de  // Add here
}
```

### 4. Update language switcher
Edit `LanguageSwitcher.vue` to include new language option

---

## 🔄 Migration Checklist

- [ ] Replace HomeView import in routes
- [ ] Test language switching
- [ ] Verify all text displays correctly
- [ ] Check multiline text (hero title)
- [ ] Test on mobile responsive
- [ ] Compare old vs new version
- [ ] Deploy when satisfied

---

## 🧪 Testing

### Test each language:

```bash
# Open app in different languages
1. Set locale to FR → All text in French
2. Set locale to EN → All text in English
3. Set locale to ES → All text in Spanish
```

### Verify key areas:
- ✅ Hero title renders with line breaks
- ✅ Stats update with language
- ✅ Section titles change
- ✅ CTA buttons update
- ✅ Footer text changes

---

## 📊 Translation Coverage

| Section | Keys | Status |
|---------|------|--------|
| Hero | 5 | ✅ |
| Stats | 3 | ✅ |
| Portals | 3 | ✅ |
| Pipeline | 5 | ✅ |
| Discover | 3 | ✅ |
| Content | 6 | ✅ |
| Footer | 1 | ✅ |
| **Total** | **26** | **✅** |

---

## 🔧 Customization

### Change a translation:

```json
{
  "home": {
    "hero": {
      "title": "Your custom title here"
    }
  }
}
```

### Add a new key:

1. Add to all locale files (FR, EN, ES)
2. Use in component: `{{ t('home.section.key') }}`
3. Test in all languages

---

## ⚙️ Technical Details

### File Structure
```
src/i18n/
├── index.ts              # i18n config
└── locales/
    ├── fr.json          # French
    ├── en.json          # English
    └── es.json          # Spanish
```

### Component Integration
- Uses `useI18n()` composable
- Reactive to locale changes
- No additional dependencies
- Standard Vue I18n setup

---

## 💡 Tips

### For multiline text:
Use `\n` in JSON and `white-space: pre-line` in CSS:
```vue
<h1 style="white-space: pre-line">
  {{ t('home.hero.title') }}
</h1>
```

### For dynamic text:
Use computed properties for reactive translations:
```typescript
const stats = computed(() => [
  { label: t('home.stats.steps') }
])
```

### For debugging:
Check browser i18n DevTools extension to see all keys and translations.

---

## 📚 References

- **Old component:** `src/components/HomeView.vue`
- **New component:** `src/components/HomeView-i18n.vue`
- **i18n config:** `src/i18n/index.ts`
- **Locale files:** `src/i18n/locales/{en,fr,es}.json`

---

## ✅ Checklist Before Deploy

- [ ] All 3 languages have complete translations
- [ ] No missing keys
- [ ] Tested language switching
- [ ] Mobile responsive verified
- [ ] Hero title line breaks work
- [ ] Stats update correctly
- [ ] No console errors
- [ ] Links still work
- [ ] Performance acceptable
- [ ] Ready to replace original HomeView

---

**Status:** ✅ Ready to integrate
**Languages:** 🇬🇧 EN, 🇫🇷 FR, 🇪🇸 ES
**Coverage:** 26 keys, 100%
**Component:** `HomeView-i18n.vue`

Enjoy your multilingual home page! 🌍✨
