# Yandex Eda Vacancies Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перенести актуализированную карточку Яндекс Еды внутрь секции вакансий и убрать самостоятельную секцию с главной страницы.

**Architecture:** Существующий `YandexEdaSpotlight` остаётся отдельным презентационным компонентом, но возвращает компактный `aside` без собственной секционной подложки. `Vacancies` рендерит его внутри своего контейнера, а `App` больше не импортирует и не размещает компонент отдельно. Текст на `/dostavka/` синхронизируется с той же проверенной формулировкой.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Node.js test runner, Vite.

## Global Constraints

- Не добавлять зависимости, состояния или новые абстракции.
- CTA сохраняет URL `/dostavka/?direction=yandex-eda#apply` и событие `yandex_eda_spotlight_click`.
- Не обещать ежедневные выплаты без условий.
- Указывать: свободные слоты — от 1 часа при выполненном заказе; плановые — обычно 4–12 часов.
- Не заявлять автоформат как универсально доступный формат Яндекс Еды; конкретный набор зависит от города.

---

### Task 1: Встроить и актуализировать карточку Яндекс Еды

**Files:**
- Create: `src/components/YandexEdaSpotlight.test.ts`
- Modify: `package.json`
- Modify: `src/App.tsx`
- Modify: `src/components/Vacancies.tsx`
- Modify: `src/components/YandexEdaSpotlight.tsx`
- Modify: `src/dostavka/CourierLanding.tsx`

**Interfaces:**
- Consumes: существующий `YandexEdaSpotlight(): JSX.Element`, контейнер `Vacancies`, CTA `/dostavka/?direction=yandex-eda#apply`.
- Produces: встроенную карточку `<YandexEdaSpotlight />` внутри `Vacancies` и одинаковые актуальные формулировки на главной и `/dostavka/`.

- [ ] **Step 1: Написать падающий контрактный тест**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false },
});

test.after(() => vite.close());

const { Vacancies } = await vite.ssrLoadModule('/src/components/Vacancies.tsx');
const html = renderToStaticMarkup(createElement(Vacancies, { onOpenModal: () => undefined }));

test('Vacancies renders the Yandex Eda offer inside its section', () => {
  const sectionStart = html.indexOf('<section id="vacancies"');
  const sectionEnd = html.lastIndexOf('</section>');
  const offerStart = html.indexOf('<aside');

  assert.ok(sectionStart >= 0);
  assert.ok(offerStart > sectionStart);
  assert.ok(offerStart < sectionEnd);
});

test('the embedded offer shows current slot and payout conditions', () => {
  assert.match(html, /Свободные и плановые слоты/);
  assert.match(html, /Свободные слоты — от 1 часа/);
  assert.doesNotMatch(html, /Выплаты по направлению ежедневно|Слоты начинаются от 4 часов/);
});
```

Добавить файл к существующей команде `npm test`:

```json
"test": "node --test src/components/YandexEdaSpotlight.test.ts src/dostavka/campaign.test.ts src/dostavka/lead.test.ts"
```

- [ ] **Step 2: Запустить тест и подтвердить ожидаемое падение**

Run: `npm test`

Expected: новые тесты падают по проверкам `offerStart > sectionStart` и отсутствию актуальных условий, потому что `YandexEdaSpotlight` пока не вложен в `Vacancies`.

- [ ] **Step 3: Выполнить минимальную структурную правку**

В `src/App.tsx` удалить ленивый импорт и отдельный `<YandexEdaSpotlight />` между вакансиями и партнёрами.

В `src/components/Vacancies.tsx` импортировать компонент:

```tsx
import { YandexEdaSpotlight } from './YandexEdaSpotlight';
```

И вывести его в конце внутреннего контейнера секции, после подсказки о свайпе:

```tsx
<YandexEdaSpotlight />
```

- [ ] **Step 4: Сделать компонент компактной встроенной карточкой**

Корень `YandexEdaSpotlight` заменить с самостоятельного `<section>` на:

```tsx
<aside
  className="mx-4 mt-8 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-lg shadow-green-900/5 lg:mx-12"
  aria-labelledby="yandex-eda-title"
>
```

Использовать заголовок «Курьер Яндекс Еды», форматы «Пешком» и «Вело и электротранспорт», а также три факта:

```tsx
const FACTS = [
  { icon: <CalendarClock size={19} />, text: 'Свободные и плановые слоты' },
  { icon: <MapPin size={19} />, text: 'Локацию выбираете в Яндекс Про' },
  { icon: <HeartPulse size={19} />, text: 'Поможем разобраться с оформлением' },
];
```

Под CTA вывести точную оговорку:

```tsx
Свободные слоты — от 1 часа при выполненном заказе; плановые — обычно 4–12 часов. Выплаты, доступность форматов и требования зависят от города и формы сотрудничества.
```

Сохранить CTA и обновить параметр аналитики `place` на `main_vacancies`.

- [ ] **Step 5: Синхронизировать текст на `/dostavka/`**

В блоке `YandexEda` заменить старый абзац на:

```tsx
Для курьеров Яндекс Еды доступны пеший формат, велосипед и электротранспорт; конкретный набор зависит от города. Свободные слоты — от 1 часа при выполненном заказе, плановые обычно рассчитаны на 4–12 часов. Заказы, маршруты и расписание доступны в Яндекс Про.
```

Заменить «Поможем с медицинской книжкой» на «Поможем разобраться с медицинской книжкой», а в примечании явно указать, что порядок выплат зависит от формы сотрудничества и условий парка.

- [ ] **Step 6: Запустить автоматические проверки**

Run: `npm test`

Expected: все тесты проходят.

Run: `npm run build`

Expected: Vite завершает production-сборку без TypeScript и bundler-ошибок.

- [ ] **Step 7: Проверить интерфейс в браузере**

Run: `npm run dev -- --host 127.0.0.1`

Проверить `http://127.0.0.1:5173/` на ширинах 390 px и 1440 px: карточка находится внутри зелёной секции вакансий, нет самостоятельной белой секции, текст не обрезан, CTA открывает `/dostavka/?direction=yandex-eda#apply`.

Проверить `http://127.0.0.1:5173/dostavka/?direction=yandex-eda#apply`: актуальный текст виден, форма и выбор направления работают, горизонтального переполнения нет.

- [ ] **Step 8: Зафиксировать реализацию**

```bash
git add package.json src/App.tsx src/components/Vacancies.tsx src/components/YandexEdaSpotlight.tsx src/components/YandexEdaSpotlight.test.ts src/dostavka/CourierLanding.tsx docs/superpowers/plans/2026-08-04-yandex-eda-vacancies-integration.md
git commit -m "feat: integrate Yandex Eda into vacancies"
```
