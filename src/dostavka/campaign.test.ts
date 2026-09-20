import assert from 'node:assert/strict';
import test from 'node:test';

import { formatCampaignHeadline, readCampaignContext } from './campaign.ts';

test('returns safe defaults without campaign parameters', () => {
  assert.deepEqual(readCampaignContext(''), {
    city: '',
    format: 'Пока не выбрал',
    direction: 'Подобрать направление',
    attribution: {},
  });
});

test('maps recognised format and direction aliases', () => {
  const context = readCampaignContext('?format=auto&direction=express');

  assert.equal(context.format, 'Автокурьер');
  assert.equal(context.direction, 'Экспресс-доставка');
});

// Велопомощник и еда с лендинга убраны, но старые объявления ещё могут вести с этими алиасами.
test('falls back to the picker for a retired direction alias', () => {
  assert.equal(readCampaignContext('?direction=velo-helper').direction, 'Подобрать направление');
  assert.equal(readCampaignContext('?direction=yandex-eda').direction, 'Подобрать направление');
});

test('trims display values and limits city length', () => {
  const context = readCampaignContext(`?city=${encodeURIComponent(`  ${'А'.repeat(70)}  `)}`);

  assert.equal(context.city, 'А'.repeat(60));
});

test('keeps only supported attribution parameters', () => {
  const context = readCampaignContext('?utm_source=yandex&utm_campaign=couriers&yclid=123&unsafe=value');

  assert.deepEqual(context.attribution, {
    utm_source: 'yandex',
    utm_campaign: 'couriers',
    yclid: '123',
  });
});

test('builds a campaign-aware headline without city declension', () => {
  const context = readCampaignContext(`?format=auto&city=${encodeURIComponent('Санкт-Петербург')}`);

  assert.equal(formatCampaignHeadline(context), 'Автокурьер: Санкт-Петербург');
});
