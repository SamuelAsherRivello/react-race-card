## 1. Height-bounded portrait layout

- [x] 1.1 Add focused layout assertions that require the portrait game shell
  to have a definite frame-relative height, retain shrinkable flex boundaries,
  and preserve a full-viewport-height 9:16 formula; verify the new test fails
  before the CSS fix.
- [x] 1.2 Update only the portrait-frame and game-shell sizing rules so the header
  and footer reserve space and the card area flexes within the frame; verify
  the focused layout test passes without changing card data or interaction code.

## 2. Browser verification

- [x] 2.1 Run `npm test` and `npm run build` from the repository root; verify
  the existing round behavior and production build remain valid.
- [x] 2.2 Inspect ready and active round states in real desktop and mobile
  browser viewports; verify each 9:16 frame uses available viewport height,
  remains centered, and exposes the full header, card actions, footer,
  repository link, and version without vertical clipping or scrolling.
