export const sitePages = [
  { href: '/', label: 'Главная' },
  { href: '/dostavka/', label: 'Доставка' },
  { href: '/eda/', label: 'Яндекс Еда' },
  { href: '/taxi/', label: 'Такси' },
  { href: '/smena/', label: 'Смена' },
  { href: '/tariffs/', label: 'Тарифы' },
  { href: '/info/', label: 'Условия' },
];

export const SiteNavigation = ({ footer = false }: { footer?: boolean }) => {
  const path = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return <div className={footer ? 'site-footer-navigation' : undefined}>
    <nav aria-label="Разделы сайта" className="site-links">
      {sitePages.map(page => <a key={page.href} href={page.href} aria-current={path === page.href ? 'page' : undefined}>{page.label}</a>)}
    </nav>
  </div>;
};
