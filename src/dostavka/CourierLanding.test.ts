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
  assert.match(html, /Экспресс-доставка/);
  assert.match(html, /Плановая доставка/);
  assert.match(html, /Автодоставка/);
  assert.match(html, /Грузовая доставка/);
  assert.match(html, /До 10 заказов на рейс/);
  // Направление велопомощника с лендинга убрано.
  assert.doesNotMatch(html, /велопомощник/i);
});

// Страница только про доставку посылок и грузов: еда — на своём лендинге /eda/.
// Отрицательный lookbehind нужен, чтобы «передачей» не считалось словом «еда».
test('keeps food delivery off the page entirely', () => {
  assert.doesNotMatch(html, /(?<![а-яё])ед[аыой]|продукт|медицинск/i);
  assert.doesNotMatch(html, /href="\/eda\/"/);
});

test('opens delivery from 16 instead of the adults-only rule', () => {
  assert.match(html, /Возраст от 16 лет/);
  assert.match(html, /Заявки принимаем с 16 лет/);
  assert.doesNotMatch(html, /только от совершеннолетних/);
  assert.doesNotMatch(html, /18\+/);
});

test('keeps advertising copy honest about the engagement model', () => {
  assert.match(html, /Яндекс Доставка/);
  assert.match(html, /Купер/);
  assert.match(html, /TopGo/);
  assert.match(html, /Ориентир от 4 000 ₽ за день/);
  assert.match(html, /не является обещанием конкретного дохода/i);
  assert.match(html, /формат сотрудничества/i);
});

test('asks for a delivery service without sending the user to another vacancy', () => {
  assert.match(html, /Какой сервис интересует/);
  assert.match(html, /Подберите мне/);
});

test('renders one primary heading and a single application form', () => {
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /id="order"/);
  assert.equal((html.match(/aria-label="Заявка на работу курьером"/g) ?? []).length, 1);
  // Форма с первого экрана убрана — капча обязана монтироваться в оставшейся.
  assert.equal((html.match(/id="captcha-container"/g) ?? []).length, 1);
});

test('renders the route scene with all transport chips', () => {
  assert.match(html, /data-testid="delivery-hero"/);
  assert.match(html, /data-testid="delivery-route-scene"/);
  assert.match(html, /delivery-route-path/);
  assert.match(html, /Пешком/);
  assert.match(html, /Вело/);
  assert.match(html, /Авто/);
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
