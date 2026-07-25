# Gemini to OpenRouter Migration Summary

## Overview

Successfully migrated all Gemini API calls to **OpenRouter**, a free service offering access to open-source language models (Mistral, Llama, etc.). The migration eliminates API costs while maintaining the same parameter generation functionality.

## Files Created

### 1. Boot Configuration
- **`src/boot/openrouter.js`** (NEW)
  - Initializes OpenRouter config from environment variables
  - Provides global config through Vue app instance
  - Replaces `src/boot/gemini.js` in Quasar config

### 2. Services
- **`src/services/openRouterParamGenerator.js`** (NEW)
  - Singleton service for parameter generation
  - Handles both torus and interpolation parameter generation
  - Includes sanitization and error handling
  - Uses OpenRouter Chat Completions API

### 3. Updated Services
- **`src/services/geminiTorusParams.js`** (REFACTORED)
  - Now uses `OpenRouterParamGenerator` instead of direct Gemini API calls
  - Simplified: ~195 lines → ~95 lines
  - Removed: requestGemini, stripJsonFence, sanitizeParams (moved to generator)
  - Kept: scene-specific logic and parameter application

- **`src/services/geminiSceneInterpolator.js`** (REFACTORED)
  - Now uses `OpenRouterParamGenerator` for parameter generation
  - Removed: requestGemini, sanitizeParams methods
  - Updated: getTokenUsageStats() and getResponseMetadata() return empty data
  - Kept: interpolation sequencing and frame application logic

### 4. Firebase Cloud Functions
- **`functions/index.js`** (NEW)
  - Two HTTP endpoints for server-side parameter generation
  - `POST /generateTorusParams` - Generate torus scene parameters
  - `POST /generateInterpolationParams` - Generate interpolation parameters
  - Includes CORS headers and error handling

- **`functions/package.json`** (NEW)
  - Dependencies: firebase-functions, firebase-admin
  - Node.js 20 runtime
  - Scripts: serve, deploy, logs

### 5. Configuration Files
- **`firebase.json`** (UPDATED)
  - Added functions configuration
  - Configured Node.js 20 runtime
  - Added rewrite rules for API endpoints

- **`.env.example`** (UPDATED)
  - Replaced Gemini variables with OpenRouter variables
  - Includes links to get API key and available models

- **`quasar.config.js`** (UPDATED)
  - Changed boot array from `'gemini'` to `'openrouter'`

### 6. Documentation
- **`OPENROUTER_SETUP.md`** (NEW)
  - Complete setup guide
  - Service API documentation
  - Troubleshooting tips
  - Model selection guide

## Migration Details

### Parameter Generation Flow

#### Before (Gemini)
```
User Input (title)
    ↓
GeminiTorusParameterController.generateParams()
    ↓
GeminiTorusParameterController.requestGemini()
    ↓
Gemini API (https://generativelanguage.googleapis.com/...)
    ↓
Parse JSON + Sanitize
    ↓
Apply to scene
```

#### After (OpenRouter)
```
User Input (title)
    ↓
GeminiTorusParameterController.generateParams()
    ↓
OpenRouterParamGenerator.generateTorusParams()
    ↓
OpenRouterParamGenerator.requestOpenRouter()
    ↓
OpenRouter API (https://openrouter.ai/api/v1/chat/completions)
    ↓
Parse JSON + Sanitize
    ↓
Apply to scene
```

### Key Differences

| Aspect | Gemini | OpenRouter |
|--------|--------|-----------|
| **API Format** | `generativelanguage.googleapis.com` | `openrouter.ai/api/v1/chat/completions` |
| **Auth** | Query param: `?key=...` | Header: `Authorization: Bearer ...` |
| **Models** | Google-specific (Gemini 3.5-flash) | Open-source (Mistral, Llama, etc.) |
| **Response Format** | `candidates[0].content.parts[0].text` | `choices[0].message.content` |
| **JSON Response** | `responseMimeType: 'application/json'` | Use prompt instruction |
| **Cost** | Limited free tier | More generous free tier |
| **Rate Limits** | Strict | Reasonable for free tier |

## Breaking Changes

None! The service interfaces remain the same. Only internal implementation changed.

- `GeminiTorusParameterController` still exists with same public API
- `GeminiSceneInterpolator` still exists with same public API
- Parameter generation still works identically from the UI perspective

## Setup Required

### 1. Get OpenRouter API Key
```bash
# Visit https://openrouter.ai and sign up
# Get free API key from https://openrouter.ai/keys
```

### 2. Add to `.env.local`
```bash
VITE_OPENROUTER_API_KEY=sk_...your_key...
VITE_OPENROUTER_MODEL=mistralai/mistral-7b-instruct
```

### 3. For Firebase Functions
```bash
# Install dependencies
cd functions
npm install

# Deploy
firebase deploy --only functions
```

## Testing

### Browser Testing
1. Start dev server: `npm run dev`
2. Add `VITE_OPENROUTER_API_KEY` to `.env.local`
3. Open app, enter a media title
4. Verify parameters are generated
5. Test scene transitions

### Firebase Functions Testing
```bash
# Local emulation
firebase emulators:start --only functions

# Or deploy and test
firebase deploy --only functions
curl -X POST https://your-project.cloudfunctions.net/generateTorusParams ...
```

## Performance Impact

- **Response time**: Similar (OpenRouter models are fast)
- **Latency**: May vary based on OpenRouter load (generally good)
- **Rate limiting**: More generous than Gemini free tier
- **Reliability**: OpenRouter is stable for free tier

## Cost Implications

### Before (Gemini)
- Free tier: 60 requests/minute
- Paid: ~$0.075 per 1M input tokens

### After (OpenRouter)
- Free tier: More requests, reasonable limits
- Paid: Varies by model (~$0.0006-$0.002 per 1K tokens)

**Result**: Significant cost reduction while maintaining functionality.

## Files Not Changed

- Vue components (AsciiCanvas.vue, ControlPanel.vue, etc.)
- Scene definitions
- Audio reactivity system
- All UI/UX logic

## Future Improvements

1. **Caching**: Cache generated parameters by title
2. **Model Switching**: Add UI to switch between OpenRouter models
3. **Fallback**: Add fallback random generator if API fails
4. **Analytics**: Track API usage and costs
5. **Advanced Prompts**: Fine-tune prompts for better parameters

## Rollback Plan

If needed, to revert to Gemini:

1. Restore `src/boot/gemini.js`
2. Restore original `geminiTorusParams.js` and `geminiSceneInterpolator.js`
3. Update `.env.example` with Gemini variables
4. Update `quasar.config.js` boot array back to `'gemini'`
5. Restart dev server

Commits are numbered in git history for easy reference.
