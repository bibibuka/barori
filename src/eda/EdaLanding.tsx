// FILE: src/eda/EdaLanding.tsx
//
// Изолированный лендинг одного направления — КУРЬЕР ЯНДЕКС ЕДЫ (/eda/).
// Каркас (шапка, футер, юрмодалки, отправка заявки) — из src/landing/kit.tsx.
// Формулировки соответствуют docs/superpowers/specs/2026-08-04-yandex-eda-vacancies-integration-design.md:
// без обещаний фиксированного дохода, ежедневных выплат и выдачи медкнижки.

import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Bike,
  CalendarClock,
  Car,
  Check,
  CheckCircle2,
  Footprints,
  Headphones,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
import { Faq, LandingShell, SectionHead, useLanding } from '../landing/kit';
import courierImage from '../assets/kura.webp';
// Разбор utm/city из ссылки объявления — общий для рекламных лендингов парка.
import { readCampaignContext } from '../dostavka/campaign';
import { EdaFinalForm, EdaLeadForm, useEdaLead } from './EdaForm';
import '../landing/service-directions.css';

const TRANSPORT_CARDS: { id: string; icon: ReactNode; title: string; text: string }[] = [
  {
    id: 'foot',
    icon: <Footprints size={24} />,
    title: 'Пешком',
    text: 'Короткие маршруты рядом с точкой выдачи. Транспорт и права не нужны.',
  },
  {
    id: 'bike',
    icon: <Bike size={24} />,
    title: 'Велосипед или самокат',
    text: 'Больше точек за слот и шире зона доставки в пределах города.',
  },
  {
    id: 'electro',
    icon: <Zap size={24} />,
    title: 'Электротранспорт',
    text: 'Электровелосипед или самокат, если такой формат открыт в вашем городе.',
  },
  {
    id: 'auto',
    icon: <Car size={24} />,
    title: 'Автомобиль',
    text: 'Доставлять еду можно и на своём авто — набор заказов зависит от города и зоны.',
  },
];

const TRUST_ITEMS = [
  { icon: <CalendarClock size={20} />, title: 'Слоты на выбор', text: 'свободные и плановые' },
  { icon: <MapPin size={20} />, title: 'Локация в Яндекс Про', text: 'выбираете сами' },
  { icon: <ShieldCheck size={20} />, title: 'Условия до старта', text: 'без сюрпризов после' },
  { icon: <Headphones size={20} />, title: 'Поддержка парка', text: 'после подключения' },
];

const SLOTS = [
  {
    tag: 'Свободный слот',
    title: 'Начинаете, когда удобно',
    text: 'Слот можно открыть в подходящее время и закончить раньше. Он учитывается при длительности от одного часа и наличии выполненного заказа.',
    facts: ['Начало в удобное время', 'Учитывается от 1 часа', 'Нужен минимум один выполненный заказ'],
  },
  {
    tag: 'Плановый слот',
    title: 'Заранее занятое время',
    text: 'Слот бронируется заранее на определённый интервал. Обычно такие слоты рассчитаны на 4–12 часов, набор зависит от города и зоны.',
    facts: ['Бронь заранее', 'Обычно 4–12 часов', 'Набор зависит от города и зоны'],
  },
];

const STEPS = [
  { title: 'Оставьте контакты', text: 'Имя, телефон, город и удобный способ передвижения.' },
  { title: 'Проверим город', text: 'Скажем, какие форматы и зоны доставки открыты именно у вас.' },
  { title: 'Разберём оформление', text: 'Заранее сообщим форму сотрудничества и нужные документы.' },
  { title: 'Поможем начать', text: 'Подскажем по Яндекс Про, слотам и первым заказам после проверки сервиса.' },
];

const REQUIREMENTS = [
  'Возраст от 18 лет',
  'Гражданство РФ — иностранных граждан сервис не подключает',
  'Смартфон с доступом в интернет',
  'Медицинская книжка для доставки готовой еды',
  'Документы для выбранной формы сотрудничества',
  'Самозанятость — обязательное условие',
  'Свой транспорт — для вело-, электро- и автоформатов',
];

const FAQ = [
  {
    q: 'Можно работать без автомобиля?',
    a: 'Да. В Яндекс Еде доступны пеший формат, велосипед и электротранспорт. Если автомобиль есть — на нём тоже можно. Конкретный набор форматов зависит от города.',
  },
  {
    q: 'Можно ли иностранным гражданам?',
    a: 'Нет. Подключиться к Яндекс Еде могут только граждане РФ — иностранных граждан сервис не подключает.',
  },
  {
    q: 'Нужна ли самозанятость?',
    a: 'Да, это обязательное условие. Если статуса ещё нет, поможем разобраться с оформлением до подключения.',
  },
  {
    q: 'Как выбирают время работы?',
    a: 'В приложении Яндекс Про доступны свободные и плановые слоты. Свободный можно открыть в удобное время, плановый бронируется заранее и обычно рассчитан на 4–12 часов.',
  },
  {
    q: 'Как выбирается район доставки?',
    a: 'Локацию вы выбираете в Яндекс Про. Доступные зоны зависят от города и текущей загрузки сервиса.',
  },
  {
    q: 'Нужна ли медицинская книжка?',
    a: 'Для доставки готовой еды она нужна. Мы помогаем разобраться с подключением и оформлением, но не выдаём документ и не обещаем его получение.',
  },
  {
    q: 'Как происходят выплаты?',
    a: 'Порядок и частота выплат зависят от формы сотрудничества, банка и условий курьерского парка. Точные условия менеджер сообщит до подключения.',
  },
  {
    q: 'Сколько можно заработать?',
    a: 'Фиксированного дохода нет. Итог зависит от города, количества выполненных заказов, времени работы, спроса и условий сервиса, поэтому конкретную сумму мы не обещаем.',
  },
  {
    q: 'Нужен ли опыт?',
    a: 'Опыт не обязателен. Поможем разобраться с приложением, слотами и первыми заказами.',
  },
  {
    q: 'Заявка платная?',
    a: 'Нет. Заявка и консультация бесплатны. Возможные расходы на документы обсуждаются заранее.',
  },
];

const Hero = ({ controller }: { controller: ReturnType<typeof useEdaLead> }) => {
  const { track, scrollToOrder, phone } = useLanding();

  return (
    <section data-testid="eda-hero" className="eda-hero service-hero direction-hero">
      <div className="container mx-auto service-hero-grid">
        <div className="eda-hero-copy service-hero-copy">
          <p className="service-eyebrow direction-hero-eyebrow">
            <span aria-hidden="true" />
            Курьер Яндекс Еды, 18+
          </p>
          <h1 className="direction-hero-title">
            Доставляйте еду в своём городе
          </h1>
          <p className="service-lead">
            Пешком, на велосипеде, электротранспорте или авто. Слоты и локацию выбираете в Яндекс Про, а мы поможем
            разобраться с подключением и оформлением.
          </p>
          <div className="direction-hero-actions mt-6">
            <button
              type="button"
              onClick={() => scrollToOrder('hero')}
              className="direction-primary-button"
            >
              Оставить заявку <ArrowRight size={19} />
            </button>
            <a
              href={phone.href}
              onClick={() => track('phone_click', { place: 'hero' })}
              className="direction-secondary-button"
            >
              <PhoneCall size={18} /> Позвонить
            </a>
          </div>

          <figure className="eda-route-photo relative mt-8 overflow-hidden rounded-[22px] bg-green-950">
            <img
              src={courierImage}
              alt="Курьер на городском маршруте"
              width="1200"
              height="675"
              fetchPriority="high"
              decoding="async"
              className="aspect-[21/9] w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(3,18,9,.82))] p-5 text-left text-white">
              <span className="block text-xl font-bold leading-none">Работа рядом с домом</span>
              <span className="mt-2 block text-sm text-white/80">Зону доставки выбираете сами в приложении</span>
            </figcaption>
          </figure>
        </div>

        <div id="apply" className="eda-hero-form service-hero-visual scroll-mt-24 rounded-[28px] border border-green-100 bg-white p-5 sm:p-7">
          <EdaLeadForm idPrefix="hero-eda" captchaMount compact {...controller} />
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <div className="direction-trust-strip">
    <div className="eda-reveal eda-trust-bar direction-trust-grid container mx-auto py-7">
      {TRUST_ITEMS.map(item => (
        <div key={item.title} className="flex items-start gap-3">
          <span className="direction-trust-icon">{item.icon}</span>
          <div>
            <p className="text-base font-bold leading-tight text-slate-900">{item.title}</p>
            <p className="direction-trust-note">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Карточки только объясняют форматы: в заявку они не попадают, доступность проверяет менеджер.
const TransportSection = () => (
  <section id="transport" className="direction-section scroll-mt-24 l-tint">
    <div className="eda-reveal container mx-auto">
      <SectionHead
        kicker="Форматы"
        title="Как удобно передвигаться"
        subtitle="Набор форматов зависит от города. Какой доступен именно у вас, менеджер проверит при звонке."
      />
      <div className="eda-transport-grid mt-10">
        {TRANSPORT_CARDS.map(card => (
          <article
            key={card.id}
            className="eda-card flex min-w-0 flex-col rounded-[24px] border border-slate-200 l-glass p-6 text-slate-900 transition-all duration-300"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm">
              {card.icon}
            </span>
            <span className="mt-5 block text-2xl font-bold ">{card.title}</span>
            <span className="mt-2 block text-sm leading-relaxed text-slate-600">{card.text}</span>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const SlotsSection = () => (
  <section id="slots" className="direction-section scroll-mt-24 l-tint">
    <div className="eda-reveal container mx-auto">
      <SectionHead
        kicker="Время работы"
        title="Слоты выбираете в Яндекс Про"
        subtitle="В приложении видно доступные слоты и локации. Это не жёсткий график: набор вариантов зависит от города и загрузки сервиса."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-6">
        {SLOTS.map(slot => (
          <article key={slot.tag} className="eda-card flex flex-col rounded-[20px] border border-slate-200 l-glass p-6 lg:p-8">
            <span className="inline-flex self-start rounded-full bg-green-100 px-3 py-1.5 text-[11px] font-bold tracking-wide text-green-900">
              {slot.tag}
            </span>
            <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-950 lg:text-3xl">{slot.title}</h3>
            <p className="mt-3 grow leading-relaxed text-slate-600">{slot.text}</p>
            <div className="mt-5 space-y-2 border-t border-slate-200/80 pt-5">
              {slot.facts.map(fact => (
                <p key={fact} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check size={17} className="mt-0.5 shrink-0 text-green-800" />
                  <span>{fact}</span>
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const SupportSection = () => (
  <section className="direction-section l-tint">
    <div className="eda-reveal container mx-auto">
      <div className="eda-support-panel overflow-hidden rounded-[28px] border border-green-200 l-glass">
        <div className="grid lg:grid-cols-12">
          <div className="bg-green-700 p-7 text-[var(--on-accent)] lg:col-span-5 lg:p-10">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[var(--on-accent-soft)]">
              <span aria-hidden="true" className="h-px w-8 bg-green-200/50" />
              Барори Парк
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">Зачем нужен парк</h2>
            <p className="mt-5 leading-relaxed text-[var(--on-accent-soft)]">
              Мы не заменяем сервис, а помогаем подключиться и не остаться один на один с вопросами после старта.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: <MapPin size={22} />, title: 'Проверяем город', text: 'Скажем, какие форматы передвижения и зоны доставки открыты у вас.' },
              { icon: <ShieldCheck size={22} />, title: 'Объясняем оформление', text: 'До подключения сообщаем форму сотрудничества и нужные документы.' },
              { icon: <Smartphone size={22} />, title: 'Помогаем с Яндекс Про', text: 'Подскажем по слотам, локациям и получению первых заказов.' },
              { icon: <Headphones size={22} />, title: 'Остаёмся на связи', text: 'Помогаем с вопросами по доступу, заказам и спорным ситуациям.' },
            ].map(item => (
              <div key={item.title} className="border-b border-slate-100 p-6 sm:border-l lg:p-8">
                <span className="text-green-800">{item.icon}</span>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StepsSection = () => (
  <section id="start" className="direction-section scroll-mt-24 l-tint">
    <div className="eda-reveal container mx-auto">
      <SectionHead
        kicker="Как это работает"
        title="От заявки до первых заказов"
        subtitle="Без длинной анкеты на сайте. Срок подключения зависит от проверки сервиса, поэтому мы его не обещаем."
      />
      <div className="eda-steps direction-steps mt-10">
        {STEPS.map((step, index) => (
          <div key={step.title} className="eda-step direction-step">
            <span className="direction-step-number">0{index + 1}</span>
            <h3 className="mt-3 text-xl font-bold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RequirementsSection = () => (
  <section className="direction-section l-tint">
    {/* 12 колонок: слева заголовок + медкнижка на две строки, справа чипы и блок о выплатах —
        иначе правая колонка кончается раньше левой и под чипами остаётся пустая полоса. */}
    <div className="eda-reveal container mx-auto grid items-start gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5 lg:row-span-2">
        <SectionHead
          kicker="Требования"
          title="Что потребуется для старта"
          subtitle="Список короткий, но часть пунктов зависит от города и конкретного предложения — проверим их до оформления."
        />
        <div className="mt-7 rounded-[18px] border border-slate-800 bg-slate-900 p-6">
          <p className="text-2xl font-bold text-white">Про медкнижку</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Для доставки готовой еды медицинская книжка нужна. Мы помогаем разобраться с оформлением и подключением,
            но не выдаём документ и не гарантируем его получение.
          </p>
        </div>
      </div>
      <div className="service-requirements-list grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:gap-4">
        {REQUIREMENTS.map(item => (
          <div key={item} className="flex items-start gap-3 rounded-[16px] border border-slate-200 l-glass p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-800" />
            <span className="text-sm leading-relaxed text-slate-700">{item}</span>
          </div>
        ))}
      </div>
      <div className="rounded-[18px] border border-green-200 bg-green-700 p-6 text-[var(--on-accent)] lg:col-span-7 lg:col-start-6 lg:row-start-2">
        <p className="text-2xl font-bold ">Важно о выплатах и доходе</p>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[var(--on-accent-soft)]">
          Отправка заявки не создаёт трудовые отношения. Порядок и частота выплат зависят от формы сотрудничества,
          банка и условий курьерского парка. Фиксированный доход не обещаем: итог зависит от города, количества
          заказов, времени работы и спроса.
        </p>
      </div>
    </div>
  </section>
);

export const EdaPageContent = () => {
  const { track } = useLanding();
  const [campaign] = useState(() => readCampaignContext(typeof window === 'undefined' ? '' : window.location.search));
  const controller = useEdaLead(campaign.city, campaign.attribution);

  useEffect(() => {
    track('view', { city: campaign.city || 'not_set' });
    // Контекст рекламной кампании читается один раз при открытии страницы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Hero controller={controller} />
      <TrustBar />
      <TransportSection />
      <SlotsSection />
      <SupportSection />
      <StepsSection />
      <RequirementsSection />
      <Faq items={FAQ} title="Частые вопросы" />
      <EdaFinalForm {...controller} />
      <style>{`
        @keyframes eda-copy-in {
          from { opacity: .35; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes eda-section-in {
          from { opacity: .35; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .eda-hero-copy > * {
          animation: eda-copy-in .7s cubic-bezier(.16, 1, .3, 1) both;
        }

        .eda-hero-copy > :nth-child(2) { animation-delay: .07s; }
        .eda-hero-copy > :nth-child(3) { animation-delay: .14s; }
        .eda-hero-copy > :nth-child(4) { animation-delay: .21s; }

        /* Закреплённая мобильная кнопка висит над контентом: якорный скролл и автоскролл
           к полю формы не должны прятать цель под ней и под home indicator. */
        @media (max-width: 1023px) {
          html {
            scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom));
          }
        }

        @media (hover: hover) {
          .eda-card:hover {
            transform: translateY(-5px);
          }
        }

        @supports (animation-timeline: view()) {
          .eda-card,
          .eda-step {
            animation: eda-section-in both cubic-bezier(.16, 1, .3, 1);
            animation-timeline: view();
            animation-range: entry 8% cover 28%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eda-hero-copy > *,
          .eda-card,
          .eda-step,
          .eda-reveal {
            animation: none !important;
            transform: none !important;
          }
          html { scroll-behavior: auto !important; }
        }
      `}</style>
    </>
  );
};

export const EdaLanding = () => (
  <LandingShell
    goalPrefix="eda"
    ctaLabel="Оставить заявку"
    stickyLabel="Оставить заявку"
    footerAbout="Помогаем подключиться к доставке еды в крупных городах России и разобраться с оформлением, слотами и началом работы."
    legalNote="ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Отправка заявки не создаёт трудовые отношения. Форма сотрудничества, доступность форматов, порядок выплат и требования зависят от сервиса и города. Информация не является публичной офертой или гарантией дохода. 18+."
    nav={[
      { href: '#transport', label: 'Форматы' },
      { href: '#slots', label: 'Слоты' },
      { href: '#start', label: 'Как начать' },
      { href: '#faq', label: 'Вопросы' },
    ]}
  >
    <EdaPageContent />
  </LandingShell>
);
