# 🛡️ Rigour Plugin (Claude, Codex, Gemini)

**Meta-cognitive governance for AI coding agents via MCP.**

This repo provides Rigour plugin metadata and setup guides for multiple providers using the same core MCP package (`@rigour-labs/mcp`).

## Installation

### Claude
1. Open Claude → **Browse plugins** → **Add marketplace from GitHub**
2. Enter: `https://github.com/rigour-labs/rigour-plugin.git`
3. Click **Sync**

### Codex
Follow [Codex integration guide](docs/providers/codex.md) or use [latest config](examples/codex/config.toml) / [pinned config](examples/codex/config.pinned.toml).

### Gemini
Follow [Gemini integration guide](docs/providers/gemini.md) or use [latest config](examples/gemini/settings.json) / [pinned config](examples/gemini/settings.pinned.json).

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

## Provider Support Matrix

| Provider | Model | This Repo Support |
|:---|:---|:---|
| Claude | Marketplace metadata + MCP | ✅ `.claude-plugin/*` |
| Codex | MCP server config | ✅ `docs/providers/codex.md` |
| Gemini | MCP server config | ✅ `docs/providers/gemini.md` |

## Documentation

Full documentation: [docs.rigour.run](https://docs.rigour.run)

## License

MIT © [Rigour Labs](https://github.com/rigour-labs)
