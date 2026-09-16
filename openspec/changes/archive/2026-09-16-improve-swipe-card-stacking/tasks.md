## 1. Contained card stack

- [x] 1.1 Make the existing portrait app frame clip round-card overflow; verify a foreground card translated beyond either horizontal edge is not visible outside the 9:16 frame.
- [x] 1.2 Render each item as a layered image card, with an image layer, lower overlaid X/checkmark action bar, and the immediate next card as a full-size stationary background layer beneath the interactive current card; verify the first four cards have a preview and the fifth has none.
- [x] 1.3 Change new and replayed rounds to deal five distinct cards, update five-answer scoring and the five-segment progress rail, and verify the balanced tag selection remains valid.

## 2. Swipe continuity

- [x] 2.1 Preserve the next-card preview while a front card moves and when a short or vertical gesture restores it; verify those gestures do not advance the card index.
- [x] 2.2 Promote the staged card after an intentional left or right swipe, and make X/checkmark actions use the same non-interactive left/right exit animation and answer paths without changing dealing, scoring, or progress; verify focused tests cover the rendered ordering and both action mappings.

## 3. Verification

- [x] 3.1 Run `npm test` and `npm run build` from the repository root; verify both complete successfully.
- [x] 3.2 Use a real browser at the Vite local URL to verify clipping, the full-size stationary preview during a partial swipe, restoration after an incomplete swipe, and promotion after a completed swipe.
- [x] 3.3 Run focused tests and use a real browser to verify five cards are dealt, the fifth answer shows results, and replay starts a fresh five-card round.
