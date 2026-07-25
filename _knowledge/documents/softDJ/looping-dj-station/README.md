# Looping DJ Station

Combined starter for:

- Vue + Quasar ASCII studio front end
- Firebase hosting and HTTPS functions
- TypeScript stream profile helpers
- Local ffmpeg worker for Twitch looping

## Layout

- `client/` - Vue front end and ASCII control surface
- `functions/` - Firebase HTTPS API for health and preview generation
- `shared/` - Stream profile helpers shared by functions and worker
- `worker/` - Local ffmpeg loop runner

## Next steps

1. Install dependencies in the workspace root.
2. Set your Firebase project ID in `.firebaserc`.
3. Drop your Twitch client credentials into the Firebase env and worker env files.
