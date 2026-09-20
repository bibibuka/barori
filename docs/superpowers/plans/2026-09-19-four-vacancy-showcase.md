# Four Vacancy Showcase Implementation Plan

> **Required subskill:** Execute this plan task by task with `executing-plans`; use test-first checks and finish with `verification-before-completion`.

**Goal:** Replace the oversized vacancy catalog with four clear work directions and make every application form ask only the relevant service or work-format question.

**Architecture:** Keep one shared data model for the four directions and their choice lists. The home showcase reads that model, while the general form derives the submitted position and service from it. Target landing pages retain their own form controllers and add one native choice group each.

**Tech Stack:** React 18, TypeScript, Vite, existing landing-kit components, Node test runner, Playwright audit scripts.

**Global Constraints:** Preserve existing page copy, add no dependencies, keep native accessible controls, keep target landing pages and URLs, and avoid touching unrelated dirty worktree changes.

- [x] **Task 1: Lock the four-direction contract with a failing test**
  - Update `src/components/YandexEda.test.ts` to require exactly four showcase cards and the approved delivery services.
  - Run the focused test and confirm it fails against the current catalog.

- [x] **Task 2: Implement the shared direction model and compact showcase**
  - Add `src/content/workDirections.ts` with direction metadata, conditional options, defaults, and payload mapping.
  - Replace `src/components/Vacancies.tsx` with a responsive two-by-two/one-column showcase.
  - Remove the obsolete vacancy modal wiring from `src/App.tsx`.
  - Run the focused showcase test.

- [x] **Task 3: Add conditional choices to the general form**
  - Add a failing server-rendered form assertion for the four directions and the exact employee service list.
  - Update `src/components/ContactForm.tsx` so applicant choices change with the selected direction while entered contact data remains intact.
  - Verify accessible fieldsets, labels, payload values, and focused tests.

- [x] **Task 4: Add relevant choices to target landing forms**
  - Extend delivery and Yandex Food lead tests first, then add delivery service and transport to their state and payloads.
  - Add the approved vehicle choice to taxi and shift-type choice to Yandex Smena using the existing `ChoiceGroup`.
  - Keep `/tariffs/` unchanged.

- [x] **Task 5: Preserve detailed vacancy copy on target pages**
  - Keep delivery details on `/dostavka/` and add any missing legacy shift roles to `/smena/`.
  - Confirm all four showcase cards point to the correct target landing pages.

- [x] **Task 6: Verify desktop and mobile behavior**
  - Run the full test suite, TypeScript check, and production build.
  - Inspect the live localhost site at desktop, iPhone-size, and narrow Android-size viewports.
  - Check navigation, form choices, focus behavior, horizontal overflow, and fixed-element overlap.
