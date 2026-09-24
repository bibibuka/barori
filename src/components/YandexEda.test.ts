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

const { Vacancies, vacanciesData } = await vite.ssrLoadModule('/src/components/Vacancies.tsx');
const html = renderToStaticMarkup(createElement(Vacancies));
const { ContactForm } = await vite.ssrLoadModule('/src/components/ContactForm.tsx');
const { ToastProvider } = await vite.ssrLoadModule('/src/components/Toast.tsx');
const { DIRECTION_PREFERENCES, EMPLOYEE_SERVICES } = await vite.ssrLoadModule('/src/content/workDirections.ts');
const formHtml = renderToStaticMarkup(
  createElement(ToastProvider, null, createElement(ContactForm, { onOpenLegal: () => undefined })),
);

test('the showcase contains exactly four real work directions', () => {
  assert.equal(vacanciesData.length, 4);
  assert.equal((html.match(/<article/g) ?? []).length, 4);
  assert.deepEqual(
    vacanciesData.map((vacancy: { id: string; href: string }) => [vacancy.id, vacancy.href]),
    [
      ['delivery', '/dostavka/'],
      ['smena', '/smena/'],
      ['taxi', '/taxi/'],
      ['eda', '/eda/'],
    ],
  );
});

test('delivery explains all available services without multiplying vacancies', () => {
  const delivery = vacanciesData.find((vacancy: { id: string }) => vacancy.id === 'delivery');
  assert.ok(delivery, 'карточка доставки должна быть в витрине');
  assert.deepEqual(delivery.services, ['Яндекс Доставка', 'Купер', 'TopGo']);
  assert.match(html, /Яндекс Доставка/);
  assert.match(html, /Купер/);
  assert.match(html, /TopGo/);
});

test('the compact showcase has no filters or carousel controls', () => {
  assert.doesNotMatch(html, /swiper|vac-prev|vac-next|Выберите категорию/i);
});

test('the applicant form uses two compact selects for direction and its relevant follow-up', () => {
  assert.match(formHtml, /<fieldset/);
  assert.match(formHtml, /<select[^>]+id="contact-direction"/);
  assert.match(formHtml, /<select[^>]+id="contact-preference"/);
  assert.doesNotMatch(formHtml, /<input[^>]+name="direction"/);
  assert.doesNotMatch(formHtml, /<input[^>]+name="preference"/);
  assert.match(formHtml, /Доставка заказов/);
  assert.match(formHtml, /Подработка по сменам/);
  assert.match(formHtml, /Водитель такси/);
  assert.match(formHtml, /Курьер Яндекс Еды/);
  assert.match(formHtml, /Как будете доставлять/);
  assert.match(formHtml, /Пока не решил/);
  assert.doesNotMatch(formHtml, /Любые доступные/);
});

test('the optional message starts as one line and is prepared to grow with its content', () => {
  assert.match(formHtml, /<textarea[^>]+id="contact-message"[^>]+rows="1"/);
  assert.match(formHtml, /<textarea[^>]+id="contact-message"[^>]+overflow-hidden/);
});

test('the contact form uses compact responsive rows and a collapsed age note', () => {
  assert.match(formHtml, /<form[^>]+class="lead-form/);
  assert.match(formHtml, /data-testid="contact-primary-fields"[^>]+sm:grid-cols-2/);
  assert.match(formHtml, /data-testid="contact-phone-status"[^>]+sm:grid-cols-2/);
  assert.match(formHtml, /data-testid="contact-direction-preference"[^>]+sm:grid-cols-2/);
  assert.ok(formHtml.indexOf('id="contact-name"') < formHtml.indexOf('id="contact-city"'));
  assert.ok(formHtml.indexOf('id="contact-city"') < formHtml.indexOf('id="contact-phone"'));
  assert.match(formHtml, /<details[^>]+>.*<summary[^>]+>.*18\+.*Возраст и документы/s);
  assert.match(formHtml, /Большинство направлений — с 18 лет/);
});

test('every direction has the approved follow-up choices and support has the exact service list', () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(DIRECTION_PREFERENCES as Record<string, Array<{ label: string }>>)
        .map(([key, options]) => [key, options.map(option => option.label)]),
    ),
    {
      delivery: ['Пешком', 'Вело или самокат', 'Автомобиль', 'Пока не решил'],
      smena: ['Любые доступные', 'Сборка', 'Касса', 'Склад и выкладка', 'Кухня', 'Клининг'],
      taxi: ['На своём автомобиле', 'Нужна аренда', 'Пока не решил'],
      eda: ['Пешком', 'Вело или самокат', 'Автомобиль', 'Пока не решил'],
    },
  );
  assert.deepEqual(EMPLOYEE_SERVICES, [
    'Яндекс Доставка',
    'Яндекс Еда',
    'Яндекс Такси',
    'Яндекс Смена',
    'Купер',
    'TopGo',
    'Другое',
  ]);
});
