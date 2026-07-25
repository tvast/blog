# Cloud Functions

TypeScript Firebase Cloud Functions with proper structure, type safety, and error handling.

## Project Structure

```
functions/
├── src/
│   ├── index.ts              # Main export file - exports all functions
│   ├── config/
│   │   └── logger.ts         # Structured logging
│   ├── types/
│   │   ├── index.ts          # Exports all types
│   │   ├── errors.ts         # Custom error classes
│   │   ├── common.ts         # Common interfaces (ApiResponse, PaginatedResponse)
│   │   ├── progress.ts       # Progress DTOs and interfaces
│   │   ├── leaderboard.ts    # Leaderboard DTOs
│   │   ├── aiTalk.ts         # AI Talk DTOs
│   │   └── revolut.ts        # Revolut payment DTOs
│   ├── middleware/
│   │   ├── errorHandler.ts   # Centralized error handling
│   │   └── validation.ts     # Request validation utilities
│   └── handlers/
│       ├── progress.ts       # Save/load progress functions
│       ├── leaderboard.ts    # Get leaderboard function
│       ├── aiTalk.ts         # AI conversation functions
│       └── revolut.ts        # Payment handling functions
├── lib/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Available Functions

### Progress Management
- **`saveProgress`** - Save user progress (level, score, completed challenges)
- **`loadProgress`** - Load user progress data

### Leaderboard
- **`getLeaderboard`** - Fetch leaderboard with pagination and timeframe filters

### AI Talk
- **`createAiTalk`** - Generate AI response to user message
- **`streamAiTalk`** - Stream AI response in real-time

### Payments
- **`createRevolutOrder`** - Create payment order via Revolut API
- **`revolutWebhook`** - Handle Revolut webhook events

## Type System

All functions use TypeScript with strict mode enabled. Each function has:

1. **Request DTO** - Defines input shape and validation
2. **Response DTO** - Defines output shape
3. **Validation Schema** - Runtime validation rules
4. **Error Handling** - Structured error responses

### Example: Progress Handler

```typescript
// Request is typed
const request: SaveProgressRequest = {
  level: 5,
  score: 1000,
  completedChallenges: ['ch1', 'ch2']
};

// Validation is automatic
assertValid(data, SAVE_PROGRESS_SCHEMA);

// Response is typed
const response: SaveProgressResponse = {
  success: true,
  data: progressData,
  message: 'Progress saved successfully',
  timestamp: new Date().toISOString()
};
```

## Error Handling

Custom error classes provide structured error responses:

```typescript
throw new ValidationError('Invalid amount', {
  field: 'amount',
  min: 0.01,
  max: 10000
});

throw new AuthenticationError('User must be authenticated');
throw new NotFoundError('Progress');
throw new InternalError('Database connection failed');
```

All errors are caught by the error handler middleware and converted to proper HTTP responses.

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run build:watch
```

### Type Checking

```bash
npm run typecheck
```

### Local Emulation

```bash
npm run serve
```

Visit `http://localhost:5001` to access the emulator.

### Firebase Shell (Interactive Testing)

```bash
npm run shell
```

```javascript
// In the Firebase shell:
saveProgress({ level: 5, score: 100, completedChallenges: [] })
```

### View Logs

```bash
npm run logs
```

### Deploy to Firebase

```bash
npm run deploy
```

The deploy script runs type checking before deployment.

## Adding a New Function

1. **Define types** in `src/types/yourFeature.ts`

```typescript
export interface YourRequest {
  field1: string;
  field2: number;
}

export interface YourResponse extends ApiResponse<YourRequest> {
  message: string;
}
```

2. **Create handler** in `src/handlers/yourFeature.ts`

```typescript
export const yourFunction = onCall<YourRequest, YourResponse>(
  { maxInstances: 10 },
  async (request) => {
    assertValid(request.data, YOUR_SCHEMA);
    // Implementation
  }
);
```

3. **Export from index.ts**

```typescript
export { yourFunction } from './handlers/yourFeature';
```

## Logging

Use structured logging throughout:

```typescript
import { log } from '../config/logger';

log.info('Operation started', { userId, amount });
log.warn('Unusual activity', { userId });
log.error('Operation failed', error, { userId, retryCount });
log.debug('Debug information', { variable: value });
```

Logs are automatically timestamped and can be viewed in Firebase Console.

## Performance Tips

- Functions have `maxInstances` set to control concurrent executions
- Longer-running operations (streaming) have increased timeouts
- Validation runs early to fail fast
- Error handlers prevent unstructured responses

## Configuration

Global options are set in `src/index.ts`:

```typescript
setGlobalOptions({
  maxInstances: 10,
  region: 'us-central1',
});
```

Individual functions can override these settings.

## Testing

Each handler includes TODO comments for Firebase/Firestore integration. Mock data is used as placeholders.

To test locally with the emulator:

```bash
npm run serve
```

Then call functions from your app:

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const saveProgress = httpsCallable(functions, 'saveProgress');
await saveProgress({ level: 5, score: 1000, completedChallenges: [] });
```

## Notes

- All functions require authentication (checked in each handler)
- Request validation happens automatically before business logic
- Errors are standardized across all functions
- TypeScript ensures type safety end-to-end
