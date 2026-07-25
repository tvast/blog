# gRPC Integration Guide — Moovies Frontend

**Call gRPC services from Vue.js using gRPC-Web or REST proxies**

---

## Current Architecture

### Backend Services

```
┌─────────────────────────────────────┐
│  NestJS Application (Port 8001)     │
├─────────────────────────────────────┤
│                                     │
│  ✅ REST Gateway (HTTP/1.1)         │
│     └─ /api/jobs/launch             │
│     └─ /api/jobs/:id/status         │
│     └─ /api/jobs/:id/approve        │
│                                     │
│  🚀 gRPC Microservice (Port 50051)  │
│     └─ VideoGenerationService       │
│        └─ GenerateVideo rpc         │
│        └─ GetJobStatus rpc          │
│        └─ ListJobs rpc              │
│        └─ ApproveJob rpc            │
│                                     │
└─────────────────────────────────────┘
```

### Why Two Transport Layers?

1. **REST** — Browser-friendly, simple HTTP calls, proxy-able
2. **gRPC** — High-performance, stateful, internal communication

---

## Solution: REST → gRPC Bridge

### Current State

Your frontend calls REST endpoints, which internally call gRPC:

```
Vue Component
    ↓ (HTTP POST)
REST Endpoint (/api/jobs/launch)
    ↓ (gRPC call)
VideoGenerationService (port 50051)
    ↓
Job Created ✓
```

**This works!** Your estimate success proves the REST bridge is functional.

### Why Generation Might Fail

If `handleLaunch()` fails but `handleEstimate()` works:

1. **Missing Firebase Token** — `/jobs/launch` requires `Authorization: Bearer <token>`
2. **Payload Validation** — Some fields might be missing or invalid
3. **Approval Required** — If `require_approval: true`, job stays in AWAITING_APPROVAL
4. **Budget Exceeded** — Backend might reject if over budget
5. **Provider Not Ready** — gRPC backend might not have loaded all providers yet

---

## How to Debug

### Option 1: Use the gRPC Client (Recommended)

File: `src/lib/grpc-client.ts`

Replace REST calls with gRPC-wrapped calls:

```typescript
// Before (REST)
import { launchJob } from '@/lib/api';
const launched = await launchJob(payload);

// After (gRPC wrapper via REST)
import { generateVideoGrpc } from '@/lib/grpc-client';
const launched = await generateVideoGrpc({
  prompt: payload.prompt,
  scene_name: payload.scene_name,
  aspect_ratio: payload.aspect_ratio,
  duration_seconds: payload.duration_seconds,
});
```

### Option 2: Add Firebase Token to API Calls

Update `src/lib/api.ts` to include Firebase token:

```typescript
import { auth } from '@/lib/firebase';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptor to attach Firebase token
api.interceptors.request.use(async (config) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Failed to get Firebase token:', error);
  }
  return config;
});
```

### Option 3: Check Backend Logs

```bash
# Terminal 1: REST gateway logs
yarn start

# Terminal 2: gRPC microservice logs
yarn start:grpc

# Look for:
# - "Launching job for prompt..."
# - "GenerateVideo rpc called"
# - Error messages in job validation
```

---

## Native gRPC-Web Integration (Future)

To call gRPC directly from the browser without REST proxy:

### Step 1: Generate TypeScript from Proto

```bash
cd moovies-gateway
buf build
buf generate
```

This creates `src/gen/moovies/video/v1/service_pb.ts`

### Step 2: Create gRPC-Web Transport

```typescript
// src/lib/grpc-web-client.ts
import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { VideoGenerationService } from "@/gen/moovies/video/v1/service_pb";

const transport = createGrpcWebTransport({
  baseUrl: import.meta.env.VITE_GRPC_WEB_URL || "http://localhost:8001",
});

export const videoClient = createClient(VideoGenerationService, transport);
```

### Step 3: Call Directly

```typescript
const response = await videoClient.generateVideo({
  prompt: "A red car in Paris",
  sceneName: "paris_neon",
  aspectRatio: "16:9",
  durationSeconds: 8,
});

console.log(`Job created: ${response.jobId}`);
```

### Step 4: Setup Envoy Proxy (Production)

For production, you need Envoy to bridge gRPC ↔ gRPC-Web:

```yaml
# envoy.yaml
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address:
        address: 0.0.0.0
        port_number: 8080
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          access_log:
          - name: envoy.access_loggers.stdout
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.access_loggers.stream.v3.StdoutAccessLog
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains: ["*"]
              routes:
              - match:
                  prefix: /
                route:
                  cluster: grpc_service
          http_filters:
          - name: envoy.filters.http.grpc_web
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
          - name: envoy.filters.http.router
            typed_config:
              "@type": type.googleapis.com/envoy.filters.http.router.v3.Router
  clusters:
  - name: grpc_service
    connect_timeout: 0.25s
    type: LOGICAL_DNS
    http2_protocol_options: {}
    load_assignment:
      cluster_name: grpc_service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_number: 50051
```

---

## Troubleshooting

### "400 Bad Request" on /jobs/launch

**Cause**: Missing Firebase token in header

**Fix**: Make sure you're calling from authenticated context:

```typescript
import { auth } from '@/lib/firebase';

// Ensure user is authenticated
if (!auth.currentUser) {
  throw new Error('User not authenticated');
}

const token = await auth.currentUser.getIdToken();
// Include in fetch: headers: { Authorization: `Bearer ${token}` }
```

### "401 Unauthorized"

**Cause**: Invalid or expired Firebase token

**Fix**: Refresh token before making request:

```typescript
await auth.currentUser?.getIdToken(true); // Force refresh
```

### "Job created but stuck in PENDING"

**Cause**: `require_approval: true` — job waiting for manual approval

**Fix**: Either set `require_approval: false` or call ApproveJob rpc:

```typescript
import { getJobStatusGrpc } from '@/lib/grpc-client';

const job = await getJobStatusGrpc(jobId);
if (job.status === 'AWAITING_APPROVAL') {
  // Need to call ApproveJob (not yet implemented in grpc-client.ts)
}
```

### "502 Bad Gateway" / Timeouts

**Cause**: gRPC microservice on :50051 not responding

**Fix**: Check if backend is running on correct port:

```bash
# Check if gRPC server is listening
lsof -i :50051

# Restart backend
yarn dev
```

---

## Environment Variables

Add to `.env.local`:

```bash
# gRPC endpoint (usually same as REST)
VITE_GRPC_ENDPOINT=http://localhost:8001/api

# Future: Direct gRPC-Web endpoint (with Envoy proxy)
VITE_GRPC_WEB_URL=http://localhost:8080
```

---

## Implementation Checklist

- [ ] REST endpoints working (`/api/jobs/launch` succeeds)
- [ ] Firebase authentication working (token generated)
- [ ] gRPC-Client wrapper created (`src/lib/grpc-client.ts`)
- [ ] Error handling improved with better logging
- [ ] (Optional) Envoy proxy setup for native gRPC-Web
- [ ] (Optional) Proto files generated with `buf generate`

---

## Reference Links

- **Connect (gRPC-Web)**: https://connectrpc.com/docs/web
- **Envoy gRPC-Web Filter**: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/grpc_web_filter
- **Buf (Proto Management)**: https://buf.build/docs
- **NestJS gRPC**: https://docs.nestjs.com/microservices/grpc

---

**Status**: ✅ REST bridge working, native gRPC-Web optional
**Last Updated**: 2026-03-20

