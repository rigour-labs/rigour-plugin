---
name: review
description: Review your own change with Rigour before saying a coding task is done. Use after editing code and before you report the work as finished, or when the user asks to review, check or verify a change.
---

# Review the change before you finish

Rigour checks the lines you changed and returns only findings it can prove: an import that does not exist, an API that is not there, a security pattern, a bug pattern, a changed function with no test. It does not comment on style. The same change always gets the same answer.

## Steps

1. Call the `rigour_review` tool with `cwd` set to the repository root and `mode: "agent"`.
   - It reads your uncommitted work from git, new files included.
   - To review a whole branch, also pass `base`, for example `"main"`.
2. Fix every finding it returns. Each one has a file, a line and a suggested fix.
3. Work through `review_task`. It lists the risky functions you changed and what to check in each one.
   - Read the function and the code it calls or is called by. Do not judge it from the diff alone.
   - If you find a defect, fix it, then call `rigour_review_ack` with `verdict: "fixed"`.
   - If it is correct, call `rigour_review_ack` with `verdict: "no_issue"`.
   - The `note` says what you actually checked, for example "callers always pass a non-empty id; the upsert key matches the unique index". "Looks fine" is not a note.
4. Call `rigour_review` again until it has no findings and `review_task` is empty.

## When a finding is wrong

Do not edit around it, and do not remove the code it points at only to make it pass. Tell the user which finding it is and why it is wrong. They can dismiss it once with `npx @rigour-labs/cli dismiss <key>`, which records the decision in the repository, so the whole team stops seeing it.

## The Stop hook

This plugin also runs the same review when you try to finish. If it blocks you, it lists the findings: fix them, or explain why one is wrong. It blocks at most three times for the same change, then lets you stop.
