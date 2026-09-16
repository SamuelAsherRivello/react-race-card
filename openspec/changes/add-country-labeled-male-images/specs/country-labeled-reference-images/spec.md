## Purpose

Provide a small, locally served set of photorealistic fictional portraits with
generation and country-context records for future Race Card content.

## ADDED Requirements

### Requirement: Deterministic country-code image set
The completed library SHALL contain exactly 33 photorealistic, fictional adult
WebP portraits: Spain assets in `public/images/real/spain/` and Japan assets in
`public/images/real/japan/`, while future other-country assets may remain in
`public/images/real/`. The Spain set contains ten male assets named
`image-m-esp-esp-esp-esp-1.webp` through
`image-m-esp-esp-esp-esp-10.webp`, four Spain female assets named
`image-f-esp-esp-esp-esp-1.webp` through `image-f-esp-esp-esp-esp-4.webp`.
Japan contains five male assets named `image-m-jpn-jpn-jpn-jpn-1.webp` through
`image-m-jpn-jpn-jpn-jpn-5.webp` and five female assets named
`image-f-jpn-jpn-jpn-jpn-1.webp` through `image-f-jpn-jpn-jpn-jpn-5.webp`.
The remaining countries—Bhutan, Ethiopia, Ghana, Mongolia, Morocco, Nepal,
Norway, Peru, and Samoa—each have one 100% male asset. Every
non-Spain name SHALL repeat its lowercase ISO alpha-3 code four times and use
index `1` (for example, `image-m-jpn-jpn-jpn-jpn-1.webp`).

#### Scenario: The static asset set is inspected
- **WHEN** the completed real-image directory and its country subfolders are
  enumerated
- **THEN** they contain exactly the 33 required filenames and no duplicate
  country-code quadruple and index pair

### Requirement: Staged Spain review delivery
The first implementation delivery SHALL generate and share exactly one file,
`image-m-esp-esp-esp-esp-1.webp`, for user review. The implementation SHALL
not generate, add, or modify any other portrait asset until the user explicitly
approves continuation after reviewing that file.

#### Scenario: The first review asset is delivered
- **WHEN** the first Spain asset has been generated and saved
- **THEN** it is shared with the user and the remaining 32 portrait assets are
  absent from the destination directory pending explicit approval

### Requirement: Mobile portrait display dimensions
Every delivered reference image SHALL be 576 by 1024 pixels with a 9:16
portrait aspect ratio. The fictional subject SHALL remain visibly present
after normalization, and the system SHALL not upscale a smaller generation.

#### Scenario: A reference image is displayed in the portrait frame
- **WHEN** a mobile client displays a stored reference image full-screen
- **THEN** the asset fills a 9:16 portrait presentation without requiring an
  HD-resolution source

### Requirement: Distinct fictional people
Each stored portrait SHALL depict a clearly distinct fictional person. The
library SHALL NOT contain two images that appear to portray the same person or
a trivial variation of that person, and it SHALL NOT represent a real person
in more than one asset.

#### Scenario: A newly generated portrait is reviewed against the library
- **WHEN** a new candidate is compared with every accepted portrait
- **THEN** it is retained only when its fictional person is visually distinct
  from all existing assets, otherwise it is regenerated

### Requirement: Auditable synthetic-generation provenance
The system SHALL include a machine-readable generation manifest with one
record per stored image. Each record SHALL identify the final filename,
country label, gender, index, photorealistic render style, generation prompt,
generation model or tool, generation date, and any research URLs used for
non-identifying country context. A stored image SHALL not be accepted if the
manifest is incomplete or if it incorporates a photo of an identifiable real
person.

#### Scenario: A generation record is reviewed
- **WHEN** a reviewer looks up any final filename in the generation manifest
- **THEN** the record provides enough information to reproduce the asset's
  prompt and understand its country-context research

### Requirement: Country labels are provenance, not visual classification
The system SHALL present the country value as fictional content metadata
established by the generation record. It SHALL NOT claim that country,
nationality, ethnicity, or ancestry can be determined from a person's
appearance, nor use visual distinctiveness as an acceptance criterion.

For each Japan asset, the fictional generation record SHALL document a
Japanese subject with both parents Japanese. This biographical constraint SHALL
NOT be communicated through stereotypes, country-specific props, cultural
dress, or claims that it is visible in the subject's appearance.

#### Scenario: A player sees a country-labeled image
- **WHEN** the application presents a reference image and its country label
- **THEN** the label is treated as documented content metadata rather than a
  conclusion drawn from the depicted person

#### Scenario: A Japan asset is generated
- **WHEN** a Japan portrait prompt and its manifest record are prepared
- **THEN** they document the fictional subject's Japanese parents while keeping
  the image free of stereotype-based country cues or appearance-based claims
