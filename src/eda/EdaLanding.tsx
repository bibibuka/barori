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
import { LandingShell, PHONE_HREF, useLanding } from '../landing/kit';
import courierImage from '../assets/kura.webp';
// Разбор utm/city из ссылки объявления — общий для рекламных лендингов парка.
import { readCampaignContext } from '../dostavka/campaign';
import { EdaFinalForm, EdaLeadForm, useEdaLead, type EdaTransport } from './EdaForm';

const TRANSPORT_CARDS: { id: string; value: EdaTransport; icon: ReactNode; title: string; text: string }[] = [
  {
    id: 'foot',
    value: 'Пешком',
    icon: <Footprints size={24} />,
    title: 'Пешком',
    text: 'Короткие маршруты рядом с точкой выдачи. Транспорт и права не нужны.',
  },
  {
    id: 'bike',
    value: 'Велосипед или самокат',
    icon: <Bike size={24} />,
    title: 'Велосипед или самокат',
    text: 'Больше точек за слот и шире зона доставки в пределах города.',
  },
  {
    id: 'electro',
    value: 'Электротранспорт',
    icon: <Zap size={24} />,
    title: 'Электротранспорт',
    text: 'Электровелосипед или самокат, если такой формат открыт в вашем городе.',
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
  'Смартфон с доступом в интернет',
  'Медицинская книжка для доставки готовой еды',
  'Документы для выбранной формы сотрудничества',
  'Самозанятость, если её требует сервис',
  'Свой велосипед или самокат — только для этих форматов',
];

const FAQ = [
  {
    q: 'Можно работать без автомобиля?',
    a: 'Да. В Яндекс Еде доступны пеший формат, велосипед и электротранспорт. Конкретный набор форматов зависит от города.',
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

/** Единая шапка секции: кикер с линией, заголовок, подзаголовок. */
const SectionHead = ({
  kicker,
  title,
  subtitle,
  className = 'max-w-3xl',
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  className?: string;
}) => (
  <div className={className}>
    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-green-800">
      <span aria-hidden="true" className="h-px w-8 bg-green-600/45" />
      {kicker}
    </p>
    <h2 className="mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em] text-slate-950">
      {title}
    </h2>
    {subtitle && <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{subtitle}</p>}
  </div>
);

const Hero = ({ controller }: { controller: ReturnType<typeof useEdaLead> }) => {
  const { track, scrollToOrder } = useLanding();

  return (
    <section data-testid="eda-hero" className="eda-hero relative overflow-hidden bg-green-50 pb-10 pt-20 lg:pb-16 lg:pt-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-green-300/40 blur-3xl" />
      <div className="container relative mx-auto grid items-center gap-6 lg:grid-cols-[1.06fr_.94fr]">
        <div className="eda-hero-copy text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-green-300 bg-white px-4 py-2 text-xs font-bold text-green-800 shadow-sm">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-500" />
            Курьер Яндекс Еды, 18+
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.6rem,9vw,4.3rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-slate-950 lg:mx-0 lg:mt-5">
            Доставляйте еду в своём городе
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-700 sm:text-lg lg:mx-0 lg:mt-5">
            Пешком, на велосипеде или электротранспорте. Слоты и локацию выбираете в Яндекс Про, а мы поможем
            разобраться с подключением и оформлением.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToOrder('hero')}
              className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-green-700 px-6 py-4 text-base font-bold text-[var(--on-accent)] shadow-[0_14px_35px_var(--accent-shadow)] transition-transform hover:-translate-y-0.5 hover:bg-green-600 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              Оставить заявку <ArrowRight size={19} />
            </button>
            <a
              href={PHONE_HREF}
              onClick={() => track('phone_click', { place: 'hero' })}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/90 px-7 py-4 text-base font-bold text-slate-800 transition-colors hover:border-green-700 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <PhoneCall size={18} /> Позвонить
            </a>
          </div>

          <figure className="relative mt-8 hidden overflow-hidden rounded-[22px] border border-white/90 bg-green-950 shadow-[0_24px_60px_rgba(15,23,42,.16)] lg:block">
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
              <span className="block font-oswald text-xl font-bold uppercase leading-none">Работа рядом с домом</span>
              <span className="mt-2 block text-sm text-white/80">Зону доставки выбираете сами в приложении</span>
            </figcaption>
          </figure>
        </div>

        <div id="apply" className="scroll-mt-24 rounded-[22px] border border-green-100 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-6">
          <EdaLeadForm idPrefix="hero-eda" captchaMount compact {...controller} />
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <div className="border-y border-green-100 bg-white">
    <div className="eda-reveal eda-trust-bar container mx-auto grid grid-cols-2 gap-x-5 gap-y-6 py-7 lg:grid-cols-4 lg:gap-x-0">
      {TRUST_ITEMS.map(item => (
        <div key={item.title} className="flex items-start gap-3 lg:px-7 lg:first:pl-0 lg:last:pr-0">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">{item.icon}</span>
          <div>
            <p className="font-oswald text-base font-bold uppercase leading-tight text-slate-900">{item.title}</p>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TransportSection = ({
  value,
  onPick,
}: {
  value: EdaTransport;
  onPick: (transport: EdaTransport) => void;
}) => (
  <section id="transport" className="scroll-mt-24 bg-white py-16 lg:py-24">
    <div className="eda-reveal container mx-auto">
      <SectionHead
        kicker="Форматы"
        title="Как удобно передвигаться"
        subtitle="Набор форматов зависит от города. Отметьте подходящий — подставим его в заявку, а доступность проверим при звонке."
      />
      <div className="eda-transport-rail mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
        {TRANSPORT_CARDS.map(card => {
          const selected = card.value === value;
          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(card.value)}
              className={`eda-card min-w-[82vw] snap-center cursor-pointer rounded-[20px] border p-6 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 md:min-w-0 ${
                selected
                  ? 'border-green-700 bg-green-700 text-[var(--on-accent)] shadow-[0_18px_45px_var(--accent-shadow)]'
                  : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-green-300 hover:bg-white'
              }`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selected ? 'bg-white/15 text-[var(--on-accent)]' : 'bg-white text-green-800 shadow-sm'}`}>
                {card.icon}
              </span>
              <span className="mt-5 block font-oswald text-2xl font-bold uppercase">{card.title}</span>
              <span className={`mt-2 block text-sm leading-relaxed ${selected ? 'text-[var(--on-accent-soft)]' : 'text-slate-600'}`}>{card.text}</span>
              <span className={`mt-5 block text-xs font-semibold ${selected ? 'text-[var(--on-accent-soft)]' : 'text-green-800'}`}>
                {selected ? 'Выбрано для заявки' : 'Выбрать'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

const SlotsSection = () => (
  <section id="slots" className="scroll-mt-24 bg-green-50/60 py-16 lg:py-24">
    <div className="eda-reveal container mx-auto">
      <SectionHead
        kicker="Время работы"
        title="Слоты выбираете в Яндекс Про"
        subtitle="В приложении видно доступные слоты и локации. Это не жёсткий график: набор вариантов зависит от города и загрузки сервиса."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {SLOTS.map(slot => (
          <article key={slot.tag} className="eda-card rounded-[20px] border border-slate-200 bg-white p-6 lg:p-8">
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-green-900">
              {slot.tag}
            </span>
            <h3 className="mt-5 font-oswald text-2xl font-bold uppercase leading-tight text-slate-950 lg:text-3xl">{slot.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-600">{slot.text}</p>
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
  <section className="bg-green-50 py-16 lg:py-24">
    <div className="eda-reveal container mx-auto">
      <div className="overflow-hidden rounded-[24px] border border-green-200 bg-white shadow-[0_24px_70px_var(--accent-shadow)]">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-green-700 p-7 text-[var(--on-accent)] lg:p-10">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--on-accent-soft)]">
              <span aria-hidden="true" className="h-px w-8 bg-green-200/50" />
              Барори Парк
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em]">Зачем нужен парк</h2>
            <p className="mt-5 leading-relaxed text-[var(--on-accent-soft)]">
              Мы не заменяем сервис, а помогаем подключиться и не остаться один на один с вопросами после старта.
            </p>
          </div>
          <div className="grid sm:grid-cols-2">
            {[
              { icon: <MapPin size={22} />, title: 'Проверяем город', text: 'Скажем, какие форматы передвижения и зоны доставки открыты у вас.' },
              { icon: <ShieldCheck size={22} />, title: 'Объясняем оформление', text: 'До подключения сообщаем форму сотрудничества и нужные документы.' },
              { icon: <Smartphone size={22} />, title: 'Помогаем с Яндекс Про', text: 'Подскажем по слотам, локациям и получению первых заказов.' },
              { icon: <Headphones size={22} />, title: 'Остаёмся на связи', text: 'Помогаем с вопросами по доступу, заказам и спорным ситуациям.' },
            ].map(item => (
              <div key={item.title} className="border-b border-slate-100 p-6 sm:border-l lg:p-8">
                <span className="text-green-800">{item.icon}</span>
                <h3 className="mt-4 font-oswald text-xl font-bold uppercase text-slate-950">{item.title}</h3>
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
  <section id="start" className="scroll-mt-24 bg-white py-16 lg:py-24">
    <div className="eda-reveal container mx-auto">
      <SectionHead
        kicker="Как это работает"
        title="От заявки до первых заказов"
        subtitle="Без длинной анкеты на сайте. Срок подключения зависит от проверки сервиса, поэтому мы его не обещаем."
      />
      <div className="eda-steps mt-10 grid gap-4 md:grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="eda-step relative border-t-2 border-green-700 pt-5">
            <span className="font-oswald text-sm font-bold text-green-800">0{index + 1}</span>
            <h3 className="mt-3 font-oswald text-xl font-bold uppercase text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RequirementsSection = () => (
  <section className="bg-green-50/60 py-16 lg:py-24">
    <div className="eda-reveal container mx-auto grid items-start gap-10 lg:grid-cols-[0.86fr_1.14fr]">
      <div>
        <SectionHead
          kicker="Требования"
          title="Что потребуется для старта"
          subtitle="Список короткий, но часть пунктов зависит от города и конкретного предложения — проверим их до оформления."
        />
        <div className="mt-7 rounded-[18px] border border-slate-800 bg-slate-900 p-6">
          <p className="font-oswald text-2xl font-bold uppercase text-white">Про медкнижку</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Для доставки готовой еды медицинская книжка нужна. Мы помогаем разобраться с оформлением и подключением,
            но не выдаём документ и не гарантируем его получение.
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {REQUIREMENTS.map(item => (
          <div key={item} className="flex items-start gap-3 rounded-[16px] border border-slate-200 bg-white p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-800" />
            <span className="text-sm leading-relaxed text-slate-700">{item}</span>
          </div>
        ))}
      </div>
      <div className="rounded-[18px] border border-green-200 bg-green-700 p-6 text-[var(--on-accent)] lg:col-span-2">
        <p className="font-oswald text-2xl font-bold uppercase">Важно о выплатах и доходе</p>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[var(--on-accent-soft)]">
          Отправка заявки не создаёт трудовые отношения. Порядок и частота выплат зависят от формы сотрудничества,
          банка и условий курьерского парка. Фиксированный доход не обещаем: итог зависит от города, количества
          заказов, времени работы и спроса.
        </p>
      </div>
    </div>
  </section>
);

const EdaFaq = () => {
  const { track } = useLanding();

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="eda-reveal container mx-auto grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionHead
          kicker="Вопросы"
          title="Частые вопросы"
          subtitle="Если вашего вопроса нет в списке, оставьте заявку или позвоните. Консультация бесплатна."
          className="lg:sticky lg:top-28"
        />
        <div className="space-y-3">
          {FAQ.map(item => (
            <details
              key={item.q}
              onToggle={event => {
                if (event.currentTarget.open) track('faq_open', { question: item.q });
              }}
              className="group rounded-[16px] border border-slate-200 bg-slate-50 px-5 py-4 open:border-green-300 open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-oswald text-lg font-bold uppercase text-slate-900 marker:hidden">
                {item.q}
                <span className="text-2xl font-normal text-green-800 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EdaPageContent = () => {
  const { track } = useLanding();
  const [campaign] = useState(() => readCampaignContext(typeof window === 'undefined' ? '' : window.location.search));
  const controller = useEdaLead(campaign.city, campaign.attribution);

  useEffect(() => {
    track('view', { city: campaign.city || 'not_set' });
    // Контекст рекламной кампании читается один раз при открытии страницы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickTransport = (transport: EdaTransport) => {
    controller.setState(current => ({ ...current, transport }));
    track('transport_pick', { transport });
  };

  return (
    <>
      <Hero controller={controller} />
      <TrustBar />
      <TransportSection value={controller.state.transport} onPick={pickTransport} />
      <SlotsSection />
      <SupportSection />
      <StepsSection />
      <RequirementsSection />
      <EdaFaq />
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

        .eda-hero::before {
          position: absolute;
          inset: 0;
          content: '';
          pointer-events: none;
          opacity: .5;
          background-image:
            linear-gradient(var(--accent-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-grid) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: linear-gradient(to bottom, #000 0, transparent 75%);
        }

        .eda-hero-copy > * {
          animation: eda-copy-in .7s cubic-bezier(.16, 1, .3, 1) both;
        }

        .eda-hero-copy > :nth-child(2) { animation-delay: .07s; }
        .eda-hero-copy > :nth-child(3) { animation-delay: .14s; }
        .eda-hero-copy > :nth-child(4) { animation-delay: .21s; }

        .eda-transport-rail {
          scrollbar-width: none;
        }

        .eda-transport-rail::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 1024px) {
          .eda-trust-bar > * + * {
            border-left: 1px solid var(--color-green-100);
          }
        }

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
