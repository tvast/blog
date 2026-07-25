# Architecture Props - Parent to Child

## Vue d'ensemble

Le mode dark et le thème courant sont maintenant passés **explicitement en props** du parent au child pour un meilleur suivi du flux de données.

## Flux de Données

```
IndexPage.vue (Parent)
    ↓ passe les props
    ├── :dark-mode="store.darkMode"
    ├── :current-theme="store.currentModeTheme"
    └── :frame="frame"
    ↓
AsciiCanvas.vue (Child)
    ├── Reçoit darkMode (Boolean)
    ├── Reçoit currentTheme (Object)
    └── Accède au store pour les couleurs
```

## Props Passés

### IndexPage.vue → AsciiCanvas.vue

```vue
<AsciiCanvas
  :frame="frame"
  :studio-open="studioOpen"
  :dark-mode="store.darkMode"
  :current-theme="store.currentModeTheme"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `frame` | String | Contenu ASCII à afficher |
| `studioOpen` | Boolean | Panel ControlPanel visible/caché |
| `darkMode` | Boolean | Mode sombre activé (true/false) |
| `currentTheme` | Object | `{labelKey, fg, bg}` thème courant |

## Utilisation dans AsciiCanvas

```javascript
defineProps({
  frame: { type: String, default: '' },
  studioOpen: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: true },
  currentTheme: { type: Object, default: null }
})
```

### Accès aux Props

```javascript
// En template
{{ darkMode }}  // true ou false
{{ currentTheme.fg }}  // Couleur de texte
{{ currentTheme.bg }}  // Couleur de fond
{{ currentTheme.labelKey }}  // 'themes.matrix', etc.
```

### Dans le Script

```javascript
const props = defineProps({...})

// Accès:
props.darkMode
props.currentTheme.fg
props.currentTheme.bg
```

## Intégration avec le Store

Le système fonctionne en 2 couches:

1. **Props** - Passage explicite du parent
   - Communication claire parent → child
   - Meilleure traçabilité du flux

2. **Store (Pinia)** - État centralisé
   - Accès direct via `useConfigStore()`
   - Réactivité automatique
   - Persistance

### Bénéfices

✅ **Explicite** - Le flux est clair dans le template
✅ **Traçable** - Facile de suivre d'où viennent les données
✅ **Testable** - Props peuvent être mockées dans les tests
✅ **Réactif** - Les changements du parent se reflètent immédiatement
✅ **Scalable** - Architecture prête pour d'autres enfants

## Exemple d'Utilisation dans le Child

```vue
<template>
  <div class="canvas-wrapper">
    <!-- Utiliser les props -->
    <div class="theme-indicator">
      Mode: {{ darkMode ? '🌙 Dark' : '☀️ Light' }}
      Theme: {{ currentTheme?.labelKey }}
    </div>
    
    <!-- Le canvas utilise les couleurs du store qui sont -->
    <!-- synchronisées avec les props du parent -->
    <pre class="ascii-display" :style="preStyle">
      {{ frame }}
    </pre>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/config'

const props = defineProps({
  frame: { type: String, default: '' },
  darkMode: { type: Boolean, default: true },
  currentTheme: { type: Object, default: null }
})

const store = useConfigStore()

// Les styles utilisent le store (mis à jour par les props du parent)
const preStyle = computed(() => ({
  color: store.fgColor,
  backgroundColor: store.bgColor
}))

// Vous pouvez aussi utiliser directement les props:
const themeLabel = computed(() => props.currentTheme?.labelKey || 'unknown')
</script>
```

## Watchers sur les Props

Si vous avez besoin de réagir aux changements de props:

```javascript
import { watch } from 'vue'

const props = defineProps({
  darkMode: { type: Boolean },
  currentTheme: { type: Object }
})

// Réagir aux changements du mode
watch(
  () => props.darkMode,
  (newMode) => {
    console.log('Mode changé vers:', newMode ? 'Dark' : 'Light')
  }
)

// Réagir aux changements du thème
watch(
  () => props.currentTheme,
  (newTheme) => {
    console.log('Thème changé vers:', newTheme.labelKey)
  },
  { deep: true }
)
```

## Cas d'Usage: Passer à d'Autres Enfants

Vous pouvez passer les props à d'autres composants enfants:

```vue
<template>
  <div class="container">
    <AsciiCanvas :dark-mode="darkMode" :current-theme="currentTheme" />
    <ControlPanel :dark-mode="darkMode" :current-theme="currentTheme" />
    <ColorPreview :current-theme="currentTheme" />
  </div>
</template>

<script setup>
defineProps({
  darkMode: Boolean,
  currentTheme: Object
})
</script>
```

## Bonnes Pratiques

1. **Passer les props down** (du parent à l'enfant)
   - Utilisez les props pour la communication parent → child
   - Clair et prévisible

2. **Émettre les événements up** (de l'enfant au parent)
   - Utilisez `emit` pour communiquer child → parent
   - Respectez le flux uni-directionnel

3. **Utiliser le store pour l'état global**
   - Pinia pour les données partagées entre composants
   - Les props renforcent la traçabilité

4. **Documenter les props**
   ```javascript
   defineProps({
     // Mode sombre activé
     darkMode: { type: Boolean, default: true },
     // Thème courant {labelKey, fg, bg}
     currentTheme: { type: Object, default: null }
   })
   ```

## Debugging

Pour vérifier les props passés:

```javascript
const props = defineProps({...})

// Dans la console du navigateur
console.log(props)
console.log('Dark mode:', props.darkMode)
console.log('Theme:', props.currentTheme)

// Ou utiliser Vue DevTools
// Inspector → Composants → Sélectionner AsciiCanvas
// Voir "Props" dans le panneau
```

## Performance

Les props sont **réactifs** mais ne causent pas de re-renders inutiles:
- Seuls les changements des valeurs déclenchent les mises à jour
- Vue optimise automatiquement
- Pas de surcharge de performance

---

Cette architecture rend le système **modulaire**, **testable** et **maintenable** tout en gardant la puissance de Pinia pour l'état global.
