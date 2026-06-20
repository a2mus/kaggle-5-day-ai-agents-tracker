# Implementation Plan: UI/UX Accessibility & Code Refactoring

**Branch**: `001-ui-ux-accessibility-improvements` | **Date**: June 20, 2026 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-ui-ux-accessibility-improvements/spec.md`

## Summary
The goal of this feature is to address the accessibility, security, typing, and refactoring items identified during the brutal code and design review. Specifically, we will:
1. Increase all interface font sizes using `text-3xs` and `text-4xs` to a minimum of `text-[10px]` or `text-xs`.
2. Implement robust regex-based alphanumeric validation when creating and renaming profiles.
3. Extract all custom animated checkboxes into a modular `<Checkbox />` component.
4. Replace loose `any` types in `DayCard.tsx` with strongly typed React interfaces.

## Technical Context

**Language/Version**: TypeScript 5.8.2, React 19.0.1

**Primary Dependencies**: TailwindCSS 4.x, Lucide React, Motion (Framer Motion)

**Storage**: LocalStorage client-side storage

**Testing**: Manual browser verification

**Target Platform**: Modern Web Browsers

**Project Type**: React Web Application (Vite)

**Performance Goals**: Consistent 60fps animations, instant state updates

**Constraints**: Responsive design (desktop, tablet, mobile), offline-capable, WCAG AAA compliant font sizes (min 10px for metadata/footers)

**Scale/Scope**: Under 10 React components, single page client-side app

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

All design requirements are fully compliant with project principles:
- **Simplicity**: Consolidating duplicated checkbox code into one module.
- **Safety**: Adding type definitions and client-side sanitisation.

## Project Structure

### Documentation (this feature)

```text
specs/001-ui-ux-accessibility-improvements/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code

```text
src/
├── components/
│   ├── Checkbox.tsx     # New reusable component
│   ├── DayCard.tsx      # Uses strict typings & Checkbox
│   ├── GlobalSetupCard.tsx # Uses Checkbox
│   ├── CapstoneCard.tsx # Uses Checkbox
│   ├── UserProfileCard.tsx # Text size updates & sanitisation
│   ├── CelebrationToastList.tsx
│   └── ProgressBar.tsx  # Text size updates
├── App.tsx              # Text size updates
└── types.ts             # Strict state types and profile types
```

**Structure Decision**: Standard React component layout. The new `<Checkbox />` component will be created under `src/components/` and imported by card components.

## Complexity Tracking

No violations found. The implementation focuses strictly on simplifying the codebase and raising quality guidelines.
