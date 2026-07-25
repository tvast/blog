# Galax0und Integration with 4uth (Keyops)

## Architecture Overview

galax0und is now **fully integrated with 4uth/Keyops** as its authentication provider.

```
┌─────────────────────────────────────────────────────────────┐
│                    galax0und Frontend                        │
│                    (Vue.js @ localhost:5173)                 │
│  - Auth.vue: Login/Register forms                            │
│  - Stores JWT tokens in localStorage                         │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP Requests
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              galax0und Backend (Express.js)                  │
│               (Port 7410 on keyops.fr)                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/auth/login   → forwards to 4uth               │   │
│  │  /api/auth/register → forwards to 4uth              │   │
│  │  /api/auth/refresh → forwards to 4uth               │   │
│  │  /api/auth/me      → returns user from galax0und DB │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Database: PostgreSQL on keyops.fr                          │
│  - Stores user profiles (email, displayName, avatar)        │
│  - Syncs with 4uth on each login                            │
└────────────────┬────────────────────────────────────────────┘
                 │ Proxies to
                 ▼
┌─────────────────────────────────────────────────────────────┐
│           4uth/Keyops (auth.keyops.fr)                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/auth/login    → validates email + password    │   │
│  │  /api/auth/register → creates new user              │   │
│  │  /api/auth/refresh  → rotates refresh token         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Database: PostgreSQL on keyops.fr                          │
│  - Master user store                                        │
│  - JWT token management                                     │
│  - Role management (ROLE_USER, ROLE_ADMIN)                 │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

### 1. User Login
```
User enters email + password
        ↓
Frontend calls: POST /api/auth/login (galax0und backend)
        ↓
Backend proxies: POST https://auth.keyops.fr/api/auth/login
        ↓
4uth validates credentials
        ↓
4uth returns: { access_token, refresh_token, user }
        ↓
Backend stores user in galax0und DB if new
        ↓
Backend generates galax0und JWT from stored user
        ↓
Frontend receives JWT + refreshToken
        ↓
Frontend stores in localStorage
        ↓
All future requests use: Authorization: Bearer JWT_TOKEN
```

### 2. User Registration
```
User enters email + password + displayName
        ↓
Frontend calls: POST /api/auth/register (galax0und backend)
        ↓
Backend proxies: POST https://auth.keyops.fr/api/auth/register
        ↓
4uth creates user in its database
        ↓
4uth returns: { access_token, refresh_token, user }
        ↓
Backend creates user in galax0und DB
        ↓
Backend generates galax0und JWT
        ↓
Frontend stores JWT + refreshToken
```

### 3. Token Refresh
```
Frontend detects JWT is expired
        ↓
Frontend calls: POST /api/auth/refresh
        Body: { refreshToken }
        ↓
Backend proxies to 4uth: POST /api/auth/refresh
        ↓
4uth rotates tokens
        ↓
Backend returns new access_token
        ↓
Frontend updates localStorage
```

## Configuration Files

### Backend Environment (.env)
```
KEYOPS_URL=https://auth.keyops.fr
DATABASE_URL=postgresql://galax0und:password@51.254.139.35:5432/galax0und
JWT_SECRET=f8a23c56f67452eb2ab0e2922029f058
CORS_ORIGINS=http://localhost:9000,https://g4l4x0und.org,https://galaxound.web.app
```

### Frontend Environment (.env.local)
```
VITE_API_URL=http://localhost:7410/api (dev) or https://api.g4l4x0und.org/api (prod)
VITE_KEYOPS_URL=https://auth.keyops.fr
```

## Database Schema

### galax0und.users
```sql
- id (String, PK)
- email (String, UNIQUE)
- keyopsId (String, UNIQUE) -- Reference to 4uth user
- displayName (String, optional)
- avatar (String, optional)
- role (String, default: "user")
- createdAt (DateTime)
- updatedAt (DateTime)
```

### galax0und.songs
```sql
- id (String, PK)
- userId (String, FK → users.id)
- filename (String)
- title (String, optional)
- duration (Int, optional)
- uploadedAt (DateTime)
```

### galax0und.passes
```sql
- id (String, PK)
- userId (String, FK → users.id)
- passType (String)
- expiresAt (DateTime, optional)
- createdAt (DateTime)
```

## API Endpoints

### Authentication

**POST /api/auth/login**
- Body: `{ email, password }`
- Response: `{ token, user, refreshToken, keyopsToken }`
- Status: 200 OK or 401 Unauthorized

**POST /api/auth/register**
- Body: `{ email, password, displayName? }`
- Response: `{ token, user, refreshToken, keyopsToken }`
- Status: 201 Created or 400 Bad Request

**POST /api/auth/refresh**
- Body: `{ refreshToken }`
- Response: `{ token, refreshToken }`
- Status: 200 OK or 401 Unauthorized

**GET /api/auth/me** (requires JWT)
- Headers: `Authorization: Bearer JWT_TOKEN`
- Response: `{ user }`
- Status: 200 OK or 401 Unauthorized

**PATCH /api/auth/me** (requires JWT)
- Headers: `Authorization: Bearer JWT_TOKEN`
- Body: `{ displayName?, avatar? }`
- Response: `{ user }`
- Status: 200 OK or 500 Server Error

## Security Considerations

✅ **What's Secure**
- JWT tokens stored in localStorage (httpOnly not needed for SPA)
- Passwords never stored in galax0und, only in 4uth
- CORS properly configured
- Token expiration (4uth handles)
- HTTPS enforced in production

⚠️ **What to Monitor**
- JWT_SECRET should be rotated periodically
- RefreshToken rotation prevents token leakage
- Verify 4uth's JWT signing key in production
- Monitor for suspicious login patterns

## Deployment Checklist

- [ ] PostgreSQL database created: `galax0und`
- [ ] Database user created: `galax0und` with password
- [ ] Backend `.env` configured with correct DATABASE_URL
- [ ] Backend `.env` configured with KEYOPS_URL
- [ ] Frontend `.env.local` configured with VITE_API_URL
- [ ] Prisma migrations run: `npx prisma migrate deploy`
- [ ] Backend running on port 7410
- [ ] Frontend served on port 5173 or 9000
- [ ] CORS origins whitelisted in 4uth AND backend
- [ ] HTTPS enabled in production
- [ ] JWT tokens validated on each request
- [ ] Error handling for network failures

## Troubleshooting

### "Invalid credentials" error
- Check email exists in 4uth database
- Check password is correct
- Check 4uth service is running

### "Permission denied" on database
- Check DATABASE_URL is correct
- Check galax0und user has permissions
- Run: `psql -U galax0und -d galax0und -c "SELECT 1;"`

### "CORS error" on login
- Check CORS_ORIGINS in backend .env
- Check origin is whitelisted in 4uth
- Check frontend is making requests to correct API_URL

### Token expires immediately
- Check JWT_SECRET is consistent
- Check system time is synchronized
- Check 4uth.JWT_TOKEN_TTL setting

## Future Enhancements

- [ ] OAuth2 with GitHub/Google (via 4uth)
- [ ] Two-factor authentication (2FA)
- [ ] Email verification on registration
- [ ] Password reset flow
- [ ] Social login (via 4uth)
- [ ] Role-based access control (RBAC)
- [ ] Activity logging
- [ ] Session management
