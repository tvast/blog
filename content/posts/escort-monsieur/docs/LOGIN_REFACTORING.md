# Login System Refactoring: Firebase → SQLite + LocalStorage

## Overview

The login system has been completely refactored from a backend API-dependent authentication to a **fully client-side SQLite database solution** with localStorage persistence.

### Key Changes

#### ✅ From
- Backend API calls for authentication
- Firebase authentication
- Remote session management

#### ✅ To
- **Client-side SQLite database** (sql.js)
- **Password hashing** with bcryptjs
- **JWT token generation** (HS256)
- **Session storage** in SQLite + localStorage
- **Zero backend dependency** for auth

---

## New Files Created

### Core Services

#### 1. **src/services/sqlite.ts**
SQLite database wrapper using sql.js
- `initDatabase()` - Initialize SQLite database
- `query()` - Execute SELECT queries
- `execute()` - Execute INSERT/UPDATE/DELETE
- `transaction()` - Atomic transactions
- `clearDatabase()` - Clear all data

**Schema:**
```
users:
  - id (UUID)
  - email (unique)
  - displayName
  - passwordHash
  - role (user|admin)
  - createdAt, updatedAt

sessions:
  - id (UUID)
  - userId
  - token
  - expiresAt
  - createdAt
```

#### 2. **src/services/passwordHash.ts**
Password hashing utilities
- `hashPassword(password)` - Hash with bcryptjs (10 rounds)
- `verifyPassword(password, hash)` - Verify password

#### 3. **src/services/tokenUtils.ts**
JWT token generation and validation
- `generateToken(userId, email)` - Create HS256 JWT
- `verifyToken(token)` - Validate token signature
- `getTokenExpiresAt(token)` - Extract expiry time
- **Token expiry**: 24 hours
- **Algorithm**: HMAC-SHA256

#### 4. **src/services/idGenerator.ts**
UUID generation
- `generateUUID()` - Generate v4 UUIDs

#### 5. **src/services/localAuthService.ts** (REFACTORED)
Main authentication service - now uses SQLite instead of API

**Methods:**
```typescript
login(email, password) → LoginResponse
register(email, password, displayName) → { ok: true }
me(token) → { user: LocalAuthUser }
logout(token) → { ok: true }
backup() → { ok: true, backupPath: string }
```

#### 6. **src/services/seedDatabase.ts**
Database initialization and seeding
- `seedDatabase()` - Initialize with sample users
- `clearDatabase()` - Clear all users
- `resetDatabase()` - Clear + reseed

---

### Data Files

#### 7. **src/data/sampleUsers.json**
Sample user data for development
```json
{
  "users": [
    {
      "email": "demo@escortme.app",
      "displayName": "Demo User",
      "password": "DemoPassword123",
      "role": "user"
    },
    ...
  ]
}
```

---

### Boot & Configuration

#### 8. **src/boot/sqlite.ts**
Boot module to initialize SQLite on app startup
- Runs before Firebase boot
- Initializes database schema
- Ensures tables exist

#### 9. **quasar.config.ts** (UPDATED)
Added sqlite boot file to boot order:
```typescript
boot: ['pinia', 'sqlite', 'firebase', 'i18n']
```

#### 10. **src/router/index.ts** (UPDATED)
Updated global route guard to restore auth on app load
```typescript
router.beforeEach(async (to) => {
  if (!restored) {
    restored = true
    await auth.restore()  // Restore from localStorage
  }
  // ... rest of guards
})
```

---

### Scripts & Documentation

#### 11. **scripts/init-db.mjs**
Node.js script for database initialization
- Creates tables
- Inserts sample users
- Displays credentials
- Exports database snapshot

**Usage:**
```bash
npm run db:init       # Initialize database
npm run db:reset      # Reset database
```

#### 12. **scripts/init-db.sh**
Shell wrapper script for Unix/macOS
```bash
./scripts/init-db.sh
./scripts/init-db.sh --reset
```

#### 13. **docs/DATABASE.md**
Comprehensive database documentation
- Architecture overview
- Schema definition
- Usage examples
- Troubleshooting guide

#### 14. **docs/LOGIN_REFACTORING.md**
This file - refactoring documentation

---

## Modified Files

### 1. **src/stores/localAuthStore.ts**
No changes - interface remains the same
- Continues to use localStorage for token/user persistence
- `restore()` function now works with SQLite backend

### 2. **src/pages/LoginPage.vue**
No changes - UI remains the same
- Already designed for local SQLite auth
- "SQLite secured" badge was accurate from the start

### 3. **package.json**
Added dependencies:
- `sql.js@1.14.1` - SQLite for JavaScript
- `bcryptjs@3.0.3` - Password hashing
- `@types/sql.js@1.4.11` - TypeScript types

Added scripts:
```json
"db:init": "node scripts/init-db.mjs",
"db:reset": "node scripts/init-db.mjs --reset"
```

### 4. **.env.example**
Added SQLite authentication configuration notes

---

## Architecture Flow

### Registration Flow
```
LoginPage (user input)
    ↓
localAuthStore.register()
    ↓
localAuthService.register()
    ├─ Validate email (unique check in SQLite)
    ├─ Hash password with bcryptjs
    ├─ Insert user into users table
    └─ Auto-login after successful registration
        ├─ Generate JWT token
        ├─ Create session record
        ├─ Store token + user in localStorage
        └─ Redirect to dashboard
```

### Login Flow
```
LoginPage (credentials)
    ↓
localAuthStore.login()
    ↓
localAuthService.login()
    ├─ Query user by email
    ├─ Verify password with bcryptjs
    ├─ Generate JWT token
    ├─ Create session record in SQLite
    ├─ Persist token + user to localStorage
    └─ Return LoginResponse
        ├─ token (JWT)
        ├─ expiresAt (ISO string)
        └─ user (LocalAuthUser)
```

### Restore Session Flow
```
Router beforeEach guard
    ↓
auth.restore() [first navigation]
    ├─ Read token from localStorage
    ├─ Validate token expiry
    ├─ Verify session in SQLite
    └─ Update user state
```

### Token Validation Flow
```
Protected route
    ↓
auth.isAuthenticated?
    ├─ True: Allow access
    └─ False: Redirect to login
        ↓
    On logout:
    ├─ Delete session from SQLite
    ├─ Clear localStorage
    └─ Redirect to login
```

---

## Storage Architecture

### Browser localStorage
```javascript
// Key: 'escortme.db'
// Value: JSON array of Uint8Array (SQLite binary data)
localStorage.getItem('escortme.db')
// → "[0,83,81,76,105,116,101,32,102,111,114,109,97,116,32,51,...]"

// Key: 'escortme.auth.token'
// Value: JWT token
localStorage.getItem('escortme.auth.token')
// → "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ..."

// Key: 'escortme.auth.user'
// Value: JSON user object
localStorage.getItem('escortme.auth.user')
// → '{"id":"...","email":"demo@escortme.app","displayName":"Demo User","role":"user"}'
```

### Database Structure
```
SQLite Database (in-memory, persisted via localStorage)
│
├─ users table
│  ├─ id: UUID
│  ├─ email: unique
│  ├─ displayName
│  ├─ passwordHash
│  ├─ role (user|admin)
│  └─ timestamps
│
└─ sessions table
   ├─ id: UUID
   ├─ userId: foreign key
   ├─ token: JWT
   ├─ expiresAt: ISO string
   └─ createdAt: ISO string
```

---

## Security Considerations

### ✅ Implemented
- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Tokens**: HS256 signature with secret key
- **Session Validation**: Token signature + expiry verification
- **Token Expiry**: 24 hours
- **Email Uniqueness**: Database constraint

### ⚠️ Limitations (Browser-based)
- **Client-side crypto**: Less secure than backend
- **Secret key exposure**: Available in source code (browser)
- **No rate limiting**: Brute-force attacks possible
- **localStorage cleared**: Session lost

### 🔒 For Production
Migrate to backend authentication:
1. Create `/api/auth/*` endpoints
2. Move password hashing to backend
3. Implement rate limiting
4. Use secure HTTP-only cookies
5. Add CSRF protection

See `docs/DATABASE.md` for migration guide.

---

## Quick Start

### 1. Initialize Database
```bash
npm run db:init
```

Outputs sample credentials:
```
🔑 Sample Credentials:
   Email: demo@escortme.app
   Password: DemoPassword123
   Role: user
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Test Login
- Navigate to `http://localhost:9003/login`
- Enter sample credentials
- Click "Sign in"
- Redirected to dashboard
- Token stored in localStorage + SQLite session

### 4. Test Logout
- Click logout in dashboard
- Session deleted from SQLite
- Token cleared from localStorage
- Redirected to login

### 5. Clear & Reset
```bash
# Clear database
localStorage.removeItem('escortme.db')

# Or reset via npm script
npm run db:reset
```

---

## Testing Credentials

After running `npm run db:init`:

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| `demo@escortme.app` | `DemoPassword123` | user | Basic user testing |
| `admin@escortme.app` | `AdminPassword123` | admin | Admin features |
| `test@escortme.app` | `TestPassword123` | user | Additional testing |

---

## Files Summary

### Created
- `src/services/sqlite.ts` - Database wrapper
- `src/services/passwordHash.ts` - Password utilities
- `src/services/tokenUtils.ts` - JWT utilities
- `src/services/idGenerator.ts` - UUID generation
- `src/services/seedDatabase.ts` - Database seeding
- `src/data/sampleUsers.json` - Sample data
- `src/boot/sqlite.ts` - Boot initialization
- `scripts/init-db.mjs` - Database initialization
- `scripts/init-db.sh` - Shell wrapper
- `docs/DATABASE.md` - Database documentation
- `docs/LOGIN_REFACTORING.md` - This file

### Updated
- `src/services/localAuthService.ts` - Now uses SQLite
- `src/router/index.ts` - Added auth restore
- `quasar.config.ts` - Added sqlite boot
- `package.json` - Added dependencies & scripts
- `.env.example` - Added auth notes

### Unchanged
- `src/stores/localAuthStore.ts` - Same interface
- `src/pages/LoginPage.vue` - Same UI
- Other components - No breaking changes

---

## Troubleshooting

### Database Not Persisting
```javascript
// Check localStorage
localStorage.getItem('escortme.db')

// Clear and reinit
localStorage.removeItem('escortme.db')
npm run db:init
```

### Login Fails
- Check password length (minimum 10 characters)
- Verify email is valid format
- Check browser console for error messages

### Token Expired
- Sessions expire after 24 hours
- User redirected to login automatically
- Logout also clears session

### Password Reset
No built-in password reset (add as feature):
```typescript
// TODO: Implement password reset
```

See `docs/DATABASE.md` for full troubleshooting guide.

---

## Next Steps

### Short-term
- [ ] Test login flow thoroughly
- [ ] Verify database persists across page reloads
- [ ] Test with actual user interactions
- [ ] Add password strength requirements
- [ ] Implement "Forgot Password" flow

### Medium-term
- [ ] Add user profile management
- [ ] Implement password change
- [ ] Add session management UI
- [ ] Create database export/import
- [ ] Add admin user management

### Long-term
- [ ] Migrate to backend authentication
- [ ] Implement OAuth (Google, GitHub)
- [ ] Add two-factor authentication
- [ ] Create session audit logs
- [ ] Implement account recovery

---

## Support & Documentation

- **Database Setup**: See `docs/DATABASE.md`
- **API Reference**: See `docs/DATABASE.md` → "API Reference"
- **Troubleshooting**: See `docs/DATABASE.md` → "Troubleshooting"
- **Source Code**: Check inline comments in service files

---

**Refactoring completed**: 2026-07-07
**Status**: ✅ Ready for testing
