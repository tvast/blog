# 🎬 Diagramme du Funnel Flow avec Pinia

## Vue d'ensemble du flux de progression

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🍍 PINIA FUNNEL STORE                              │
│                       (Source unique de vérité)                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                     ▲
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
           ┌────────▼────┐   ┌───────▼───────┐   ┌───▼──────────┐
           │   Getters   │   │    State      │   │   Actions    │
           │ (computed)  │   │   (ref)       │   │ (methods)    │
           └─────────────┘   └───────────────┘   └──────────────┘
             • ctaLabel           • currentStep     • advance()
             • nextRoute          • stepData        • goBack()
             • progress           • completed       • saveData()
             • canAdvance                          • navigate()
```

---

## Progression à travers les 7 étapes

```
USER INTERACTION                STORE STATE             URL CHANGES
────────────────────────        ──────────────         ────────────

User opens app
      │
      ▼
  /launch
  ?step=1
      │                    currentStep = 1          /launch?step=1
      │                    ctaLabel = "Configurer"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 1: Brief                                  │
    │ • Prompt input                                  │
    │ • File upload                                   │
    │ • [Configurer] ← CTA button (auto-generated)   │
    └─────────────────────────────────────────────────┘
      │
      │ User clicks CTA
      ▼
  saveData({ prompt })
  advance()                 currentStep = 2          /launch?step=2
                            ctaLabel = "Choisir l'algo"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 2: Config                                 │
    │ • Backend knobs                                 │
    │ • Quality selector                              │
    │ • [Choisir l'algo] ← CTA button (auto)         │
    └─────────────────────────────────────────────────┘
      │
      │ User clicks CTA
      ▼
  saveData({ config })
  advance()                 currentStep = 3          /launch?step=3
                            ctaLabel = "Passer au paiement"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 3: Algo Selection                         │
    │ • Sora vs alternatives                          │
    │ • Florilege style                               │
    │ • [Passer au paiement] ← CTA                    │
    └─────────────────────────────────────────────────┘
      │
      │ User clicks CTA
      ▼
  saveData({ algo })
  advance()                 currentStep = 4          /launch?step=4
                            ctaLabel = "Lancer le job"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 4: Checkout (Stripe)                      │
    │ • Payment form                                  │
    │ • Order summary                                 │
    │ • [Lancer le job] ← CTA                         │
    └─────────────────────────────────────────────────┘
      │
      │ User clicks CTA + payment succeeds
      ▼
  saveData({ payment })
  navigateViaCta()          currentStep = 5          /launch?step=5
                            ctaLabel = "Monitorer"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 5: Launch (gRPC)                          │
    │ • Job submission                                │
    │ • Processing...                                 │
    │ • [Monitorer] ← CTA                             │
    └─────────────────────────────────────────────────┘
      │
      │ Job created in backend
      ▼
  saveData({ jobId })
  advance() [AUTO]          currentStep = 6          /launch?step=6
                            ctaLabel = "Magasiner"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 6: Monitor (Status polling)               │
    │ • Job status                                    │
    │ • Progress indicator                            │
    │ • [Magasiner] ← CTA                             │
    └─────────────────────────────────────────────────┘
      │
      │ Job completed in backend
      ▼
  saveData({ jobCompleted })
  advance() [AUTO]          currentStep = 7          /launch?step=7
                            ctaLabel = "Retour à l'accueil"
      │
    ┌─────────────────────────────────────────────────┐
    │ ÉTAPE 7: Shop (Merch)                           │
    │ • Product catalog                               │
    │ • Add to cart                                   │
    │ • [Retour à l'accueil] ← CTA                    │
    └─────────────────────────────────────────────────┘
      │
      │ User clicks CTA
      ▼
  navigateViaCta()
  resetFunnel()             currentStep = 1          /home
                            stepData = {}
      │
      ▼
   Back to start!
```

---

## Architecture des composants

```
┌──────────────────────────────────────────────────────────────┐
│                      LaunchView.vue                          │
│                  (Route: /launch)                            │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │    FunnelStepper.vue                  │
        │  (Gère l'affichage des 7 étapes)     │
        └───────────────────────────────────────┘
                    │           │
        ┌───────────┼───────────┴──────────────┐
        │           │                          │
        ▼           ▼                          ▼
    ┌────────┐  ┌────────┐              ┌─────────────┐
    │ Brief  │  │ Config │   ...        │ Shop        │
    │ Step   │  │ Step   │              │ Step        │
    └────────┘  └────────┘              └─────────────┘
        │           │                          │
        └───────────┼──────────────────────────┘
                    │
                    ▼
        ┌────────────────────────────┐
        │  FunnelCtaButton.vue       │
        │  (CTA intelligent)         │
        │ • useFunnelStore()         │
        │ • Text: dynamic ✨         │
        │ • onClick: auto-navigate   │
        └────────────────────────────┘
```

---

## Synchronisation URL ↔ Store

```
User navigates to /launch?step=3
         │
         ▼
   Route changes
         │
         ▼
   useRoute().query.step = "3"
         │
         ▼
   watch on route.query.step triggers
         │
         ▼
   funnelStore.goToStep(3)
         │
         ▼
   currentStep = 3
   ctaLabel = "Passer au paiement"
   ✨ UI updates automatically!

─────────────────────────────────────

User clicks CTA button
         │
         ▼
   funnelStore.advance()
   funnelStore.currentStep = 4
         │
         ▼
   router.replace() with new URL
         │
         ▼
   URL changes to /launch?step=4
   ✨ UI updates automatically!
```

---

## Flux de données

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Tree                           │
└─────────────────────────────────────────────────────────────┘
                         │
                    ┌────┴────┐
                    ▼         ▼
             FunnelStep   useFunnelFlow()
                    │         │
                    └────┬────┘
                         │
                    ┌────▼──────────────┐
                    │  useFunnelStore   │
                    │  (Pinia Store)    │
                    └───────────────────┘
                         │
            ┌────────────┬┴──────────────┐
            ▼            ▼               ▼
      currentStep   stepData        computeds
            │            │               │
            └────────────┼───────────────┘
                         │
                  ┌──────▼──────┐
                  │ Router/URL   │
                  └──────────────┘
```

---

## Exemple: Flow complet du Brief à Checkout

```
FunnelCtaButton.vue (MainLayout)
         │
         │ @click
         ▼
  useFunnelStore.navigateViaCta()
         │
         ├─ Valider: canAdvance?
         │ (requiredData présentes?)
         │
         ├─ OUI: advance()
         │        ├─ currentStep += 1
         │        └─ goToStep()
         │
         └─ NON: console.warn()
                 (show warning in UI)

         ▼ (après advance)

    currentStep = 2
    ctaLabel change → "Choisir l'algo"
         │
         ▼

    Router pushes /launch?step=2
         │
         ▼

    URL change
         │
         ▼

    Route watcher détecte change
         │
         ▼

    initializeFromRoute()
         │
         ▼

    FunnelStepper re-render
    + FunnelCtaButton re-render
    + ConfigStep affichée
         │
         ▼

    User voit la nouvelle étape
    avec le nouveau CTA texte! ✨
```

---

## Gestion des erreurs

```
User tries to advance without required data
         │
         ▼
canAdvance = false (computed)
         │
         ▼
FunnelCtaButton détecte
         │
         ├─ Disable button? (optionnel)
         │
         ├─ Show warning:
         │ "⚠️ Complétez les informations"
         │
         └─ preventDefault() click

         ▼
No navigation happens
FunnelStepper stays on same step
```

---

## Debug: Visualiser l'état du store

```typescript
// Dans un composant
import { useFunnelFlow } from '@/composables/useFunnelFlow';

const { logFunnelState } = useFunnelFlow();

// Dans la console:
logFunnelState();

// Output:
// 🎬 Funnel State
// Current Step: 3 (algo)
// Title: Algo
// Can Advance: true
// Is Last Step: false
// Progress: 42%
// Data: {
//   1: { prompt: "Create a sunset scene" },
//   2: { quality: "high", concurrency: 4 },
//   3: { algo: "sora" }
// }
```

---

## Résumé

✅ **Pinia Store** = Source unique de vérité
✅ **Composables** = Facilités d'accès
✅ **Components** = UI intelligente
✅ **URL Sync** = State persistant
✅ **Auto-text** = CTA adaptatif
✅ **Type-safe** = TypeScript everywhere

**Résultat**: Un flow fluide et maintenable! 🚀
