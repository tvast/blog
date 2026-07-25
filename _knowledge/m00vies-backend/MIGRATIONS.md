# Database Migrations

This document explains how the migration system works and how to create new migrations.

## Overview

The moovies-ai backend uses a custom migration system for PostgreSQL:

- **Location**: `migrations/` directory (root of project)
- **Format**: SQL files with numeric prefixes (e.g., `001_init_tables.sql`)
- **Execution**: Automatic on app startup, idempotent (safe to re-run)
- **Tracking**: Stored in `_migrations` table in PostgreSQL

## How Migrations Work

### Startup Process

When the backend starts (REST API or gRPC):

1. **Validate environment variables**: Ensures `DB_USER` and `DB_NAME` are set
2. **Connect to database**: Uses configured connection (local TCP or Cloud SQL Unix socket)
3. **Create `_migrations` table**: If it doesn't exist (used to track applied migrations)
4. **Scan `migrations/` directory**: Reads all `.sql` files in alphabetical order
5. **Run pending migrations**: Executes only migrations not yet recorded in `_migrations`
6. **Record execution**: Adds filename + timestamp to `_migrations` table
7. **Start app**: Only proceeds if all migrations succeeded

### Idempotent Design

All migrations use `IF NOT EXISTS` clauses, making them safe to re-run:

```sql
CREATE TABLE IF NOT EXISTS jobs (...)
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
```

This means:
- ✅ Re-deploying same app version doesn't re-run migrations
- ✅ Safe to manually run `scripts/run-migrations.ts`
- ✅ Multiple instances can start simultaneously (first one runs migrations)

## Migration Files

### Current Migrations

| File | Purpose |
|------|---------|
| `001_init_tables.sql` | Create core tables: jobs, cost_log, payments, scenario_pools, scenarios, budget_state |
| `002_budget_state_singleton.sql` | Initialize budget_state singleton row |
| `003_seed_indexes.sql` | Add performance indexes for common queries |

### Schema

**`_migrations` table**:
```sql
CREATE TABLE _migrations (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL UNIQUE,
  executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Example content:
```
id | filename                    | executed_at
1  | 001_init_tables.sql         | 2026-04-06 10:15:30.123456
2  | 002_budget_state_singleton  | 2026-04-06 10:15:31.456789
3  | 003_seed_indexes.sql        | 2026-04-06 10:15:32.789012
```

## Creating New Migrations

### Step 1: Create migration file

Create a new SQL file in `migrations/` with the next sequential number:

```bash
# Get next number:
ls migrations/*.sql | sort | tail -1
# Example: 003_seed_indexes.sql → next is 004

# Create new migration:
touch migrations/004_add_user_table.sql
```

### Step 2: Write SQL with safety checks

**Always use `IF NOT EXISTS` or `IF NOT` clauses**:

```sql
-- Create new table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add column (for existing table)
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0;

-- Insert data (use ON CONFLICT for idempotency)
INSERT INTO budget_state (id, daily_spent, daily_limit, monthly_spent, monthly_limit, updated_at)
VALUES (1, 0.00, 50.00, 0.00, 300.00, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
```

### Step 3: Test locally

1. Add new migration file
2. Run app:
   ```bash
   yarn dev
   ```
3. Verify in logs:
   ```
   ✓ 004_add_user_table.sql
   ```
4. Query database:
   ```bash
   psql -U postgres -h localhost -d moovies -c "\dt"
   ```

### Step 4: Commit

```bash
git add migrations/004_add_user_table.sql
git commit -m "feat: add users table and email index"
```

## Running Migrations

### Automatic (on app start)

Migrations run automatically when the app starts:

```bash
yarn dev    # REST API
yarn dev:grpc  # gRPC server
```

### Manual (standalone script)

Run migrations without starting the app:

```bash
tsx scripts/run-migrations.ts
```

Output:
```
🔄 Running database migrations...
✓ Migrations tracking table ready
📋 Running 1 pending migration(s):
✓ 004_add_user_table.sql
✅ Migrations completed successfully
```

### Manual (direct SQL)

Connect to database and run SQL directly:

```bash
psql -U postgres -h localhost -d moovies -f migrations/004_add_user_table.sql

# Then record it (if not auto-recorded):
psql -U postgres -h localhost -d moovies -c "
INSERT INTO _migrations (filename) VALUES ('004_add_user_table.sql');"
```

## Viewing Migration History

```bash
psql -U postgres -h localhost -d moovies -c "
SELECT id, filename, executed_at FROM _migrations ORDER BY executed_at;"
```

Output:
```
 id |            filename            |       executed_at
----+--------------------------------+------------------------
  1 | 001_init_tables.sql            | 2026-04-06 10:15:30.123
  2 | 002_budget_state_singleton.sql | 2026-04-06 10:15:31.457
  3 | 003_seed_indexes.sql           | 2026-04-06 10:15:32.789
  4 | 004_add_user_table.sql         | 2026-04-06 15:42:10.234
```

## Best Practices

### ✅ DO

- Use `IF NOT EXISTS` clauses for idempotency
- Use explicit type conversions (avoid implicit casts)
- Add indexes for foreign keys and frequently-queried columns
- Name indexes descriptively: `idx_table_column`
- Use timestamps for created/updated dates
- Group related migrations (e.g., table + initial data)

### ❌ DON'T

- Use `DROP TABLE` or `DROP COLUMN` (destructive)
- Omit `IF NOT EXISTS` (breaks idempotency)
- Create migrations without numeric prefix
- Run migrations out of order
- Include data modification (INSERT/UPDATE/DELETE) in schema migrations
- Make breaking changes without backward compatibility

## Example: Adding a New Column

**Migration 004**: Add `description` column to `jobs` table

```sql
-- migrations/004_add_jobs_description.sql
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS description TEXT;
```

## Example: Data Migration

**Migration 005**: Populate `description` from `prompt`

```sql
-- migrations/005_populate_jobs_description.sql
UPDATE jobs SET description = prompt WHERE description IS NULL;
```

## Troubleshooting

### Migration won't run

**Check if already executed**:
```bash
psql -U postgres -h localhost -d moovies -c "
SELECT * FROM _migrations WHERE filename = '004_add_user_table.sql';"
```

If it exists but you want to re-run, delete the record:
```sql
DELETE FROM _migrations WHERE filename = '004_add_user_table.sql';
```

### Migration fails with syntax error

**Test SQL file**:
```bash
psql -U postgres -h localhost -d moovies -f migrations/004_add_user_table.sql
```

Fix syntax errors, then delete from `_migrations` and re-run.

### Lost migration history

If `_migrations` table is deleted, migrations will re-run but may fail if tables already exist. Use `IF NOT EXISTS` to prevent errors.

## Production Deployment

On Cloud Run + Cloud SQL:

1. Migrations run automatically on container startup
2. Multiple instances may start simultaneously; first one acquires lock (via `_migrations` table)
3. Once all migrations pass, app starts listening for traffic
4. Other instances wait for `_migrations` table to be ready, then start

See [CLOUD_RUN_DEPLOYMENT.md](./CLOUD_RUN_DEPLOYMENT.md) for full setup.

## Related Files

- **Schema definitions**: `migrations/001_init_tables.sql`
- **Migration runner**: `src/main.ts` and `src/main.grpc.ts` (call `runMigrations()`)
- **Standalone script**: `scripts/run-migrations.ts`
