## Context

The existing `#portrait_frame` chooses the smaller of a width- and
height-constrained 9:16 rectangle. The captured playing state shows that
`.game_shell` has only `min-height: 100%`; its header, flexible card area, gap,
and footer can therefore exceed the frame, whose `overflow: hidden` clips the
footer. The ready dialog fits because it does not allocate the card stack.

## Goals / Non-Goals

**Goals:**

- Give every in-frame round state a definite height equal to the portrait
  frame's content height.
- Reserve header/footer space before the card stack flexes, allowing the middle
  card area to shrink rather than pushing content below the frame.
- Preserve frame-relative margins and centered 9:16 presentation while making
  dynamic viewport height the authoritative dimension.

**Non-Goals:**

- Changing the 9:16 target ratio, browser zoom, card content, image crop,
  touch behavior, round logic, or footer navigation labels.
- Adding scrolling as a fallback; all playable controls remain simultaneously
  visible in the portrait frame.

## Decisions

### Use viewport height as the portrait-frame authority

Set the frame height to `100dvh` and its width to `100dvh * 9 / 16`, then keep
the fixed centering transform. This makes the requested full-height behavior
consistent across browser sizes and derives width from the ratio rather than
shortening the frame on a narrow viewport.

### Establish an internal height-bounded flex chain

Set the game shell to a definite frame-relative height instead of a minimum,
with zero minimum height where flex descendants need to shrink. Keep the header
and navigation as non-growing sections, while the round content/card stack is
the only remaining flexible region. This makes the browser distribute available
height instead of allowing the footer to overflow the clipped parent.

Using global page scroll or removing the frame's clipping was rejected: both
would violate the bounded portrait presentation and make swipe exits leak into
the desktop canvas.

## Risks / Trade-offs

- [A narrow viewport can be narrower than the full-height 9:16 frame] -> Keep
  the frame centered and preserve all vertical content within it, as requested;
  test a narrow mobile viewport for usable visible controls.
- [Fixed footer padding consumes card space] -> Retain only padding that fits
  inside the bounded flex calculation and check desktop plus mobile viewports.
- [Flex min-size defaults reintroduce overflow] -> Apply explicit `min-height:
  0` at each shrinking layout boundary and assert it in focused tests.

## Migration Plan

1. Add focused CSS assertions for a height-bounded shell and shrinkable card
   region before changing layout rules.
2. Adjust only the portrait/game-shell flex sizing rules.
3. Run tests and a production build, then inspect ready and playing states in
   desktop and mobile browser viewports for full-height framing and no clipped
   footer.
