# 06-resume-web Copilot Instructions

This repository has a modern 3D resume frontend and a backend API. Follow these project rules when making changes.

## Core Rules
- Preserve existing architecture and naming unless explicitly asked to refactor.
- Avoid magic colors and one-off style literals in overlays; use existing theme tokens in `src/index.css`.
- Keep theme as a first-class system: update both CSS tokens and `theme.config.ts` scene palette when adding or changing themes.
- Do not replace existing portfolio items when adding new items. Append unless instructed otherwise.
- Prefer minimal and focused edits; avoid broad reformatting.

## Frontend Modern Experience
- Main entry: `frontend/src/presentation/modern/ResumeModernPage.tsx`.
- Stage model and camera mapping live in:
  - `frontend/src/presentation/modern/state/narrativeStore.ts`
  - `frontend/src/presentation/modern/state/stageConfig.ts`
- Overlay rendering and detail state handling live in:
  - `frontend/src/presentation/modern/overlays/StageOverlay.tsx`

## Scrolling and Mobile Interaction
- Global narrative scroll is custom wheel/touch logic in `ResumeModernPage.tsx`.
- Any overlay/card with internal scrolling must use `data-native-scroll="true"` and `overscroll-contain` so internal scroll and stage handoff behave correctly.
- Do not call `preventDefault()` on non-cancelable touch events. Use `if (event.cancelable) event.preventDefault()`.
- While project architecture detail is open, stage progression should remain locked unless explicitly changed.

## Theme System
- Theme source of truth: `frontend/src/presentation/modern/theme/theme.config.ts`.
- CSS variables and component token classes: `frontend/src/index.css`.
- App bootstrap theme apply: `frontend/src/main.tsx`.
- Query-string theme switching is supported by `getThemeFromQuery` (`?theme=...`).

## Data and Content
- Mock resume data source: `frontend/src/presentation/modern/data/mockResume.ts`.
- Blog cards use `articles` in mock data.
- Keep content public-safe; do not add confidential implementation details.

## Known Upstream Warning
- `THREE.Clock` deprecation warning comes from `@react-three/fiber` internals on current stack.
- If warning handling is touched, keep suppression narrow and well-documented.

## Validation
- After edits, run targeted checks first, then build:
  - `npm run build` in `frontend/`
- Keep commits in Conventional Commits format (e.g. `feat(theme): ...`).
