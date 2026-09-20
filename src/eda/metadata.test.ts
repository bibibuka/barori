import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../../eda/index.html', import.meta.url), 'utf8');
const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
const description = html.match(/<meta name="description"\s+content="([^"]+)"/i)?.[1] ?? '';

test('advertises the delivery formats of the food direction', () => {
  assert.match(title, /курьером Яндекс Еды/i);
  assert.match(description, /пешком, на велосипеде, электротранспорте или авто/i);
  assert.match(description, /слоты/i);
});

test('stays out of search and promises no guaranteed income', () => {
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(`${title} ${description}`, /гарантированн|зарплат|ежедневные выплаты/i);
});

test('boots the isolated landing bundle', () => {
  assert.match(html, /src="\/src\/eda\/main\.tsx"/);
  assert.match(html, /smartcaptcha\.yandexcloud\.net\/captcha\.js/);
});
