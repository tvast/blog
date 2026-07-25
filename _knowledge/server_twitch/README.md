# server_twitch

TypeScript scaffold for a Twitch loop workflow with three parts:

- a Firebase Function that validates the stream profile and generates the launch plan
- a React dashboard on Firebase Hosting that prompts for the local credentials and video settings
- a local TypeScript FFmpeg worker that actually loops the video and pushes it to Twitch

## What stays local

Keep the Twitch stream key in your own `.env` file. The Firebase function does not receive or store the secret.

The API also has a request-tracking layer that can forward sanitized events to a dry-run GCP app. It only sends request metadata, route information, timing, and top-level body/query keys so secrets stay out of the payload.

## What you need

- Firebase CLI access to your project
- Twitch stream key
- Twitch channel name, if you want the dashboard to label the setup
- video source path or URL
- FFmpeg-compatible host for the worker, usually your own machine or a small server

## Setup

1. Authenticate Firebase with your CLI:

```bash
firebase login
firebase use --add
```

2. Install dependencies:

```bash
npm install
```

3. Copy `worker/.env.example` to `worker/.env` and fill in the Twitch key and video source.

4. Copy `functions/.env.example` to `functions/.env` if you want to configure Twitch auth and the API tracking layer.

5. If you want the Vite dev server to proxy to the Firebase emulator, copy `client/.env.example` to `client/.env.local` and replace the project id in `VITE_API_PROXY_TARGET`.

6. Build the project:

```bash
npm run build
```

7. Run the Firebase emulators:

```bash
npm run dev
```

8. Start the worker in another terminal:

```bash
npm run stream
```

## Firebase deploy

The Firebase Hosting site serves `client/dist`, and the function is exposed at `/api/*`.

```bash
firebase deploy
```

## How the flow works

1. Open the dashboard and enter your Twitch and video settings.
2. Ask the function for a preview and launch plan.
3. Download a local `.env` file for the worker.
4. Run the worker on an always-on machine so the video keeps looping into Twitch.

## API tracking

The Firebase API can publish sanitized request events to a dry-run GCP endpoint.

Set these in `functions/.env`:

- `API_TRACKING_ENABLED="true"` to keep tracking active, or `"false"` to disable it
- `GCP_DRY_RUN_APP_URL="https://your-dry-run-app.example/run/tracking"`
- `GCP_DRY_RUN_TRACKING_TIMEOUT_MS="1500"`

If `GCP_DRY_RUN_APP_URL` is not set, the API logs the same sanitized tracking event locally instead of forwarding it.

## Important note

Firebase Functions are great for the API and dashboard backend, but they are not a place to run a 24/7 streaming loop. The actual stream loop is handled by the TypeScript worker in this repo.
