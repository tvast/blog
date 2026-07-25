# Authentication Flow

## Architecture

```
┌──────────┐        ┌──────────────┐        ┌─────────────────┐
│ Frontend │        │ Nest Backend │        │auth.keyops.fr   │
└────┬─────┘        └──────┬───────┘        └────────┬────────┘
     │                     │                          │
     │ 1. POST /login      │                          │
     │ credentials────────>│                          │
     │                     │ 2. POST /api/auth/login  │
     │                     │──────────────────────────>│
     │                     │                          │
     │                     │ 3. JWT Token (signed)    │
     │                     │<──────────────────────────│
     │                     │                          │
     │ 4. access_token    │                          │
     │<────────────────────│                          │
     │                     │                          │
     │ 5. GET /api/*       │                          │
     │ Authorization:      │                          │
     │ Bearer <JWT>───────>│                          │
     │                     │ 6. Validate JWT          │
     │                     │    (using cached key)    │
     │                     │                          │
     │ 7. Protected data   │                          │
     │<────────────────────│                          │
```

## Step-by-Step Flow

### 1. **Frontend → Backend: Login Request**
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 2. **Backend → auth.keyops.fr: Forward Credentials**
The backend `AuthClientService` forwards the login request to auth.keyops.fr:
```
POST https://auth.keyops.fr/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. **auth.keyops.fr → Backend: Return JWT Token**
auth.keyops.fr validates credentials and returns a JWT token signed with its private key:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "roles": ["user"]
  },
  "expires_in": 3600
}
```

### 4. **Backend → Frontend: Return Token**
The backend returns the token to the frontend:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "...",
  "user": { ... },
  "expires_in": 3600
}
```

### 5. **Frontend Stores & Uses Token**
Frontend stores the token (in memory, localStorage, or secure cookie) and includes it in API calls:
```bash
curl http://localhost:8001/api/video-generation/generate-video \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A sunset over mountains",
    ...
  }'
```

### 6. **Backend: Validate JWT Token**
The `JwtValidatorService`:
1. Extracts the Bearer token from `Authorization` header
2. Fetches the public key from auth.keyops.fr (cached for 1 hour)
3. Validates the token signature using RS256 algorithm
4. If valid: Attaches decoded user info to the request
5. If invalid: Returns 401 Unauthorized

```typescript
// JWT validation process
const publicKey = await jwtValidator.getPublicKey();
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256']
});
// decoded contains: { id, email, roles, iat, exp, ... }
```

### 7. **Backend: Process Request**
If JWT is valid, the request is processed and data is returned:
```json
{
  "job_id": "job-123",
  "status": "queued",
  "message": "Video generation queued..."
}
```

## JWT Token Structure

The JWT token from auth.keyops.fr follows the format:
```
Header:
{
  "alg": "RS256",
  "typ": "JWT"
}

Payload:
{
  "id": "user-123",
  "email": "user@example.com",
  "displayName": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "roles": ["user"],
  "iat": 1704067200,          // Issued at
  "exp": 1704070800,          // Expires in 1 hour
  "iss": "https://auth.keyops.fr",
  "sub": "user-123"
}

Signature:
RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  private_key_from_auth_keyops_fr
)
```

## Public Key Caching

To reduce load on auth.keyops.fr, the `JwtValidatorService` caches the public key for 1 hour:

```typescript
async getPublicKey(): Promise<string> {
  const now = Date.now();

  // Return cached key if still valid (< 1 hour old)
  if (this.publicKey && now - this.publicKeyFetchedAt < 3600000) {
    return this.publicKey;
  }

  // Fetch fresh key from auth.keyops.fr
  const response = await axios.get(
    'https://auth.keyops.fr/api/auth/.well-known/public-key'
  );

  this.publicKey = response.data.public_key;
  this.publicKeyFetchedAt = now;
  return this.publicKey;
}
```

## REST API Authentication

All `/api/*` endpoints require a valid JWT token:

```bash
# ❌ Request without token
curl http://localhost:8001/api/video-generation/generate-video
# Response: 401 Unauthorized - Token not provided

# ❌ Request with invalid token
curl http://localhost:8001/api/video-generation/generate-video \
  -H "Authorization: Bearer invalid-token"
# Response: 401 Unauthorized - Invalid token: ...

# ✅ Request with valid token
curl http://localhost:8001/api/video-generation/generate-video \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{ ... }'
# Response: 200 OK - Protected resource
```

## gRPC Authentication

gRPC calls must include the token in the `api_token` field:

```protobuf
message GenerateVideoRequest {
  string prompt = 1;
  string scene_name = 2;
  string aspect_ratio = 3;
  int32 duration_seconds = 4;
  optional string notify_email = 5;
  bool require_approval = 6;
  string api_token = 7;              // ← Include JWT here
  string trace_id = 8;
}

service VideoGenerationService {
  rpc GenerateVideo (GenerateVideoRequest) returns (GenerateVideoResponse);
  // ... other methods
}
```

**Example gRPC call:**
```javascript
client.generateVideo({
  prompt: 'A sunset over mountains',
  scene_name: 'nature',
  aspect_ratio: '16:9',
  duration_seconds: 8,
  require_approval: false,
  api_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',  // JWT token
  trace_id: 'trace-123'
}, (err, response) => {
  if (err?.code === grpc.status.UNAUTHENTICATED) {
    console.error('Invalid token');
  } else {
    console.log('Job created:', response.job_id);
  }
});
```

## Token Refresh

When a token is about to expire (or has expired), use the refresh token:

```bash
curl -X POST http://localhost:8001/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'

# Response:
# {
#   "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "refresh_token": "...",
#   "expires_in": 3600
# }
```

## Error Handling

### Missing Token
```json
{
  "error": "Unauthorized: Missing Authorization header",
  "code": "UNAUTHORIZED"
}
```

### Invalid Token Format
```json
{
  "error": "Unauthorized: Invalid Authorization header format. Expected: Bearer <token>",
  "code": "UNAUTHORIZED"
}
```

### Expired Token
```json
{
  "error": "Unauthorized: Invalid token: jwt expired",
  "code": "UNAUTHORIZED"
}
```

### Invalid Signature
```json
{
  "error": "Unauthorized: Invalid token: invalid signature",
  "code": "UNAUTHORIZED"
}
```

### Public Key Unavailable
```json
{
  "error": "Unauthorized: Unable to validate token: public key unavailable",
  "code": "UNAUTHORIZED"
}
```

## Deployment

The authentication system requires:

1. **Environment Variables** (already configured):
   ```bash
   AUTH_API_URL=https://auth.keyops.fr
   ```

2. **Network Access**: Outbound HTTPS to `auth.keyops.fr` on port 443

3. **Build & Run**:
   ```bash
   npm run build
   npm start           # REST API on :8001
   npm run start:grpc  # gRPC on :50051
   ```

Both servers automatically:
- ✅ Fetch and cache the public key from auth.keyops.fr
- ✅ Validate JWT tokens on every request
- ✅ Attach decoded user info to requests
- ✅ Return 401 for invalid/missing tokens

## Benefits of JWT Validation

✅ **No backend-to-backend calls** for every request (after initial public key fetch)
✅ **Reduced latency** - Token validation is local using cached public key
✅ **Stateless** - No session store needed
✅ **Scalable** - Works across multiple backend instances
✅ **Secure** - Token signature verified with auth.keyops.fr's public key
✅ **Standard** - Uses industry-standard RS256 algorithm

## Security Considerations

1. **Token Expiry**: Tokens expire after 1 hour (configurable by auth.keyops.fr)
2. **Refresh Tokens**: Use refresh tokens to get new access tokens
3. **Signature Verification**: Tokens are cryptographically verified using RS256
4. **Public Key Rotation**: Public key is refreshed every hour (cache TTL)
5. **HTTPS Only**: All communication with auth.keyops.fr uses HTTPS
6. **Bearer Token**: Include tokens only in Authorization header, not in URLs or body
