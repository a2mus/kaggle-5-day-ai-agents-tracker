# Feature Specification: UI/UX Accessibility & Code Refactoring

**Feature Branch**: `001-ui-ux-accessibility-improvements`

**Created**: June 20, 2026

**Status**: Draft

**Input**: User description: "@d:\Developpement\Projets\WEB\kaggle-5-day-ai-agents-tracker\.specify\reviews\brutal-review-2026-06-20.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Readable Text Sizes (Priority: P1)

Users should not have to strain their eyes or use zoom features to read metadata, footer fine prints, or profile subtitles.

**Why this priority**: Correcting readability is the most critical usability requirement to ensure all learners can navigate the tracker easily.

**Independent Test**: Can be verified by visually inspecting all elements in the browser and ensuring no font size is smaller than `10px` (`text-[10px]`), and that visual layout is clean.

**Acceptance Scenarios**:

1. **Given** a user viewing the main page header, **When** they inspect the companion subtitle, **Then** the text size is `text-[10px]` or larger.
2. **Given** a user viewing the User Profile card, **When** they inspect the "Saved & separated browser container" subtext or input labels, **Then** the text sizes are `text-[10px]` or larger.
3. **Given** a user viewing the fine-print footer, **When** they inspect the offline storage note, **Then** the text size is `text-[10px]` or larger.

---

### User Story 2 - Sanitized Local Profile Names (Priority: P2)

Learners should be prevented from inputting special characters or scripts into their profile names to prevent visual disruption and potential DOM XSS.

**Why this priority**: Input validation is a fundamental security requirement for robust web applications.

**Independent Test**: Can be verified by attempting to input special characters (e.g. `<script>`, `@#%`) during profile creation/renaming, and verifying that the application alerts the user and rejects the input.

**Acceptance Scenarios**:

1. **Given** a user is creating a new profile, **When** they type a name with symbols like "Vibe*Lord" and submit, **Then** the submission fails and a validation error is shown.
2. **Given** a user is renaming a profile, **When** they input a blank name or only spaces, **Then** the renaming is rejected and the original name is kept.

---

### User Story 3 - Unified Code Base (Checkbox Refactor) (Priority: P2)

Developers should have a single, unified source of truth for checkboxes to make UI customization clean and maintainable.

**Why this priority**: Component modularity reduces code duplication and prevents future style inconsistencies.

**Independent Test**: Verified by reviewing the codebase and confirming that custom animated checkboxes are imported from a single React component rather than rewritten inline.

**Acceptance Scenarios**:

1. **Given** a developer editing DayCard, GlobalSetupCard, or CapstoneCard, **When** they inspect the checkbox elements, **Then** they see the `<Checkbox />` component being imported and reused.

---

### User Story 4 - Strict TypeScript Types (Priority: P3)

Developers should benefit from compile-time type safety when handling day completion states.

**Why this priority**: Reduces bugs during future feature expansion or metadata upgrades.

**Independent Test**: Compiling the TypeScript code via `npm run lint` or `tsc` and verifying no `any` flags are raised for `dayState`.

**Acceptance Scenarios**:

1. **Given** a developer editing `DayCard.tsx`, **When** they pass the `dayState` prop, **Then** TypeScript checks the shape of the day states against a defined type union.

---

### Edge Cases

- **Leading/Trailing Spaces**: When a user inputs profile names with spaces (e.g. `  Alice  `), they must be trimmed before validation.
- **Max Length**: Check if extremely long alphanumeric names are correctly truncated or prevented.
- **Theme Overrides**: Verify that the newly sized text remains readable under both regular state and completed/crossed-out states.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST ensure all text elements in the web interface have a font size of `text-[10px]` or larger.
- **FR-002**: System MUST validate local account names against alphanumeric patterns (`/^[a-zA-Z0-9 ]+$/`) during profile creation and renaming.
- **FR-003**: System MUST extract all custom animatable checkboxes into a reusable `<Checkbox />` component under `src/components/Checkbox.tsx`.
- **FR-004**: System MUST define explicit TypeScript interfaces for all Day States (e.g. `Day1State`, `Day2State`, etc.) and typing unions instead of `any`.

### Key Entities

- **ProfileName**: Client-side string representing the user profile name. Alphanumeric constraint enforced.
- **DayState**: Strongly typed structure tracking boolean checkboxes completed for a given Day.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of UI elements compile to a minimum font size of `10px` (`text-[10px]`).
- **SC-002**: Reusable checkbox logic reduces duplicate SVG inline markup in card files by 100%.
- **SC-003**: 100% of invalid user profile name inputs are blocked and raise validation warnings.

## Assumptions

- Storing sanitized profile names locally does not disrupt existing profiles saved in `localStorage`.
- Upgrading text size from `text-3xs` to `text-[10px]` will not cause grid breakage or layout overflow.
