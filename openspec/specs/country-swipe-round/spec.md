# Country Swipe Round Specification

## Purpose

Provide a compact, repeatable Spain card round using non-person mock images
and supplied country tags, so a player can make ten judgments and see a score.

## Requirements

### Requirement: Non-person mock asset boundary
The system SHALL define `public/images/mock/` as the source for temporary
non-person MVP artwork. The MVP SHALL load no asset from the real-image
directory, whether or not a separately managed real-image library exists, and
SHALL determine correctness from supplied card tags, not image pixel analysis.

#### Scenario: The MVP renders a round card
- **WHEN** a player starts or continues a Spain round
- **THEN** the displayed card uses a mock asset and its supplied tags determine
  correctness

#### Scenario: The reserved image directory is inspected
- **WHEN** the project is inspected after the MVP change is applied
- **THEN** no MVP screen references an asset in `public/images/real/`

### Requirement: Four-tag Spain candidate pool
The system SHALL maintain a pool of 20 mock cards. Each card SHALL provide a
`countries` collection containing exactly four uppercase country values. Ten
cards SHALL contain four `SPAIN` values and ten SHALL contain zero `SPAIN`
values. A card SHALL match the Spain round only when all four values are
`SPAIN`.

#### Scenario: A card has the full Spain tag set
- **WHEN** a candidate card provides
  `["SPAIN", "SPAIN", "SPAIN", "SPAIN"]`
- **THEN** the system treats that card as matching the Spain round

#### Scenario: A card has no Spain tags
- **WHEN** a candidate card provides four values with no `SPAIN`
- **THEN** the system treats that card as not matching the Spain round

### Requirement: Balanced round dealing
Starting a round SHALL select exactly five distinct cards at random without
replacement. A round SHALL contain either two or three Spain matches and the
complementary number of non-matches, so repeated rounds are fair across the
two tag groups.

#### Scenario: A player starts a Spain round
- **WHEN** the player selects `Start`
- **THEN** the system deals five cards with a two-or-three Spain split and
  presents five progress indicators

#### Scenario: A player replays after results
- **WHEN** the player selects `Play Again`
- **THEN** prior answers clear and a new balanced round is dealt

### Requirement: Single-card directional flow
The system SHALL first show a centered `Round 1` prompt with `Start`. During a
round it SHALL show a current image card and, except at the end, a full-size
next card beneath it inside the centered 9:16 frame. The frame SHALL clip a
moving current card. The current card SHALL contain a lower overlaid X and
checkmark action bar, swipe support, a five-line header progress rail, and a
compact footer. A rightward swipe or checkmark SHALL record Spanish; a
leftward swipe or X SHALL record Not Spain. Button-selected cards SHALL animate
off the matching edge before advancing.

#### Scenario: A player chooses Spanish
- **WHEN** the player uses the checkmark or an intentional rightward swipe
- **THEN** the system records Spanish and advances unless the card is fifth

#### Scenario: A player chooses Not Spain
- **WHEN** the player uses the X or an intentional leftward swipe
- **THEN** the system records Not Spain and advances unless the card is fifth

### Requirement: Percentage-only result
After the fifth judgment, the system SHALL show `Round Complete`,
`You got <percentage>% correct.`, and `Play Again`. It SHALL calculate the
percentage from correct judgments divided by five; valid percentages SHALL be
multiples of twenty.

#### Scenario: A player finishes the round
- **WHEN** the player records the fifth judgment
- **THEN** the system shows the title, percentage result, and replay control,
  without a card-by-card recap
