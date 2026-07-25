# Changelog

All notable changes to .connect will be documented in this file.

## [2.0.0-beta.1] - 2025-06-29

### 🎉 Features

#### Foundation & Infrastructure
- ✨ **Quality-First Architecture** — TypeScript strict, ESLint, 70% test coverage minimum
- ✨ **CI/CD Pipeline** — GitHub Actions with lint, typecheck, test, build on every commit
- ✨ **Pre-commit Hooks** — Husky + lint-staged for local quality gates
- ✨ **Monorepo Setup** — pnpm workspaces + Turbo for fast, cached builds

#### Core Packages
- ✨ **@cr1bl3/types** — Foundational type definitions (GraphNode, Evidence, Plugin contract)
- ✨ **@cr1bl3/plugin-sdk** — Base classes and utilities for building plugins
- ✨ **@cr1bl3/cli-wrapper** — TypeScript wrapper around CR1BL3 CLI utilities

#### WebSocket Architecture
- ✨ **Central WebSocket Hub** — Real-time pub/sub orchestrator (`apps/connect-ws-server`)
- ✨ **Micro-Frontend Client** — Vue 3 + Quasar dashboard with WebSocket (`apps/connect-web`)
- ✨ **useWebSocket() Composable** — Vue 3 hook for real-time communication
- ✨ **Channel-Based Routing** — Pub/sub messaging with hierarchical channel names

#### Global State Management
- ✨ **QuasarContext Singleton** — Mutually accessible Quasar instance throughout app
- ✨ **useQuasar() Composable** — Access notifications, dialogs, theme, platform from anywhere
- ✨ **App Shell** — Header with connection status, theme toggle, footer

#### CR1BL3 Integration
- ✨ **Yalc Local Mapping** — Live editing of CR1BL3 packages without publish cycle
- ✨ **useCR1BL3() Composable** — Framework integration for Vue components
- ✨ **Component Auto-Loading** — Dynamic component loading from CR1BL3 library

### 📝 Documentation
- 📖 **QUICKSTART.md** — Get up and running in 5 minutes
- 📖 **CONTRIBUTING.md** — Developer workflow and standards
- 📖 **docs/TESTING.md** — Test pyramid and strategies (70% coverage)
- 📖 **docs/UI_ARCHITECTURE.md** — Complete WebSocket architecture guide
- 📖 **docs/YALC_SETUP.md** — Local package mapping workflow
- 📖 **docs/PLUGIN_GUIDE.md** — Step-by-step plugin creation guide
- 📖 **docs/FIRST_MICRO_FRONTEND.md** — Build your first component (5-min tutorial)
- 📖 **docs/CONFIG_FILES.md** — Reference for all config files
- 📖 **docs/architecture/QUALITY.md** — Quality decisions and tooling

### 🎯 Integration Chantiers (Ready to Start)
- 📋 **chantier/jh4ck-integration** — Import Vue components from jh4ck-front
- 📋 **chantier/scripts-integration** — Integrate _script_4TTACK_JS as plugins
- 📋 **chantier/bitcoinfinder** — Build comprehensive crypto recovery plugin

### 🔒 Quality & Safety
- ✅ TypeScript strict mode enforced
- ✅ No `any` types without comments
- ✅ Explicit return types required
- ✅ 70% minimum test coverage
- ✅ Pre-commit linting + formatting
- ✅ Automated CI/CD on GitHub

### 🛠️ Developer Experience
- 🔧 **Husky + Lint-Staged** — Auto-fix formatting before commit
- 🔧 **Vitest** — Lightning-fast unit tests with watch mode
- 🔧 **Turbo** — Cached, parallelized builds
- 🔧 **Prettier** — Auto-formatting (no debates)
- 🔧 **EditorConfig** — Consistent settings across editors

### 📦 Package Structure
```
cr1bl3-next/
├── apps/
│   ├── connect-web/              # Quasar + Vue 3 UI
│   └── connect-ws-server/        # WebSocket hub
├── packages/
│   ├── types/                    # Type definitions
│   ├── plugin-sdk/               # Plugin base classes
│   ├── cli-wrapper/              # CR1BL3 CLI wrapper
│   └── [upcoming: core, graph, evidence, insight]
├── plugins/
│   └── [upcoming: sherlock, crypto-finder, etc]
└── docs/
    └── [comprehensive architecture guides]
```

### 🎓 Learning Path
1. Read `QUICKSTART.md` (5 min)
2. Read `CONTRIBUTING.md` (standards)
3. Run `pnpm run ci` (verify setup)
4. Explore `apps/connect-web/src/App.vue` (entry point)
5. Try `docs/FIRST_MICRO_FRONTEND.md` (build first component)
6. Pick a chantier and start integrating

### 🚀 Next Phase (2.1.0)
- [ ] JH4CK components integrated
- [ ] Legacy scripts as plugins
- [ ] Crypto finder MVP
- [ ] Graph engine operational
- [ ] Evidence store persistence
- [ ] Dynamic dashboard composition

### 🙏 Credits
- **Architecture**: Inspired by your CR1BL3 CLI patterns and jh4ck-front components
- **Quality**: Built with software craftsmanship principles (type safety, tests, CI/CD)
- **Framework**: Powered by Quasar, Vue 3, TypeScript, Node.js

### 📋 Known Limitations (Beta)
- Graph engine not yet implemented
- No persistent storage (in-memory only)
- Limited plugin ecosystem (foundation only)
- No production deployment guide yet

### 🐛 Issue Reporting
Report bugs at: https://github.com/d0c/c0nnect/issues

### 📄 License
UNLICENSED (Private project)

---

**Status**: 🟢 Foundation Complete — Ready for Phase 2 Integration  
**Stability**: BETA — Breaking changes possible  
**Support**: Community feedback welcome
