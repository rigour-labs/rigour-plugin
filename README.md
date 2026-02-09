# 🛡️ Rigour Plugin for Claude

**Meta-cognitive governance for Claude's Cowork mode.**

This plugin integrates [Rigour](https://github.com/rigour-labs/rigour) governance into Claude, enabling quality gate checks, drift detection, and multi-agent coordination.

## Installation

### Via Claude's Plugin Browser
1. Open Claude → **Browse plugins** → **Add marketplace from GitHub**
2. Enter: `https://github.com/rigour-labs/rigour-plugin.git`
3. Click **Sync**

### Manual
```bash
npm install -g @rigour-labs/mcp
```

## Features

| Skill | Description |
|:---|:---|
| `rigour_check` | Run quality gates (lint, test, AST) |
| `rigour_checkpoint` | Record progress for drift detection |
| `rigour_agent_register` | Register agent scope in multi-agent workflows |
| `rigour_remember` | Persist project-specific instructions |

## Documentation

Full documentation: [docs.rigour.run](https://docs.rigour.run)

## License

MIT © [Rigour Labs](https://github.com/rigour-labs)
