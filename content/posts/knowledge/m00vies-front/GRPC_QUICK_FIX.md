# gRPC Quick Fix — Why Video Generation Fails

**Your frontend ALREADY calls gRPC via REST! Here's why it might fail:**

---

## Architecture You Have ✓

```
Vue LaunchView
    ↓ estimateJob()
    ↓ axios POST to /api/jobs/estimate
    ↓
NestJS REST Controller
    ↓ calls JobService
    ↓ returns estimate ✓ (WORKS)


Vue LaunchView
    ↓ launchJob()
    ↓ axios POST to /api/jobs/launch
    ↓
NestJS REST Controller
    ↓ calls JobService
    ↓ calls VideoGenerationService (gRPC)
    ↓ returns job response ✗ (SOMETIMES FAILS)
```

---

## Why "/jobs/launch" Might Fail

### 1️⃣ **User Not Authenticated**
If `auth.currentUser` is null, the interceptor can't get a token.

**Debug:**
```typescript
import { auth } from '@/lib/firebase';
console.log('Current user:', auth.currentUser);
console.log('User email:', auth.currentUser?.email);
```

**Fix:** Ensure user is logged in before clicking "Launch"

---

### 2️⃣ **Backend Requires Approval**
If the job has `require_approval: true`, it stays in `AWAITING_APPROVAL` status.

**Check in useLaunch.ts:**
```typescript
const launched = await launchJob(req);
console.log('Job status:', launched.status);
```

**Fix:** Disable approval for testing:
```typescript
const payload = () => ({
    prompt: form.prompt.trim(),
    scene_name: form.scene_name.trim() || '',
    aspect_ratio: form.aspect_ratio,
    duration_seconds: Number(form.duration_seconds),
    require_approval: false,  // ← Add this
});
```

---

### 3️⃣ **Budget Exceeded**
Backend rejects if total cost > remaining budget.

**Debug:** Check `estimate.value`:
```typescript
console.log('Estimated cost:', estimate.value?.estimated_cost_usd);
console.log('Budget available:', estimate.value?.budget_headroom_usd);
```

---

### 4️⃣ **Malformed Payload**
The DTO validation fails.

**Check LaunchJobDto requirements:**
```typescript
export class LaunchJobDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;  // ← REQUIRED

  @IsEnum(['16:9', '9:16', '1:1', '2.39:1'])
  @IsOptional()
  aspect_ratio?: string;  // ← Valid values only

  @IsNumber()
  @Min(1)
  @Max(120)
  duration_seconds?: number;  // ← Must be 1-120
}
```

---

## Instant Debugging in Browser Console

```javascript
// 1. Check auth
console.log('Authenticated:', !!auth.currentUser);

// 2. Check estimate
console.log('Estimate cost:', estimate.value?.estimated_cost_usd);

// 3. Make manual test call
const token = await auth.currentUser?.getIdToken();
const res = await fetch('http://localhost:8001/api/jobs/launch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    prompt: 'Test video',
    aspect_ratio: '16:9',
    duration_seconds: 8,
    require_approval: false,
  }),
});
const data = await res.json();
console.log('Response:', res.status, data);
```

---

## Server Response Codes

| Code | Meaning | Fix |
|------|---------|-----|
| `201` | Job created ✓ | Check `job_id` and `status` |
| `400` | Bad request | Validate payload |
| `401` | Unauthorized | Login required |
| `500` | Server error | Check backend logs |

---

## Backend Errors to Watch For

```
❌ "Prompt must not be empty"
   → Add prompt to form

❌ "Budget exceeded"
   → Lower quality or duration

❌ "No providers available"
   → Wait for backend initialization

❌ "Invalid aspect ratio"
   → Use: 16:9, 9:16, 1:1, 2.39:1

❌ "require_approval is true"
   → Set to false for testing
```

---

## Files Created for You

✅ **src/lib/grpc-client.ts** — gRPC wrapper (REST-based)
✅ **GRPC_INTEGRATION_GUIDE.md** — Full documentation

Use them to understand & debug gRPC calls!

---

**Status**: REST ↔ gRPC bridge working, debug payload & auth
**Last Updated**: 2026-03-20

