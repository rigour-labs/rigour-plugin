# Rigour for Claude Code

**Code review that happens while your agent writes the code, and stays quiet unless it can prove the bug.**

Your agent says "done". Before it stops, Rigour reviews the lines it changed. If it finds a real defect, such as an import that does not exist, an API that is not there, a leaked secret or a bug pattern, it sends the agent back to fix it. You never see the mistake in a pull request.

## Install

In Claude Code:

```
/plugin marketplace add rigour-labs/rigour-plugin
/plugin install rigour@rigour-labs
```

Node.js 22 or later must be installed. There is no account, no API key and no config file to write.

## What you get

| Part | What it does |
| --- | --- |
| **Stop hook** | When Claude tries to finish, Rigour reviews the uncommitted change. Serious findings on changed lines send Claude back with the file, line and fix, at most three times per change. Otherwise Claude finishes as usual. |
| **`/rigour:review` skill** | Claude reviews its own change on request: it fixes the findings, then works through the risky functions Rigour picks out and records what it checked in each. |
| **MCP tools** | `rigour_review`, `rigour_review_ack`, `rigour_check` and the rest of Rigour's core tools, for any workflow you build. |

## Why Rigour

1. **It catches mistakes before there is a pull request.** Review runs inside the agent's loop, while the context is still fresh, so a fix costs one more turn instead of a review cycle.
2. **It speaks only when it can prove it.** By default it reports only checks that can show their evidence: missing imports, unknown APIs, security patterns, bug patterns and untested changed functions. Style opinions stay out. On 30 real merged pull requests from open-source projects (trpc, nuxt/ui), it raised no false findings.
3. **Same change, same answer.** The checks are deterministic. Running the review twice cannot give two verdicts, so a block is something you can reason about and reproduce in CI.
4. **"Not a bug" is permanent, and it is yours.** `npx @rigour-labs/cli dismiss <key>` writes the decision to `.rigour/dismissed.json` in your repository. Commit it and the whole team stops seeing that finding. Your feedback trains nothing outside your repository.
5. **One review for every agent.** The CLI, the MCP server and the GitHub Action share one engine, so Claude Code, Cursor, Codex, a person at a terminal and your CI all get the same verdict.
6. **Free, and it runs on your machine.** The checks run locally and your code is never uploaded. For a deeper review you can bring your own model key and pay the provider directly, with no markup.

## Use it beyond Claude Code

- **Pull requests:** the [Rigour GitHub Action](https://github.com/rigour-labs/rigour) posts at most two inline comments per push and keeps one summary comment up to date.
- **Other agents:** see [Codex](docs/providers/codex.md) and [Gemini](docs/providers/gemini.md).
- **Your terminal:** `npx @rigour-labs/cli review`.

## Privacy

Rigour runs locally. Anonymous usage counts are sent only if you opt in, and never include code, paths or repository names. See [TELEMETRY.md](https://github.com/rigour-labs/rigour/blob/main/TELEMETRY.md). `DO_NOT_TRACK=1` turns them off.

## License

MIT © [Rigour Labs](https://github.com/rigour-labs)
