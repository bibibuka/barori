// FILE: src/smena/SmenaLanding.tsx
//
// Изолированный лендинг направления ЯНДЕКС СМЕНА (/smena/).
// Главная задача страницы: объяснить человеку, который вообще не знает, что такое
// «Яндекс Смена» — сначала объясняем механику простыми словами, только потом продаём.
// Каркас — из src/landing/kit.tsx, ссылок на основной сайт нет.

import {
  PhoneCall, Wallet, CalendarClock, MapPin, ChevronRight, CheckCircle2, Smartphone,
  ShieldCheck, Clock, Star, Quote, ShoppingCart, Package, ChefHat, Sparkles,
  Boxes, Croissant, Store, Brush, HelpCircle, GraduationCap, Baby, Briefcase,
  MessageCircle, HeartPulse, ThumbsUp,
} from 'lucide-react';
import {
  LandingShell, Section, SectionHead, InfoCard, OrderButton, Faq, useLanding, PHONE_SMENA,
} from '../landing/kit';
import { SmenaForm } from './SmenaForm';
import '../landing/service-directions.css';

/* ─────────────────────────────  ПЕРВЫЙ ЭКРАН  ───────────────────────────── */

const Hero = () => {
  const { track, scrollToOrder, phone } = useLanding();
  return (
    <section className="service-hero direction-hero">
      <div className="container mx-auto service-hero-grid">
        <div className="service-hero-copy">
          <span className="service-eyebrow direction-hero-eyebrow">
            <span aria-hidden="true" />
            Яндекс Смена — подработка без трудоустройства, 18+
          </span>

          <h1 className="direction-hero-title">
            Подработка на 4–12 часов: <span className="text-green-800">деньги обычно на следующий день</span>
          </h1>

          <p className="service-lead">
            Выбрали смену в приложении — пришли — отработали — получили деньги.
            Без собеседований, трудовой книжки и начальника, который ставит график.
          </p>

          <div className="direction-income">
            <span className="text-xs tracking-wider text-gray-400 font-semibold mb-1">Оплата за смену</span>
            <span className="text-4xl lg:text-5xl font-bold text-green-800 leading-none">
              2 000 – 4 000 ₽<span className="text-lg align-super text-gray-300">*</span>
            </span>
            <span className="text-sm text-gray-500 mt-2">зависит от вида смены, города и её длительности</span>
          </div>

          <div className="direction-hero-actions">
            <button
              onClick={() => scrollToOrder('hero')}
              className="direction-primary-button"
            >
              Начать подрабатывать
              <ChevronRight size={20} />
            </button>
            <a
              href={phone.href}
              onClick={() => track('phone_click', { place: 'hero' })}
              className="direction-secondary-button"
            >
              <PhoneCall size={20} />
              Задать вопрос
            </a>
          </div>

          <p className="mt-5 text-sm text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Не поняли, что это за формат? Ниже объясняем по шагам — за минуту станет ясно.
          </p>

          <p className="mt-3 text-xs text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            *Ориентир по ставкам популярных смен. Не является гарантией дохода: сумма зависит
            от вида смены, города, её длительности и условий конкретного заказчика.
          </p>
        </div>

        {/* Правая колонка — «как это работает» в четырёх шагах прямо на первом экране */}
        <div className="service-hero-visual direction-summary direction-summary--smena">
          <h2 className="text-xl font-bold mb-1 text-gray-800">Если совсем коротко</h2>
          <p className="text-sm text-gray-500 mb-5">Четыре шага — и деньги у вас на карте</p>
          <ol className="direction-summary-list">
            {[
              { n: 1, icon: <Smartphone size={20} />, text: 'Открываете приложение и видите список смен рядом с домом' },
              { n: 2, icon: <CalendarClock size={20} />, text: 'Выбираете день, время и место — что удобно именно вам' },
              { n: 3, icon: <CheckCircle2 size={20} />, text: 'Приходите и отрабатываете смену: от 4 до 12 часов' },
              { n: 4, icon: <Wallet size={20} />, text: 'Получаете оплату — обычно на следующий день' },
            ].map(step => (
              <li key={step.n} className="flex gap-4 items-start">
                <span className="direction-summary-number">
                  {step.n}
                </span>
                <div className="flex items-start gap-2 pt-1.5">
                  <span className="text-green-800 shrink-0">{step.icon}</span>
                  <p className="text-gray-700 text-sm leading-snug">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <button
            onClick={() => scrollToOrder('hero_card')}
            className="direction-primary-button mt-6 w-full"
          >
            Хочу попробовать
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  ПОЛОСА ДОВЕРИЯ  ───────────────────────────── */

const TrustBar = () => (
  <div className="direction-trust-strip">
    <div className="container mx-auto py-6 lg:py-7">
      <div className="direction-trust-grid">
        {[
          { icon: <Wallet size={22} />, title: 'Оплата за смену', text: 'а не два раза в месяц' },
          { icon: <CalendarClock size={22} />, title: 'Смены от 4 часов', text: 'выбираете сами' },
          { icon: <MapPin size={22} />, title: 'Рядом с домом', text: 'если смены есть в районе' },
          { icon: <ThumbsUp size={22} />, title: 'Без опыта', text: 'всему учат на месте' },
        ].map(item => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="direction-trust-icon">{item.icon}</span>
            <div>
              <p className="font-bold text-base lg:text-lg leading-tight">{item.title}</p>
              <p className="direction-trust-note">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ───────────────────  ЧТО ЭТО ТАКОЕ: ГЛАВНЫЙ БЛОК  ─────────────────── */

const WhatIsIt = () => (
  <Section id="what" className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Объясняем"
        title="Что такое Яндекс Смена простыми словами"
      />

      {/* На десктопе объяснение и таблица идут рядом (5/7), а не одной узкой колонкой. */}
      <div className="mt-10 max-w-4xl mx-auto lg:max-w-none lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="smena-explanation rounded-3xl l-glass border border-green-100 p-6 lg:p-8 mb-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mb-0">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 shrink-0 rounded-xl bg-green-600 text-[var(--on-accent)] flex items-center justify-center">
              <HelpCircle size={24} />
            </span>
            <div>
              <p className="text-lg text-gray-800 leading-relaxed mb-3">
                <strong>Это приложение, где магазины, склады, кухни и пункты выдачи публикуют
                отдельные рабочие смены</strong> — на конкретный день и конкретное время.
                Вы заходите, смотрите, что есть рядом с вами, и берёте смену, которая вам подходит.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Работает как такси, только вместо поездок — рабочие смены. Никто не обязывает выходить
                каждый день: взяли смену — отработали — получили деньги. Не нужны деньги на этой
                неделе — просто не берёте смены, и никому ничего объяснять не надо.
              </p>
            </div>
          </div>
        </div>

        {/* Сравнение с обычной работой — снимает главное непонимание */}
        <div className="smena-comparison rounded-3xl border border-gray-200 overflow-hidden l-glass shadow-lg lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <div className="grid grid-cols-2">
            <div className="bg-gray-50 px-4 py-3 border-b border-r border-gray-200">
              <p className="font-bold text-gray-500 text-sm lg:text-base">Обычная работа</p>
            </div>
            <div className="bg-green-600 px-4 py-3 border-b border-green-600">
              <p className="font-bold text-[var(--on-accent)] text-sm lg:text-base">Яндекс Смена</p>
            </div>
          </div>
          {[
            ['Собеседование и ожидание ответа', 'Выбрали смену в приложении и вышли'],
            ['Трудовой договор, трудовая книжка', 'Самозанятость — оформляется за 15 минут'],
            ['График ставит начальник', 'График ставите вы: день, время, место'],
            ['Зарплата два раза в месяц', 'Оплата за смену — обычно на следующий день'],
            ['Не понравилось — надо увольняться', 'Не понравилось — просто не берёте смены там'],
            ['Отработка две недели', 'Никакой отработки: смена закончилась — вы свободны'],
          ].map(([left, right], i) => (
            <div key={left} className={`grid grid-cols-2 ${i % 2 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <div className="px-4 py-3.5 border-r border-gray-200 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span className="text-gray-500 text-sm leading-snug">{left}</span>
              </div>
              <div className="px-4 py-3.5 flex items-start gap-2">
                <CheckCircle2 className="text-green-800 shrink-0 mt-0.5" size={17} />
                <span className="text-gray-800 text-sm leading-snug font-medium">{right}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center lg:col-span-12 lg:col-start-1 lg:row-start-2 lg:text-left">
          <OrderButton place="what_is_it">Понятно, хочу смену<ChevronRight size={20} /></OrderButton>
          <p className="mt-3 text-xs text-gray-400">
            Остались вопросы — задайте их менеджеру, он объяснит на пальцах и без давления.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ВИДЫ СМЕН  ───────────────────────────── */

// Ставки взяты из справочника вакансий основного сайта (за смену).
const SHIFTS = [
  { icon: <Package size={24} />, title: 'Сборка заказов', pay: 'от 3 500 ₽', text: 'Собираете заказы по списку в торговом зале или на складе. Работа с терминалом, взвешивание, упаковка.' },
  { icon: <ShoppingCart size={24} />, title: 'Касса', pay: 'от 3 300 ₽', text: 'Расчёт покупателей, работа с кассой, помощь в прикассовой зоне. Подходит тем, кто общительный.' },
  { icon: <Boxes size={24} />, title: 'Выкладка товаров', pay: 'от 3 000 ₽', text: 'Раскладываете товар в зале, следите за ценниками и сроками. Простая и понятная смена.' },
  { icon: <Store size={24} />, title: 'Разгрузка', pay: 'от 2 800 ₽', text: 'Разгрузка машин, перенос товара на склад, поддержание порядка. Для тех, кому не сидится на месте.' },
  { icon: <ChefHat size={24} />, title: 'Кухня и кулинария', pay: 'от 2 200 ₽', text: 'Помощь повару, нарезка, фасовка, приготовление по тех. картам. Нужна медкнижка — оформим бесплатно.' },
  { icon: <Croissant size={24} />, title: 'Выпечка', pay: 'от 2 500 ₽', text: 'Формовка теста, выпечка, выкладка продукции на витрину. Тёплое место в холодное время года.' },
  { icon: <Brush size={24} />, title: 'Уборка и мытьё посуды', pay: 'от 3 000 ₽', text: 'Уборка торговых и сервисных зон, мытьё посуды и инвентаря. Без общения с покупателями.' },
  { icon: <Sparkles size={24} />, title: 'Пункт выдачи заказов', pay: 'от 2 000 ₽', text: 'Приём и выдача заказов, ведение документации, порядок в пункте. Спокойный темп.' },
  { icon: <Store size={24} />, title: 'Обслуживание за прилавком', pay: 'от 2 800 ₽', text: 'Выкладка и нарезка товара. Обслуживание посетителей. Обновление ценников.' },
  { icon: <Package size={24} />, title: 'Фасовка продукции', pay: 'от 3 000 ₽', text: 'Сортировка овощей и фруктов. Стикеровка. Поддержание чистоты.' },
  { icon: <Boxes size={24} />, title: 'Прессовка материалов', pay: 'до 2 300 ₽', text: 'Прессовка картона и плёнки. Работа на пресс-машине. Соблюдение техники безопасности.' },
];

const ShiftTypes = () => (
  <Section id="shifts" className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Виды смен"
        title="Какие смены бывают"
        subtitle="Список зависит от вашего города и дня. Начать можно с самой простой смены, а дальше выбирать то, что понравилось."
      />
      <div className="direction-shift-grid mt-10">
        {SHIFTS.map(shift => (
          <div key={shift.title} className="direction-shift-card l-glass p-5 rounded-2xl border border-gray-100 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-800 flex items-center justify-center mb-4">
              {shift.icon}
            </div>
            <h3 className="text-lg font-bold leading-tight mb-1">{shift.title}</h3>
            <p className="text-green-800 font-bold text-xl mb-2">{shift.pay}</p>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">{shift.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Ставки указаны как ориентир за смену по популярным направлениям и не являются гарантией дохода:
        итог зависит от города, длительности смены и условий конкретного заказчика.
      </p>
      <div className="mt-8 text-center">
        <OrderButton place="shift_types">Подобрать смену в моём городе<ChevronRight size={20} /></OrderButton>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  КОМУ ПОДХОДИТ  ───────────────────────────── */

const ForWhom = () => (
  <Section className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Кому подходит"
        title="Кто берёт смены чаще всего"
        subtitle="Формат удобен там, где обычная работа не подходит по графику или по срокам."
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {[
          { icon: <GraduationCap size={24} />, title: 'Студентам', text: 'Смены между парами и на выходных, без ущерба учёбе и без записи в трудовой.' },
          { icon: <Briefcase size={24} />, title: 'Между работами', text: 'Ищете постоянное место — берите смены, чтобы не сидеть без денег во время поиска.' },
          { icon: <Wallet size={24} />, title: 'Для подработки', text: 'Есть основная работа, но хочется больше — выходите вечерами и в выходные.' },
          { icon: <Baby size={24} />, title: 'Родителям', text: 'Смены по 4 часа рядом с домом — можно совмещать с делами семьи.' },
        ].map(item => <InfoCard key={item.title} {...item} />)}
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ПЕРВАЯ СМЕНА  ───────────────────────────── */

const FirstShift = () => (
  <Section id="start" className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Первый раз"
        title="Как пройдёт ваша первая смена"
        subtitle="Самый частый страх — «я приду и не буду понимать, что делать». Вот как это выглядит на самом деле."
      />
      <div className="direction-steps direction-steps--five mt-10">
        {[
          { n: '01', title: 'Заявка и звонок', text: 'Оставляете заявку — менеджер звонит, объясняет формат и помогает с самозанятостью.' },
          { n: '02', title: 'Доступ к сменам', text: 'Помогаем оформиться и получить доступ, показываем, где смотреть смены и как их брать.' },
          { n: '03', title: 'Выбор смены', text: 'Выбираете первую смену: советуем начать с простой и недалеко от дома.' },
          { n: '04', title: 'На месте', text: 'Приходите к указанному времени, вас встречают и объясняют задачу. Опыт не нужен.' },
          { n: '05', title: 'Оплата', text: 'Смена закрыта — оплата уходит вам. Дальше решаете сами, брать ли ещё.' },
        ].map(step => (
          <div key={step.n} className="direction-step">
            <span className="direction-step-number">{step.n}</span>
            <h3 className="text-base font-bold mt-2 mb-2 leading-tight">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <OrderButton place="first_shift">Записаться на первую смену<ChevronRight size={20} /></OrderButton>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ТРЕБОВАНИЯ  ───────────────────────────── */

const Requirements = () => (
  <Section className="l-tint">
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto lg:max-w-none grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHead
            kicker="Требования"
            title="Что нужно, чтобы начать"
            subtitle="Резюме, опыт и знакомства не нужны. Нужны совершеннолетие, документы и желание выйти на смену — остальное поможем оформить."
          />
          <div className="mt-7 rounded-2xl bg-green-100 border border-green-200 p-5">
            <p className="font-bold text-green-800 text-xl mb-1">Медкнижка — бесплатно</p>
            <p className="text-gray-600 text-sm">
              Нужна для смен, где есть контакт с продуктами и едой. Оформление берём на себя,
              вам платить не придётся.
            </p>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-7">
          {[
            'Возраст 18 лет и старше — есть отдельные задания с 16 лет, но их немного: уточните у менеджера',
            'Паспорт и СНИЛС',
            'Самозанятость — оформим вместе бесплатно, если статуса ещё нет',
            'Смартфон с интернетом — смены выбираются в приложении',
            'Готовность прийти вовремя: смену ждут и на неё рассчитывают',
            'Иностранным гражданам — при полном пакете документов на работу в России, уточните у менеджера',
          ].map(item => (
            <li key={item} className="flex items-start gap-3 l-glass p-4 rounded-xl border border-gray-100 shadow-sm">
              <CheckCircle2 className="text-green-800 shrink-0 mt-0.5" size={20} />
              <span className="text-gray-700 text-sm lg:text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200 lg:col-span-12">
          <ShieldCheck className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <span className="text-amber-900 text-sm leading-relaxed">
            Набор доступных смен и требования к документам зависят от города и заказчика.
            Менеджер проверит вашу ситуацию бесплатно и скажет прямо, что доступно сейчас.
          </span>
        </div>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ПОЧЕМУ ЧЕРЕЗ НАС  ───────────────────────────── */

const WhyUs = () => (
  <Section id="why" className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Почему мы"
        title="Зачем оформляться через Барори Парк"
        subtitle="Приложение — это инструмент. Мы — те, кто помогает разобраться с оформлением и не остаться один на один с проблемой."
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {[
          { icon: <Smartphone size={24} />, title: 'Поможем оформиться', text: 'Самозанятость, документы, доступ к сменам и настройка приложения — проведём по шагам.' },
          { icon: <HeartPulse size={24} />, title: 'Медкнижка за наш счёт', text: 'Без неё не пустят на пищевые смены. Оформление оплачиваем мы.' },
          { icon: <MessageCircle size={24} />, title: 'Живая поддержка', text: 'Что-то пошло не так на смене или не пришла оплата — пишите нам, разберёмся.' },
          { icon: <Clock size={24} />, title: 'Ответ за 15 минут', text: 'Звоним в рабочее время 10:00–20:00 и без «пришлите резюме, мы перезвоним».' },
          { icon: <MapPin size={24} />, title: 'Подскажем, что рядом', text: 'Поможем сориентироваться, какие смены есть в вашем районе и городе.' },
          { icon: <ThumbsUp size={24} />, title: 'Говорим честно', text: 'Если в вашем городе смен мало — скажем сразу и предложим другие направления парка.' },
        ].map(item => <InfoCard key={item.title} {...item} />)}
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ЧЕСТНО  ───────────────────────────── */

const Honest = () => (
  <Section className="direction-honest">
    <div className="container mx-auto">
      <div className="direction-honest-panel">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-11 h-11 rounded-xl bg-green-600/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-green-400" size={24} />
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold leading-tight">Честно: как это оформляется</h2>
        </div>
        <p className="text-gray-300 leading-relaxed mb-6 lg:max-w-3xl">
          Смены — это <strong className="text-white">не трудоустройство</strong>. Вы работаете как
          самозанятый исполнитель и берёте отдельные смены. Даём полную информацию — а вы уже
          принимаете решение.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {[
            { title: 'Записи в трудовой книжке нет', text: 'Стаж по такой работе не идёт. Зато нет и обязательств: не хотите — не выходите.' },
            { title: 'Налог — 6%', text: 'Смены оплачивает компания, поэтому ставка самозанятого фиксированная — 6%. Считает приложение «Мой налог», декларации сдавать не нужно.' },
            { title: 'Отпускных и больничных нет', text: 'Так устроен режим самозанятости по закону — это обратная сторона свободного графика.' },
            { title: 'Смены нужно закрывать', text: 'Взяли смену — на вас рассчитывают. Постоянные неявки закроют доступ к сменам.' },
          ].map(item => (
            <div key={item.title} className="direction-honest-card rounded-2xl p-5">
              <p className="font-bold text-lg mb-1.5 text-green-400">{item.title}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ОТЗЫВЫ  ───────────────────────────── */

// Реальные отзывы с карточки компании (те же, что на основном сайте).
const REVIEWS = [
  {
    name: 'Халил Магомедов', role: 'Знаток города 3 уровня', emoji: '😃',
    text: 'Пришёл, вежливо обслужили, быстро помогли, проверили готовность на работу, дали советы, подсказали как и где лучше брать заказы. Огромное спасибо работникам, отзывчивость на уровне.',
  },
  {
    name: 'Владимир Бондарь', role: 'Знаток города 4 уровня', emoji: '😀',
    text: 'Отличный сервис. Решают очень много вопросов и довольно быстро. Сотрудничаю с ними уже пятый месяц и ни разу не пожалел о выборе парка. Спасибо за ваш профессионализм.',
  },
  {
    name: 'Александр Султан', role: 'Знаток города 3 уровня', emoji: '😄',
    text: 'Хочу выразить благодарность сотрудникам Барори Парк за их помощь в решении различных спорных вопросов. Всегда готовы выслушать и помочь. Настоящие профессионалы в своём деле!',
  },
];

const Reviews = () => (
  <Section className="l-tint">
    <div className="container mx-auto">
      <SectionHead kicker="Отзывы" title="Что говорят исполнители" />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {REVIEWS.map(review => (
          <div key={review.name} className="relative l-glass p-6 rounded-2xl border border-gray-100 shadow-lg">
            <Quote size={34} className="text-green-200/70 absolute top-4 right-4" />
            <div className="flex items-center gap-3 mb-4">
              <div role="img" aria-label={review.name} className="w-12 h-12 rounded-full bg-green-50 border-2 border-green-600 flex items-center justify-center text-2xl">
                {review.emoji}
              </div>
              <div>
                <p className="font-bold ">{review.name}</p>
                <p className="text-xs text-gray-500">{review.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-gray-600 italic text-sm leading-relaxed">«{review.text}»</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  FAQ  ───────────────────────────── */

const FAQ = [
  {
    q: 'Это точно не обман? Деньги правда платят?',
    a: 'Оплата идёт через сервис за фактически отработанную смену — это не «оплата после испытательного срока» и не обещания на словах. Барори Парк помогает с оформлением и подключением, а если оплата задерживается или возник спор — вы пишете нам, и мы разбираемся с сервисом.',
  },
  {
    q: 'Мне нужен опыт работы?',
    a: 'Нет. Смены рассчитаны на людей без опыта: на месте объясняют, что делать. Начать проще всего с простой смены — выкладки, разгрузки или уборки.',
  },
  {
    q: 'Обязательно ли оформлять самозанятость?',
    a: 'Для граждан России — да: работа на сменах устроена как сотрудничество с самозанятым. Если статуса нет, оформим вместе бесплатно через приложение «Мой налог», это около 15 минут и без похода в налоговую. Для иностранных граждан возможен другой вариант оформления при полном пакете документов — уточните у менеджера.',
  },
  {
    q: 'Я гражданин другой страны. Можно брать смены?',
    a: 'Да, вариант есть — при полном пакете документов, дающих право работать в России. Набор документов зависит от вашего статуса, поэтому менеджер бесплатно проверит вашу ситуацию и скажет прямо, что доступно сейчас.',
  },
  {
    q: 'Когда я получу деньги за смену?',
    a: 'Обычно оплата приходит на следующий день после смены. Точные сроки зависят от заказчика и способа выплаты — менеджер скажет, как это работает по вашим сменам.',
  },
  {
    q: 'Сколько смен можно брать?',
    a: 'Столько, сколько есть в вашем городе и сколько вы готовы отработать: можно одну смену в неделю, можно каждый день. Минимальной обязательной нормы нет.',
  },
  {
    q: 'А если я взял смену и заболел?',
    a: 'Предупредите как можно раньше — смену снимут или передадут другому исполнителю. Разово это нормально. Но если не приходить регулярно и молча, доступ к сменам закроют: заказчик на вас рассчитывает.',
  },
  {
    q: 'Мне не понравилось место. Что делать?',
    a: 'Просто не берите там смены снова — увольняться и объясняться не нужно. Выбираете другое место или другой вид смены.',
  },
  {
    q: 'Нужна ли медкнижка?',
    a: 'Для смен, связанных с продуктами и едой, — да. Оформление медкнижки мы берём на себя, для вас это бесплатно. Для смен без контакта с продуктами она обычно не требуется.',
  },
  {
    q: 'Идёт ли стаж и будет ли запись в трудовой книжке?',
    a: 'Нет. Это не трудовые отношения, а сотрудничество с самозанятым: записи в трудовой книжке и трудового стажа по таким сменам не будет. Взамен — свободный график и оплата за каждую отработанную смену.',
  },
  {
    q: 'Смены есть только в Москве и Санкт-Петербурге?',
    a: 'Направление работает и в других городах, но количество смен сильно отличается. Оставьте заявку — менеджер посмотрит, что доступно именно в вашем городе, и честно скажет, если смен мало.',
  },
];

/* ─────────────────────────────  СТРАНИЦА  ───────────────────────────── */

export const SmenaLanding = () => {
  return (
    <LandingShell
      goalPrefix="smena"
      phone={PHONE_SMENA}
      ctaLabel="Взять смену"
      stickyLabel="Оставить заявку на смены"
      footerAbout="Помогаем оформиться и начать брать смены: самозанятость, медкнижка, доступ к сменам и поддержка на связи."
      nav={[
        { href: '#what', label: 'Что это такое' },
        { href: '#shifts', label: 'Виды смен' },
        { href: '#start', label: 'Первая смена' },
        { href: '#faq', label: 'Вопросы' },
      ]}
    >
      <Hero />
      <TrustBar />
      <WhatIsIt />
      <ShiftTypes />
      <ForWhom />
      <FirstShift />
      <Requirements />
      <WhyUs />
      <Honest />
      <Reviews />
      <Faq items={FAQ} title="Частые вопросы о сменах" />
      <SmenaForm />
    </LandingShell>
  );
};
