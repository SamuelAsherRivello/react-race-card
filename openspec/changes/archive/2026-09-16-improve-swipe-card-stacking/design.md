## Context

The existing React round view renders only the current card and applies its
drag transform directly. Its portrait frame establishes the visual dimensions
but does not currently contain overflow. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**

- Keep card movement inside the existing portrait frame.
- Render the current and immediate next queued card together in a five-card
  round without changing swipe thresholds.
- Keep the next card full-size and stationary, as confirmed in the interview.

**Non-Goals:**

- Changing the card-tag model or footer.
- Adding multi-card previews, card preload networking, or new dependencies.
- Adding progressive scale or opacity animation to the next card.

## Decisions

### Contain stack overflow at the portrait boundary

The existing `#portrait_frame` is the app's 9:16 visual boundary, so it will
become the clipping container. This prevents the dragged foreground card from
appearing in the surrounding browser area without introducing a second frame.

### Render a two-card stack from the current index

The playing view will derive the immediate next card from the existing round
array and render it first as a full-size stationary background layer. Five-card
dealing and five-answer scoring remain owned by the existing round-data module.
The
current card remains the only interactive foreground layer and keeps its drag
transform. Rendering order makes a completed index increment promote the same
background card naturally.

### Keep five-card rounds fair over repeated play

An odd card count cannot contain an exact half from each tag group. Each round
will randomly deal either two matching and three non-matching cards, or three
matching and two non-matching cards, then shuffle the five-card result. This
keeps the expected matching ratio at 50% across repeated rounds without
requiring duplicate cards.

### Preserve preview during rejected gestures

Short and vertical releases already reset the drag offset rather than advancing
the index. The background card therefore remains the same while the foreground
card returns over it; no separate restoration state is needed.

### Compose each card from image and action layers

Each foreground image card will own its image layer and an overlaid lower
action bar. The bar will follow the supplied reference with large circular
controls positioned left and right within the card: X first, checkmark second.
The controls will call the existing answer transition directly, rather than
synthesizing pointer events. A button selection will first set the same
non-interactive exit state and signed horizontal offset as its corresponding
completed swipe, then use the existing delayed answer transition. This keeps
click and swipe scoring, motion, and card-advance behavior aligned while
retaining button semantics.

## Risks / Trade-offs

- A full-size background may be briefly covered until the foreground moves →
  this is intentional and matches the confirmed stationary preview choice.
- Rendering two image elements can add a small memory cost → only one immediate
  next asset is rendered, and the existing local mock assets are retained.
- The final card has no successor → conditionally omit the background layer.

## Migration Plan

1. Add a focused rendering test for frame clipping and foreground/background
   card ordering.
2. Update the playing view and styles for the contained two-card stack.
3. Run focused tests and production build, then verify a partial, cancelled,
   and completed swipe in a real browser.

Rollback is a source revert; the change has no persisted state or migration.
