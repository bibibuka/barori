// FILE: src/tariffs/TariffsLanding.tsx

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Wallet, 
  TrendingDown, 
  Headphones,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { 
  LandingShell, 
  Section, 
  SectionHead, 
  InfoCard, 
  Faq, 
  useLanding,
  PHONE_DELIVERY
} from '../landing/kit';
import { Tariffs } from '../components/Tariffs';
import { TariffsForm } from './TariffsForm';
import '../landing/service-editorial.css';

/* ───────────────────────────── HERO ───────────────────────────── */
const Hero = () => {
  const { scrollToOrder } = useLanding();

  return (
    <section className="service-hero tariffs-hero">
      <div className="container mx-auto service-hero-grid">
        <div className="service-hero-copy">
        <p className="service-eyebrow">
          <Sparkles size={16} />
          Официальный партнёр сервисов • Честная комиссия
        </p>

        <h1>
          Тарифы <span>Барори Парк</span>: чем больше смен — тем ниже комиссия
        </h1>

        <p className="service-lead">
          Подключение к Такси, Доставке, Сменам, Еде, Куперу и ТопГоу. 
          Прозрачные ставки, автоматическое снижение процента с ростом выполненных смен и вывод денег 24/7.
        </p>

        <div className="editorial-actions">
          <button
            type="button"
            onClick={() => scrollToOrder('hero')}
            className="editorial-button"
          >
            Оставить заявку на подключение
            <span><ArrowUpRight size={20} /></span>
          </button>
          <a
            href="#tariffs"
            className="editorial-text-link"
          >
            Смотреть все тарифы ↓
          </a>
        </div>
        </div>

        <div className="tariffs-hero-summary">
          <div className="tariffs-hero-rate">
            <div className="tariffs-hero-rate-top"><span>Минимум</span><TrendingDown size={30} /></div>
            <strong>от 3<span>%</span></strong>
            <p>комиссия</p>
          </div>
          <div className="tariffs-hero-detail">
            <span className="tariffs-hero-icon tariffs-hero-icon--blue"><Clock size={23} /></span>
            <div><span>Выплаты</span><strong>Каждый день 24/7</strong></div>
          </div>
          <div className="tariffs-hero-detail">
            <span className="tariffs-hero-icon tariffs-hero-icon--amber"><ShieldCheck size={23} /></span>
            <div><span>Прозрачность</span><strong>Без скрытых списаний</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────── ПРЕИМУЩЕСТВА ───────────────────────────── */
const Benefits = () => (
  <Section id="why" className="bg-white">
    <div className="container mx-auto px-4">
      <SectionHead
        kicker="Почему выбирают Барори Парк"
        title="Честные условия для каждого водителя и курьера"
        subtitle="Мы строим работу на доверии: фиксируем все условия до первого заказа, помогаем на каждом этапе и ценим активных исполнителей."
        className="max-w-3xl mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          icon={<TrendingDown size={28} className="text-green-600" />}
          title="Снижение процента за смены"
          text="Чем больше смен вы выходите, тем ниже ставка парка. Вы сами управляете своим доходом."
        />
        <InfoCard
          icon={<Wallet size={28} className="text-green-600" />}
          title="Моментальные выплаты 24/7"
          text="Вывод заработанных денег на карту любого банка в любое время дня и ночи, без задержек и ожидания."
        />
        <InfoCard
          icon={<Headphones size={28} className="text-green-600" />}
          title="Поддержка живыми кураторами"
          text="Никаких шаблонных роботов. Наши менеджеры на связи ежедневно с 10:00 до 20:00, оперативно решая любые вопросы."
        />
        <InfoCard
          icon={<ShieldCheck size={28} className="text-green-600" />}
          title="Договор и защита прав"
          text="Официальный договор-оферта. Парк защищает ваши интересы при спорных блокировках в сервисах."
        />
      </div>
    </div>
  </Section>
);

/* ───────────────────────────── FAQ ───────────────────────────── */
const FAQ_ITEMS = [
  {
    q: 'Как работает снижение процента за смены?',
    a: 'При подключении вы начинаете с базовой стартовой ставки. По мере выхода на смены и выполнения заказов комиссия автоматически снижается до минимальной (например, до 3% в Такси и Доставке, до 4% в Сменах).',
  },
  {
    q: 'Есть ли скрытые списания или комиссии за вывод денег?',
    a: 'Нет. Комиссия парка прозрачна и фиксируется до начала работы. Никаких скрытых платежей, платных звонков кураторам или скрытых удержаний.',
  },
  {
    q: 'В каких сервисах действует фиксированная ставка?',
    a: 'В сервисе Купер действует фиксированная комиссия 5%, а в логистическом сервисе ТопГоу — единая фиксированная ставка 7% с первой смены без изменений.',
  },
  {
    q: 'Как быстро я смогу выйти на линию после заявки?',
    a: 'Менеджер связывается с вами в течение 15 минут, помогает проверить документы и настроить приложение. Большинство исполнителей выходят на первую смену уже в день обращения.',
  },
  {
    q: 'Нужно ли оформлять самозанятость?',
    a: 'Сотрудничество происходит в официальном статусе самозанятого или ИП. Если у вас еще нет самозанятости, мы поможем оформить её бесплатно за 10 минут прямо со смартфона.',
  },
];

/* ───────────────────────────── СТРАНИЦА ───────────────────────────── */
export const TariffsLanding: React.FC = () => {
  return (
    <LandingShell
      goalPrefix="tariffs"
      ctaLabel="Оставить заявку"
      stickyLabel="Выбрать тариф"
      footerAbout="Барори Парк — официальный партнёр Яндекс Такси, Яндекс Доставки, Яндекс Смен, Яндекс Еды, Купера и ТопГоу. Прозрачные комиссии и моментальные выплаты."
      phone={PHONE_DELIVERY}
      nav={[
        { href: '#tariffs', label: 'Тарифы' },
        { href: '#why', label: 'Преимущества' },
        { href: '#faq', label: 'Вопросы и ответы' },
        { href: '#order', label: 'Подключение' },
      ]}
    >
      <Hero />
      <Tariffs />
      <Benefits />
      <Faq 
        items={FAQ_ITEMS} 
        title="Всё о тарифах, комиссиях и выплатах" 
        subtitle="Ответы на главные вопросы об условиях сотрудничества с Барори Парк." 
      />
      <TariffsForm />
    </LandingShell>
  );
};
