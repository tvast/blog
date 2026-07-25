# i18n: Internationalization System for .connect

Type-safe, globally accessible translations for the entire application.

## Features

✅ **Type-Safe Keys** — Compile-time checking for all translation keys  
✅ **Multiple Languages** — English (en) and French (fr) by default  
✅ **Reactive Switching** — Change language globally and instantly  
✅ **Auto-Detection** — Detects browser language or uses localStorage  
✅ **Easy Integration** — Single composable for all components  
✅ **Replacements** — Support for dynamic value substitution  

---

## Usage

### In Vue Components

```vue
<template>
  <div>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.subtitle') }}</p>
    
    <q-btn 
      :label="t('common.save')" 
      @click="save"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t, language, setLanguage } = useI18n()

function save() {
  // Do something
}
</script>
```

### In TypeScript Files

```ts
import { i18n } from '@/i18n'

// Get translation
const title = i18n.t('home.title')

// Change language
i18n.setLanguage('fr')

// Get current language
const lang = i18n.getLanguage()
```

### With Replacements

```ts
// In messages
// errors: { notFound: 'User {username} not found' }

// Usage
const msg = i18n.t('errors.notFound', { username: 'john' })
// → "User john not found"
```

---

## Adding New Languages

### 1. Create Language File

```ts
// src/i18n/de.ts
import type { I18nMessages } from './types'

export const de: I18nMessages = {
  common: {
    appName: '.connect',
    // ... all other keys
  },
  // ...
}
```

### 2. Import and Register

```ts
// src/i18n/index.ts
import { de } from './de'

const messages: Record<SupportedLanguage, I18nMessages> = {
  en,
  fr,
  de, // Add this
}
```

### 3. Update Language Type

```ts
// src/i18n/types.ts
export type SupportedLanguage = 'en' | 'fr' | 'de'
```

---

## Adding New Translation Keys

### 1. Update Types

```ts
// src/i18n/types.ts
export interface I18nMessages {
  myFeature: {
    title: string
    description: string
  }
  // ...
}
```

### 2. Add to All Language Files

```ts
// src/i18n/en.ts
export const en: I18nMessages = {
  myFeature: {
    title: 'My Feature',
    description: 'Feature description',
  },
  // ...
}

// src/i18n/fr.ts
export const fr: I18nMessages = {
  myFeature: {
    title: 'Ma Fonctionnalité',
    description: 'Description de la fonctionnalité',
  },
  // ...
}
```

### 3. Use in Component

```vue
<script setup lang="ts">
const { t } = useI18n()

// Fully type-safe!
t('myFeature.title')
</script>
```

---

## Language Switching

### Via Composable

```ts
const { setLanguage, toggleLanguage, language } = useI18n()

// Set to French
setLanguage('fr')

// Toggle between en/fr
toggleLanguage()

// Get current language
console.log(language.value) // 'fr'
```

### Via Global Instance

```ts
import { i18n } from '@/i18n'

i18n.setLanguage('fr')
```

---

## Storage & Persistence

- Language preference is saved to `localStorage` under key `i18n-language`
- On app load, it checks localStorage, then browser language preference
- If neither exists, defaults to English

---

## Type Safety

All translation keys are **type-safe at compile time**:

```ts
// ✅ Valid
t('home.title')
t('common.appName')

// ❌ Invalid (TypeScript error)
t('invalid.key')           // Key doesn't exist
t('home')                  // Too general
t('home.invalidKey')       // Key doesn't exist
```

---

## File Structure

```
src/i18n/
├── types.ts          # TypeScript types & utilities
├── en.ts             # English translations
├── fr.ts             # French translations
├── index.ts          # Global i18n instance
└── README.md         # This file

src/composables/
└── useI18n.ts        # Vue composable

src/components/
└── LanguageSwitcher.vue  # Language selector component
```

---

## Examples

### Header Component with Language Toggle

```vue
<template>
  <q-toolbar>
    <q-toolbar-title>{{ t('common.appName') }}</q-toolbar-title>
    <LanguageSwitcher />
  </q-toolbar>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
</script>
```

### Notifications with i18n

```ts
const { q } = useQuasar()
const { t } = useI18n()

function save() {
  try {
    // ... do something
    q.success(t('notifications.success'))
  } catch (error) {
    q.error(t('notifications.error'))
  }
}
```

---

## Testing

```ts
import { i18n } from '@/i18n'

describe('i18n', () => {
  it('should return translation for valid key', () => {
    const result = i18n.t('common.appName')
    expect(result).toBe('.connect')
  })

  it('should switch languages', () => {
    i18n.setLanguage('fr')
    expect(i18n.getLanguage()).toBe('fr')
  })

  it('should support replacements', () => {
    const result = i18n.t('errors.notFound', { 
      key: 'username' 
    })
    expect(result).toContain('username')
  })
})
```

---

## Best Practices

1. **Always use keys** — Never hardcode strings that should be translated
2. **Group related keys** — Organize translations by feature/page
3. **Use lowercase keys** — Follow the naming convention
4. **Test all languages** — Verify translations in all supported languages
5. **Update all files** — When adding keys, add to ALL language files
6. **Type safely** — Leverage TypeScript for key suggestions

---

## Performance

- ✅ Minimal overhead — Simple object lookups
- ✅ Lazy-loaded — Languages loaded on demand
- ✅ Cached translations — No parsing overhead
- ✅ Reactive updates — Vue reactivity built-in

---

## Migration from Hardcoded Strings

```ts
// Before
<h1>My App</h1>
<p>Welcome!</p>

// After
<h1>{{ t('common.appName') }}</h1>
<p>{{ t('home.subtitle') }}</p>
```

---

For more examples, see `src/views/Home.vue` or `src/App.vue`.
