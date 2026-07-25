# Video Generation Job API - cURL Examples

## Base URL
```
http://localhost:3000/api/video-generation-service
```

## 1. Create & Deploy a Job (GenerateVideo)

**Endpoint:** `POST /api/video-generation-service/generate-video`

**Request Body:**
```bash
curl -X POST http://localhost:3000/api/video-generation-service/generate-video \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over the ocean with waves crashing on the beach",
    "scene_name": "beach_sunset",
    "aspect_ratio": "16:9",
    "duration_seconds": 8,
    "notify_email": "user@example.com",
    "require_approval": false,
    "api_token": "your-api-token-here",
    "trace_id": "trace-12345"
  }'
```

**Example Response:**
```json
{
  "job_id": "job-uuid-12345",
  "status": "PENDING",
  "message": "Job created successfully"
}
```

---

## 2. Get Job Status

**Endpoint:** `POST /api/video-generation-service/get-job-status`

**Request Body:**
```bash
curl -X POST http://localhost:3000/api/video-generation-service/get-job-status \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "job-uuid-12345",
    "api_token": "your-api-token-here"
  }'
```

**Example Response:**
```json
{
  "id": "job-uuid-12345",
  "prompt": "A beautiful sunset over the ocean...",
  "scene_name": "beach_sunset",
  "aspect_ratio": "16:9",
  "duration_seconds": 8,
  "status": "PROCESSING",
  "provider_used": "gemini",
  "output_path": "/videos/beach_sunset_12345.mp4",
  "gcs_url": "gs://bucket/videos/beach_sunset_12345.mp4",
  "error": null,
  "notify_email": "user@example.com",
  "require_approval": false,
  "cost_usd": 0.064,
  "backup_status": "BACKED_UP",
  "created_at": 1704067200000,
  "started_at": 1704067210000,
  "finished_at": null
}
```

---

## 3. List All Jobs

**Endpoint:** `POST /api/video-generation-service/list-jobs`

**Request Body:**
```bash
curl -X POST http://localhost:3000/api/video-generation-service/list-jobs \
  -H "Content-Type: application/json" \
  -d '{
    "api_token": "your-api-token-here",
    "status_filter": "PROCESSING",
    "limit": 10,
    "offset": 0
  }'
```

**Example Response:**
```json
{
  "jobs": [
    {
      "id": "job-uuid-12345",
      "prompt": "A beautiful sunset...",
      "scene_name": "beach_sunset",
      "status": "PROCESSING",
      "cost_usd": 0.064,
      "created_at": 1704067200000
    }
  ],
  "total_count": 1
}
```

---

## 4. Approve Job (for require_approval=true)

**Endpoint:** `PUT /api/video-generation-service/approve-job`

**Request Body:**
```bash
curl -X PUT http://localhost:3000/api/video-generation-service/approve-job \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "job-uuid-12345",
    "approved": true,
    "api_token": "your-api-token-here"
  }'
```

---

## 5. Cancel Job

**Endpoint:** `DELETE /api/video-generation-service/cancel-job`

**Request Body:**
```bash
curl -X DELETE http://localhost:3000/api/video-generation-service/cancel-job \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "job-uuid-12345",
    "api_token": "your-api-token-here"
  }'
```

---

## 6. Batch Generate (Multiple Jobs)

**Endpoint:** `POST /api/video-generation-service/generate-batch`

**Request Body:**
```bash
curl -X POST http://localhost:3000/api/video-generation-service/generate-batch \
  -H "Content-Type: application/json" \
  -d '{
    "jobs": [
      {
        "prompt": "A sunset over the ocean",
        "scene_name": "sunset_1",
        "aspect_ratio": "16:9",
        "duration_seconds": 8,
        "api_token": "your-api-token-here",
        "trace_id": "trace-1"
      },
      {
        "prompt": "A mountain landscape",
        "scene_name": "mountain_1",
        "aspect_ratio": "16:9",
        "duration_seconds": 8,
        "api_token": "your-api-token-here",
        "trace_id": "trace-2"
      }
    ],
    "notify_email": "user@example.com",
    "api_token": "your-api-token-here"
  }'
```

**Example Response:**
```json
{
  "submitted_count": 2,
  "job_ids": ["job-uuid-1", "job-uuid-2"],
  "budget_status": {
    "daily_spent": "0.128",
    "daily_remaining": "9.872",
    "monthly_spent": "5.234",
    "monthly_remaining": "4994.766"
  }
}
```

---

## Common Parameters

### GenerateVideoRequest
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | ✅ | Video description/prompt |
| `scene_name` | string | ✅ | Scene identifier |
| `aspect_ratio` | string | ✅ | Video aspect ratio (16:9, 9:16, 1:1) |
| `duration_seconds` | int | ✅ | Video duration in seconds |
| `api_token` | string | ✅ | API token for authentication |
| `trace_id` | string | ✅ | Trace ID for tracking |
| `notify_email` | string | ❌ | Email for completion notification |
| `require_approval` | bool | ❌ | Require manual approval before processing |

---

## Job Status Values

- `PENDING` - Waiting to be processed
- `AWAITING_APPROVAL` - Waiting for user approval (if require_approval=true)
- `PROCESSING` - Currently being generated
- `DONE` - Successfully completed
- `FAILED` - Failed to generate
- `CANCELLED` - User cancelled the job

---

## Quick Test Script

Save as `deploy-job.sh`:

```bash
#!/bin/bash

API_TOKEN="your-api-token-here"
TRACE_ID=$(date +%s)

echo "📹 Deploying Video Generation Job..."

curl -X POST http://localhost:3000/api/video-generation-service/generate-video \
  -H "Content-Type: application/json" \
  -d "{
    \"prompt\": \"A futuristic city at night with flying cars and neon lights\",
    \"scene_name\": \"cyberpunk_city\",
    \"aspect_ratio\": \"16:9\",
    \"duration_seconds\": 8,
    \"notify_email\": \"user@example.com\",
    \"require_approval\": false,
    \"api_token\": \"$API_TOKEN\",
    \"trace_id\": \"trace-$TRACE_ID\"
  }" | jq '.'

echo -e "\n✅ Job deployed!"
```

Run:
```bash
chmod +x deploy-job.sh
./deploy-job.sh
```

---

## Troubleshooting

### Invalid token error
- Check your `api_token` is correct
- Verify token with Auth service: POST `/api/auth-service/verify-token`

### Budget exceeded
- Check remaining budget with Billing service: GET `/api/billing-service/get-budget-status`
- Update limits if needed: PUT `/api/billing-service/update-budget`

### Job not found
- Check job ID is correct
- Job IDs are UUIDs returned when creating the job
- List all jobs to verify: POST `/api/video-generation-service/list-jobs`

### Server error (500)
- Check server logs: `npm start`
- Verify all required fields are provided
- Check trace ID is unique

---

## Notes

1. **API Token Required**: All requests need a valid `api_token`
2. **Async Processing**: Jobs are processed asynchronously - use GetJobStatus to check progress
3. **Cost Tracking**: Each job has a `cost_usd` based on duration and provider
4. **Budget Limits**: Daily and monthly budget limits apply
5. **Email Notifications**: Set `notify_email` to get completion notifications
6. **Approval Flow**: If `require_approval=true`, use ApproveJob RPC before processing starts

---

## Full Integration Example

```bash
#!/bin/bash

API_BASE="http://localhost:3000/api/video-generation-service"
API_TOKEN="my-api-token"

# 1. Deploy job
echo "1️⃣ Deploying job..."
JOB=$(curl -s -X POST "$API_BASE/generate-video" \
  -H "Content-Type: application/json" \
  -d "{
    \"prompt\": \"A beautiful forest\",
    \"scene_name\": \"forest_1\",
    \"aspect_ratio\": \"16:9\",
    \"duration_seconds\": 8,
    \"api_token\": \"$API_TOKEN\",
    \"trace_id\": \"trace-$(date +%s)\"
  }")

JOB_ID=$(echo "$JOB" | jq -r '.job_id')
echo "Job ID: $JOB_ID"

# 2. Wait and check status (poll every 5 seconds)
echo -e "\n2️⃣ Checking job status..."
for i in {1..60}; do
  STATUS=$(curl -s -X POST "$API_BASE/get-job-status" \
    -H "Content-Type: application/json" \
    -d "{
      \"job_id\": \"$JOB_ID\",
      \"api_token\": \"$API_TOKEN\"
    }")

  JOB_STATUS=$(echo "$STATUS" | jq -r '.status')
  echo "[$i/60] Status: $JOB_STATUS"

  if [ "$JOB_STATUS" = "DONE" ]; then
    echo "✅ Job completed!"
    echo "$STATUS" | jq '.'
    break
  fi

  if [ "$JOB_STATUS" = "FAILED" ]; then
    echo "❌ Job failed!"
    echo "$STATUS" | jq '.error'
    break
  fi

  sleep 5
done
```

Save and run:
```bash
chmod +x deploy-and-wait.sh
./deploy-and-wait.sh
```
