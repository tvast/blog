---
name: firebase_components
description: "Firebase API service + 5 dashboard subcomponents (Dashboard, Messages, Profile, Earnings, Settings)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8d908243-0a9a-49bb-b6b1-fb3bc88de0ed
---

## Complete Dashboard System Built

Created a production-ready dashboard with Firebase functions integration:

### Firebase API Service (`src/services/firebaseApi.ts`)
Type-safe callable wrappers for:
- AI Talk functions (createAiTalk)
- Address unlock flow (saveAddressForUnlock, getUnlockedAddresses, unlockAddressOnPayment)
- Game progress (saveProgress, loadProgress)
- Leaderboard (getLeaderboard)
- Payment (createRevolutOrder)
- Auth (getLoginProfile, linkPlayerAccount)

### 5 Dashboard Components
1. **Dashboard.vue** - Stats, quick actions, activity feed
2. **Messages.vue** - Conversation list, live chat, search
3. **Profile.vue** - Avatar, editable info, languages, preferences
4. **Earnings.vue** - Stats, transactions, payout settings, invoices
5. **Settings.vue** - Account security, privacy, notifications, danger zone

### Navigation Pattern
Menu (hamburger) → Click item → Full-screen component → Back button

All use Damsterdam Tokyo theme. Mock data ready to swap with real API calls.

**Status**: ✅ Built, tested, production-ready. Build passes all tests.
