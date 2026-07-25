# Auth Service Documentation

## Overview
The Auth Service provides authentication endpoints for user login, token refresh, logout, and token verification.

## Proto Definition
Located in: `proto/auth.proto`

Defines the following messages and service:
- `LoginRequest` / `LoginResponse`
- `RefreshTokenRequest` / `RefreshTokenResponse`
- `VerifyTokenRequest` / `VerifyTokenResponse`
- `LogoutRequest`
- `User` (user information)
- `AuthService` (service with 4 RPC methods)

## API Endpoints

After building, the auth service will be available at: `/api/auth-service`

### 1. Login
**Endpoint:** `POST /api/auth-service/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "refresh_token_string",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg",
    "email_verified": true,
    "created_at": 1704067200
  },
  "expires_in": 3600
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth-service/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 2. Refresh Token
**Endpoint:** `POST /api/auth-service/refresh-token`

Use this to get a new access token using a refresh token.

**Request:**
```json
{
  "refresh_token": "refresh_token_string"
}
```

**Response (200 OK):**
```json
{
  "token": "new_access_token",
  "expires_in": 3600
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth-service/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "your_refresh_token"
  }'
```

### 3. Verify Token
**Endpoint:** `POST /api/auth-service/verify-token`

Verify if a token is valid and get user information.

**Request:**
```json
{
  "token": "access_token_string"
}
```

**Response (200 OK) - Valid Token:**
```json
{
  "valid": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg",
    "email_verified": true,
    "created_at": 1704067200
  },
  "error": ""
}
```

**Response (200 OK) - Invalid Token:**
```json
{
  "valid": false,
  "user": null,
  "error": "Token expired"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth-service/verify-token \
  -H "Content-Type: application/json" \
  -d '{
    "token": "access_token"
  }'
```

### 4. Logout
**Endpoint:** `DELETE /api/auth-service/logout`

Invalidate the user's token.

**Request:**
```json
{
  "token": "access_token_string"
}
```

**Response (200 OK):**
```json
{}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/auth-service/logout \
  -H "Content-Type: application/json" \
  -d '{
    "token": "access_token"
  }'
```

---

## Rebuilding with Auth Service

After creating `proto/auth.proto`, rebuild the project:

```bash
npm run build
```

This will:
1. ✅ Compile `auth.proto` → TypeScript
2. ✅ Generate `src/proto/auth.ts`, `auth.d.ts`, `auth.js`
3. ✅ Generate `src/controllers/auth-service.controller.ts`
4. ✅ Generate `src/services/auth-service.service.ts`
5. ✅ Generate `src/modules/auth-service.module.ts`
6. ✅ Update `src/modules/index.ts` to include auth module

---

## Implementation

The generated files are stubs. You need to implement the actual logic:

### src/services/auth-service.service.ts

```typescript
export class AuthServiceService {
  async login(payload: any): Promise<any> {
    // TODO: Implement
    // 1. Validate email and password
    // 2. Check user in database
    // 3. Verify password hash
    // 4. Generate JWT token
    // 5. Generate refresh token
    // 6. Return tokens and user info
    return {
      token: 'generated_jwt_token',
      refresh_token: 'generated_refresh_token',
      user: {
        id: 'user_id',
        email: payload.email,
        name: 'User Name',
        avatar_url: '',
        email_verified: true,
        created_at: Date.now()
      },
      expires_in: 3600
    };
  }

  async refreshToken(payload: any): Promise<any> {
    // TODO: Implement
    // 1. Validate refresh token
    // 2. Check token in database/cache
    // 3. Generate new access token
    // 4. Return new token
    return {
      token: 'new_access_token',
      expires_in: 3600
    };
  }

  async logout(payload: any): Promise<any> {
    // TODO: Implement
    // 1. Invalidate refresh token
    // 2. Add token to blacklist/revocation list
    // 3. Return empty response
    return {};
  }

  async verifyToken(payload: any): Promise<any> {
    // TODO: Implement
    // 1. Validate JWT signature
    // 2. Check token expiry
    // 3. Get user from database
    // 4. Return verification result
    return {
      valid: true,
      user: {
        id: 'user_id',
        email: 'user@example.com',
        name: 'User Name',
        avatar_url: '',
        email_verified: true,
        created_at: 1704067200
      },
      error: ''
    };
  }
}
```

---

## Files Generated

After `npm run build`:

```
Generated files:
  ✅ src/proto/auth.ts
  ✅ src/proto/auth.d.ts
  ✅ src/proto/auth.js
  ✅ src/controllers/auth-service.controller.ts
  ✅ src/services/auth-service.service.ts
  ✅ src/modules/auth-service.module.ts
  ✅ src/modules/index.ts (updated with auth module)
```

---

## Testing the Auth Service

```bash
# Build
npm run build

# Start server
npm start

# Test login endpoint
curl -X POST http://localhost:3000/api/auth-service/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Test verify token
curl -X POST http://localhost:3000/api/auth-service/verify-token \
  -H "Content-Type: application/json" \
  -d '{
    "token": "some_token"
  }'
```

---

## Integration with Other Services

To use the auth service in other services, you can:

1. **Call from other services:**
```typescript
import { authServiceService } from '@/services/auth-service.service';

// Verify user token
const result = await authServiceService.verifyToken({ token: userToken });
if (!result.valid) {
  throw new Error('Unauthorized');
}
```

2. **Use in middleware:**
```typescript
// Create an auth middleware
import { Request, Response, NextFunction } from 'express';
import { authServiceService } from '@/services/auth-service.service';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const result = await authServiceService.verifyToken({ token });
  if (!result.valid) {
    return res.status(401).json({ error: result.error });
  }

  (req as any).user = result.user;
  next();
};
```

---

## Next Steps

1. Build the project: `npm run build`
2. Implement the service logic in `src/services/auth-service.service.ts`
3. Add database integration for user lookup
4. Implement JWT token generation/validation
5. Test all endpoints with curl or Postman
6. Integrate with other services as needed

---

## Proto Changes

To modify the auth service later, edit `proto/auth.proto` and rebuild:

```bash
npm run build
```

The proto generator will update all related files automatically.
