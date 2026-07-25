# Galax0und - Setup Guide

## 🚀 Migration from Firebase to Keyops + PostgreSQL

### Prerequisites
- Node.js 22+
- PostgreSQL 12+
- Keyops account (auth.keyops.fr)

### 1. Backend Setup

#### 1.1 Install dependencies
```bash
cd functions
npm install
```

#### 1.2 Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration:
# - DATABASE_URL: your PostgreSQL connection string
# - JWT_SECRET: a secure random string
# - KEYOPS_URL, KEYOPS_CLIENT_ID, KEYOPS_CLIENT_SECRET
```

#### 1.3 Setup database
```bash
# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

#### 1.4 Start backend
```bash
npm run dev
# Backend runs on http://localhost:7410
```

### 2. Frontend Setup

#### 2.1 Configure environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your Keyops credentials
```

#### 2.2 Install dependencies (if needed)
```bash
npm install
```

#### 2.3 Start frontend
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Database Schema

The application uses the following tables:
- **users**: User accounts from Keyops
- **songs**: User uploaded audio files
- **passes**: User passes/subscriptions

See `prisma/schema.prisma` for complete schema.

### 4. API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with keyops token
- `GET /api/auth/me` - Get current user (requires JWT)
- `PATCH /api/auth/me` - Update user profile (requires JWT)

#### Protected Routes
Add `Authorization: Bearer {JWT_TOKEN}` header to protected endpoints.

### 5. Integration with Keyops

#### OAuth Flow (Frontend)
1. User clicks "Sign in with Keyops"
2. Redirects to keyops with client_id and redirect_uri
3. User authenticates on keyops
4. Redirects back with authorization code
5. Exchange code for JWT token
6. Send token to backend `/auth/login`

#### Token Verification (Backend)
The backend verifies keyops JWT tokens by:
1. Decoding the token
2. Verifying signature with keyops public key
3. Checking expiration
4. Creating/updating user in PostgreSQL

### 6. Migration Notes

**What changed:**
- ❌ Firebase Auth → ✅ Keyops OAuth
- ❌ Firestore → ✅ PostgreSQL
- ❌ Firebase Storage → ✅ Keep for now (can migrate later)

**Backward compatibility:**
- Firebase configuration still available for other services
- Can gradually migrate storage later

### 7. Troubleshooting

**Database connection error:**
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

**JWT token errors:**
- Ensure JWT_SECRET is set in .env
- Token might be expired (7 day expiration)

**Keyops verification fails:**
- Check KEYOPS_URL is correct
- Verify client credentials
- Ensure token is from keyops, not somewhere else

### 8. Security Checklist

- [ ] JWT_SECRET is a strong random string
- [ ] DATABASE_URL uses secure connection (postgresql://)
- [ ] Keyops client secret is kept secret (never in frontend)
- [ ] CORS origins are properly configured
- [ ] HTTPS enforced in production
- [ ] Sensitive data not logged
