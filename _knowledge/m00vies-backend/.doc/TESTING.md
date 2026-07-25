# Testing Guide

## Overview

Tests are located in `src/__tests__/` directory and use Jest framework.

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Specific Test File
```bash
npm test api.test.ts
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Build + Demo Video Smoke Test
```bash
yarn build:verify
```

This will:
1. Regenerate proto files
2. Compile TypeScript
3. Start the built REST API on a temporary port
4. Verify `/health`, `/api`, and the video generation/download flow
5. Download the generated MP4 and validate it with `ffprobe`

## Test Structure

### `api.test.ts`

Complete test suite for the Moovies Gateway API that validates:

#### 1. Gateway Info Endpoint (`GET /api`)
- ✅ Returns correct API name and status
- ✅ Lists all 4 services
- ✅ Each service has correct basePath
- ✅ Response matches expected structure

#### 2. Health Check Endpoint (`GET /health`)
- ✅ Returns health status
- ✅ Includes timestamp

#### 3. Auth Service Routes (`/api/auth`)
- ✅ `/login` - User authentication
- ✅ `/verify-token` - Token validation
- ✅ `/refresh-token` - Token refresh
- ✅ `/logout` - User logout

#### 4. Billing Service Routes (`/api/billing`)
- ✅ `/get-budget-status` - Check budget
- ✅ `/update-budget` - Update limits
- ✅ `/log-cost` - Log job cost

#### 5. Video Generation Routes (`/api/video-generation`)
- ✅ `/generate-video` - Create video job
- ✅ `/get-job-status` - Check job status
- ✅ `/list-jobs` - List all jobs
- ✅ `/approve-job` - Approve job
- ✅ `/cancel-job` - Cancel job
- ✅ `/generate-batch` - Batch video generation

#### 6. Scenario Pool Routes (`/api/scenario-pool`)
- ✅ `/generate-pool` - Generate scenarios
- ✅ `/score-pool` - Score scenarios
- ✅ `/select-scenario` - Select scenario

#### 7. Error Handling
- ✅ 404 errors for invalid routes
- ✅ Error responses include requestId
- ✅ Proper error structure

#### 8. API Structure Validation
- ✅ Response has correct shape
- ✅ Modules have correct format
- ✅ basePath format validation

## Before Running Tests

Make sure the server is running:

```bash
npm start
```

In another terminal:

```bash
npm test
```

Or run the full verified build:

```bash
yarn build:verify
```

## Expected Output

```
PASS  src/__tests__/api.test.ts
  Moovies Gateway API
    GET /api - Gateway Info
      ✓ should return gateway information (45ms)
      ✓ should have correct name (8ms)
      ✓ should have ok status (5ms)
      ✓ should list all modules (6ms)
      ✓ should have AuthServiceModule (8ms)
      ✓ should have BillingServiceModule (7ms)
      ✓ should have ScenarioPoolServiceModule (6ms)
      ✓ should have VideoGenerationServiceModule (7ms)
    GET /health - Health Check
      ✓ should return health status (6ms)
    Auth Service Routes
      ✓ should have login endpoint (15ms)
      ✓ should have verify-token endpoint (8ms)
      ✓ should have refresh-token endpoint (7ms)
      ✓ should have logout endpoint (9ms)
    Billing Service Routes
      ✓ should have get-budget-status endpoint (7ms)
      ✓ should have update-budget endpoint (9ms)
      ✓ should have log-cost endpoint (8ms)
    Video Generation Service Routes
      ✓ should have generate-video endpoint (12ms)
      ✓ should have get-job-status endpoint (8ms)
      ✓ should have list-jobs endpoint (9ms)
      ✓ should have approve-job endpoint (8ms)
      ✓ should have cancel-job endpoint (9ms)
      ✓ should have generate-batch endpoint (10ms)
    Scenario Pool Service Routes
      ✓ should have generate-pool endpoint (8ms)
      ✓ should have score-pool endpoint (8ms)
      ✓ should have select-scenario endpoint (9ms)
    Error Handling
      ✓ should return 404 for invalid routes (7ms)
      ✓ should include requestId in error responses (6ms)
    API Structure Validation
      ✓ should match expected gateway response structure (8ms)
      ✓ should have correct number of services (6ms)
      ✓ should have consistent basePath format (7ms)

Test Suites: 1 passed, 1 total
Tests:       31 passed, 31 total
```

## Test Categories

### Gateway Structure Tests
Validates that the API gateway returns the correct structure with all services listed.

### Service Endpoint Tests
Validates that all service endpoints exist and respond (don't return 404).

### Health Check Tests
Validates the health endpoint works correctly.

### Error Handling Tests
Validates error responses are properly formatted.

### Integration Tests
Validates the complete flow of requests through the gateway.

## Writing New Tests

To add new tests, create a file in `src/__tests__/`:

```typescript
describe('New Feature', () => {
  it('should do something', async () => {
    const response = await fetch('http://localhost:3000/api/endpoint');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBeDefined();
  });
});
```

## CI/CD Integration

For GitHub Actions, add to `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm install
      - run: npm run build
      - run: npm start &
      - run: sleep 2
      - run: npm test
```

## Debugging Tests

### Run with verbose output
```bash
npm test -- --verbose
```

### Run single test
```bash
npm test -- --testNamePattern="should return gateway information"
```

### Debug in Node
```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

## Performance Tips

- ✅ Run tests in parallel (default)
- ✅ Use `test:watch` during development
- ✅ Mock external services for unit tests
- ✅ Use integration tests for full flow

## Troubleshooting

### Tests timeout
Increase timeout in jest.config.js:
```javascript
testTimeout: 10000
```

### Server connection refused
Make sure server is running:
```bash
npm start
```

### Tests fail intermittently
Add retry logic or increase timeouts for network-dependent tests.

---

## Summary

Your test suite validates:
- ✅ API structure matches expected format
- ✅ All services are registered
- ✅ All endpoints exist
- ✅ Error handling works
- ✅ Health checks pass

Run `npm test` to verify your API is working correctly! ✅
