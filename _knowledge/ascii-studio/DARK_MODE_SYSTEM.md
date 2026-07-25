# Dark/Light Mode System

Un système complet de gestion des thèmes sombres et clairs pour le studio ASCII.

## Vue d'ensemble

Le système permet de basculer entre:
- **Mode Sombre (Dark)** - Fond noir avec texte brillant (6 thèmes)
- **Mode Clair (Light)** - Fond blanc avec texte foncé (6 thèmes)

Chaque mode a ses propres palettes de couleurs optimisées pour la lisibilité et le contraste.

## Thèmes Disponibles

### Mode Sombre
1. **Matrix** - Vert classique sur noir (`#41ff6e` / `#040b06`)
2. **Brand** - Orange sur gris foncé (`#ff694d` / `#05071a`)
3. **Amber CRT** - Ambre rétro (`#ffb000` / `#120a00`)
4. **Ice** - Cyan glacé (`#7fdbff` / `#02060d`)
5. **Magenta** - Rose sur noir (`#ff5ed0` / `#0c020a`)
6. **Neon** - Vert néon (`#00ff88` / `#0a0a0a`)

### Mode Clair
1. **Paper** - Papier classique (`#1a1a1a` / `#e8e4d8`)
2. **High Contrast** - Contraste maximal (`#000000` / `#ffffff`)
3. **Soft** - Doux et lisible (`#2c3e50` / `#ecf0f1`)
4. **Warm** - Chaud et agréable (`#5c4033` / `#fff8f0`)
5. **Cool** - Bleu froid (`#1e3a8a` / `#f0f4ff`)
6. **Minty** - Vert menthe (`#0f766e` / `#f0fdf4`)

## Utilisation

### Via le Composant DarkModeToggle

Le composant s'affiche dans l'onglet **Appearance** du ControlPanel:

```vue
<DarkModeToggle />
```

**Contrôles:**
- Boutons **Dark/Light** - Basculer entre les modes
- Boutons **< >** - Naviguer entre les thèmes
- Points de couleur - Sélectionner un thème spécifique

### Via le Composable useDarkMode

```javascript
import { useDarkMode } from '@/composables/useDarkMode'

const {
  isDarkMode,      // ref - boolean
  isLightMode,     // computed - boolean
  toggle,          // function - bascule le mode
  setDark,         // function - active le mode sombre
  setLight,        // function - active le mode clair
  currentTheme,    // computed - thème actuel
  themes,          // computed - tous les thèmes du mode actuel
  themeIndex,      // ref - index du thème actuel
  nextTheme,       // function - thème suivant
  prevTheme        // function - thème précédent
} = useDarkMode()
```

**Exemple:**
```javascript
// Basculer le mode
toggle()

// Changer de mode
setDark()
setLight()

// Naviguer les thèmes
nextTheme()
prevTheme()

// Accès aux données actuelles
console.log(currentTheme.value.fg)   // Couleur de texte
console.log(currentTheme.value.bg)   // Couleur de fond
console.log(isDarkMode.value)        // true/false
```

### Via le Store Config

```javascript
import { useConfigStore } from '@/stores/config'

const store = useConfigStore()

// Propriétés
store.darkMode              // boolean - mode actuel
store.currentThemeIndex     // number - index du thème
store.modeThemes            // array - thèmes du mode actuel
store.currentModeTheme      // object - thème actuel

// Actions
store.toggleDarkMode()
store.setDarkMode(true)     // ou false
store.nextTheme()
store.prevTheme()
store.setThemeByIndex(2)
```

## Architecture

### Fichiers Clés

1. **`src/config/theme.js`**
   - Défini tous les thèmes sombres et clairs
   - Contient la palette de couleurs complète

2. **`src/stores/config.js`**
   - Gère l'état du mode et du thème
   - Fournit les actions de basculement
   - Persiste les préférences (via Pinia)

3. **`src/composables/useDarkMode.js`**
   - Composable Vue 3 réactif
   - Enveloppe le store pour faciliter l'utilisation

4. **`src/components/DarkModeToggle.vue`**
   - Composant UI pour basculer le mode
   - Sélecteur de thème visuel
   - Points de sélection rapide

## Persistance

Les préférences sont automatiquement sauvegardées via Pinia:
- Mode actuel (dark/light)
- Thème sélectionné
- Couleurs personnalisées

Les préférences se restaurent au prochain chargement.

## Personnalisation

### Ajouter un Nouveau Thème

Modifiez `src/config/theme.js`:

```javascript
export const APP_THEME = {
  modes: {
    dark: {
      themes: [
        // ... thèmes existants
        { 
          labelKey: 'themes.myCustom', 
          fg: '#00ff00',      // Couleur de texte
          bg: '#000011'       // Couleur de fond
        }
      ]
    },
    light: {
      themes: [
        // ... thèmes existants
        {
          labelKey: 'themes.myCustomLight',
          fg: '#001100',
          bg: '#ffffee'
        }
      ]
    }
  }
}
```

Ajoutez la clé de traduction dans `src/i18n/`:
```javascript
themes: {
  myCustom: 'My Custom Theme',
  myCustomLight: 'My Custom Light'
}
```

### Créer un Preset Mode

```javascript
// Dans un composable ou composant
import { useDarkMode } from '@/composables/useDarkMode'

function applyHighContrastMode() {
  const { setLight } = useDarkMode()
  setLight()
  // Le mode light applique automatiquement le premier thème
  // (High Contrast pour le mode light)
}
```

## Conseils d'Utilisation

1. **Pour les vidéos/images**: Utilisez le mode clair pour une meilleure lisibilité de l'overlay ASCII

2. **Pour le travail prolongé**: Alternez entre les modes pour réduire la fatigue oculaire

3. **Pour les performances**: Le mode clair peut être plus lisible à haute résolution

4. **Pour les captures d'écran**: Le mode clair avec "High Contrast" offre la meilleure clarté

5. **Accessibilité**: Les thèmes incluent des options à haut contraste pour les malvoyants

## États de Blending

Les couleurs s'adaptent au contexte:
- Mode sombre: Couleurs vives sur fond sombre
- Mode clair: Couleurs foncées sur fond clair
- Tous les modes incluent du glow optionnel pour plus de visibilité

## Intégration Scènes

Les scènes héritent automatiquement des couleurs du mode actif via:
```javascript
// Dans AsciiCanvas.vue
const preStyle = computed(() => ({
  color: store.fgColor,           // Mis à jour par le mode
  backgroundColor: store.bgColor  // Mis à jour par le mode
}))
```

Aucune modification des scènes n'est nécessaire!
