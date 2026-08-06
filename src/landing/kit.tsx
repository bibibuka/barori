// FILE: src/landing/kit.tsx
//
// Общий каркас изолированных лендингов направлений (/dostavka/, /taxi/, /smena/).
// Что здесь: оболочка страницы (шапка/футер/липкая кнопка/юрмодалки), общие секции
// и хук отправки заявки с капчей. Уникальный контент и поля формы — в самих лендингах.
//
// ВАЖНО про изоляцию: ни один элемент каркаса не ссылается на основной сайт —
// логотип не кликабельный, навигация только якорями внутри страницы.

import { createContext, useContext, useEffect, useRef, useState, lazy, Suspense } from 'react';
import { PhoneCall, Clock, MapPin } from 'lucide-react';
import { ToastProvider, useToast } from '../components/Toast';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { trackGoal } from '../utils/analytics';
import { CONSENT_VERSION } from '../utils/consent';
import { resetAnalyticsConsent } from '../utils/metrika';
import logo from '../assets/logo.webp';

type LegalType = import('../components/LegalModal').LegalType;
const LegalModal = lazy(() => import('../components/LegalModal').then(m => ({ default: m.LegalModal })));
const CookieBanner = lazy(() => import('../components/CookieBanner').then(m => ({ default: m.CookieBanner })));

export const PHONE_HREF = 'tel:+79219000997';
export const PHONE_TEXT = '+7 (921) 900 09 97';

/* ─────────────────────────────  КОНТЕКСТ  ───────────────────────────── */

interface LandingCtx {
  /** Цель Метрики с префиксом лендинга: track('cta_click', {...}) → courier_cta_click */
  track: (goal: string, params?: Record<string, string | number | boolean>) => void;
  openLegal: (type: LegalType) => void;
  scrollToOrder: (place: string) => void;
}

const Ctx = createContext<LandingCtx>({ track: () => {}, openLegal: () => {}, scrollToOrder: () => {} });
export const useLanding = () => useContext(Ctx);

/* ─────────────────────────────  ОБЩИЕ БЛОКИ  ───────────────────────────── */

/** Секция с появлением при скролле (классы из src/index.css). */
export const Section = ({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) => {
  const { ref, isVisible } = useScrollAnimation(0.08);
  return (
    <section id={id} ref={ref} className={`scroll-mt-24 fade-in-up ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  );
};

export const SectionTitle = ({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) => (
  <div className="max-w-3xl mx-auto text-center mb-10">
    {kicker && (
      <span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider">
        {kicker}
      </span>
    )}
    <h2 className="text-3xl lg:text-4xl font-bold uppercase leading-tight">{title}</h2>
    {subtitle && <p className="mt-3 text-gray-600 text-base lg:text-lg leading-relaxed">{subtitle}</p>}
  </div>
);

/** Карточка «иконка + заголовок + текст» — базовый кирпич всех лендингов. */
export const InfoCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-800 flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-bold font-oswald uppercase mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

/** Кнопка «к форме» — единая на всех лендингах. */
export const OrderButton = ({ place, children, className = '' }: { place: string; children: React.ReactNode; className?: string }) => {
  const { scrollToOrder } = useLanding();
  return (
    <button
      onClick={() => scrollToOrder(place)}
      className={`cursor-pointer inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-[var(--on-accent)] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-200 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

/** Аккордеон вопросов на нативном <details> — без JS и без библиотек. */
export const Faq = ({ id = 'faq', items, kicker = 'Вопросы', title }: {
  id?: string; items: { q: string; a: string }[]; kicker?: string; title: string;
}) => {
  const { track } = useLanding();
  return (
    <Section id={id} className="py-14 lg:py-20 bg-white">
      <div className="container mx-auto">
        <SectionTitle kicker={kicker} title={title} />
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map(item => (
            <details
              key={item.q}
              className="group bg-white border border-gray-200 rounded-2xl px-5 py-4 open:border-green-300 open:bg-green-50/40 transition-colors"
              onToggle={e => {
                if ((e.currentTarget as HTMLDetailsElement).open) track('faq_open', { question: item.q });
              }}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold font-oswald text-lg text-gray-800 marker:hidden">
                {item.q}
                <span className="shrink-0 text-green-800 text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed text-sm lg:text-base whitespace-pre-line">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ─────────────────────────────  ШАПКА / ФУТЕР  ───────────────────────────── */

const Header = ({ nav, ctaLabel }: { nav: { href: string; label: string }[]; ctaLabel: string }) => {
  const { track, scrollToOrder } = useLanding();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-3 px-4 lg:px-6 py-2.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-green-900/5">
          {/* Логотип НЕ ссылка — страница изолирована от основного сайта */}
          <img src={logo} alt="Барори Парк" className="h-8 lg:h-11 w-auto object-contain" />

          <nav className="hidden lg:flex items-center gap-7 font-medium text-gray-700">
            {nav.map(link => (
              <a key={link.href} href={link.href} className="relative group py-1">
                <span className="group-hover:text-green-800 transition-colors">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <a
              href={PHONE_HREF}
              onClick={() => track('phone_click', { place: 'header' })}
              className="flex items-center gap-2 font-bold text-gray-800 hover:text-green-800 transition-colors text-sm lg:text-base"
            >
              <span className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <PhoneCall size={17} className="text-green-800 animate-phone-ring" />
              </span>
              <span className="hidden sm:inline whitespace-nowrap">{PHONE_TEXT}</span>
            </a>
            <button
              onClick={() => scrollToOrder('header')}
              className="hidden sm:inline-flex cursor-pointer bg-green-600 hover:bg-green-700 text-[var(--on-accent)] px-5 lg:px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-green-200 whitespace-nowrap"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const DEFAULT_LEGAL_NOTE =
  'ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Сотрудничество оформляется договором с самозанятым или ИП и не является трудовыми отношениями. Информация на странице не является публичной офертой и гарантией дохода. 18+';

const Footer = ({ about, legalNote }: { about: string; legalNote: string }) => {
  const { track, openLegal } = useLanding();
  return (
    <footer className="bg-slate-900 text-white pt-14 pb-24 lg:pb-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <img src={logo} alt="Барори Парк" className="h-12 w-auto object-contain mb-4 brightness-0 invert opacity-90" />
            <p className="text-gray-400 text-sm leading-relaxed">{about}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold font-oswald uppercase text-lg">Контакты</h3>
            <a href={PHONE_HREF} onClick={() => track('phone_click', { place: 'footer' })} className="flex items-center gap-3 hover:text-green-400 transition-colors">
              <PhoneCall size={18} className="text-green-500 shrink-0" />
              <span className="font-bold">{PHONE_TEXT}</span>
            </a>
            <p className="flex items-center gap-3 text-gray-300 text-sm">
              <Clock size={18} className="text-green-500 shrink-0" /> Ежедневно 10:00-20:00
            </p>
            <p className="flex items-start gap-3 text-gray-300 text-sm">
              <MapPin size={18} className="text-green-500 shrink-0 mt-0.5" /> Санкт-Петербург, ул. Планерная 15Б, офис 2/13
            </p>
            <p className="text-gray-400 text-sm">info@baroripark.ru</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold font-oswald uppercase text-lg">Документы</h3>
            {([
              { type: 'offer' as const, label: 'Публичная оферта' },
              { type: 'policy' as const, label: 'Политика обработки персональных данных' },
              { type: 'consent' as const, label: 'Согласие на обработку ПД' },
            ]).map(doc => (
              <button
                key={doc.type}
                onClick={() => { track('legal_open', { type: doc.type, place: 'footer' }); openLegal(doc.type); }}
                className="block text-left text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
              >
                {doc.label}
              </button>
            ))}
            {/* Отзыв согласия на аналитические cookie — не сложнее, чем его дать */}
            <button
              onClick={resetAnalyticsConsent}
              className="block text-left text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Настройки cookie
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-xs text-gray-500 leading-relaxed space-y-2">
          <p>{legalNote}</p>
          <p>© 2026 Барори Парк. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────  ОБОЛОЧКА  ───────────────────────────── */

interface ShellProps {
  /** Префикс целей Метрики: 'courier' | 'taxi' | 'smena' */
  goalPrefix: string;
  nav: { href: string; label: string }[];
  ctaLabel: string;
  stickyLabel: string;
  footerAbout: string;
  legalNote?: string;
  children: React.ReactNode;
}

export const LandingShell = ({
  goalPrefix,
  nav,
  ctaLabel,
  stickyLabel,
  footerAbout,
  legalNote = DEFAULT_LEGAL_NOTE,
  children,
}: ShellProps) => {
  const [legalType, setLegalType] = useState<LegalType>(null);

  const ctx: LandingCtx = {
    track: (goal, params) => trackGoal(`${goalPrefix}_${goal}`, params),
    openLegal: setLegalType,
    scrollToOrder: place => {
      trackGoal(`${goalPrefix}_cta_click`, { place });
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  };

  return (
    <Ctx.Provider value={ctx}>
      <ToastProvider>
        <div className="min-h-screen bg-white">
          <Header nav={nav} ctaLabel={ctaLabel} />
          <main>{children}</main>
          <Footer about={footerAbout} legalNote={legalNote} />

          {/* Липкая кнопка отклика на мобильных.
              pb учитывает home indicator iPhone — иначе кнопка лежит прямо на нём. */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
            <a
              href={PHONE_HREF}
              onClick={() => ctx.track('phone_click', { place: 'sticky' })}
              aria-label="Позвонить"
              className="w-12 h-12 rounded-xl bg-green-50 text-green-800 flex items-center justify-center shrink-0 border border-green-200"
            >
              <PhoneCall size={20} />
            </a>
            <button
              onClick={() => ctx.scrollToOrder('sticky')}
              className="cursor-pointer flex-1 bg-green-600 text-[var(--on-accent)] font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 active:scale-[0.99] transition-transform"
            >
              {stickyLabel}
            </button>
          </div>

          <Suspense fallback={null}>
            <LegalModal type={legalType} onClose={() => setLegalType(null)} />
          </Suspense>

          <Suspense fallback={null}>
            {/* поднимаем над закреплённой кнопкой на мобильных */}
            <CookieBanner onOpenLegal={setLegalType} className="bottom-24 lg:bottom-4" />
          </Suspense>
        </div>
      </ToastProvider>
    </Ctx.Provider>
  );
};

/* ─────────────────────────────  ОТПРАВКА ЗАЯВКИ  ───────────────────────────── */

const CAPTCHA_SITEKEY = 'ysc1_ew6LWS0a0XeqfLY7YxmAH4rhPfAEpXi2mnVcvpPg58abfc86';

interface LeadOptions {
  /** Значение position для CRM — совпадает со справочником основной формы. */
  position: string;
  /** Метка источника заявки (поле type), чтобы оператор видел, с какого лендинга лид. */
  leadType: string;
  /** Вызывается только после успешной отправки — чтобы очистить поля (при ошибке ввод сохраняется). */
  onSuccess?: () => void;
}

/**
 * Капча + отправка заявки на /local/tools/form-handler.php.
 * Поля формы у каждого лендинга свои — передаются фабрикой в submit().
 * Согласие (факт, редакция, время) фиксируется здесь для всех лендингов одинаково — ст. 9 ФЗ-152.
 */
export const useLeadSubmit = ({ position, leadType, onSuccess }: LeadOptions) => {
  const { track } = useLanding();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const widgetIdRef = useRef<number | null>(null);
  const payloadRef = useRef<Record<string, string>>({});
  const consentRef = useRef(false);
  const consentTimestampRef = useRef('');
  // Капча зовёт колбэк из замыкания — держим ссылку на актуальную отправку.
  const sendRef = useRef<(token: string) => void>(() => {});

  // Ждём и загрузку скрипта капчи (defer в <head>), и монтирование контейнера.
  useEffect(() => {
    const render = () => {
      if (!window.smartCaptcha || widgetIdRef.current !== null) return;
      if (!document.getElementById('captcha-container')) return;
      widgetIdRef.current = window.smartCaptcha.render('captcha-container', {
        sitekey: CAPTCHA_SITEKEY,
        invisible: true,
        callback: (token: string) => sendRef.current(token),
      });
    };

    render();
    if (widgetIdRef.current !== null) return;

    const timer = setInterval(() => {
      render();
      if (widgetIdRef.current !== null) clearInterval(timer);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const send = async (token: string) => {
    setIsLoading(true);
    try {
      const data = new FormData();
      Object.entries(payloadRef.current).forEach(([key, value]) => data.append(key, value));
      data.append('type', leadType);
      data.append('status', 'Хочу устроиться');
      data.append('position', position);
      // отправляем реальное значение чекбокса, а не хардкод
      data.append('soglasie', consentRef.current ? 'Y' : 'N');
      data.append('consent_version', CONSENT_VERSION);
      data.append('consent_timestamp', consentTimestampRef.current);
      data.append('smart-token', token);

      const response = await fetch('/local/tools/form-handler.php', { method: 'POST', body: data });
      if (!response.ok) throw new Error('Server error');

      track('lead_success');
      showToast(`Заявка принята! Позвоним с номера ${PHONE_TEXT}. Ответьте, пожалуйста.`, 'success');
      onSuccess?.();
      return true;
    } catch (error) {
      console.error('Ошибка отправки:', error);
      showToast(`Что-то пошло не так. Позвоните нам: ${PHONE_TEXT}`, 'error');
      return false;
    } finally {
      if (window.smartCaptcha && widgetIdRef.current !== null) window.smartCaptcha.reset(widgetIdRef.current);
      setIsLoading(false);
    }
  };

  sendRef.current = send;

  /**
   * Запускает капчу и отправку. Вызывать только после успешной валидации полей
   * и при отмеченном чекбоксе согласия.
   */
  const submit = (payload: Record<string, string>, consent: boolean) => {
    // Страховка: без отмеченного согласия заявка не уходит ни при какой ошибке в форме.
    if (!consent) {
      showToast('Нужно согласие на обработку персональных данных', 'error');
      return;
    }
    payloadRef.current = payload;
    consentRef.current = consent;
    consentTimestampRef.current = new Date().toISOString();
    track('lead_submit');
    setIsLoading(true);

    if (window.smartCaptcha && widgetIdRef.current !== null) {
      window.smartCaptcha.execute(widgetIdRef.current);
    } else {
      console.error('Капча не загружена');
      showToast('Ошибка защиты от спама. Обновите страницу или позвоните нам.', 'error');
      setIsLoading(false);
    }
  };

  return { submit, isLoading, showToast };
};

/* ───────────────────────  ЭЛЕМЕНТЫ ФОРМЫ  ─────────────────────── */

export const inputClass =
  'ym-disable-keys w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-800 focus:border-green-800 outline-none transition-all';

/** Группа радио-кнопок в виде «плиток». */
export const ChoiceGroup = <T extends string>({ name, label, options, value, onChange, columns = 2, tone = 'green' }: {
  name: string;
  label?: string;
  options: { value: T; label: string }[];
  value: T | '';
  onChange: (value: T) => void;
  columns?: 1 | 2;
  tone?: 'green' | 'amber';
}) => {
  const active = tone === 'amber'
    ? 'border-amber-500 bg-amber-100 text-amber-900 ring-2 ring-amber-500'
    : 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-800';
  const idle = tone === 'amber'
    ? 'border-amber-300 bg-white text-amber-800 hover:border-amber-400'
    : 'border-gray-300 text-gray-600 hover:border-green-400';

  return (
    <div>
      {label && <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>}
      <div className={`grid gap-2 ${columns === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {options.map(option => (
          <label
            key={option.value}
            className={`flex items-center justify-center text-center px-3 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
              value === option.value ? active : idle
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

/** Чекбокс согласия на обработку ПД со ссылками на документы (обязателен на всех формах). */
export const ConsentCheckbox = ({
  checked,
  onChange,
  place,
  id = 'lead-consent',
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  place: string;
  id?: string;
}) => {
  const { track, openLegal } = useLanding();
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        required
        className="mt-1 w-4 h-4 rounded border-gray-300 accent-green-800 focus:ring-green-800"
      />
      <label htmlFor={id} className="text-xs sm:text-sm text-gray-500">
        Я даю{' '}
        <button type="button" onClick={() => { track('legal_open', { type: 'consent', place }); openLegal('consent'); }}
          className="text-green-800 underline hover:text-green-800">
          согласие на обработку персональных данных
        </button>{' '}
        и подтверждаю, что ознакомлен(а) с{' '}
        <button type="button" onClick={() => { track('legal_open', { type: 'policy', place }); openLegal('policy'); }}
          className="text-green-800 underline hover:text-green-800">
          Политикой обработки ПД
        </button>.
      </label>
    </div>
  );
};

/** Общая обёртка секции формы: слева продающий блок, справа поля. */
export const FormSection = ({ title, lead, bullets, image, children }: {
  title: string; lead: string; bullets: { icon: React.ReactNode; text: string }[]; image?: string; children: React.ReactNode;
}) => (
  <section id="order" className="scroll-mt-24 py-14 lg:py-20 bg-gradient-to-br from-green-50 via-green-50/40 to-white">
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl shadow-green-900/10 overflow-hidden flex flex-col lg:flex-row border border-green-100">
        <div className="lg:w-2/5 relative bg-green-700 p-6 lg:p-8 flex flex-col justify-center overflow-hidden">
          {image && (
            <img src={image} alt="" loading="lazy" decoding="async" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/40 to-transparent" />
          <div className="relative z-10 text-[var(--on-accent)]">
            <h2 className="text-3xl lg:text-4xl font-bold font-oswald uppercase leading-tight mb-3 drop-shadow">{title}</h2>
            <p className="text-[var(--on-accent-soft)] mb-6 leading-relaxed">{lead}</p>
            <ul className="space-y-3 text-sm lg:text-base">
              {bullets.map(item => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[var(--on-accent-soft)] shrink-0">{item.icon}</span>
                  <span className="text-[var(--on-accent-soft)]">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-3/5 p-5 lg:p-8">
          <div className="flex items-center gap-2 mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700">
            <span className="shrink-0 inline-flex items-center rounded-full bg-red-600 text-white font-bold leading-none text-xs px-2 py-1">18+</span>
            <p className="text-xs sm:text-sm font-semibold leading-snug">Заявки принимаем только от совершеннолетних.</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  </section>
);
