import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Bike,
  Boxes,
  Car,
  Check,
  CheckCircle2,
  Clock3,
  Footprints,
  Headphones,
  MapPin,
  PhoneCall,
  Route,
  ShieldCheck,
  Smartphone,
  Truck,
} from 'lucide-react';
import { Faq, LandingShell, SectionHead, useLanding } from '../landing/kit';
import courierImage from '../assets/kura.webp';
import heroImage from '../assets/delivery-hero.webp';
import { CourierFinalForm, useCourierLead } from './CourierForm';
import { formatCampaignHeadline, readCampaignContext } from './campaign';
import './courier-design.css';
import {
  DELIVERY_DIRECTIONS,
  DELIVERY_FORMATS,
  type DeliveryDirectionCard,
  type DeliveryFormatCard,
} from './directions';

const FORMAT_ICONS: Record<DeliveryFormatCard['id'], ReactNode> = {
  foot: <Footprints size={25} />,
  bike: <Bike size={25} />,
  auto: <Car size={25} />,
  cargo: <Truck size={25} />,
};

const DIRECTION_ICONS: Record<DeliveryDirectionCard['id'], ReactNode> = {
  express: <Boxes size={24} />,
  planned: <Route size={24} />,
  auto: <Car size={24} />,
  cargo: <Truck size={24} />,
};

const TRUST_ITEMS = [
  { icon: <Route size={20} />, title: 'Все форматы', text: 'от пешего до грузового' },
  { icon: <MapPin size={20} />, title: 'По вашему городу', text: 'проверяем доступность' },
  { icon: <ShieldCheck size={20} />, title: 'Понятные условия', text: 'до оформления' },
  { icon: <Headphones size={20} />, title: 'Поддержка парка', text: 'после подключения' },
];

const FAQ = [
  {
    q: 'Можно работать без автомобиля?',
    a: 'Да. Для документов, посылок и небольших заказов доступны пеший формат, велосипед и самокат. Набор предложений зависит от города.',
  },
  {
    q: 'Какие направления можно выбрать?',
    a: 'Экспресс-доставка, плановые маршруты, автодоставка и грузовая доставка. Менеджер проверит, какие варианты доступны именно в вашем городе.',
  },
  {
    q: 'Указанный доход гарантирован?',
    a: 'Нет. На странице указаны ориентиры действующих предложений с главного сайта. Итоговое вознаграждение зависит от города, направления, транспорта, спроса, количества заказов и условий выбранного сервиса.',
  },
  {
    q: 'Это оформление по трудовому договору?',
    a: 'Формат сотрудничества зависит от выбранного сервиса и конкретного предложения. Это может быть договор с самозанятым или ИП, а для отдельных предложений другой формат. Менеджер сообщит вид договора до оформления.',
  },
  {
    q: 'Нужна ли самозанятость?',
    a: 'Не для каждого направления действуют одинаковые требования. Если потребуется статус самозанятого, об этом скажут заранее и помогут разобраться с оформлением.',
  },
  {
    q: 'Можно совмещать с учёбой или другой работой?',
    a: 'Во многих предложениях можно выбирать доступные интервалы и дни. Конкретный график зависит от сервиса и города, поэтому подтвердим его до подключения.',
  },
  {
    q: 'Сколько стоит заявка?',
    a: 'Заявка и первичная консультация бесплатны. Возможные расходы на документы или оснащение зависят от направления и обсуждаются заранее.',
  },
];

const Hero = ({ headline }: { headline: string }) => {
  const { track, scrollToOrder, phone } = useLanding();

  return (
    <section
      data-testid="delivery-hero"
      className="delivery-hero service-hero relative"
    >
      <div className="delivery-hero-grid service-hero-grid container relative mx-auto">
        <div className="delivery-hero-copy service-hero-copy">
          <p className="delivery-hero-badge service-eyebrow">
            Работа и подработка в доставке, 16+
          </p>
          <h1 className="delivery-hero-title">
            {headline}
          </h1>
          <p className="delivery-hero-description service-lead">
            Посылки, документы и грузы. Пешком, на самокате, велосипеде или авто. Сравним доступные варианты в вашем городе.
          </p>
          <div className="delivery-hero-actions">
            <button
              type="button"
              onClick={() => scrollToOrder('hero')}
              className="delivery-primary-cta"
            >
              Подобрать вариант <span><ArrowRight size={19} /></span>
            </button>
            <a
              href={phone.href}
              onClick={() => track('phone_click', { place: 'hero' })}
              className="delivery-secondary-cta"
            >
              <PhoneCall size={18} /> Позвонить
            </a>
          </div>
        </div>

        <figure
          data-testid="delivery-route-scene"
          className="delivery-route-scene service-hero-visual relative overflow-hidden bg-green-950"
        >
          <img
            src={heroImage}
            alt="Курьеры пешего, вело- и автоформата перед началом работы"
            width="1536"
            height="1024"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="delivery-route-shade absolute inset-0" />
          {/* Маршрут идёт горизонтально через середину кадра: слева направо, с двумя перегибами. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 480 320"
            preserveAspectRatio="none"
            className="delivery-route-map pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              className="delivery-route-path"
              pathLength="1"
              d="M-8 206 C 84 246, 138 118, 232 148 S 372 214, 488 108"
            />
          </svg>
          <span className="delivery-route-chip delivery-route-chip--foot"><Footprints size={16} /> Пешком</span>
          <span className="delivery-route-chip delivery-route-chip--bike"><Bike size={16} /> Вело</span>
          <span className="delivery-route-chip delivery-route-chip--car"><Car size={16} /> Авто</span>
          <figcaption className="delivery-route-caption absolute inset-x-0 bottom-0 z-10 text-left text-white">
            <span className="delivery-route-caption-title">Один запрос — разные варианты</span>
            <span className="delivery-route-caption-description">Город, транспорт и условия соберём в один понятный маршрут</span>
          </figcaption>
        </figure>

      </div>
    </section>
  );
};

const TrustBar = () => (
  <div className="delivery-trust-wrap container mx-auto">
    <div className="delivery-reveal delivery-trust-bar grid grid-cols-2 lg:grid-cols-4">
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

// Карточки только объясняют форматы: в заявку выбор не идёт, доступность проверяет менеджер.
const FormatSection = () => (
  <section id="formats" className="scroll-mt-24 l-tint py-16">
    <div className="delivery-reveal container mx-auto">
      <SectionHead
        kicker="С чего начнём"
        title="На чём удобно работать"
        subtitle="Выбирать сейчас ничего не нужно. Оставьте контакты — менеджер проверит, какие форматы открыты в вашем городе, и поможет сравнить."
      />

      <div className="delivery-format-rail">
        {DELIVERY_FORMATS.map(format => {
          return (
            <article
              key={format.id}
              className="delivery-format-card flex min-w-0 flex-col rounded-[20px] border border-slate-200 l-glass p-6 text-slate-900 transition-all duration-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm">
                {FORMAT_ICONS[format.id]}
              </span>
              <span className="mt-5 block font-oswald text-2xl font-bold uppercase">{format.title}</span>
              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-slate-600">{format.description}</span>
              <span className="mt-5 block text-xs font-semibold text-green-800 md:mt-auto md:pt-5">{format.fit}</span>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const DirectionCard = ({
  direction,
}: {
  direction: DeliveryDirectionCard;
}) => (
  <article className="delivery-direction-card relative flex flex-col overflow-hidden rounded-[20px] border border-slate-200 l-glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-6">
    {/* min-h-12 = высота иконки: бейдж в одну или две строки не сдвигает заголовки соседних карточек. */}
    <div className="delivery-direction-top flex min-h-12 items-center justify-between gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-800">
        {DIRECTION_ICONS[direction.id]}
      </span>
      <span className="delivery-direction-reward rounded-full bg-green-50 px-3 py-1.5 text-right text-[11px] font-bold leading-snug text-green-800">
        {direction.reward}
      </span>
    </div>
    <h3 className="mt-5 font-oswald text-2xl font-bold uppercase leading-tight text-slate-950 lg:text-3xl">{direction.title}</h3>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">{direction.lead}</p>
    <p className="mt-4 border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-500">Формат: {direction.formats}</p>
    <div className="mt-5 grow space-y-2">
      {direction.facts.map(fact => (
        <p key={fact} className="flex items-start gap-2 text-sm text-slate-700">
          <Check size={17} className="mt-0.5 shrink-0 text-green-800" />
          <span>{fact}</span>
        </p>
      ))}
    </div>
    <DirectionApply direction={direction} />
  </article>
);

/** Направление в заявку не подставляем — кнопка просто ведёт к форме. */
const DirectionApply = ({ direction }: { direction: DeliveryDirectionCard }) => {
  const { track, scrollToOrder } = useLanding();
  return (
    <button
      type="button"
      onClick={() => {
        track('direction_apply', { direction: direction.value });
        scrollToOrder('direction_card');
      }}
      className="mt-6 inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-green-700 bg-white px-5 py-3 text-sm font-bold text-green-800 transition-colors hover:bg-green-700 hover:text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
    >
      Оставить заявку <ArrowRight size={16} />
    </button>
  );
};

const DirectionsSection = () => {
  return (
    <section id="directions" className="scroll-mt-24 l-tint py-16">
      <div className="delivery-reveal container mx-auto">
        <SectionHead
          kicker="Направления"
          title="Все направления доставки"
          subtitle="Здесь собрана вся информация с главной страницы. Указанный ориентир не является обещанием конкретного дохода."
        />
        {/* Четыре карточки = два ровных ряда по две (6+6). */}
        <div className="delivery-direction-grid mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {DELIVERY_DIRECTIONS.map(direction => (
            <DirectionCard key={direction.id} direction={direction} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => (
  <section id="compare" className="delivery-comparison scroll-mt-24 l-tint py-16">
    <div className="delivery-reveal container mx-auto">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHead
            kicker="Подбор"
            title="Что подойдёт именно вам"
            subtitle="Не нужно угадывать по объявлению. Оставьте город и транспорт, а мы отфильтруем неподходящие варианты до оформления."
          />
          <img
            src={courierImage}
            alt="Курьер на городском маршруте"
            loading="lazy"
            decoding="async"
            className="delivery-comparison-photo mt-8 aspect-[16/9] w-full rounded-[20px] object-cover lg:aspect-[4/3]"
          />
        </div>
        <div className="delivery-match-grid grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
          {[
            { icon: <Footprints size={22} />, title: 'Нет автомобиля', text: 'Пешая доставка, велосипед и самокат для документов, посылок и небольших заказов.' },
            { icon: <Clock3 size={22} />, title: 'Нужна подработка', text: 'Ищем предложения с доступными днями и интервалами, которые можно совмещать.' },
            { icon: <Car size={22} />, title: 'Есть личное авто', text: 'Сравниваем экспресс, плановые рейсы и обычную автодоставку.' },
            { icon: <Truck size={22} />, title: 'Есть грузовой автомобиль', text: 'Проверяем подходящие грузы, маршруты и требования к кузову.' },
            { icon: <Smartphone size={22} />, title: 'Нет опыта', text: 'Для многих направлений опыт не нужен. Поможем разобраться с приложением и стартом.' },
          ].map(item => (
            <div key={item.title} className="delivery-match-card rounded-[18px] border border-slate-200 l-glass p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm">{item.icon}</span>
              <h3 className="mt-4 font-oswald text-xl font-bold uppercase text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SupportSection = () => (
  <section className="l-tint py-16">
    <div className="delivery-reveal container mx-auto">
      <div className="delivery-support-panel overflow-hidden rounded-[20px] border border-green-200 l-glass shadow-[0_24px_70px_var(--accent-shadow)]">
        <div className="grid lg:grid-cols-12">
          <div className="delivery-support-intro bg-green-700 p-7 text-[var(--on-accent)] lg:col-span-5 lg:p-10">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--on-accent-soft)]">
              <span aria-hidden="true" className="h-px w-8 bg-green-200/50" />
              Барори Парк
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em]">Не оставляем после заявки</h2>
            <p className="mt-5 leading-relaxed text-[var(--on-accent-soft)]">
              Помогаем понять условия, подготовиться к подключению и решить вопросы после старта.
            </p>
          </div>
          <div className="delivery-support-grid grid sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: <MapPin size={22} />, title: 'Проверяем город', text: 'Показываем только те направления, которые доступны для вашего региона.' },
              { icon: <ShieldCheck size={22} />, title: 'Объясняем договор', text: 'До оформления сообщаем формат сотрудничества и требования сервиса.' },
              { icon: <Smartphone size={22} />, title: 'Помогаем начать', text: 'Подсказываем по приложению, документам и первым доступным заказам.' },
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
  <section id="start" className="scroll-mt-24 l-tint py-16">
    <div className="delivery-reveal container mx-auto">
      <SectionHead
        kicker="Как это работает"
        title="От заявки до доступных заказов"
        subtitle="Без длинной анкеты на сайте и без обещаний срока, который зависит от проверки сервиса."
      />
      <div className="delivery-route-steps mt-10 grid gap-4 md:grid-cols-4 lg:gap-6">
        {[
          { title: 'Оставьте контакты', text: 'Имя, телефон, город и удобный транспорт.' },
          { title: 'Сравним варианты', text: 'Проверим направления и условия в вашем городе.' },
          { title: 'Уточним оформление', text: 'Заранее скажем, какой договор и документы потребуются.' },
          { title: 'Получите доступ', text: 'После проверки сервиса поможем разобраться с началом работы.' },
        ].map((step, index) => (
          <div key={step.title} className="delivery-step relative border-t-2 border-green-700 pt-5">
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
  <section className="delivery-requirements l-tint py-16">
    {/* 12 колонок: заголовок и чипы делят первую строку, полоса о договоре идёт под ними —
        иначе правая колонка кончается раньше левой и под чипами остаётся пустая полоса. */}
    <div className="delivery-reveal container mx-auto grid items-start gap-10 lg:grid-cols-12">
      <SectionHead
        kicker="Требования"
        title="Что потребуется для старта"
        subtitle="Базовый список короткий. Дополнительные требования зависят от направления, поэтому их проверяем до оформления."
        className="lg:col-span-5 lg:row-start-1"
      />
      <div className="delivery-contract-note rounded-[18px] border border-green-200 bg-green-700 p-6 text-[var(--on-accent)] lg:col-span-12 lg:row-start-2">
        <p className="font-oswald text-2xl font-bold uppercase">Важно о договоре</p>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[var(--on-accent-soft)]">
          Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, договор и порядок выплат сообщаются для конкретного предложения.
        </p>
      </div>
      <div className="service-requirements-list grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:gap-4">
        {[
          'Возраст от 16 лет',
          'Смартфон с доступом в интернет',
          'Документы для выбранного формата оформления',
          'Личный транспорт только для вело-, авто- и грузового формата',
          'Самозанятость, если её требует конкретный сервис',
        ].map(item => (
          <div key={item} className="flex items-start gap-3 rounded-[16px] border border-slate-200 l-glass p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-800" />
            <span className="text-sm leading-relaxed text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CourierPageContent = () => {
  const { track } = useLanding();
  const [campaign] = useState(() => readCampaignContext(typeof window === 'undefined' ? '' : window.location.search));
  const controller = useCourierLead(campaign);
  const hasCampaignHeadline = Boolean(campaign.city || campaign.format !== 'Пока не выбрал');
  const headline = hasCampaignHeadline ? formatCampaignHeadline(campaign) : 'Работа в доставке';

  useEffect(() => {
    track('view', {
      city: campaign.city || 'not_set',
      format: campaign.format,
      direction: campaign.direction,
    });
    // Контекст рекламной кампании читается один раз при открытии страницы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Hero headline={headline} />
      <TrustBar />
      <FormatSection />
      <DirectionsSection />
      <ComparisonSection />
      <SupportSection />
      <StepsSection />
      <RequirementsSection />
      <Faq items={FAQ} title="Частые вопросы" />
      <CourierFinalForm {...controller} />
      <style>{`
        @keyframes delivery-copy-in {
          from { opacity: .35; transform: translateY(18px); clip-path: inset(0 0 12%); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0); }
        }

        @keyframes delivery-scene-settle {
          from { transform: scale(1.08); filter: saturate(.8); }
          to { transform: scale(1.01); filter: saturate(1); }
        }

        @keyframes delivery-route-draw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes delivery-chip-in {
          from { opacity: 0; transform: translateY(12px) scale(.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes delivery-cta-sweep {
          from { transform: translateX(-140%) skewX(-18deg); }
          to { transform: translateX(340%) skewX(-18deg); }
        }

        @keyframes delivery-section-in {
          from { opacity: .35; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .delivery-hero::before {
          position: absolute;
          inset: 0;
          content: '';
          pointer-events: none;
          opacity: .52;
          background-image:
            linear-gradient(var(--accent-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-grid) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: linear-gradient(to bottom, #000 0, transparent 75%);
        }

        .delivery-hero-copy > * {
          animation: delivery-copy-in .7s cubic-bezier(.16, 1, .3, 1) both;
        }

        .delivery-hero-copy > :nth-child(2) { animation-delay: .07s; }
        .delivery-hero-copy > :nth-child(3) { animation-delay: .14s; }
        .delivery-hero-copy > :nth-child(4) { animation-delay: .21s; }

        .delivery-route-scene img {
          animation: delivery-scene-settle 1.2s cubic-bezier(.16, 1, .3, 1) both;
        }

        .delivery-route-map {
          z-index: 2;
          filter: drop-shadow(0 2px 5px rgba(5, 46, 22, .35));
        }

        .delivery-route-path {
          fill: none;
          stroke: rgba(255, 255, 255, .92);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 1;
          animation: delivery-route-draw 1.2s cubic-bezier(.16, 1, .3, 1) .25s both;
        }

        .delivery-route-chip {
          position: absolute;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 36px;
          padding: 8px 11px;
          border: 1px solid rgba(255, 255, 255, .72);
          border-radius: 999px;
          color: var(--color-green-900);
          background: rgba(255, 255, 255, .92);
          box-shadow: 0 10px 28px rgba(3, 18, 9, .24);
          backdrop-filter: blur(10px);
          font-size: 12px;
          font-weight: 700;
          animation: delivery-chip-in .55s cubic-bezier(.16, 1, .3, 1) both;
        }

        /* Чипы идут по направлению маршрута: слева ниже, справа выше.
           На мобильном кадр низкий, поэтому держим их выше подписи в нижней трети. */
        .delivery-route-chip--foot { top: 30%; left: 5%; animation-delay: .5s; }
        .delivery-route-chip--bike { top: 18%; left: 36%; animation-delay: .65s; }
        .delivery-route-chip--car { top: 6%; right: 5%; animation-delay: .8s; }

        .delivery-primary-cta {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .delivery-primary-cta::after {
          position: absolute;
          inset-block: -30%;
          left: 0;
          z-index: -1;
          width: 36%;
          content: '';
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          animation: delivery-cta-sweep 1.1s cubic-bezier(.16, 1, .3, 1) .85s both;
        }

        .delivery-format-rail,
        .delivery-match-grid {
          scrollbar-width: none;
        }

        @media (min-width: 1024px) {
          .delivery-trust-bar > * + * {
            border-left: 1px solid var(--color-green-100);
          }
        }

        .delivery-format-rail::-webkit-scrollbar,
        .delivery-match-grid::-webkit-scrollbar {
          display: none;
        }

        .delivery-support-panel {
          border-radius: 24px;
        }

        /* Закреплённая мобильная кнопка висит над контентом: якорный скролл и автоскролл
           к полю формы не должны прятать цель под ней и под home indicator. */
        @media (max-width: 1023px) {
          html {
            scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 639px) {
          .delivery-match-grid {
            display: flex;
            margin-inline: -1rem;
            padding: 0 1rem 8px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }

          .delivery-match-card {
            min-width: 78vw;
            scroll-snap-align: center;
          }

          .delivery-route-steps {
            position: relative;
          }

          .delivery-route-steps::before {
            position: absolute;
            top: 8px;
            bottom: 24px;
            left: 14px;
            width: 2px;
            content: '';
            background: linear-gradient(to bottom, var(--color-green-700), var(--color-green-300));
          }

          .delivery-route-steps .delivery-step {
            padding: 0 0 24px 48px;
            border-top: 0;
          }

          .delivery-route-steps .delivery-step::before {
            position: absolute;
            top: 3px;
            left: 6px;
            width: 18px;
            height: 18px;
            content: '';
            border: 5px solid #fff;
            border-radius: 999px;
            background: var(--color-green-700);
            box-shadow: 0 0 0 1px var(--color-green-300);
          }
        }

        /* Значения посчитаны по самой линии: центр чипа = точка пути на этой доле ширины. */
        @media (min-width: 1024px) {
          .delivery-route-chip--foot { top: 59.5%; left: 7%; }
          .delivery-route-chip--bike { top: 41%; left: 39.5%; }
          .delivery-route-chip--car { top: 45%; right: 6%; }
        }

        @media (hover: hover) {
          .delivery-format-card:hover,
          .delivery-direction-card:hover,
          .delivery-match-card:hover {
            transform: translateY(-5px);
          }
        }

        @supports (animation-timeline: view()) {
          .delivery-direction-card,
          .delivery-match-card,
          .delivery-support-panel,
          .delivery-step {
            animation: delivery-section-in both cubic-bezier(.16, 1, .3, 1);
            animation-timeline: view();
            animation-range: entry 8% cover 28%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .delivery-hero-copy > *,
          .delivery-route-scene img,
          .delivery-route-path,
          .delivery-route-chip,
          .delivery-primary-cta::after,
          .delivery-direction-card,
          .delivery-match-card,
          .delivery-support-panel,
          .delivery-step,
          .delivery-reveal {
            animation: none !important;
            transform: none !important;
            clip-path: none !important;
          }
          html { scroll-behavior: auto !important; }
        }
      `}</style>
    </>
  );
};

export const CourierLanding = () => (
  <LandingShell
    goalPrefix="courier"
    ctaLabel="Подобрать вариант"
    stickyLabel="Подобрать вариант"
    footerAbout="Подбираем направления доставки в крупных городах России и помогаем разобраться с оформлением и началом работы."
    legalNote="ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, вид договора, доступность предложений и размер вознаграждения зависят от выбранного сервиса и города. Информация не является публичной офертой или гарантией дохода. 16+."
    nav={[
      { href: '#formats', label: 'Форматы' },
      { href: '#directions', label: 'Направления' },
      { href: '#start', label: 'Как начать' },
      { href: '#faq', label: 'Вопросы' },
    ]}
  >
    <CourierPageContent />
  </LandingShell>
);
