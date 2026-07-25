# 🎬 Mise à jour: Funnel Store Pinia

## Résumé des changements

J'ai créé un système complet de gestion du funnel avec **Pinia** qui automatise:

✅ La progression à travers les 7 étapes
✅ La mutation du texte du bouton CTA
✅ La synchronisation avec l'URL (`?step=X`)
✅ La gestion des données par étape
✅ La validation des prérequis

---

## 📁 Fichiers créés

### 1. **Store Principal**
```
src/stores/
├── useFunnelStore.ts           # ⭐ Store Pinia (source unique)
├── index.ts                    # Export du store
└── IMPLEMENTATION_GUIDE.md     # Guide complet
```

### 2. **Composable**
```
src/composables/useFunnelFlow.ts  # Facilite l'usage du store
```

### 3. **Composant CTA Intelligent**
```
src/components/ui/FunnelCtaButton.vue  # Bouton CTA qui change automatiquement
```

### 4. **Configuration**
```
src/main.ts                    # ✅ Pinia initialisé
.pinia-setup.md               # Instructions d'installation
FUNNEL_STORE_UPDATE.md        # Ce fichier
```

---

## 🎯 Les 7 étapes du Funnel

| # | Nom | Route | CTA | Données |
|---|-----|-------|-----|---------|
| 1️⃣ | **Brief** | `/launch?step=1` | "Configurer" | prompt |
| 2️⃣ | **Config** | `/launch?step=2` | "Choisir l'algo" | config |
| 3️⃣ | **Algo** | `/launch?step=3` | "Passer au paiement" | algo |
| 4️⃣ | **Checkout** | `/launch?step=4` | "Lancer le job" | payment |
| 5️⃣ | **Launch** | `/launch?step=5` | "Monitorer" | jobId |
| 6️⃣ | **Monitor** | `/launch?step=6` | "Magasiner" | jobCompleted |
| 7️⃣ | **Shop** | `/launch?step=7` | "Retour" | - |

---

## 🚀 Comment utiliser

### Option 1: Composant CTA intelligent (recommandé)

```vue
<template>
  <!-- Le texte change automatiquement! -->
  <FunnelCtaButton />
</template>

<script setup lang="ts">
import FunnelCtaButton from '@/components/ui/FunnelCtaButton.vue';
</script>
```

### Option 2: Composable

```vue
<script setup lang="ts">
import { useFunnelFlow } from '@/composables/useFunnelFlow';

const { ctaLabel, advance, currentStepInfo } = useFunnelFlow();
</script>

<template>
  <div>
    <h2>{{ currentStepInfo.title }}</h2>
    <button @click="advance">{{ ctaLabel }}</button>
  </div>
</template>
```

### Option 3: Store directement

```vue
<script setup lang="ts">
import { useFunnelStore } from '@/stores';

const funnel = useFunnelStore();
</script>

<template>
  <button @click="funnel.advance">{{ funnel.getCtaLabel }}</button>
</template>
```

---

## 📋 Checklist d'intégration

### Phase 1: Installation & Vérification
- [ ] `yarn install` (pour Pinia)
- [ ] Vérifier que `src/main.ts` a Pinia
- [ ] Vérifier que le dev server fonctionne: `yarn dev`

### Phase 2: Intégrer le CTA dans MainLayout
- [ ] Remplacer `<LiquidCta>` par `<FunnelCtaButton>` dans `MainLayout.vue`
- [ ] Tester que le bouton change de texte selon l'étape

### Phase 3: Intégrer dans les Steps
- [ ] **BriefStep**: Utiliser `useFunnelFlow()` pour sauvegarder le prompt
- [ ] **ConfigStep**: Sauvegarder la configuration
- [ ] **AlgoStep**: Sauvegarder l'algo choisi
- [ ] **CheckoutStep**: Sauvegarder les infos de paiement
- [ ] **LaunchStep**: Sauvegarder le jobId
- [ ] **MonitorStep**: Sauvegarder jobCompleted
- [ ] **ShopStep**: Reset & retour à l'accueil

### Phase 4: Synchronisation avec useLaunch
- [ ] Faire communiquer `useFunnelStore` avec `useLaunch.ts`
- [ ] Assurer que les données fluent correctement

### Phase 5: Tests & Polish
- [ ] Tester le flow complet (1→7)
- [ ] Tester la navigation URL (`?step=X`)
- [ ] Tester les back/forward
- [ ] Tester le reset après complément

---

## 🔗 Intégration avec le code existant

### Synchroniser avec `useLaunch.ts`

Actuellement `useLaunch.ts` gère les données du job. Le nouveau store gère la progression.

**Solution**: Faire communiquer les deux:

```typescript
// Dans une step
import { useFunnelFlow } from '@/composables/useFunnelFlow';
import { useLaunch } from '@/composables/useLaunch';

const { saveData } = useFunnelFlow();
const { estimateCost } = useLaunch();

const handleSubmit = async (prompt: string) => {
  const estimate = await estimateCost(prompt);
  saveData({ prompt, estimate });  // ← Sauvegarde dans le store
};
```

---

## 🧪 Debug & Logging

```typescript
import { useFunnelFlow } from '@/composables/useFunnelFlow';

const { logFunnelState } = useFunnelFlow();

// Affiche l'état complet dans la console
logFunnelState();
```

Output:
```
🎬 Funnel State
Current Step: 2 (config)
Title: Config
Can Advance: true
Is Last Step: false
Progress: 28%
Data: { 1: {...}, 2: {...} }
```

---

## 📚 Documentation complète

Lire le fichier: **`src/stores/IMPLEMENTATION_GUIDE.md`**

Il contient:
- Configuration détaillée
- API complète
- Exemples d'usage
- Mappings des étapes
- Guide d'intégration

---

## ✨ Prochaines étapes

1. **Installer Pinia**: `yarn install` (si nécessaire)
2. **Lancer le dev server**: `yarn dev`
3. **Remplacer le CTA**: Intégrer `FunnelCtaButton` dans `MainLayout.vue`
4. **Mettre à jour les Steps**: Utiliser `useFunnelFlow()` dans chaque step
5. **Tester le flow**: Vérifier la progression 1→7
6. **Synchroniser**: Faire communiquer avec `useLaunch.ts`

---

## 🎓 Apprendre Pinia

- [Official Docs](https://pinia.vuejs.org/)
- [YouTube Tutorial](https://www.youtube.com/watch?v=lZ5-F3vSQP8)

---

**Questions? Consulte `IMPLEMENTATION_GUIDE.md`** 🚀
