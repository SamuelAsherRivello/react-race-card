# Inspiration UI Analysis

This document analyzes interface structure, hierarchy, controls, and visual
patterns only. It intentionally does not assess, describe, or compare the
people or profile photos shown in the screenshots.

## Bumble

**File:** `Screenshot_20260916_113507_Bumble.jpg`

- A bright, sparse header establishes the brand at upper left and puts one
  filter/settings control at upper right.
- The central experience is a single, large rounded card with a generous
  outer margin. A share control floats over the card rather than taking header
  space.
- Profile metadata sits in a bottom image overlay: small status/trust chips,
  a strong name line, then compact icon-led facts. The dark bottom gradient
  keeps this information legible without adding a separate panel.
- Two asymmetric, highly visible yellow circular actions sit at the card's
  lower corners. Their placement makes the primary decision available without
  covering the information hierarchy.
- A persistent five-item bottom navigation uses label-plus-icon items and a
  clearly bold active state.

**Useful pattern:** an uncluttered card-first layout with trust/status chips
and a small, intentional action set.

## OkCupid

**File:** `Screenshot_20260916_113739_OkCupid.jpg`

- A dark header contains the brand, two utility icons, and a horizontally
  scrollable mode/category rail. The selected item is distinguished with
  brighter text and a strong magenta ring.
- The main card uses a visible image-progress rail at its top, a recommendation
  label, and a dark lower overlay for identity, location, and preview text.
- Compatibility is expressed as a prominent percentage badge beside the name,
  while a purple floating action provides an additional contextual action.
- A centered downward chevron signals that the card has more information to
  reveal, instead of asking the user to infer that from the cropped text.
- The bottom navigation is dense but clear: five icon-and-label destinations,
  a selected tab, and numeric/attention badges.

**Useful pattern:** separate discovery modes from the card itself, and surface
match rationale as a compact, glanceable badge.

## happn

**File:** `Screenshot_20260916_113614_happn.jpg`

- A warm off-white shell and rounded, pale header controls give this screen a
  softer visual language than the dark-card examples.
- The top row combines brand, a selected product mode, filtering, notifications,
  and account access. A small notification dot provides a lightweight alert.
- The large rounded card includes an activity-status chip at upper left and a
  compact refresh/undo-style control at upper right. The name is deliberately
  minimal and placed over the card's lower edge.
- Four equal, black rounded-square action buttons create a clear decision dock
  below the card. Color-coded symbols make the actions scannable while the
  shared shape maintains order.
- A dark five-item bottom navigation uses a strong active state and a numeric
  likes badge.

**Useful pattern:** keep action choices in a dedicated dock, rather than
mixing them into the profile overlay.

## Hinge

**File:** `Screenshot_20260916_113533_Hinge.jpg`

- A white filter rail leads the screen with pill controls for signals and
  sortable criteria. The current filter uses a darker border rather than a
  filled color, keeping the overall treatment restrained.
- Identity and availability appear above the media in a separate information
  band, with small semantic labels for signals and activity. This makes the
  screen read more like a scrollable profile than a single swipe card.
- The media card has modest rounded corners and a small floating heart action.
  The action is local to the item it affects, rather than part of a global
  control row.
- A prompt/answer card follows beneath the media, showing how structured
  content can extend a profile with an explicit interaction prompt.
- The bottom navigation remains persistent, dark, and icon-forward, with the
  active destination visually anchored.

**Useful pattern:** reveal profile content in sections and attach actions to
the specific section or answer being considered.

## Tinder

**File:** `Screenshot_20260916_113519_Tinder.jpg`

- A dark translucent top region holds filters and product modes. The selected
  mode is a filled pill, while the image-progress indicators are centered just
  below it.
- The card fills most of the viewport and uses a strong bottom gradient for
  high-contrast identity, availability, distance, and verification/status
  information.
- Five evenly spaced circular decision buttons form a dedicated action row.
  They use familiar shape and color distinctions but keep a consistent button
  size and placement.
- A small share button floats at the side of the card content, making it
  available without competing with the main action row.
- A dark bottom navigation uses a single active destination, readable labels,
  and a prominent likes-count badge.

**Useful pattern:** use a full-bleed card only when the bottom gradient,
action dock, and navigation establish a stable reading order.

## Cross-image UI observations

- Every example maintains a persistent bottom navigation with five primary
  destinations; badges communicate waiting work or attention without opening a
  separate screen.
- Each discovery experience centers one primary profile/card at a time, but
  differs in where it places actions: over the card, in a decision dock, or on
  individual content sections.
- Rounded cards and pill-shaped status/filter controls are consistent visual
  primitives across the examples.
- Status, trust, availability, match rationale, and proximity are compact
  metadata. They are treated as scannable signals, not paragraphs.
- Strong contrast treatments are essential when text overlays media: use a
  gradient or dedicated panel rather than relying on the underlying image for
  readability.

## Considerations for Race Card

Before adopting any of these patterns, decide whether Race Card is primarily a
single-card decision flow, a detail-first browsing flow, or a hybrid. That one
decision determines whether actions should live in a fixed dock, on individual
content sections, or both.
