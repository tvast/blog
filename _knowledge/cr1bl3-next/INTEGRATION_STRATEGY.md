# Integration Strategy: parser.zip + next.zip

**Goal**: Integrate two advanced projects into cr1bl3-next while maintaining quality standards.

---

## 📦 Project Analysis

### parser.zip: Sherlock EU OSINT
**Type**: Flask Python + Vue.js web app  
**Purpose**: Email scraping, EU institutional OSINT, batch outreach  
**Tech**: Python 3.14, Flask, Vue 3, Vite  
**Key Files**:
- `app.py` — Flask backend with OSINT logic
- `sherlock-suite/` — Sherlock binary + configs
- `scrape_emails.py` — Email scraper
- `signals.py` — Signal detection
- `eu-osint/` — Vue.js frontend

**Strengths**:
- ✅ Robust email scraping logic
- ✅ Sherlock integration (username lookup)
- ✅ SMTP rate-limited outreach
- ✅ Persistent send log
- ✅ Safety rails (DRY-RUN mode)

**Challenges**:
- ❌ Python backend (not TypeScript)
- ❌ No types
- ❌ Flask (not Express/WebSocket)
- ❌ Firebase dependency
- ❌ Tight coupling

---

### next.zip: EscortMe (Mapping Platform)
**Type**: Vue 3 + Vite + Firebase  
**Purpose**: Map-based intelligence, data visualization  
**Tech**: Vue 3, Quasar, Vite, Firebase, Mapbox  
**Key Files**:
- `src/` — Vue 3 components
- `components/` — Quasar components
- `QUASAR_STYLE_GUIDE.md` — Styling conventions
- `functions/` — Firebase Cloud Functions

**Strengths**:
- ✅ Modern Vue 3 + TypeScript
- ✅ Quasar integration
- ✅ Mapbox mapping
- ✅ Firebase setup (easily migrated)
- ✅ Clean component structure

**Challenges**:
- ❌ Firebase dependency (vs WebSocket)
- ❌ Tight Firebase coupling
- ❌ No WebSocket communication

---

## 🎯 Integration Approach

### Strategy: **Three Layers**

```
.connect (cr1bl3-next)
│
├── Layer 1: EXTRACT LOGIC
│   ├── Parse Python → TypeScript plugins
│   ├── Extract Vue components
│   └── Keep algorithms, drop frameworks
│
├── Layer 2: ADAPT INTEGRATION
│   ├── Firebase → WebSocket
│   ├── Flask backend → Plugin SDK
│   ├── Email scraping → Plugin
│   └── Map UI → Quasar component
│
└── Layer 3: UNIFY ARCHITECTURE
    ├── Global QuasarContext
    ├── WebSocket communication
    ├── Plugin execution
    └── Dashboard composition
```

---

## 📋 Integration Plan

### Phase 1: Sherlock Plugin (`plugins/sherlock/`)

**Extract from parser.zip**:
```
✅ Sherlock binary (use existing)
✅ Email scraping logic (Python → TypeScript)
✅ OSINT patterns (username → accounts)
✅ Rate limiting (adapt to WebSocket)
```

**Architecture**:
```ts
// plugins/sherlock/src/index.ts
export const sherlockPlugin: Cr1bl3Plugin = {
  id: 'sherlock',
  name: 'Sherlock OSINT',
  version: '0.2.0',
  capabilities: ['osint.username', 'osint.email'],
  inputs: ['username', 'email', 'domain'],
  outputs: ['alias', 'account', 'evidence'],
  riskLevel: 'sensitive',
  
  async scan(input, context) {
    // Integrate sherlock logic
    // Call subprocess to sherlock binary
    // Parse results
    // Return normalized nodes/edges/evidence
  }
}
```

**Integration Points**:
1. Wrap Sherlock binary execution
2. Parse `.txt` output files
3. Create GraphNode for each account found
4. Create Evidence for each discovery
5. Return via plugin contract

**TypeScript Rewrite**:
```ts
// plugins/sherlock/src/scanner.ts
export async function runSherlock(username: string, timeout = 30000): Promise<SherlockResult[]> {
  const binary = './sherlock-suite/sherlock'
  const args = [username, '--json', '--output', tempDir]
  
  const result = await exec(binary, args, { timeout })
  return parseSherlockJSON(result)
}

// plugins/sherlock/src/parser.ts
export function parseSherlockResult(json: any): GraphNode[] {
  return Object.entries(json).map(([site, data]) => ({
    id: `account-${site}-${json.username}`,
    type: 'account',
    label: `${json.username} on ${site}`,
    sourcePlugin: 'sherlock',
    confidence: 0.95,
    metadata: {
      site,
      url: data.url,
      username: json.username,
    }
  }))
}
```

---

### Phase 2: Map/Intelligence UI Components (`apps/connect-web/src/components/`)

**Extract from next.zip**:
```
✅ Map component (Mapbox)
✅ Data visualization components
✅ Quasar styling patterns
✅ Layout templates
```

**Convert**: 
- Firebase imports → WebSocket hooks
- Firebase Firestore → WebSocket subscriptions
- Component logic → useWebSocket()

**Example**:
```vue
<!-- Before (next.zip) -->
<script setup>
import { onMounted } from 'vue'
import { db } from '@/firebase'
import { getDocs } from 'firebase/firestore'

onMounted(async () => {
  const docs = await getDocs(locationsRef)
})
</script>

<!-- After (cr1bl3-next) -->
<script setup lang="ts">
import { useWebSocket } from '@/composables/useWebSocket'

const { subscribe } = useWebSocket({ url: '...' })

onMounted(() => {
  subscribe('locations:update', (msg) => {
    locations.value = msg.payload
  })
})
</script>
```

---

### Phase 3: Email Outreach Plugin (`plugins/email-outreach/`)

**Extract from parser.zip**:
```
✅ Email scraping (scrape_emails.py → TypeScript)
✅ SMTP rate limiting
✅ Send log (prevent duplicates)
✅ DRY-RUN mode
✅ Message templating
```

**Plugin**:
```ts
export const emailPlugin: Cr1bl3Plugin = {
  id: 'email-outreach',
  name: 'Email Outreach',
  version: '0.1.0',
  capabilities: ['outreach.email'],
  inputs: ['email_list', 'message_template'],
  outputs: ['outreach_event'],
  riskLevel: 'sensitive', // Requires explicit approval
  
  async scan(input, context) {
    // Scrape emails
    // Apply rate limiting
    // Check send log
    // Draft message with placeholders
    // Return evidence/events
  }
}
```

---

## 🔧 Implementation Roadmap

### Week 1: Foundation
- [ ] Extract Sherlock logic from parser.zip
- [ ] Create `plugins/sherlock/` TypeScript wrapper
- [ ] Write tests for Sherlock parser
- [ ] Integrate with WebSocket hub

### Week 2: UI Components
- [ ] Extract components from next.zip
- [ ] Convert Firebase → WebSocket
- [ ] Adapt Mapbox component
- [ ] Style with Quasar

### Week 3: Advanced Features
- [ ] Email scraper plugin
- [ ] Rate limiter implementation
- [ ] Send log database
- [ ] Outreach dashboard

### Week 4: Integration & Polish
- [ ] Full integration testing
- [ ] Security audit
- [ ] Documentation
- [ ] Ready for production

---

## 📂 File Organization

After integration:

```
cr1bl3-next/
├── apps/
│   └── connect-web/
│       └── src/
│           └── components/
│               ├── MapPanel.vue              (from next.zip)
│               ├── IntelligenceDashboard.vue (from next.zip)
│               └── OutreachPanel.vue         (new, from parser.zip)
│
├── plugins/
│   ├── sherlock/
│   │   ├── src/
│   │   │   ├── index.ts              (plugin def)
│   │   │   ├── scanner.ts            (sherlock binary wrapper)
│   │   │   ├── parser.ts             (parse results)
│   │   │   └── index.test.ts         (tests)
│   │   └── sherlock-suite/           (from parser.zip)
│   │
│   └── email-outreach/
│       ├── src/
│       │   ├── index.ts              (plugin def)
│       │   ├── scraper.ts            (email scraping logic)
│       │   ├── smtp.ts               (rate-limited sending)
│       │   └── index.test.ts         (tests)
│       └── node_modules/
│           └── nodemailer/           (SMTP client)
│
├── legacy/
│   ├── parser-sherlock/              (original source)
│   └── escortme/                     (original source)
│
└── docs/
    └── INTEGRATION.md                (this file)
```

---

## 🔌 WebSocket Integration Pattern

### Current Setup
```
Client → useWebSocket() → WebSocket Hub → Handler → Plugin → Result
```

### New Handlers (For Each Plugin)

```ts
// apps/connect-ws-server/src/index.ts

// Sherlock handler
hub.registerHandler('sherlock:scan', async (message, clientId) => {
  const { username } = message.payload
  const plugin = new SherlockPlugin()
  const result = await plugin.scan({ value: username }, {})
  
  hub.broadcast('sherlock:result', {
    requestId: message.id,
    result,
  })
})

// Email outreach handler
hub.registerHandler('outreach:scan', async (message, clientId) => {
  const { emails, template } = message.payload
  const plugin = new EmailOutreachPlugin()
  const result = await plugin.scan({ value: emails }, { template })
  
  hub.broadcast('outreach:status', {
    requestId: message.id,
    result,
  })
})
```

---

## 🛡️ Safety & Security

### Sensitive Operations
Both parser.zip and next.zip include sensitive features:
- ❌ Email scraping (potential spam/abuse)
- ❌ Outreach automation (potential harassment)
- ❌ OSINT on individuals (privacy risk)

### Mitigation
1. **Explicit Mode**: All sensitive plugins require user confirmation
2. **Audit Trail**: Every action logged
3. **Rate Limiting**: Prevent abuse (emails/min, API calls/min)
4. **DRY-RUN**: Test before execution
5. **Send Log**: Never send twice to same address
6. **Documentation**: Clear warnings about legal implications

```ts
export const emailPlugin: Cr1bl3Plugin = {
  // ...
  riskLevel: 'sensitive', // Requires explicit approval
  // ...
}
```

---

## 🧪 Testing Strategy

### Unit Tests
```bash
pnpm test --filter @cr1bl3/plugin-sherlock
pnpm test --filter @cr1bl3/plugin-email-outreach
```

### Integration Tests
```bash
# Test WebSocket communication
# Test plugin execution
# Test data normalization
```

### Manual Testing
1. Start WebSocket hub
2. Start UI
3. Send sherlock:scan command
4. Verify results displayed
5. Check browser console for errors

---

## 📊 Complexity Assessment

| Component | Complexity | Effort | Risk |
|-----------|-----------|--------|------|
| Sherlock plugin | Medium | 2-3 days | Low |
| Map UI component | Low | 1-2 days | Low |
| Email outreach | High | 3-4 days | High |
| Full integration | Medium | 5-6 days | Medium |

---

## ✅ Success Criteria

When complete, you should have:

✅ `@cr1bl3/plugin-sherlock` — Full OSINT plugin  
✅ `@cr1bl3/plugin-email-outreach` — Batch outreach plugin  
✅ Map components integrated into UI  
✅ All tests passing (70%+ coverage)  
✅ Security audit passed  
✅ Documentation complete  
✅ Dashboard showing all data  

---

## 🚀 Next Actions

1. **Extract Archives**
   ```bash
   cd /tmp
   unzip /Users/d0c/.c0nnect/parser.zip
   unzip /Users/d0c/.c0nnect/next.zip
   ```

2. **Create New Chantier**
   ```bash
   cd cr1bl3-next
   git checkout -b chantier/advanced-integration
   ```

3. **Start with Sherlock**
   ```bash
   mkdir -p plugins/sherlock/src
   # Copy sherlock-suite binary
   # Create plugin wrapper
   # Write tests
   ```

4. **Integrate Components**
   - Extract Vue components
   - Convert Firebase → WebSocket
   - Test in browser

5. **Add Email Plugin**
   - Wrap scraper logic
   - Rate limiter
   - Send log persistence

---

## 🔗 References

- `docs/PLUGIN_GUIDE.md` — Plugin creation reference
- `docs/UI_ARCHITECTURE.md` — WebSocket patterns
- `apps/connect-ws-server/src/index.ts` — Handler registration
- `CHANTIER_JH4CK.md` — Similar component integration

---

**Ready to integrate?** Start with Sherlock, then Map UI, then Email.

---
