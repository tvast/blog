# 🎬 Mock Data Bypass Guide

Enable mock backend data to test the stepper interface without a running backend.

## Quick Start

### Option 1: Environment Variable

Edit `.env` and set:

```env
VITE_USE_MOCK_DATA=true
```

Then restart your dev server:

```bash
npm run dev
```

### Option 2: Runtime Toggle (Without Restarting)

If you want to toggle mock mode without restarting:

1. **Enable mock mode in the app initialization** - edit `src/composables/useLaunch.ts`:
   - Look for: `const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';`
   - Change the .env setting or hardcode it to test

2. **Or use localStorage** (requires adding this to `useLaunch.ts`):
   ```ts
   const useMockData = localStorage.getItem('MOCK_DATA') === 'true' ? true : import.meta.env.VITE_USE_MOCK_DATA === 'true';
   ```
   Then in browser console:
   ```js
   localStorage.setItem('MOCK_DATA', 'true');
   // Reload page
   location.reload();
   ```

## What Gets Mocked

When `VITE_USE_MOCK_DATA=true`, all backend API calls are replaced with mock responses:

| Endpoint | Mock Response |
|----------|---------------|
| `/estimate` | Returns cost estimate ($5 base + $1/sec) |
| `/launch` | Creates mock job with auto-progression |
| `/status/:id` | Returns job status (auto-progresses PENDING → PROCESSING → RENDERING → DONE) |
| `/approve/:id` | Marks job as APPROVED |
| `/transform` | Returns mock transformed file data |
| `/health` | Returns healthy status |
| `/budget` | Returns budget info |
| `/providers` | Returns mock provider list |

## Browser Console Tools

When mock mode is enabled, dev tools are available in the browser console:

### `__MOOVIES_MOCK_DEV__.testFlow()`

Logs instructions for testing the funnel flow:

```js
__MOOVIES_MOCK_DEV__.testFlow()
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Test Flow for Job: mock-job-1743865432123-5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To manually test the funnel flow, use these commands:

  ✓ Auto-progress: Job will auto-progress every 3 seconds
    (Status: PENDING → PROCESSING → RENDERING → DONE)

  ✓ Manual override:
    setJobStatus('mock-job-1743865432123-5', 'PROCESSING')
    setJobStatus('mock-job-1743865432123-5', 'RENDERING')
    setJobStatus('mock-job-1743865432123-5', 'DONE')
```

### `__MOOVIES_MOCK_DEV__.setJobStatus(jobId, status)`

Manually set a job's status to test different states:

```js
// Test PROCESSING state
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-1743865432123-5', 'PROCESSING')

// Jump to DONE
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-1743865432123-5', 'DONE')

// Test error state
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-1743865432123-5', 'FAILED')
```

Valid statuses:
- `PENDING` — job created, waiting to start
- `PROCESSING` — actively generating
- `RENDERING` — final render phase
- `DONE` — completed successfully
- `FAILED` — generation failed
- `CANCELLED` — user cancelled

### `__MOOVIES_MOCK_DEV__.logJobs()`

View all current mock jobs in a table:

```js
__MOOVIES_MOCK_DEV__.logJobs()
```

**Output:**
```
id                              status      cost    provider        created
mock-job-1743865432123-1        DONE        12.50   mock-provider   14:23:45
mock-job-1743865432123-2        PROCESSING  12.50   mock-provider   14:24:12
```

### `__MOOVIES_MOCK_DEV__.getMockJobs()`

Get raw job data as JavaScript objects:

```js
const jobs = __MOOVIES_MOCK_DEV__.getMockJobs();
console.log(jobs[0]);
```

## Test Scenarios

### Scenario 1: Quick Happy Path

1. Enable mock mode: `VITE_USE_MOCK_DATA=true`
2. Navigate to `/launch`
3. Step 1 (Brief): Enter text, click "Estimate" → auto-advances
4. Step 2 (Config): Adjust settings, click "Next" → auto-advances
5. Step 3 (Algo): Select algorithm, click "Next" → auto-advances
6. Step 4 (Checkout): Click "Checkout" → auto-advances
7. Step 5 (Launch): Auto-launches, jumps to Monitor
8. Step 6 (Monitor): Job auto-progresses every 3 seconds → DONE
9. Step 7 (Shop): Purchase/review scene

### Scenario 2: Test Job Failure

```js
// After job is created/launched:
__MOOVIES_MOCK_DEV__.testFlow()  // Get the job ID
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-xxx', 'FAILED')

// Monitor step should show error state
```

### Scenario 3: Test Manual Job Resume

1. Launch a job: `__MOOVIES_MOCK_DEV__.testFlow()` (copy job ID)
2. Navigate away from the stepper
3. Come back, enter the job ID in "Resume existing job" field
4. System loads and monitors that job

### Scenario 4: Test Long-Running Job

```js
// Create a job, then freeze it at PROCESSING
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-xxx', 'PROCESSING')

// Monitor how the UI handles long wait times
// Manually advance when ready:
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-xxx', 'RENDERING')
__MOOVIES_MOCK_DEV__.setJobStatus('mock-job-xxx', 'DONE')
```

## Implementation Details

### Files Modified

- **`src/lib/mock-gateway.ts`** (NEW)
  - Mock implementation of `GatewayClient`
  - Auto-progression logic (every 3 seconds)
  - Job storage and state management

- **`src/lib/mock-dev-utils.ts`** (NEW)
  - Browser console tools
  - Helper functions for testing

- **`src/composables/useLaunch.ts`**
  - Checks `VITE_USE_MOCK_DATA` env var
  - Uses mock gateway when enabled
  - Cleans up mock resources on unmount

- **`src/main.ts`**
  - Registers dev tools globally

- **`.env`**
  - Added `VITE_USE_MOCK_DATA=false` config

### Mock Job Progression

When a job is launched in mock mode:

```
Launch → PENDING (immediate)
  ↓ (3 seconds)
PROCESSING
  ↓ (3 seconds)
RENDERING
  ↓ (3 seconds)
DONE ✓
```

Each transition triggers the polling mechanism, advancing the UI naturally.

## Troubleshooting

### "Mock mode not working"

1. Check `.env`: `VITE_USE_MOCK_DATA=true`
2. Restart dev server after changing .env
3. Check browser console for: `🎬 Mock mode ENABLED — all backend calls bypassed`

### Dev tools not showing up

```js
// Check if tools are registered:
window.__MOOVIES_MOCK_DEV__

// If undefined, manually register:
import { registerMockDevTools } from '@/lib/mock-dev-utils'
registerMockDevTools()
```

### Job not auto-progressing

- Check browser console for `[Mock]` logs
- Manually advance with `setJobStatus()`
- Verify polling is active (check React DevTools/Vue DevTools for state updates)

## Disable Mock Mode

To go back to real backend:

```env
VITE_USE_MOCK_DATA=false
```

Then restart dev server.

---

**Note:** Mock data is cleared when the app component unmounts. Each page reload gives you a fresh start.
