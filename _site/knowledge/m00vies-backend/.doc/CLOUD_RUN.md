# Cloud Run deployment

This backend is split into two entrypoints:

- REST gateway: `node dist/main.js`
- gRPC server: `node dist/main.grpc.js`

Cloud Run routes traffic to one listening port per service, so the cleanest setup is to deploy two Cloud Run services from the same image.

## Build the image

```bash
docker build -t REGION-docker.pkg.dev/PROJECT_ID/REPO/moovies-backend:latest .
docker push REGION-docker.pkg.dev/PROJECT_ID/REPO/moovies-backend:latest
```

## Deploy the REST service

```bash
gcloud run deploy moovies-rest \
  --image REGION-docker.pkg.dev/PROJECT_ID/REPO/moovies-backend:latest \
  --region REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars APP_MODE=rest,NODE_ENV=production \
  --port 8080
```

## Deploy the gRPC service

Cloud Run recommends HTTP/2 for gRPC, and the gRPC server should listen on the `PORT` environment variable.

```bash
gcloud run deploy moovies-grpc \
  --image REGION-docker.pkg.dev/PROJECT_ID/REPO/moovies-backend:latest \
  --region REGION \
  --platform managed \
  --allow-unauthenticated \
  --use-http2 \
  --set-env-vars APP_MODE=grpc,NODE_ENV=production \
  --port 8080
```

## What to set in Cloud Run

- `APP_MODE=rest` for the REST service
- `APP_MODE=grpc` for the gRPC service
- your database and auth secrets, such as `DATABASE_URL`, `JWT_SECRET`, and provider keys

## Notes

- The gRPC container now reads `PORT` first, so it behaves correctly on Cloud Run.
- The runtime image includes the `proto/` directory because the gRPC bootstrap loads `proto/video_generation.proto` at startup.
- The SQLite database in `data/moovies.sqlite` is local-only state. If you need persistence across revisions or instances, switch `DATABASE_URL` to an external database.
