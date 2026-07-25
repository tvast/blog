# Data Storage Structure

This directory contains all data files for Recovery Studio.

## Directory Layout

```
.data/
├── emails/                    # Email storage
│   ├── gmail/                # Gmail API imports
│   ├── recovery/             # Recovered emails
│   └── archives/             # Archived emails
│
├── snapshots/                # Database snapshots & backups
│   ├── daily/                # Daily backups
│   ├── weekly/               # Weekly backups
│   └── monthly/              # Monthly backups
│
├── exports/                  # Exported data files
│   ├── csv/                  # CSV exports
│   ├── json/                 # JSON exports
│   └── backup/               # Backup files
│
├── backups/                  # System backups
│   ├── auto/                 # Automatic backups
│   └── manual/               # Manual backups
│
├── logs/                     # Operation logs
│   ├── import/               # Import logs
│   ├── scan/                 # Scan logs
│   └── errors/               # Error logs
│
├── cache/                    # Temporary cache
│
└── tokens/                   # API tokens (gitignored)
    └── gmail-api-token.json  # Gmail OAuth token
```

## Key Files

### Databases
- `gmail.db` - Main Gmail database (created by gmail-import.js)
- `*.db` in snapshots/ - Backup copies

### Generated Files
- CSV exports in `exports/csv/`
- JSON exports in `exports/json/`
- Import logs in `logs/import/`

### Tokens (Private)
- `tokens/gmail-api-token.json` - DO NOT COMMIT

## Storage Recommendations

| Folder | Purpose | Retention |
|--------|---------|-----------|
| emails/gmail | Gmail imports | Keep | 
| snapshots/daily | Hourly backups | 7 days |
| snapshots/weekly | Weekly backups | 4 weeks |
| snapshots/monthly | Monthly backups | 1 year |
| exports/csv | Data exports | As needed |
| logs/import | Import records | 30 days |
| cache | Temporary data | Auto-clean |

## Usage

### Import Gmail Emails
```bash
# Imports to: emails/gmail/
# Database: gmail.db
node gmail-import.js
```

### Export Results
```bash
# Exports to: exports/csv/ or exports/json/
# Use Recovery Studio UI
```

### View Backups
```bash
ls -lh .data/snapshots/
```

### Clean Cache
```bash
rm -rf .data/cache/*
```

## Size Estimates

| Item | Size |
|------|------|
| Gmail database (10k emails) | ~40 MB |
| Daily snapshot | ~40 MB |
| Weekly backup | ~40 MB |
| Monthly backup | ~40 MB |
| **Total (6 months)** | **~300 MB** |

## Notes

- All sensitive files (tokens) are gitignored
- Databases use WAL mode for reliability
- Snapshots are automatic during imports
- Logs are kept for audit trail
- Cache is ephemeral and safe to delete

---

For more info, see: GMAIL_SETUP.md
