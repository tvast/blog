# Deploy the API to Google Cloud Run

This is the smallest practical Google Cloud setup for the current API:

- Cloud Run service with `min-instances=0`, so idle cost is near zero.
- `512Mi` memory, `1` CPU, `max-instances=1`, and concurrency `40`.
- Artifact Registry for the container image.
- SQLite in `/tmp` for the MVP database.

## Important database note

Cloud Run instances have ephemeral local storage. The default `DATABASE_URL=file:/tmp/velodoctor.db` is cheap and fine for demos, smoke tests, and stateless API validation, but data can disappear when an instance is replaced. For durable production data, move Prisma to PostgreSQL and use Cloud SQL or another managed database.

## First deploy

```bash
cp apps/api/cloud-run.env.example apps/api/cloud-run.env
$EDITOR apps/api/cloud-run.env
chmod +x apps/api/scripts/deploy-cloud-run.sh
apps/api/scripts/deploy-cloud-run.sh
```

The script enables the needed GCP APIs, creates the Artifact Registry repository if missing, builds the Docker image with Cloud Build, and deploys Cloud Run.

## Using an existing private Docker image

If you already built and pushed the API image, set these in `apps/api/cloud-run.env`:

```bash
IMAGE_URI=europe-west1-docker.pkg.dev/your-gcp-project-id/velodoctor/api:latest
SKIP_BUILD=true
```

Cloud Run must have permission to pull the image. Artifact Registry in the same GCP project is the lowest-friction private registry option; a local `docker login` helps your machine push images, but Cloud Run still needs registry-side pull access.

## Cheap defaults

The defaults are intentionally conservative:

```bash
CLOUD_RUN_MEMORY=512Mi
CLOUD_RUN_CPU=1
CLOUD_RUN_MAX_INSTANCES=1
CLOUD_RUN_CONCURRENCY=40
AI_PROVIDER=mock
```

Set `AI_PROVIDER=openai` only when an `OPENAI_API_KEY` is configured as a Cloud Run secret or environment variable.

## Health check

After deploy:

```bash
curl "$(gcloud run services describe velodoctor-api --region europe-west1 --format 'value(status.url)')/health"
```
