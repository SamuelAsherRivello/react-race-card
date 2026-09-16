## Why

The current five-question Spain round displays mock country-theme artwork even
though the repository now contains usable local portrait cards. Players need to
make the same five left-or-right judgments against the actual local Spain and
non-Spain images before the round can be considered playable as the intended
game experience.

## What Changes

- Replace mock image references in the existing five-question Spain round with
  locally served WebP portraits from `public/images/real/spain/` and
  `public/images/real/japan/`.
- Keep every round at exactly five distinct cards, randomly mixing two or
  three Spain cards with the complementary number of Japan cards. A right
  swipe or checkmark means the documented metadata matches Spain; left/X means
  it does not.
- Define a checked-in card catalog that maps each accepted filename to its
  supplied country metadata and public URL. The round MUST use metadata, never
  infer nationality, ancestry, or correctness from an image's appearance.
- Exclude the currently misfiled or inconsistently named files under
  `public/images/real/usa/` and `public/images/real/germany/` from gameplay.
  They are not part of this round's approved source inventory.
- Update focused tests, the existing round copy/alt treatment as needed, and
  browser verification so a player can start, play, score, and replay the
  real-image five-card round in the 9:16 frame.

## Capabilities

### New Capabilities

- `real-spain-image-round`: A five-question Spain round that serves only the
  approved local Spain and Japan portrait inventory and scores from documented
  card metadata.

### Modified Capabilities

- None. The existing `swipe-card-stacking` specification already requires the
  five-card fair mix, stack behavior, and directional controls; this change
  supplies the real-image catalog without changing those interaction rules.

## Impact

- Affects `race-card/src/spain-round.js`, `race-card/src/App.jsx`, focused
  tests, and the approved asset paths below `race-card/public/images/real/`.
- Does not add packages, network requests, persistence, backend services, UI
  surface area, or image-generation work.
- Must reconcile the current mock-asset statement in the unarchived
  `add-spain-swipe-round-mvp` change before its delta is ever synced; this
  proposal plans the implemented behavior without treating the in-flight
  change as a main specification.
