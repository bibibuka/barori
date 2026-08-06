# Dostavka Mobile Motion Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить `/dostavka/` в выразительный mobile-first лендинг с живой маршрутной сценой, разнообразным ритмом секций и безопасной motion-системой без изменения логики заявки.

**Architecture:** Все изменения остаются внутри существующего `CourierLanding.tsx`, чтобы не плодить компоненты ради одной страницы. Hero получает самостоятельную визуальную сцену, а остальные блоки — семантические CSS-маркеры для scroll-driven motion и мобильных горизонтальных лент; поведение форм и данные направлений не меняются.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, локальный CSS в компоненте, Lucide React, Node test runner, Vite SSR.

## Global Constraints

- Не добавлять зависимости и не менять API `useCourierLead`, `LandingShell`, кампаний или аналитики.
- Сохранить обе формы, юридический текст, cookie-сценарий и все шесть направлений доставки.
- Контент должен оставаться видимым без JavaScript; motion использует transform, opacity, clip-path и SVG stroke.
- `prefers-reduced-motion: reduce` отключает перемещение, scroll animation и smooth scroll.
- Проверить ширины 360, 390, 768 и 1440 px без горизонтального переполнения.

---

### Task 1: Mobile-first hero scene

**Files:**
- Modify: `src/dostavka/CourierLanding.test.ts`
- Modify: `src/dostavka/CourierLanding.tsx:93-159`

**Interfaces:**
- Consumes: `headline: string`, `controller: ReturnType<typeof useCourierLead>`, `heroImage`, `scrollToOrder()` и `PHONE_HREF`.
- Produces: hero с `data-testid="delivery-hero"`, сценой `data-testid="delivery-route-scene"` и прежним `id="apply"`.

- [ ] **Step 1: Write the failing hero test**

```ts
test('renders a mobile-first route scene without removing the lead form', () => {
  assert.match(html, /data-testid="delivery-hero"/);
  assert.match(html, /data-testid="delivery-route-scene"/);
  assert.match(html, /delivery-route-path/);
  assert.match(html, /Пешком/);
  assert.match(html, /Вело/);
  assert.match(html, /Авто/);
  assert.match(html, /id="apply"/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test src/dostavka/CourierLanding.test.ts`

Expected: FAIL because `data-testid="delivery-hero"` is absent.

- [ ] **Step 3: Implement the compact hero and route scene**

Add the required semantic attributes to the existing hero wrapper. Place this complete scene between the unchanged offer copy and the unchanged `id="apply"` form while retaining the existing handlers:

```tsx
<figure data-testid="delivery-route-scene" className="delivery-route-scene relative overflow-hidden">
  <img
    src={heroImage}
    alt="Курьеры пешего, вело- и автоформата перед началом работы"
    width="1536"
    height="1024"
    fetchPriority="high"
    decoding="async"
  />
  <svg aria-hidden="true" viewBox="0 0 320 480" className="delivery-route-map">
    <path className="delivery-route-path" pathLength="1" d="M34 420 C 90 350, 35 280, 126 238 S 250 174, 286 68" />
  </svg>
  <span className="delivery-route-chip delivery-route-chip--foot"><Footprints size={16} /> Пешком</span>
  <span className="delivery-route-chip delivery-route-chip--bike"><Bike size={16} /> Вело</span>
  <span className="delivery-route-chip delivery-route-chip--car"><Car size={16} /> Авто</span>
  <figcaption className="delivery-route-caption">Один запрос — разные варианты</figcaption>
</figure>
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test src/dostavka/CourierLanding.test.ts`

Expected: 4 tests pass.

### Task 2: Mobile section rhythm and touch-first rails

**Files:**
- Modify: `src/dostavka/CourierLanding.test.ts`
- Modify: `src/dostavka/CourierLanding.tsx:161-431`

**Interfaces:**
- Consumes: existing `DELIVERY_FORMATS`, `DELIVERY_DIRECTIONS`, `pickFormat()` and `pickDirection()`.
- Produces: `delivery-format-rail`, `delivery-direction-grid`, `delivery-route-steps` and `delivery-reveal` markers; button semantics and `aria-pressed` remain unchanged.

- [ ] **Step 1: Write the failing layout-marker test**

```ts
test('marks touch-first rails and editorial sections for responsive styling', () => {
  assert.match(html, /delivery-format-rail/);
  assert.match(html, /delivery-direction-grid/);
  assert.match(html, /delivery-route-steps/);
  assert.ok((html.match(/delivery-reveal/g) ?? []).length >= 6);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test src/dostavka/CourierLanding.test.ts`

Expected: FAIL because `delivery-format-rail` is absent.

- [ ] **Step 3: Add responsive markers without changing data flow**

Use the existing mapped controls and replace the current format-grid opening tag with this exact class list:

```tsx
<div className="delivery-format-rail mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-12 md:overflow-visible">
</div>
```

The opening and closing tags shown above wrap the existing `DELIVERY_FORMATS.map` block. Add `delivery-format-card min-w-[82vw] snap-center md:min-w-0` to each existing format button. Add `delivery-reveal` to the content wrapper of every major section, `delivery-direction-grid` to the direction list, and `delivery-route-steps` to the four-step sequence. Keep each selectable item as a real `<button>` with its existing event handler.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test src/dostavka/CourierLanding.test.ts`

Expected: 5 tests pass.

### Task 3: Purposeful motion and reduced-motion fallback

**Files:**
- Modify: `src/dostavka/CourierLanding.test.ts`
- Modify: `src/dostavka/CourierLanding.tsx:504-516`

**Interfaces:**
- Consumes: CSS markers produced in Tasks 1-2.
- Produces: keyframes `delivery-copy-in`, `delivery-route-draw`, `delivery-route-pulse`; native view-timeline enhancement and complete reduced-motion override.

- [ ] **Step 1: Write the failing motion-contract test**

```ts
test('ships route motion, view reveals and a reduced-motion fallback', () => {
  assert.match(html, /@keyframes delivery-route-draw/);
  assert.match(html, /animation-timeline:\s*view\(\)/);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html, /\.delivery-route-path[\s\S]*animation:\s*none/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test src/dostavka/CourierLanding.test.ts`

Expected: FAIL because `delivery-route-draw` is absent.

- [ ] **Step 3: Replace the single entrance animation with the page motion system**

Implement local CSS with a visible default and enhancement-only scroll motion:

```css
@keyframes delivery-copy-in {
  from { opacity: .35; transform: translateY(18px); clip-path: inset(0 0 12%); }
  to { opacity: 1; transform: none; clip-path: inset(0); }
}
@keyframes delivery-route-draw {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
.delivery-route-path {
  stroke-dasharray: 1;
  animation: delivery-route-draw 1.2s cubic-bezier(.16,1,.3,1) .25s both;
}
@supports (animation-timeline: view()) {
  .delivery-reveal {
    animation: delivery-section-in both cubic-bezier(.16,1,.3,1);
    animation-timeline: view();
    animation-range: entry 8% cover 28%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .delivery-hero-copy, .delivery-route-path, .delivery-route-chip, .delivery-reveal {
    animation: none !important;
    transform: none !important;
    clip-path: none !important;
  }
  html { scroll-behavior: auto !important; }
}
```

Also style the mobile route scene, safe-area bottom spacing, hover-capable interactions inside `@media (hover: hover)`, horizontal scrollbar suppression, and 360 px typography limits.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test src/dostavka/CourierLanding.test.ts`

Expected: 6 tests pass.

### Task 4: Regression and visual verification

**Files:**
- Verify: `src/dostavka/CourierLanding.tsx`
- Verify: `src/dostavka/CourierLanding.test.ts`

**Interfaces:**
- Consumes: completed page from Tasks 1-3.
- Produces: fresh evidence that the page builds, tests pass and responsive layouts are usable.

- [ ] **Step 1: Run all automated tests**

Run: `npm test`

Expected: all test files pass with 0 failures.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: Vite exits 0 and writes `dist/dostavka/index.html`.

- [ ] **Step 3: Check source diff and whitespace**

Run: `git diff --check -- src/dostavka/CourierLanding.tsx src/dostavka/CourierLanding.test.ts`

Expected: exit 0 with no output.

- [ ] **Step 4: Verify responsive browser states**

At `http://localhost:5173/dostavka/`, inspect 360×800, 390×844, 768×1024 and 1440×900. At each width verify `document.documentElement.scrollWidth === document.documentElement.clientWidth`, readable headings, an unobstructed form, working transport selection, the sticky CTA, and no console errors. At 390 px capture the hero after animation; at 1440 px capture the desktop hero.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`, reload the page and confirm the route, chips and reveal sections are immediately visible with no transform animation.

- [ ] **Step 6: Commit the implementation files only**

```bash
git add src/dostavka/CourierLanding.tsx src/dostavka/CourierLanding.test.ts
git commit -m "feat: refresh delivery landing motion and mobile layout"
```
