## MODIFIED Requirements

### Requirement: Portrait-bounded swipe card stack
During a round, the centered 9:16 portrait app frame SHALL use 100% of the
browser viewport height and derive its width from that fixed aspect ratio. The
active game layout, including
the header, card stack, action controls, footer, repository link, and version,
SHALL fit within that visible frame without page scrolling or content extending
beyond the frame's top or bottom edge. A current card moved left or right SHALL
not be visible outside that frame's horizontal boundaries.

#### Scenario: A player views an active round at desktop browser scale
- **WHEN** the browser displays the round at 100% scale
- **THEN** the frame occupies 100% of viewport height, keeps a 9:16
  aspect ratio, and shows the active header, card actions, footer, link, and
  version without vertical clipping or scrolling

#### Scenario: A player drags toward a side boundary
- **WHEN** the current card is dragged toward the left or right edge
- **THEN** no portion of that card is visible outside the portrait app frame
