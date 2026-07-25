# BYCICLE — Design System
### The Bicycle Clinic — "We're by your cycle"

Système de design dérivé du logo : le vélo haute-roue (pistard) + le caducée
(serpent + clé plate en guise de bâton d'Asclépios). Le positionnement est
clair : **la clinique de votre vélo**, un mélange d'expertise médicale
sérieuse et d'artisanat mécanique.

---

## 1. Palette de couleurs

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Primaire | Clinic Navy | `#132332` | Roue, cadre, wordmark "CICLE", texte principal |
| Primaire clair | Navy Light | `#1E3A52` | Hover / états actifs sur fond sombre |
| Secondaire | Caduceus Green | `#106E43` | Serpent, "BY", sous-titre, CTA principal |
| Secondaire clair | Green Light | `#1C9B5E` | Hover boutons, badges succès |
| Secondaire foncé | Green Dark | `#0B4E30` | Texte sur fond clair nécessitant contraste fort |
| Neutre | Off White | `#F7F9F8` | Fonds de page |
| Neutre | Grey 300 | `#C7CFCC` | Bordures, dividers |
| Neutre | Grey 700 | `#4C5754` | Texte secondaire |
| Alerte | Warning | `#D9A441` | "Réparation en attente" |
| Erreur | Danger | `#C0392B` | "Urgent" |
| Info | Info Blue | `#2E7FB8` | Notifications neutres |

**Règle de contraste** : le vert `#106E43` sur blanc passe AA (4.5:1) pour du
texte ≥ 14px ; en dessous, préférer `#0B4E30`.

---

## 2. Typographie

- **Wordmark / titres** : sans-serif géométrique à large chasse (tracking
  +0.05–0.08em), tout en capitales — proche de *Poppins ExtraBold* ou
  *Montserrat 800*. C'est la police du logo ("BYCICLE").
- **Sous-titres / labels** ("THE BICYCLE CLINIC", "WE'RE BY YOUR CYCLE") :
  même famille, poids Medium/SemiBold, tracking encore plus large
  (+0.2–0.3em), petites capitales.
- **Corps de texte / UI (app, factures, tickets de réparation)** : **Inter**
  — lisible, neutre, excellent en petites tailles sur mobile.

```scss
$font-display: 'Poppins', sans-serif; // wordmark, titres H1/H2
$font-body:    'Inter', sans-serif;   // UI, corps de texte
```

Échelle type (base 16px, ratio 1.25) :
`12 / 14 / 16 / 20 / 25 / 31 / 39 / 49px`

---

## 3. Logo — usages et zone de protection

- Le logo complet (pictogramme + wordmark + baseline) est réservé aux écrans
  d'accueil, en-têtes de documents et façade de boutique.
- Le **pictogramme seul** (roue + caducée) sert de favicon, icône d'app,
  avatar réseaux sociaux, tampon sur facture.
- Zone de protection minimale : hauteur du "B" de BYCICLE tout autour.
- Fond clair obligatoire pour la version couleur ; prévoir une version
  monochrome blanche pour les fonds navy/vert foncé (photos d'atelier,
  vidéos).
- Ne jamais : étirer, recolorer le serpent en dehors du vert de marque,
  séparer le pictogramme de la clé/serpent, ou faire pivoter le pictogramme.

---

## 4. Composants Quasar — tokens clés

| Token Quasar | Valeur |
|---|---|
| `$primary` | `#106E43` (vert clinique) |
| `$secondary` | `#132332` (navy) |
| `$accent` | `#1C9B5E` |
| `$dark` | `#132332` |
| `$positive` | `#1C9B5E` |
| `$negative` | `#C0392B` |
| `$warning` | `#D9A441` |
| `$info` | `#2E7FB8` |
| `$generic-border-radius` | `10px` |

**Boutons** : `q-btn` primaire en vert plein, label capitales, tracking léger
(`text-transform: uppercase; letter-spacing: .04em`) pour rappeler le
wordmark. Boutons secondaires en navy `outline`.

**Cards (fiches vélo / ticket de réparation)** : fond blanc, bordure
`1px solid $byc-grey-300`, radius `10px`, un bandeau de statut coloré en
haut (vert = prêt, warning = en cours, danger = urgent).

**Icône de statut** : réutiliser le petit rond du "stéthoscope" du logo
(cercle concentrique) comme puce de statut animée (pulse) sur les tickets en
cours de diagnostic.

---

## 5. Ton de voix

Chaleureux, rassurant, un peu complice — comme un bon mécano qui vous
explique sans jargon. Vocabulaire volontairement médical/clinique détourné
avec humour : "diagnostic", "ordonnance d'entretien", "salle d'attente"
(file d'attente atelier), "consultation" (devis).

Exemples :
- "Votre vélo a de la fièvre ? On l'ausculte."
- "Diagnostic gratuit, ordonnance honnête."
- "On est by your cycle, à chaque coup de pédale."

---

## 6. Fichiers livrés

```
bycicle-design-system/
├── css/
│   └── quasar.variables.scss     → à copier dans src/css/
├── components/
│   └── BycicleSplashScreen.vue   → écran de démarrage animé
├── assets/
│   └── bycicle-logo.png          → logo source (pour générer icônes)
└── docs/
    ├── brand-guide.md            → ce document
    └── quasar-splash-setup.md    → config native + PWA
```
