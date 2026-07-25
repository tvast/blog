# 🔑 Send Recovered Key to Revolut

This script lets you securely send a recovered private key to your Revolut account. **Everything happens locally on your machine — your API key is never stored or logged.**

## Quick Start

```bash
# 1. Use recovery-ui to find your key
npm run dev
# → "Find on my old Apple device" or scan a folder
# → Save the recovered key to a file, e.g., ./recovered-keys/my-seed.txt

# 2. Send it to Revolut
node send-to-revolut.js ./recovered-keys/my-seed.txt
# → Paste your Revolut API key when prompted (will not echo)
# → Review the key, confirm, and send
```

## How It Works

1. **Reads your recovered key** from a file
2. **Prompts for your Revolut API key** — held only in memory, never logged
3. **Shows you the key preview** before sending (first 6 + last 6 chars)
4. **Asks for explicit confirmation** (you type "YES")
5. **Sends it to Revolut** via their official Crypto API
6. **Clears your API key from memory** after the request completes

## Getting a Revolut API Key

1. Log in to [Revolut Developer Portal](https://developer.revolut.com/)
2. **Create a new Crypto API application**
3. Go to **API Keys** and create a token with these scopes:
   - `trading:accounts:read` (to fetch your crypto account)
   - `trading:accounts:keys:write` (to import keys)
4. Copy the API key — **you'll need it in the next step**

## Security Checklist

Before running the script, verify:

- ☐ **You are on a private/trusted computer** (not public WiFi)
- ☐ **You have read this script** (`send-to-revolut.js`) and understand what it does
- ☐ **This is YOUR OWN key** that you are recovering (not someone else's)
- ☐ **The key file looks correct** (not truncated, not corrupted)
- ☐ **You have a backup** of this key elsewhere (printed, in a safe, etc.)
- ☐ **Your Revolut account exists** and has a crypto trading account enabled

## What the Script Does (No Magic)

```javascript
1. fs.readFileSync(keyPath)           // Read your key file
2. prompt("API key?")                 // Ask for Revolut API key (you paste it)
3. https.request(GET /user)           // Verify the API key is valid
4. https.request(GET /accounts)       // Find your crypto account
5. console.log("Key preview")         // Show you first+last 6 chars
6. prompt("Confirm YES?")             // You explicitly say "YES"
7. https.request(POST /keys)          // Send the key to Revolut
8. apiKey = null                      // Clear API key from memory
```

**That's it.** No databases, no cloud, no telemetry. Only HTTPS to Revolut's official API.

## Troubleshooting

### "API key is required" or status 401
- Check you copied the **full API key** (no spaces before/after)
- Verify it's a **Crypto API key** (not Payments API)
- Verify the scopes include `trading:accounts:keys:write`

### "No crypto account found"
- Open the [Revolut app](https://www.revolut.com/)
- Go to **Crypto**
- If you don't see a crypto account, tap **Add account** → **Crypto**
- Wait for it to be created, then retry the script

### "File is empty"
- Make sure the recovered key file is not blank
- If the recovery scan found it, it should have content
- Example valid key: `xprvA1Y2zB3c4dE5f6gH7iJ8kL9mN0oPqRsT1uV2wX3yZ4aB5cD6eF7gH8iJ9`

### "Revolut API rejected"
- Check the error message — Revolut might require additional verification
- Log in to your Revolut app to ensure the account is active
- Try creating a new API token with fresh permissions

## After Success

1. **Log in to the Revolut app**
2. Go to **Crypto** → **Settings** → **Manage Keys**
3. Your recovered key should appear in the list
4. You can now **use it to manage crypto holdings**, approve transactions, etc.

## ⚠️ Important Notes

- **This script is read-only except for the final HTTPS POST to Revolut**. If something goes wrong, nothing is damaged.
- **Your API key is only in RAM** while the script runs. When it exits, it's gone.
- **This is your responsibility.** Read the code. Understand what it does. Only run it if you are certain.
- **Only use with YOUR OWN keys.** Do not use this script to send someone else's keys — it's theft.

## Alternatives

If you prefer not to run Node scripts:

1. **Manual import in Revolut app**  
   Revolut's mobile app has a built-in key import feature. You can paste your recovered key there directly (no API needed).

2. **Use Revolut's web dashboard**  
   Log in to [business.revolut.com](https://business.revolut.com) (if you have a Business account), go to **Crypto**, and import the key via the UI.

## Questions?

- **Revolut API docs**: https://developer.revolut.com/docs/api/revolut-x-crypto-exchange
- **This script**: Open `send-to-revolut.js` — it's heavily commented
- **Security concerns**: Read the code, ask questions, don't run things you don't understand

---

**Good luck recovering your key! 🚀**
