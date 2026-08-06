# Direct Delivery Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Полностью заменить `/dostavka/` продающим и юридически аккуратным лендингом всех направлений доставки для трафика из Яндекс Директа.

**Architecture:** Контент направлений хранится в одном типизированном модуле и используется страницей и формой. Существующий общий каркас лендингов, отправка заявки, юридические модалки, cookie и аналитика сохраняются. Меняется композиция `CourierLanding`, словарь кампаний и список направлений формы.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4, framer-motion, node:test.

## Global Constraints

- Не использовать название «Яндекс Доставка» в видимом тексте.
- Не называть ориентиры партнёрского вознаграждения гарантированной зарплатой.
- Сохранить существующие URL, форму, согласие, SmartCaptcha, UTM и `yclid`.
- Не добавлять новые runtime-зависимости.
- Сохранить старый рекламный параметр `direction=yandex-eda`, сопоставив его с «Еда и продукты».

---

### Task 1: Типизированный контент направлений

**Files:**
- Create: `src/dostavka/directions.ts`
- Create: `src/dostavka/directions.test.ts`
- Modify: `src/dostavka/campaign.ts`
- Modify: `src/dostavka/campaign.test.ts`

**Interfaces:**
- Produces: `DELIVERY_DIRECTIONS`, `DELIVERY_FORMATS`, `DeliveryDirection`.

- [ ] **Step 1: Написать падающие тесты**

```ts
test('contains every delivery direction and all facts from the main page', () => {
  assert.deepEqual(DELIVERY_DIRECTIONS.map(item => item.id), [
    'food', 'express', 'planned', 'auto', 'cargo', 'velo-helper'
  ]);
  assert.match(JSON.stringify(DELIVERY_DIRECTIONS), /4 000 ₽/);
  assert.match(JSON.stringify(DELIVERY_DIRECTIONS), /7 000 ₽/);
  assert.match(JSON.stringify(DELIVERY_DIRECTIONS), /10 заказов/);
});
```

- [ ] **Step 2: Запустить тест и подтвердить ожидаемое падение**

Run: `node --test src/dostavka/directions.test.ts`
Expected: FAIL because `directions.ts` does not exist.

- [ ] **Step 3: Добавить минимальный типизированный модуль и совместимость кампаний**

```ts
export const DELIVERY_DIRECTIONS = [
  { id: 'food', title: 'Еда и продукты', reward: 'Условия зависят от сервиса и города' },
  { id: 'express', title: 'Экспресс-доставка', reward: 'Ориентир от 4 000 ₽ за день' },
  { id: 'planned', title: 'Плановая доставка', reward: 'Ориентир от 7 000 ₽ за день' },
  { id: 'auto', title: 'Автодоставка', reward: 'Условия зависят от маршрута и города' },
  { id: 'cargo', title: 'Грузовая доставка', reward: 'Ориентир от 6 000 ₽ за день' },
  { id: 'velo-helper', title: 'Велопомощник', reward: 'Ориентир от 4 000 ₽ за день' },
] as const;
```

- [ ] **Step 4: Запустить тесты направления и кампаний**

Run: `node --test src/dostavka/directions.test.ts src/dostavka/campaign.test.ts`
Expected: PASS.

### Task 2: Новая рекламная композиция

**Files:**
- Modify: `src/dostavka/CourierLanding.tsx`
- Modify: `src/dostavka/CourierForm.tsx`
- Create: `src/assets/delivery-hero.webp`

**Interfaces:**
- Consumes: `DELIVERY_DIRECTIONS`, `DELIVERY_FORMATS`, `CourierFormController`.
- Produces: SSR-доступную страницу с синхронным выбором направления и формата.

- [ ] **Step 1: Написать падающий SSR-тест состава страницы**

```ts
test('renders all Direct landing sections without the prohibited brand name', () => {
  assert.match(html, /Все направления доставки/);
  assert.match(html, /Велопомощник/);
  assert.doesNotMatch(html, /Яндекс Доставка/);
});
```

- [ ] **Step 2: Запустить тест и подтвердить падение на старой странице**

Run: `node --test src/dostavka/CourierLanding.test.ts`
Expected: FAIL because the new heading and complete direction set are missing.

- [ ] **Step 3: Заменить старую композицию**

Implement the approved section order, use semantic headings, native buttons and `details` where disclosure is needed. Keep all content in the DOM and use animation only as progressive enhancement.

- [ ] **Step 4: Синхронизировать форму**

Add `Велопомощник`, remove the visible `Яндекс Еда` option, and retain old URL compatibility in `campaign.ts`.

- [ ] **Step 5: Запустить SSR и unit-тесты**

Run: `npm test`
Expected: PASS with zero failures.

### Task 3: Мета-тексты и рекламная юридическая подача

**Files:**
- Modify: `dostavka/index.html`

**Interfaces:**
- Produces: корректные title, description and Open Graph copy for advertising traffic.

- [ ] **Step 1: Добавить тест видимого и мета-текста**

```ts
assert.doesNotMatch(html, /Яндекс Доставка/);
assert.match(html, /пешком, на велосипеде, самокате или автомобиле/i);
```

- [ ] **Step 2: Обновить метаданные без обещаний гарантированного дохода**

Use the title `Работа в доставке: пешком, на самокате или авто | Барори Парк` and a description that lists food, parcels, planned and cargo directions.

- [ ] **Step 3: Запустить тесты и production build**

Run: `npm test && npm run build`
Expected: both commands exit 0.

### Task 4: Визуальная и функциональная проверка

**Files:**
- No production changes unless verification finds a defect.

- [ ] **Step 1: Проверить страницу на 360, 768 и 1440 px**

Use Playwright to open `/dostavka/`, scroll through every section, select formats and directions, and capture screenshots.

- [ ] **Step 2: Проверить формы и кампании**

Confirm both forms share selected values, `direction=yandex-eda` selects `Еда и продукты`, required consent remains unchecked, and no request is sent without consent.

- [ ] **Step 3: Проверить accessibility and performance basics**

Confirm one H1, keyboard focus visibility, no horizontal overflow, reduced-motion content visibility, reserved image dimensions and zero console errors.

- [ ] **Step 4: Выполнить финальную проверку**

Run: `npm test && npm run build`
Expected: PASS and exit 0.

