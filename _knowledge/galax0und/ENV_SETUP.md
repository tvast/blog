# Environment Setup Guide

## ✅ What Was Set Up

### Files Created:
1. **`.env`** - Contains your Firebase credentials (DO NOT COMMIT)
2. **`.env.example`** - Template for other developers
3. **`src/firebase.js`** - Updated to use environment variables

### Files Already Configured:
- **`.gitignore`** - Already includes `.env` (safe!)

---

## 🔐 Security Notice

⚠️ **IMPORTANT:** Your Firebase credentials were exposed in your code!

**What happened:**
- Your credentials were hardcoded in `src/firebase.js` (now fixed)
- The `.env` file is in `.gitignore` (protected from Git)
- Credentials are now loaded from environment variables

---

## 📋 How Environment Variables Work

### In Development:
```javascript
// Your .env file is automatically loaded by Vite
// In your code:
import.meta.env.VITE_FIREBASE_API_KEY  // ← Loads from .env
```

### In Production:
```
Set environment variables in your hosting platform:
- Vercel
- Firebase Hosting
- Netlify
- etc.
```

---

## 🚀 Getting Started

### 1. Your `.env` File is Ready
✅ Already created at `/galax0und/.env`
✅ Contains all your Firebase credentials
✅ Protected by `.gitignore`

### 2. Verify It Works
```bash
npm install  # Install dependencies
npm run dev  # Start development server
```

Check the browser console - you should see:
```
Firebase initialisé: {
  apiKey: "...",
  authDomain: "galax0und.firebaseapp.com",
  databaseURL: "https://...",
  projectId: "galax0und",
  ...
}
```

### 3. Deploy to Production

**For Firebase Hosting:**
```bash
firebase deploy
# Environment variables are loaded from .firebaserc or project config
```

**For Other Platforms:**
Set environment variables:
```
VITE_FIREBASE_API_KEY=AIzaSyCPniBZ2LfvVfS-bQkMlIre9miO-mRq6ao
VITE_FIREBASE_AUTH_DOMAIN=galax0und.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://galax0und-default-rtdb.europe-west1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=galax0und
VITE_FIREBASE_STORAGE_BUCKET=galax0und.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=148762211584
VITE_FIREBASE_APP_ID=1:148762211584:web:1befad3f507da75184efe5
VITE_FIREBASE_MEASUREMENT_ID=G-GXTS6ZZE6N
```

---

## 📁 File Structure

```
galax0und/
├── .env                  ← Your credentials (NOT in Git) ✅
├── .env.example          ← Template for developers
├── .gitignore            ← Already protects .env
├── src/
│   └── firebase.js       ← Uses import.meta.env
└── ...
```

---

## ✨ Environment Variable Reference

| Variable | Value | Usage |
|----------|-------|-------|
| `VITE_FIREBASE_API_KEY` | AIzaSyCPniBZ2LfvVfS-bQkMlIre9miO-mRq6ao | Authentication |
| `VITE_FIREBASE_AUTH_DOMAIN` | galax0und.firebaseapp.com | OAuth redirects |
| `VITE_FIREBASE_DATABASE_URL` | https://galax0und-default-rtdb.europe-west1.firebasedatabase.app | Real-time DB |
| `VITE_FIREBASE_PROJECT_ID` | galax0und | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | galax0und.firebasestorage.app | File storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 148762211584 | FCM messaging |
| `VITE_FIREBASE_APP_ID` | 1:148762211584:web:1befad3f507da75184efe5 | App identification |
| `VITE_FIREBASE_MEASUREMENT_ID` | G-GXTS6ZZE6N | Google Analytics |

---

## 🔄 Updated firebase.js

Your `firebase.js` now includes:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,      // ← NEW
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,  // ← NEW
};
```

---

## ⚙️ Vite Configuration

Vite automatically loads `.env` files based on environment:
- `.env` - Loaded in all environments
- `.env.local` - Loaded in all environments (ignored by Git)
- `.env.[mode]` - Mode-specific (dev, prod, etc.)

All `VITE_*` variables are exposed to client code.

---

## 🛡️ Security Best Practices

✅ **DO:**
- Store `.env` locally (never commit it)
- Use `.env.example` as a template
- Keep credentials in environment variables
- Use different credentials for dev/prod
- Rotate credentials periodically

❌ **DON'T:**
- Hardcode credentials in source code
- Commit `.env` to Git
- Share credentials via chat/email
- Use same credentials for all environments
- Expose sensitive data in logs

---

## 🧪 Testing Environment Variables

```bash
# Check if variables are loaded
npm run dev

# In browser console:
console.log(import.meta.env.VITE_FIREBASE_API_KEY)

# Should output your API key (it's safe - frontend only)
```

---

## 📦 Sharing with Team

**For other developers:**

1. Clone the repo
2. Copy `.env.example` to `.env`
3. Fill in the credentials
4. Start developing

```bash
cp .env.example .env
# Edit .env with actual credentials
npm install
npm run dev
```

---

## 🚨 If Credentials Are Compromised

Your Firebase credentials **were** exposed in your code. Here's what to do:

1. **Rotate credentials immediately:**
   - Go to Firebase Console
   - Project Settings → Service Accounts
   - Regenerate keys

2. **Update `.env`:**
   - Paste new credentials
   - Redeploy

3. **Inform your team** about the exposure

---

## 📚 References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Best Practices](https://firebase.google.com/docs/projects/best-practices)
- [12 Factor App - Config](https://12factor.net/config)

---

## ✅ Checklist

- [x] `.env` file created with credentials
- [x] `.env.example` created as template
- [x] `firebase.js` updated to use environment variables
- [x] `.gitignore` protects `.env` files
- [x] Documentation created

**Status:** Ready to use! 🎉
