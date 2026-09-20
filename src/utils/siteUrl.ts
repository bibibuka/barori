// Корень сайта: «/» на baroripark.ru, «/barori/» на превью GitHub Pages (.env.pages).
// Внутренние ссылки пишем от корня ('/tariffs/') и пропускаем через siteUrl,
// чтобы одна и та же сборка кода работала и в корне домена, и в подпапке.
const SITE_ROOT = import.meta.env.VITE_SITE_ROOT || '/';

export const siteUrl = (path: string) => (path.startsWith('/') ? SITE_ROOT + path.slice(1) : path);

// Текущий адрес страницы без корня сайта: '/barori/tariffs/' → '/tariffs/'.
export const currentSitePath = () => {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return path.startsWith(SITE_ROOT) ? `/${path.slice(SITE_ROOT.length)}` : path;
};
