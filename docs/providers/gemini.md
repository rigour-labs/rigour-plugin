# Gemini Integration (MCP)

Rigour integrates with Gemini CLI using MCP server entries in Gemini settings.
Default mode uses `npx` with latest package.

## Version strategy

- Latest (recommended default): `@rigour-labs/mcp`
- Pinned (recommended for production rollouts): `@rigour-labs/mcp@<version>`

## Configure `.gemini/settings.json`

Project-local (`.gemini/settings.json`) or user-global (`~/.gemini/settings.json`):

Latest:
```json
{
  "mcpServers": {
    "rigour": {
      "command": "npx",
      "args": ["-y", "@rigour-labs/mcp"]
    }
  }
}
```

Pinned:
```json
{
  "mcpServers": {
    "rigour": {
      "command": "npx",
      "args": ["-y", "@rigour-labs/mcp@2.14.0"]
    }
  }
}
```

## Verify

1. Run `gemini mcp list` and confirm `rigour` is connected.
2. In Gemini CLI, run `/mcp` and confirm Rigour tools are available.

## Enterprise hardening (recommended)

Use Gemini allowlists to restrict enabled MCP servers:

```json
{
  "mcp": {
    "allowed": ["rigour"]
  },
  "mcpServers": {
    "rigour": {
      "command": "npx",
      "args": ["-y", "@rigour-labs/mcp"]
    }
  }
}
```
