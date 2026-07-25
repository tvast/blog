# 🎯 Getting Started — 5 Minutes to Full Setup

Quickest path to running recovery-ui with automatic wallet indexing.

---

## ⚡ TL;DR — One Command

```bash
node setup.js
```

This does everything:
1. ✅ Creates `.env.local` with all settings
2. ✅ Lets you configure OpenSearch (optional)
3. ✅ Tests Docker connectivity
4. ✅ Shows next steps

**Then:**

```bash
docker-compose -f docker-compose.opensearch.yml up -d
npm run dev
```

Open **http://localhost:5173** and scan! 🚀

---

## 📋 What You'll Set Up

| Component | What It Does | Status |
|-----------|-------------|--------|
| **recovery-ui** | Desktop app to find wallets | ✅ Included |
| **OpenSearch** | Auto-indexes recovered files | ✅ Docker (optional) |
| **.env.local** | Configuration file | ✅ Created by `setup.js` |
| **Smart filter** | Fuzzy search on results | ✅ Built-in |
| **Apple recovery** | Scan old iPhone backups | ✅ Built-in |
| **Revolut export** | Send keys to your account | ✅ Included |

---

## 🚀 Step-by-Step (if you prefer manual)

### 1. Generate .env.local

```bash
node setup.js
```

Answer the prompts (all defaults are fine — just press Enter).

### 2. Install dependencies

```bash
npm install
```

### 3. Start OpenSearch (optional but recommended)

```bash
docker-compose -f docker-compose.opensearch.yml up -d
sleep 15
```

Test it:
```bash
curl http://127.0.0.1:9200/
```

### 4. Start recovery-ui

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

---

## 📁 What setup.js Creates

After running `node setup.js`, you'll have:

```
.env.local  ← Your local configuration (gitignored)
  ├─ RECOVERY_OPENSEARCH_URL=http://127.0.0.1:9200
  ├─ RECOVERY_OPENSEARCH_INDEX=recovery-matches
  ├─ RECOVERY_LOCAL_PROOF_SHA256= (optional)
  └─ VITE_FIREBASE_* (optional, for cloud)
```

**All settings are optional — defaults work fine.**

---

## 🔍 Your First Scan

In the app:

1. **Left panel** → Pick a **Source**
   - Home, Desktop, or Browse...
2. **Patterns** → Use defaults or add custom patterns
3. **Press Engage** → Watch the scan
4. **Results appear** → Click a result to reveal in Finder

Search results in **Local index** panel (auto-indexed).

---

## 🆘 Something Not Working?

### "setup.js failed"
```bash
# Check Node.js version
node --version  # Should be 16+

# Try again
node setup.js
```

### ".env.local not being used"
```bash
# Restart recovery-ui (it reads .env.local on startup)
npm run dev
```

### "OpenSearch offline"
```bash
# Is Docker running?
docker ps

# Is OpenSearch container up?
docker-compose -f docker-compose.opensearch.yml ps

# Start it
docker-compose -f docker-compose.opensearch.yml up -d
```

### "npm install fails"
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 📖 Learn More

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** — Detailed step-by-step (with explanations)
- **[INDEX.md](./INDEX.md)** — Full feature overview and docs map
- **[QUICKSTART_FULL_WORKFLOW.md](./QUICKSTART_FULL_WORKFLOW.md)** — Complete workflow tutorial
- **[LOCAL_INDEX.md](./LOCAL_INDEX.md)** — OpenSearch configuration & troubleshooting

---

## ✅ Quick Checklist

After setup:

```
□ .env.local exists (ls .env.local)
□ npm install completed (no errors)
□ Docker running (docker ps shows no errors)
□ OpenSearch online (curl http://127.0.0.1:9200/ returns version)
□ recovery-ui starts (npm run dev succeeds)
□ Browser loads app (http://localhost:5173 loads)
```

---

## 🎉 Ready to Go!

```bash
# Everything in one go:
node setup.js && \
  docker-compose -f docker-compose.opensearch.yml up -d && \
  npm run dev
```

Then open http://localhost:5173 and start scanning for wallets! 🔍

---

## 💡 Pro Tips

- **Skip Docker**: Recovery-ui works fine without OpenSearch. You just won't have the index.
- **Custom OpenSearch**: Set `RECOVERY_OPENSEARCH_URL` in `.env.local` to point elsewhere.
- **Local proof**: Add a password to prevent others from scanning: set `RECOVERY_LOCAL_PROOF_SHA256`.
- **Offline mode**: Everything is local. No internet needed once running.

---

**Next:** Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed explanations, or jump straight to scanning! 🚀
