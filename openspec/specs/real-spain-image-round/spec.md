# Real Spain Image Round Specification

## Purpose

Provide a playable five-question Spain round using approved local portrait
assets while keeping answer correctness based only on documented card metadata.

## Requirements

### Requirement: Approved real-image Spain round inventory

The system SHALL build the Spain-round candidate inventory from exactly the ten
WebP files in `images/real/spain/` and the ten WebP files in
`images/real/japan/`. Spain-folder cards SHALL be supplied with four `SPAIN`
metadata values, and Japan-folder cards SHALL be supplied with four `JAPAN`
metadata values. The inventory SHALL NOT include a file from `images/mock/`,
`images/real/usa/`, or `images/real/germany/`.

#### Scenario: The approved card inventory is inspected

- **WHEN** the round's candidate cards are enumerated
- **THEN** exactly 20 cards resolve to the approved Spain or Japan local WebP
  paths and each has four supplied country metadata values

### Requirement: Five-question real-image deal

Every new and replayed round SHALL deal exactly five distinct approved portrait
cards. Each deal SHALL include either two or three Spain-metadata cards and
the complementary number of Japan-metadata cards, with order randomized before
the first question appears.

#### Scenario: A player starts a real-image round

- **WHEN** the player selects Start or Play Again
- **THEN** five distinct approved portraits are ready for the round with a
  two-or-three Spain-card split

### Requirement: Metadata-only Spain judgment

The system SHALL treat right swipe/checkmark as a Spain answer and left
swipe/X as a Not Spain answer. It SHALL score each answer solely by comparing
that choice to the card's supplied metadata, and SHALL NOT derive country,
nationality, ancestry, or correctness from the portrait's appearance.

#### Scenario: A player answers an approved Japan-folder portrait

- **WHEN** the player swipes left or selects X for a card supplied with four
  `JAPAN` metadata values
- **THEN** that answer is counted as correct regardless of image appearance

#### Scenario: A player answers an approved Spain-folder portrait

- **WHEN** the player swipes right or selects the checkmark for a card
  supplied with four `SPAIN` metadata values
- **THEN** that answer is counted as correct regardless of image appearance

### Requirement: Real portrait rendering and accessible description

During play, the current and staged next card SHALL render their approved local
portrait asset in the existing full-card 9:16 card treatment. Each visible
portrait SHALL have non-identifying alternative text that communicates the
game context without assigning a country or ancestry to the depicted person.

#### Scenario: The current card is displayed

- **WHEN** a question is active
- **THEN** the card displays its approved WebP portrait and exposes neutral
  game-context alternative text
