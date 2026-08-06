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

const { EdaPageContent } = await vite.ssrLoadModule('/src/eda/EdaLanding.tsx');
const { validateEdaLead, buildEdaPayload } = await vite.ssrLoadModule('/src/eda/EdaForm.tsx');
const html = renderToStaticMarkup(createElement(EdaPageContent));

test('renders the Yandex Eda offer with transport formats and slot types', () => {
  assert.match(html, /data-testid="eda-hero"/);
  assert.match(html, /Курьер Яндекс Еды/);
  assert.match(html, /Пешком/);
  assert.match(html, /Велосипед или самокат/);
  assert.match(html, /Электротранспорт/);
  assert.match(html, /Свободный слот/);
  assert.match(html, /Плановый слот/);
  assert.match(html, /обычно 4–12 часов/i);
});

test('keeps the copy inside the approved Yandex Eda claims', () => {
  // Обещания, которые парк давать не может (см. спеку интеграции Яндекс Еды).
  assert.doesNotMatch(html, /выплаты ежедневно|ежедневные выплаты/i);
  assert.doesNotMatch(html, /зарплат/i);
  assert.doesNotMatch(html, /выдаём медицинскую книжку|оформим медкнижку/i);
  // На этой странице вообще нет сумм: любой ориентир дохода читается как обещание.
  assert.doesNotMatch(html, /₽/);
  assert.match(html, /не выдаём документ/i);
  assert.match(html, /Фиксированный доход не обещаем/i);
});

test('renders one primary heading and both application forms', () => {
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /id="apply"/);
  assert.match(html, /id="order"/);
  assert.equal((html.match(/aria-label="Заявка на работу курьером Яндекс Еды"/g) ?? []).length, 2);
});

test('ships motion with a reduced-motion fallback and safe-area scroll padding', () => {
  assert.match(html, /animation-timeline:\s*view\(\)/);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html, /env\(safe-area-inset-bottom\)/);
});

test('validates the lead before it can reach the CRM', () => {
  const base = { name: 'Иван', phone: '+79990000000', city: 'Казань', transport: 'Пешком', consent: true };

  assert.equal(validateEdaLead(base), null);
  assert.match(validateEdaLead({ ...base, name: ' ' }), /имя и телефон/i);
  assert.match(validateEdaLead({ ...base, phone: '12345' }), /не менее 10 цифр/i);
  assert.match(validateEdaLead({ ...base, phone: '1234567890123456' }), /от 10 до 15 цифр/i);
  assert.match(validateEdaLead({ ...base, city: '' }), /город/i);
  assert.match(validateEdaLead({ ...base, consent: false }), /согласие/i);
});

test('builds a payload the operator can route to the Yandex Eda direction', () => {
  const payload = buildEdaPayload(
    { name: ' Иван ', phone: ' +7 999 000-00-00 ', city: ' Казань ', transport: 'Электротранспорт', consent: true },
    { utm_source: 'yandex' },
  );

  assert.equal(payload.name, 'Иван');
  assert.equal(payload.city, 'Казань');
  assert.equal(payload.courier_format, 'Электротранспорт');
  assert.equal(payload.delivery_direction, 'Еда и продукты');
  assert.equal(payload.utm_source, 'yandex');
  assert.match(payload.message, /Яндекс Еда/);
});
