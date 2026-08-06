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

const { ToastItem } = await vite.ssrLoadModule('/src/components/Toast.tsx');

test('announces an error toast and gives its close button an accessible name', () => {
  const html = renderToStaticMarkup(createElement(ToastItem, {
    toast: { id: 1, message: 'Проверьте телефон', type: 'error' },
    onRemove: () => undefined,
  }));

  assert.match(html, /role="alert"/);
  assert.match(html, /aria-live="assertive"/);
  assert.match(html, /aria-atomic="true"/);
  assert.match(html, /aria-label="Закрыть уведомление"/);
});

test('announces a success toast without interrupting the user', () => {
  const html = renderToStaticMarkup(createElement(ToastItem, {
    toast: { id: 2, message: 'Заявка отправлена', type: 'success' },
    onRemove: () => undefined,
  }));

  assert.match(html, /role="status"/);
  assert.match(html, /aria-live="polite"/);
});
