# Authentication Deployment Guide

This document explains how the authentication system works and how to deploy it.

## Overview

The Moovies API uses **auth.keyops.fr** as the authentication authority via a handshake pattern:

1. **Client** gets a token from https://auth.keyops.fr
2. **Client** includes token in REST or gRPC requests
3. **API** validates token by asking auth.keyops.fr "is this token valid?"
4. **API** grants access if token is valid, denies if not

This approach means **no JWT secrets or token signing** — the API just validates that tokens are recognized by auth.keyops.fr.

## Configuration

In `.env`:
```bash
# Auth service (already configured)
AUTH_API_URL=https://auth.keyops.fr

# JWT_SECRET is unused (token validation is delegated to auth.keyops.fr)
JWT_SECRET=<any-value>
```

## REST API Authentication

### How to make authenticated requests:

```bash
# 1. Get token from auth.keyops.fr
curl -X POST https://auth.keyops.fr/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  # Response includes: access_token, refresh_token, user

# 2. Use token in API calls
curl http://localhost:3000/api/auth/verify-token \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"token":"<access_token>"}'

# Expected response:
# {
#   "valid": true,
#   "user": {
#     "id": "user-123",
#     "email": "user@example.com",
#     "displayName": "John Doe",
#     "firstName": "John",
#     "lastName": "Doe",
#     "phone": null,
#     "avatarUrl": null,
#     "roles": ["user"],
#     "isActive": true
#   },
#   "error": null
# }
```

### REST Auth Endpoints

All `/api/*` routes require `Authorization: Bearer <token>` header.

Available endpoints:
- `POST /api/auth/login` - Login (delegates to auth.keyops.fr)
- `POST /api/auth/refresh-token` - Refresh token (delegates to auth.keyops.fr)
- `POST /api/auth/verify-token` - Verify token validity

### Error Responses

**401 Unauthorized** - Missing or invalid token:
```json
{
  "error": "Invalid or expired authentication token",
  "statusCode": 401,
  "code": "UNAUTHORIZED"
}
```

**400 Bad Request** - Malformed Authorization header:
```json
{
  "error": "Missing or invalid Authorization header. Expected: Authorization: Bearer <token>",
  "statusCode": 400,
  "code": "UNAUTHORIZED"
}
```

## gRPC Authentication

### Proto Definition

The gRPC services require an `api_token` field in all requests:

```protobuf
message GenerateVideoRequest {
  string prompt = 1;
  string scene_name = 2;
  string aspect_ratio = 3;
  int32 duration_seconds = 4;
  optional string notify_email = 5;
  bool require_approval = 6;
  string api_token = 7;          // ← Required for authentication
  string trace_id = 8;
}

service VideoGenerationService {
  rpc GenerateVideo (GenerateVideoRequest) returns (GenerateVideoResponse);
  rpc GetJobStatus (GetJobStatusRequest) returns (Job);
  rpc ListJobs (ListJobsRequest) returns (ListJobsResponse);
  rpc CancelJob (CancelJobRequest) returns (Job);
  rpc ApproveJob (ApproveJobRequest) returns (Job);
  rpc GenerateBatch (BatchGenerateRequest) returns (BatchGenerateResponse);
}
```

### How to make gRPC calls:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./proto/video_generation.proto');
const moovies = grpc.loadPackageDefinition(packageDefinition).moovies;

const client = new moovies.video.VideoGenerationService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Get token from auth.keyops.fr first
const token = 'eyJhbGc...'; // from auth.keyops.fr login

// Call gRPC method
client.generateVideo({
  prompt: 'A sunset over mountains',
  scene_name: 'nature_scene',
  aspect_ratio: '16:9',
  duration_seconds: 8,
  require_approval: false,
  api_token: token,  // ← Include token in request
  trace_id: 'trace-123'
}, (err, response) => {
  if (err) {
    if (err.code === grpc.status.UNAUTHENTICATED) {
      console.error('Authentication failed:', err.message);
    } else {
      console.error('Error:', err);
    }
  } else {
    console.log('Job created:', response.job_id);
  }
});
```

### gRPC Error Codes

- **UNAUTHENTICATED (16)** - Invalid or missing `api_token`
- Other error codes for business logic errors

## Deployment Steps

### 1. Build the project

```bash
npm install
npm run build
```

This generates TypeScript to JavaScript and processes proto files.

### 2. Start REST API

```bash
npm start
```

Server starts on port 3000 (or PORT env var):
- REST API: http://localhost:3000/api
- Health check: http://localhost:3000/health
- Docs: http://localhost:3000/api-docs

### 3. Start gRPC server (in another terminal)

```bash
npm run start:grpc
```

Server starts on port 50051 (or GRPC_PORT env var).

### 4. Verify auth is working

```bash
# Test REST auth
curl http://localhost:3000/api/auth/verify-token \
  -H "Authorization: Bearer <valid-token>" \
  -H "Content-Type: application/json" \
  -d '{"token":"<valid-token>"}'

# Expected: 200 OK with user info
# Or: 401 if token is invalid
```

## How Auth Validation Works

### REST API Flow

1. Request arrives at `/api/...`
2. `authMiddleware` extracts `Authorization: Bearer <token>` header
3. Calls `AuthValidatorService.validateFromHeader()`
4. Sends HTTP request to `auth.keyops.fr/api/auth/me` with token
5. If 200 OK: User is authenticated, attach user info to request
6. If 401/error: Return 401 Unauthorized

### gRPC Flow

1. Request arrives at gRPC endpoint with `api_token` field
2. Handler wraps with `withAuth()` function
3. Calls `AuthValidatorService.validateToken(api_token)`
4. Sends HTTP request to `auth.keyops.fr/api/auth/me` with token
5. If valid: Proceed with handler
6. If invalid: Return gRPC UNAUTHENTICATED status code

## Troubleshooting

### "Cannot connect to auth.keyops.fr"

```
Check:
- Network connectivity: ping auth.keyops.fr
- AUTH_API_URL environment variable is set correctly
- CORS/firewall allows outbound HTTPS to auth.keyops.fr
- Auth service is running and accessible
```

### "Invalid or expired authentication token"

```
Check:
- Token is still valid (within expiry time)
- Token format: Bearer <token> (with space)
- Token is from auth.keyops.fr
- Token matches the Authorization header format
```

### "Missing or invalid Authorization header"

```
Check:
- Header format: "Authorization: Bearer <token>"
- Both words are required (case-insensitive for Bearer)
- No extra spaces or typos
```

### gRPC returns UNAUTHENTICATED

```
Check:
- api_token field is populated in request
- Token value is correct
- Token is still valid
- Token was obtained from auth.keyops.fr
```

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

See `.doc/TESTING.md` for comprehensive auth test examples.

## Production Considerations

1. **Token caching** - Consider caching validation results (with TTL) to reduce load on auth.keyops.fr
2. **Rate limiting** - gRPC validates on every request; REST API adds some latency for auth checks
3. **Error logging** - Failed auth attempts are logged for security auditing
4. **HTTPS** - Always use HTTPS in production (REST to auth.keyops.fr is already HTTPS)
5. **Token refresh** - Clients should implement token refresh logic using `/api/auth/refresh-token`

## Architecture Diagram

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. Login request
       ▼
┌─────────────────────┐         ┌──────────────────┐
│ auth.keyops.fr      │◄────────┤ Moovies Backend  │
│ - Login              │         │ (REST/gRPC)      │
│ - Refresh Token      │         │                  │
│ - Validate Token     │         │ - Validates      │
│   (getMe endpoint)   │◄────────┤   tokens via     │
└─────────────────────┘         │   getMe call     │
       ▲                         └──────────────────┘
       │ 2. Returns token
       │
       └─────────────────────────────┐
                                     │
                                     │ 3. Include token in
                                     │    REST/gRPC requests
                                     │
                                     ▼
                                  ┌────────┐
                                  │ API ✓  │
                                  └────────┘
```

## Additional Resources

- Proto files: `proto/auth.proto`, `proto/video_generation.proto`, `proto/billing.proto`
- Auth service: `src/services/auth/`
- Middleware: `src/shared/middleware/auth.middleware.ts`
- Configuration: `src/config/configuration.ts`
