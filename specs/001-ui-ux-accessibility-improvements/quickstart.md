# Quickstart Verification Guide: UI/UX & Refactoring

This guide outlines runnable scenarios to prove that the accessibility, sanitisation, typing, and refactoring requirements are met.

## Prerequisites
Ensure the development server is running locally:
```bash
npm run dev
```

---

## Scenario 1: Accessibility Font Verification
1. Open the app in your browser (e.g. `http://localhost:3000`).
2. Inspect the page elements (right-click -> Inspect) for the footer text and the profile cards.
3. Verify that the font size matches `text-[10px]` or `text-xs` (12px), and no `text-3xs` or `text-4xs` classes exist in the DOM.

---

## Scenario 2: Alphanumeric Input Sanitisation
1. Open the profile selection drawer/panel.
2. Click **"Add Account"**.
3. Attempt to submit names with invalid symbols (e.g., `Jack!`, `AI_User`, `<script>`).
4. **Expected Outcome**: The interface displays a clear warning message indicating that only alphanumeric characters and spaces are allowed, and the submit action is blocked.

---

## Scenario 3: Functional Checkbox Regression Test
1. Click checkbox items across all three cards (Global Setup, Day Card, Capstone Card).
2. **Expected Outcome**: All checkboxes display correct color states (Emerald, Indigo, Amber), trigger smooth spring scaling animations, and update the global tracker progress bar successfully.

---

## Scenario 4: TypeScript Build Compilation
1. Run compilation check to verify typings are safe:
   ```bash
   npm run lint
   ```
2. **Expected Outcome**: The linter succeeds without errors (meaning `DayState` uses strict schemas and all components pass types).
