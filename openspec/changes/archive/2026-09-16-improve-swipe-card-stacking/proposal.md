## Why

The swipe card can move visibly outside the portrait app area, and no upcoming
card is visible while it moves. Clipping the game to its frame and staging the
next card behind it will make the interaction feel contained and continuous.

## What Changes

- Clip the round's card stack to the existing centered 9:16 portrait app area,
  so a dragged card cannot appear outside the app's left or right edge.
- Keep the next queued card loaded as a full-size, stationary layer behind the
  current card during every drag, including incomplete swipes.
- Promote that staged card after a completed swipe; restore the front card over
  it after a cancelled, short, or vertical gesture.
- Make each displayed item an image-card composition with an image layer and a
  lower overlaid action bar: an X action on the left and a checkmark action on
  the right, positioned as shown in the supplied reference.
- Route the X action through the same answer path as a left swipe and the
  checkmark action through the same answer path as a right swipe.
- Animate either button-selected card off the corresponding side of the frame
  before advancing, using the same visible exit treatment as a completed swipe.
- Change the round from ten cards to five cards while preserving swipe-direction choices,
  progress rail, and temporary navigation behavior.

## Capabilities

### New Capabilities

- `swipe-card-stacking`: A clipped, layered image-card stack with a visible
  next card and swipe-equivalent overlaid actions.

### Modified Capabilities

- None.

## Impact

- Affects the React round rendering and portrait/card CSS under `race-card/src/`.
- Adds focused UI behavior checks and real-browser verification.
- Uses the existing React and Vite stack with no new dependencies, external
  services, persisted data, or image analysis.
