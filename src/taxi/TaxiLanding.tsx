// FILE: src/taxi/TaxiLanding.tsx
//
// Изолированный лендинг одного направления — ВОДИТЕЛЬ ТАКСИ (/taxi/).
// Каркас (шапка, футер, юрмодалки, отправка заявки) — из src/landing/kit.tsx.
// Ни одной ссылки на основной сайт: только якоря и телефон.

import { useState } from 'react';
import {
  PhoneCall, Wallet, Rocket, MessageCircle, CalendarClock, ChevronRight, CheckCircle2,
  Fuel, Car, FileCheck, ShieldCheck, Star, Quote, XCircle, Headphones, Building2,
} from 'lucide-react';
import {
  LandingShell, Section, SectionHead, InfoCard, OrderButton, Faq, ChoiceGroup, useLanding,
} from '../landing/kit';
import { TaxiForm } from './TaxiForm';

// Ставка за час «грязными» (оборот на линии до комиссии и топлива) — ориентир, не гарантия дохода.
// Считана обратным ходом из рыночных данных по СПб на 2026 год: 4 500–8 000 ₽ чистыми
// за 12-часовую смену на своём авто → при топливе ~1 200 ₽ и комиссии ~25% это 650–1 000 ₽/час.
// Берём середину; 12 часов по этой ставке дают верх вилки на первом экране.
const HOUR_RATE = 800;

// Пиковый день — вечерние часы, непогода, повышенный спрос: по данным петербургских парков
// это 880–1 100 ₽/час на линии. Берём 1 000 — тогда 12 часов дают верх вилки первого экрана.
const PEAK_HOUR_RATE = 1000;

type DayKind = 'Обычный день' | 'Пиковый день';

/* ─────────────────────────────  ПЕРВЫЙ ЭКРАН  ───────────────────────────── */

const Hero = () => {
  const { track, scrollToOrder, phone } = useLanding();
  return (
    <section className="relative pt-28 lg:pt-32 pb-14 lg:pb-20 overflow-hidden bg-gradient-to-br from-green-50 via-green-50/40 to-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white border border-green-200 text-green-800 text-xs sm:text-sm font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Таксопарк Барори Парк — подключение к Яндекс Такси, 18+
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight mb-4">
            Работа в такси: <span className="text-green-800">на линию — уже завтра</span>
          </h1>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Подключим к Яндекс Такси, поможем с самозанятостью и документами.
            Выплаты — хоть каждый день, смены выбираете сами: полный день, вечера или только выходные.
          </p>

          <div className="inline-flex flex-col items-center lg:items-start bg-white rounded-2xl border border-green-100 shadow-lg shadow-green-900/5 px-6 py-4 mb-6">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Доход за смену</span>
            <span className="text-4xl lg:text-5xl font-bold font-oswald text-green-800 leading-none">
              4 500 – 12 000 ₽<span className="text-lg align-super text-gray-300">*</span>
            </span>
            <span className="text-sm text-gray-500 mt-2">смена 6–12 часов, до вычета топлива и комиссии</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() => scrollToOrder('hero')}
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-[var(--on-accent)] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-200 hover:from-green-700 hover:to-green-600 transition-all hover:scale-[1.02] animate-btn-pulse"
            >
              Подключиться к такси
              <ChevronRight size={20} />
            </button>
            <a
              href={phone.href}
              onClick={() => track('phone_click', { place: 'hero' })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-green-600 text-green-800 hover:bg-green-600 hover:text-[var(--on-accent)] transition-colors"
            >
              <PhoneCall size={20} />
              Позвонить
            </a>
          </div>

          <p className="mt-5 text-sm text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Барори Парк — партнёрский таксопарк: подключаем к сервису, помогаем с документами
            и решаем спорные ситуации вместо вас.
          </p>

          <p className="mt-3 text-xs text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            *Нижняя граница — короткая смена в обычный день, верхняя — полная смена в пиковый:
            вечерние часы, непогода, повышенный спрос. Не является гарантией дохода: итог зависит
            от города, класса автомобиля, времени работы, спроса и количества заказов.
          </p>
        </div>

        {/* Правая колонка — карточка «что вы получаете» вместо фотостока */}
        <div className="l-glass rounded-3xl border border-green-100 shadow-2xl shadow-green-900/10 p-6 lg:p-8">
          <h2 className="text-xl font-bold font-oswald uppercase mb-5 text-gray-800">Что вы получаете при подключении</h2>
          <ul className="space-y-4">
            {[
              { icon: <Rocket size={20} />, title: 'Подключение за 15 минут', text: 'Документы принимаем онлайн — приезжать в офис не обязательно.' },
              { icon: <Wallet size={20} />, title: 'Выплаты хоть каждый день', text: 'Деньги за смену на карту — без ожидания «до аванса».' },
              { icon: <FileCheck size={20} />, title: 'Помощь с оформлением', text: 'Самозанятость, документы, требования сервиса — разберём вместе и бесплатно.' },
              { icon: <Headphones size={20} />, title: 'Поддержка по блокировкам', text: 'Спорный заказ, низкий рейтинг, блокировка — пишем и решаем мы.' },
            ].map(item => (
              <li key={item.title} className="flex gap-4">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-green-50 text-green-800 flex items-center justify-center">{item.icon}</span>
                <div>
                  <p className="font-bold font-oswald text-lg leading-tight">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-snug">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollToOrder('hero_card')}
            className="mt-6 w-full cursor-pointer bg-green-600 hover:bg-green-700 text-[var(--on-accent)] font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-200"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  ПОЛОСА ДОВЕРИЯ  ───────────────────────────── */

const TrustBar = () => (
  <div className="bg-green-700 text-[var(--on-accent)]">
    <div className="container mx-auto py-6 lg:py-7">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: <Wallet size={22} />, title: 'Выплаты каждый день', text: 'по вашему запросу' },
          { icon: <Rocket size={22} />, title: 'Подключение за 15 минут', text: 'онлайн, без очередей' },
          { icon: <CalendarClock size={22} />, title: 'График — ваш', text: 'хоть только по выходным' },
          { icon: <MessageCircle size={22} />, title: 'Поддержка 24/7', text: 'живой человек, не бот' },
        ].map(item => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 text-[var(--on-accent-soft)]">{item.icon}</span>
            <div>
              <p className="font-bold font-oswald text-base lg:text-lg leading-tight">{item.title}</p>
              <p className="text-[var(--on-accent-soft)] text-xs lg:text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────  ДЕНЬГИ  ───────────────────────────── */

const Money = () => {
  const [hours, setHours] = useState(10);
  const [days, setDays] = useState(5);
  const [fuel, setFuel] = useState(1200);
  const [day, setDay] = useState<DayKind>('Пиковый день');

  const isPeak = day === 'Пиковый день';
  const round = (n: number) => Math.round(n / 100) * 100;
  const gross = round((isPeak ? PEAK_HOUR_RATE : HOUR_RATE) * hours);
  const net = Math.max(0, round(gross - fuel));
  // Неделя и месяц всегда по обычной ставке: месяца из одних пиковых дней не бывает,
  // иначе итоговая цифра превращается в рекламное обещание.
  const baseNet = Math.max(0, round(round(HOUR_RATE * hours) - fuel));
  const week = round(baseNet * days);
  const month = round(week * 4.3);

  return (
    <Section id="money" className="l-tint">
      <div className="container mx-auto">
        <SectionHead
          kicker="Деньги"
          title="Сколько зарабатывает водитель"
          subtitle="Покажем честно: сначала доход на линии, потом минус топливо. Комиссию парка менеджер называет на звонке — до подключения, а не после."
        />

        <div className="mt-10 max-w-4xl mx-auto lg:max-w-none rounded-3xl border border-green-100 l-glass p-6 lg:p-10 shadow-xl shadow-green-900/5">
          <div className="mb-6 max-w-md">
            <ChoiceGroup
              name="taxi-day-kind"
              label="Какой день считаем"
              options={[
                { value: 'Обычный день' as DayKind, label: 'Обычный день' },
                { value: 'Пиковый день' as DayKind, label: 'Пиковый день' },
              ]}
              value={day}
              onChange={setDay}
            />
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Пиковый день — вечерние часы, непогода и повышенный спрос: ставка на линии выше, но такие дни бывают не каждую смену.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="t-hours" className="text-sm font-medium text-gray-700">Часов на линии</label>
                <span className="font-bold font-oswald text-green-800 text-lg">{hours} ч</span>
              </div>
              <input id="t-hours" type="range" min={4} max={14} step={1} value={hours}
                onChange={e => setHours(Number(e.target.value))} className="w-full accent-green-800 cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="t-days" className="text-sm font-medium text-gray-700">Дней в неделю</label>
                <span className="font-bold font-oswald text-green-800 text-lg">{days}</span>
              </div>
              <input id="t-days" type="range" min={1} max={7} step={1} value={days}
                onChange={e => setDays(Number(e.target.value))} className="w-full accent-green-800 cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="t-fuel" className="text-sm font-medium text-gray-700">Топливо за смену</label>
                <span className="font-bold font-oswald text-green-800 text-lg">{fuel} ₽</span>
              </div>
              <input id="t-fuel" type="range" min={0} max={3000} step={100} value={fuel}
                onChange={e => setFuel(Number(e.target.value))} className="w-full accent-green-800 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Смена на линии', value: gross, note: 'до расходов' },
              { label: 'Минус топливо', value: net, note: 'за смену' },
              { label: 'За неделю', value: week, note: isPeak ? `${days} смен, по обычным дням` : `${days} смен` },
              { label: 'За месяц', value: month, note: 'до комиссии и налога', accent: true },
            ].map(box => (
              <div key={box.label}
                className={`rounded-2xl p-5 text-center ${box.accent ? 'bg-green-700 text-[var(--on-accent)] shadow-lg shadow-green-200' : 'bg-white border border-green-100'}`}>
                <p className={`text-xs uppercase tracking-wider font-semibold mb-1 ${box.accent ? 'text-[var(--on-accent-soft)]' : 'text-gray-400'}`}>{box.label}</p>
                <p className={`text-2xl font-bold font-oswald ${box.accent ? 'text-[var(--on-accent)]' : 'text-gray-800'}`}>
                  ≈ {box.value.toLocaleString('ru-RU')} ₽
                </p>
                <p className={`text-xs mt-1 ${box.accent ? 'text-[var(--on-accent-soft)]' : 'text-gray-400'}`}>{box.note}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 mb-6">
            <Fuel className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-amber-900 leading-relaxed">
              Это ориентир, а не гарантия дохода. В расчёте не учтены комиссия парка и сервиса,
              налог самозанятого, обслуживание и амортизация автомобиля. Точные условия по вашему
              городу менеджер называет <strong>до подключения</strong> — чтобы вы считали
              по реальным цифрам, а не по рекламным.
            </p>
          </div>

          <OrderButton place="calculator" className="w-full">Узнать условия в моём городе</OrderButton>
        </div>
      </div>
    </Section>
  );
};

/* ───────────────────  ПОЧЕМУ ЧЕРЕЗ ПАРК, А НЕ САМОМУ  ─────────────────── */

const WhyPark = () => (
  <Section id="why" className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Сравнение"
        title="Самому или через таксопарк"
        subtitle="Подключиться к сервису можно и напрямую. Вопрос в том, кто будет решать всё остальное."
      />

      <div className="mt-10 max-w-4xl mx-auto lg:max-w-none grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        <div className="flex flex-col rounded-3xl border-2 border-gray-200 l-glass p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <XCircle size={22} />
            </span>
            <h3 className="text-xl font-bold font-oswald uppercase text-gray-500">Сам по себе</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Разбираетесь с оформлением и требованиями сервиса самостоятельно',
              'Спорный заказ и блокировка — пишете в поддержку сами и ждёте',
              'Вопросы по выплатам решаете в переписке, без «своего человека»',
              'Ошибка в документах — простой и потерянные дни',
            ].map(t => (
              <li key={t} className="flex items-start gap-2.5 text-gray-500 text-sm leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col rounded-3xl border-2 border-green-600 l-glass p-6 lg:p-8 shadow-xl shadow-green-900/10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-xl bg-green-600 text-[var(--on-accent)] flex items-center justify-center shrink-0">
              <Building2 size={22} />
            </span>
            <h3 className="text-xl font-bold font-oswald uppercase text-green-800">С Барори Парк</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Подключение за 15 минут: проверим документы и подскажем, чего не хватает',
              'Блокировки и спорные заказы разбирает парк — вы продолжаете работать',
              'Выплаты по вашему графику, вопросы решает персональный менеджер',
              'Поддержка на русском, таджикском, узбекском, киргизском и английском',
            ].map(t => (
              <li key={t} className="flex items-start gap-2.5 text-gray-700 text-sm leading-relaxed">
                <CheckCircle2 className="text-green-800 shrink-0 mt-0.5" size={18} />{t}
              </li>
            ))}
          </ul>
          <div className="mt-6 lg:mt-auto lg:pt-8">
            <OrderButton place="compare" className="w-full text-base">Подключиться через парк</OrderButton>
          </div>
        </div>
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
            title="Что нужно для старта"
            subtitle="Требования к водителям такси задаёт сервис и закон, а не мы. Поэтому проверяем всё на первом звонке — чтобы вы не тратили день на поездку в офис зря."
          />
          <div className="mt-7 rounded-2xl bg-green-100 border border-green-200 p-5">
            <p className="font-bold text-green-800 font-oswald text-xl uppercase mb-1">Нужен свой автомобиль</p>
            <p className="text-gray-600 text-sm">
              Аренду машин мы не предоставляем — работа только на своём авто. Если машины нет,
              скажите менеджеру: подберём направление парка, где она не нужна.
            </p>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-7">
          {[
            // Возраст и стаж — не наши условия: 3 года стажа требует закон о такси (ФЗ-580),
            // возраст от 21 — сервис. Пишем источник требования, иначе это ограничение
            // дискриминационного характера в объявлении о работе (ст. 13.11.1 КоАП).
            'Возраст от 21 года — требование сервиса Яндекс Про',
            'Водительский стаж от 3 лет — требование закона о такси',
            'Водительское удостоверение, действующее в России',
            'Свой автомобиль в нормальном состоянии (аренду парк не предоставляет)',
            'Смартфон для приложения Яндекс Про',
            'Самозанятость или ИП — поможем оформить, если статуса ещё нет',
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
            Для легальной перевозки пассажиров нужны разрешение на такси и полис ОСАГО
            с соответствующей целью использования. Расскажем, как это устроено в вашем регионе,
            и поможем разобраться с порядком оформления.
          </span>
        </div>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  КАК НАЧАТЬ  ───────────────────────────── */

const Start = () => (
  <Section id="start" className="l-tint">
    <div className="container mx-auto">
      <SectionHead kicker="Старт" title="Как подключиться: 4 шага" subtitle="От заявки до первого заказа — обычно один день." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {[
          { n: '01', title: 'Заявка', text: 'Форма внизу страницы: имя, телефон, город, авто и стаж. Полминуты.' },
          { n: '02', title: 'Звонок за 15 минут', text: 'Проверим документы, назовём условия и комиссию по вашему городу. Без давления.' },
          { n: '03', title: 'Оформление', text: 'Помогаем с самозанятостью и документами, подключаем к сервису и настраиваем Яндекс Про.' },
          { n: '04', title: 'Первая смена', text: 'Выходите на линию, когда удобно, и запрашиваете выплату — хоть в тот же день.' },
        ].map(step => (
          <div key={step.n} className="relative p-6 rounded-2xl l-glass border border-gray-100 shadow-lg hover:border-green-300 hover:-translate-y-1 transition-all duration-300">
            <span className="text-4xl font-bold font-oswald text-green-800/20 leading-none">{step.n}</span>
            <h3 className="text-lg font-bold font-oswald uppercase mt-3 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <OrderButton place="steps">Пройти первый шаг<ChevronRight size={20} /></OrderButton>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  ЧЕСТНО  ───────────────────────────── */

const Honest = () => (
  <Section className="bg-slate-900 text-white">
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto lg:max-w-none">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-11 h-11 rounded-xl bg-green-600/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-green-400" size={24} />
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold uppercase font-oswald leading-tight">Честно: как это оформляется</h2>
        </div>
        <p className="text-gray-300 leading-relaxed mb-6 lg:max-w-3xl">
          Водители сотрудничают с парком <strong className="text-white">как самозанятые или ИП по договору</strong>,
          а не по трудовому. Говорим об этом до подключения, а не после первой смены.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {[
            { title: 'Вы сами планируете работу', text: 'Нет обязательных смен и плана по заказам: не вышли на линию — это не прогул.' },
            { title: 'Налог — 4% и 6%', text: 'Считает приложение «Мой налог». Никаких деклараций, бухгалтера и походов в ФНС.' },
            { title: 'Отпускных и больничных нет', text: 'Это обратная сторона свободного графика — так устроен режим самозанятости по закону.' },
            { title: 'Расходы на машине — ваши', text: 'Топливо, мойка, обслуживание. Зато и машина, и заработанное — тоже ваши.' },
          ].map(item => (
            <div key={item.title} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
              <p className="font-bold font-oswald text-lg mb-1.5 text-green-400">{item.title}</p>
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
    name: 'Оксана Б.', role: 'Знаток города 5 уровня', emoji: '😊',
    text: 'Рекомендую данный таксопарк! Очень оперативно работают. Термокоробы не дорогие, не завышают цены! Шахноза очень компетентный работник, проконсультировала. Советую. Пять звёзд!',
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
      <SectionHead kicker="Отзывы" title="Что говорят водители и курьеры парка" />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {REVIEWS.map(review => (
          <div key={review.name} className="relative l-glass p-6 rounded-2xl border border-gray-100 shadow-lg">
            <Quote size={34} className="text-green-200/70 absolute top-4 right-4" />
            <div className="flex items-center gap-3 mb-4">
              <div role="img" aria-label={review.name} className="w-12 h-12 rounded-full bg-green-50 border-2 border-green-600 flex items-center justify-center text-2xl">
                {review.emoji}
              </div>
              <div>
                <p className="font-bold font-oswald">{review.name}</p>
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

/* ─────────────────────────────  ПРЕИМУЩЕСТВА  ───────────────────────────── */

const Benefits = () => (
  <Section className="l-tint">
    <div className="container mx-auto">
      <SectionHead
        kicker="Почему мы"
        title="Почему водители остаются в парке"
        subtitle="Мы зарабатываем, когда вы работаете спокойно и долго. Поэтому вкладываемся в поддержку, а не в красивые обещания."
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {[
          { icon: <Wallet size={24} />, title: 'Деньги по запросу', text: 'Выплаты хоть каждый день — не нужно ждать конца недели или месяца.' },
          { icon: <Headphones size={24} />, title: 'Разбираем блокировки', text: 'Спорный заказ, жалоба пассажира, падение рейтинга — пишем в сервис и решаем мы.' },
          { icon: <FileCheck size={24} />, title: 'Оформление под ключ', text: 'Самозанятость, документы, требования сервиса — проведём за руку и бесплатно.' },
          { icon: <CalendarClock size={24} />, title: 'Никаких обязательных смен', text: 'Хотите полный день — работайте. Хотите вечера и выходные — тоже нормально.' },
          { icon: <MessageCircle size={24} />, title: 'Пять языков поддержки', text: 'Русский, таджикский, узбекский, киргизский, английский — объясним понятно.' },
          { icon: <Car size={24} />, title: 'Офис и живые люди', text: 'Санкт-Петербург, ул. Планерная 15Б: можно приехать и поговорить лично, а не только в чате.' },
        ].map(item => <InfoCard key={item.title} {...item} />)}
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────  FAQ  ───────────────────────────── */

const FAQ = [
  {
    q: 'Какая комиссия у парка?',
    a: 'Условия зависят от города, класса автомобиля и формата работы, поэтому менеджер называет точные цифры на первом звонке — до подключения. Никаких «узнаете потом» и скрытых удержаний.',
  },
  {
    q: 'Когда приходят деньги?',
    a: 'Выплаты доступны по вашему запросу — хоть ежедневно. Порядок и сроки зачисления зависят от банка и выбранного способа выплаты, детали уточним на звонке.',
  },
  {
    q: 'А если у меня нет своего автомобиля?',
    a: 'Аренду автомобилей Барори Парк не предоставляет — работать в такси можно только на своей машине. Если авто нет, менеджер расскажет про направления парка, где машина не нужна: доставку и смены.',
  },
  {
    q: 'Обязательны ли самозанятость или ИП?',
    a: 'Да. Водитель работает как самозанятый или индивидуальный предприниматель — это требование законодательства и сервиса. Если статуса нет, поможем оформить самозанятость бесплатно, это около 15 минут в приложении «Мой налог».',
  },
  {
    q: 'Нужны ли разрешение на такси и особое ОСАГО?',
    a: 'Для законной перевозки пассажиров — да: нужны разрешение (лицензия) на таксомоторную деятельность и полис ОСАГО с целью использования «такси». На звонке объясним, как это устроено в вашем регионе и что для этого нужно.',
  },
  {
    q: 'Стаж меньше 3 лет — возьмёте?',
    a: 'Требование сервиса — стаж от 3 лет и возраст от 21 года. Если стажа не хватает, честно скажем сразу и подскажем, какие направления парка доступны прямо сейчас — например, доставка.',
  },
  {
    q: 'Можно ли работать только по выходным?',
    a: 'Да. Обязательных смен нет: многие водители выходят на линию вечерами после основной работы или только в выходные.',
  },
  {
    q: 'Я гражданин другой страны. Возьмёте?',
    a: 'Возможность подключения зависит от ваших документов и права работать в России, а также от требований сервиса к водительскому удостоверению. Менеджер проверит это бесплатно на первом звонке и скажет прямо, что реально сейчас.',
  },
  {
    q: 'Что делать, если заблокировали доступ к заказам?',
    a: 'Сообщите нам — парк направит обращение в сервис и будет держать вас в курсе. Это одна из основных причин, по которой водители подключаются через парк, а не сами.',
  },
];

/* ─────────────────────────────  СТРАНИЦА  ───────────────────────────── */

export const TaxiLanding = () => (
  <LandingShell
    goalPrefix="taxi"
    ctaLabel="Подключиться"
    stickyLabel="Подключиться к такси"
    footerAbout="Партнёрский таксопарк: подключаем водителей к Яндекс Такси, помогаем с оформлением, выплатами и спорными ситуациями."
    nav={[
      { href: '#money', label: 'Сколько платят' },
      { href: '#why', label: 'Почему парк' },
      { href: '#start', label: 'Как начать' },
      { href: '#faq', label: 'Вопросы' },
    ]}
  >
    <Hero />
    <TrustBar />
    <Money />
    <WhyPark />
    <Requirements />
    <Start />
    <Benefits />
    <Honest />
    <Reviews />
    <Faq items={FAQ} title="Частые вопросы водителей" />
    <TaxiForm />
  </LandingShell>
);
