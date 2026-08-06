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

test('the offer sends traffic to the dedicated Yandex Eda landing', () => {
  assert.match(html, /href="\/eda\/#apply"/);
});

test('the embedded offer shows current slot and payout conditions', () => {
  assert.match(html, /Свободные и плановые слоты/);
  assert.match(html, /Свободные слоты — от 1 часа/);
  assert.doesNotMatch(html, /Выплаты по направлению ежедневно|Слоты начинаются от 4 часов/);
});
