## Context

The repository is a React 19 application mounted into Vite's `race-card/`
root, with a centered 9:16 `portrait_frame`, four reusable corner roles, and
no gameplay state. See the proposal and `country-swipe-round` spec.

## Goals / Non-Goals

**Goals:**

- Keep the MVP local, inspectable, and playable with gestures.
- Use supplied country-tag data for correctness.
- Keep the existing portrait frame and React/Vite dependency set.

**Non-Goals:**

- Image-pixel analysis, asset interpretation, real-image loading, accounts,
  saved history, or additional country rounds.
- Functional multi-destination navigation; the MVP footer uses four temporary
  icon-and-label placeholders only.

## Decisions

### Store an explicit four-country-tag dataset

A data module will define 20 immutable records with ID, mock-asset filename,
and exactly four uppercase `countries` values. Ten records use four `SPAIN`
tags; ten use none. A derived predicate checks all four values equal `SPAIN`;
it never inspects the image.

### Deal a fair five-card round

The round initializer shuffles matching and non-matching groups separately,
selects either two or three matching cards and the complementary non-matching
count, then shuffles the deal. This keeps every round to five unique cards and
makes repeated rounds fair across the two tag groups.

### Keep mock and reserved images separate

Implementation creates `race-card/public/images/mock/` for temporary
non-person assets. Only mock filenames resolve with `import.meta.env.BASE_URL`,
such as `http://localhost:5173/react-race-card/images/mock/card-01.svg` when
Vite uses port 5173. A separately managed real-image directory may exist, but
has no dataset entry or UI path in this MVP.

### Render ready, play, and result phases

`App` renders a ready phase with a horizontally and vertically centered
`Round 1` dialog: centered title bar and body, plus a two-slot action area with
one centered `Start` button. Play has only a ten-line progress rail, one card,
and a compact four-item temporary icon-and-label footer. Intentional horizontal
pointer distance records the direction; short or vertical gestures do nothing.
During play, a full-size next card is staged beneath the current card and the
portrait frame clips its animated exit. The lower image-card action bar offers
X and checkmark controls with the same results as left/right swipes. The result
swaps the card for score and replay. The app preserves the upper-right
repository link and lower-right version corner.

## Risks / Trade-offs

- Mock content may not convey country relevance → tags are the source of truth.
- Gestures may be unreliable → visible semantic controls remain available.
- Empty directories are not tracked by Git → include a non-image placeholder.

## Migration Plan

1. Add data, non-person mock assets, and the reserved-directory placeholder.
2. Replace starter content with ready/play/result UI while preserving the
   portrait frame and corner links.
3. Add focused tests, run test/build commands, and verify the complete flow in
   a browser at Vite's reported URL.

Rollback is a normal source revert; no persisted data or service state exists.
