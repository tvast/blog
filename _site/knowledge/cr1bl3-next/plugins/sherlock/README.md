# @cr1bl3/plugin-sherlock

OSINT plugin for finding usernames on 300+ social media and web platforms using Sherlock.

## Features

✅ **Username search** across 300+ platforms  
✅ **High confidence** results (0.95+)  
✅ **Fast scanning** with configurable timeout  
✅ **Structured output** as GraphNodes + Evidence  
✅ **No approval required** (low risk)  
✅ **Zero dependencies** (uses system Sherlock binary)  

## Installation

```bash
# Sherlock must be installed
pip install sherlock-project

# Or use system package
brew install sherlock
```

## Usage

### In cr1bl3-next UI

```ts
import { sherlockPlugin } from '@cr1bl3/plugin-sherlock'
import { useWebSocket } from '@/composables/useWebSocket'

const { broadcast } = useWebSocket({ url: 'ws://localhost:3000' })

// Search for a username
broadcast('plugin:sherlock', {
  action: 'scan',
  input: { value: 'john_doe' }
})
```

### Direct Node.js

```ts
import { sherlockPlugin } from '@cr1bl3/plugin-sherlock'

const result = await sherlockPlugin.scan(
  { value: 'john_doe' },
  {}
)

console.log(result.data.nodes)      // GraphNodes
console.log(result.data.evidence)   // Evidence items
console.log(result.data.summary)    // Scan summary
```

## Plugin Metadata

- **ID**: `sherlock-osint`
- **Version**: 0.2.0
- **Risk Level**: Low
- **Requires Approval**: No
- **Timeout**: 10s (configurable)
- **Max Results**: 300

## Output

### GraphNodes

Each found account creates:
- `identity:<username>` — The searched username
- `account:<platform>:<username>` — Account on platform

### Evidence

Creates evidence for:
- Each account discovered
- Scan summary with statistics

## Configuration

```ts
sherlockPlugin.config = {
  timeout: 10,        // Seconds per platform
  maxResults: 300,    // Max accounts to return
  outputFormat: 'json'
}
```

## Example Output

```json
{
  "nodes": [
    {
      "id": "identity:sherlock:john_doe",
      "type": "identity",
      "label": "john_doe",
      "sourcePlugin": "sherlock-osint",
      "confidence": 0.95,
      "metadata": {
        "source": "sherlock",
        "scanType": "osint-username-search"
      }
    },
    {
      "id": "account:twitter:john_doe",
      "type": "account",
      "label": "john_doe on Twitter",
      "sourcePlugin": "sherlock-osint",
      "confidence": 0.95,
      "metadata": {
        "platform": "Twitter",
        "username": "john_doe",
        "url": "https://twitter.com/john_doe"
      }
    }
  ],
  "evidence": [
    {
      "id": "evidence:sherlock:twitter:john_doe",
      "type": "osint-account-found",
      "source": "sherlock-osint",
      "confidence": 0.95,
      "value": {
        "platform": "Twitter",
        "username": "john_doe",
        "profileUrl": "https://twitter.com/john_doe"
      }
    }
  ],
  "summary": {
    "foundAccounts": 5,
    "totalSites": 300,
    "confidence": 0.95
  }
}
```

## Performance

- **Typical scan**: 30-60 seconds (300 platforms)
- **Fast scan**: 10-20 seconds (timeout: 5s)
- **Thorough scan**: 2-3 minutes (timeout: 30s)

## Notes

- Sherlock must be installed and in PATH
- Respects platform rate limits
- Uses user-agent: "Public-contact-audit/1.0"
- No actual login/authentication required

## See Also

- Original Sherlock: https://github.com/sherlock-project/sherlock
- .connect documentation: ../../docs/PLUGIN_GUIDE.md
- Integration strategy: ../../INTEGRATION_STRATEGY.md
