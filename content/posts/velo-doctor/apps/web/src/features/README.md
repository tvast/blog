# Bike Scan & Knowledge Base — intégration locale

Deux modules autonomes, sans backend ni appel réseau, ajoutés au socle existant.

## Bike Scan (`/bike-scan`)

- `bike-scan/types.ts` — types `BikeScanInput` / `BikeScanResult` + options des `QSelect`/`QOptionGroup`.
- `bike-scan/diagnosisRules.ts` — `runLocalBikeDiagnosis(input)`, moteur de règles pur (aucune I/O) qui associe
  chaque symptôme à des causes probables, tests, avertissements de sécurité et slugs d'articles liés. Les
  modificateurs par contrôleur/moteur/display affinent le résultat sans dupliquer les règles de symptômes.
- `bike-scan/store.ts` — store Pinia `bike-scan` : état du wizard (`input`, `step`) + `result`.
- `bike-scan/components/` — `SymptomPicker` (QOptionGroup checkbox), `BikeScanResultCard` (résultat + articles liés
  cliquables vers la KB), `BikeScanStepper` (QStepper à 7 étapes).
- `bike-scan/pages/BikeScanPage.vue` — page montée sur la route `bike-scan` (nom de route : `bike-scan`).

Pour ajouter un symptôme : étendre `SymptomCode` et `SYMPTOM_OPTIONS` dans `types.ts`, puis ajouter l'entrée
correspondante dans `SYMPTOM_RULES` (`diagnosisRules.ts`) avec ses `articles` (slugs de la Knowledge Base).

## Knowledge Base (`/knowledge-base`, `/knowledge-base/:slug`)

- Contenu Markdown : `src/knowledge-base/**/*.md` (frontmatter obligatoire : `title`, `slug`, `category`, `tags`,
  `symptoms`, `difficulty`, `safety`).
- `knowledge-base/kbLoader.ts` — charge tous les fichiers via `import.meta.glob(..., { query: '?raw', eager: true })`,
  parse le frontmatter avec un petit parseur maison (pas de dépendance Node type `gray-matter`, dont le `Buffer`
  casse en navigateur), expose `loadKnowledgeBase()`, `getArticleBySlug()`, `getArticlesBySlugs()`,
  `getRelatedArticles()`.
- `knowledge-base/kbSearch.ts` — `searchKnowledgeBase(articles, query, filters?)`, scoring pondéré
  (titre > tags/symptômes > catégorie > contenu), insensible aux accents/casse.
- `knowledge-base/store.ts` — store Pinia `knowledge-base-local` (query, category, tags → `results` calculé).
- `knowledge-base/components/` — `KnowledgeSearchBar`, `KnowledgeFilters` (catégorie + tags), `KnowledgeArticleCard`,
  `MarkdownRenderer` (rendu via `markdown-it`, contenu 100% local donc pas de risque XSS lié à une source externe).
- `knowledge-base/pages/` — `KnowledgeBasePage` (route `kb-index`) et `KnowledgeArticlePage` (route `kb-article`).

Pour ajouter une fiche : créer un `.md` dans le sous-dossier de catégorie approprié avec le frontmatter complet,
aucune étape de build ou d'enregistrement supplémentaire n'est nécessaire (glob eager).

## Intégration Bike Scan → Knowledge Base

`BikeScanResult.relatedArticles` contient des slugs (ex. `no-power`, `voltage-drop`, `wiring-check`,
`generic-chinese-controller`). `BikeScanResultCard` résout ces slugs via `getArticlesBySlugs()` et route vers
`kb-article` au clic — aucun couplage de données, seulement des slugs texte partagés entre les deux modules.

## Routes ajoutées (`src/router/index.ts`)

```
bike-scan                 -> name: bike-scan
knowledge-base             -> name: kb-index
knowledge-base/:slug       -> name: kb-article
```

Le nom `knowledge-base` était déjà pris par la page `/knowledge` existante (pilotée par l'API/IA) : les nouvelles
routes locales utilisent `kb-index` / `kb-article` pour éviter toute collision.

## Ce qui n'a pas été touché

Aucune page, store ou route existante n'a été modifiée à l'exception de deux ajouts d'entrées de navigation dans
`MainLayout.vue` (et un correctif mineur de `isActive()` pour éviter que `/knowledge` et `/knowledge-base` ne
s'activent tous les deux simultanément).
