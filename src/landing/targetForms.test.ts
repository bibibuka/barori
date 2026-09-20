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

const { TaxiForm } = await vite.ssrLoadModule('/src/taxi/TaxiForm.tsx');
const { SmenaForm } = await vite.ssrLoadModule('/src/smena/SmenaForm.tsx');
const taxiHtml = renderToStaticMarkup(createElement(TaxiForm));
const smenaHtml = renderToStaticMarkup(createElement(SmenaForm));

test('taxi asks only for the relevant vehicle setup', () => {
  assert.match(taxiHtml, /Какой автомобиль будет у вас/);
  assert.match(taxiHtml, /Свой автомобиль/);
  assert.match(taxiHtml, /Нужна аренда/);
  assert.match(taxiHtml, /Пока не решил/);
});

test('Yandex Smena asks for the preferred shift type', () => {
  assert.match(smenaHtml, /Какие смены интересуют/);
  assert.match(smenaHtml, /Любая доступная/);
  assert.match(smenaHtml, /Склад и выкладка/);
  assert.match(smenaHtml, /Клининг/);
});
