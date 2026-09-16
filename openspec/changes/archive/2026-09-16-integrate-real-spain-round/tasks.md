## 1. Approved round catalog

- [x] 1.1 Enumerate the ten approved Spain and ten approved Japan WebP files,
  then define the static 20-card catalog in `race-card/src/spain-round.js` with
  stable ids, public-relative paths, and four supplied country values; verify
  no catalog entry references `mock/`, `usa/`, or `germany/`.
- [x] 1.2 Keep the five-card dealing and metadata-only scoring behavior over
  the real catalog; verify repeated deterministic and random deals contain five
  distinct cards and a two-or-three Spain-card split.

## 2. Real-image card rendering

- [x] 2.1 Update `race-card/src/App.jsx` so the current and staged next card
  resolve catalog assets through `import.meta.env.BASE_URL` below `images/real/`;
  verify both card layers load approved WebP URLs under the GitHub Pages base.
- [x] 2.2 Replace the mock-specific visible-image description with neutral,
  non-identifying portrait alternative text; verify neither rendered image nor
  accessibility text claims country, nationality, or ancestry from appearance.

## 3. Verification

- [x] 3.1 Extend `race-card/test/page.test.mjs` to check the exact approved
  20-card inventory, metadata values, asset existence, absence of excluded
  folders, five-question fair deals, and metadata-only scoring; verify `npm
  test` passes from the repository root.
- [x] 3.2 Run `npm run build` from the repository root; verify the production
  build succeeds with no new dependency or network configuration.
- [x] 3.3 Run the Vite app in a real browser and play five choices plus replay;
  verify real Spain/Japan portraits appear in the current/next stack, swipes
  and action buttons advance the round, the five indicators progress, and the
  score dialog appears in the centered 9:16 frame.
