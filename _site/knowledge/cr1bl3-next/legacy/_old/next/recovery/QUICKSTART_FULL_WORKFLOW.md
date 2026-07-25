# 🚀 Complete Workflow: Find + Index + Search

End-to-end guide to recover wallets, automatically index them, and search results locally.

## ⏱️ 5-Minute Setup

### 1. Start OpenSearch (1 minute)

```bash
# Terminal window 1
docker-compose -f docker-compose.opensearch.yml up -d
sleep 10
```

Verify it's running:
```bash
curl http://127.0.0.1:9200/
# Should see: OpenSearch version info
```

### 2. Test the Index (30 seconds)

```bash
# Terminal window 2
node test-opensearch.js
# Should see: ✅ All tests passed!
```

### 3. Start recovery-ui (30 seconds)

```bash
# Terminal window 2
npm run dev
# Opens http://localhost:5173
```

### 4. Run Your First Scan (2 minutes)

In the UI:
1. **Left panel** → Choose a **Source** (folder, Apple device, disk image)
2. **Patterns** → Add `*wallet*`, `*.eth`, `*.dat`, etc. (or use defaults)
3. **Content scan** → Check the box (optional, but finds more)
4. **Press Engage**

### 5. Search Results (30 seconds)

After the scan finds something:
1. **Left panel** → **Local index**
2. Type `wallet` or `seed` in the search box
3. Results appear instantly ✨

---

## 📊 The Full Picture

```
┌──────────────────────────────────────────────────────────────┐
│ YOUR COMPUTER                                                 │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  RECOVERY-UI (npm run dev)                                   │
│  ├─ Pick source (folder / Apple device / disk image)        │
│  ├─ Run scan                                                  │
│  └─ See results in table + search locally                    │
│       ↓                                                        │
│       IPC bridge (localhost only)                             │
│       ↓                                                        │
│  SCANNER (electron/scanner.js + variants)                    │
│  ├─ Filesystem walk / Apple backup / TSK image              │
│  ├─ Match patterns: *.wallet, *.dat, *seed*                 │
│  ├─ Match content: "wallet.dat", "defaultkey"               │
│  └─ Emit 'match' events                                       │
│       ↓                                                        │
│       Automatic indexing (no user action needed)              │
│       ↓                                                        │
│  OPENSEARCH (http://127.0.0.1:9200)                          │
│  └─ Index name: recovery-matches                             │
│     ├─ Stores: path, name, kind, size, timestamp             │
│     └─ Searchable immediately                                │
│       ↓                                                        │
│  DASHBOARDS (http://127.0.0.1:5601)                          │
│  └─ Visual browsing / filtering (optional)                   │
│                                                               │
│  SEND-TO-REVOLUT (node send-to-revolut.js)                  │
│  └─ Send recovered key to your Revolut account              │
│     (optional — only if recovering a personal key)           │
│                                                               │
│  ⚠️  ZERO NETWORK — Everything is local                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Real-World Scenarios

### Scenario 1: Recover a seed phrase from old iPhone backup

```
1. Click "Apple device..." → select your old iPhone backup
2. Add pattern: "*seed*"
3. Enable "Deep content scan"
4. Press Engage

Result: Found "seed-phrase.txt" → indexed → searchable
Recover it → use send-to-revolut.js to import to your account
```

### Scenario 2: Search all previous scans

```
1. All scans are indexed with their own scanId
2. Left panel → Local index
3. Filter by scan:
   - Query: scanId:scan-1719599730000
   - Or just search by filename across all scans
```

### Scenario 3: Export indexed results for analysis

```
# Get all wallet files found across all scans
curl 'http://127.0.0.1:9200/recovery-matches/_search?size=10000' \
  -H 'Content-Type: application/json' \
  -d '{ "query": { "match_all": {} } }' \
  | jq '.hits.hits[].._source' > results.json
```

---

## 📋 Checklist

Before you start:

- [ ] Docker is installed and running
- [ ] You have Node.js 16+ (`node --version`)
- [ ] You have at least 512 MB RAM available
- [ ] You've read the security notes (below)

After setup:

- [ ] `docker-compose ps` shows opensearch and dashboards running
- [ ] `curl http://127.0.0.1:9200/` returns OpenSearch version
- [ ] `node test-opensearch.js` passes all tests
- [ ] `npm run dev` starts recovery-ui on http://localhost:5173

---

## 🔒 Security Checklist

✅ **Everything is local:**
- OpenSearch listens only on 127.0.0.1:9200
- No data leaves your machine
- No cloud, no telemetry, no third-party services

⚠️ **Things to watch:**

| What | Risk | Mitigation |
|------|------|-----------|
| Docker volume | Persists data across restarts | Use `docker-compose down -v` to wipe |
| Index contents | File paths reveal what you searched | Treat index as sensitive; don't expose |
| UI on localhost | Others on your computer can access port 5173 | Run on trusted machines only |
| send-to-revolut.js | Asks for Revolut API key | Read the script first; key stays in RAM only |

---

## 🛠️ Common Tasks

### Stop OpenSearch (keep data)
```bash
docker-compose -f docker-compose.opensearch.yml stop
```

### Stop OpenSearch + wipe data
```bash
docker-compose -f docker-compose.opensearch.yml down -v
```

### Check logs
```bash
docker-compose -f docker-compose.opensearch.yml logs opensearch
```

### Search from command line
```bash
curl -s 'http://127.0.0.1:9200/recovery-matches/_search' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": { "match": { "name": "wallet" } },
    "size": 50
  }' | jq
```

### Index results manually
```bash
node -e "
const os = require('./electron/opensearch')
os.indexMatches([{path:'/test.dat',name:'test.dat',dir:'/',kind:'name',detail:{pattern:'*.dat'}}], {scanId:'manual'})
  .then(r => console.log('✅', r.indexed, 'indexed'))
"
```

---

## 📖 Detailed Guides

- **[LOCAL_INDEX.md](./LOCAL_INDEX.md)** — How to start and manage OpenSearch
- **[AUTOMATIC_INDEXING.md](./AUTOMATIC_INDEXING.md)** — How automatic indexing works
- **[SEND_TO_REVOLUT.md](./SEND_TO_REVOLUT.md)** — How to send recovered keys to Revolut

---

## ❓ Troubleshooting

### "OpenSearch offline" in recovery-ui

```bash
# Check if OpenSearch is running
docker-compose -f docker-compose.opensearch.yml ps

# If not running, start it
docker-compose -f docker-compose.opensearch.yml up -d

# Wait 15 seconds for it to be ready
sleep 15

# Verify connectivity
curl http://127.0.0.1:9200/
```

### "Scan starts but matches don't appear in Local index"

1. Make sure OpenSearch is running (see above)
2. Wait 1-2 seconds (eventual consistency)
3. Refresh the Local index search box
4. Check that scans are actually finding matches (see Results table)

### "Docker daemon is not running"

```bash
# Start Docker (macOS)
open -a Docker

# Or on Linux/Windows, use your Docker Desktop or service
# Then retry: docker-compose -f docker-compose.opensearch.yml up -d
```

### "Port 9200 is already in use"

```bash
# Find what's using port 9200
lsof -i :9200

# Kill it, or use a different port
RECOVERY_OPENSEARCH_URL=http://127.0.0.1:9201 npm run dev
```

### "OpenSearch crashes after a few minutes"

Check Docker memory allocation:
```bash
docker stats opensearch
```

If memory is maxed, increase Docker's available RAM in Docker Desktop settings.

---

## 🎓 What You'll Learn

After going through this workflow, you'll understand:

- How recovery-ui finds wallet files
- How results are automatically indexed
- How to search indexed results in real-time
- How to use OpenSearch Dashboards
- How to recover your own keys securely

---

## 🚀 You're Ready

Start with:

```bash
# Terminal 1: Start OpenSearch
docker-compose -f docker-compose.opensearch.yml up -d

# Terminal 2: Start recovery-ui
npm run dev
```

Then open http://localhost:5173 and start scanning! 🎉

---

## 💬 Questions?

- **Index not working?** → See [LOCAL_INDEX.md](./LOCAL_INDEX.md)
- **How does indexing work?** → See [AUTOMATIC_INDEXING.md](./AUTOMATIC_INDEXING.md)
- **How to use recovered keys?** → See [SEND_TO_REVOLUT.md](./SEND_TO_REVOLUT.md)
- **Need help with Docker?** → `docker-compose -f docker-compose.opensearch.yml logs`

Good luck! 🔍
