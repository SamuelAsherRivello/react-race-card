## Purpose

Keep the swipe interaction visually contained and continuous by showing the
next round card beneath the one a player is actively moving.

## ADDED Requirements

### Requirement: Portrait-bounded swipe card stack
During a round, the visible card stack SHALL be clipped to the centered 9:16
portrait app frame. A current card moved left or right SHALL not be visible
outside that frame's horizontal boundaries.

#### Scenario: A player drags toward a side boundary
- **WHEN** the current card is dragged toward the left or right edge
- **THEN** no portion of that card is visible outside the portrait app frame

### Requirement: Full-size next-card preview
During a round with another card available, the system SHALL keep the next
queued card rendered as a full-size, stationary layer behind the current card.
The preview SHALL remain visible as the current card moves, including during an
incomplete swipe.

#### Scenario: A player begins a swipe
- **WHEN** a player moves the current card left or right before releasing it
- **THEN** the full-size next queued card is visible behind the moving card

#### Scenario: A player cancels a swipe
- **WHEN** a player releases with a short or vertical gesture
- **THEN** the current card returns over the same next-card preview without
  advancing the round

### Requirement: Next-card promotion
After a completed directional swipe, the staged next card SHALL become the
current front card. No preview card is required behind the fifth and final
current card.

#### Scenario: A player completes a swipe before the final card
- **WHEN** an intentional horizontal swipe advances a non-final card
- **THEN** the previously previewed next card becomes the current front card

#### Scenario: A player reaches the final card
- **WHEN** the fourth card advances and the fifth card becomes current
- **THEN** the system does not require an additional preview card behind it

### Requirement: Five-card round
Every newly started and replayed round SHALL contain exactly five distinct
cards. A round SHALL randomly contain either two or three matching cards, with
the remaining cards non-matching, so repeated rounds remain fair across the
two tag groups. The result percentage SHALL be calculated from the five
recorded answers, and the progress rail SHALL contain five indicators.

#### Scenario: A player starts a round
- **WHEN** a player starts or replays a round
- **THEN** the system deals five distinct cards and renders five progress
  indicators

#### Scenario: A player completes a round
- **WHEN** a player records the fifth answer
- **THEN** the system calculates the displayed percentage from five answers

### Requirement: Layered image-card actions
Each displayed round item SHALL be an image card composed of an image layer and
a two-button action bar overlaid in the lower portion of the card. The left
button SHALL use an X icon and record the same answer and advancement behavior
as an intentional left swipe. The right button SHALL use a checkmark icon and
record the same answer and advancement behavior as an intentional right swipe.
Before advancing, either button-selected card SHALL animate non-interactively
off the corresponding side of the portrait frame using the completed-swipe exit
treatment.

#### Scenario: A player selects the X action
- **WHEN** a player selects the left X action on the current image card
- **THEN** the system records Not Spain and advances exactly as it would for a
  completed left swipe, after animating the card leftward off-screen

#### Scenario: A player selects the checkmark action
- **WHEN** a player selects the right checkmark action on the current image
  card
- **THEN** the system records Spanish and advances exactly as it would for a
  completed right swipe, after animating the card rightward off-screen
