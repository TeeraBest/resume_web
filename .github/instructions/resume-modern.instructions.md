---
applyTo: "frontend/src/presentation/modern/**/*.{ts,tsx},frontend/src/index.css"
description: "Use when editing modern resume scene, overlays, stage scroll behavior, and theme tokens"
---

## Resume Modern Editing Guardrails
- Keep interaction semantics stable across desktop and mobile.
- Preserve stage flow and detail-overlay behavior unless the task explicitly changes it.

## Required Patterns
- Internal overlay scrollers must be marked with `data-native-scroll="true"`.
- Use `overscroll-contain` for those scrollers.
- Guard touch cancellation with `event.cancelable`.
- Do not add inline magic colors when equivalent token classes exist.

## Theme Changes
When changing a theme:
1. Update token block in `frontend/src/index.css`.
2. Update scene palette in `frontend/src/presentation/modern/theme/theme.config.ts`.
3. Ensure all new theme names are in `THEMES` and query normalization.

## Content Changes
- For portfolio/project updates in mock data, append new projects instead of replacing existing ones.
- Keep architecture descriptions high-level and public-safe.

## Done Criteria
- No TypeScript errors in modified files.
- `npm run build` passes in `frontend/` when changes are substantial.
