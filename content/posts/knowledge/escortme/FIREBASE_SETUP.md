# Firebase Setup Guide for Escort Me: Night Shift

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Project name: `escort-me-game`
4. Uncheck "Enable Google Analytics" (optional)
5. Click **"Create project"** and wait for setup to complete

## Step 2: Create Web App

1. In Firebase Console, click the **Web icon** (</>) to create a web app
2. App nickname: `Escort Me Web`
3. Check "Also set up Firebase Hosting for this app" (optional)
4. Click **"Register app"**
5. You'll see your Firebase config - **copy it** (you'll need it in Step 5)

## Step 3: Enable Firestore Database

1. In left sidebar, go to **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select region: `us-central1` (or closest to you)
5. Click **"Enable"**

### Firestore Rules (Test Mode)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for all authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    // For development (open access)
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

## Step 4: Enable Authentication (Optional for Now)

1. Go to **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Enable **"Anonymous"** provider
4. Click **"Enable"** and **"Save"**

## Step 5: Get Your Firebase Config

From Step 2, your config looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "escort-me-game.firebaseapp.com",
  projectId: "escort-me-game",
  storageBucket: "escort-me-game.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890ab"
};
```

## Step 6: Create `.env.local` File

In the project root (`/Users/d0c/Desktop/escortme/`), create `.env.local`:

```bash
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=escort-me-game.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=escort-me-game
VITE_FIREBASE_STORAGE_BUCKET=escort-me-game.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890ab
```

Replace the values with your actual Firebase config from Step 2.

## Step 7: Test the Connection

1. Run the dev server:
```bash
npm run dev
```

2. Open http://localhost:5173 in your browser

3. Click the **📊** button to open the Firebase Dashboard

4. You should see:
   - Your Player ID
   - Current stats (Money: $0, Happiness: 50%, etc.)
   - "Save to Firebase" button
   - Leaderboard tab

5. Click **"Save to Firebase"** button

6. Check [Firestore Console](https://console.firebase.google.com):
   - Go to your project
   - Click "Firestore Database"
   - You should see a new `players` collection with your player data

## Firestore Database Structure

After first save, your Firestore will have this structure:

```
collections/
└── players/
    └── {playerId}/
        ├── playerId: "player_xxxxx"
        ├── data: {
        │   ├── currentLocation: "apartment"
        │   ├── money: 0
        │   ├── happiness: 50
        │   ├── reputation: 0
        │   ├── playtimeSeconds: 0
        │   └── level: 1
        ├── createdAt: timestamp
        ├── updatedAt: timestamp
        └── deviceInfo: "Mozilla/5.0..."
```

## Features Enabled After Setup

✅ **Auto-save** - Game saves every 30 seconds  
✅ **Firebase Dashboard** - View stats, leaderboard, system info  
✅ **Persistent Progress** - Reload page and progress loads from cloud  
✅ **Leaderboard** - See top 10 players by money  
✅ **Cloud Backup** - All progress backed up in Firestore  

## Troubleshooting

### "Could not load Firestore" Error
- Check your `.env.local` has correct credentials
- Verify Firebase project is created and Firestore is enabled
- Check browser console for specific error messages

### Dashboard shows "No players found"
- Click "Save to Firebase" button first
- Wait a moment for data to sync
- Refresh the page

### Stats not saving
- Check browser console for errors
- Verify Firestore rules allow read/write
- Ensure `.env.local` has correct PROJECT_ID

### Slow leaderboard loading
- Large number of players can slow queries
- Consider adding pagination in future updates
- Check Firestore indexes in Firebase Console

## Next Steps

After setup works:
1. Create more game mechanics (money collection, missions)
2. Add more locations
3. Implement humanity meter consequences
4. Create progression events
5. Add user authentication (optional)
