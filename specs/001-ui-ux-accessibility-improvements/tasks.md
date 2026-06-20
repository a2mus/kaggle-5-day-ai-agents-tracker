# Tasks: UI/UX Accessibility & Code Refactoring

**Input**: Design documents from `specs/001-ui-ux-accessibility-improvements/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify existing build system and lint configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 Define DayState and UserProfile interfaces in src/types.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Readable Text Sizes (Priority: P1) 🎯 MVP

**Goal**: Upgrade all micro-texts (below 10px) to at least 10px or 12px for WCAG compliance.

**Independent Test**: Visually inspect footers, subtitles, metadata, and sidebars to confirm text is readable.

### Implementation for User Story 1

- [ ] T003 [US1] Upgrade text sizes from text-3xs/text-4xs to text-[10px] or text-xs in src/App.tsx
- [ ] T004 [P] [US1] Upgrade text sizes from text-3xs/text-4xs to text-[10px] or text-xs in src/components/UserProfileCard.tsx
- [ ] T005 [P] [US1] Upgrade text sizes from text-3xs to text-[10px] or text-xs in src/components/ProgressBar.tsx

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Sanitized Local Profile Names (Priority: P2)

**Goal**: Add client-side validation to block special characters and empty values from usernames.

**Independent Test**: Attempt to submit invalid strings and verify validation alerts.

### Implementation for User Story 2

- [ ] T006 [US2] Implement regex-based alphanumeric validation in handleCreateSubmit under src/components/UserProfileCard.tsx
- [ ] T007 [US2] Implement regex-based alphanumeric validation in handleSaveRename under src/components/UserProfileCard.tsx

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Unified Code Base (Checkbox Refactor) (Priority: P2)

**Goal**: Extract checkbox code into a reusable `<Checkbox />` component.

**Independent Test**: Verify checkbox animations and functional triggers work identical to previous behavior.

### Implementation for User Story 3

- [ ] T008 [US3] Implement modular checkbox markup and transitions in src/components/Checkbox.tsx
- [ ] T009 [US3] Refactor custom checkbox code in src/components/DayCard.tsx to use new Checkbox component
- [ ] T010 [P] [US3] Refactor custom checkbox code in src/components/GlobalSetupCard.tsx to use new Checkbox component
- [ ] T011 [P] [US3] Refactor custom checkbox code in src/components/CapstoneCard.tsx to use new Checkbox component

**Checkpoint**: Checkboxes are modularized across the app.

---

## Phase 6: User Story 4 - Strict TypeScript Types (Priority: P3)

**Goal**: Strongly type `dayState` prop instead of `any`.

**Independent Test**: Confirm compilation checks pass.

### Implementation for User Story 4

- [ ] T012 [US4] Strongly type dayState prop with new types union in src/components/DayCard.tsx

**Checkpoint**: Strict compilation succeeds.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verification and final builds

- [ ] T013 Run npm run lint to verify type safety
- [ ] T014 Run npm run build to check compilation
- [ ] T015 Run quickstart.md validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2)
- **User Story 4 (P3)**: Can start after Foundational (Phase 2)
- **Polish (Phase 7)**: Depends on completion of all implementation phases.

### Parallel Opportunities

- Setup tasks and Foundational types can be checked.
- Once Foundational completes, User Story 1, 2, 3, 4 can be developed in parallel (if staffing permits).
- Within US3, refactoring setup, capstone, and day cards can run in parallel once Checkbox.tsx is built.
