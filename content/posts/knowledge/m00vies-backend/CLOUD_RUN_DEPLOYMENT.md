# Cloud Run + Cloud SQL Deployment Guide

This guide explains how to deploy the moovies-ai backend to Google Cloud Run with Cloud SQL PostgreSQL.

## Prerequisites

- Google Cloud Project with billing enabled
- `gcloud` CLI installed and authenticated
- Cloud SQL Admin API enabled
- Cloud Run Admin API enabled
- Artifact Registry API enabled

## Architecture

```
┌─────────────────────────────────────────────────────┐
│              Google Cloud Platform                   │
│                                                      │
│  ┌────────────────────┐        ┌─────────────────┐  │
│  │    Cloud Run       │◄──────►│   Cloud SQL     │  │
│  │   (REST API)       │        │  (PostgreSQL)   │  │
│  │   (gRPC Server)    │        │                 │  │
│  └────────────────────┘        └─────────────────┘  │
│        (Port 8080)            (Unix socket via      │
│                              Cloud SQL Proxy)       │
│  ┌────────────────────────────────────────────────┐ │
│  │  Cloud SQL Auth Proxy (sidecar)               │ │
│  │  /cloudsql/PROJECT:REGION:INSTANCE_NAME       │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## 1. Create Cloud SQL Instance

### Setup Cloud SQL PostgreSQL instance

```bash
# Set variables
export PROJECT_ID="your-gcp-project"
export REGION="us-central1"
export INSTANCE_NAME="moovies-db-prod"
export DB_NAME="moovies"
export DB_USER="moovies-prod"
export DB_PASSWORD="$(openssl rand -base64 32)"

gcloud config set project $PROJECT_ID

# Create instance
gcloud sql instances create $INSTANCE_NAME \
  --database-version=POSTGRES_15 \
  --region=$REGION \
  --tier=db-f1-micro \
  --storage-type=PD_SSD \
  --storage-size=10GB \
  --backup-start-time=02:00 \
  --enable-bin-log \
  --availability-type=ZONAL \
  --enable-point-in-time-recovery

# Create database
gcloud sql databases create $DB_NAME \
  --instance=$INSTANCE_NAME

# Create database user
gcloud sql users create $DB_USER \
  --instance=$INSTANCE_NAME \
  --password=$DB_PASSWORD

# Save credentials to secret (see secrets section below)
echo "DB_PASSWORD=$DB_PASSWORD" | gcloud secrets create db-password --data-file=-
```

### Verify instance

```bash
gcloud sql instances describe $INSTANCE_NAME
```

Expected output includes:
```
connectionName: project-id:us-central1:moovies-db-prod
```

## 2. Set Up Google Cloud Secrets

Store sensitive database credentials in Secret Manager:

```bash
# Database password
echo -n "$DB_PASSWORD" | gcloud secrets create moovies-db-password \
  --replication-policy="automatic" \
  --data-file=-

# Verify
gcloud secrets describe moovies-db-password
```

## 3. Build and Push Docker Image

### Configure Docker authentication

```bash
gcloud auth configure-docker gcr.io
```

### Build and push image

```bash
# Variables
export PROJECT_ID="your-gcp-project"
export IMAGE_NAME="moovies-backend"
export IMAGE_TAG="v1.0.0"
export REGISTRY="gcr.io"

# Build image (runs from backend root)
docker build \
  -t $REGISTRY/$PROJECT_ID/$IMAGE_NAME:$IMAGE_TAG \
  -t $REGISTRY/$PROJECT_ID/$IMAGE_NAME:latest \
  .

# Push to Artifact Registry
docker push $REGISTRY/$PROJECT_ID/$IMAGE_NAME:$IMAGE_TAG
docker push $REGISTRY/$PROJECT_ID/$IMAGE_NAME:latest

# Verify
gcloud container images list --repository=$REGISTRY/$PROJECT_ID
```

## 4. Deploy to Cloud Run

### Create Cloud Run service

```bash
export PROJECT_ID="your-gcp-project"
export REGION="us-central1"
export INSTANCE_NAME="moovies-db-prod"
export DB_NAME="moovies"
export DB_USER="moovies-prod"
export IMAGE="gcr.io/$PROJECT_ID/moovies-backend:latest"

# Get instance connection name
export INSTANCE_CONNECTION_NAME=$(gcloud sql instances describe $INSTANCE_NAME \
  --format='value(connectionName)')

gcloud run deploy moovies-api \
  --image=$IMAGE \
  --region=$REGION \
  --platform=managed \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --timeout=3600 \
  --max-instances=10 \
  --min-instances=1 \
  --set-env-vars=\
NODE_ENV=production,\
PORT=8080,\
LOG_LEVEL=info,\
DB_USER=$DB_USER,\
DB_NAME=$DB_NAME,\
INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME \
  --set-secrets=\
DB_PASSWORD=moovies-db-password:latest \
  --vpc-connector=projects/$PROJECT_ID/locations/$REGION/connectors/default
```

### Grant Cloud SQL Client role

Cloud Run service needs permission to access Cloud SQL:

```bash
# Get Cloud Run service account
export SERVICE_ACCOUNT=$(gcloud run services describe moovies-api \
  --region=$REGION \
  --format='value(spec.template.spec.serviceAccountName)')

# Grant Cloud SQL Client role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$SERVICE_ACCOUNT \
  --role=roles/cloudsql.client
```

## 5. Configure Cloud SQL Proxy (for local testing)

For local development against production database:

```bash
# Install Cloud SQL Proxy (if not already installed)
curl -o cloud-sql-proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64
chmod +x cloud-sql-proxy

# Run proxy
./cloud-sql-proxy $INSTANCE_CONNECTION_NAME

# In another terminal, update .env:
# DB_HOST=/cloudsql/project-id:us-central1:moovies-db-prod
# or leave it as localhost if proxy is listening on localhost
```

## 6. Environment Variables for Cloud Run

The following environment variables are set on Cloud Run:

```env
# Application
NODE_ENV=production
LOG_LEVEL=info
PORT=8080

# Database (Cloud SQL)
DB_USER=moovies-prod
DB_NAME=moovies
DB_PASSWORD=(secret from Secret Manager)
INSTANCE_CONNECTION_NAME=project-id:us-central1:moovies-db-prod

# (Leave DB_HOST and DB_PORT unset - proxy uses Unix socket)
```

### Using Secret Manager in Cloud Run

```bash
gcloud run deploy moovies-api \
  --image=$IMAGE \
  --region=$REGION \
  --set-secrets=\
DB_PASSWORD=moovies-db-password:latest,\
JWT_SECRET=jwt-secret:latest,\
FIREBASE_PRIVATE_KEY=firebase-private-key:latest
```

## 7. Verify Deployment

### Check Cloud Run service

```bash
gcloud run services describe moovies-api --region=us-central1
```

### Test REST API health endpoint

```bash
curl https://moovies-api-xxx.a.run.app/health
```

Expected response:
```json
{
  "ok": true,
  "service": "moovies-ai-backend",
  "version": "0.1.1"
}
```

### View logs

```bash
gcloud run logs read moovies-api --region=us-central1 --limit=50
```

Should include:
```
✓ Migrations tracking table ready
✓ 001_init_tables.sql
✓ 002_budget_state_singleton.sql
✓ 003_seed_indexes.sql
✅ Migrations completed successfully
✓ PostgreSQL connection established to Cloud SQL (project-id:us-central1:moovies-db-prod)
REST API running on http://0.0.0.0:8080
```

### Query production database

From local machine (requires Cloud SQL Proxy or authorized network):

```bash
# Via proxy
gcloud sql connect moovies-db-prod \
  --database=moovies \
  --user=moovies-prod

# Inside psql:
SELECT * FROM budget_state;
SELECT COUNT(*) FROM jobs;
\q
```

## 8. Scaling and Performance

### Adjust Cloud Run resource allocation

```bash
gcloud run deploy moovies-api \
  --region=us-central1 \
  --memory=1Gi \
  --cpu=2 \
  --min-instances=2 \
  --max-instances=20
```

### Monitor Cloud SQL

```bash
# Check CPU and memory usage
gcloud sql instances describe moovies-db-prod --format='value(currentDiskSize,stats)'

# Upgrade instance if needed
gcloud sql instances patch moovies-db-prod --tier=db-n1-standard-1
```

## 9. Database Backups

### Automated backups

Enabled during instance creation. Verify:

```bash
gcloud sql backups list --instance=moovies-db-prod
```

### Manual backup

```bash
gcloud sql backups create \
  --instance=moovies-db-prod \
  --description="Pre-deployment backup"
```

### Restore from backup

```bash
gcloud sql backups restore 2024-04-01t12:00:00 \
  --backup-instance=moovies-db-prod \
  --target-instance=moovies-db-prod
```

## 10. Monitoring and Alerts

### View Cloud SQL metrics

```bash
# CPU usage
gcloud monitoring time-series list \
  --filter='resource.type="cloudsql_database" AND metric.type="cloudsql.googleapis.com/database/cpu/utilization"'

# Connection count
gcloud monitoring time-series list \
  --filter='resource.type="cloudsql_database" AND metric.type="cloudsql.googleapis.com/database/network/connections"'
```

### Create alert policy

```bash
# High CPU usage alert
gcloud alpha monitoring policies create \
  --notification-channels=<channel-id> \
  --display-name="Cloud SQL CPU High" \
  --condition-display-name="CPU > 80%" \
  --condition-threshold-value=0.8 \
  --condition-threshold-duration=300s
```

## 11. Cleanup (if needed)

```bash
# Delete Cloud Run service
gcloud run services delete moovies-api --region=us-central1

# Delete Cloud SQL instance (WARNING: deletes all data)
gcloud sql instances delete moovies-db-prod

# Delete secret
gcloud secrets delete moovies-db-password
```

## Production Checklist

- [ ] Cloud SQL instance created in us-central1
- [ ] Database `moovies` created
- [ ] User `moovies-prod` created with strong password
- [ ] Secrets stored in Secret Manager
- [ ] Docker image built and pushed to Artifact Registry
- [ ] Cloud Run service deployed with environment variables
- [ ] Cloud SQL Client role granted to Cloud Run service account
- [ ] Migrations run successfully (check logs)
- [ ] Health endpoint responds with 200 OK
- [ ] API endpoints return expected responses
- [ ] Backups configured
- [ ] Monitoring and alerts configured
- [ ] Custom domain mapped (if needed)
- [ ] SSL/TLS configured (automatic via Cloud Run)
- [ ] Rate limiting and authentication enabled
- [ ] Secrets rotated periodically

## Troubleshooting

### Cloud Run can't connect to Cloud SQL

**Error**: `Error: connect ECONNREFUSED 10.0.0.0:5432`

**Cause**: Cloud SQL Auth Proxy not running or not configured

**Solution**:
1. Ensure `INSTANCE_CONNECTION_NAME` env var is set
2. Check Cloud SQL Client role is granted
3. Verify instance is in same region as Cloud Run

### Migrations fail in Cloud Run

**Error**: `Database health check failed: connect ECONNREFUSED`

**Cause**: Cloud SQL instance not running or not accessible

**Solution**:
1. Check Cloud SQL instance status: `gcloud sql instances describe moovies-db-prod`
2. Check connectivity from Cloud Run logs: `gcloud run logs read moovies-api`
3. Verify network connectivity (VPC, firewall rules)

### High memory usage

**Cause**: Connection pool too large or memory leak

**Solution**:
1. Reduce max connections in database.module.ts (default 10)
2. Monitor with `gcloud sql instances describe moovies-db-prod --format='value(stats)'`
3. Increase Cloud Run memory allocation

## Related Documentation

- [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) - Local development
- [MIGRATIONS.md](./MIGRATIONS.md) - Migration system
- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Cloud SQL Documentation](https://cloud.google.com/sql/docs)
- [Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy)
