# End-to-End Tests

This document describes the e2e testing setup for the EscortMe application.

## Overview

The project uses **Puppeteer** for end-to-end testing. All e2e test scripts are located in the `scripts/` directory and are written in JavaScript/ESM format.

## Available E2E Tests

### 1. Safari Passport Geolocation Tests
**File:** `scripts/e2e-safari-passport.mjs`

Tests the location-based passport unlocking feature with mock geolocation.

#### What it tests:
- ✅ Navigation to passport page
- ✅ Safari passport tab display
- ✅ Location validation button
- ✅ Mock geolocation detection (🧪 Test Mode badge)
- ✅ Passport gallery unlocking
- ✅ All 5 passport tiles rendering (Lion, Elephant, Giraffe, Crocodile, Phoenix)
- ✅ Animal names display in gallery
- ✅ Passport tile clicking and detail view
- ✅ Passport image loading
- ✅ Navigation controls (Previous/Next/Random buttons)
- ✅ Passport switching functionality
- ✅ Rarity badge display
- ✅ Zone active status
- ✅ No console errors

**Run the test:**
```bash
npm run test:e2e:safari
```

**Expected output:**
```
🧪 Starting Safari Passport E2E Tests...

✅ Vite server started

📱 Opening browser...

✅ Should navigate to passport page
✅ Should display Safari passport tab
✅ Should click Safari tab to activate it
✅ Should display "Validate location" button
✅ Should click "Validate location" button
✅ Should display mock geolocation badge
✅ Should display passport gallery
✅ Should display "All Passports Unlocked" header
✅ Should display all 5 passport tiles
✅ Should display all animal names in gallery
✅ Should allow clicking first passport tile
✅ Should display Lion detail view
✅ Should load Lion passport image
✅ Should navigate to next passport with Next button
✅ Should display Elephant after clicking Next
✅ Should click Random button to show random passport
✅ Should display a valid passport after Random
✅ Should display rarity badges for passports
✅ Should display zone active status
✅ Should not have console errors

✨ All tests passed!
```

### 2. Main Application E2E Tests
**File:** `scripts/e2e-puppeteer.mjs`

Tests the main application flow (login, navigation, etc.).

**Run the test:**
```bash
npm run test:e2e
```

## Configuration

### Environment Variables for E2E Testing

The e2e tests respect the following environment variables:

```env
# Enable mock geolocation for testing (Safari passport tests)
VITE_ENABLE_MOCK_GEOLOCATION=true

# Mock geolocation coordinates (IP-based location)
VITE_MOCK_GEO_LATITUDE=48.8744
VITE_MOCK_GEO_LONGITUDE=2.3472

# E2E test server port
E2E_PORT=4173
```

### Mock Geolocation

When `VITE_ENABLE_MOCK_GEOLOCATION=true` and the app is in development mode:
- The browser doesn't ask for geolocation permission
- Mock coordinates are used instead of real GPS
- A "🧪 Test Mode" badge appears in the UI
- Safari passport location validation completes instantly

**Mock Coordinates (Default):**
- Latitude: 48.8744
- Longitude: 2.3472
- Distance from Paris Zone Center: ~2.12 km

To test with different coordinates, modify `.env`:
```env
VITE_MOCK_GEO_LATITUDE=48.8566
VITE_MOCK_GEO_LONGITUDE=2.3522
```

## Running Tests

### Run Safari Passport E2E Tests
```bash
npm run test:e2e:safari
```

### Run All E2E Tests
```bash
npm run test:e2e
```

### Run Unit Tests
```bash
npm run test:unit
```

### Run Full Test Suite (Unit + E2E + Build)
```bash
npm run build
```

## Test Structure

Each e2e test:
1. **Starts Vite dev server** on specified port
2. **Launches Puppeteer browser** with headless mode
3. **Navigates to app** and waits for network idle
4. **Executes test cases** in sequence
5. **Validates DOM state** and interactions
6. **Collects console errors** for reporting
7. **Closes browser** and shuts down server

## Adding New E2E Tests

To add a new e2e test file:

1. Create a new `.mjs` file in `scripts/`
2. Use the same structure as `e2e-safari-passport.mjs`
3. Import Puppeteer and spawn Vite server
4. Use the `test()` helper function for assertions
5. Add npm script in `package.json`

Example:
```javascript
import { spawn } from 'node:child_process'
import puppeteer from 'puppeteer'

const PORT = process.env.E2E_PORT || '4173'
const BASE_URL = `http://127.0.0.1:${PORT}`

// ... test setup ...

await test('Should do something', async () => {
  // Test implementation
})
```

## Troubleshooting

### Server doesn't start
- Check port availability: `lsof -i :4173`
- Kill process if needed: `kill -9 <PID>`
- Try different port: `E2E_PORT=4174 npm run test:e2e:safari`

### Tests timeout
- Increase timeout values in the test script
- Check internet connection (image loading)
- Verify Safari passport images exist at `/public/safari/`

### Mock geolocation not working
- Verify `.env` has `VITE_ENABLE_MOCK_GEOLOCATION=true`
- Check that app is running in development mode
- Ensure geolocationTest.ts is imported in SafariPassportExperience

### Console errors during test
- Check `IGNORED_ERRORS` array in test script
- Add expected errors to ignore list if legitimate

## CI/CD Integration

To run e2e tests in CI/CD:

```yaml
# GitHub Actions example
- name: Run E2E Tests
  run: npm run test:e2e:safari
```

## Performance Notes

- First run: ~10-15 seconds (Vite startup)
- Subsequent runs: ~8-12 seconds
- Test timeout: 30 seconds per test case
- Total suite time: ~2-3 minutes

## Files Modified for Testing

- `.env` - Mock geolocation configuration
- `src/utils/geolocationTest.ts` - Geolocation mock utility
- `src/components/SafariPassportExperience.vue` - Uses mock geolocation
- `package.json` - Added `test:e2e:safari` script
