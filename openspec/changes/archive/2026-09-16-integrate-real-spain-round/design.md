## Context

The existing React round already deals five distinct cards with a two-or-three
Spain split and scores supplied tags in `src/spain-round.js`. `App.jsx` renders
the current and staged next card through `images/mock/`, so the data and
rendering paths must change together. The approved source inventory currently
contains ten WebP files under each of `public/images/real/spain/` and
`public/images/real/japan/`; the separate `usa/` and `germany/` folders hold
inconsistently named files and are unsuitable for this round.

## Goals / Non-Goals

**Goals:**

- Serve a fair, five-question mix of approved local Spain and Japan portraits.
- Preserve the existing portrait frame, stacked-card interaction, directional
  answer controls, score dialog, and Vite base-path behavior.
- Make the image source and answer metadata explicit, testable, and independent
  of visual appearance.

**Non-Goals:**

- Creating, replacing, moving, deleting, renaming, or repairing any image
  asset.
- Inferring nationality or ancestry from pixels, adding mixed-country metadata,
  new navigation, persistence, networking, packages, or new round modes.
- Reconciling or archiving the separate in-flight image-library change.

## Decisions

### Keep a static approved catalog in the round-data module

Define the 20 allowed cards in `src/spain-round.js`, one entry per verified
Spain/Japan filename. Each entry keeps its stable id, a public-relative asset
path, and four explicit metadata values. The existing deal and score functions
continue to operate over these records.

This prevents folder scanning in the browser, which would be unavailable from
Vite's static public directory and could accidentally include the `usa/` or
`germany/` files. It also makes the exact playable inventory simple to test.

### Resolve approved public paths from the Vite base

Have `App.jsx` resolve catalog asset paths beneath `images/` using
`import.meta.env.BASE_URL`, for both the current and preview card. This
preserves the repository's `/react-race-card/` deployment base without a new
runtime service or package.

### Retain the existing fair five-card rule

Use the existing five-card, two-or-three matching-card selection and shuffled
order. The source groups change from mock themes to approved Spain/Japan
portraits; the player experience, score calculation, and swipe mapping remain
unchanged.

### Use neutral portrait alt text

Use a fixed neutral description such as `Portrait card for the Spain round`.
The filename and metadata remain internal game data; no alt text claims the
person's country, nationality, or ancestry.

## Risks / Trade-offs

- [A static catalog becomes stale after later asset changes] -> Focused tests
  verify every catalog URL exists and the catalog contains the exact approved
  10/10 source split.
- [Portraits have varying composition] -> Preserve existing `object-fit: cover`
  behavior and verify current/next rendering in a real 9:16 browser session.
- [Nearby unarchived OpenSpec deltas still describe mock-only behavior] -> Keep
  this change isolated; reconcile those artifacts before any spec sync/archive
  workflow.
- [The subject could be mistaken for an appearance-based country claim] ->
  Keep country as supplied metadata only and use neutral alt text.

## Migration Plan

1. Replace only the round catalog and card image URL construction.
2. Add catalog, dealing, scoring, accessibility, and asset-existence tests.
3. Run focused tests, production build, and an interactive browser five-answer
   round plus replay against the Vite base path.
4. Roll back by reverting the catalog/rendering change; mock assets remain
   untouched as a fallback during development.
