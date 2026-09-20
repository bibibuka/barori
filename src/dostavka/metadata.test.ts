import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../../dostavka/index.html', import.meta.url), 'utf8');
const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
const description = html.match(/<meta name="description"\s+content="([^"]+)"/i)?.[1] ?? '';

test('advertises every transport format in the delivery search snippet', () => {
  assert.equal(title, 'Работа в доставке: пешком, на самокате или авто | Барори Парк');
  assert.match(description, /посылки, документы и грузы/i);
  assert.match(description, /пешком, на велосипеде, самокате или автомобиле/i);
});

test('does not publish a prohibited brand name or guaranteed income in metadata', () => {
  assert.doesNotMatch(`${title} ${description}`, /Яндекс Доставка|гарантированн|зарплат/i);
});

// Страница только про доставку: еда уехала на свой лендинг /eda/.
test('keeps food delivery out of the delivery page metadata', () => {
  assert.doesNotMatch(`${title} ${description}`, /(?<![а-яё])ед[аыой]|продукт/i);
});
