# @cr1bl3/connect-ws-server

Central WebSocket orchestrator for `.connect` micro-frontends.

## Quick Start

```bash
pnpm dev --filter @cr1bl3/connect-ws-server
```

Server will start on `ws://localhost:3000`

## Endpoints

- **WebSocket**: `ws://localhost:3000`
- **Health**: `http://localhost:3000/health`
- **Stats**: `http://localhost:3000/stats`

## What It Does

- ✅ Manages WebSocket connections
- ✅ Routes messages to clients
- ✅ Broadcasts updates via pub/sub
- ✅ Tracks connected clients
- ✅ Provides health & stats endpoints

## Architecture

```
Client 1 ──┐
Client 2 ──┼─→ WebSocket Hub ─→ Request Handler
Client 3 ──┘
            ↓
        Broadcast to all/specific clients
```

## Usage in connect-web

```ts
import { useWebSocket } from '@/composables/useWebSocket'

const { subscribe, broadcast } = useWebSocket({
  url: 'ws://localhost:3000'
})

// Listen for messages
subscribe('channel:name', (msg) => {
  console.log('Received:', msg.payload)
})

// Send message
broadcast('channel:name', { data: 'value' })
```

## For More Info

See `docs/UI_ARCHITECTURE.md` for complete WebSocket documentation.
