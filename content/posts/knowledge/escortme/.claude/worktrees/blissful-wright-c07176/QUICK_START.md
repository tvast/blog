# Quick Start Guide

Get Escort Me running in 5 minutes!

## Option 1: Manual Firebase Setup (Recommended for First-Time Users)

### Step 1: Create Firebase Project
- [ ] Go to https://console.firebase.google.com
- [ ] Click **"Create a project"**
- [ ] Name it: `escort-me-game`
- [ ] Uncheck "Enable Google Analytics"
- [ ] Click **"Create project"** and wait

### Step 2: Create Web App
- [ ] Click the **web icon** (</>) to register a web app
- [ ] App name: `Escort Me Web`
- [ ] Click **"Register app"**
- [ ] **Copy your Firebase config** (you'll need this!)

### Step 3: Enable Firestore
- [ ] Go to **"Firestore Database"** in left sidebar
- [ ] Click **"Create database"**
- [ ] Select **"Start in test mode"**
- [ ] Region: `us-central1` (or your preferred region)
- [ ] Click **"Enable"**

### Step 4: Create `.env.local`
Create a file named `.env.local` in the project root with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=escort-me-game.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=escort-me-game
VITE_FIREBASE_STORAGE_BUCKET=escort-me-game.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefg123456
```

(Replace with your actual values from Step 2)

### Step 5: Install & Run
```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser!

---

## Option 2: Automated Setup (Advanced)

If you have Firebase CLI installed:

```bash
chmod +x scripts/setup-firebase.sh
./scripts/setup-firebase.sh
npm install
npm run dev
```

---

## First Time Setup Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firestore database enabled
- [ ] `.env.local` created with credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser open at http://localhost:5173

## What You'll See

1. **Firebase Setup Screen** - Will show if no `.env.local` found
   - Shows setup instructions
   - Click "Start Game" when ready

2. **Game Screen**
   - Top-left: Location name and description
   - Top-right: Stats (Money, Happiness, Reputation) + Dashboard button
   - Bottom: Navigation buttons to move between locations

3. **Dashboard** (Click 📊 button)
   - **Stats Tab**: Your progress, player ID, save button
   - **Leaderboard Tab**: Top 10 players by money
   - **System Tab**: Connection status, database info

## Features

✅ 2 Playable Locations (Apartment & Street)
✅ Real-time Progress Tracking
✅ Auto-save every 30 seconds to Firebase
✅ Leaderboard (top players)
✅ Persistent Progress (reload and continue)
✅ Demo Mode (if Firebase not configured)

## Troubleshooting

### Setup screen keeps showing?
- Make sure `.env.local` has values
- Check that `VITE_FIREBASE_PROJECT_ID` is not empty
- Restart dev server: `npm run dev`

### Firebase not saving?
- Check browser console (F12 → Console tab)
- Verify Firestore database is enabled
- Confirm `.env.local` has correct credentials

### Leaderboard empty?
- Click "Save to Firebase" in Dashboard Stats tab
- Wait a moment for sync
- Refresh page

### Stats not displaying?
- Check your internet connection
- Verify Firebase rules allow test mode access
- Check Firebase console for any errors

## Next Steps After Setup

1. Try navigating between Apartment and Street
2. Click the 📊 Dashboard button
3. Try saving progress manually
4. Check Firebase Console to see your data
5. Share your player ID with friends for leaderboard

## Need Help?

- Full setup guide: See `FIREBASE_SETUP.md`
- Firebase docs: https://firebase.google.com/docs
- Project structure: See `README.md`

---

Enjoy building your empire! 🎮
