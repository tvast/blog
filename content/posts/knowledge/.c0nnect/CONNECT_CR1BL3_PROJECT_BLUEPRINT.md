# .connect / cr1bl3 — Project Structure Blueprint

> **cr1bl3 is the engine. `.connect` is the cockpit.**  
> From scattered clues to persona graphs, population dashboards and recovery insights.

---

## 1. Vision

`.connect` est une plateforme modulaire de **Digital Intelligence**, pensée pour relier plusieurs familles de projets déjà existants :

- **Crypto Finder / Recovery** : retrouver, cartographier et prioriser des indices crypto locaux.
- **Sherlock / OSINT** : relier des pseudos, emails, comptes publics et traces numériques autorisées.
- **JH4CK / cr1bl3 legacy** : base UI, CLI, expérimentation cyber, dashboards, assistants IA.
- **Insight Engine** : moteur de corrélation, scoring, timeline, graph et génération de dashboards.
- **AI Orchestrator léger** : modèle local ou léger qui choisit les vues utiles sans inventer de faits.

Le produit ne doit pas être une simple collection d’outils.  
Il doit devenir un **framework de corrélation** :

```txt
Input → Collectors → Normalizer → Evidence Graph → Insight Engine → Dashboard
```

---

## 2. Naming

### Produit

```txt
.connect
```

### Framework / moteur

```txt
cr1bl3
```

### Scope npm

```txt
@cr1bl3/*
```

### Slogan

```txt
Everything starts with a clue.
```

Autres formulations utiles :

```txt
From clue to persona graph.
Digital traces into actionable insight.
Evidence before assumption.
```

---

## 3. Principes fondateurs

1. **Tout est un indice.**
2. **Tout indice devient un nœud.**
3. **Tout nœud peut rejoindre un graphe.**
4. **Chaque graphe peut former une persona.**
5. **Chaque persona peut appartenir à une population.**
6. **L’IA n’invente pas. Elle orchestre.**
7. **Aucune donnée sensible ne doit sortir sans consentement explicite.**
8. **Les modules offensifs legacy restent isolés, neutralisés ou archivés.**
9. **Le cœur doit fonctionner offline-first autant que possible.**
10. **La preuve prime sur l’hypothèse.**

---

## 4. Architecture cible

```txt
cr1bl3/
  apps/
    connect-web/
    connect-desktop/
    connect-api/
    connect-worker/

  packages/
    core/
    types/
    ui/
    config/
    logger/
    graph/
    evidence/
    timeline/
    persona/
    population/
    insight/
    ai-orchestrator/
    dashboard-composer/
    plugin-sdk/
    auth/
    crypto/
    storage/

  plugins/
    sherlock/
    crypto-finder/
    apple-backup/
    browser-artifacts/
    sqlite-scanner/
    wallet-timeline/
    github-osint/
    domain-osint/
    metadata-reader/
    file-indexer/

  legacy/
    cr1bl3-old/
    jh4ck-front/
    script-4ttack-js/
    extracted-security-tools/

  docs/
    architecture/
    decisions/
    migration/
    plugin-spec/
    security/
    prompts/

  scripts/
    migrate/
    audit/
    build/
    release/

  tests/
    fixtures/
    e2e/
    integration/
```

---

## 5. Choix technique recommandé

### Monorepo

Utiliser :

```txt
pnpm workspaces + Turborepo
```

Pourquoi :

- simple pour commencer ;
- compatible npm packages ;
- bon pour `apps/`, `packages/`, `plugins/` ;
- builds rapides ;
- migration progressive possible.

### Alternative plus stricte

```txt
Nx
```

À considérer plus tard si le projet devient très gros avec beaucoup de règles CI/CD.

---

## 6. Organisation npm

Chaque module stable peut devenir un package.

```txt
@cr1bl3/core
@cr1bl3/types
@cr1bl3/ui
@cr1bl3/graph
@cr1bl3/evidence
@cr1bl3/insight
@cr1bl3/persona
@cr1bl3/population
@cr1bl3/ai-orchestrator
@cr1bl3/dashboard-composer
@cr1bl3/plugin-sdk

@cr1bl3/plugin-sherlock
@cr1bl3/plugin-crypto-finder
@cr1bl3/plugin-apple-backup
@cr1bl3/plugin-browser-artifacts
@cr1bl3/plugin-sqlite-scanner
@cr1bl3/plugin-wallet-timeline
```

### Publication

Phase 1 :

```txt
packages privés dans le monorepo
```

Phase 2 :

```txt
GitHub Packages privé
```

Phase 3 :

```txt
npm public uniquement pour les modules propres, neutres et réutilisables
```

Ne pas publier les modules expérimentaux, dangereux, incomplets ou trop personnels.

---

## 7. Contrat plugin

Chaque plugin doit respecter un contrat minimal.

```ts
export type Cr1bl3NodeType =
  | 'person'
  | 'alias'
  | 'email'
  | 'account'
  | 'wallet'
  | 'device'
  | 'file'
  | 'backup'
  | 'domain'
  | 'event'
  | 'evidence'

export interface Cr1bl3Plugin {
  id: string
  name: string
  version: string

  description: string

  capabilities: string[]

  inputs: string[]
  outputs: Cr1bl3NodeType[]

  riskLevel: 'safe' | 'sensitive' | 'restricted'

  scan(input: PluginInput, context: PluginContext): Promise<PluginResult>
}
```

Exemple :

```ts
export const sherlockPlugin: Cr1bl3Plugin = {
  id: 'sherlock',
  name: 'Sherlock OSINT',
  version: '0.1.0',
  description: 'Searches authorized public profile signals from a username.',
  capabilities: ['osint.username.lookup'],
  inputs: ['username'],
  outputs: ['alias', 'account', 'evidence'],
  riskLevel: 'sensitive',

  async scan(input, context) {
    return {
      nodes: [],
      edges: [],
      evidence: [],
      summary: 'No verified account found yet.',
    }
  },
}
```

---

## 8. Modèle de donnée commun

### Node

```ts
export interface GraphNode {
  id: string
  type: Cr1bl3NodeType
  label: string
  sourcePlugin: string
  confidence: number
  createdAt?: string
  metadata?: Record<string, unknown>
}
```

### Edge

```ts
export interface GraphEdge {
  id: string
  from: string
  to: string
  relation:
    | 'same_as'
    | 'uses'
    | 'owns'
    | 'mentions'
    | 'found_in'
    | 'created_before'
    | 'linked_to'
    | 'derived_from'

  confidence: number
  evidenceIds: string[]
}
```

### Evidence

```ts
export interface Evidence {
  id: string
  source: string
  sourcePlugin: string
  type: 'file' | 'public_profile' | 'local_artifact' | 'transaction' | 'metadata' | 'manual_note'
  value: string
  hash?: string
  timestamp?: string
  confidence: number
  sensitive: boolean
}
```

---

## 9. Pipeline global

```txt
1. Input
   email / pseudo / wallet / backup / domaine / fichier / historique / sqlite

2. Plugin Runner
   exécute les plugins autorisés

3. Normalizer
   transforme les sorties en nodes / edges / evidence

4. Evidence Store
   conserve les preuves, sources et hashes

5. Graph Builder
   relie les entités

6. Timeline Builder
   reconstruit les événements

7. Persona Builder
   groupe les alias, emails, comptes et devices

8. Population Builder
   clusterise plusieurs personas

9. Insight Engine
   calcule confiance, anomalies, priorités

10. AI Orchestrator
   choisit les widgets et rédige les résumés factuels

11. Dashboard Composer
   génère les vues par persona et population
```

---

## 10. Dashboards

### Dashboard par persona

Widgets possibles :

```txt
Identity Graph
Alias Map
Email Map
Account Finder Results
Wallet Timeline
Device Evidence
Backup Evidence
Browser Artifacts
Confidence Matrix
Evidence Table
Next Best Actions
```

### Dashboard par population

Widgets possibles :

```txt
Cluster Overview
Population Segments
Common Platforms
Shared Domains
Wallet Patterns
Time Distribution
Anomaly Map
Top Personas
Risk / Recovery Signals
```

### Contrat widget

```ts
export interface DashboardWidget {
  id: string
  title: string
  type:
    | 'graph'
    | 'timeline'
    | 'table'
    | 'cards'
    | 'score'
    | 'map'
    | 'markdown'
    | 'chart'

  requiredNodeTypes: Cr1bl3NodeType[]
  priority: number
  component: string
}
```

---

## 11. IA légère

L’IA ne doit pas scanner directement.  
Elle doit recevoir des observations déjà structurées.

### Rôle

```txt
- choisir les widgets pertinents ;
- résumer les faits ;
- proposer des actions suivantes ;
- classer les pistes ;
- ne jamais inventer ;
- citer les evidenceIds.
```

### Modèles possibles

```txt
Ollama + Llama 3.2 3B
Phi-3 Mini
Gemma 2B/3B
Mistral Small via API si nécessaire
```

### Prompt système

```txt
You are the cr1bl3 Insight Orchestrator.

You receive structured JSON observations from trusted plugins.

Rules:
- Never invent facts.
- Never infer ownership without evidence.
- Always cite evidence IDs.
- Prefer uncertainty over overclaiming.
- Return valid JSON only.
- Select dashboard widgets based on available data.
```

---

## 12. Cartographie de l’existant

### `_script_4TTACK_JS/`

Contenu :

```txt
17.js
asundos.js
blackhorizon.js
blacknurse.js
bowser.js
canon.js
server.js
```

Statut recommandé :

```txt
legacy/restricted/script-4ttack-js/
```

Action :

- ne pas intégrer dans le produit principal ;
- conserver uniquement pour historique/lab local ;
- auditer ;
- neutraliser toute capacité offensive ;
- extraire éventuellement :
  - parsing CLI ;
  - animation terminal ;
  - structure de runner ;
  - UX console.

---

### `Archive/`

Contenu :

```txt
_script_4TTACK_JS.zip
CR1BL3.zip
extracted_files.zip
jail.conf
jh4ck-front.zip
```

Statut recommandé :

```txt
legacy/archive/
```

Action :

- garder comme source froide ;
- ne pas charger automatiquement ;
- documenter origine et date ;
- extraire seulement les éléments utiles.

---

### `CR1BL3/`

Contient déjà une base précieuse :

```txt
@d0c/cr1bl3-cli
@d0c/cr1bl3-lib
CR1BL3_BEHAVIOR.md
cr1bl3.config.json
public/
dist/
```

Statut recommandé :

```txt
legacy/cr1bl3-old/
```

À migrer vers :

```txt
packages/core/
packages/ui/
packages/config/
apps/connect-web/
```

Éléments à récupérer :

```txt
cr1bl3-cli/cli.js              → packages/cli
cr1bl3-cli/commands.js         → packages/cli
cr1bl3-cli/prompt.js           → packages/ai-orchestrator ou packages/cli
cr1bl3-cli/funkyConsoleLog.js  → packages/logger
cr1bl3-lib/components/*        → packages/ui
cr1bl3-lib/Router.js           → apps/connect-web/router
cr1bl3-lib/style.css           → packages/ui/styles
media3dUtility.js              → packages/ui/visuals
CR1BL3_BEHAVIOR.md             → docs/architecture/cr1bl3-principles.md
```

---

### `extracted_files/`

Contient plusieurs outils historiques de sécurité offensive :

```txt
goldeneye
pyloris
rudy
saddam
saddos
torshammer
ufonet-master
pentasec
```

Statut recommandé :

```txt
legacy/restricted/extracted-security-tools/
```

Action :

- ne pas intégrer dans `.connect` ;
- ne pas publier npm ;
- ne pas exposer dans l’UI ;
- conserver uniquement pour analyse historique ou lab isolé ;
- extraire éventuellement :
  - documentation ;
  - structures de config ;
  - visualisations ;
  - conventions CLI ;
  - listes user-agents uniquement si usage légal et neutre.

Note importante :

```txt
Ces outils sont à risque. Ils doivent rester hors du produit principal.
Le futur cr1bl3 doit être orienté défense, audit autorisé, recovery personnel et OSINT conforme.
```

---

### `jh4ck-front/`

Contenu :

```txt
Vue / Vite
Dashboard.vue
AutomationRunner.vue
ChatAssistant.vue
DeployWizard.vue
JHackServer.vue
ScriptCard.vue
Settings.vue
TwoFactorAuth.vue
rsaEncrypt.js
VoiceTorusLoader.js
ParticlesText.js
gemini.js
```

Statut recommandé :

```txt
legacy/jh4ck-front/
```

À migrer vers :

```txt
apps/connect-web/
packages/ui/
packages/auth/
packages/ai-orchestrator/
packages/crypto/
packages/dashboard-composer/
```

Éléments à récupérer :

```txt
Dashboard.vue          → apps/connect-web/views/dashboard
ChatAssistant.vue      → packages/ai-orchestrator/ui
AutomationRunner.vue   → apps/connect-web/views/jobs
DeployWizard.vue       → apps/connect-web/views/setup
ScriptCard.vue         → packages/ui/cards
Settings.vue           → apps/connect-web/views/settings
TwoFactorAuth.vue      → packages/auth
rsaEncrypt.js          → packages/crypto
ParticlesText.js       → packages/ui/visuals
VoiceTorusLoader.js    → packages/ui/visuals
```

---

## 13. Modules prioritaires

### MVP 1 — Foundation

```txt
@cr1bl3/types
@cr1bl3/core
@cr1bl3/plugin-sdk
@cr1bl3/ui
@cr1bl3/graph
@cr1bl3/evidence
apps/connect-web
```

Objectif :

```txt
Charger un input manuel et afficher un graphe minimal.
```

---

### MVP 2 — Crypto Recovery

```txt
@cr1bl3/plugin-crypto-finder
@cr1bl3/plugin-browser-artifacts
@cr1bl3/plugin-sqlite-scanner
@cr1bl3/plugin-wallet-timeline
```

Objectif :

```txt
Scanner localement des artefacts autorisés et produire un dashboard recovery.
```

---

### MVP 3 — OSINT autorisé

```txt
@cr1bl3/plugin-sherlock
@cr1bl3/plugin-github-osint
@cr1bl3/plugin-domain-osint
```

Objectif :

```txt
Créer une persona publique à partir d’un pseudo/email/domaine autorisé.
```

---

### MVP 4 — Insight AI

```txt
@cr1bl3/insight
@cr1bl3/ai-orchestrator
@cr1bl3/dashboard-composer
```

Objectif :

```txt
Générer automatiquement le dashboard pertinent selon les données.
```

---

## 14. Arborescence concrète à créer maintenant

```txt
mkdir -p cr1bl3-next/{apps,packages,plugins,legacy,docs,scripts,tests}

mkdir -p cr1bl3-next/apps/{connect-web,connect-desktop,connect-api}

mkdir -p cr1bl3-next/packages/{core,types,ui,config,logger,graph,evidence,timeline,persona,population,insight,ai-orchestrator,dashboard-composer,plugin-sdk,auth,crypto,storage}

mkdir -p cr1bl3-next/plugins/{sherlock,crypto-finder,apple-backup,browser-artifacts,sqlite-scanner,wallet-timeline,github-osint,domain-osint,metadata-reader,file-indexer}

mkdir -p cr1bl3-next/legacy/{cr1bl3-old,jh4ck-front,archive,restricted}

mkdir -p cr1bl3-next/docs/{architecture,decisions,migration,plugin-spec,security,prompts}
```

---

## 15. Commandes d’initialisation

```bash
mkdir cr1bl3-next
cd cr1bl3-next

pnpm init

cat > pnpm-workspace.yaml <<'EOF'
packages:
  - "apps/*"
  - "packages/*"
  - "plugins/*"
EOF
```

Créer un `package.json` racine :

```json
{
  "name": "cr1bl3-workspace",
  "private": true,
  "version": "0.1.0",
  "description": "cr1bl3 engine and .connect cockpit",
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test",
    "typecheck": "turbo typecheck"
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "latest"
  },
  "packageManager": "pnpm@latest"
}
```

Créer `turbo.json` :

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {},
    "typecheck": {}
  }
}
```

---

## 16. Règles de migration

### Ne pas faire

```txt
- ne pas copier tout en vrac ;
- ne pas publier les anciens outils offensifs ;
- ne pas mélanger UI, plugins et logique métier ;
- ne pas laisser l’IA appeler directement des outils sensibles ;
- ne pas créer un dashboard figé.
```

### Faire

```txt
- migrer par packages ;
- créer un contrat plugin stable ;
- normaliser toutes les sorties ;
- isoler les sources sensibles ;
- créer un Evidence Store ;
- construire le dashboard à partir du graphe ;
- garder les anciens projets en legacy lisible.
```

---

## 17. Plan de migration

### Étape 1 — Freeze

Créer :

```txt
legacy/
```

Y déplacer les projets existants sans modification.

```txt
legacy/cr1bl3-old/
legacy/jh4ck-front/
legacy/restricted/script-4ttack-js/
legacy/restricted/extracted-security-tools/
legacy/archive/
```

---

### Étape 2 — Foundation packages

Créer :

```txt
packages/types
packages/plugin-sdk
packages/core
packages/evidence
packages/graph
```

But :

```txt
Le graphe doit pouvoir fonctionner sans UI.
```

---

### Étape 3 — UI shell

Créer :

```txt
apps/connect-web
packages/ui
```

Routes minimales :

```txt
/
/inputs
/personas
/populations
/graph
/timeline
/evidence
/settings
```

---

### Étape 4 — Premier plugin safe

Commencer par un plugin non risqué :

```txt
plugins/file-indexer
```

Puis :

```txt
plugins/sqlite-scanner
plugins/browser-artifacts
plugins/crypto-finder
plugins/sherlock
```

---

### Étape 5 — Dashboard Composer

Créer :

```txt
packages/dashboard-composer
```

Il doit transformer :

```txt
GraphSnapshot + PersonaSnapshot + Evidence[]
```

en :

```txt
DashboardLayout
```

---

### Étape 6 — AI Orchestrator

Créer :

```txt
packages/ai-orchestrator
```

Il ne reçoit que du JSON validé.

---

## 18. Fichiers docs à créer

```txt
docs/architecture/vision.md
docs/architecture/data-model.md
docs/architecture/plugin-system.md
docs/architecture/dashboard-composer.md
docs/architecture/ai-orchestrator.md

docs/security/allowed-use.md
docs/security/restricted-legacy-tools.md
docs/security/privacy-first.md

docs/migration/source-inventory.md
docs/migration/migration-plan.md
docs/migration/legacy-map.md

docs/prompts/claude-architect.md
docs/prompts/codex-migration.md
docs/prompts/ai-orchestrator-system.md
```

---

## 19. Prompt Claude Architect

```txt
You are a principal software architect.

I provide multiple legacy projects:
- CR1BL3
- jh4ck-front
- crypto finder concepts
- Sherlock OSINT concepts
- restricted legacy security tools

Goal:
Create a clean monorepo architecture for cr1bl3 and .connect.

Important:
Do not simply merge files.
Do not preserve bad architecture.
Do not expose restricted/offensive legacy tools.
Transform useful parts into safe packages and plugins.

Architecture target:
- pnpm workspace
- apps/*
- packages/*
- plugins/*
- legacy/*
- docs/*

Core idea:
cr1bl3 is the engine.
.connect is the cockpit.

Everything is a clue.
Everything becomes evidence.
Evidence creates graph nodes and edges.
Graphs create personas.
Personas create populations.
Dashboards are composed dynamically.
AI orchestrates but never invents facts.

Tasks:
1. Inventory each source project.
2. Propose package boundaries.
3. Define plugin contracts.
4. Define data model.
5. Define migration sequence.
6. Generate only safe scaffolding.
7. Keep restricted tools in legacy/restricted and do not wire them into the product.
```

---

## 20. Prompt Codex Migration

```txt
You are a careful migration agent working inside a monorepo.

Rules:
- Never delete source legacy files.
- Never wire restricted offensive tools into the main app.
- Move code only when its purpose is clear.
- Prefer creating small packages.
- Add TypeScript types.
- Add README.md in every package.
- Add tests for normalizers and plugin outputs.
- Keep commits small.

Current goal:
Migrate useful parts of legacy CR1BL3 and jh4ck-front into cr1bl3-next.

Target:
- packages/ui
- packages/plugin-sdk
- packages/types
- packages/graph
- packages/evidence
- apps/connect-web

Expected output:
- file changes
- explanation
- next migration step
```

---

## 21. Prompt AI Orchestrator

```txt
You are the .connect dashboard orchestrator.

Input:
A JSON object containing:
- graph nodes
- graph edges
- evidence
- personas
- populations
- plugin summaries

Your job:
- select the best dashboard widgets
- summarize only verified facts
- highlight uncertainty
- suggest next actions
- cite evidence IDs

Rules:
- Never invent facts.
- Never claim ownership without evidence.
- Never expose sensitive values by default.
- Return valid JSON only.
```

---

## 22. Sécurité et conformité

`.connect` doit rester dans un cadre défensif, autorisé et personnel.

Cas acceptés :

```txt
- recovery personnel ;
- analyse de ses propres backups ;
- audit de ses propres comptes ;
- OSINT sur données publiques autorisées ;
- cartographie de surface d’exposition d’une organisation autorisée ;
- recherche d’indices pour conformité ou sécurité.
```

Cas interdits dans le produit :

```txt
- attaque DDoS ;
- exploitation non autorisée ;
- collecte massive abusive ;
- contournement d’accès ;
- doxxing ;
- automatisation agressive contre des services tiers ;
- publication de modules offensifs.
```

Les anciens outils présents dans `extracted_files/` et `_script_4TTACK_JS/` doivent être traités comme **archives restreintes**.

---

## 23. Première issue GitHub

```md
# Bootstrap cr1bl3-next monorepo

## Goal

Create the clean foundation for `.connect`, powered by `cr1bl3`.

## Tasks

- [ ] Create pnpm workspace
- [ ] Add Turborepo
- [ ] Create apps/connect-web
- [ ] Create packages/types
- [ ] Create packages/plugin-sdk
- [ ] Create packages/core
- [ ] Create packages/evidence
- [ ] Create packages/graph
- [ ] Create packages/ui
- [ ] Create plugins/file-indexer
- [ ] Create docs/architecture/vision.md
- [ ] Create docs/security/restricted-legacy-tools.md
- [ ] Move old projects into legacy/
- [ ] Add README for every package
- [ ] Add root README
```

---

## 24. README racine proposé

```md
# .connect

`.connect` is a modular digital intelligence cockpit powered by `cr1bl3`.

It transforms scattered digital traces into structured evidence, persona graphs, population dashboards and recovery insights.

## Core idea

Everything starts with a clue.

## Architecture

- `apps/` contains user-facing applications.
- `packages/` contains shared engines and libraries.
- `plugins/` contains capability modules.
- `legacy/` contains archived source projects.
- `docs/` contains architecture, migration and security notes.

## Safety

This project is designed for authorized security research, personal recovery, local analysis and defensive intelligence.

Restricted legacy tools are not wired into the product.
```

---

## 25. Résumé opérationnel

Ce que tu dois construire :

```txt
cr1bl3 = framework modulaire
.connect = interface cockpit
plugins = librairies npm branchables
insight = moteur de corrélation
ai-orchestrator = sélectionneur de vues et résumeur factuel
dashboard-composer = fabrique de dashboards
legacy = grenier sécurisé
```

La bonne direction :

```txt
Ne pas fusionner les projets.
Les transformer en modules.
```

Phrase de gouvernance :

```txt
A plugin can observe.
A graph can connect.
An insight can suggest.
Only evidence can prove.
```
