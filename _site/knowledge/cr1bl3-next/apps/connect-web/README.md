# connect-web

Primary `.connect` cockpit for inputs, graph exploration, persona views, evidence review, and composed dashboards.

## Step 1: Sherlock identity source

The app now uses Sherlock as the first source of truth for identity switching:

- `ConnectAppStore` creates Sherlock identity seeds.
- `IdentityRegistry` owns `activeIdentityId`.
- UI modules consume the active identity ID instead of each module keeping its own selection.

This keeps Graph, Evidence, Timeline, and Dashboard ready to plug into the same active identity context.

## Google access gate

The cockpit is protected by Firebase Authentication with Google sign-in. Set these Vite env vars for the deployment:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_AUTH_OWNER_EMAIL=owner@example.com
VITE_AUTH_ALLOWED_EMAILS=analyst@example.com,ops@example.com
```

If Firebase config or an allow-list is missing, the app fails closed and the graph/Sherlock workspace stays behind the login screen.
