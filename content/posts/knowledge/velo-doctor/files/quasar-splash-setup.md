# Splash screen & icônes natives — Quasar CLI

## 1. Génération des assets (Capacitor / Cordova)

Quasar a un générateur d'icônes/splash intégré (`@quasar/icongenie`) : il
prend UN SEUL fichier source haute résolution et génère toutes les tailles
(iOS, Android, PWA, favicon).

```bash
npm install -g @quasar/icongenie

# icône d'app : utiliser le PICTOGRAMME seul (roue + caducée), fond transparent
icongenie generate -i assets/bycicle-logo.png --skip-trim -m spa,pwa,cordova,capacitor

# splash screen natif : logo complet sur fond blanc, centré
icongenie generate --splashscreen -i assets/bycicle-logo.png \
  --background '#FFFFFF' \
  --splashscreen-scaling contain \
  -m cordova,capacitor
```

> ⚠️ Pour un rendu propre, prépare deux exports depuis ton fichier source
> avant de lancer icongenie :
> - `bycicle-icon-1024.png` → pictogramme seul, fond transparent, cadré serré
> - `bycicle-splash-2732.png` → logo complet, marge généreuse, fond blanc

## 2. quasar.config.js — déclaration PWA / meta

```js
// quasar.config.js
module.exports = configure(function (ctx) {
  return {
    pwa: {
      workboxMode: 'GenerateSW',
      manifest: {
        name: 'Bycicle — The Bicycle Clinic',
        short_name: 'Bycicle',
        description: "We're by your cycle",
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FFFFFF',
        theme_color: '#132332',
        icons: [
          { src: 'icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    },

    capacitor: {
      capacitorCliPreferGlobal: true
    }
  }
})
```

## 3. Splash screen JS (fallback web / avant hydratation Vue)

Pour un affichage instantané avant même le boot de Vue (évite le flash
blanc sur mobile lent), ajoute un bloc statique dans `src-pwa` ou
`index.template.html` :

```html
<!-- index.template.html, juste avant <div id="q-app"> -->
<div id="byc-preboot-splash" style="
  position:fixed;inset:0;z-index:99999;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:14px;background:#fff;font-family:Inter,sans-serif;">
  <img src="icons/icon-128x128.png" width="72" height="72" alt="Bycicle" />
  <div style="font-weight:800;font-size:22px;letter-spacing:.05em;">
    <span style="color:#106E43">BY</span><span style="color:#132332">CICLE</span>
  </div>
</div>
<script>
  window.addEventListener('load', function () {
    var el = document.getElementById('byc-preboot-splash');
    if (el) { el.style.transition = 'opacity .3s'; el.style.opacity = '0';
      setTimeout(function () { el.remove(); }, 300); }
  });
</script>
```

Ensuite, une fois Vue monté, bascule sur le composant animé
`BycicleSplashScreen.vue` (voir `components/`) si tu as un vrai temps de
chargement (auth, config API) à couvrir.

## 4. Où poser les fichiers du design system

```
src/
├── css/
│   ├── quasar.variables.scss   ← remplace le fichier généré par défaut
│   └── app.scss
├── components/
│   └── BycicleSplashScreen.vue
```

Puis dans `App.vue` :

```vue
<template>
  <BycicleSplashScreen v-if="!appReady" />
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BycicleSplashScreen from 'components/BycicleSplashScreen.vue'

const appReady = ref(false)
onMounted(async () => {
  // ex: vérif auth, fetch config, etc.
  await new Promise(r => setTimeout(r, 1200))
  appReady.value = true
})
</script>
```
