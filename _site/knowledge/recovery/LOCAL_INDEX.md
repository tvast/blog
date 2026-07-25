# 🔍 Local OpenSearch Index

Automatically index all recovered wallet files in a local, searchable OpenSearch instance. Everything stays on your machine — zero cloud, zero telemetry.

## Quick Start

### 1. Start OpenSearch locally

```bash
docker-compose -f docker-compose.opensearch.yml up -d
```

This starts:
- **OpenSearch** on `http://127.0.0.1:9200` (search engine)
- **OpenSearch Dashboards** on `http://127.0.0.1:5601` (visual interface)

Wait 10-15 seconds for both services to be healthy.

### 2. Verify OpenSearch is running

```bash
curl http://127.0.0.1:9200/

# Expected response:
# {
#   "name": "...",
#   "cluster_name": "opensearch-cluster",
#   "version": { "number": "2.x.x" }
# }
```

Or check the status in the app: recovery-ui will show **✅ OpenSearch online** in the left panel.

### 3. Start a scan in recovery-ui

```bash
npm run dev
```

Then:
- Pick a source (folder, Apple device, disk image, etc.)
- Configure your patterns and content scan options
- Press **Engage scan**

Every match found will **automatically be indexed** into OpenSearch as it's discovered.

### 4. Search your index

After the scan completes (or while it's running):
- Go to the **Local index** section in the left panel
- Type a search query: `*.eth`, `wallet`, `seed`, etc.
- Results appear instantly, sorted by recency

Or use **OpenSearch Dashboards** directly at `http://127.0.0.1:5601`:
- Go to **Dev Tools** → **Console**
- Query the `recovery-matches` index:

```json
GET recovery-matches/_search
{
  "query": {
    "match_all": {}
  },
  "size": 100
}
```

---

## How It Works

### Automatic Indexing

When you run a scan, each match is **immediately indexed** into OpenSearch:

```
[Scan] → finds `wallet.dat` → emits 'match' event
      ↓
[OpenSearch indexing] → POST /_bulk → indexed in real-time
      ↓
[Dashboards] → refreshes → you can search it immediately
```

No manual steps. No "Index now" button. It just works.

### The Schema

Every indexed document contains:

```json
{
  "@timestamp": "2026-06-28T22:15:30.000Z",    // when it was found
  "indexedAt": "2026-06-28T22:15:30.000Z",    // when indexed
  "scanId": "scan-1719599730000",             // which scan?
  "sourceRoot": "/Volumes/MyDrive",           // where?
  "scanner": "electron-live",                 // how? (live folder, Apple backup, TSK image, etc.)
  "name": "wallet.dat",                       // filename
  "dir": "/Users/alice/.bitcoin",             // folder
  "path": "/Users/alice/.bitcoin/wallet.dat", // full path
  "kind": "name",                             // match type: 'name' or 'content'
  "size": 4096,                               // file size in bytes
  "deleted": false,                           // recoverable from deleted blocks?
  "detail": {                                 // what matched?
    "pattern": "*.dat"                        // the glob or byte pattern
  }
}
```

### Searching

The index is configured for **full-text search** with priority:

```
name^3    (filename matches count 3x more)
path^2    (path matches count 2x)
dir       (folder name)
kind      (type of match)
detail.*  (pattern details)
```

So `seed` will find:
- Files named `my-seed.txt` ← priority
- Files in `/home/user/seed-backups/` ← medium priority
- Files matching `*seed*` pattern ← included

---

## Troubleshooting

### "OpenSearch offline" in the app

Check:
```bash
curl http://127.0.0.1:9200/
```

If it fails:
1. Is Docker running? `docker ps`
2. Is the container healthy? `docker-compose -f docker-compose.opensearch.yml ps`
3. Did it finish starting? Wait 15-20 seconds and retry.
4. Check logs: `docker-compose -f docker-compose.opensearch.yml logs opensearch`

### "Indexing failed" notification

This usually means:
- OpenSearch crashed or is unreachable
- Check docker-compose logs
- The scan can still proceed — indexing is best-effort

### Index is growing too fast / old results are confusing

The index is persistent (stored in Docker volume `recovery-opensearch-data`). To clear it:

```bash
docker-compose -f docker-compose.opensearch.yml down -v
docker-compose -f docker-compose.opensearch.yml up -d
```

⚠️ This **deletes all indexed data**. Make sure you've saved what you need.

### Want to use a different OpenSearch instance?

Set environment variables:

```bash
export RECOVERY_OPENSEARCH_URL="http://your-host:9200"
export RECOVERY_OPENSEARCH_INDEX="my-custom-index"
npm run dev
```

Or in `.env.local`:

```
VITE_RECOVERY_OPENSEARCH_URL=http://your-host:9200
VITE_RECOVERY_OPENSEARCH_INDEX=my-custom-index
```

---

## Advanced: Direct API Usage

If you want to index results **outside** recovery-ui (e.g., from an offline scan):

```bash
node -e "
const os = require('./electron/opensearch.js')
const matches = [
  { path: '/wallet.dat', name: 'wallet.dat', dir: '/', kind: 'name', size: 4096, detail: { pattern: '*.dat' } }
]
os.indexMatches(matches, { scanId: 'manual', rootPath: '/', scanner: 'script' })
  .then(r => console.log('Indexed:', r.indexed))
  .catch(e => console.error('Error:', e.message))
"
```

---

## Security

✅ **Everything is local:**
- OpenSearch runs in a Docker container on **127.0.0.1:9200** (localhost only)
- No data leaves your machine
- No credentials needed (security plugin disabled for dev)
- Dashboards are also local-only (**127.0.0.1:5601**)

⚠️ **Do not expose to the network:**
- Don't bind to `0.0.0.0:9200` or expose via a public IP
- Don't run this on shared computers without understanding the implications
- The index contains your wallet file paths — keep it private

---

## Docker Management

Start OpenSearch:
```bash
docker-compose -f docker-compose.opensearch.yml up -d
```

Stop (data persists in volume):
```bash
docker-compose -f docker-compose.opensearch.yml stop
```

Stop + delete volume (⚠️ clears all indexed data):
```bash
docker-compose -f docker-compose.opensearch.yml down -v
```

View logs:
```bash
docker-compose -f docker-compose.opensearch.yml logs -f opensearch
docker-compose -f docker-compose.opensearch.yml logs -f dashboards
```

---

## Next Steps

1. **Start Docker** and launch OpenSearch
2. **Verify** it's running via curl or the app
3. **Run a scan** in recovery-ui
4. **Search** results in the app or Dashboards
5. **Export** results if needed (Dashboards → Export)

Good luck! 🚀
