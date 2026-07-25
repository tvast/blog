# Debug: Video Generation Not Running

**Job is created (✓) but video is not being generated (✗)**

---

## Step 1: Check Job Status

In browser console, after clicking "Launch":

```javascript
// Get the job ID from the response
const jobId = activeJob.value.job_id;
console.log('Job ID:', jobId);

// Poll the job status
const checkJob = async () => {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch(`http://localhost:8001/api/jobs/${jobId}/status`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const job = await res.json();
  console.log('Job Status:', {
    id: job.id,
    status: job.status,
    created_at: new Date(job.created_at * 1000),
    started_at: job.started_at ? new Date(job.started_at * 1000) : 'NOT STARTED',
    finished_at: job.finished_at ? new Date(job.finished_at * 1000) : 'NOT DONE',
    error: job.error,
    provider_used: job.provider_used,
    gcs_url: job.gcs_url,
  });
};

// Check immediately
await checkJob();

// Check every 5 seconds
setInterval(checkJob, 5000);
```

---

## Step 2: What Status Should You See?

### ✅ Job is Processing

```javascript
{
  id: "job_abc123",
  status: "PROCESSING",
  created_at: "2026-03-20T10:00:00Z",
  started_at: "2026-03-20T10:00:05Z",
  finished_at: null,
  error: null,
  provider_used: "replicate",
  gcs_url: null,  // Will be populated when done
}
```

→ **Expected**: Job will take 30-120 seconds
→ **Check**: `started_at` should have a timestamp

---

### ❌ Job is Stuck in PENDING

```javascript
{
  status: "PENDING",
  started_at: null,  // ← Problem: Never started!
  error: null,
}
```

→ **Problem**: gRPC worker didn't pick it up
→ **Reason**: Worker not running or providers not loaded

---

### ❌ Job is AWAITING_APPROVAL

```javascript
{
  status: "AWAITING_APPROVAL",
  started_at: null,
  error: null,
}
```

→ **Problem**: Job needs manual approval
→ **Fix**: Set `require_approval: false` in form

---

### ❌ Job FAILED with Error

```javascript
{
  status: "FAILED",
  error: "Provider timeout after 120 seconds",
  provider_used: "replicate",
}
```

→ **Problem**: Provider (Replicate) didn't respond
→ **Reason**: API quota exceeded, invalid prompt, network issue

---

## Step 3: Check Backend Services

### Is the gRPC Microservice Running?

```bash
# Terminal 1: Check if port 50051 is listening
lsof -i :50051

# Should show something like:
# node    12345  user  123u  IPv4 0x... 0t0  TCP *:50051 (LISTEN)
```

If NOT listening:

```bash
# Start gRPC microservice
cd moovies-gateway
yarn start:grpc
```

Watch for these startup messages:

```
[NestFactory] Instantiating GrpcAppModule
[...] VideoGenerationController initialized
```

---

### Are Providers Initialized?

In backend logs, look for:

```
[ProviderFactory] Initializing provider chain...
[ProviderFactory] ✓ Replicate provider ready
[ProviderFactory] ✓ Gemini provider ready
[ProviderFactory] ✓ Local provider ready
```

If you see errors like:

```
[ProviderFactory] ✗ Replicate API key not found
[ProviderFactory] ✗ Gemini API key missing
```

→ **Problem**: Environment variables not set
→ **Fix**: Check `.env` has:
```
GEMINI_API_KEY=your_key
REPLICATE_API_TOKEN=your_token
```

---

### Check gRPC Worker Queue

In backend logs, when job is created:

```
[JobService] Creating job: job_abc123
[JobService] Job persisted to database
[gRPCWorker] Picked up job: job_abc123
[gRPCWorker] Calling GenerateVideo rpc...
[gRPCWorker] Provider chain: [gemini, replicate, local]
[gRPCWorker] Provider 'gemini' returned: video_url=...
[gRPCWorker] Job completed: job_abc123
```

If you don't see these gRPC worker logs:

→ **Problem**: Job is never picked up
→ **Reason 1**: gRPC worker not running
→ **Reason 2**: Database connection failed
→ **Reason 3**: Job table is empty (check database)

---

## Step 4: Direct gRPC Test

Test gRPC directly (without REST proxy):

```bash
# Install grpcurl
brew install grpcurl  # or apt-get install grpcurl

# Test connection to gRPC server
grpcurl -plaintext localhost:50051 list

# Should show:
# moovies.video.VideoGenerationService

# Call GenerateVideo directly
grpcurl -plaintext \
  -d '{
    "prompt": "A red car",
    "scene_name": "test",
    "aspect_ratio": "16:9",
    "duration_seconds": 8,
    "api_token": "test"
  }' \
  localhost:50051 moovies.video.VideoGenerationService/GenerateVideo
```

Expected response:
```json
{
  "job_id": "job_xyz789",
  "status": "PENDING",
  "message": "Job created successfully"
}
```

---

## Step 5: Check Database

The job should exist in the database:

```bash
# Connect to MongoDB/PostgreSQL (depending on your setup)
mongosh  # or psql, mysql, etc.

# Query jobs collection
db.jobs.findOne({ id: "job_abc123" })

# Should return:
{
  _id: ObjectId(...),
  id: "job_abc123",
  prompt: "A red car",
  status: "PENDING",
  created_at: ISODate("2026-03-20T10:00:00Z"),
  started_at: null,
  ...
}
```

If empty:

→ **Problem**: Job wasn't saved
→ **Reason**: Database connection issue in REST layer

---

## Full Debug Checklist

```bash
# 1. Verify both services running
lsof -i :8001   # REST on 8001
lsof -i :50051  # gRPC on 50051

# 2. Check REST service logs
yarn dev
# Should see: "AppModule initialized"

# 3. Check gRPC service logs
yarn start:grpc
# Should see: "gRPC microservice listening on 0.0.0.0:50051"

# 4. Verify environment variables
grep -E "GEMINI|REPLICATE|API" .env
# Should have real API keys

# 5. Check database connectivity
# Try to connect to your DB:
mongo mongodb://localhost:27017/moovies
# or psql postgres://...

# 6. Test a job manually
node -e "
  const api = require('axios');
  const baseURL = 'http://localhost:8001/api';
  const req = { prompt: 'test', aspect_ratio: '16:9', duration_seconds: 8 };
  api.post(baseURL + '/jobs/launch', req).then(r => {
    console.log('Job created:', r.data.job_id);
    console.log('Status:', r.data.status);
  });
"
```

---

## Most Common Issues

### Issue 1: "Job stuck in PENDING forever"
```
Symptom: status: "PENDING", started_at: null
Cause: gRPC worker not running or job queue not consumed
Fix: Start gRPC: yarn start:grpc
```

### Issue 2: "status: FAILED, error: Provider timeout"
```
Symptom: status: "FAILED", provider_used: "replicate"
Cause: Replicate API quota exceeded or key invalid
Fix: Check REPLICATE_API_TOKEN in .env
```

### Issue 3: "gRPC: Connect refused :50051"
```
Symptom: Error connecting to 0.0.0.0:50051
Cause: gRPC server not running
Fix: yarn start:grpc in separate terminal
```

### Issue 4: "Job created but not in database"
```
Symptom: API returns 201 but db.jobs.find() is empty
Cause: Database not connected
Fix: Check DB connection string in .env
```

---

## Real-time Monitoring

Terminal 1: REST gateway
```bash
cd moovies-gateway
yarn dev
```

Terminal 2: gRPC worker
```bash
cd moovies-gateway
yarn start:grpc
```

Terminal 3: Monitor jobs
```bash
watch -n 1 'curl -s http://localhost:8001/api/jobs | jq ".[0]"'
```

Terminal 4: Frontend
```bash
cd quasar-moovies
yarn dev
```

---

## Expected Timeline

```
T+0s:   Click "Launch" in frontend
T+1s:   Job created (status: PENDING or PROCESSING)
T+5s:   gRPC worker picks up job (started_at set)
T+10s:  Provider called (Replicate/Gemini)
T+60s:  Video generated or failed (status: DONE or FAILED)
```

If job is still PENDING after 10 seconds → **gRPC worker issue**

---

**Last Resort: Check All Env Vars**

```bash
# In moovies-gateway root:
echo "API Keys loaded:"
echo "GEMINI_API_KEY: ${GEMINI_API_KEY:0:10}..."
echo "REPLICATE_API_TOKEN: ${REPLICATE_API_TOKEN:0:10}..."
echo "JWT_SECRET set: $([ -z $JWT_SECRET ] && echo NO || echo YES)"
echo "DATABASE_URL: $DATABASE_URL"
echo "FIREBASE_PROJECT_ID: $FIREBASE_PROJECT_ID"
```

All should show values, not blank!

