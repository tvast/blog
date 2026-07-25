# 🎬 Funnel Store - Guide d'Implémentation

## Vue d'ensemble

Le store Pinia `useFunnelStore` gère automatiquement la progression à travers les 7 étapes du funnel de lancement vidéo.

### Caractéristiques principales:
- ✅ Mutation automatique du texte CTA selon l'étape actuelle
- ✅ Navigation automatique entre les étapes
- ✅ Synchronisation avec l'URL (query param `?step=X`)
- ✅ Gestion des données par étape
- ✅ Vérification automatique des prérequis

---

## Installation

### 1. Installer Pinia (si pas déjà installé)

```bash
yarn add pinia
```

### 2. Les fichiers sont déjà créés:
- ✅ `src/stores/useFunnelStore.ts` - Store principal
- ✅ `src/stores/index.ts` - Export du store
- ✅ `src/composables/useFunnelFlow.ts` - Composable pour faciliter l'usage
- ✅ `src/components/ui/FunnelCtaButton.vue` - Composant CTA intelligent
- ✅ `src/main.ts` - Pinia initialisé

---

## Utilisation

### Dans un composant Vue

#### Option 1: Via le Store directement

```vue
<script setup lang="ts">
import { useFunnelStore } from '@/stores';

const funnelStore = useFunnelStore();

const handleNextStep = () => {
  funnelStore.saveStepData(funnelStore.currentStep, {
    prompt: 'Ma super idée',
  });

  funnelStore.advance(); // Va à l'étape suivante
};
</script>

<template>
  <div>
    <h2>{{ funnelStore.getCurrentStepTitle }}</h2>
    <p>{{ funnelStore.getCurrentStepSubtitle }}</p>

    <!-- Bouton CTA qui change automatiquement -->
    <button @click="handleNextStep">
      {{ funnelStore.getCtaLabel }}
    </button>

    <!-- Barre de progression -->
    <div class="progress">
      <div :style="{ width: funnelStore.getProgressPercent + '%' }"></div>
    </div>
  </div>
</template>
```

#### Option 2: Via le Composable `useFunnelFlow`

```vue
<script setup lang="ts">
import { useFunnelFlow } from '@/composables/useFunnelFlow';

const {
  currentStepInfo,
  ctaLabel,
  saveData,
  advance,
  logFunnelState
} = useFunnelFlow();

const handleSubmit = (formData: any) => {
  saveData(formData);
  advance();
  logFunnelState(); // Debug
};
</script>

<template>
  <div>
    <h2>{{ currentStepInfo.title }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="prompt" type="text" placeholder="Your prompt" />
      <button type="submit">{{ ctaLabel }}</button>
    </form>
  </div>
</template>
```

#### Option 3: Utiliser le composant CTA intelligent

```vue
<script setup lang="ts">
import FunnelCtaButton from '@/components/ui/FunnelCtaButton.vue';
</script>

<template>
  <div>
    <!-- Le texte du bouton change automatiquement! -->
    <FunnelCtaButton />
  </div>
</template>
```

---

## Configuration des Étapes

Chaque étape est définie dans `useFunnelStore.ts`:

```typescript
{
  step: 1,                           // Numéro (1-7)
  name: 'brief',                    // Identifiant unique
  title: 'Brief',                   // Titre affiché
  subtitle: 'prompt & estimation',  // Sous-titre
  route: '/launch?step=1',          // Route
  ctaLabel: 'Configurer',           // Texte du bouton CTA
  ctaDescription: '...',            // Description (tooltip)
  requiresData: ['prompt'],         // Données requises
}
```

### Pour ajouter une nouvelle étape:

1. Ajouter un objet dans `FUNNEL_STEPS` dans `useFunnelStore.ts`
2. Le reste fonctionne automatiquement! ✨

---

## Mapping des Étapes

### 7 étapes du funnel:

| Étape | Nom | Route | CTA suivant | Données requises |
|-------|-----|-------|-------------|-----------------|
| 1 | Brief | `/launch?step=1` | "Configurer" | prompt |
| 2 | Config | `/launch?step=2` | "Choisir l'algo" | config |
| 3 | Algo | `/launch?step=3` | "Passer au paiement" | algo |
| 4 | Checkout | `/launch?step=4` | "Lancer le job" | payment |
| 5 | Launch | `/launch?step=5` | "Monitorer" | jobId |
| 6 | Monitor | `/launch?step=6` | "Magasiner" | jobCompleted |
| 7 | Shop | `/launch?step=7` | "Retour à l'accueil" | - |

---

## API du Store

### État

```typescript
currentStep: Ref<number>              // 1-7
completedSteps: Ref<Set<number>>     // Étapes complétées
stepData: Ref<Record<number, any>>   // Données par étape
```

### Getters (computed)

```typescript
getCurrentStepInfo        // Info de l'étape actuelle
getNextStepInfo          // Info de la prochaine étape
getCtaLabel             // Texte du bouton CTA
getCtaDescription       // Description du CTA
getCtaRoute             // Route cible du CTA
getCurrentStepTitle     // Titre de l'étape
getCurrentStepSubtitle  // Sous-titre
getProgressPercent      // Progression (0-100)
canAdvance              // Peut-on avancer?
isLastStep              // Dernière étape?
getAllSteps             // Toutes les étapes
```

### Actions

```typescript
goToStep(step: number)           // Aller à une étape
advance()                        // Étape suivante
goBack()                         // Étape précédente
saveStepData(step, data)        // Sauvegarder des données
navigateViaCta()                // Naviguer via le CTA
resetFunnel()                   // Réinitialiser
initializeFromRoute()           // Init depuis l'URL
syncWithRouter()                // Sync avec le router
```

---

## Synchronisation avec l'URL

Le store se synchronise automatiquement avec l'URL:

```
/launch?step=1   →  currentStep = 1
/launch?step=3   →  currentStep = 3
...
```

Modification du store:
```typescript
funnelStore.goToStep(5)  →  URL change en /launch?step=5
```

---

## Exemple d'intégration complète

### FunnelStepper.vue mis à jour:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useFunnelStore } from '@/stores';

const funnelStore = useFunnelStore();

const steps = computed(() => funnelStore.getAllSteps);
const currentStep = computed(() => funnelStore.currentStep);

const goToStep = (step: number) => {
  funnelStore.goToStep(step);
};
</script>

<template>
  <div class="funnel-stepper">
    <!-- Stepper tabs -->
    <div class="stepper-tabs">
      <button
        v-for="step in steps"
        :key="step.step"
        :class="{ active: currentStep === step.step }"
        @click="goToStep(step.step)"
      >
        {{ step.step }}. {{ step.title }}
      </button>
    </div>

    <!-- Content -->
    <div class="stepper-content">
      <slot name="step" :step="steps[currentStep - 1]"></slot>
    </div>

    <!-- Navigation -->
    <div class="stepper-nav">
      <button @click="funnelStore.goBack()" :disabled="currentStep === 1">
        ← Retour
      </button>
      <div class="progress">{{ currentStep }}/7</div>
      <button @click="funnelStore.advance()" :disabled="currentStep === 7">
        Suivant →
      </button>
    </div>
  </div>
</template>
```

---

## Debug

### Logging automatique:

```typescript
const { logFunnelState } = useFunnelFlow();
logFunnelState(); // Affiche l'état complet dans la console
```

### Output:
```
🎬 Funnel State
Current Step: 2 (config)
Title: Config
Can Advance: true
Is Last Step: false
Progress: 28%
Data: { 1: { prompt: '...' }, 2: { quality: 'high' } }
```

---

## Prochaines étapes

1. ✅ Store créé et configuré
2. ✅ Composable créé
3. ✅ Composant CTA intelligent créé
4. ⏭️ Mettre à jour `FunnelStepper.vue` pour utiliser le store
5. ⏭️ Mettre à jour `LaunchStep.vue` pour sauvegarder les données
6. ⏭️ Tester le flow complet
7. ⏭️ Ajouter les validations des données
8. ⏭️ Intégrer avec `useLaunch.ts` composable existant

---

## Intégration avec le texte CTA du LiquidCta existant

Dans `MainLayout.vue`, remplacez:

```vue
<!-- Avant -->
<LiquidCta
  label="Lancer un moovie"
  primaryLabel="Gravitor"
  @primary="goLaunch"
/>

<!-- Après -->
<FunnelCtaButton />
```

Le bouton s'adaptera automatiquement à l'étape! 🚀

---

## Questions?

Consultez les fichiers:
- `src/stores/useFunnelStore.ts` - Source de vérité
- `src/composables/useFunnelFlow.ts` - Facilités d'usage
- `src/components/ui/FunnelCtaButton.vue` - Composant prêt à l'emploi
