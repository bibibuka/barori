// FILE: src/tariffs/TariffsLanding.tsx

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Wallet, 
  TrendingDown, 
  Headphones,
  ChevronRight,
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

/* ───────────────────────────── HERO ───────────────────────────── */
const Hero = () => {
  const { scrollToOrder } = useLanding();

  return (
    <section className="relative pt-28 lg:pt-32 pb-14 lg:pb-20 overflow-hidden bg-gradient-to-br from-green-50 via-green-50/40 to-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 text-center max-w-4xl px-4">
        <span className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white border border-green-200 text-green-800 text-xs sm:text-sm font-bold shadow-sm">
          <Sparkles size={15} className="text-green-600 animate-pulse" />
          Официальный партнёр сервисов • Честная комиссия
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-oswald uppercase leading-tight mb-5 text-gray-950">
          ТАРИФЫ <span className="text-green-600">БАРОРИ ПАРК</span>: ЧЕМ БОЛЬШЕ СМЕН — ТЕМ НИЖЕ КОМИССИЯ
        </h1>

        <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Подключение к Такси, Доставке, Сменам, Еде, Куперу и ТопГоу. 
          Прозрачные ставки, автоматическое снижение процента с ростом выполненных смен и вывод денег 24/7.
        </p>

        {/* 3 Quick highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto text-left">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-green-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
              <TrendingDown size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold">Минимум</div>
              <div className="text-lg font-bold font-oswald text-gray-900">от 3% комиссия</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-green-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold">Выплаты</div>
              <div className="text-lg font-bold font-oswald text-gray-900">Каждый день 24/7</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-green-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold">Прозрачность</div>
              <div className="text-lg font-bold font-oswald text-gray-900">Без скрытых списаний</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => scrollToOrder('hero')}
            className="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-green-200 hover:from-green-700 hover:to-emerald-700 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Оставить заявку на подключение</span>
            <ChevronRight size={20} />
          </button>
          <a
            href="#tariffs"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-200 px-7 py-4 rounded-2xl font-bold text-base hover:bg-gray-50 transition-colors shadow-sm"
          >
            Смотреть все тарифы ↓
          </a>
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
