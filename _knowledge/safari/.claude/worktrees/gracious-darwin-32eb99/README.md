# Safari Digital Passport

Vue 3 + Vite frontend with Quasar UI components and a Firebase Hosting rewrite to an Express Cloud Function.

## UI Toolkit

The app stays on Vite and uses Quasar through `@quasar/vite-plugin`. Quasar components are imported only in the Vue files that use them, for example `QBtn`, `QInput`, `QSelect`, `QTabs`, and `QBanner`.

## API

The Express function is exported as `api` and serves:

- `GET /api/safari-zone` for the geolocation unlock area
- `GET /api/animals/random` for the displayed random animal
- `POST /api/registrations` for visitor and exposant form submissions

Registrations are stored in the Firestore `registrations` collection.

## Authentication

The Passport tab is guarded with Firebase Authentication. Users must sign in before the passport can unlock, and location validation still has to pass before animals are visible.

Add these values to `.env.local` from your Firebase web app settings:

```sh
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Enable Email/Password and, optionally, Google sign-in in Firebase Authentication.

## Local setup

Install frontend dependencies from the project root, then install function dependencies:

```sh
yarn install
yarn --cwd functions install
```

For Vite-only development without Firebase, the app falls back to localStorage and client-side random animals.

To use the Firebase API locally, copy `.env.example` to `.env.local` and run:

```sh
yarn emulators
```

## Deploy

Set your real Firebase project in `.firebaserc`, then run:

```sh
yarn deploy
```

The safari zone defaults to Paris center with a 2000m radius. Override it for Functions with `SAFARI_LATITUDE`, `SAFARI_LONGITUDE`, and `SAFARI_RADIUS_METERS`.
