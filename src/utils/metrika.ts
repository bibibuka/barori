// FILE: src/utils/metrika.ts
//
// Отложенная загрузка Яндекс.Метрики — только ПОСЛЕ согласия пользователя (блок C4/F12).
// Раньше счётчик с Вебвизором инициализировался прямо в <head> каждой страницы, то есть
// cookie и IP (персональные данные) обрабатывались до любого действия пользователя.
// Теперь скрипт подгружается динамически: при клике «Принять» в cookie-баннере
// либо на следующих визитах, если согласие уже сохранено в localStorage.

export const METRIKA_COUNTER_ID = 108174506;

/** Тот же ключ, что использует CookieBanner. */
export const CONSENT_STORAGE_KEY = 'barori_cookie_consent';

let loaded = false;

/**
 * Грузит tag.js и инициализирует счётчик. Идемпотентна.
 * Вызывать только при наличии согласия на аналитические cookie.
 */
export const loadMetrika = () => {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  // Официальный сниппет Метрики требует stub-очередь: init вызывается до загрузки tag.js.
  // Приводим к any — у очереди есть служебные поля .a и .l, которых нет в типе window.ym.
  const w = window as any;
  w.ym = w.ym || function (...args: unknown[]) { (w.ym.a = w.ym.a || []).push(args); };
  w.ym.l = Number(new Date());

  const src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_COUNTER_ID}`;
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }

  w.ym(METRIKA_COUNTER_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
};

/** Грузит счётчик, если согласие было дано ранее (повторный визит). */
export const loadMetrikaIfConsented = () => {
  try {
    if (localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted') loadMetrika();
  } catch {
    /* localStorage недоступен (приватный режим) — без согласия аналитику не грузим */
  }
};

/** Удаляет cookie Метрики (`_ym_*`) — при отказе от аналитики и при отзыве согласия. */
export const clearMetrikaCookies = () => {
  if (typeof document === 'undefined') return;
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie.split(';').forEach(entry => {
    const name = entry.split('=')[0].trim();
    if (!name.startsWith('_ym')) return;
    document.cookie = `${name}=; ${expired}`;
    document.cookie = `${name}=; ${expired}; domain=${location.hostname}`;
    document.cookie = `${name}=; ${expired}; domain=.${location.hostname}`;
  });
};

/**
 * Сброс решения по cookie: удаляет сохранённый выбор и cookie аналитики,
 * после перезагрузки баннер спросит снова. Это способ отозвать согласие
 * на аналитические cookie — он должен быть не сложнее, чем дать согласие.
 */
export const resetAnalyticsConsent = () => {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* приватный режим */
  }
  clearMetrikaCookies();
  location.reload();
};
