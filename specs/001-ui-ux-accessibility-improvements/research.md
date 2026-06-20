# Research: UI/UX Accessibility & Code Refactoring

## 1. Accessibility Font Size Standards
- **Problem**: The app currently uses custom font sizes like `text-3xs` and `text-4xs` which render text at 8px and 6px respectively. These fail accessibility guidelines (WCAG 2.1) and are unreadable on high-resolution displays.
- **Decision**: All micro-texts will be bumped to `text-[10px]` or `text-xs` (12px). We will use text weights and color hierarchy (like `text-neutral-500` vs `text-white`) instead of size truncation to format subtitles.
- **Alternatives Considered**: Using CSS browser-level zoom modifiers (rejected because it breaks flex alignments and is harder to manage than explicit Tailwind classes).

## 2. Reusable Checkbox Component Design
- **Problem**: Custom checkbox SVGs and transition classes are copy-pasted across three main file groups: `DayCard.tsx`, `GlobalSetupCard.tsx`, and `CapstoneCard.tsx`.
- **Decision**: Extract into a modular `<Checkbox />` component:
  ```typescript
  interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    colorScheme?: "indigo" | "emerald" | "amber";
    id: string;
  }
  ```
  This component will handle custom states, animations (Framer Motion transitions), and focus states dynamically.
- **Alternatives Considered**: Using a raw browser input element (rejected because the custom aesthetic and smooth transitions are key to the premium visual experience).

## 3. Profile Name Input Sanitisation
- **Problem**: Profiles are saved into local storage. Inputting special character arrays or tags can break the switcher layout or lead to DOM security risks.
- **Decision**: Validate all names with a strict alphanumeric check `/^[a-zA-Z0-9 ]+$/`. We will add helper messages below the rename/create inputs and set visual red borders on validation failure.
- **Alternatives Considered**: Automatically removing illegal characters at input-level (rejected because it creates a confusing typing experience compared to explicit submit-level validation warnings).

## 4. Strong Typing for Track Day States
- **Problem**: `DayCard.tsx` consumes a loose state typed as `any`.
- **Decision**: Extract proper interface types into `src/types.ts` representing the progress layout state of each day:
  ```typescript
  export interface DayState {
    [key: string]: boolean | string[];
  }
  ```
  Provide complete union typings for day states so compiler lint passes accurately.
