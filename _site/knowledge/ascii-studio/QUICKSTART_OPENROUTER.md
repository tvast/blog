# Quick Start: Using OpenRouter with ASCII Studio

## 30-Second Setup

1. **Get API Key**: Visit https://openrouter.ai → Sign up → Copy API key from https://openrouter.ai/keys

2. **Configure**: Create `.env.local` in project root:
   ```
   VITE_OPENROUTER_API_KEY=your_key_here
   VITE_OPENROUTER_MODEL=mistralai/mistral-7b-instruct
   ```

3. **Run**: 
   ```bash
   npm run dev
   ```

4. **Test**: Open app → Enter media title → Parameters auto-generate

## What You Get

✅ **Free** - OpenRouter free tier (no costs)
✅ **Fast** - Mistral model generates parameters instantly  
✅ **Reliable** - No more rate-limiting issues
✅ **Simple** - Same UI, completely different backend

## Browser Usage

### Generate Torus Parameters
```javascript
// The app does this automatically when you enter a title
import { getOpenRouterParamGenerator } from 'src/services/openRouterParamGenerator'

const generator = getOpenRouterParamGenerator()
const params = await generator.generateTorusParams(
  'My song title',
  defaults,
  controls
)
```

### Scene Transitions
Just use scene transitions normally - they'll use OpenRouter in the background.

## Server Usage (Firebase)

### Deploy Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### Call from Anywhere
```bash
curl -X POST https://your-project.cloudfunctions.net/generateTorusParams \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Song Title",
    "defaults": {...},
    "controls": [...],
    "apiKey": "your_openrouter_key",
    "model": "mistralai/mistral-7b-instruct"
  }'
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "API key missing" | Add `VITE_OPENROUTER_API_KEY` to `.env.local` and restart server |
| "Invalid JSON" | The model returned bad JSON - try again or switch models |
| "Rate limited" | Free tier has limits - wait a moment, or use paid account |
| "Auth failed" | Check API key is correct at openrouter.ai/keys |

## Model Options

Free models available on OpenRouter:

| Model | Speed | Quality | Notes |
|-------|-------|---------|-------|
| `mistralai/mistral-7b-instruct` | ⚡ Fast | ⭐⭐⭐⭐ | Recommended for ASCII Studio |
| `meta-llama/llama-2-7b-chat` | ⚡ Fast | ⭐⭐⭐ | Good alternative |
| `NousResearch/Nous-Hermes-2-Mistral-7B-DPO` | ⚡ Fast | ⭐⭐⭐⭐ | Newer, experimental |

See [all models](https://openrouter.ai/models) on OpenRouter.

## Cost Estimate

- **Free tier**: Limited requests (check OpenRouter for current limits)
- **Paid tier**: ~$0.0006-$0.002 per 1K tokens (very cheap)

Typical ASCII Studio usage: **$0.01-0.05 per month** on paid tier.

## Documentation

- **Full Setup Guide**: See [OPENROUTER_SETUP.md](./OPENROUTER_SETUP.md)
- **Migration Details**: See [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)
- **API Reference**: https://openrouter.ai/docs/api-reference

## Next Steps

1. ✅ Add API key to `.env.local`
2. ✅ Run `npm run dev`
3. ✅ Test by entering a media title
4. ✅ (Optional) Deploy Firebase functions: `firebase deploy --only functions`

That's it! You're using OpenRouter now. 🚀
