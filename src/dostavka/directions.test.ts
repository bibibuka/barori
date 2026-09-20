import assert from 'node:assert/strict';
import test from 'node:test';

import { DELIVERY_DIRECTIONS, DELIVERY_FORMATS } from './directions.ts';

test('exposes every delivery route promised on the main site', () => {
  assert.deepEqual(
    DELIVERY_DIRECTIONS.map(direction => direction.id),
    ['express', 'planned', 'auto', 'cargo'],
  );

  const visibleContent = JSON.stringify(DELIVERY_DIRECTIONS);
  assert.match(visibleContent, /от 4 000 ₽ за день/);
  assert.match(visibleContent, /от 6 000 ₽ за день/);
  assert.match(visibleContent, /от 7 000 ₽ за день/);
  assert.match(visibleContent, /До 10 заказов на рейс/);
  assert.doesNotMatch(visibleContent, /Велопомощник/);
  assert.doesNotMatch(visibleContent, /Яндекс Доставка/);
});

// Еда живёт на отдельном лендинге /eda/ — на странице доставки её нет.
test('leaves food delivery to its own landing', () => {
  const content = JSON.stringify([...DELIVERY_DIRECTIONS, ...DELIVERY_FORMATS]);
  assert.doesNotMatch(content, /(?<![а-яё])ед[аыой]|продукт|\/eda\//i);
});

test('offers delivery on foot, bike, scooter, car and cargo vehicle', () => {
  assert.deepEqual(
    DELIVERY_FORMATS.map(format => format.value),
    ['Пеший курьер', 'Велокурьер', 'Автокурьер', 'Водитель грузовой доставки'],
  );
  assert.match(DELIVERY_FORMATS[1].label, /самокат/);
});
