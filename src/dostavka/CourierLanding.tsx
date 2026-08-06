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
  PackageCheck,
  PhoneCall,
  Route,
  ShieldCheck,
  Smartphone,
  Truck,
  Wrench,
} from 'lucide-react';
import { LandingShell, PHONE_HREF, useLanding } from '../landing/kit';
import courierImage from '../assets/kura.webp';
import heroImage from '../assets/delivery-hero.webp';
import { CourierFinalForm, CourierLeadForm, useCourierLead } from './CourierForm';
import { formatCampaignHeadline, readCampaignContext, type CourierFormat, type DeliveryDirection } from './campaign';
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
  food: <PackageCheck size={24} />,
  express: <Boxes size={24} />,
  planned: <Route size={24} />,
  auto: <Car size={24} />,
  cargo: <Truck size={24} />,
  'velo-helper': <Wrench size={24} />,
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
    a: 'Да. Для доставки еды, продуктов и небольших заказов доступны пеший формат, велосипед и самокат. Набор предложений зависит от города.',
  },
  {
    q: 'Какие направления можно выбрать?',
    a: 'Еда и продукты, экспресс-доставка, плановые маршруты, автодоставка, грузовая доставка и велопомощник. Менеджер проверит, какие варианты доступны именно в вашем городе.',
  },
  {
    q: 'Указанный доход гарантирован?',
    a: 'Нет. На странице указаны ориентиры действующих предложений с главного сайта. Итоговое вознаграждение зависит от города, направления, транспорта, спроса, количества заказов и условий выбранного сервиса.',
  },
  {
    q: 'Это оформление по трудовому договору?',
    a: 'Формат сотрудничества зависит от выбранного сервиса и конкретного предложения. Это может быть договор с самозанятым или ИП, а для отдельных вакансий другой формат. Менеджер сообщит вид договора до оформления.',
  },
  {
    q: 'Нужна ли самозанятость?',
    a: 'Не для каждого направления действуют одинаковые требования. Если потребуется статус самозанятого, об этом скажут заранее и помогут разобраться с оформлением.',
  },
  {
    q: 'Нужна ли медицинская книжка?',
    a: 'Она может потребоваться для части предложений по доставке еды и продуктов. Для посылок, обычной и грузовой доставки требования отличаются.',
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

const Hero = ({
  headline,
  controller,
}: {
  headline: string;
  controller: ReturnType<typeof useCourierLead>;
}) => {
  const { track, scrollToOrder } = useLanding();

  return (
    <section
      data-testid="delivery-hero"
      className="delivery-hero relative overflow-hidden bg-green-50 pb-10 pt-20 lg:min-h-[760px] lg:pb-14 lg:pt-28"
    >
      <div className="delivery-hero-orb pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />
      <div className="delivery-hero-grid container relative mx-auto grid items-center gap-5 lg:grid-cols-[1fr_.7fr_1.04fr] lg:gap-6">
        <div className="delivery-hero-copy text-center lg:text-left">
          <p className="delivery-hero-badge inline-flex items-center rounded-full border border-green-200 bg-white/90 px-4 py-2 text-xs font-bold text-green-800 shadow-sm">
            Работа и подработка в доставке, 18+
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.6rem,9vw,4.3rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-slate-950 lg:mx-0 lg:mt-5">
            {headline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-700 sm:text-lg lg:mx-0 lg:mt-5">
            Еда, посылки и грузы. Пешком, на самокате, велосипеде или авто. Сравним доступные варианты в вашем городе.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row lg:mt-7 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToOrder('hero')}
              className="delivery-primary-cta inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-green-700 px-6 py-4 text-base font-bold text-[var(--on-accent)] shadow-[0_14px_35px_var(--accent-shadow)] transition-transform hover:-translate-y-0.5 hover:bg-green-600 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              Подобрать вариант <ArrowRight size={19} />
            </button>
            <a
              href={PHONE_HREF}
              onClick={() => track('phone_click', { place: 'hero' })}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/90 px-7 py-4 text-base font-bold text-slate-800 transition-colors hover:border-green-700 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <PhoneCall size={18} /> Позвонить
            </a>
          </div>
        </div>

        <figure
          data-testid="delivery-route-scene"
          className="delivery-route-scene relative aspect-[3/2] overflow-hidden rounded-[22px] border border-white/90 bg-green-950 shadow-[0_24px_60px_rgba(15,23,42,.18)] lg:h-[590px] lg:aspect-auto"
        >
          <img
            src={heroImage}
            alt="Курьеры пешего, вело- и автоформата перед началом работы"
            width="1536"
            height="1024"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center lg:object-[68%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,38,20,.06)_25%,rgba(3,18,9,.8)_100%)]" />
          <svg
            aria-hidden="true"
            viewBox="0 0 320 480"
            preserveAspectRatio="none"
            className="delivery-route-map pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              className="delivery-route-path"
              pathLength="1"
              d="M34 420 C 90 350, 35 280, 126 238 S 250 174, 286 68"
            />
          </svg>
          <span className="delivery-route-chip delivery-route-chip--foot"><Footprints size={16} /> Пешком</span>
          <span className="delivery-route-chip delivery-route-chip--bike"><Bike size={16} /> Вело</span>
          <span className="delivery-route-chip delivery-route-chip--car"><Car size={16} /> Авто</span>
          <figcaption className="delivery-route-caption absolute inset-x-0 bottom-0 z-10 p-5 text-left text-white lg:p-6">
            <span className="block font-oswald text-2xl font-bold uppercase leading-none">Один запрос — разные варианты</span>
            <span className="mt-2 block text-xs text-white/80 lg:text-sm">Город, транспорт и условия соберём в один понятный маршрут</span>
          </figcaption>
        </figure>

        <div id="apply" className="delivery-hero-form scroll-mt-24 rounded-[22px] border border-green-100 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-6">
          <CourierLeadForm idPrefix="hero-courier" captchaMount compact {...controller} />
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <div className="border-y border-green-100 bg-white">
    <div className="delivery-reveal delivery-trust-bar container mx-auto grid grid-cols-2 gap-x-5 gap-y-6 py-7 lg:grid-cols-4 lg:gap-x-0">
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

const FormatSection = ({
  value,
  onPick,
}: {
  value: CourierFormat;
  onPick: (format: CourierFormat) => void;
}) => (
  <section id="formats" className="scroll-mt-24 bg-white py-16 lg:py-24">
    <div className="delivery-reveal container mx-auto">
      <SectionHead
        kicker="С чего начнём"
        title="Выберите, на чём удобно работать"
        subtitle="Это не окончательное решение. После заявки проверим доступные предложения и поможем сравнить их по вашему городу."
      />

      <div className="delivery-format-rail mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-12 md:gap-4 md:overflow-visible md:pb-0">
        {DELIVERY_FORMATS.map((format, index) => {
          const selected = format.value === value;
          const spans = ['md:col-span-5', 'md:col-span-7', 'md:col-span-7', 'md:col-span-5'];
          return (
            <button
              key={format.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(format.value)}
              className={`${spans[index]} delivery-format-card group min-w-[82vw] snap-center cursor-pointer rounded-[20px] border p-6 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 md:min-w-0 ${
                selected
                  ? 'border-green-700 bg-green-700 text-[var(--on-accent)] shadow-[0_18px_45px_var(--accent-shadow)]'
                  : 'border-slate-200 bg-slate-50 text-slate-900 hover:-translate-y-1 hover:border-green-300 hover:bg-white'
              }`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selected ? 'bg-white/15 text-[var(--on-accent)]' : 'bg-white text-green-800 shadow-sm'}`}>
                {FORMAT_ICONS[format.id]}
              </span>
              <span className="mt-5 block font-oswald text-2xl font-bold uppercase">{format.title}</span>
              <span className={`mt-2 block max-w-xl text-sm leading-relaxed ${selected ? 'text-[var(--on-accent-soft)]' : 'text-slate-600'}`}>{format.description}</span>
              <span className={`mt-5 block text-xs font-semibold ${selected ? 'text-[var(--on-accent-soft)]' : 'text-green-800'}`}>{selected ? 'Выбрано для заявки' : format.fit}</span>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

const DirectionCard = ({
  direction,
  selected,
  onPick,
  className,
}: {
  direction: DeliveryDirectionCard;
  selected: boolean;
  onPick: (value: DeliveryDirection) => void;
  className: string;
}) => (
  <article className={`${className} delivery-direction-card relative overflow-hidden rounded-[20px] border p-6 transition-all duration-300 ${
    selected ? 'border-green-700 bg-green-50 shadow-[0_18px_55px_var(--accent-shadow)]' : 'border-slate-200 bg-white hover:-translate-y-1 hover:shadow-xl'
  }`}>
    <div className="flex items-start justify-between gap-4">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${selected ? 'bg-green-700 text-[var(--on-accent)]' : 'bg-green-50 text-green-800'}`}>
        {DIRECTION_ICONS[direction.id]}
      </span>
      <span className={`max-w-[64%] rounded-full px-3 py-1.5 text-right text-[11px] font-bold leading-snug ${
        selected ? 'bg-green-700 text-[var(--on-accent)]' : 'bg-green-50 text-green-800'
      }`}>
        {direction.reward}
      </span>
    </div>
    <h3 className="mt-5 font-oswald text-2xl font-bold uppercase leading-tight text-slate-950 lg:text-3xl">{direction.title}</h3>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">{direction.lead}</p>
    <p className="mt-4 border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-500">Формат: {direction.formats}</p>
    <div className="mt-5 space-y-2">
      {direction.facts.map(fact => (
        <p key={fact} className="flex items-start gap-2 text-sm text-slate-700">
          <Check size={17} className="mt-0.5 shrink-0 text-green-800" />
          <span>{fact}</span>
        </p>
      ))}
    </div>
    {direction.href ? (
      // У направления есть свой лендинг — уводим туда, а не выбираем его в форме этой страницы.
      <DirectionLink direction={direction} />
    ) : (
      <button
        type="button"
        onClick={() => onPick(direction.value)}
        aria-pressed={selected}
        className={`mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
          selected ? 'bg-green-700 text-[var(--on-accent)]' : 'border border-green-700 bg-white text-green-800 hover:bg-green-700 hover:text-[var(--on-accent)]'
        }`}
      >
        {selected ? 'Выбрано' : 'Выбрать'} <ArrowRight size={16} />
      </button>
    )}
  </article>
);

const DirectionLink = ({ direction }: { direction: DeliveryDirectionCard }) => {
  const { track } = useLanding();
  return (
    <a
      href={direction.href}
      onClick={() => track('direction_open', { direction: direction.value })}
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-700 bg-white px-5 py-3 text-sm font-bold text-green-800 transition-colors hover:bg-green-700 hover:text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
    >
      Открыть страницу <ArrowRight size={16} />
    </a>
  );
};

const DirectionsSection = ({
  value,
  onPick,
}: {
  value: DeliveryDirection;
  onPick: (direction: DeliveryDirection) => void;
}) => {
  const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-7', 'lg:col-span-5'];

  return (
    <section id="directions" className="scroll-mt-24 bg-green-50/60 py-16 lg:py-24">
      <div className="delivery-reveal container mx-auto">
        <SectionHead
          kicker="Направления"
          title="Все направления доставки"
          subtitle="Здесь собрана вся информация с главной страницы. Указанный ориентир не является обещанием конкретного дохода."
        />
        <div className="delivery-direction-grid mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {DELIVERY_DIRECTIONS.map((direction, index) => (
            <DirectionCard
              key={direction.id}
              direction={direction}
              selected={!direction.href && direction.value === value}
              onPick={onPick}
              className={spans[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => (
  <section id="compare" className="scroll-mt-24 bg-white py-16 lg:py-24">
    <div className="delivery-reveal container mx-auto">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28">
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
            className="mt-8 aspect-[16/9] w-full rounded-[20px] object-cover shadow-[0_18px_55px_rgba(15,23,42,.12)]"
          />
        </div>
        <div className="delivery-match-grid grid gap-4 sm:grid-cols-2">
          {[
            { icon: <Footprints size={22} />, title: 'Нет автомобиля', text: 'Пешая доставка, велосипед и самокат для еды, продуктов и небольших заказов.' },
            { icon: <Clock3 size={22} />, title: 'Нужна подработка', text: 'Ищем предложения с доступными днями и интервалами, которые можно совмещать.' },
            { icon: <Car size={22} />, title: 'Есть личное авто', text: 'Сравниваем экспресс, плановые рейсы и обычную автодоставку.' },
            { icon: <Truck size={22} />, title: 'Есть грузовой автомобиль', text: 'Проверяем подходящие грузы, маршруты и требования к кузову.' },
            { icon: <Wrench size={22} />, title: 'Разбираетесь в велосипедах', text: 'Можно рассмотреть направление велопомощника с поддержкой курьеров.' },
            { icon: <Smartphone size={22} />, title: 'Нет опыта', text: 'Для многих направлений опыт не нужен. Поможем разобраться с приложением и стартом.' },
          ].map(item => (
            <div key={item.title} className="delivery-match-card rounded-[18px] border border-slate-200 bg-slate-50 p-5">
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
  <section className="bg-green-50 py-16 lg:py-24">
    <div className="delivery-reveal container mx-auto">
      <div className="delivery-support-panel overflow-hidden rounded-[20px] border border-green-200 bg-white shadow-[0_24px_70px_var(--accent-shadow)]">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-green-700 p-7 text-[var(--on-accent)] lg:p-10">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--on-accent-soft)]">
              <span aria-hidden="true" className="h-px w-8 bg-green-200/50" />
              Барори Парк
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.025em]">Не оставляем после заявки</h2>
            <p className="mt-5 leading-relaxed text-[var(--on-accent-soft)]">
              Помогаем понять условия, подготовиться к подключению и решить вопросы после старта.
            </p>
          </div>
          <div className="grid sm:grid-cols-2">
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
  <section id="start" className="scroll-mt-24 bg-white py-16 lg:py-24">
    <div className="delivery-reveal container mx-auto">
      <SectionHead
        kicker="Как это работает"
        title="От заявки до доступных заказов"
        subtitle="Без длинной анкеты на сайте и без обещаний срока, который зависит от проверки сервиса."
      />
      <div className="delivery-route-steps mt-10 grid gap-4 md:grid-cols-4">
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
  <section className="bg-green-50/60 py-16 lg:py-24">
    <div className="delivery-reveal container mx-auto grid items-start gap-10 lg:grid-cols-[0.86fr_1.14fr]">
      <div>
        <SectionHead
          kicker="Требования"
          title="Что потребуется для старта"
          subtitle="Базовый список короткий. Дополнительные требования зависят от направления, поэтому их проверяем до оформления."
        />
        <div className="mt-7 rounded-[18px] border border-green-200 bg-green-700 p-6 text-[var(--on-accent)]">
          <p className="font-oswald text-2xl font-bold uppercase">Важно о договоре</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--on-accent-soft)]">
            Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, договор и порядок выплат сообщаются для конкретного предложения.
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          'Возраст от 18 лет',
          'Смартфон с доступом в интернет',
          'Документы для выбранного формата оформления',
          'Личный транспорт только для вело-, авто- и грузового формата',
          'Самозанятость, если её требует конкретный сервис',
          'Медицинская книжка только для части предложений с едой',
        ].map(item => (
          <div key={item} className="flex items-start gap-3 rounded-[16px] border border-slate-200 bg-white p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-800" />
            <span className="text-sm leading-relaxed text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CourierFaq = () => {
  const { track } = useLanding();

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="delivery-reveal container mx-auto grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
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

export const CourierPageContent = () => {
  const { track } = useLanding();
  const [campaign] = useState(() => readCampaignContext(typeof window === 'undefined' ? '' : window.location.search));
  const controller = useCourierLead(campaign);
  const hasCampaignHeadline = Boolean(campaign.city || campaign.format !== 'Пока не выбрал');
  const headline = hasCampaignHeadline ? formatCampaignHeadline({ ...campaign, format: controller.state.format }) : 'Работа в доставке';

  useEffect(() => {
    track('view', {
      city: campaign.city || 'not_set',
      format: campaign.format,
      direction: campaign.direction,
    });
    // Контекст рекламной кампании читается один раз при открытии страницы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickFormat = (format: CourierFormat) => {
    controller.setState(current => ({ ...current, format }));
    track('format_pick', { format });
  };

  const pickDirection = (direction: DeliveryDirection) => {
    controller.setState(current => ({ ...current, direction }));
    track('direction_pick', { direction });
  };

  return (
    <>
      <Hero headline={headline} controller={controller} />
      <TrustBar />
      <FormatSection value={controller.state.format} onPick={pickFormat} />
      <DirectionsSection value={controller.state.direction} onPick={pickDirection} />
      <ComparisonSection />
      <SupportSection />
      <StepsSection />
      <RequirementsSection />
      <CourierFaq />
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

        @keyframes delivery-route-pulse {
          0%, 100% { opacity: .7; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.12); }
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

        .delivery-route-scene::before {
          position: absolute;
          z-index: 4;
          top: 12%;
          right: 8%;
          width: 12px;
          height: 12px;
          content: '';
          border: 3px solid rgba(255, 255, 255, .92);
          border-radius: 999px;
          background: var(--color-green-600);
          box-shadow: 0 0 0 7px var(--accent-shadow);
          animation: delivery-route-pulse 2.4s ease-in-out 1.3s infinite;
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

        .delivery-route-chip--foot { top: 14%; left: 6%; animation-delay: .5s; }
        .delivery-route-chip--bike { top: 35%; left: 41%; animation-delay: .65s; }
        .delivery-route-chip--car { top: 10%; right: 6%; animation-delay: .8s; }

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

        .delivery-direction-card:nth-child(3n + 1):not(:has(button[aria-pressed='true'])) {
          background: var(--color-green-50);
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

        @media (min-width: 1024px) {
          .delivery-route-chip--foot { top: 67%; left: 8%; }
          .delivery-route-chip--bike { top: 40%; left: 35%; }
          .delivery-route-chip--car { top: 12%; right: 7%; }
          .delivery-route-scene::before { top: 9%; right: 8%; }
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
          .delivery-route-scene::before,
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
    legalNote="ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Отправка заявки не создаёт трудовые отношения. Формат сотрудничества, вид договора, доступность предложений и размер вознаграждения зависят от выбранного сервиса и города. Информация не является публичной офертой или гарантией дохода. 18+."
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
