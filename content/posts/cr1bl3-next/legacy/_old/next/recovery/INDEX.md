# 📚 Recovery UI Documentation Index

Complete guide to using recovery-ui for finding, indexing, and managing recovered wallet artifacts.

## 🎯 Start Here

**New user?** Start with [QUICKSTART_FULL_WORKFLOW.md](./QUICKSTART_FULL_WORKFLOW.md) — 5-minute setup guide.

---

## 📖 Core Features

### 1. 🔍 **Finding Wallets**
- **README.md** — Overview of the project
- **Source types:**
  - Local folders, USB drives, volumes → built-in scanner
  - **[Apple device backups](./LOCAL_INDEX.md#finding-wallets-apple-device)** → iTunes/Finder backups (iOS ≤ 9+ with Manifest.mbdb support)
  - **Disk images (TSK)** → FAT/NTFS raw images via The Sleuth Kit
  - **Remote sources** → NAS, e-mail servers (scaffolded, not yet active)

### 2. 🤖 **Intelligent Local Filtering**
- Smart fuzzy search on results (typo-tolerant, accent-insensitive)
- Multi-word AND matching
- Full-text index into `name`, `path`, `folder`, `deleted` status
- Sparkle animation when new files are found
- [Read more →](./SEND_TO_REVOLUT.md)

### 3. 🏠 **Apple Device Recovery** ← NEW
- Find old iPhone, iPad, iPod backups on your Mac
- Automatically resolve file names from backup manifests (iOS ≤ 9)
- Search by original paths, file names, or content
- Read about it: [no separate doc yet, see code in `electron/appleBackup.js`]

### 4. 🔐 **Automatic Indexing** ← CORE FEATURE
- Every match is automatically indexed into local OpenSearch
- Zero setup — just start OpenSearch and run a scan
- Real-time search across all scans
- [AUTOMATIC_INDEXING.md](./AUTOMATIC_INDEXING.md) — How it works
- [LOCAL_INDEX.md](./LOCAL_INDEX.md) — Setup & management

### 5. 💰 **Export to Revolut** ← NEW
- Securely send recovered private keys to your Revolut account
- API key requested at runtime (never stored)
- [SEND_TO_REVOLUT.md](./SEND_TO_REVOLUT.md) — How to use it

---

## 🚀 Getting Started

### Quick Path (5 minutes)
```bash
# 1. Start OpenSearch
docker-compose -f docker-compose.opensearch.yml up -d

# 2. Test indexing
node test-opensearch.js

# 3. Run recovery-ui
npm run dev

# 4. Start a scan, watch results get indexed automatically
```

→ See [QUICKSTART_FULL_WORKFLOW.md](./QUICKSTART_FULL_WORKFLOW.md)

### Full Setup
1. [LOCAL_INDEX.md](./LOCAL_INDEX.md) — Detailed OpenSearch setup
2. [AUTOMATIC_INDEXING.md](./AUTOMATIC_INDEXING.md) — How indexing works
3. [SEND_TO_REVOLUT.md](./SEND_TO_REVOLUT.md) — Export recovered keys

---

## 🛠️ Tools & Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start recovery-ui (Vite + Electron) |
| `node test-opensearch.js` | Verify OpenSearch connection & indexing |
| `node send-to-revolut.js <keyfile>` | Send recovered key to your Revolut account |
| `docker-compose -f docker-compose.opensearch.yml up -d` | Start OpenSearch + Dashboards locally |

---

## 📂 Project Structure

```
recovery-ui/
├── src/
│   ├── App.vue              # Main UI (Quasar)
│   ├── i18n.js              # Translations (EN/FR/ES)
│   └── css/                 # Styles
│
├── electron/
│   ├── main.js              # Electron main process + IPC handlers
│   ├── preload.js           # Secure IPC bridge
│   ├── scanner.js           # Local file scanner
│   ├── appleBackup.js       # Apple device backup parser ← NEW
│   ├── tsk.js               # The Sleuth Kit (raw image) reader
│   ├── opensearch.js        # OpenSearch client
│   ├── remotes.js           # Remote source scaffolding
│   └── main.js              # Entry point
│
├── docker-compose.opensearch.yml  # OpenSearch + Dashboards
│
├── send-to-revolut.js       # Export recovered keys to Revolut ← NEW
│
├── test-opensearch.js       # Test indexing & connectivity ← NEW
│
├── QUICKSTART_FULL_WORKFLOW.md    # 5-min setup guide ← NEW
├── LOCAL_INDEX.md                 # OpenSearch guide ← NEW
├── AUTOMATIC_INDEXING.md          # How indexing works ← NEW
├── SEND_TO_REVOLUT.md             # Revolut export guide ← NEW
└── package.json
```

---

## 🔄 The Flow: Find → Index → Search

```
[You pick a source]
    ↓
[Scan runs, finds matches]
    ↓
[Each match is IMMEDIATELY indexed into OpenSearch]
    ↓
[Results appear in UI table with sparkle animation]
    ↓
[Search in Local index panel OR OpenSearch Dashboards]
    ↓
[Reveal in Finder OR Recover from image OR Export to Revolut]
```

No manual indexing. No "Index now" button. It just works. ✨

---

## ⚙️ Configuration

### Environment Variables

```bash
# OpenSearch endpoint (defaults to localhost:9200)
export RECOVERY_OPENSEARCH_URL="http://127.0.0.1:9200"

# OpenSearch index name (defaults to recovery-matches)
export RECOVERY_OPENSEARCH_INDEX="my-index"
```

### Docker

The `docker-compose.opensearch.yml` file includes:
- **OpenSearch 2.x** on port 9200 (search engine)
- **OpenSearch Dashboards** on port 5601 (web interface)
- Persistent volume for index data
- Single-node cluster (dev mode)

---

## 🔒 Security & Privacy

✅ **Everything is local:**
- Scanner runs on your computer
- OpenSearch runs in Docker on localhost
- No network calls except to Revolut (when you explicitly use send-to-revolut.js)
- No data uploaded anywhere
- No credentials stored in the project

⚠️ **What to be aware of:**
- The index contains your file paths (treat as sensitive)
- Don't expose port 9200 to the network
- send-to-revolut.js asks for your API key at runtime (never logged)

---

## 📖 Documentation Map

| File | Purpose | Audience |
|------|---------|----------|
| [README.md](./README.md) | Project overview | Everyone |
| **[QUICKSTART_FULL_WORKFLOW.md](./QUICKSTART_FULL_WORKFLOW.md)** | **5-min setup** | **Start here** |
| [LOCAL_INDEX.md](./LOCAL_INDEX.md) | OpenSearch setup & troubleshooting | IndexNG users |
| [AUTOMATIC_INDEXING.md](./AUTOMATIC_INDEXING.md) | How automatic indexing works | Curious users |
| [SEND_TO_REVOLUT.md](./SEND_TO_REVOLUT.md) | Export to Revolut | Revolut users |
| [electron/appleBackup.js](./electron/appleBackup.js) | Apple backup parser (code) | Developers |
| [electron/opensearch.js](./electron/opensearch.js) | OpenSearch client (code) | Developers |

---

## 🆘 Troubleshooting

### "OpenSearch offline"
→ See [LOCAL_INDEX.md](./LOCAL_INDEX.md#troubleshooting)

### "Scan not finding matches"
→ Check patterns match your files (use defaults or add specific globs)

### "Results not indexing"
→ See [AUTOMATIC_INDEXING.md](./AUTOMATIC_INDEXING.md#troubleshooting)

### "Docker won't start"
→ Ensure Docker Desktop is running and has at least 2 GB RAM allocated

---

## 📊 What's New?

### June 2026 Updates

- ✨ **Apple Device Recovery** — Scan local iTunes/Finder backups for recovered keys
  - Supports Manifest.mbdb (iOS ≤ 9) with full name resolution
  - Graceful fallback for Manifest.db (SQLite) with content scanning
  
- 🤖 **Smart Local Filtering** — Fuzzy, accent-tolerant, multi-word search on recovered files
  - Typo-forgiving (spell `walet` and find `wallet.dat`)
  - Sparkle animation when new files arrive
  
- 💰 **Revolut Export** — Securely send recovered keys to your Revolut account
  - API key requested at runtime, never stored
  - Confirmation before sending
  
- 🔍 **Automatic OpenSearch Indexing** — Already existed, now documented
  - Every match indexed in real-time (no manual steps)
  - Searchable immediately
  - Persistent across scans

---

## 🎓 Learn More

- **OpenSearch docs**: https://opensearch.org/docs/
- **Revolut Crypto API**: https://developer.revolut.com/docs/api/revolut-x-crypto-exchange
- **The Sleuth Kit**: https://www.sleuthkit.org/
- **Quasar Framework**: https://quasar.dev/

---

## 💬 Questions?

- Check the troubleshooting sections in each guide
- Read the code comments (all major files are well-commented)
- Open an issue if you find a bug

---

**Happy recovering! 🔐**
