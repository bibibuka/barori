import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import logo from '../assets/logo.webp';
import maxIcon from '../assets/max-icon.svg';
import vkIcon from '../assets/vk-icon.svg';
import { TelegramIcon } from './TelegramIcon';
import { SiteNavigation, sitePages } from './SiteNavigation';
import { useModalDialog } from '../hooks/useModalDialog';
import { trackGoal } from '../utils/analytics';
import { currentSitePath, siteUrl } from '../utils/siteUrl';
import './Header.css';

const KnowledgeModal = lazy(() => import('./KnowledgeModal').then(m => ({ default: m.KnowledgeModal })));
const defaultPhone = { href: 'tel:+79219000997', text: '+7 (921) 900 09 97' };
const messengers = [
  { label: 'Telegram', href: 'https://t.me/BaroriPark_Bot', icon: null },
  { label: 'ВКонтакте', href: 'https://vk.com/baroripark', icon: vkIcon },
  { label: 'MAX', href: 'https://max.ru/id7814820277_bot', icon: maxIcon },
];

interface HeaderProps {
  onOpenKnowledge?: () => void;
  phone?: { href: string; text: string };
  ctaLabel?: string;
  onOrder?: () => void;
  pageLinks?: { href: string; label: string }[];
}

export const Header = ({ onOpenKnowledge, phone = defaultPhone, ctaLabel = 'Оставить заявку', onOrder, pageLinks = [] }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useModalDialog(menuOpen, menuButtonRef);
  const headerRef = useRef<HTMLElement>(null);
  const path = currentSitePath();
  const closeDropdowns = () => headerRef.current?.querySelectorAll('details[open]').forEach(menu => menu.removeAttribute('open'));

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)');
    const resize = () => { setMenuOpen(false); closeDropdowns(); };
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      headerRef.current?.querySelectorAll('details[open]').forEach(menu => {
        if (!menu.contains(target)) menu.removeAttribute('open');
      });
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      headerRef.current?.querySelector('details[open] summary')?.dispatchEvent(new FocusEvent('focus'));
      const summary = headerRef.current?.querySelector<HTMLElement>('details[open] summary');
      summary?.focus();
      closeDropdowns();
    };
    desktop.addEventListener('change', resize);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      desktop.removeEventListener('change', resize);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  const openKnowledge = () => {
    setMenuOpen(false);
    closeDropdowns();
    trackGoal('knowledge_open', { place: 'header' });
    if (onOpenKnowledge) onOpenKnowledge();
    else setKnowledgeOpen(true);
  };
  const contactLinks = (
    <div className="classic-header__messengers">
      {messengers.map(item => (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: item.label, place: 'header' })}>
          {item.icon ? <img src={item.icon} alt="" /> : <TelegramIcon />}
          {item.label}
        </a>
      ))}
    </div>
  );
  const orderLink = (mobile = false) => (
    <a className={`classic-header__cta${mobile ? ' classic-header__cta--menu' : ''}`} href="#order" onClick={event => {
      setMenuOpen(false);
      closeDropdowns();
      if (onOrder) { event.preventDefault(); onOrder(); }
      else trackGoal('cta_order_click', { place: 'header' });
    }}>{ctaLabel}</a>
  );

  return (
    <>
      <header ref={headerRef} className="classic-header">
        <div className="classic-header__row">
          <a href={siteUrl('/')} className="classic-header__logo" aria-label="Барори Парк — главная"><img src={logo} alt="Барори Парк" /></a>
          <details className="classic-header__dropdown classic-header__contact-tab" onBlur={event => {
            if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.open = false;
          }}>
            <summary>Связаться <ChevronDown size={15} /></summary>
            <div className="classic-header__popup classic-header__popup--tab">
              <a className="classic-header__popup-phone" href={phone.href} onClick={() => trackGoal('phone_click', { place: 'header_contacts' })}>
                <Phone size={20} aria-hidden="true" />{phone.text}
              </a>
              {contactLinks}
            </div>
          </details>
          <nav className="classic-header__desktop-nav" aria-label="Основная навигация">
            <details className="classic-header__dropdown" onBlur={event => {
              if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.open = false;
            }}>
              <summary>Направления <ChevronDown size={15} /></summary>
              <div className="classic-header__popup">
                {sitePages.slice(1, 5).map(page => <a key={page.href} href={siteUrl(page.href)} aria-current={path === page.href ? 'page' : undefined}>{page.label}</a>)}
                <a className="classic-header__separated" href={siteUrl('/#vacancies')}>Все вакансии</a>
              </div>
            </details>
            <a href={siteUrl('/tariffs/')} aria-current={path === '/tariffs/' ? 'page' : undefined}>Тарифы</a>
            <a href={siteUrl('/info/')} aria-current={path === '/info/' ? 'page' : undefined}>Условия</a>
            <a href={siteUrl('/#about')}>О нас</a>
            <button type="button" onClick={openKnowledge}>База знаний</button>
          </nav>
          <div className="classic-header__actions">
            <div className="classic-header__contact">
              <div className="classic-header__social">
                {messengers.map(item => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={`Написать в ${item.label}`} onClick={() => trackGoal('messenger_click', { service: item.label, place: 'header' })}>
                    {item.icon ? <img src={item.icon} alt="" /> : <TelegramIcon />}
                  </a>
                ))}
              </div>
              <a className="classic-header__phone" href={phone.href} aria-label={`Позвонить: ${phone.text}`} onClick={() => trackGoal('phone_click', { place: 'header' })}>
                <Phone className="classic-header__phone-icon" size={19} />
                <span className="classic-header__phone-text" aria-hidden="true">
                  {Array.from(phone.text).map((character, index) => (
                    <span key={`${character}-${index}`} className="classic-header__phone-character" style={{ animationDelay: `${index * 38}ms` }}>
                      {character === ' ' ? '\u00a0' : character}
                    </span>
                  ))}
                </span>
              </a>
            </div>
            {orderLink()}
            <button ref={menuButtonRef} type="button" className="classic-header__menu-button" aria-label="Открыть меню" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => { closeDropdowns(); setMenuOpen(true); }}><Menu size={25} /></button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <dialog ref={menuRef} id="site-menu" className="classic-menu" aria-label="Меню сайта" onCancel={event => { event.preventDefault(); setMenuOpen(false); }}>
          <div className="classic-menu__top"><a href={siteUrl('/')} aria-label="Барори Парк — главная"><img src={logo} alt="Барори Парк" /></a><button type="button" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}><X size={25} /></button></div>
          <div className="classic-menu__body">
            <SiteNavigation />
            <div className="classic-menu__secondary" onClick={() => setMenuOpen(false)}>
              <a href={siteUrl('/#about')}>О нас</a><a href={siteUrl('/#vacancies')}>Вакансии</a><button type="button" onClick={openKnowledge}>База знаний</button>
            </div>
            {pageLinks.length > 0 && <details className="classic-menu__sections"><summary>На этой странице</summary>{pageLinks.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}</details>}
            <div className="classic-menu__contacts"><a className="classic-menu__phone" href={phone.href} onClick={() => trackGoal('phone_click', { place: 'mobile_menu' })}>{phone.text}</a>{contactLinks}<a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты и офис</a></div>
            {orderLink(true)}
          </div>
        </dialog>
      )}
      {knowledgeOpen && <Suspense fallback={null}><KnowledgeModal isOpen onClose={() => setKnowledgeOpen(false)} /></Suspense>}
    </>
  );
};
