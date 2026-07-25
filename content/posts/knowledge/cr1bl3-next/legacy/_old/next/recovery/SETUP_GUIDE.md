# 🚀 Setup Guide — Step by Step

Complete walkthrough to get recovery-ui running locally with full indexing.

## ⏱️ Total Time: 10 minutes

---

## 📋 Prerequisites

Verify you have these installed:

```bash
# Node.js 16+
node --version

# npm or yarn
npm --version

# Docker (optional but recommended for indexing)
docker --version
```

If missing:
- **Node.js**: https://nodejs.org/
- **Docker**: https://www.docker.com/products/docker-desktop

---

## Step 1️⃣ — Generate Local Configuration (2 min)

### Option A: Interactive Setup (Recommended)

```bash
node setup.js
```

This will:
1. Copy `.env.local.example` → `.env.local`
2. Ask you to configure OpenSearch
3. Optionally set up a local proof (access password)
4. Test Docker connectivity

**Answer the prompts:**

```
Create .env.local from .env.local.example? (yes/no): yes

OpenSearch URL (default: http://127.0.0.1:9200): 
[Press Enter for default, or type a custom URL]

Index name (default: recovery-matches): 
[Press Enter for default, or type a custom name]

Add local proof? (no/yes): no
[Optional: set a password before allowing scans]
```

### Option B: Manual Setup

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` (all defaults are fine):
   ```bash
   nano .env.local
   # Or open in your editor
   ```

3. The file contains:
   ```ini
   # OpenSearch settings (leave as-is for defaults)
   # RECOVERY_OPENSEARCH_URL=http://127.0.0.1:9200
   # RECOVERY_OPENSEARCH_INDEX=recovery-matches
   
   # Optional: local access proof (password protection)
   # RECOVERY_LOCAL_PROOF_SHA256=...
   
   # Optional: Firebase (only for cloud features)
   # VITE_FIREBASE_...
   ```

---

## Step 2️⃣ — Install Dependencies (2 min)

```bash
npm install
```

This downloads all Node packages (may take 1-2 minutes).

---

## Step 3️⃣ — Start OpenSearch (Indexing) (3 min)

### Option A: Using Docker (Recommended)

```bash
# Start OpenSearch + Dashboards in the background
docker-compose -f docker-compose.opensearch.yml up -d

# Wait for services to be healthy (15-20 seconds)
sleep 20

# Verify it's running
curl http://127.0.0.1:9200/
# Should see OpenSearch version info
```

**What this does:**
- Starts OpenSearch on port **9200** (search engine)
- Starts OpenSearch Dashboards on port **5601** (web interface)
- Creates a persistent volume for your index data

### Option B: Skip OpenSearch for Now

You can **run recovery-ui without OpenSearch** — you just won't have automatic indexing. Scans will still work normally.

Skip to **Step 4**.

---

## Step 4️⃣ — (Optional) Test Indexing (1 min)

If you started OpenSearch:

```bash
node test-opensearch.js
```

Expected output:
```
ℹ️  Checking OpenSearch connection...
✅ Connected to OpenSearch 2.x.x at http://127.0.0.1:9200
✅ Index ready
✅ Indexed 3 documents
✅ Found 1 result(s) for "wallet"
✅ All tests passed! OpenSearch is ready.
```

If this **fails**, see [Troubleshooting](#troubleshooting).

---

## Step 5️⃣ — Start recovery-ui (1 min)

```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  build ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Step 6️⃣ — Open the App (30 sec)

Click or open in your browser:

```
http://localhost:5173
```

You should see the **PI Wallet Finder** interface with:
- ✅ Header with title and language selector
- ✅ Left panel with source picker
- ✅ Scan controls
- ✅ Results table (empty until you scan)

---

## Step 7️⃣ — Run Your First Scan (2 min)

### In the UI:

1. **Left panel** → **Source** dropdown
2. Pick a source:
   - **Home** — your home folder
   - **Desktop** — quick test
   - **Browse...** — custom folder
   - **Apple device...** — old iPhone/iPad backup
   - **Image...** — raw disk image (TSK)

3. **Patterns** — add search terms (or use defaults)
   - `*wallet*`, `*.eth`, `*.dat`, `*seed*`
   - Patterns with `/` match full paths

4. **Content scan** (optional but finds more):
   - Toggle `Deep content scan` on
   - Add byte patterns: `wallet.dat`, `defaultkey`

5. **Press Engage** to start the scan

### Watch the scan:

- **Files scanned** counter ticks up
- **Matches** counter increments when files are found
- **Sparkle animation** appears when new files arrive ✨
- Results appear in the **Results table** below

### After the scan:

- **Left panel** → **Local index** section
- Type `wallet`, `seed`, etc. in the search box
- Results appear instantly from OpenSearch

---

## 📂 Your .env.local File

After setup, `.env.local` will look like:

```ini
# OpenSearch settings
# RECOVERY_OPENSEARCH_URL=http://127.0.0.1:9200
# RECOVERY_OPENSEARCH_INDEX=recovery-matches

# Local proof (optional)
# RECOVERY_LOCAL_PROOF_SHA256=abc123...

# Firebase (optional, for cloud features)
# VITE_FIREBASE_API_KEY=...
```

✅ **All defaults work fine.** Uncomment lines only if you need to customize.

---

## 🔑 Environment Variables Explained

| Variable | Default | What It Does |
|----------|---------|--------------|
| `RECOVERY_OPENSEARCH_URL` | `http://127.0.0.1:9200` | Where OpenSearch listens (hostname:port) |
| `RECOVERY_OPENSEARCH_INDEX` | `recovery-matches` | Index name for storing results |
| `RECOVERY_LOCAL_PROOF_SHA256` | (none) | Optional: password hash for access control |
| `VITE_FIREBASE_*` | (none) | Optional: Firebase cloud integration |

---

## 🔒 Security Notes

✅ **Your .env.local is safe:**
- It's in `.gitignore` — never committed to git
- Local only — no cloud upload
- Credentials stay on your machine

⚠️ **If you add secrets:**
- Never commit `.env.local`
- Never paste it in chat or email
- Delete when done testing

---

## ✅ Verify Setup is Working

### Checklist:

```
□ Node.js installed (node --version)
□ npm dependencies installed (npm install completed)
□ .env.local created (ls -la .env.local)
□ Docker running (docker --version works)
□ OpenSearch running (curl http://127.0.0.1:9200/ returns version)
□ recovery-ui running (http://localhost:5173 loads)
□ Scan completes (even if no matches found)
□ Search works in "Local index" panel
```

---

## 🆘 Troubleshooting

### "Port 5173 already in use"

Another app is using the port. Either:

```bash
# Kill the other process, or:
# Use a different port (Vite will suggest one)
```

### "OpenSearch offline" in the app

```bash
# Check if OpenSearch is running
docker-compose -f docker-compose.opensearch.yml ps

# If not running, start it
docker-compose -f docker-compose.opensearch.yml up -d

# Check logs if it crashed
docker-compose -f docker-compose.opensearch.yml logs opensearch
```

### "Docker daemon is not running" (macOS)

```bash
# Start Docker Desktop app, or:
open -a Docker
```

### "npm install fails"

```bash
# Try clearing cache and reinstalling
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ".env.local not being used"

```bash
# Restart recovery-ui
npm run dev

# Or explicitly set variables:
RECOVERY_OPENSEARCH_URL=http://127.0.0.1:9200 npm run dev
```

### "Scan starts but no results"

1. Check patterns match your files
2. Make sure you have read permissions on the folder
3. Check the console (F12) for errors

### "Results aren't indexed"

1. Is OpenSearch running? `curl http://127.0.0.1:9200/`
2. Check OpenSearch logs: `docker-compose logs opensearch`
3. Results will still show in the table, just not in "Local index" search

---

## 🎓 What's Configured

After setup, you have:

✅ **Local scanner**  
- Searches your filesystem for wallet files
- Runs entirely on your computer

✅ **Automatic indexing**  
- Every match instantly indexed into OpenSearch
- Searchable in the "Local index" panel

✅ **Local dashboards** (optional)  
- Browse results at http://127.0.0.1:5601
- Full-text search, filtering, visualization

✅ **Apple device recovery** (NEW)  
- Scan old iPhone/iPad backups
- Resolve original file names and paths

✅ **Smart filtering** (NEW)  
- Fuzzy, typo-tolerant search
- Accent-insensitive matching

---

## 📖 Next Steps

After setup:

1. **Try a test scan** on your Desktop folder
2. **Read [INDEX.md](./INDEX.md)** for feature overview
3. **See [QUICKSTART_FULL_WORKFLOW.md](./QUICKSTART_FULL_WORKFLOW.md)** for hands-on examples
4. **Check [LOCAL_INDEX.md](./LOCAL_INDEX.md)** for OpenSearch deep dive

---

## 💬 Still Stuck?

1. Check the **Troubleshooting** section above
2. Read the **[LOCAL_INDEX.md](./LOCAL_INDEX.md)** guide
3. Check Docker logs: `docker-compose logs`
4. Open an issue on GitHub

---

## 🎉 You're Ready!

```bash
# One-liner to get started:
node setup.js && \
docker-compose -f docker-compose.opensearch.yml up -d && \
npm run dev
```

Then open http://localhost:5173 and start scanning! 🔍
