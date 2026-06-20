# Data Model: UI/UX Accessibility & Code Refactoring

## 1. UI Checkbox Contracts
The modular `<Checkbox />` component will enforce the following strict TypeScript contract:

```typescript
export interface CheckboxProps {
  /** Checked status of the target input */
  checked: boolean;
  /** Triggered when the user clicks the checkbox container */
  onChange: () => void;
  /** Context-specific color palette for checkbox active fill */
  colorScheme?: "indigo" | "emerald" | "amber";
  /** HTML input id to ensure browser testing validity */
  id: string;
}
```

## 2. Strong Day State Data Interfaces
We define structured interfaces in `src/types.ts` to replace loose references:

```typescript
export interface Day1State {
  skimMaterials: boolean;
  verifySetup: boolean;
  createKey: boolean;
  testStudio: boolean;
  day1Stream: boolean;
}

export interface Day2State {
  // list tasks...
}

// ... Similar structures for Day 3, Day 4, and Day 5

export type DayStateUnion = Day1State | Day2State | Day3State | Day4State | Day5State;
```

## 3. Profile Validation Constraints
Local profiles stored in the `localStorage` key `agents-tracker-profiles` must match this structure:

```typescript
export interface UserProfile {
  id: string;
  name: string;      // Max 24 chars, must match /^[a-zA-Z0-9 ]+$/
  avatarColor: string;
}
```
