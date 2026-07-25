# 🎮 Start Here - Escort Me: Night Shift

Choose your path to get the game running:

## Path 1: Test with Mock Data (Fastest ⚡)

**Time: 2 minutes** - No Firebase setup needed

```bash
# 1. Install dependencies
npm install

# 2. Run the game
npm run dev
```

**What you get:**
- ✅ Game loads instantly
- ✅ 10 sample players in leaderboard
- ✅ Full dashboard with stats
- ✅ Mock missions, events, characters
- ✅ Data saved to localStorage
- ⚠️ No cloud sync (session only)

**Perfect for:**
- Testing gameplay
- Exploring the dashboard
- Understanding the UI
- Developing features

---

## Path 2: Set Up Real Firebase (Recommended 🔥)

**Time: 10 minutes** - Cloud syncing + multiplayer

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your Firebase credentials
# (You already have this from earlier)

# 3. Run the game
npm run dev
```

**What you get:**
- ✅ Everything from Path 1, PLUS:
- ✅ Cloud database (Firestore)
- ✅ Persistent progress across sessions
- ✅ Multiplayer leaderboard
- ✅ Real-time stats
- ✅ Auto-save every 30 seconds

**Perfect for:**
- Complete gameplay experience
- Persistent save files
- Multiplayer features
- Production deployment

---

## Quick Comparison

| Feature | Mock Data | Real Firebase |
|---------|-----------|---------------|
| Setup time | None | 5 min |
| Data persistence | This session only | Cloud ☁️ |
| Multiplayer | No | Yes |
| Auto-save | localStorage | Firestore |
| Works offline | Yes | No |
| Speed | Instant | ~300ms |

---

## What to Expect

### When You Start

```
App launches → Firebase check → Displays game
              ↓
         Not configured?
              ↓
         Load mock data ← You are here (fastest path)
              ↓
         Display dashboard with 10 sample players
```

### When You Open Dashboard (📊)

**Stats Tab:**
- Your player ID
- Current progress (money, happiness, reputation)
- Save button
- Last save time

**Leaderboard Tab:**
- Top 10 players by money
- Your rank (added when you first save)
- Compare your stats with others

**System Tab:**
- Database type (Mock or Firebase)
- Connection status
- Environment info

---

## First Steps

### 1. Install & Run
```bash
npm install
npm run dev
```

### 2. Open Browser
Go to **http://localhost:5173**

### 3. Explore the Game
- Click navigation buttons to move between locations
- View stats in top-right
- Click 📊 to open dashboard

### 4. Try Saving
- Go to Dashboard → Stats tab
- Click "Save to Firebase"
- Watch your data save (instant in mock mode)

### 5. Check Leaderboard
- Go to Dashboard → Leaderboard tab
- See all 10 sample players
- Your player now appears there!

---

## Your Firebase Credentials (Already Configured!)

Project: `escort-me-now` ✅

You already have `.env.local` set up with:
- API Key: ✅
- Auth Domain: ✅
- Project ID: ✅
- Storage Bucket: ✅
- Messaging Sender ID: ✅
- App ID: ✅

**Your game is ready to use real Firebase right now!**

Just need to enable the database:
1. Go to https://console.firebase.google.com
2. Select your project
3. Go to "Firestore Database"
4. Click "Create database"
5. Choose "Start in test mode"
6. Click "Enable"

Then restart the dev server: `npm run dev`

Dashboard will show "Firebase Connected" instead of "🎮 MOCK DATA MODE"

---

## What Happens Next

### Current Status
- ✅ Core navigation (2 locations)
- ✅ Real-time stats display
- ✅ Dashboard system
- ✅ Mock database with 10 players
- ✅ Firebase integration ready
- ⏳ Missions (coming next)
- ⏳ Character management (coming next)
- ⏳ Events system (coming next)

### Next Development Phase
The mock database includes:
- 5 missions with different reward types
- 5 characters with different roles
- 3 game events with choices
- 4 business upgrades

These are ready to be implemented into gameplay!

---

## Commands

```bash
# Start development
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

---

## Troubleshooting

**Q: Game doesn't load?**
A: Check that you ran `npm install` first

**Q: No players in leaderboard?**
A: Click "Save to Firebase" in Dashboard → Stats tab first

**Q: Want to see real Firebase?**
A: Enable Firestore database in Firebase Console, then restart `npm run dev`

**Q: Can I switch between mock and real Firebase?**
A: Yes! Just edit `.env.local`:
- Remove contents for mock mode
- Add Firebase config for real Firebase
- Restart dev server

---

## Documentation

- **QUICK_START.md** - 5-minute Firebase setup guide
- **FIREBASE_SETUP.md** - Detailed Firebase configuration
- **FIREBASE_INTEGRATION.md** - Technical architecture
- **MOCK_DATABASE.md** - Mock data system guide
- **README.md** - Full project overview

---

**Ready? Run:** `npm install && npm run dev` 🚀

---

Status: ✅ Ready to play
Last Updated: 2026-06-26
