# Quick Integration Guide: parser.zip + next.zip

**TL;DR**: Three plugins to build + UI components to adapt

---

## 🎯 What You're Integrating

### parser.zip = Sherlock OSINT + Email Outreach
```
Python Flask app that:
- Scrapes public EU institutional emails
- Uses Sherlock to find social media accounts
- Sends personalized batch emails (rate-limited)
- Logs all sends (prevents duplicates)
```

**Reusable parts**:
- ✅ Sherlock integration (username → accounts)
- ✅ Email scraper (institution → contacts)
- ✅ SMTP rate limiter
- ✅ Send log (prevent duplicates)

### next.zip = EscortMe (Mapping + Intelligence)
```
Vue 3 Vite app that:
- Maps intelligence data
- Visualizes relationships
- Shows location-based insights
- Built with Quasar
```

**Reusable parts**:
- ✅ Map component (Mapbox)
- ✅ Data viz components
- ✅ Quasar patterns
- ✅ TypeScript setup

---

## 🛠️ Three Plugins to Build

### 1. Sherlock Plugin (PRIORITY: HIGH)
**What it does**: Look up usernames on 300+ sites

**From parser.zip**:
```python
# app.py → plugins/sherlock/src/index.ts
def run_sherlock(username):
    # Calls ./sherlock-suite/sherlock binary
    # Parses JSON output
    # Returns accounts found
```

**Result**:
```ts
// plugins/sherlock/src/index.ts
export const sherlockPlugin: Cr1bl3Plugin = {
  id: 'sherlock',
  async scan(input) {
    // 1. Call sherlock binary
    // 2. Parse results
    // 3. Create GraphNode for each account
    // 4. Return nodes + evidence
  }
}
```

**Time**: 2-3 days  
**Effort**: Medium  
**Complexity**: Moderate

---

### 2. Map Intelligence Component (PRIORITY: MEDIUM)
**What it does**: Display data on a map

**From next.zip**:
```vue
<!-- escortme/src/components/MapComponent.vue -->
<template>
  <div id="map"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
// Firebase imports → WebSocket
</script>
```

**Convert to**:
```vue
<!-- apps/connect-web/src/components/MapPanel.vue -->
<template>
  <q-card>
    <div id="map"></div>
  </q-card>
</template>

<script setup lang="ts">
import { useWebSocket } from '@/composables/useWebSocket'

const { subscribe } = useWebSocket({ url: '...' })

// Subscribe to location:update
// Update map markers
</script>
```

**Time**: 1-2 days  
**Effort**: Low  
**Complexity**: Simple

---

### 3. Email Outreach Plugin (PRIORITY: MEDIUM)
**What it does**: Send batch emails (rate-limited)

**From parser.zip**:
```python
# app.py → plugins/email-outreach/src/index.ts
def send_batch_emails(emails, template):
    # Rate limit to N emails/min
    # Check send log (don't resend)
    # Send via SMTP
    # Log success/failure
```

**Result**:
```ts
// plugins/email-outreach/src/index.ts
export const emailOutreachPlugin: Cr1bl3Plugin = {
  id: 'email-outreach',
  riskLevel: 'sensitive', // Requires approval!
  async scan(input) {
    // 1. Parse email list
    // 2. Apply rate limiting
    // 3. Check send log
    // 4. Queue emails
    // 5. Return events
  }
}
```

**Time**: 3-4 days  
**Effort**: High  
**Complexity**: Moderate (async job handling)

---

## 📋 Integration Checklist

### Step 1: Extract Archives
```bash
cd /tmp
unzip /Users/d0c/.c0nnect/parser.zip
unzip /Users/d0c/.c0nnect/next.zip

# Browse to understand structure
ls parser-sherlock-european-council-main/
ls escortme/
```

### Step 2: Create Branch
```bash
cd /Users/d0c/.c0nnect/cr1bl3-next
git checkout -b chantier/advanced-integration
```

### Step 3: Start with Sherlock
```bash
# 1. Create plugin directory
mkdir -p plugins/sherlock/src

# 2. Copy sherlock binary
cp -r /tmp/parser-sherlock-european-council-main/sherlock-suite plugins/sherlock/

# 3. Create plugin structure
touch plugins/sherlock/package.json
touch plugins/sherlock/tsconfig.json
touch plugins/sherlock/src/index.ts
touch plugins/sherlock/src/scanner.ts
touch plugins/sherlock/src/parser.ts
touch plugins/sherlock/src/index.test.ts

# 4. Implement
# Read app.py, extract sherlock logic
# Rewrite in TypeScript
# Add tests
```

### Step 4: Add Map Component
```bash
# 1. Extract components from escortme
cp /tmp/escortme/src/components/MapComponent.vue \
   apps/connect-web/src/components/MapPanel.vue

# 2. Convert Firebase imports to WebSocket
# Read INTEGRATION_STRATEGY.md for patterns

# 3. Test in browser
```

### Step 5: Email Plugin (Optional, sensitive)
```bash
# 1. Create plugin
mkdir -p plugins/email-outreach/src

# 2. Extract logic from parser
# app.py → SMTP rate limiting
# scrape_emails.py → email scraper

# 3. Implement with safety rails
# DRY-RUN mode by default
# Explicit confirmation required
# Rate limiting enforced
# Send log checked
```

---

## 📚 Key Files to Read

### From parser.zip
```
app.py                    ← Main Flask app (read this first)
scrape_emails.py          ← Email scraper logic
signals.py                ← Signal detection
sherlock-suite/           ← Binary + configs
eu-osint/                 ← Vue frontend (ignore, we have Quasar)
```

### From next.zip
```
src/components/           ← Vue components (extract these)
QUASAR_STYLE_GUIDE.md     ← Styling patterns (follow these)
vite.config.ts            ← (already have this)
firebase.json             ← (migrate to WebSocket)
```

---

## 🔄 Conversion Patterns

### Pattern 1: Firebase → WebSocket

**Before** (next.zip):
```ts
import { db } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore'

const locations = await getDocs(collection(db, 'locations'))
```

**After** (cr1bl3-next):
```ts
import { useWebSocket } from '@/composables/useWebSocket'

const { subscribe } = useWebSocket({ url: '...' })

subscribe('locations:update', (msg) => {
  locations.value = msg.payload
})
```

---

### Pattern 2: Python → TypeScript Plugin

**Before** (parser.zip):
```python
def run_sherlock(username):
    result = subprocess.run(
        [SHERLOCK_BIN, username, '--json'],
        capture_output=True
    )
    return json.loads(result.stdout)
```

**After** (cr1bl3-next):
```ts
async function runSherlock(username: string): Promise<SherlockResult> {
  const { stdout } = await exec(SHERLOCK_BIN, [username, '--json'])
  return JSON.parse(stdout)
}
```

---

### Pattern 3: Flask Handler → WebSocket Handler

**Before** (parser.zip):
```python
@app.route('/api/scan', methods=['POST'])
def scan():
    username = request.json['username']
    results = run_sherlock(username)
    return jsonify(results)
```

**After** (cr1bl3-next):
```ts
hub.registerHandler('sherlock:scan', async (message, clientId) => {
  const { username } = message.payload
  const results = await runSherlock(username)
  
  hub.broadcast('sherlock:result', { results })
})
```

---

## 🎨 UI Integration

### Map Component Integration
```vue
<!-- MapPanel.vue -->
<template>
  <q-card class="map-panel">
    <q-card-section>
      <h6>📍 Intelligence Map</h6>
    </q-card-section>
    
    <div id="map" style="height: 500px"></div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWebSocket } from '@/composables/useWebSocket'
import mapboxgl from 'mapbox-gl'

const { subscribe } = useWebSocket({ url: '...' })
const markers = ref([])

onMounted(() => {
  // Init map
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [0, 0],
    zoom: 2,
  })
  
  // Subscribe to location updates
  subscribe('locations:update', (msg) => {
    // Update map markers
  })
})
</script>

<style scoped>
#map {
  border-radius: 8px;
}
</style>
```

---

## ⚠️ Important: Sensitive Operations

### Email Outreach
**Risk Level**: SENSITIVE ⚠️

This plugin can:
- ✅ Send automated emails (potential spam)
- ✅ Scrape email addresses (potential privacy issue)
- ✅ Target individuals (potential harassment)

**Safety Requirements**:
1. **DRY-RUN default** — Show what would happen, don't send
2. **Explicit confirmation** — User must approve each send
3. **Rate limiting** — Max N emails/min
4. **Send log** — Never send twice to same address
5. **Audit trail** — Log every action
6. **Legal disclaimer** — "Use only with authorization"

```ts
export const emailOutreachPlugin: Cr1bl3Plugin = {
  // ...
  riskLevel: 'sensitive', // Requires approval
  
  async scan(input, context) {
    // 1. Check dry-run mode (default: true)
    if (dryRunMode) {
      return { summary: 'DRY-RUN: Would send X emails' }
    }
    
    // 2. Verify explicit confirmation
    if (!context.userApproved) {
      return { summary: 'Requires user confirmation' }
    }
    
    // 3. Check send log
    const alreadySent = await checkSendLog(emails)
    
    // 4. Only send new ones
    const toSend = emails.filter(e => !alreadySent.includes(e))
    
    // 5. Apply rate limiting
    for (const email of toSend) {
      await sleep(60000 / rateLimit) // Rate limit
      await sendEmail(email)
      await logSend(email)
    }
    
    return { summary: `Sent ${toSend.length} emails` }
  }
}
```

---

## 🎯 Success Criteria

When complete:

✅ Sherlock plugin working (finds 50+ accounts)  
✅ Map component displaying data  
✅ Email plugin with safety rails  
✅ All tests passing (70%+ coverage)  
✅ Security audit passed  
✅ Dashboard fully functional  

---

## 📖 Additional Resources

- `INTEGRATION_STRATEGY.md` — Detailed technical plan
- `docs/PLUGIN_GUIDE.md` — Plugin development guide
- `docs/UI_ARCHITECTURE.md` — Component patterns
- `docs/TESTING.md` — Test strategies

---

## 🚀 Start Now

```bash
# 1. Extract
cd /tmp && unzip /Users/d0c/.c0nnect/parser.zip

# 2. Branch
cd /Users/d0c/.c0nnect/cr1bl3-next
git checkout -b chantier/advanced-integration

# 3. Read
cat INTEGRATION_STRATEGY.md

# 4. Build
mkdir -p plugins/sherlock/src
# ... start implementing
```

**Estimated time**: 5-7 days for all three plugins + components

**Recommended priority**:
1. Sherlock (highest value)
2. Map component (medium value)
3. Email outreach (high complexity, requires careful security review)

Good luck! 🚀
