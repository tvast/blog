# Mock Database Guide

The game includes a complete mock database system that populates the game with test data automatically. This allows you to see the full gameplay experience without waiting for Firebase configuration.

## What is Mock Data?

Mock data is simulated game data stored in a JSON file that loads when Firebase is not configured. It includes:

- **10 Sample Players** with different progress levels
- **2 Locations** (Apartment & Street)
- **5 Missions** with different reward types
- **5 Characters** in various states
- **4 Upgrades** for business improvements
- **3 Game Events** with multiple outcomes

## When Mock Data is Used

Mock data automatically activates when:

```
Firebase Project ID is not configured in .env.local
        ↓
USE_MOCK_DATABASE = true
        ↓
Game loads sample data from mockData.json
        ↓
Dashboard shows 🎮 MOCK DATA MODE notice
```

## Quick Test Without Firebase

1. **Delete or rename** `.env.local` (if you want to test mock mode)

2. **Run the game**:
   ```bash
   npm run dev
   ```

3. **Check the dashboard**:
   - Click 📊 button
   - Should show "🎮 MOCK DATA MODE" notice
   - Leaderboard has 10 sample players
   - Try clicking "Save to Firebase" - data saves to localStorage

## Sample Data Overview

### Top 5 Players (by Money)

| Rank | Player ID | Money | Happiness | Reputation | Level | Status |
|------|-----------|-------|-----------|------------|-------|--------|
| 1 | alex | $25,000 | 78% | 85% | 5 | Active |
| 2 | jordan | $18,500 | 62% | 71% | 4 | Active |
| 3 | casey | $15,750 | 55% | 48% | 3 | Active |
| 4 | morgan | $12,300 | 70% | 82% | 3 | Active |
| 5 | sam | $9,850 | 45% | 35% | 2 | Burned Out |

### Available Missions

1. **Morning Collections** - Easy, 500 reward, 5 min
   - Collect payments from workers
   - Impact: -2 happiness, +1 reputation

2. **Secure New Client** - Medium, 2000 reward, 30 min
   - Negotiate new business deal
   - Impact: +5 happiness, +10 reputation

3. **Handle Complaint** - Hard, 1000 reward, 10 min
   - Address angry client
   - Impact: -15 happiness, -5 reputation

4. **Worker Wellness Check** - Easy, 750 reward, 15 min
   - Ensure worker safety
   - Impact: +20 happiness, +15 reputation

5. **Upgrade Security** - Hard, 0 reward, 60 min
   - Install security system
   - Impact: +8 happiness, +5 reputation

### Game Events

**Media Scandal**
- Choices:
  - Go public with reforms: +30 rep, -$5000
  - Cover it up: -50 rep, +$2000

**Worker Strike**
- Choices:
  - Negotiate fairly: +25 happiness, -$3000
  - Ignore demands: -30 happiness, +$1000

**Investor Interest**
- Choices:
  - Accept investment: +$50,000, +5 rep
  - Decline: +10 rep (stay independent)

### Characters (Staff)

- **Alex** (Manager) - Happiness: 75%, Salary: $1500
- **Jordan** (Security) - Happiness: 60%, Salary: $1200
- **Casey** (Accountant) - Happiness: 55%, Salary: $1800
- **Morgan** (Worker) - Happiness: 40%, Salary: $800
- **Sam** (Worker) - Burned out (15% happiness), Salary: $800

## File Structure

```
src/
├── data/
│   └── mockData.json              # All mock data
├── services/
│   ├── mockDatabase.ts            # Mock database service
│   ├── databaseAdapter.ts         # Adapter switching between Firebase/Mock
│   └── saveService.ts             # Firebase service
└── stores/
    └── gameStore.ts               # Uses database adapter
```

## How It Works

### Database Adapter Pattern

```typescript
// In your code, use the adapter:
import { database } from '@/services/databaseAdapter'

// Automatically uses mock data if Firebase not configured
const players = await database.getAllPlayers(10)  // Returns mock or Firebase data
const progress = await database.loadProgress()     // Loads from either source
```

### Configuration Detection

```typescript
// src/services/databaseAdapter.ts
export const USE_MOCK_DATABASE = !isFirebaseConfigured()

// Automatically true if VITE_FIREBASE_PROJECT_ID is empty or "your_project_id"
```

## Testing Different Scenarios

### Scenario 1: Test Leaderboard

1. Run with mock data
2. Open Dashboard → Leaderboard tab
3. See 10 sample players ranked by money
4. Your new player will be added when you first save

### Scenario 2: Test Save/Load

1. In Dashboard → Stats tab
2. Click "Save to Firebase"
3. Check browser DevTools → Application → Local Storage
4. Find `escortme_progress` - your data is saved
5. Refresh page - data loads back

### Scenario 3: Test Multiple Saves

1. Mock system allows you to track multiple saves
2. Player data persists in mock database during session
3. Reload browser - falls back to localStorage

## Adding Custom Mock Data

To add more test data, edit `src/data/mockData.json`:

```json
{
  "players": [
    {
      "playerId": "player_1000_yourname",
      "data": {
        "money": 50000,
        "happiness": 90,
        "reputation": 95,
        ...
      }
    }
  ]
}
```

Then reload the app - new data appears in leaderboard.

## Switching to Real Firebase

When you're ready to use real Firebase:

1. Create `.env.local` with Firebase credentials:
   ```
   VITE_FIREBASE_PROJECT_ID=escort-me-now
   VITE_FIREBASE_API_KEY=your_key
   ...
   ```

2. Restart dev server

3. Dashboard shows "Firebase Online" instead of "MOCK DATA MODE"

4. Data syncs to real Firestore database

## Mock vs Real Comparison

| Feature | Mock Data | Firebase |
|---------|-----------|----------|
| Load Speed | Instant | ~300ms (simulated) |
| Persistence | Session + localStorage | Cloud database |
| Multiplayer | No | Yes (via leaderboard) |
| Offline Mode | Always | Only if configured |
| Setup Required | None | Firebase console |
| Reliability | 100% | Depends on network |

## Troubleshooting

### Mock data not loading?
- Check `src/data/mockData.json` exists
- Verify `.env.local` has empty or no `VITE_FIREBASE_PROJECT_ID`
- Restart dev server: `npm run dev`

### Dashboard shows "Firebase Offline" instead of "MOCK DATA MODE"?
- Means Firebase is partially configured
- Update `.env.local` to remove/clear credentials
- Or provide complete Firebase config

### Leaderboard empty?
- Click "Save to Firebase" first
- Your player will be added to the leaderboard
- Refresh dashboard tab

### Want to reset mock data?
- Mock data comes from JSON, so it resets each session
- To modify permanently, edit `src/data/mockData.json`

## Real-World Usage

Mock data is perfect for:
- ✅ **Development** - Fast iteration without network calls
- ✅ **Testing UI** - See dashboard with real-looking data
- ✅ **Prototyping** - Test features before backend ready
- ✅ **Demo** - Show gameplay without Firebase setup
- ✅ **Offline play** - Continue playing without internet

## Next Steps

1. **Play with mock data** - Explore the game features
2. **Test the dashboard** - See stats and leaderboard
3. **Try the missions** - See what gameplay looks like
4. **Then set up Firebase** - For persistent cloud storage

---

**Status**: Mock database fully functional
**Last Updated**: 2026-06-26
**Version**: 1.0.0
