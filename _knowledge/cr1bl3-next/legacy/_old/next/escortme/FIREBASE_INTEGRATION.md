# Firebase Integration Complete Guide

This document explains the complete Firebase integration for Escort Me: Night Shift.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         Vue 3 Frontend (App.vue)        │
├─────────────────────────────────────────┤
│  Pinia Stores (gameStore, mapStore)    │
├─────────────────────────────────────────┤
│     Firebase Services (saveService)     │
├─────────────────────────────────────────┤
│  Firebase SDK (Auth, Firestore)         │
├─────────────────────────────────────────┤
│   Google Cloud (Firebase Console)       │
└─────────────────────────────────────────┘
```

## File Structure

```
src/
├── config/
│   └── firebase.ts                    # Firebase initialization
├── services/
│   └── saveService.ts                 # Firestore operations
├── stores/
│   ├── gameStore.ts                   # Game state + save/load
│   └── mapStore.ts                    # Location state
├── components/
│   ├── FirebaseDashboard.vue          # Stats, leaderboard UI
│   └── FirebaseSetup.vue              # Setup guide
└── App.vue                            # Main app with auto-save

root/
├── .env.local                         # Firebase credentials (yours)
├── .env.example                       # Example template
├── .env.local.template                # Copy to create .env.local
├── FIREBASE_SETUP.md                  # Detailed setup guide
├── QUICK_START.md                     # Quick 5-min setup
└── scripts/
    └── setup-firebase.sh              # Automated setup script
```

## Data Flow

### Saving Progress

```
User plays game
    ↓
gameStore methods called (addMoney, setHappiness, etc)
    ↓
Auto-save triggered every 30 seconds
    ↓
saveService.saveProgress()
    ↓
Firebase Firestore Database
    └─ players/{playerId}/data
```

### Loading Progress

```
App mounts (onMounted)
    ↓
gameStore.loadFromFirebase()
    ↓
saveService.loadProgress()
    ↓
Firebase Firestore Database
    ↓
Game state restored with saved data
```

### Dashboard Updates

```
User opens Dashboard (📊 button)
    ↓
FirebaseDashboard.vue mounts
    ↓
loadLeaderboard() called
    ↓
saveService.getAllPlayers()
    ↓
Firestore queries players collection
    ↓
Top 10 players displayed by money
```

## Firestore Database Schema

### Collection: `players`

```
players/
├── {playerId}/
│   ├── playerId: string
│   │   Example: "player_1234567890_abc123def456"
│   │
│   ├── data: object
│   │   ├── currentLocation: string ("apartment", "street")
│   │   ├── money: number (0+)
│   │   ├── happiness: number (0-100)
│   │   ├── reputation: number (0-100)
│   │   ├── timestamp: Date
│   │   ├── playtimeSeconds: number
│   │   └── level: number (1+)
│   │
│   ├── createdAt: Timestamp
│   ├── updatedAt: Timestamp
│   └── deviceInfo: string
```

### Example Document

```json
{
  "playerId": "player_1719432000000_h7k2m9n1",
  "data": {
    "currentLocation": "street",
    "money": 1500,
    "happiness": 65,
    "reputation": 42,
    "timestamp": "2026-06-26T15:30:00Z",
    "playtimeSeconds": 3600,
    "level": 2
  },
  "createdAt": "2026-06-26T14:00:00Z",
  "updatedAt": "2026-06-26T15:30:00Z",
  "deviceInfo": "Mozilla/5.0..."
}
```

## Features Implemented

### 1. Auto-Save System
- **Interval**: Every 30 seconds
- **Location**: `src/App.vue` (setupAutoSave function)
- **Fallback**: localStorage if Firebase fails
- **Manual Save**: Dashboard → Stats tab → "Save to Firebase" button

### 2. Offline Mode (Demo Mode)
- Automatically enabled if `.env.local` not configured
- Shows setup guide when launching
- Data saved to localStorage instead of Firebase
- Dashboard shows "⚠️ DEMO MODE" notice
- Leaderboard disabled in offline mode

### 3. Firebase Dashboard
- **Tabs**:
  1. **Stats**: Current player progress, player ID, save button
  2. **Leaderboard**: Top 10 players ranked by money
  3. **System**: Connection status, database info

- **Features**:
  - Real-time stats display
  - Manual save trigger
  - Player ID display (for multiplayer)
  - Connection status indicator
  - Responsive design

### 4. Setup Guide
- Appears on first launch if Firebase not configured
- 4-step setup instructions
- Links to Firebase Console
- Auto-detects when configuration complete

### 5. Persistent Progress
- Loads saved data on app startup
- Continues from last saved state
- Works across browser sessions
- Syncs across devices (same player ID)

## Configuration

### Environment Variables

File: `.env.local` (create this yourself)

```bash
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=escort-me-game.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=escort-me-game
VITE_FIREBASE_STORAGE_BUCKET=escort-me-game.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefg
```

### How to Get These Values

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create/select your project
3. Click the web app icon (</>)
4. Copy the config object
5. Map values to environment variables above

### Checking Configuration

```typescript
import { isFirebaseConfigured } from '@/config/firebase'

if (isFirebaseConfigured()) {
  console.log('Firebase is ready')
} else {
  console.log('Running in demo mode')
}
```

## Services Overview

### saveService.ts

Main service for Firebase operations.

**Methods**:
- `saveProgress(progress)` - Save game progress
- `loadProgress()` - Load saved progress
- `getPlayerStats()` - Get current player stats
- `getAllPlayers(limit)` - Get leaderboard
- `getPlayerId()` - Get current player ID

**Example Usage**:
```typescript
import { saveService } from '@/services/saveService'

// Save progress
await saveService.saveProgress({
  money: 1000,
  happiness: 75,
  reputation: 50
})

// Load progress
const progress = await saveService.loadProgress()

// Get leaderboard
const players = await saveService.getAllPlayers(10)
```

### gameStore.ts

Pinia store managing game state.

**State**:
- `money` - Player's money
- `happiness` - Happiness level (0-100)
- `reputation` - Reputation level (0-100)
- `playtimeSeconds` - Total playtime
- `level` - Current level

**Methods**:
- `addMoney(amount)` - Add money
- `setHappiness(value)` - Set happiness
- `addReputation(amount)` - Add reputation
- `saveToFirebase()` - Save to cloud
- `loadFromFirebase()` - Load from cloud

**Example Usage**:
```typescript
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

// Modify state
gameStore.addMoney(100)
gameStore.addHappiness(10)

// Save to cloud
await gameStore.saveToFirebase()

// Load from cloud
await gameStore.loadFromFirebase()
```

## API Reference

### Firebase Config

```typescript
// src/config/firebase.ts
import { db, auth, isFirebaseConfigured } from '@/config/firebase'

// Check if configured
if (isFirebaseConfigured()) {
  // Firebase is ready
}
```

### Save Service

```typescript
// src/services/saveService.ts
import { saveService, GameProgress, SaveSnapshot } from '@/services/saveService'

// Save
await saveService.saveProgress({
  money: 500,
  happiness: 60,
  reputation: 40,
  playtimeSeconds: 1800,
  level: 1
})

// Load
const progress = await saveService.loadProgress()

// Leaderboard
const top10 = await saveService.getAllPlayers(10)

// Get player ID
const id = saveService.getPlayerId()
```

### Game Store

```typescript
// src/stores/gameStore.ts
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

// State
console.log(store.money)
console.log(store.happiness)
console.log(store.reputation)
console.log(store.humanityScore)  // (happiness + reputation) / 2

// Modify
store.addMoney(100)
store.setHappiness(75)
store.addReputation(5)
store.setPlaytime(3600)

// Save/Load
await store.saveToFirebase()
await store.loadFromFirebase()
```

## Security & Rules

### Current Firestore Rules (Test Mode)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

**Status**: Open for development (test mode)

### Production Rules (Recommended)

For production, use authentication:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /players/{userId} {
      allow read: if true;
      allow create, update: if request.auth.uid == userId;
    }
  }
}
```

## Monitoring & Debugging

### Console Logging

The app logs Firebase operations to browser console:

```
// Open browser DevTools: F12 → Console tab
Error saving progress to Firebase: [error details]
Error loading progress from Firebase: [error details]
```

### Firebase Console Monitoring

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database**
4. View data in real-time
5. Check usage analytics

### Testing Offline Mode

To test without Firebase:

1. Remove `.env.local` or set values to empty
2. Restart dev server
3. See setup guide on launch
4. Game runs in demo mode with localStorage

## Future Enhancements

- [ ] User authentication (Google, GitHub, Anonymous)
- [ ] Multiplayer leaderboard (live updates)
- [ ] Backup/export game data
- [ ] Cloud save sync across devices
- [ ] Achievement tracking in Firebase
- [ ] Analytics integration
- [ ] Real-time multiplayer events
- [ ] Cloud functions for economy calculations

## Troubleshooting

### Issue: "Firebase not initialized"
**Solution**: Check that `.env.local` exists with correct values

### Issue: "Firestore permission denied"
**Solution**: 
- Ensure Firestore database is created
- Check rules allow test mode access
- Verify project ID in `.env.local`

### Issue: Data not saving
**Solution**:
- Check browser console for errors
- Verify network connection
- Ensure Firebase quota not exceeded
- Check Firestore rules

### Issue: Leaderboard empty
**Solution**:
- Click "Save to Firebase" first
- Wait for sync (usually instant)
- Refresh dashboard tab
- Check Firestore console directly

## Performance Considerations

- **Query Limit**: Top 10 players (optimized for speed)
- **Save Interval**: 30 seconds (balances frequency and cost)
- **Offline Support**: localStorage as fallback
- **Data Size**: Minimal (< 1KB per save)

## Cost Estimation

Firebase free tier includes:
- 1 GB storage
- 50k reads/day
- 20k writes/day
- Good for indie games!

## Support & Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Vue 3 + Firebase](https://firebase.google.com/docs/web/setup#web-version-8)
- [Pinia Documentation](https://pinia.vuejs.org/)

---

**Status**: ✅ Fully integrated and tested
**Last Updated**: 2026-06-26
**Version**: 1.0.0
