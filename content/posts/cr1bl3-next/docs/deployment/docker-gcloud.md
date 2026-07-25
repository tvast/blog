# Docker Hub and Google Cloud CLI Container

This image builds `.connect` as a single container:

- `apps/connect-web` is compiled as static assets.
- `apps/connect-ws-server` runs the API and WebSocket server.
- The runtime image includes the `gcloud` CLI for Google Cloud workflows.

## Build

```bash
docker build -t bbwvm/cr1bl3:0558858-20260706-195620 .
```

## Push to a Private Docker Hub Repository

Create a private repository named `cr1bl3` under the Docker Hub user `bbwvm`, then:

```bash
docker login
docker push bbwvm/cr1bl3:0558858-20260706-195620
```

## Run Locally

```bash
docker run --rm -it \
  --name connect-blue \
  -p 3000:3000 \
  bbwvm/cr1bl3:0558858-20260706-195620
```

Health check:

```bash
curl http://localhost:3000/health
```

Confirm `gcloud` is available inside the container:

```bash
docker exec -it connect-blue gcloud version
```

## Use With Google Cloud

For local auth during development, mount your Cloud SDK config:

```bash
docker run --rm -it \
  --name connect-blue \
  -p 3000:3000 \
  -v "$HOME/.config/gcloud:/root/.config/gcloud:ro" \
  bbwvm/cr1bl3:0558858-20260706-195620
```

Docker Hub has immutable tags enabled for this repository, so publish each build with a unique tag instead of overwriting `latest`.

For production, prefer workload identity or a scoped service account mounted as a secret instead of baking credentials into the image.
