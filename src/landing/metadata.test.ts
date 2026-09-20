import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Наборы соцтегов на лендингах разъезжались (на /taxi/ и /smena/ их не было вовсе,
// и ссылка в мессенджере разворачивалась без картинки). Проверяем все четыре разом.
const PAGES = ['dostavka', 'eda', 'taxi', 'smena'] as const;

const REQUIRED = [
  'og:type', 'og:locale', 'og:site_name', 'og:url', 'og:title', 'og:description',
  'og:image', 'og:image:alt',
  'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image',
];

const html = Object.fromEntries(
  await Promise.all(PAGES.map(async page => [
    page,
    await readFile(new URL(`../../${page}/index.html`, import.meta.url), 'utf8'),
  ])),
) as Record<(typeof PAGES)[number], string>;

test('every landing ships the same social preview tags', () => {
  for (const page of PAGES) {
    for (const tag of REQUIRED) {
      assert.match(html[page], new RegExp(`"${tag}"`), `${page}: нет ${tag}`);
    }
    assert.match(html[page], new RegExp(`<meta property="og:url" content="https://baroripark\\.ru/${page}/"`));
  }
});

test('every landing stays out of search and carries its own theme colour', () => {
  const colours = new Set<string>();
  for (const page of PAGES) {
    assert.match(html[page], /<meta name="robots" content="noindex, nofollow"/);
    assert.match(html[page], new RegExp(`<html lang="ru" class="theme-${page}"`));
    const colour = html[page].match(/<meta name="theme-color" content="([^"]+)"/)?.[1] ?? '';
    assert.match(colour, /^#[0-9a-f]{6}$/, `${page}: нет theme-color`);
    colours.add(colour);
  }
  // Цвет направления у каждой страницы свой — еда и такси больше не делят жёлтый.
  assert.equal(colours.size, PAGES.length);
});
