# PostgreSQL Local Development Setup

This guide explains how to set up PostgreSQL for local development of the moovies-ai backend.

## Prerequisites

- PostgreSQL 14+ installed and running
- `psql` CLI tool available (comes with PostgreSQL)
- Node.js 25+ and Yarn 4.13+

## Installation

### macOS (via Homebrew)

```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows

Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/).

## Local Database Setup

### 1. Create the database user and database

Connect as the default `postgres` user:

```bash
psql -U postgres -h localhost
```

In the psql prompt, create the database and user:

```sql
-- Create database
CREATE DATABASE moovies;

-- Create user (if using custom password)
CREATE USER moovies_dev WITH PASSWORD 'dev_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE moovies TO moovies_dev;

-- Exit psql
\q
```

### 2. Configure `.env` for local development

Create or update `.env` file in the backend root:

```env
NODE_ENV=development
LOG_LEVEL=debug
PORT=8001

# PostgreSQL Local Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=moovies
```

If you used a different username/password, update accordingly.

### 3. Start the backend

The migrations will run automatically on startup:

```bash
yarn install
yarn dev
```

You should see output like:

```
🔄 Running database migrations...
✓ Migrations tracking table ready
📋 Running 3 pending migration(s):
✓ 001_init_tables.sql
✓ 002_budget_state_singleton.sql
✓ 003_seed_indexes.sql
✅ Migrations completed successfully
✓ PostgreSQL connection established to localhost:5432
```

## Verifying the Setup

### Check database connection

```bash
psql -U postgres -h localhost -d moovies -c "SELECT 1;"
```

### View tables

```bash
psql -U postgres -h localhost -d moovies -c "\dt"
```

Expected output:

```
             List of relations
 Schema |       Name       | Type  | Owner
--------+------------------+-------+-------
 public | _migrations      | table | postgres
 public | budget_state     | table | postgres
 public | cost_log         | table | postgres
 public | jobs             | table | postgres
 public | payments         | table | postgres
 public | scenarios        | table | postgres
 public | scenario_pools   | table | postgres
(7 rows)
```

### View budget_state initialization

```bash
psql -U postgres -h localhost -d moovies -c "SELECT * FROM budget_state;"
```

Expected output:

```
 id | daily_spent | daily_limit | monthly_spent | monthly_limit |       updated_at
----+-------------+-------------+---------------+---------------+------------------------
  1 |        0.00 |       50.00 |          0.00 |        300.00 | 2026-04-06 12:34:56.789
```

## Common Tasks

### Reset database (local development only)

**Warning**: This deletes all data. Use only for local testing.

```bash
psql -U postgres -h localhost -c "DROP DATABASE moovies;"
psql -U postgres -h localhost -c "CREATE DATABASE moovies;"
```

Then restart the backend to re-run migrations:

```bash
yarn dev
```

### View connection info

```bash
psql -U postgres -h localhost -d moovies -c "SELECT version();"
```

### Manual migration check

You can manually run the migration script:

```bash
tsx scripts/run-migrations.ts
```

### View migration history

```bash
psql -U postgres -h localhost -d moovies -c "SELECT * FROM _migrations ORDER BY executed_at;"
```

### Query database directly

```bash
psql -U postgres -h localhost -d moovies

-- Inside psql:
SELECT * FROM jobs LIMIT 5;
SELECT COUNT(*) FROM cost_log;
SELECT * FROM budget_state;
\q  -- Exit
```

## Troubleshooting

### Connection refused on localhost:5432

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**: Ensure PostgreSQL is running:

```bash
# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql

# Verify
psql -U postgres -h localhost -c "\q"
```

### Authentication failed

**Problem**: `FATAL: password authentication failed for user "postgres"`

**Solution**:
1. Check your `.env` file has correct DB_PASSWORD
2. Reset PostgreSQL password:

```bash
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

### Migrations table doesn't exist

**Problem**: `relation "_migrations" does not exist`

**Solution**: This is normal on first run. The backend creates it automatically. If it doesn't:

```bash
psql -U postgres -h localhost -d moovies -c "
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL UNIQUE,
  executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);"
```

### Permission denied on /var/run/postgresql

**Problem**: `Error: connect EACCES permission denied`

**Solution** (Linux):
```bash
sudo chown -R $USER:$USER /var/run/postgresql
sudo systemctl restart postgresql
```

## Next Steps

- Read [MIGRATIONS.md](./MIGRATIONS.md) to understand how the migration system works
- Read [CLOUD_RUN_DEPLOYMENT.md](./CLOUD_RUN_DEPLOYMENT.md) for production deployment
- Review the schema in `migrations/001_init_tables.sql`
