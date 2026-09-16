## Why

Race Card needs a small, display-ready reference library for a future
multi-country card experience. The current proposed MVP deliberately uses
fictional mock silhouettes, so this change establishes a separate, auditable
path for photorealistic fictional portraits without asking players to infer a
person's nationality or ancestry from appearance.

## What Changes

- Add a locally stored set of 33 photorealistic, AI-generated fictional adult
  portraits: ten Spain male files, four Spain female files, five Japan male
  files, five Japan female files, and one male file each for Bhutan, Ethiopia,
  Ghana, Mongolia, Morocco, Nepal, Norway, Peru, and Samoa.
- Use the lowercase ISO alpha-3 codes from the user-supplied country-code
  reference in every filename. The first ten files SHALL be
  `image-m-esp-esp-esp-esp-1.webp` through
  `image-m-esp-esp-esp-esp-10.webp`, plus
  `image-f-esp-esp-esp-esp-1.webp` through
  `image-f-esp-esp-esp-esp-4.webp`; every non-Spain file repeats its own code
  four times and uses index `1` (for example,
  `image-m-jpn-jpn-jpn-jpn-1.webp`). The Japan set includes
  `image-m-jpn-jpn-jpn-jpn-1.webp` through
  `image-m-jpn-jpn-jpn-jpn-5.webp` and
  `image-f-jpn-jpn-jpn-jpn-1.webp` through
  `image-f-jpn-jpn-jpn-jpn-5.webp`.
- Store the completed Spain cards in `race-card/public/images/real/spain/` and
  the Japan cards in `race-card/public/images/real/japan/`. The current cards
  SHALL be moved from the `real/` root into `spain/`; filenames remain
  unchanged.
- Treat the four country-code fields as fictional character metadata. Four
  matching fields represent the game-defined 100% country value; they are not
  inferred from the portrayed person's appearance.
- For the Japan cohort, document each fictional subject as Japanese with both
  parents Japanese. This is biographical generation metadata, not a visual
  classification: prompts MUST NOT rely on stereotypes, cultural cues, or
  appearance claims to communicate it.
- The final images SHALL be fictional and no sourced photo of a real person
  will be stored. Clothing and backgrounds SHALL remain globally generic and
  SHALL not strongly hint at a country; the filename metadata, not scene or
  appearance, supplies the game-defined country value.
- The user-supplied Spain visual-reference collage MAY guide close editorial
  head-and-shoulders framing, a natural photographic presentation, and varied
  adult hair/age choices for future Spain assets. It SHALL NOT be copied, used
  to reproduce or resemble any depicted real person, or treated as evidence
  that nationality can be inferred from appearance.
- Every generated asset SHALL depict a clearly distinct fictional person. The
  collection SHALL not contain two images that appear to be the same person or
  trivial variants of one person; no real person is represented more than once.
- Normalize every delivered asset to 576 x 1024 pixels (9:16) for full-screen
  portrait mobile display without an HD-size payload. Preserve the depicted
  person in the crop and do not upscale a smaller source.
- Use a staged delivery gate: first generate and share exactly
  `image-m-esp-esp-esp-esp-1.webp` for user review. Implementation SHALL stop
  after that one 100% Spain asset and SHALL not generate any other asset until
  the user explicitly approves moving forward. After approval, continue in
  user-directed review increments rather than generating the remaining batch
  without another review opportunity.
- Add a generation manifest beside the assets, recording the final filename,
  country label, gender, index, photorealistic style, prompt, generation
  model/tool, date, and the researched context URLs used for that image.
- This change SHALL not create, alter, or integrate any application UI,
  navigation, swipe handling, prompt, scoring, or gameplay behavior.

## Capabilities

### New Capabilities

- `country-labeled-reference-images`: A local, auditable, 33-file fictional
  portrait library with deterministic ISO-code filenames and mobile display
  dimensions.

### Modified Capabilities

- None. The only related contract exists as an in-flight change, not a main
  OpenSpec capability; its mock-only boundary must be reconciled before either
  change is applied.

## Impact

- Affects only `race-card/public/images/real/` (including country subfolders)
  and asset-focused tests; this
  change adds no application code, network runtime dependency, account,
  backend, or user interface.
- Requires online research for country-context references and a generation
  record before a file enters the repository. Reference material does not
  become a redistributed asset.
- Future gameplay can serve the files through Vite's configured public root,
  but this change does not add that integration.
- Implementation will need focused asset, manifest, filename, and dimension
  checks plus `npm test`; browser/UI verification is deferred with UI work.
