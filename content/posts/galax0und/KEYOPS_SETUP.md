# Keyops Integration Setup

## 🔐 Keyops Configuration

### 1. OAuth Redirect URIs (WHITELIST)
Add these redirect URIs in your **Keyops OAuth Settings**:

```
http://localhost:9000/auth/callback
https://g4l4x0und.org/auth/callback
https://galaxound.web.app/auth/callback
```

### 2. CORS Origins (WHITELIST)
Add these allowed origins in **Keyops CORS Settings**:

```
http://localhost:9000
https://g4l4x0und.org
https://galaxound.web.app
```

### 3. Get Your Credentials
From Keyops dashboard, obtain:
- `CLIENT_ID` - OAuth application ID
- `CLIENT_SECRET` - OAuth secret (keep this secret!)

## 📝 Backend Configuration

### 1. Create `.env` file
```bash
cd functions
cp .env.example .env
```

### 2. Fill in Keyops credentials
```
KEYOPS_URL=https://auth.keyops.fr
KEYOPS_CLIENT_ID=your_client_id_here
KEYOPS_CLIENT_SECRET=your_client_secret_here
KEYOPS_REDIRECT_URI=http://localhost:9000/auth/callback
```

### 3. Fill in other required variables
```
DATABASE_URL=postgresql://user:password@localhost:5432/galax0und
JWT_SECRET=your_very_secure_random_string_here
CORS_ORIGINS=http://localhost:9000,https://g4l4x0und.org,https://galaxound.web.app
```

## 🌐 Frontend Configuration

### 1. Create `.env.local`
```bash
cp .env.example .env.local
```

### 2. Fill in Keyops details
```
VITE_KEYOPS_URL=https://auth.keyops.fr
VITE_KEYOPS_CLIENT_ID=your_client_id_here
VITE_API_URL=http://localhost:9000/api  # or your backend URL
```

### 3. Update Router Configuration
Add this route to your router (in `src/router/index.js`):

```javascript
{
  path: '/auth/callback',
  component: () => import('pages/AuthCallback.vue')
}
```

## 🔄 OAuth Flow

### Frontend → Keyops
1. User clicks "Sign in with Keyops"
2. Frontend redirects to:
```
https://auth.keyops.fr/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=http://localhost:9000/auth/callback&
  response_type=code&
  scope=openid profile email
```

### Keyops → Frontend
3. User authenticates on Keyops
4. Keyops redirects back to:
```
http://localhost:9000/auth/callback?code=AUTHCODE&state=STATE
```

### Frontend → Backend
5. Frontend calls `/api/auth/keyops-callback` with authorization code
6. Backend exchanges code for keyops token

### Backend Verification
7. Backend verifies token with Keyops
8. Creates/updates user in PostgreSQL
9. Returns JWT token to frontend
10. Frontend stores JWT and redirects to dashboard

## 🧪 Testing

### Test with localhost:9000
```bash
# Backend
cd functions
npm run dev
# Runs on http://localhost:7410

# Frontend (in another terminal)
npm run dev
# But set VITE_API_URL=http://localhost:7410/api
# And access via http://localhost:9000
```

### Using ngrok for HTTPS testing
```bash
# Expose localhost:9000 with HTTPS
ngrok http 9000

# Use ngrok URL in Keyops whitelist and frontend config
```

## 🐛 Troubleshooting

### "Redirect URI mismatch" error
- Check that redirect_uri in frontend matches exactly what's whitelisted in Keyops
- Includes protocol (http:// vs https://)
- Includes port if needed

### CORS error on token exchange
- Verify backend CORS_ORIGINS includes your frontend domain
- Add frontend domain to Keyops CORS settings

### "Invalid token" on backend
- Ensure keyops token verification is correctly implemented
- Check KEYOPS_URL is correct
- Verify token hasn't expired

## 📚 Keyops API Resources

- **Token Endpoint**: `POST https://auth.keyops.fr/oauth/token`
- **User Info Endpoint**: `GET https://auth.keyops.fr/oauth/userinfo`
- **Authorization Endpoint**: `https://auth.keyops.fr/oauth/authorize`

## ✅ Checklist

- [ ] Added redirect URIs to Keyops
- [ ] Added CORS origins to Keyops
- [ ] Got CLIENT_ID and CLIENT_SECRET
- [ ] Created backend `.env` with credentials
- [ ] Created frontend `.env.local` with credentials
- [ ] Updated router with `/auth/callback` route
- [ ] Database is running and migrated
- [ ] Backend can start without errors
- [ ] Frontend can start without errors
- [ ] Can click "Sign in with Keyops" and reach Keyops login page
- [ ] Can complete OAuth flow and get redirected back
