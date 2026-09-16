## Why

At 100% desktop browser scale, the centered 9:16 frame fills the viewport
height but the playing-state footer extends below its clipped boundary. The
app must present the entire round inside the browser viewport while retaining
the target portrait aspect ratio.

## What Changes

- Make the centered portrait frame consume 100% of the browser viewport height
  and derive its width from the fixed 9:16 ratio, centered horizontally at any
  browser size.
- Bound each in-frame game state to that frame's height so the header,
  card/stack area, action controls, footer, corner link, and version remain
  visible without page or frame-internal vertical overflow.
- Allocate the flexible middle card area from the remaining height rather than
  allowing it to force the footer below the frame.
- Preserve the existing 20px frame-relative UI margin, centered placement,
  card stacking, swipe interaction, and mobile 9:16 presentation.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `swipe-card-stacking`: The portrait round layout now guarantees that all
  active header, card, action, and footer content fits inside the visible
  viewport-height 9:16 frame.

## Impact

- Affects the portrait-frame and game-shell CSS plus focused layout tests and
  browser checks.
- Does not change round data, scoring, asset selection, swipe decisions,
  navigation content, dependencies, or network behavior.
