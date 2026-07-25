# Pretty Logger Guide

## Overview

Your logger now has beautiful, colored output with timestamps and emoji badges!

## Logger Methods

### 1. Info (ℹ) - Blue
For general information
```typescript
import { logger } from '@/shared/logger';

logger.info('Server started');
logger.info('User logged in', { userId: '123', email: 'user@example.com' });
```

**Output:**
```
14:32:45 ℹ Server started
14:32:46 ℹ User logged in { "userId": "123", "email": "user@example.com" }
```

---

### 2. Success (✓) - Green
For successful operations
```typescript
logger.success('Database connected');
logger.success('Job completed', { jobId: 'job-123', duration: '2.5s' });
```

**Output:**
```
14:32:47 ✓ Database connected
14:32:48 ✓ Job completed { "jobId": "job-123", "duration": "2.5s" }
```

---

### 3. Warn (⚠) - Yellow
For warnings
```typescript
logger.warn('API key expiring soon');
logger.warn('High memory usage', { usage: '85%' });
```

**Output:**
```
14:32:49 ⚠ API key expiring soon
14:32:50 ⚠ High memory usage { "usage": "85%" }
```

---

### 4. Error (✖) - Red
For errors
```typescript
logger.error('Database connection failed');
logger.error('Job failed', new Error('Timeout exceeded'));
```

**Output:**
```
14:32:51 ✖ Database connection failed
14:32:52 ✖ Job failed
  Error: Timeout exceeded
  at processJob (src/services/job.ts:45:12)
  ...
```

---

### 5. Debug (◆) - Magenta
For debug information (only shown if DEBUG=true or LOG_LEVEL=debug)
```typescript
logger.debug('Processing request', { method: 'POST', path: '/api/jobs' });
```

**Enable debug logging:**
```bash
DEBUG=true npm start
# or
LOG_LEVEL=debug npm start
```

---

### 6. Section (─) - Cyan
For section headers (useful for startup, major events)
```typescript
logger.section('🚀 Moovies Gateway Started');
logger.section('📊 Generating Report');
```

**Output:**
```
────────────────────────────────────────────────────
🚀 Moovies Gateway Started
────────────────────────────────────────────────────

────────────────────────────────────────────────────
📊 Generating Report
────────────────────────────────────────────────────
```

---

### 7. Table
For tabular data
```typescript
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
];
logger.table(users);
```

**Output:**
```
┌─────┬───────┬───────┐
│ id  │ name  │ role  │
├─────┼───────┼───────┤
│  1  │ Alice │ admin │
│  2  │ Bob   │ user  │
└─────┴───────┴───────┘
```

---

## Color Reference

| Badge | Color | Meaning |
|-------|-------|---------|
| ℹ | Blue | Information |
| ✓ | Green | Success |
| ⚠ | Yellow | Warning |
| ✖ | Red | Error |
| ◆ | Magenta | Debug |
| ─ | Cyan | Section |

---

## Usage Examples in Code

### In Services
```typescript
import { logger } from '@/shared/logger';

export class VideoGenerationService {
  async generateVideo(request: GenerateVideoRequest) {
    logger.info('Starting video generation', { prompt: request.prompt });

    try {
      const video = await this.provider.generate(request);
      logger.success('Video generated', { jobId: video.id, duration: '3.2s' });
      return video;
    } catch (error) {
      logger.error('Video generation failed', error);
      throw error;
    }
  }
}
```

### In Controllers
```typescript
export const videoGenerationController = Router();

videoGenerationController.post('/generate-video', async (req, res, next) => {
  logger.info('Received generate-video request', {
    requestId: (req as any).requestId
  });

  try {
    const result = await videoGenerationService.generateVideo(req.body);
    logger.success('Request processed successfully');
    res.json(result);
  } catch (error) {
    logger.error('Request processing failed', error);
    next(error);
  }
});
```

### In Middleware
```typescript
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`${req.method} ${req.path}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      requestId: (req as any).requestId
    });
  });

  next();
};
```

---

## Startup Log Example

When you start the server now, you'll see:

```
────────────────────────────────────────────────────
🚀 Moovies Gateway Started
────────────────────────────────────────────────────

14:32:45 ✓ Middleware configured
14:32:45 ✓ Routes configured
14:32:45 ✓ REST API running on http://0.0.0.0:3000
14:32:45 ℹ API Endpoints: http://0.0.0.0:3000/api
14:32:45 ℹ Health Check: http://0.0.0.0:3000/health
14:32:45 ℹ Documentation: http://0.0.0.0:3000/api-docs
```

---

## Best Practices

1. **Use appropriate log levels:**
   - `info()` - General information
   - `success()` - Positive outcomes
   - `warn()` - Potential issues
   - `error()` - Problems that need attention
   - `debug()` - Detailed troubleshooting info

2. **Include context:**
   ```typescript
   logger.success('Job created', { jobId, userId, estimatedCost });
   ```

3. **Log errors with stack traces:**
   ```typescript
   logger.error('Database error', error);
   ```

4. **Use sections for major events:**
   ```typescript
   logger.section('🔄 Starting Daily Batch Processing');
   // ... process batch
   logger.section('✅ Batch Processing Complete');
   ```

5. **Enable debug in development:**
   ```bash
   LOG_LEVEL=debug npm start
   ```

---

## Environment Variables

- `LOG_LEVEL=debug` - Enable debug logging
- `DEBUG=true` - Enable debug logging (alternative)

---

## Terminal Output Features

✅ **Colored output** - Each level has its own color
✅ **Timestamps** - Every log includes time
✅ **Emoji badges** - Visual indicators for log level
✅ **Error stack traces** - Full error information when applicable
✅ **Structured metadata** - JSON formatting for additional data
✅ **Section headers** - Organize logs into sections

---

## Example: Full Request/Response Logging

```typescript
// In middleware
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const requestId = (req as any).requestId;

  logger.debug(`→ ${req.method} ${req.path}`, {
    requestId,
    headers: req.headers
  });

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;
    const statusColor = status < 400 ? '✓' : '✖';

    if (status < 400) {
      logger.success(`← ${req.method} ${req.path}`, {
        status,
        duration: `${duration}ms`,
        requestId
      });
    } else {
      logger.warn(`← ${req.method} ${req.path}`, {
        status,
        duration: `${duration}ms`,
        requestId
      });
    }
  });

  next();
};
```

Output:
```
14:32:45 ◆ → GET /api/health { "requestId": "abc-123", "headers": {...} }
14:32:45 ✓ ← GET /api/health { "status": 200, "duration": "2ms", "requestId": "abc-123" }

14:32:46 ◆ → POST /api/video-generation/generate-video { "requestId": "def-456" }
14:32:46 ✓ ← POST /api/video-generation/generate-video { "status": 201, "duration": "145ms", "requestId": "def-456" }
```

---

Perfect logging for development and debugging! 🎉
