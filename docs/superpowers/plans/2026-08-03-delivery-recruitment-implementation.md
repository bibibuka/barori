# Delivery Recruitment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact Yandex Eda recruitment block to the main site and replace `/dostavka/` with a Direct-ready landing page for all courier directions.

**Architecture:** Keep the existing React/Vite multi-page setup and shared landing shell. Add one focused main-site component, isolate campaign query parsing in a pure helper, and make the delivery form state shared between the hero and final form. Reuse the existing submission, consent, captcha, analytics, assets, and legal components.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Lucide React, Node built-in test runner.

## Global Constraints

- Preserve `/` and `/dostavka/` URLs, the main navigation labels, current legal text entry points, captcha, and cookie consent.
- Add no dependencies.
- Use the existing green/white Barori visual language and local images.
- General delivery claims must not promise one income, payout schedule, or legal format for every city and service.
- Yandex Eda-specific claims appear only in the Yandex Eda block and include scope qualifiers.
- The first-screen form must remain visible on desktop and the mobile sticky CTA must remain available.
- UTM and campaign parameters must be sent with the lead.

---

### Task 1: Campaign context parser

**Files:**
- Create: `src/dostavka/campaign.ts`
- Create: `src/dostavka/campaign.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `readCampaignContext(search: string): CampaignContext`
- Produces: `formatCampaignHeadline(context: CampaignContext): string`
- Produces: `CampaignContext` with `city`, `format`, `direction`, and `attribution`.

- [ ] **Step 1: Write failing tests**

Cover empty query defaults, recognised `format` and `direction` aliases, trimmed city values, a 60-character display limit, whitelisted UTM fields, and the resulting headline.

```ts
assert.deepEqual(readCampaignContext(''), {
  city: '',
  format: 'Пока не выбрал',
  direction: 'Подобрать направление',
  attribution: {},
});
assert.equal(
  formatCampaignHeadline(readCampaignContext('?format=auto&city=Санкт-Петербург')),
  'Автокурьер: Санкт-Петербург',
);
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test src/dostavka/campaign.test.ts`  
Expected: FAIL because `campaign.ts` does not exist.

- [ ] **Step 3: Implement the parser**

Use `URLSearchParams`, explicit maps for `foot`, `bike`, `auto`, `cargo`, `yandex-eda`, `food`, `express`, `planned`, and `cargo-delivery`, and an attribution allowlist containing `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `yclid`.

- [ ] **Step 4: Add and run the test script**

Add `"test": "node --test src/dostavka/campaign.test.ts"` to `package.json`, then run `npm test` and expect PASS.

### Task 2: Shared courier lead form and generic legal footer

**Files:**
- Modify: `src/dostavka/CourierForm.tsx`
- Modify: `src/landing/kit.tsx`

**Interfaces:**
- Produce: `CourierFormState` with `name`, `phone`, `city`, `format`, `direction`, and `consent`.
- Produce: `CourierLeadForm` props `{ idPrefix, state, onChange, onSubmit, isLoading, compact? }`.
- Modify: `LandingShell` accepts optional `legalNote?: string`; existing landings retain the current default.

- [ ] **Step 1: Replace Yandex-only validation with generic delivery validation**

Require name, phone, city, and consent. Remove mandatory self-employment and the optional free-text field. Keep `position: 'Курьер / Доставка'` and change `leadType` to `Курьер / Доставка (рекламный лендинг)`.

- [ ] **Step 2: Include campaign attribution in the payload**

Send `courier_format`, `delivery_direction`, whitelisted attribution fields, and a readable `message` fallback containing the selected format and direction.

- [ ] **Step 3: Render reusable form fields**

Use unique IDs from `idPrefix`; render one invisible captcha container for the shared submit hook; keep the consent buttons and form submission semantics.

- [ ] **Step 4: Make footer legal wording configurable**

Default to the existing self-employed/IP wording. For `/dostavka/`, pass wording that states the contract, tax status, and document requirements depend on the selected service.

- [ ] **Step 5: Run `npm test` and `npm run build`**

Expected: parser tests pass and all four Vite entries build.

### Task 3: Replace the Yandex-only delivery page with the universal funnel

**Files:**
- Rewrite: `src/dostavka/CourierLanding.tsx`

**Interfaces:**
- Consumes: `readCampaignContext`, `formatCampaignHeadline`, `CourierLeadForm`, and existing `LandingShell`, `Section`, `SectionTitle`, `Faq`, `useLanding`.
- Produces: shared `format` and `direction` selection used by both visible forms.

- [ ] **Step 1: Build the first screen**

Render campaign-aware H1, generic copy, format chips, phone CTA, real existing hero imagery as a background layer, and the compact lead form in the right column.

- [ ] **Step 2: Add the generic trust row and transport choices**

Use four trust items: flexible schedule, major Russian cities, foot/bike/auto formats, and Barori support. Clicking a transport card updates shared form state and tracks `courier_format_pick`.

- [ ] **Step 3: Add delivery direction cards**

Render food/products, express, planned, auto, and cargo delivery. Clicking a card updates shared state and tracks `courier_direction_pick`.

- [ ] **Step 4: Add the Yandex Eda section**

Keep only the verified useful subset: daily payouts for this direction, slots from four hours, Yandex Pro, three transport formats, medical-book help, and city-dependent conditions. CTA selects Yandex Eda and moves to the final form.

- [ ] **Step 5: Add park benefits, four start steps, honest requirements, reviews, and a short generic FAQ**

Remove the hardcoded hourly calculator and service-wide guarantees. Keep the page compact enough for advertising traffic.

- [ ] **Step 6: Add the final form using the same shared state**

The hero and final forms show the same values. Submitting either calls the same validation and captcha-backed submission function.

- [ ] **Step 7: Track campaign landing view**

On first mount, call `track('view', { format, direction, city })`; existing `LandingShell` prefixes the goal as `courier_view`.

- [ ] **Step 8: Run `npm test` and `npm run build`**

Expected: PASS.

### Task 4: Add Yandex Eda information to the main site

**Files:**
- Create: `src/components/YandexEdaSpotlight.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produce: `YandexEdaSpotlight()` with no props.
- CTA URL: `/dostavka/?direction=yandex-eda#apply`.

- [ ] **Step 1: Implement the compact spotlight**

Place a real courier image beside the heading, concise copy, four specific facts, and CTA. Track `yandex_eda_spotlight_click` before navigation.

- [ ] **Step 2: Insert after vacancies and before partners**

Lazy-load the component so the main hero bundle does not grow.

- [ ] **Step 3: Run `npm run build`**

Expected: main and delivery entries build without errors.

### Task 5: Advertising metadata and visual verification

**Files:**
- Modify: `dostavka/index.html`

**Interfaces:**
- Produce generic title, description, and Open Graph metadata for courier recruitment in major Russian cities.

- [ ] **Step 1: Replace Yandex-only metadata**

Use title `Работа курьером в крупных городах России | Барори Парк` and copy covering foot, bicycle, car, express, planned, food, and cargo delivery without an income guarantee. Keep `noindex, nofollow` because this is an ad-only page.

- [ ] **Step 2: Run automated verification**

Run `npm test`, `npm run build`, and `git diff --check` for the changed source files.

- [ ] **Step 3: Verify both live local pages**

Reload `http://127.0.0.1:5173/` and `http://127.0.0.1:5173/dostavka/?format=auto&city=Санкт-Петербург&utm_source=yandex`, inspect desktop and mobile widths, verify card selections synchronize forms, and confirm there is no horizontal overflow or console error.

- [ ] **Step 4: Review copy and final diff**

Confirm generic claims are not presented as universal guarantees, Yandex-specific facts remain scoped, and unrelated user changes are untouched.
