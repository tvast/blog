# Escort Me: Night Shift

A satirical management game about transforming an unethical business into something humane and sustainable.

## Tech Stack

- **Frontend**: Vue 3 + TypeScript
- **UI Framework**: Quasar
- **Game Engine**: Phaser 3
- **State Management**: Pinia
- **Backend**: Firebase (Firestore + Auth)
- **Build Tool**: Vite

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Firebase Setup

### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "escort-me-game"
3. Enable Firestore Database (Start in test mode)
4. Create a Web app and copy the config credentials
5. Update your `.env.local` file

### Firestore Database Structure

The database automatically stores player progress in this structure:

```
players/
  └── {playerId}/
      ├── playerId: string
      ├── data: {
      │   ├── currentLocation: string
      │   ├── money: number
      │   ├── happiness: number
      │   ├── reputation: number
      │   ├── playtimeSeconds: number
      │   └── level: number
      ├── createdAt: timestamp
      ├── updatedAt: timestamp
      └── deviceInfo: string
```

## Features

### Current Version (Core Navigation)

- ✅ 2 Map Locations: Apartment & Street
- ✅ Navigation between locations
- ✅ Real-time stats display
- ✅ Firebase integration for progress saving
- ✅ Auto-save every 30 seconds
- ✅ Firebase Dashboard with:
  - Current player stats
  - Leaderboard (top players by money)
  - System information

### Dashboard Shortcuts

Press the **📊** button in the top-right to open the Firebase Dashboard

**Tabs:**
- **Stats**: View your current progress and save manually
- **Leaderboard**: See top 10 players ranked by money
- **System**: View system info and connection status

## Development

### Project Structure

```
src/
├── components/       # Vue components
│   └── FirebaseDashboard.vue
├── config/          # Configuration files
│   └── firebase.ts
├── game/            # Game logic
│   └── gameManager.ts
├── scenes/          # Phaser scenes
│   ├── BaseScene.ts
│   ├── ApartmentScene.ts
│   └── StreetScene.ts
├── services/        # Services
│   └── saveService.ts
├── stores/          # Pinia stores
│   ├── gameStore.ts
│   └── mapStore.ts
├── App.vue
├── main.ts
└── style.css
```

### Key Components

- **MapStore**: Manages location/navigation state
- **GameStore**: Manages game progress (money, happiness, reputation)
- **SaveService**: Firebase operations
- **FirebaseDashboard**: Real-time stats and leaderboard
- **BaseScene**: Phaser scene base with utilities
- **ApartmentScene/StreetScene**: Game map visuals

## Gameplay

1. Start in the **Cramped Apartment**
2. Navigate to **Red Light District - Main Street**
3. Stats display in top-right shows current values
4. Progress auto-saves every 30 seconds to Firebase
5. View leaderboard and compare with other players

## Future Features

- [ ] Character management
- [ ] Mission system
- [ ] Financial transactions
- [ ] Building upgrades
- [ ] Humanity meter affecting gameplay
- [ ] Story events
- [ ] Achievements/Successes
- [ ] New Game+ mode
- [ ] Authentication system

## Performance

- Pixel-art rendering for fast load times
- Efficient Firebase queries with caching
- Auto-save doesn't block gameplay
- Responsive UI with Vue 3 composition API

## License

MIT
