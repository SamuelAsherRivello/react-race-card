## Why

Race Card needs a smallest playable country-theme card experience: one image
at a time, a clear left/right judgment, and an understandable result. The
existing project is only a portrait UI template, while its dating-layout
research supports a focused single-card decision flow.

## What Changes

- Add a Spain-themed MVP round with 20 non-person mock cards. Each supplies
  exactly four uppercase `countries` tags.
- Define 10 matching cards with four `SPAIN` tags and 10 non-matching cards
  with zero `SPAIN` tags. Correctness derives from supplied tag data; the app
  does not analyze image pixels.
- Show a centered `Round 1` dialog with `Swipe right for Spain.` and `Start`,
  then deal five distinct cards: either two or three selected from each tag
  group, with the complementary count from the other group for fairness across
  repeated rounds.
- Present a stacked current/next image card in a portrait progress-rail/card/
  footer layout. Support intentional left/right swipes and an overlaid X or
  checkmark action bar; either action uses the matching swipe result and exit
  animation.
- Include a four-item temporary bottom navigation with an icon above each
  label.
- After five answers, show `Round Complete`, `You got <percentage>% correct.`,
  and `Play Again`.
- Define `race-card/public/images/mock/` for temporary non-person assets. A
  separate real-image library may exist under `race-card/public/images/real/`,
  but this MVP neither loads nor scores it.

## Capabilities

### New Capabilities

- `country-swipe-round`: An accessible country-theme card round that deals
  tagged mock images, records directional answers, and reports a score.

### Modified Capabilities

- None.

## Impact

- Affects the React UI, CSS, focused tests, and static asset directories under
  `race-card/public/images/`.
- Assets resolve through the configured Vite base, including
  `/react-race-card/images/mock/<filename>` and the reserved real-image path.
- Uses existing React and Vite dependencies only; no backend, persistence,
  external API, or new package is proposed.
- Requires focused tests, a production build, and browser verification.
