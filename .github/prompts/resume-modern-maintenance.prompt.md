---
description: "Run a focused maintenance pass for modern resume frontend behavior and theme consistency"
mode: "agent"
model: "GPT-5"
---

Review and improve the modern resume frontend with minimal diffs.

Scope:
- `frontend/src/presentation/modern/**/*`
- `frontend/src/index.css`
- `frontend/src/main.tsx`

Tasks:
1. Verify stage navigation behavior (prev/next arrows, detail locks, back-to-stage actions).
2. Verify mobile scroll handoff in overlay lists and detail panels.
3. Verify theme consistency (token usage only, no magic colors).
4. Validate query-string theme switching.
5. Run file diagnostics and summarize concrete fixes.

Constraints:
- Preserve current visual language.
- Avoid broad refactors.
- Use Conventional Commit message suggestion at the end.
