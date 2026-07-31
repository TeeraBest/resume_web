---
name: resume-modern-workflow
user-invocable: true
description: "Use when updating 3D resume UX: stage scroll, detail overlays, theme tokens, query-driven theme selection, or mock resume content"
---

# Resume Modern Workflow

## When to use
- Adjusting stage navigation, wheel/touch behavior, or overlay interactions.
- Adding/changing themes and scene palettes.
- Updating mock projects/blog/profile content.
- Fixing mobile viewport overlap or scroll handoff issues.

## Steps
1. Identify target files in `frontend/src/presentation/modern` and `frontend/src/index.css`.
2. Preserve existing interaction contracts:
   - Detail overlays vs stage progression.
   - Internal scroller handoff (`data-native-scroll`).
3. Apply minimal patches.
4. Validate with diagnostics.
5. Build frontend when impact is broad.

## Checklist
- Theme updates reflected in both token CSS and scene palette map.
- Query param theme behavior still works.
- No non-cancelable touch preventDefault warnings.
- No accidental replacement of existing portfolio entries.

## Output format
- List files changed.
- State user-visible behavior differences.
- Mention validation commands and result.
