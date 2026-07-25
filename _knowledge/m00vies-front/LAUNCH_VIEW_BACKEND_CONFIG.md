# Launch View: Backend Configuration Knobs

**Interactive controls for real-time backend parameter testing**

---

## Overview

The Launch View now includes a **Backend Configuration** section at the top with interactive knobs to adjust video generation and processing parameters in real-time. These controls are designed for **testing and optimization** without redeploying the backend.

---

## Configuration Parameters

### 1. **Quality** (0-100%)
- **Default**: 75%
- **Purpose**: Controls video bitrate and compression level
- **Impact**:
  - Higher = Better quality, larger file size, longer processing
  - Lower = Faster processing, smaller files, potential quality loss
- **Testing Tips**:
  - Test edge cases: 0% (minimum), 50% (medium), 100% (maximum)
  - Watch file sizes and processing time in the monitor panel
  - Recommend starting at 75% for balanced results

### 2. **Concurrency** (1-20 workers)
- **Default**: 4
- **Purpose**: Number of parallel video processing workers
- **Impact**:
  - Higher = Faster processing, more CPU/memory usage
  - Lower = Slower but lighter on resources
  - Sweet spot usually 4-8 depending on system
- **Testing Tips**:
  - Monitor backend logs for bottlenecks
  - Test with large batches to see throughput gains
  - Watch for diminishing returns above 12 workers

### 3. **Timeout** (5-300 seconds)
- **Default**: 120s
- **Purpose**: Maximum time allowed for a single job
- **Impact**:
  - Too low = Jobs get killed prematurely
  - Too high = Stuck jobs consume resources
  - Set based on longest expected processing time
- **Testing Tips**:
  - Use 300s for complex/long videos
  - Use 30-60s for quick tests
  - Monitor timeout errors in the monitor panel

### 4. **Retries** (0-5 attempts)
- **Default**: 2
- **Purpose**: Number of times to retry a failed job
- **Impact**:
  - 0 = Fail-fast (useful for testing)
  - 2-3 = Good for transient failures
  - 5 = Maximum resilience (but slow)
- **Testing Tips**:
  - Set to 0 to catch issues immediately
  - Use 2-3 for production-like testing
  - Watch for retry loops in logs

### 5. **Polling** (1-10 seconds)
- **Default**: 4s
- **Purpose**: Status check interval for job monitoring
- **Impact**:
  - Lower = Real-time feedback, more API calls
  - Higher = Less load on backend, delayed feedback
- **Testing Tips**:
  - Use 1-2s for rapid testing feedback
  - Use 4-6s for production-like behavior
  - Watch API call frequency in network tab

### 6. **Duration** (1-30 seconds)
- **Default**: 8s
- **Purpose**: Generated video length
- **Impact**:
  - Linear relationship with processing time
  - Storage requirements scale with duration
- **Testing Tips**:
  - Start with 3-5s for fast iterations
  - Test full range: 1s (minimum), 8s (standard), 30s (maximum)

---

## How to Test

### Quick Test (5 minutes)
```
1. Open Launch View
2. Set knobs to test values:
   - Quality: 50% (faster)
   - Concurrency: 2 (lighter)
   - Timeout: 60s
   - Retries: 0 (fail-fast)
   - Polling: 1s (quick feedback)
   - Duration: 3s (short video)
3. Enter a simple prompt
4. Click "Launch moovie"
5. Watch monitor panel for status
```

### Load Test
```
1. Set knobs to production-like:
   - Quality: 75%
   - Concurrency: 8 (moderate)
   - Timeout: 180s
   - Retries: 2
   - Polling: 4s
   - Duration: 8s
2. Launch multiple jobs in sequence
3. Monitor backend CPU/memory in GCP console
4. Verify all jobs complete
```

### Stress Test
```
1. Set aggressive parameters:
   - Quality: 100% (max quality)
   - Concurrency: 16 (high load)
   - Timeout: 120s (strict)
   - Retries: 0 (fail-fast)
   - Polling: 10s (batch checks)
   - Duration: 15s (longer video)
2. Launch job and monitor system resources
3. Identify bottlenecks from logs
```

### Edge Case Testing
```
1. Duration: 1s (minimum)
2. Duration: 30s (maximum)
3. Quality: 0% (compression limit)
4. Quality: 100% (quality limit)
5. Concurrency: 1 (serial)
6. Concurrency: 20 (max parallel)
7. Timeout: 5s (very strict)
8. Timeout: 300s (very lenient)
```

---

## Live Config Summary

Below the knobs, a **config active** section shows the current settings:

```
Quality: 75%  |  Concurrency: 4  |  Timeout: 120s  |  Retries: 2  |  Polling: 4s
```

This is always visible for quick reference while testing.

---

## Integration with Backend

These parameters are stored in the component state but **not yet sent** to the backend. To integrate:

### Option 1: Add to Payload
```typescript
const payload = () => ({
  prompt: form.prompt.trim(),
  duration_seconds: form.duration_seconds,
  // ... other fields

  // Add backend config
  backend_config: {
    quality: backendConfig.quality,
    concurrency: backendConfig.concurrency,
    timeout_seconds: backendConfig.timeout_seconds,
    retry_count: backendConfig.retry_count,
  }
});
```

### Option 2: Add to Headers
```typescript
const estimateJob = async (payload, config) => {
  return fetch('/api/jobs/estimate', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'X-Backend-Quality': config.quality,
      'X-Backend-Concurrency': config.concurrency,
      'X-Backend-Timeout': config.timeout_seconds,
      // ... etc
    }
  });
};
```

### Option 3: Environment-based (recommended)
Store in `.env` or backend settings, don't expose via API:
```bash
VITE_BACKEND_QUALITY=75
VITE_BACKEND_CONCURRENCY=4
VITE_BACKEND_TIMEOUT=120
```

---

## Visual Design

### Knob Styling
- **Color-coded** by parameter type for quick visual scanning
  - Amber = Quality (warm, high-impact)
  - Cyan = Concurrency (cool, parallelism)
  - Lime = Timeout (safety, performance)
  - Purple = Retries (resilience, reliability)
  - Deep Orange = Polling (monitoring)
  - Primary = Duration (form parameter)

- **Responsive layout**:
  - 6-column grid on desktop (1140px+)
  - 3-column on tablet (600-960px)
  - 2-column on mobile (<600px)

- **Hover effects**:
  - Drop shadow appears on hover
  - Smooth transitions (0.24s ease)
  - Real-time value updates

### Config Summary
- Shows current settings as color-coded chips
- Always visible below knobs
- Easy copy-paste for logging/reporting

---

## Testing Checklist

- [ ] All knobs respond to mouse/touch input
- [ ] Values stay within min/max bounds
- [ ] Config summary updates in real-time
- [ ] Launch button works with any knob values
- [ ] Monitor panel shows correct parameters
- [ ] Backend receives config (if integrated)
- [ ] Mobile layout displays 2-column grid
- [ ] Tablet layout displays 3-column grid
- [ ] Colors match dark theme
- [ ] Hover effects work on desktop

---

## Future Enhancements

### 1. **Presets**
```typescript
// Save/load common configurations
const presets = {
  'quick-test': { quality: 50, concurrency: 2, timeout: 60, ... },
  'production': { quality: 75, concurrency: 8, timeout: 180, ... },
  'hq-rendering': { quality: 100, concurrency: 16, timeout: 300, ... },
};
```

### 2. **Backend Sync**
Send config to backend on each change:
```typescript
watch(backendConfig, async (newConfig) => {
  await updateBackendConfig(newConfig);
});
```

### 3. **Analytics**
Track which parameter combinations work best:
```typescript
trackEvent('job_launched', { ...backendConfig, success, duration });
```

### 4. **Smart Defaults**
Suggest optimal values based on system load:
```typescript
const suggestConfig = async () => {
  const systemLoad = await getSystemMetrics();
  return calculateOptimalConfig(systemLoad);
};
```

### 5. **Parameter Limits**
Allow backend to declare min/max for each param:
```typescript
const parameterLimits = await getBackendCapabilities();
// Apply limits dynamically to knobs
```

---

## Troubleshooting

### Knob Not Responding
- Check browser console for JavaScript errors
- Verify v-model binding is correct
- Ensure Quasar Q-Knob component is installed

### Values Reset
- Component state resets on page reload (expected)
- Use localStorage to persist (optional):
  ```typescript
  watch(backendConfig, (newVal) => {
    localStorage.setItem('launchConfig', JSON.stringify(newVal));
  });
  ```

### Backend Doesn't Receive Config
- Check if config is added to payload/headers
- Verify backend endpoint accepts the fields
- Monitor network tab to see actual request body

---

## Summary

| Parameter | Min | Default | Max | Use Case |
|-----------|-----|---------|-----|----------|
| Quality | 0% | 75% | 100% | File size ↔ Quality tradeoff |
| Concurrency | 1 | 4 | 20 | Parallelism vs resources |
| Timeout | 5s | 120s | 300s | Prevent stuck jobs |
| Retries | 0 | 2 | 5 | Failure resilience |
| Polling | 1s | 4s | 10s | Monitoring frequency |
| Duration | 1s | 8s | 30s | Video length |

**Status**: ✅ Frontend UI Complete
**Next**: Integrate with backend API endpoints

---

**Last Updated**: 2026-03-20
