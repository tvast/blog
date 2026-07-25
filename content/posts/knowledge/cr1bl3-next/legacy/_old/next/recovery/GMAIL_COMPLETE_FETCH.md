# Gmail Complete Fetch - Get ALL Emails Since 2012

## Problem

❌ Previous implementation only fetched ~100 emails  
❌ Couldn't access emails before 2017  
❌ Gmail API pagination not fully implemented  

## Solution

✅ New script fetches **ALL emails** using proper pagination  
✅ Supports **unlimited results** (no 100-message cap)  
✅ Reaches back to **2012 and beyond**  
✅ Stores in SQLite for fast querying  

## Quick Start

### 1. Generate Gmail API Token (First Time Only)

```bash
node generate-gmail-token.js
```

This will:
- Ask you to visit a Google auth URL
- Give you an authorization code
- Save token to `~/.gmail-api-token.json`

### 2. Fetch ALL Emails

```bash
# Fetch every single email from Gmail (takes 10-30 minutes)
node gmail-fetch-all.js
```

Output:
```
📧 Fetching ALL emails from Gmail API (since 2012)...

📄 Fetching batch 1...
  Found 500 messages (total: 500)
  ✓ Processed 50/500
  ✓ Processed 100/500
  ...
  nextPageToken: CjAJR0ICJR0...

📄 Fetching batch 2...
  Found 500 messages (total: 1000)
  ...

✅ Finished! Fetched 12,847 emails
📅 Date range: 2012 - 2025
```

### 3. Check Statistics

```bash
# See how many emails were fetched
node check-gmail-stats.js
```

Output:
```
📊 Gmail Database Statistics
============================================================

📧 Total emails: 12,847
📅 Date range: 2012 - 2025
   (Jan 1, 2012 to Dec 31, 2025)

📈 Emails per year:
   2012:   234 ██▌
   2013:   456 ████▌
   2014:   789 ███████▉
   2015: 1,234 ███████████▌
   2016: 2,101 ████████████████████▌
   2017: 1,956 ███████████████████▌
   2018:   876 ████████▉
   2019:   567 █████▋
   2020:   234 ██▍
   2021:   123 █▎
   2022:    45 ▌
   2023:    12

👥 Top 10 senders:
   1. sender@gmail.com                        (2,345)
   2. support@service.com                     (1,234)
   3. notifications@app.com                     (567)
   ...

🚩 Email status:
   Unread: 123
   Starred: 45

📬 Sample emails:
   2012-01-15 [2012] sender1@gmail.com   - Subject line 1
   2015-06-20 [2015] sender2@gmail.com   - Subject line 2
   2017-11-05 [2017] sender3@gmail.com   - Subject line 3
   2020-03-12 [2020] sender4@gmail.com   - Subject line 4
   2025-12-31 [2025] sender5@gmail.com   - Subject line 5

✅ Database ready for analysis!
📁 Location: ~/.data/gmail-all.db
```

## How It Works

### API Pagination

```
Gmail API has NO hard limit on emails

Before (broken):
├─ Request 1: Get 10 emails (results 1-10)
├─ Request 2: Get 10 emails (results 11-20)
└─ Stop after 100 emails ❌

After (fixed):
├─ Request 1: Get 500 emails (results 1-500)
├─ Request 2: Get 500 emails (results 501-1000)
├─ Request 3: Get 500 emails (results 1001-1500)
├─ ...continue until nextPageToken is null...
└─ Get ALL emails ✅
```

### Database Schema

```sql
emails table:
├─ id                 (Primary Key)
├─ gmail_id           (Unique Gmail message ID)
├─ thread_id          (Gmail conversation thread)
├─ sender             (From address)
├─ recipient          (To address)
├─ subject            (Email subject)
├─ date_str           (Raw date string)
├─ date_timestamp     (Unix timestamp for sorting)
├─ date_year          (Year for filtering)
├─ body_preview       (Subject preview)
├─ labels             (Gmail labels)
├─ is_read            (Boolean)
├─ is_starred         (Boolean)
└─ created_at         (When indexed)

Indexes:
├─ idx_date      (Fast date filtering)
├─ idx_year      (Fast year filtering)
├─ idx_sender    (Fast sender search)
└─ idx_subject   (Fast subject search)
```

## Performance

### Time Estimates

| Emails | Fetch Time | Database | Search Speed |
|--------|-----------|----------|--------------|
| 1,000 | 2-3 min | ~5 MB | Instant |
| 5,000 | 8-10 min | ~25 MB | Instant |
| 10,000+ | 20-30 min | ~50 MB | Instant |

### Rate Limiting

- Gmail API: 1 QPS (quota unit per second)
- Script waits 100ms between message fetches
- Safe to run in background

## Database Queries

### Query all emails from 2012-2016

```bash
sqlite3 ~/.data/gmail-all.db \
  "SELECT date_str, sender, subject FROM emails WHERE date_year BETWEEN 2012 AND 2016 ORDER BY date_timestamp;"
```

### Export to CSV

```bash
sqlite3 ~/.data/gmail-all.db \
  ".mode csv" \
  ".output emails.csv" \
  "SELECT date_str, sender, subject, is_read, is_starred FROM emails ORDER BY date_timestamp;"
```

### Find emails before specific date

```bash
sqlite3 ~/.data/gmail-all.db \
  "SELECT COUNT(*) FROM emails WHERE date_timestamp < strftime('%s', '2017-01-01');"
```

## Troubleshooting

### "No token found"

```bash
# Generate new token first
node generate-gmail-token.js
```

### "UNIQUE constraint failed"

This is normal - means email was already in database. Script continues safely.

### "Rate limit exceeded"

Gmail API limits requests. Script automatically waits 100ms between requests.

### Check database file

```bash
# Check if database exists and has data
ls -lh ~/.data/gmail-all.db
sqlite3 ~/.data/gmail-all.db "SELECT COUNT(*) FROM emails;"
```

## Next Steps

1. **Export emails**: Convert CSV for other tools
2. **Analyze patterns**: Find oldest emails, frequency trends
3. **Recover data**: Use in Recovery Studio
4. **Search history**: Full-text search across 13 years of email

## Commands Reference

```bash
# Initial setup
node generate-gmail-token.js

# Fetch all emails (main)
node gmail-fetch-all.js

# Check progress
node check-gmail-stats.js

# View database
sqlite3 ~/.data/gmail-all.db ".tables"

# Update/re-fetch
node gmail-fetch-all.js  # Runs again, only adds new emails
```

## Storage

- **Location**: `~/.data/gmail-all.db`
- **Size**: ~50 MB for 10k emails
- **Backup**: Copy file before major operations

---

**Note**: First run takes time but subsequent runs only fetch new emails. Your complete email history is now accessible! 📧✨
