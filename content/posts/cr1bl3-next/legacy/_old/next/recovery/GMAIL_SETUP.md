# 📧 Gmail Complete Setup Guide

## Quick Start (3 Steps)

### Step 1: Generate API Token (First Time Only)

```bash
cd /Users/d0c/Desktop/recovery
node generate-gmail-token.js
```

**What it does**:
- Opens Gmail OAuth consent screen
- You approve access
- Saves token to `~/.gmail-api-token.json`

### Step 2: Import ALL Emails

```bash
node gmail-import.js
```

**What it does**:
- Fetches EVERY email (no 100-limit)
- Imports to SQLite database
- Creates automatic backup/snapshot
- Shows progress & statistics

**Expected output**:
```
📧 Importing ALL emails from Gmail...

📄 Batch 1: Fetching up to 500 messages...
   Found 500 messages in this batch
   ✓ Processed 50/500
   ✓ Processed 100/500
   ...
   ✓ Processed 500/500

📄 Batch 2: Fetching up to 500 messages...
   Found 487 messages in this batch
   ...

✅ Reached end of all messages

============================================================
📊 Import Complete!
============================================================
📧 Total emails imported: 12,847
📅 Date range: 2012 - 2025
📁 Database: /Users/d0c/.data/gmail.db
📦 Size: 45.23 MB
============================================================
✅ Snapshot saved: /Users/d0c/.data/snapshots/gmail-2025-06-29.db
```

### Step 3: Verify in Recovery Studio

1. Open Recovery Studio UI
2. Look for Gmail results
3. Should show emails from 2012 onwards
4. Use fold-scroll UI to browse chronologically

## Key Differences (Old vs New)

| Feature | Old (Broken) | New (Fixed) |
|---------|-------------|-----------|
| Email limit | ~100 emails | **ALL emails** |
| Date range | 2017+ only | **2012 - 2025+** |
| Database | Corrupted | **Fresh SQLite** |
| Snapshots | None | **Auto-backup** |
| Speed | Slow (single) | **Fast (parallel)** |
| Error recovery | None | **Automatic** |

## Database Details

### Location
```
~/.data/gmail.db         ← Main database
~/.data/snapshots/       ← Auto-backups
```

### Size
- Empty: 1 MB
- 5,000 emails: 20 MB
- 10,000 emails: 40 MB
- 20,000 emails: 80 MB

### Performance
- Import time: 10-30 minutes
- Search: Instant (indexed)
- Full scan: <1 second

## Query Examples

### Count emails by year

```bash
sqlite3 ~/.data/gmail.db \
  "SELECT date_year, COUNT(*) as count FROM emails GROUP BY date_year ORDER BY date_year"
```

### Find oldest emails

```bash
sqlite3 ~/.data/gmail.db \
  "SELECT date_str, sender, subject FROM emails ORDER BY date_timestamp LIMIT 10"
```

### Search by sender (2012-2015)

```bash
sqlite3 ~/.data/gmail.db \
  "SELECT date_str, sender, subject FROM emails WHERE sender LIKE '%@gmail.com%' AND date_year BETWEEN 2012 AND 2015 ORDER BY date_timestamp"
```

### Export all to CSV

```bash
sqlite3 ~/.data/gmail.db \
  ".mode csv" \
  ".output emails.csv" \
  "SELECT date_str, sender, subject, is_read, is_starred FROM emails ORDER BY date_timestamp;" && \
  echo "✅ Exported to emails.csv"
```

## Troubleshooting

### Issue: "Token not found"

```bash
# Solution: Generate new token
node generate-gmail-token.js
```

### Issue: "Connection timeout"

```bash
# May take time on first run
# Just wait, don't cancel
# Can be 30+ minutes for large mailbox
```

### Issue: "Database locked"

```bash
# Recovery Studio using database
# Close Recovery Studio first, then retry
# Or kill the process:
pkill -f "recovery"
```

### Issue: Emails not showing in UI

```bash
# Restart Recovery Studio completely:
1. Close the app
2. Run: rm -f ~/.data/gmail.db-shm ~/.data/gmail.db-wal
3. Reopen the app
```

## Advanced Usage

### Backup database manually

```bash
cp ~/.data/gmail.db ~/.data/snapshots/gmail-manual-backup.db
```

### Restore from backup

```bash
cp ~/.data/snapshots/gmail-manual-backup.db ~/.data/gmail.db
```

### View database info

```bash
sqlite3 ~/.data/gmail.db \
  ".tables" \
  ".schema" \
  "SELECT COUNT(*) as total, MIN(date_year) as oldest, MAX(date_year) as newest FROM emails"
```

### Check import progress (while importing)

```bash
# In another terminal:
watch -n 5 'sqlite3 ~/.data/gmail.db "SELECT total_imported, min_year, max_year FROM import_stats"'
```

## What Gets Imported

✅ **From Address** - Who sent it  
✅ **Subject** - Email subject  
✅ **Date** - When sent (exact timestamp)  
✅ **Thread ID** - Conversation grouping  
✅ **Gmail Labels** - Categories, starred, etc.  
✅ **Read Status** - Unread indicator  

❌ **Email Body** - Not imported (too large)  
❌ **Attachments** - Not imported  

This is optimized for recovery and search, not full backup.

## Next Steps

1. **Import complete**: Check if you see all years
2. **Search emails**: Use fold-scroll UI to find by date
3. **Export results**: Download as CSV if needed
4. **Analyze patterns**: See email frequency by year

---

**Questions?** Check the database location and file size:

```bash
ls -lh ~/.data/gmail.db
sqlite3 ~/.data/gmail.db "SELECT COUNT(*) as emails FROM emails"
```

📧 Complete email history ready for analysis! ✨
