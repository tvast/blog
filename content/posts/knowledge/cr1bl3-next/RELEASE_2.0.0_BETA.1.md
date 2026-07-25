# .connect v2.0.0-beta.1 Release

**Release Date**: 2025-06-29  
**Channel**: Beta  
**Status**: 🟢 Foundation Ready

---

## 📦 What's Included

### Core Application
- **Name**: `.connect` (Digital Intelligence Cockpit)
- **Version**: 2.0.0-beta.1
- **Framework**: Quasar v2.14 + Vue 3 + TypeScript
- **Architecture**: WebSocket-driven micro-frontends

### Build & Distribution
```bash
# Development
pnpm install
pnpm dev --filter @cr1bl3/connect-web

# Production Build
pnpm build --filter @cr1bl3/connect-web
# → apps/connect-web/dist/spa/

# Server
pnpm dev --filter @cr1bl3/connect-ws-server
# → ws://localhost:3000
```

---

## ✨ Highlights

### 1. Quality-First Foundation
```
✅ TypeScript strict mode
✅ ESLint + Prettier (auto-fix)
✅ Vitest with 70%+ coverage
✅ Pre-commit hooks (Husky)
✅ GitHub Actions CI/CD
✅ Zero-config monorepo (pnpm + Turbo)
```

### 2. Global Quasar Context
```ts
// Accessible ANYWHERE without injection
import { useQuasar } from '@/composables/useQuasar'

const q = useQuasar()
q.success('Done!')
q.dialog('Confirm?')
q.loading.show('Loading...')
q.theme.toggle()
```

### 3. WebSocket Real-Time
```ts
// Two-way communication
const { subscribe, broadcast } = useWebSocket({
  url: 'ws://localhost:3000'
})

subscribe('graph:update', (msg) => {
  console.log('Graph changed:', msg.payload)
})

broadcast('ui:notification', { message: 'Updated' })
```

### 4. CR1BL3 CLI Integration (via Yalc)
```ts
// Use your original CLI utilities
import { logger } from '@cr1bl3/cli-wrapper'
logger.success('Setup complete!')

// Live editing — changes appear immediately
cd ../CR1BL3/@d0c/cr1bl3-lib
yalc publish
# Changes reflected in connect-web instantly!
```

### 5. Micro-Frontend Pattern
```vue
<script setup lang="ts">
import { useWebSocket } from '@/composables/useWebSocket'
import { useQuasar } from '@/composables/useQuasar'

const { subscribe } = useWebSocket({ url: '...' })
const q = useQuasar()

// Each panel is independent but synchronized
subscribe('data:update', (msg) => {
  q.success('Data refreshed')
})
</script>
```

---

## 📊 Stats

| Metric | Value |
|--------|-------|
| **Lines of Code** | ~2,500 |
| **Test Coverage** | 70%+ required |
| **Packages** | 8 (foundation) |
| **Apps** | 2 (web + server) |
| **Branches** | 5 (master + 4 feature) |
| **Documentation** | ~50 pages |
| **Build Time** | ~30s (cached) |
| **Bundle Size** | ~500KB (gzipped) |

---

## 🚀 Getting Started

### 1. Clone & Setup
```bash
cd /Users/d0c/.c0nnect/cr1bl3-next
pnpm install
pnpm run prepare  # Install git hooks
```

### 2. Verify Setup
```bash
pnpm run ci
# → lint ✓ typecheck ✓ test ✓ build ✓
```

### 3. Start Development
```bash
# Terminal 1: WebSocket server
pnpm dev --filter @cr1bl3/connect-ws-server
# → ws://localhost:3000 ✓

# Terminal 2: Web UI
pnpm dev --filter @cr1bl3/connect-web
# → http://localhost:9000 ✓
```

### 4. Build First Component
Read: `docs/FIRST_MICRO_FRONTEND.md` (5-minute tutorial)

---

## 📚 Documentation

Start here:
- **`QUICKSTART.md`** — Setup in 5 minutes
- **`CONTRIBUTING.md`** — Development workflow
- **`PROJECT_STATUS.md`** — Full roadmap

Deep dives:
- **`docs/UI_ARCHITECTURE.md`** — WebSocket + micro-frontends
- **`docs/TESTING.md`** — Test strategy & patterns
- **`docs/PLUGIN_GUIDE.md`** — Build plugins
- **`docs/YALC_SETUP.md`** — Local package mapping

---

## 🎯 Next Phases

### Phase 2: Integration (Ready Now)
Three branches ready to work on:

1. **chantier/jh4ck-integration** — Import Vue components
2. **chantier/scripts-integration** — Integrate legacy scripts
3. **chantier/bitcoinfinder** — Crypto recovery plugin

### Phase 3: Engine (Upcoming)
- [ ] Graph engine (query, build, traverse)
- [ ] Evidence store (immutable, audit trail)
- [ ] Insight engine (scoring, anomalies)
- [ ] Dashboard composer (dynamic UI generation)

### Phase 4: Ecosystem (Planned)
- [ ] Plugin marketplace
- [ ] Multi-user support
- [ ] Remote deployment
- [ ] Mobile client

---

## ⚠️ Beta Notes

### Known Limitations
- ❌ No persistent storage (in-memory only)
- ❌ Graph engine not yet implemented
- ❌ No authentication/authorization
- ❌ Limited plugin ecosystem (foundation only)
- ❌ No production deployment guide

### Breaking Changes May Occur
- API signatures may change
- Database schema not finalized
- Configuration format may evolve

### Feedback Welcome
Found a bug? Have a suggestion?  
→ GitHub Issues: https://github.com/d0c/c0nnect/issues

---

## 🔧 Requirements

```
Node.js:     >= 22.0.0
pnpm:        >= 9.15.0
Git:         >= 2.40
OS:          macOS, Linux, Windows (with WSL)
```

---

## 📦 Installation

### From GitHub
```bash
git clone https://github.com/d0c/c0nnect.git
cd c0nnect/cr1bl3-next
pnpm install
```

### Local Development
Already at `/Users/d0c/.c0nnect/cr1bl3-next` ✓

---

## 🎓 Learning Resources

### For Beginners
1. `QUICKSTART.md` — Get running
2. `CONTRIBUTING.md` — Learn standards
3. `docs/FIRST_MICRO_FRONTEND.md` — Build your first component

### For Developers
1. `docs/UI_ARCHITECTURE.md` — Understand architecture
2. `docs/TESTING.md` — Understand testing
3. `docs/PLUGIN_GUIDE.md` — Build plugins

### For Architects
1. `docs/architecture/QUALITY.md` — Quality decisions
2. `PROJECT_STATUS.md` — Roadmap & phases
3. Source code in `apps/connect-web/src/`

---

## 🙌 Contributors

**Architect**: d0c (Théophile Vast)  
**Foundation**: Based on CR1BL3 framework and jh4ck-front patterns  
**Testing**: Vitest + quality-first approach

---

## 📄 License

UNLICENSED (Private project)

---

## 🔗 Links

- **Repository**: https://github.com/d0c/c0nnect
- **Issues**: https://github.com/d0c/c0nnect/issues
- **Discussions**: https://github.com/d0c/c0nnect/discussions

---

## 🎉 Summary

**2.0.0-beta.1** is a **complete foundation** for building a digital intelligence platform:

✅ Production-grade quality infrastructure  
✅ Real-time WebSocket architecture  
✅ Global state management (Quasar)  
✅ Comprehensive documentation  
✅ 3 integration chantiers ready to start  

**Ready to build the next phase!** 🚀

---

**For support or questions, see PROJECT_STATUS.md or docs/**
