# Codex Integration (MCP)

Rigour integrates with Codex via MCP server configuration.
Default mode uses `npx` with latest package.

## Version strategy

- Latest (recommended default): `@rigour-labs/mcp`
- Pinned (recommended for production rollouts): `@rigour-labs/mcp@<version>`

## Option A: Add via CLI

Latest:
```bash
codex mcp add rigour --command npx --args -y,@rigour-labs/mcp
codex mcp list
```

Pinned:
```bash
codex mcp add rigour --command npx --args -y,@rigour-labs/mcp@2.14.0
codex mcp list
```

## Option B: Add via config file

Create or update `~/.codex/config.toml`:

Latest:
```toml
[mcp_servers.rigour]
command = "npx"
args = ["-y", "@rigour-labs/mcp"]
```

Pinned:
```toml
[mcp_servers.rigour]
command = "npx"
args = ["-y", "@rigour-labs/mcp@2.14.0"]
```

## Verify

1. Run `codex mcp list` and ensure `rigour` appears.
2. Start Codex and invoke Rigour tools (for example `rigour_check`).
