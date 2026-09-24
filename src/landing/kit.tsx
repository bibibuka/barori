// Общий каркас страниц: навигация сайта, локальные секции и формы направлений.

import { createContext, useContext, useRef, useState, lazy, Suspense } from 'react';
import { PhoneCall } from 'lucide-react';
import { ToastProvider, useToast } from '../components/Toast';
import { TelegramIcon } from '../components/TelegramIcon';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSmartCaptcha } from '../hooks/useSmartCaptcha';
import { requireLeadSuccess } from '../utils/leadResponse';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { trackGoal } from '../utils/analytics';
import { CONSENT_VERSION } from '../utils/consent';
import maxIcon from '../assets/max-icon.svg';
import vkIcon from '../assets/vk-icon.svg';

type LegalType = import('../components/LegalModal').LegalType;
const LegalModal = lazy(() => import('../components/LegalModal').then(m => ({ default: m.LegalModal })));
const CookieBanner = lazy(() => import('../components/CookieBanner').then(m => ({ default: m.CookieBanner })));

export interface LandingPhone {
  href: string;
  text: string;
}

/** Доставка, еда и такси идут на один номер, смены — на свой. */
export const PHONE_DELIVERY: LandingPhone = { href: 'tel:+79990330037', text: '+7 (999) 033 00 37' };
export const PHONE_SMENA: LandingPhone = { href: 'tel:+79219000997', text: '+7 (921) 900 09 97' };

/** Боты те же, что в шапке основного сайта. */
const MESSENGERS = [
  { service: 'telegram', href: 'https://t.me/BaroriPark_Bot', title: 'Написать в Telegram', label: 'Пишите в Telegram' },
  { service: 'vk', href: 'https://vk.com/baroripark', title: 'ВК Бот', icon: vkIcon, label: 'Пишите во ВК' },
  { service: 'max', href: 'https://max.ru/id7814820277_bot', title: 'Max Бот', icon: maxIcon, label: 'Пишите в Max' },
] as const;

/* ─────────────────────────────  КОНТЕКСТ  ───────────────────────────── */

interface LandingCtx {
  /** Цель Метрики с префиксом лендинга: track('cta_click', {...}) → courier_cta_click */
  track: (goal: string, params?: Record<string, string | number | boolean>) => void;
  openLegal: (type: LegalType) => void;
  scrollToOrder: (place: string) => void;
  /** Телефон страницы: у каждого направления свой номер. */
  phone: LandingPhone;
}

const Ctx = createContext<LandingCtx>({
  track: () => {},
  openLegal: () => {},
  scrollToOrder: () => {},
  phone: PHONE_DELIVERY,
});
export const useLanding = () => useContext(Ctx);

/** Иконки мессенджеров — как на основном сайте, рядом с телефоном. */
export const Messengers = ({ place, className = '', size = 'h-9 w-9', labeled = false }: {
  place: string; className?: string; size?: string; labeled?: boolean;
}) => {
  const { track } = useLanding();
  if (labeled) {
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        {MESSENGERS.map(item => (
          <a
            key={item.service}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('messenger_click', { service: item.service, place })}
            aria-label={item.title}
            className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-white px-1 py-3 text-center shadow-sm active:scale-[0.98]"
          >
            <span className="h-14 w-14 overflow-hidden rounded-full">
              {'icon' in item
                ? <img src={item.icon} alt="" className="h-full w-full rounded-full object-cover" />
                : <TelegramIcon className="h-full w-full" />}
            </span>
            <span className="text-[11px] font-bold leading-tight text-green-900 sm:text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {MESSENGERS.map(item => (
        <a
          key={item.service}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('messenger_click', { service: item.service, place })}
          title={item.title}
          aria-label={item.title}
          className={`${size} shrink-0 overflow-hidden rounded-full shadow-sm transition-transform hover:scale-110 active:scale-95`}
        >
          {'icon' in item
            ? <img src={item.icon} alt="" className="h-full w-full rounded-full object-cover" />
            : <TelegramIcon className="h-full w-full" />}
        </a>
      ))}
    </div>
  );
};

/* ─────────────────────────────  ОБЩИЕ БЛОКИ  ───────────────────────────── */

/**
 * Секция с появлением при скролле (классы из src/index.css).
 * Вертикальный ритм задан здесь, а не на каждой странице: py-16 на десктопе —
 * общий шаг для всех лендингов направлений.
 */
export const Section = ({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) => {
  const { ref, isVisible } = useScrollAnimation(0.08);
  return (
    <section id={id} ref={ref} className={`scroll-mt-24 fade-in-up py-14 lg:py-16 ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  );
};

/**
 * Единая шапка секции: кикер с линией, заголовок, подзаголовок.
 * Один компонент на все четыре лендинга — заголовки везде стоят по левому краю
 * контейнера и имеют одинаковый ритм (кикер → 16px → h2 → 16px → подзаголовок).
 */
export const SectionHead = ({ kicker, title, subtitle, className = 'max-w-3xl' }: {
  kicker?: string; title: string; subtitle?: string; className?: string;
}) => (
  <div className={className}>
    {kicker && (
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-green-800">
        <span aria-hidden="true" className="h-px w-8 bg-green-600/45" />
        {kicker}
      </p>
    )}
    <h2 className="mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em] text-slate-950">
      {title}
    </h2>
    {subtitle && <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{subtitle}</p>}
  </div>
);

/** Карточка «остались вопросы» — стоит рядом с шапкой FAQ, чтобы верхний ряд был заполнен. */
const FaqContact = ({ place }: { place: string }) => {
  const { track, scrollToOrder, phone } = useLanding();
  return (
    <div className="lg:col-span-5">
      <div className="rounded-[18px] border border-green-200 l-glass p-6">
        <p className="font-oswald text-xl font-bold uppercase text-slate-950">Не нашли свой вопрос?</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Позвоните, напишите в мессенджер или оставьте заявку — ответим и подскажем.</p>
        <Messengers place={place} className="mt-4" />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={phone.href}
            onClick={() => track('phone_click', { place })}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green-700 px-5 text-sm font-bold text-[var(--on-accent)] transition-colors hover:bg-green-600"
          >
            <PhoneCall size={17} /> {phone.text}
          </a>
          <button
            type="button"
            onClick={() => scrollToOrder(place)}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-green-700 bg-white px-5 text-sm font-bold text-green-800 transition-colors hover:bg-green-700 hover:text-[var(--on-accent)]"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
};

/** Карточка «иконка + заголовок + текст» — базовый кирпич всех лендингов. */
export const InfoCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="l-glass p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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

/**
 * Аккордеон вопросов на нативном <details> — без JS и без библиотек.
 * Раскладка одна на всех четырёх лендингах: шапка 7 + карточка контакта 5,
 * под ними список в две колонки — так под коротким заголовком не остаётся пустой полосы.
 */
export const Faq = ({
  id = 'faq',
  items,
  kicker = 'Вопросы',
  title,
  subtitle = 'Если вашего вопроса нет в списке, оставьте заявку или позвоните. Консультация бесплатна.',
}: {
  id?: string; items: { q: string; a: string }[]; kicker?: string; title: string; subtitle?: string;
}) => {
  const { track } = useLanding();
  return (
    <Section id={id} className="l-tint">
      <div className="container mx-auto grid items-start gap-10 lg:grid-cols-12">
        <SectionHead kicker={kicker} title={title} subtitle={subtitle} className="lg:col-span-7" />
        <FaqContact place="faq" />
        <div className="space-y-3 lg:col-span-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
          {items.map(item => (
            <details
              key={item.q}
              className="group rounded-[16px] border border-slate-200 l-glass px-5 py-4 open:border-green-300"
              onToggle={e => {
                if ((e.currentTarget as HTMLDetailsElement).open) track('faq_open', { question: item.q });
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-oswald text-lg font-bold uppercase text-slate-900 marker:hidden">
                {item.q}
                <span className="shrink-0 text-2xl font-normal leading-none text-green-800 transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 whitespace-pre-line sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ─────────────────────────────  ШАПКА / ФУТЕР  ───────────────────────────── */

const DEFAULT_LEGAL_NOTE =
  'ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Сотрудничество оформляется договором с самозанятым или ИП и не является трудовыми отношениями. Информация на странице не является публичной офертой и гарантией дохода. 18+';

/* ─────────────────────────────  ОБОЛОЧКА  ───────────────────────────── */

interface ShellProps {
  /** Префикс целей Метрики: 'courier' | 'taxi' | 'smena' */
  goalPrefix: string;
  nav: { href: string; label: string }[];
  ctaLabel: string;
  stickyLabel: string;
  footerAbout: string;
  legalNote?: string;
  /** По умолчанию — номер доставки/еды/такси; смены передают свой. */
  phone?: LandingPhone;
  children: React.ReactNode;
}

export const LandingShell = ({
  goalPrefix,
  nav,
  ctaLabel,
  stickyLabel,
  legalNote = DEFAULT_LEGAL_NOTE,
  phone = PHONE_DELIVERY,
  children,
}: ShellProps) => {
  const [legalType, setLegalType] = useState<LegalType>(null);

  const ctx: LandingCtx = {
    track: (goal, params) => trackGoal(`${goalPrefix}_${goal}`, params),
    openLegal: setLegalType,
    phone,
    scrollToOrder: place => {
      trackGoal(`${goalPrefix}_cta_click`, { place });
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  };

  return (
    <Ctx.Provider value={ctx}>
      <ToastProvider>
        <div className="min-h-screen bg-white">
          <Header pageLinks={nav} phone={phone} ctaLabel={ctaLabel} onOrder={() => ctx.scrollToOrder('header')} />
          <main className="site-landing-main">{children}</main>
          <Footer onOpenLegal={setLegalType} legalNote={legalNote} />

          {/* Липкая кнопка отклика на мобильных.
              pb учитывает home indicator iPhone — иначе кнопка лежит прямо на нём. */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
            <a
              href={phone.href}
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
            <CookieBanner onOpenLegal={setLegalType} className="bottom-[calc(6rem+env(safe-area-inset-bottom))] lg:bottom-[calc(1rem+env(safe-area-inset-bottom))]" />
          </Suspense>
        </div>
      </ToastProvider>
    </Ctx.Provider>
  );
};

/* ─────────────────────────────  ОТПРАВКА ЗАЯВКИ  ───────────────────────────── */

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
  const { track, phone } = useLanding();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const payloadRef = useRef<Record<string, string>>({});
  const consentRef = useRef(false);
  const consentTimestampRef = useRef('');
  // Капча зовёт колбэк из замыкания — держим ссылку на актуальную отправку.
  const sendRef = useRef<(token: string) => void>(() => {});

  const captcha = useSmartCaptcha(token => sendRef.current(token), () => {
    setIsLoading(false);
    showToast('Проверка защиты не завершена. Попробуйте ещё раз или позвоните нам.', 'error');
  });

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

      const response = await fetch('/local/tools/form-handler.php', { method: 'POST', body: data, signal: AbortSignal.timeout(30000) });

      // Обработчик отвечает 200 даже когда отказал (например, не прошла капча), а на
      // неправильном пути вместо JSON придёт HTML. Поэтому верим только телу ответа:
      // иначе человек видит «Заявка принята», а заявки нет ни в Telegram, ни в CRM.
      await requireLeadSuccess(response);

      track('lead_success');
      showToast(`Заявка принята! Позвоним с номера ${phone.text}. Ответьте, пожалуйста.`, 'success');
      onSuccess?.();
      return true;
    } catch (error) {
      console.error('Ошибка отправки:', error);
      track('lead_error', { reason: error instanceof Error ? error.message : 'unknown' });
      showToast(`Заявка не отправлена. Позвоните нам: ${phone.text}`, 'error');
      return false;
    } finally {
      captcha.reset();
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
    if (!payload.name?.trim() || !payload.city?.trim() || !/^[+0-9() .\-]+$/.test(payload.phone ?? '') || !/^\d{10,15}$/.test((payload.phone ?? '').replace(/\D/g, ''))) {
      showToast('Укажите имя, город и корректный телефон: от 10 до 15 цифр', 'error');
      return;
    }
    payloadRef.current = payload;
    consentRef.current = consent;
    consentTimestampRef.current = new Date().toISOString();
    track('lead_submit');
    setIsLoading(true);

    captcha.execute();
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
    <fieldset>
      <legend className={label ? 'block text-sm font-medium text-gray-700 mb-1.5' : 'sr-only'}>{label || name}</legend>
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
    </fieldset>
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
export const FormSection = ({ title, lead, bullets, image, minAge = 18, children }: {
  title: string; lead: string; bullets: { icon: React.ReactNode; text: string }[]; image?: string;
  /** По умолчанию заявки только от совершеннолетних; в доставке есть направления с 16 лет. */
  minAge?: 16 | 18;
  children: React.ReactNode;
}) => (
  <section id="order" className="scroll-mt-24 py-14 lg:py-16 bg-gradient-to-br from-green-50 via-green-50/40 to-white">
    <div className="container mx-auto">
      {/* На десктопе карточка занимает всю ширину контейнера и делится 5/7, как остальные секции. */}
      <div className="max-w-5xl mx-auto lg:max-w-none bg-white rounded-3xl shadow-2xl shadow-green-900/10 overflow-hidden flex flex-col lg:flex-row border border-green-100">
        <div className="lg:w-5/12 relative bg-green-700 p-6 lg:p-10 flex flex-col justify-center overflow-hidden">
          {image && (
            <img src={image} alt="" loading="lazy" decoding="async" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay" />
          )}
          {/* Затемнение фото зависит от чернил темы: под белый текст тёмное, под тёмный — светлое. */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'var(--accent-scrim, linear-gradient(to top, rgba(15,23,42,.8), rgba(15,23,42,.4) 55%, transparent))' }}
          />
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

        <div className="lg:w-7/12 p-5 lg:p-10">
          <div className="flex items-center gap-2 mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700">
            <span className="shrink-0 inline-flex items-center rounded-full bg-red-600 text-white font-bold leading-none text-xs px-2 py-1">{minAge}+</span>
            <p className="text-xs sm:text-sm font-semibold leading-snug">
              {minAge === 18
                ? 'Заявки принимаем только от совершеннолетних.'
                : 'Заявки принимаем с 16 лет. До 18 лет — с согласия законного представителя.'}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  </section>
);
