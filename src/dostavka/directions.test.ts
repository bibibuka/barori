import assert from 'node:assert/strict';
import test from 'node:test';

import { DELIVERY_DIRECTIONS, DELIVERY_FORMATS } from './directions.ts';

test('exposes every delivery route promised on the main site', () => {
  assert.deepEqual(
    DELIVERY_DIRECTIONS.map(direction => direction.id),
    ['food', 'express', 'planned', 'auto', 'cargo', 'velo-helper'],
  );

  const visibleContent = JSON.stringify(DELIVERY_DIRECTIONS);
  assert.match(visibleContent, /от 4 000 ₽ за день/);
  assert.match(visibleContent, /от 6 000 ₽ за день/);
  assert.match(visibleContent, /от 7 000 ₽ за день/);
  assert.match(visibleContent, /До 10 заказов на рейс/);
  assert.match(visibleContent, /Помощь курьерам с поломками/);
  assert.match(visibleContent, /Свободные слоты: от 1 часа при выполненном заказе/);
  assert.match(visibleContent, /Плановые слоты: обычно 4-12 часов/);
  assert.doesNotMatch(visibleContent, /Яндекс Доставка/);
});

test('offers delivery on foot, bike, scooter, car and cargo vehicle', () => {
  assert.deepEqual(
    DELIVERY_FORMATS.map(format => format.value),
    ['Пеший курьер', 'Велокурьер', 'Автокурьер', 'Водитель грузовой доставки'],
  );
  assert.match(DELIVERY_FORMATS[1].label, /самокат/);
});
