## Context

The current repository is a React 19 and Vite application rooted at
`race-card/`, with a centered 9:16 frame and a configured GitHub Pages base.
This change delivers image assets only and does not alter that application UI.
The in-flight `add-spain-swipe-round-mvp` change reserves
`public/images/real/` for an empty mock-only boundary; see proposal.md for the
required reconciliation before either change is applied.

## Goals / Non-Goals

**Goals:**

- Keep final assets local, deterministic, modest in size, and compatible with
  Vite's `public/` serving convention.
- Preserve auditable generation and country-context research information beside
  the final assets.
- Deliver the first 100% Spain asset as a review gate before committing to the
  remaining 32 generated portraits, including the four Spain female portraits
  and five Japan portraits of each requested gender.

**Non-Goals:**

- Inferring or testing a person's nationality, ethnicity, or ancestry from an
  image.
- Choosing a fictional person based on stereotypes or treating one person as a
  complete representation of a country.
- Changing the pending Spain round to load real images, or adding a runtime
  account, API, analytics service, or image library dependency.

## Decisions

### Use a country-context generation ledger

Implementation will create a checked-in JSON manifest in
`race-card/public/images/real/` that maps each deterministic filename to the
country label, photorealistic style, synthetic-generation prompt/tool/date,
and URLs used for country-context research. Final images will be newly
generated fictional portraits; online references will guide context only and
will not be copied into the repository.

This is preferable to a filename-only convention because filenames cannot
communicate how a fictional asset was generated. An external spreadsheet was
rejected because it could drift from the asset files and would not be available
to a repository reviewer.

### Normalize final assets to WebP at 576 x 1024

Implementation will create a photorealistic portrait with a single fictional
adult subject, inspect the result, and save the final non-HD display
derivative as 576 x 1024 WebP. At 9:16 it maps directly to the portrait-frame
aspect ratio and avoids a runtime transform.

Storing arbitrary source resolutions was rejected because it produces
inconsistent fullscreen framing and payload size. Upscaling was rejected
because it adds no source detail and can introduce visible artifacts.

### Require an identity-distinction review for every new asset

Before accepting each generated file, implementation will compare it with the
accepted portrait set for clearly distinct fictional facial structure, age,
hairstyle, and overall presentation. A candidate that reads as the same person
or a minor variation will be discarded and regenerated. This visual review is
about preventing duplicate fictional characters, not inferring nationality or
ancestry.

### Gate the asset batch on the first Spain review

The first deliverable is only `image-m-esp-esp-esp-esp-1.webp`. It will be
generated, inspected, copied to the asset directory, and shown to the user.
The implementation pauses at that point; the other nine Spain male assets,
four Spain female assets, nine non-Spain male assets, and five Japan assets of
each requested gender are a later continuation after explicit approval.

### Keep country context separate from identity inference

The proposed country list is geographically distributed for content variety.
Online research may guide non-identifying setting/context details, while every
portrait remains fictional and uses the requested photorealistic style. It
will not be based on whether reviewers think a person "looks" like a country.

For the Spain assets, the user-supplied [Spaniards reference](https://en.wikipedia.org/wiki/Spaniards)
will be recorded in the generation ledger as country-context research. Its
account of Spain's regional, linguistic, historic, and contemporary diversity
reinforces that `esp` is supplied metadata, not a visual classification rule.

The user-supplied [Spain visual-reference collage](https://preview.redd.it/spanish-vs-irish-v0-r4o6dtiyr78b1.jpg?width=640&crop=smart&auto=webp&s=61e558b065f09afbb8bbfd6a2d6636d041597f6b)
will be logged as presentation inspiration only: close editorial head-and-
shoulders framing, natural photography, and varied adult hair/age choices.
Its depicted people will not be copied or imitated, and it does not establish
a visual rule for classifying someone as Spanish.

### Preserve the mock-only change boundary until reconciliation

Before adding any real asset, implementation must update the active
`add-spain-swipe-round-mvp` artifacts so that its mock-only requirements no
longer contradict this change. The real-image library remains unreferenced by
that round unless a later approved change integrates it.

## Risks / Trade-offs

- Country-context research can encourage stereotypes -> restrict prompts to
  fictional subjects and record research links; reject prompts that claim a
  face establishes nationality or ethnicity.
- Cropping can cut off the subject -> inspect each final 576 x 1024 derivative
  at a mobile viewport before accepting it.
- Generation metadata can become incomplete -> reject the candidate rather
  than substituting an undocumented asset.
- Generated portraits can converge on one apparent person -> compare every
  candidate with accepted assets and regenerate a near-duplicate.
- The existing mock-only proposal conflicts with real assets -> reconcile its
  delta before implementation instead of silently overriding it.

## Migration Plan

1. Reconcile the two in-flight change artifacts and verify their requirements
   do not conflict.
2. Research Spain context and generate, inspect, and share the single first
   Spain asset; stop pending review approval.
3. After approval, complete the other 32 assets and the complete manifest.
4. Validate naming, dimensions, manifest completeness, and build output before
   exposing the library to gameplay.
5. Roll back by removing the new asset set and manifest together; no data
   migration or remote service state is involved.
