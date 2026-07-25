# OpenRouter AI Integration

This project uses **OpenRouter** to replace Google Gemini API calls with free, open-source language models. OpenRouter provides a unified API for accessing multiple LLMs at no cost during the free tier.

## What Changed

- **Replaced**: Google Gemini API (`geminiTorusParams.js`, `geminiSceneInterpolator.js`)
- **With**: OpenRouter API using free open-source models (Mistral, Llama, etc.)
- **Benefits**: No API costs, no rate limiting concerns, instant responses

## Setup Instructions

### 1. Get an OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Go to [API Keys](https://openrouter.ai/keys) section
4. Copy your API key

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_MODEL=mistralai/mistral-7b-instruct
```

**Available free models:**
- `mistralai/mistral-7b-instruct` (recommended - fast & good quality)
- `meta-llama/llama-2-7b-chat`
- `NousResearch/Nous-Hermes-2-Mistral-7B-DPO`
- See [OpenRouter Models](https://openrouter.ai/models) for full list

### 3. Browser-Based Usage

The app automatically uses OpenRouter when configured:

1. Start your dev server: `npm run dev`
2. Open the app in your browser
3. Enter a media title to generate torus parameters
4. Scene transitions will use interpolation parameters

### 4. Server-Side Usage (Firebase Cloud Functions)

The Firebase Cloud Functions provide HTTP endpoints for parameter generation:

```bash
# Deploy functions
npm run deploy

# Generate torus parameters
curl -X POST https://your-project.cloudfunctions.net/generateTorusParams \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your media title",
    "defaults": {...},
    "controls": [...],
    "apiKey": "your_openrouter_key",
    "model": "mistralai/mistral-7b-instruct"
  }'

# Generate interpolation parameters
curl -X POST https://your-project.cloudfunctions.net/generateInterpolationParams \
  -H "Content-Type: application/json" \
  -d '{
    "sceneLabel": "Scene Name",
    "currentParams": {...},
    "defaults": {...},
    "controls": [...],
    "audioAnalysis": {...},
    "apiKey": "your_openrouter_key",
    "model": "mistralai/mistral-7b-instruct"
  }'
```

## Services

### Client-Side Service: `openRouterParamGenerator.js`

Handles parameter generation in the browser:

```javascript
import { getOpenRouterParamGenerator } from 'src/services/openRouterParamGenerator'

const generator = getOpenRouterParamGenerator()

// Generate torus parameters
const params = await generator.generateTorusParams(
  title,
  defaults,
  controls
)

// Generate interpolation parameters
const params = await generator.generateInterpolationParams(
  sceneLabel,
  currentParams,
  defaults,
  controls,
  audioAnalysis
)
```

### Server-Side Functions: `functions/index.js`

Provides HTTP endpoints:

- `POST /generateTorusParams` - Generate torus scene parameters
- `POST /generateInterpolationParams` - Generate interpolation parameters

Both functions return:

```json
{
  "success": true,
  "params": {
    "speed": 0.5,
    "thickness": 0.3,
    ...
  },
  "rawResponse": "..."
}
```

## How It Works

1. **Title Analysis**: Reads media title keywords (fast, dark, complex, etc.)
2. **Parameter Generation**: LLM generates JSON with scene parameters
3. **Validation**: Clamps values to valid ranges defined in scene controls
4. **Interpolation**: Smooth transitions between scenes using generated parameters

## Migration from Gemini

The following files were updated:

| File | Changes |
|------|---------|
| `src/boot/openrouter.js` | New boot config for OpenRouter |
| `src/services/openRouterParamGenerator.js` | New service handling API calls |
| `src/services/geminiTorusParams.js` | Refactored to use OpenRouter |
| `src/services/geminiSceneInterpolator.js` | Refactored to use OpenRouter |
| `functions/index.js` | New Firebase Cloud Functions |
| `firebase.json` | Updated with functions config |
| `.env.example` | Updated with OpenRouter variables |

## Troubleshooting

### "OpenRouter API key missing"
- Add `VITE_OPENROUTER_API_KEY` to `.env.local`
- Restart the dev server

### "Rate limited"
- Free tier has rate limits; wait a moment and try again
- Consider upgrading to a paid OpenRouter account for higher limits

### "Invalid JSON response"
- The LLM may have returned malformed JSON
- Try a different model or adjust the prompt
- Check OpenRouter status page

### "Authentication failed"
- Verify your API key is correct
- Check it's not expired at https://openrouter.ai/keys

## Model Selection Tips

- **Fast responses**: `mistralai/mistral-7b-instruct`
- **Better quality**: `meta-llama/llama-2-7b-chat`
- **Experimental**: `NousResearch/Nous-Hermes-2-Mistral-7B-DPO`

Test different models to find what works best for your use case.

## Costs

- **Free tier**: Limited requests (check OpenRouter for current limits)
- **Paid tier**: Pay-per-token, very affordable

## References

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Available Models](https://openrouter.ai/models)
- [API Reference](https://openrouter.ai/docs/api-reference)
