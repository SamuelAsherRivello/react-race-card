## 1. Round data and static assets

- [x] 1.1 Create the 20-record non-person mock dataset with exactly four uppercase `countries` values per card, ten all-`SPAIN` records, and ten zero-`SPAIN` records; verify focused tests cover tag validation and the matching predicate.
- [x] 1.2 Implement fair dealing that randomly selects two or three distinct matching cards and the complementary non-matching cards, then shuffles the five-card result; verify every deal has five unique cards and a two-or-three Spain split.
- [x] 1.3 Add temporary non-person artwork under `race-card/public/images/mock/`; verify MVP paths resolve only mock assets through Vite's base URL and do not use any separately managed real-image assets.

## 2. Card round interface

- [x] 2.1 Replace starter content with ready, playing, and result phases while preserving the centered 9:16 frame, upper-right repository link, and lower-right version; verify the ready phase renders the centered `Round 1` dialog with `Swipe right for Spain.` and `Start`.
- [x] 2.2 Implement five-card progress, a clipped current/next-card stack, intentional horizontal swipe handling, and lower overlaid X/checkmark actions; verify swipes and matching action buttons record the answer, animate completed exits, while short or vertical gestures do not advance.
- [x] 2.3 Implement fifth-card scoring from supplied country tags and replay behavior; verify the result renders `Round Complete`, `You got <percentage>% correct.`, has no recap, and replay clears answers and creates a fresh fair deal.
- [x] 2.4 Style the start dialog, mock card, progress rail, and compact four-item icon-and-label placeholder footer for the portrait safe area; verify the footer remains visible and usable.

## 3. Verification and documentation

- [x] 3.1 Extend focused tests for tag data, five-card fair dealing, start state, stack and action behavior, result calculation, asset boundary, and retained template constraints; verify `npm test` passes from the repository root.
- [x] 3.2 Run `npm run build` from the repository root and verify the production build completes without new dependencies or external service configuration.
- [x] 3.3 Use a real browser at Vite's reported local URL to verify start, five choices through controls and swipes, the score dialog, and replay in the visible 9:16 layout.
- [x] 3.4 Update README project summary and screenshot/documentation references for the mock-only Spain MVP; verify links and documented commands match the checkout.
