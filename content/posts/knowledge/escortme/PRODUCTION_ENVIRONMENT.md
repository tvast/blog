# Production Environment

Use this checklist when preparing a production deployment. The runtime values live in
`.env.production`; the committed shape of the file lives in `.env.production.example`.

## Required Values

| Variable | Required | Production value |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | `escort-me-now.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Yes | `escort-me-now` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | `escort-me-now.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase web app ID |
| `VITE_MAPBOX_TOKEN` | Yes | Restricted public Mapbox token |
| `VITE_API_URL` | Recommended | `https://api.escortme.app/api` |
| `VITE_CORS_ORIGIN` | Recommended | `https://escort-me-now.web.app` |
| `VITE_USE_FIREBASE_EMULATORS` | Yes | `false` |
| `VITE_FIREBASE_FUNCTIONS_REGION` | Yes | `us-central1` |
| `VITE_FIREBASE_FUNCTIONS_BASE_URL` | Recommended | `https://us-central1-escort-me-now.cloudfunctions.net` |

## Payment Values

Set these before accepting live payments:

| Variable | Value |
| --- | --- |
| `VITE_REVOLUT_PUBLIC_TOKEN` | Live Revolut public token |
| `VITE_REVOLUT_MODE` | `prod` |
| `VITE_REVOLUT_CURRENCY` | `EUR` |
| `VITE_REVOLUT_LOCALE` | `en-GB` |

Server-only Revolut secrets must stay outside Vite env files and be configured in the
Functions or hosting provider secret manager.

## Deploy Gate

Run these before deploying:

```bash
npm run validate-config
npm run type-check
npm run test:unit
npm run build
npm audit
```

Production builds must not enable mock geolocation or Firebase emulators:

```bash
VITE_ENABLE_MOCK_GEOLOCATION=false
VITE_USE_FIREBASE_EMULATORS=false
```
