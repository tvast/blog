# SQLite Database Setup

This application uses **sql.js** for local SQLite database management with client-side password hashing and JWT-based session management.

## Architecture

### Database Storage
- **Engine**: sql.js (pure JavaScript SQLite)
- **Storage**: Browser's `localStorage` with key `escortme.db`
- **Format**: Binary database exported to JSON array for persistence

### Security
- **Passwords**: Hashed with bcrypt.js (10 salt rounds)
- **Tokens**: JWT (HS256) with 24-hour expiry
- **Sessions**: Stored in SQLite with token validation

## Database Schema

### Tables

#### `users`
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  displayName TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  role TEXT DEFAULT 'user',  -- 'user' or 'admin'
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)
```

#### `sessions`
```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expiresAt TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
)
```

**Indexes**:
- `idx_sessions_userId` - Fast user session lookups
- `idx_sessions_token` - Fast token validation

## Initialization

### Option 1: NPM Script (Recommended)

Initialize database with sample users:
```bash
npm run db:init
```

This will:
1. Create SQLite tables
2. Insert sample users from `src/data/sampleUsers.json`
3. Output credentials for testing
4. Display database summary

### Option 2: Shell Script

For Unix/macOS:
```bash
./scripts/init-db.sh
```

For Windows (in PowerShell):
```powershell
node scripts/init-db.mjs
```

### Sample Users

After initialization, you'll have access to these test accounts:

| Email | Password | Role |
|-------|----------|------|
| `demo@escortme.app` | `DemoPassword123` | user |
| `admin@escortme.app` | `AdminPassword123` | admin |
| `test@escortme.app` | `TestPassword123` | user |

## Usage in Code

### Authentication Service

The `localAuthService` provides:

```typescript
// Login
const session = await localAuthService.login(email, password)
// Returns: { token, expiresAt, user }

// Register
await localAuthService.register(email, password, displayName)

// Verify token
const payload = await localAuthService.me(token)

// Logout
await localAuthService.logout(token)

// Database backup
const backup = await localAuthService.backup()
```

### Database Seeding

Initialize database with sample data:
```typescript
import { seedDatabase } from '@/services/seedDatabase'

await seedDatabase()
```

Clear database:
```typescript
import { clearDatabase } from '@/services/seedDatabase'

await clearDatabase()
```

Reset (clear + seed):
```typescript
import { resetDatabase } from '@/services/seedDatabase'

await resetDatabase()
```

### Direct Database Queries

Execute queries:
```typescript
import { query, execute, transaction } from '@/services/sqlite'

// SELECT query
const users = await query('SELECT * FROM users WHERE role = ?', ['admin'])

// INSERT/UPDATE/DELETE
await execute('INSERT INTO users (...) VALUES (...)', [...])

// Transaction
await transaction(async () => {
  await execute('INSERT ...')
  await execute('UPDATE ...')
})
```

## Development Workflow

### 1. Fresh Start
```bash
# Start with sample data
npm run db:init
npm run dev
```

### 2. Clear Data
```bash
# Open browser console and run:
localStorage.removeItem('escortme.db')
# Refresh page - database will be recreated on next load
```

### 3. Reset Database
```bash
npm run db:reset
npm run dev
```

## Production Considerations

### ⚠️ Limitations
- SQLite in-memory database doesn't persist between browser sessions if localStorage is cleared
- Maximum database size depends on browser's localStorage limit (~5-10MB)
- Not suitable for multi-user backend scenarios

### 📋 For Production Migration

To migrate to a backend database:

1. **Create a backend API** for auth endpoints:
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `POST /api/auth/logout`
   - `GET /api/auth/me`

2. **Update** `localAuthService.ts` to call your backend API instead

3. **Keep** password hashing and JWT validation on backend

4. **Session management** can remain in localStorage with backend validation

## Troubleshooting

### Database Corruption
If you see "Corrupted user data" warning:
```typescript
import { clearDatabase } from '@/services/sqlite'
await clearDatabase()
// Refresh page - database will be reinitialized
```

### Token Expired
Sessions expire after 24 hours. User will be redirected to login.

### Password Verification Fails
Ensure bcryptjs is properly installed:
```bash
pnpm add bcryptjs
```

## File Structure

```
src/
├── services/
│   ├── sqlite.ts              # Database wrapper
│   ├── passwordHash.ts        # bcrypt utilities
│   ├── tokenUtils.ts          # JWT generation/verification
│   ├── idGenerator.ts         # UUID generation
│   ├── localAuthService.ts    # Auth logic using SQLite
│   └── seedDatabase.ts        # Database initialization
├── stores/
│   └── localAuthStore.ts      # Pinia auth state store
├── data/
│   └── sampleUsers.json       # Sample user data
└── boot/
    └── sqlite.ts              # Database boot initialization

scripts/
├── init-db.mjs                # Node script for DB initialization
└── init-db.sh                 # Shell wrapper script
```

## API Reference

### Authentication Store

```typescript
// Reactive properties
store.token           // Current session token
store.user            // Authenticated user
store.isLoading       // Loading state
store.error           // Error message
store.lastBackupPath  // Last backup file path

// Computed properties
store.isAuthenticated // boolean
store.isAdmin         // boolean

// Methods
await store.login(email, password)
await store.register(email, password, displayName)
await store.restore()       // Restore from localStorage
await store.logout()
await store.createBackup()
store.clearError()
```

### LocalAuthService

```typescript
import { localAuthService } from '@/services/localAuthService'

// All methods return Promise
await localAuthService.login(email, password)
await localAuthService.register(email, password, displayName)
await localAuthService.me(token)
await localAuthService.logout(token)
await localAuthService.backup()
```

## Testing

Login with sample credentials:
1. Navigate to `/login`
2. Enter sample user email and password
3. Click "Sign in"
4. You should be redirected to the dashboard

## Support

For issues or questions about the database setup, check:
- Browser DevTools Console for error messages
- localStorage contents: `localStorage.getItem('escortme.db')`
- Network requests if migrating to backend API
