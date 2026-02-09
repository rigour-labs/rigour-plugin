---
name: Rigour Governance
description: Meta-cognitive governance for Claude agents
---

# Rigour Governance Skills

Rigour provides meta-cognitive governance tools to ensure AI agents stay aligned with engineering standards during long-running coworking tasks.

## Core Skills

### `rigour_check`
Run all configured quality gates (Lint, Test, AST, etc.) on the project.

### `rigour_checkpoint`
Record a quality checkpoint during long-running execution. Use every 15-30 min for drift detection.

**Parameters:**
- `cwd` (required): Project root path
- `progressPct` (required): Progress percentage (0-100)
- `summary` (required): Work description since last checkpoint
- `qualityScore` (required): Self-assessed quality score (0-100)

### `rigour_agent_register`
Register an agent in a multi-agent session to claim task scope and enable conflict detection.

**Parameters:**
- `cwd` (required): Project root path
- `agentId` (required): Unique agent identifier
- `taskScope` (required): Glob patterns for files/directories this agent will work on

### `rigour_get_fix_packet`
Retrieve prioritized fix instructions when gates fail.

### `rigour_remember` / `rigour_recall`
Persist and retrieve critical project-specific instructions across sessions.
