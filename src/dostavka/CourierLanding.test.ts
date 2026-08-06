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

const { CourierPageContent } = await vite.ssrLoadModule('/src/dostavka/CourierLanding.tsx');
const html = renderToStaticMarkup(createElement(CourierPageContent));

test('renders a Direct-focused page with all delivery opportunities', () => {
  assert.match(html, /Все направления доставки/);
  assert.match(html, /Еда и продукты/);
  assert.match(html, /Экспресс-доставка/);
  assert.match(html, /Плановая доставка/);
  assert.match(html, /Автодоставка/);
  assert.match(html, /Грузовая доставка/);
  assert.match(html, /Велопомощник/);
  assert.match(html, /До 10 заказов на рейс/);
  assert.match(html, /Помощь курьерам с поломками/);
  assert.match(html, /Свободные слоты: от 1 часа при выполненном заказе/);
});

test('sends the food direction to its own landing instead of the page form', () => {
  assert.match(html, /href="\/eda\/"/);
  assert.match(html, /Открыть страницу/);
});

test('keeps advertising copy honest about the engagement model', () => {
  assert.doesNotMatch(html, /Яндекс Доставка/);
  assert.match(html, /Ориентир от 4 000 ₽ за день/);
  assert.match(html, /не является обещанием конкретного дохода/i);
  assert.match(html, /формат сотрудничества/i);
});

test('renders one primary heading and both application forms', () => {
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /id="apply"/);
  assert.match(html, /id="order"/);
  assert.equal((html.match(/aria-label="Заявка на работу курьером"/g) ?? []).length, 2);
});

test('renders a mobile route scene without removing the lead form', () => {
  assert.match(html, /data-testid="delivery-hero"/);
  assert.match(html, /data-testid="delivery-route-scene"/);
  assert.match(html, /delivery-route-path/);
  assert.match(html, /Пешком/);
  assert.match(html, /Вело/);
  assert.match(html, /Авто/);
  assert.match(html, /id="apply"/);
});

test('renders touch-first rails and varied editorial sections', () => {
  assert.match(html, /delivery-format-rail/);
  assert.match(html, /delivery-direction-grid/);
  assert.match(html, /delivery-route-steps/);
  assert.ok((html.match(/delivery-reveal/g) ?? []).length >= 6);
});

test('ships route motion, view reveals and a reduced-motion fallback', () => {
  assert.match(html, /@keyframes delivery-route-draw/);
  assert.match(html, /animation-timeline:\s*view\(\)/);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html, /\.delivery-route-path[\s\S]*animation:\s*none/);
  assert.match(html, /env\(safe-area-inset-bottom\)/);
});
