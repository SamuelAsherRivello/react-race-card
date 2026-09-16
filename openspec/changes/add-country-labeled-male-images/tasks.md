## 1. First Spain review gate

- [ ] 1.1 Record the user-supplied `https://en.wikipedia.org/wiki/Spaniards`
  reference as non-identifying Spain context and define one photorealistic
  fictional-adult-man prompt for `image-m-esp-esp-esp-esp-1.webp`; verify the
  prompt uses 9:16 framing, globally generic clothing/background, and makes no
  appearance-based identity claim.
- [x] 1.2 Generate, inspect, convert if needed, and save exactly
  `race-card/public/images/real/image-m-esp-esp-esp-esp-1.webp` at 576 x 1024;
  share it with the user and verify no other portrait asset exists.
- [ ] 1.3 Create the initial generation-manifest record for the first Spain
  file; verify it contains the four `esp` fields, index `1`, photorealistic
  style, prompt, tool/model, date, and Spain-context research URLs.

## 2. Remaining asset library after explicit approval

- [ ] 2.1 After user approval, reconcile this change with
  `add-spain-swipe-round-mvp` so its mock-only asset boundary no longer
  conflicts; verify both changes have coherent requirements.
- [ ] 2.2 Generate and inspect the remaining 100% Spain male assets using
  indices `2` through `10`; verify their filenames use four `esp` fields and
  every person is clearly distinct from every accepted asset.
- [x] 2.3 Generate and inspect the four 100% Spain female assets using
  `image-f-esp-esp-esp-esp-1.webp` and
  `image-f-esp-esp-esp-esp-4.webp`; verify their filenames use four `esp`
  fields and every person is clearly distinct from every accepted asset.
- [x] 2.4 Create `race-card/public/images/real/spain/` and move every existing
  Spain card into it without renaming files; create
  `race-card/public/images/real/japan/` for the Japan cards.
- [ ] 2.5 Generate and inspect one 100% male asset each for Bhutan, Ethiopia,
  Ghana, Mongolia, Morocco, Nepal, Norway, Peru, and Samoa; verify each
  filename repeats its lowercase alpha-3 code four times with index `1` and
  every person is clearly distinct from every accepted asset.
- [x] 2.6 Generate and inspect five Japan male assets and five Japan female
  assets using indices `1` through `5`; verify every candidate is distinct
  from every accepted asset, documents the requested fictional Japanese-parent
  background without visual stereotyping, and is stored in the Japan subfolder.
- [ ] 2.7 Complete the checked-in generation manifest for all 33 assets;
  verify each record has complete metadata and no real-person photo source.

## 3. Final asset verification after explicit approval

- [ ] 3.1 Extend focused tests to validate all 33 filenames, manifest
  completeness, WebP dimensions, and duplicate code/index absence; verify
  `npm test` passes from the repository root.
- [ ] 3.2 Verify the complete static set resolves through Vite's configured
  `/react-race-card/images/real/` base path and `npm run build` completes
  without a new runtime dependency.
