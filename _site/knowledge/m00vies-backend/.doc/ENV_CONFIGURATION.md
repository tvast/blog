# Environment Configuration Guide

## How Environment Variables Work

### Entry Point Flow
```
src/index.ts (ENTRY POINT)
  ↓
  imports dotenv
  ↓
  calls dotenv.config() ← LOADS .env file
  ↓
  process.env now populated with .env values
  ↓
  creates MooviesGateway
  ↓
  reads process.env.PORT (and others)
```

### Before Your Fix
❌ `.env` was **NOT** being loaded
- `process.env` was empty (except system vars)
- All defaults were used (PORT=3000, etc.)

### After Your Fix
✅ `.env` is **NOW** loaded at startup
- All variables are available
- Can override with command line: `PORT=8000 node dist/index.js`

## Available Environment Variables

### Application Configuration
| Variable | Type | Default | Location Used |
|----------|------|---------|----------------|
| `PORT` | number | 3000 | src/main.ts, src/index.ts |
| `NODE_ENV` | string | development | Various (dev/prod checks) |
| `LOG_LEVEL` | string | info | src/shared/logger.ts |

### Database
| Variable | Type | Default | Purpose |
|----------|------|---------|---------|
| `DATABASE_URL` | string | - | PostgreSQL connection string |
| `DB_HOST` | string | localhost | Database hostname |
| `DB_PORT` | number | 5432 | Database port |
| `DB_USER` | string | postgres | Database username |
| `DB_PASSWORD` | string | postgres | Database password |
| `DB_NAME` | string | moovies | Database name |

### Security & Authentication
| Variable | Type | Usage |
|----------|------|-------|
| `JWT_SECRET` | string | JWT token signing/verification |
| `API_KEY_PREFIX` | string | API key prefix (sk_dev, sk_live) |
| `API_KEY_EXPIRY_DAYS` | number | How long API keys last |
| `ALLOWED_ORIGINS` | string (comma-separated) | CORS allowed origins |
| `CORS_CREDENTIALS` | boolean (true/false) | Allow credentials in CORS |

### Budget & Billing
| Variable | Type | Usage |
|----------|------|-------|
| `DAILY_BUDGET_USD` | number | Daily spending limit |
| `MONTHLY_BUDGET_USD` | number | Monthly spending limit |
| `MAX_ESTIMATE_USD` | number | Maximum estimate amount |
| `ENABLE_COST_TRACKING` | boolean | Track API call costs |

### Video Generation Providers
| Variable | Type | Services Using It |
|----------|------|-------------------|
| `GEMINI_API_KEY` | string | Video generation service |
| `RUNWAY_API_KEY` | string | Video generation service |
| `KLING_ACCESS_KEY` | string | Video generation service |
| `KLING_SECRET_KEY` | string | Video generation service |
| `LUMA_API_KEY` | string | Video generation service |
| `COST_GEMINI` | number | Billing service (cost per second) |
| `COST_RUNWAY` | number | Billing service (cost per second) |
| `COST_KLING` | number | Billing service (cost per second) |
| `COST_LUMA` | number | Billing service (cost per second) |

### Firebase & Cloud Storage
| Variable | Type | Purpose |
|----------|------|---------|
| `FIREBASE_PROJECT_ID` | string | Firebase project identifier |
| `FIREBASE_BUCKET` | string | Firebase storage bucket |
| `STORAGE_BUCKET` | string | Primary storage bucket |
| `STORAGE_OUTPUT_PREFIX` | string | Path prefix for output files |

### Worker & Background Jobs
| Variable | Type | Purpose |
|----------|------|---------|
| `WORKER_ENABLED` | boolean | Enable background job worker |
| `MAX_CONCURRENT_JOBS` | number | Max jobs running simultaneously |
| `JOB_POLL_INTERVAL_MS` | number | How often to check job status |
| `PROVIDER_TIMEOUT_SEC` | number | Timeout for provider calls |

## Where Each Variable is Used

### src/main.ts
```typescript
const port = Number(process.env.PORT ?? 3000);  // Line 34
await app.listen(port, '0.0.0.0');
```
- Reads `PORT` environment variable
- Falls back to 3000 if not set

### src/shared/config.ts
```typescript
constructor() {
  this.config = {
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      name: process.env.DB_NAME || 'moovies',
      url: process.env.DATABASE_URL,
    },
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  };
}
```
- Creates a ConfigService that reads multiple env vars
- Used by: database, auth, server setup

### Proto Configuration
Variables like `DAILY_BUDGET_USD`, `MONTHLY_BUDGET_USD` are read by:
- Billing service for budget tracking
- Job estimation service for cost calculations

## Setting Environment Variables

### Method 1: .env File (Recommended)
```bash
# Create .env file in project root
PORT=8000
NODE_ENV=production
JWT_SECRET=your-super-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/moovies
```

Then run:
```bash
npm start
# dotenv.config() in index.ts loads these values
```

### Method 2: Command Line
```bash
PORT=8000 NODE_ENV=production npm start
```

### Method 3: Docker / Environment
```dockerfile
ENV PORT=8000
ENV NODE_ENV=production
ENV JWT_SECRET=your-secret
```

## Environment-Specific Configurations

### Development (.env)
```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
WORKER_ENABLED=false
ENABLE_COST_TRACKING=false
```

### Production (.env.prod)
```env
PORT=8001
NODE_ENV=production
LOG_LEVEL=info
WORKER_ENABLED=true
ENABLE_COST_TRACKING=true
CORS_CREDENTIALS=true
```

### CI/CD (.env.test)
```env
PORT=3000
NODE_ENV=test
DATABASE_URL=sqlite:///:memory:
WORKER_ENABLED=false
```

## Current .env File

Your project has a `.env` file with these sections:

1. **Application** - PORT, NODE_ENV, LOG_LEVEL
2. **Database** - DATABASE_URL and individual DB_* vars
3. **Security** - JWT_SECRET, API keys, CORS settings
4. **Video Providers** - API keys and cost rates
5. **Billing** - Budget limits and cost tracking
6. **Firebase** - Storage configuration
7. **Worker** - Background job settings
8. **Monitoring** - Prometheus, Sentry
9. **Backups** - Encryption keys

## Verification

To verify environment variables are loading correctly:

```bash
# After starting the server
npm start

# In another terminal, check the API:
curl http://localhost:3000/api
# Should see: { "name": "Moovies Gateway API", "status": "ok", ... }
```

## Common Issues

### Issue: PORT not being read
**Symptom**: Server starts on 3000 even though PORT=8000 in .env
**Cause**: dotenv not loaded before reading process.env.PORT
**Solution**: Ensure `dotenv.config()` is called in src/index.ts (FIXED ✅)

### Issue: Database connection string ignored
**Symptom**: Server uses DB_HOST/DB_PORT instead of DATABASE_URL
**Cause**: Code checks DATABASE_URL but falls back to individual vars
**Solution**: Set both for compatibility, or update code to prefer URL

### Issue: Secrets exposed in git
**Symptom**: Sensitive API keys in version control
**Solution**: Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
git rm --cached .env
git commit -m "Remove .env from tracking"
```

## Security Best Practices

1. ✅ **Never commit .env to git**
   - Add to `.gitignore`
   - Use `.env.example` instead

2. ✅ **Different secrets per environment**
   - Dev secrets in `.env`
   - Prod secrets in `.env.prod`
   - Use deploy secrets in CI/CD

3. ✅ **Rotate secrets regularly**
   - JWT_SECRET
   - API keys
   - Database passwords

4. ✅ **Use strong secrets**
   - Minimum 32 characters for JWT_SECRET
   - Generate with: `openssl rand -base64 32`

## Next Steps

1. Review and update `.env` with your actual values
2. Test: `npm run build && npm start`
3. Verify API: `curl http://localhost:3000/api`
4. Configure database connection
5. Set up authentication keys
