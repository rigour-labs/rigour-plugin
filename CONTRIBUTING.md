# Contributing to Rigour Plugin

Thank you for your interest in contributing to Rigour!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Make your changes
4. Submit a pull request

## Plugin Structure

```
.claude-plugin/
├── marketplace.json  # Marketplace metadata
├── plugin.json       # Plugin manifest
└── SKILL.md          # Skill documentation
docs/providers/       # Provider-specific setup guides
examples/             # Copy-paste provider config examples
```

## Guidelines

- Follow the existing code style
- Update SKILL.md when adding new capabilities
- Test with Claude's plugin browser before submitting
- Use Conventional Commits (e.g. `feat:`, `fix:`, `chore:`) because releases are automated via semantic-release.

## Release Process

- Releases are created automatically from commits merged to `main`.
- Semantic Release updates versions in:
  - `package.json`
  - `.claude-plugin/plugin.json`
  - `.claude-plugin/marketplace.json`
- Then it creates a Git tag and GitHub Release notes.

## Questions?

Open an issue or reach out at support@rigour.dev
