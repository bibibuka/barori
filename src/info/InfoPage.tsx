import { PhoneCall } from 'lucide-react';
import {
  LandingShell,
  Messengers,
  Section,
  useLanding,
  PHONE_SMENA,
} from '../landing/kit';
import { siteUrl } from '../utils/siteUrl';

const Head = ({ title, tone = 'green' }: { title: string; tone?: 'green' | 'amber' | 'sky' }) => (
  <h2 className={`text-balance text-[clamp(1.35rem,4vw,1.75rem)] font-bold uppercase leading-tight tracking-[-0.02em] ${tone === 'amber' ? 'text-amber-800' : tone === 'sky' ? 'text-sky-800' : 'text-green-800'}`}>
    {title}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">{children}</p>
);

const Hero = () => (
  <section className="pt-24 pb-5 lg:pt-28 lg:pb-6">
    <div className="container mx-auto max-w-3xl px-4">
      <p className="text-xs font-bold uppercase tracking-wide text-green-700">С 1 сентября 2026</p>
      <h1 className="mt-2 text-balance text-[clamp(1.55rem,6vw,2.35rem)] font-bold uppercase leading-[1.12] tracking-[-0.03em] text-green-950">
        Уважаемые исполнители!
      </h1>
      <div className="mt-3 space-y-3">
        <P>
          Информируем вас о важных изменениях в условиях сотрудничества, связанных с вступлением в силу с 1 сентября 2026 года Федерального закона от 01.09.2026 № 289-ФЗ «Об особенностях регулирования платформенной деятельности и платформенной занятости» (далее — Закон о платформенной деятельности).
        </P>
        <P>
          Мы, команда «Барори Парка», как оператор цифровой платформы, обязаны привести все условия взаимодействия с исполнителями в строгое соответствие с требованиями закона. Это касается и комиссий, и лимитов рабочего времени, и правил учёта часов. Ниже — самое важное, что нужно знать каждому исполнителю.
        </P>
      </div>
    </div>
  </section>
);

const Rates = () => (
  <Section id="now" className="!py-6 lg:!py-7">
    <div className="container mx-auto max-w-3xl px-4">
      <Head title="Что меняется прямо сейчас!" />
      <div className="mt-3 space-y-3">
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="font-oswald text-lg font-bold uppercase text-slate-800">Единая комиссия для всех исполнителей — 10 %</p>
          <P>Это базовый тариф платформы, который применяется ко всем заказам с 1 сентября 2026 года.</P>
        </div>
        <div className="rounded-xl bg-green-100 px-4 py-3">
          <p className="font-oswald text-lg font-bold uppercase text-green-900">Для самозанятых — льготная комиссия 7 %</p>
          <P>Если вы оформите статус плательщика налога на профессиональный доход (НПД), комиссия платформы для вас будет снижена до 7 %. Это максимально возможная преференция, которую платформа вправе предоставлять в рамках ст. 18 Закона о платформенной деятельности.</P>
        </div>
        <div className="rounded-xl bg-amber-100 px-4 py-3">
          <p className="font-oswald text-lg font-bold uppercase text-amber-950">Для исполнителей по договору ГПХ — 10 % + НДФЛ + социальные взносы</p>
          <P>Если по объективным причинам вы не можете перейти на самозанятость (например, нет гражданства РФ или исчерпан лимит дохода по НПД), вы продолжаете работать по договору гражданско правового характера. Комиссия в этом случае составляет 10 % + НДФЛ + социальные взносы.</P>
        </div>
      </div>
    </div>
  </Section>
);

const Hours = () => (
  <Section id="hours" className="l-tint !py-6 lg:!py-7">
    <div className="container mx-auto max-w-3xl px-4">
      <Head tone="sky" title="Лимит часов — что важно знать!" />
      <P>
        В соответствии с ч. 3 ст. 12 Закона о платформенной деятельности, для самозанятых, выполняющих заказы через цифровую платформу, устанавливается ограничение по продолжительности работы с одним заказчиком: не более 60 часов в месяц.
      </P>
      <p className="mt-4 font-oswald text-base font-bold uppercase text-sky-800">Важные нюансы:</p>
      <ul className="mt-2 space-y-2">
        <li className="rounded-xl bg-sky-50 px-4 py-3">
          <P>Лимит считается по фактическим часам выполнения заказов, которые фиксируются в карточке заказа и в отчёте платформы. В учёт идут только подтверждённые часы, за которые вы получили оплату.</P>
        </li>
        <li className="rounded-xl bg-sky-50 px-4 py-3">
          <P>Лимит действует в течение 6 месяцев подряд. Если в течение шести календарных месяцев подряд вы превышаете лимит в 60 часов в месяц с одним заказчиком (платформой), система автоматически ограничит доступ к новым заказам на 2 месяца (ч. 5 ст. 12 Закона).</P>
        </li>
        <li className="rounded-xl bg-sky-50 px-4 py-3">
          <P>Лимит не суммируется между платформами. Работа с другими цифровыми платформами не влияет на лимит часов на нашей платформе.</P>
        </li>
        <li className="rounded-xl bg-sky-50 px-4 py-3">
          <P>Лимит не распространяется на исполнителей по ГПХ. Для исполнителей, работающих по гражданско правовому договору, лимит часов не применяется, но к ним применяются иные требования по учёту результатов работ и оформлению актов.</P>
        </li>
      </ul>
    </div>
  </Section>
);

const Choose = () => (
  <Section id="choose" className="!py-6 lg:!py-7">
    <div className="container mx-auto max-w-3xl px-4">
      <Head tone="amber" title="Как выбрать оптимальный вариант!" />
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
        <div className="hidden grid-cols-[1.1fr_1fr_1fr_1.2fr] bg-slate-800 text-xs font-bold uppercase text-white sm:grid">
          <div className="px-3 py-2">Вариант сотрудничества</div>
          <div className="px-3 py-2">Комиссия платформы</div>
          <div className="px-3 py-2">Лимит часов</div>
          <div className="px-3 py-2">Кто подходит</div>
        </div>
        <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
          <div className="bg-green-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-green-700 sm:hidden">Вариант сотрудничества</p>
            <p className="font-semibold text-green-950">Самозанятость (НПД)</p>
          </div>
          <div className="bg-green-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-green-700 sm:hidden">Комиссия платформы</p>
            <p className="font-semibold text-green-950">7 %</p>
          </div>
          <div className="bg-green-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-green-700 sm:hidden">Лимит часов</p>
            <p className="text-sm text-green-950">60 часов/месяц (в течение 6 месяцев подряд)</p>
          </div>
          <div className="bg-green-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-green-700 sm:hidden">Кто подходит</p>
            <p className="text-sm text-green-950">Граждане РФ и ЕАЭС, доход до 2,4 млн руб./год, нет трудовых отношений с платформой</p>
          </div>
          <div className="bg-amber-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-amber-800 sm:hidden">Вариант сотрудничества</p>
            <p className="font-semibold text-amber-950">Договор ГПХ</p>
          </div>
          <div className="bg-amber-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-amber-800 sm:hidden">Комиссия платформы</p>
            <p className="font-semibold text-amber-950">10 % + НДФЛ + социальные взносы</p>
          </div>
          <div className="bg-amber-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-amber-800 sm:hidden">Лимит часов</p>
            <p className="text-sm text-amber-950">Не применяется</p>
          </div>
          <div className="bg-amber-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase text-amber-800 sm:hidden">Кто подходит</p>
            <p className="text-sm text-amber-950">Те, кто не может оформить самозанятость (нет гражданства, исчерпан лимит НПД и т. п.)</p>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <P>
          <span className="font-semibold text-green-900">Проверьте свой статус.</span> Если вы ещё не самозанятый — рассмотрите возможность оформления НПД. Это можно сделать за 5–10 минут через приложение «Мой налог», на сайте ФНС или через банк партнёр.
        </P>
        <P>
          <span className="font-semibold text-amber-900">Обратитесь к менеджеру.</span> Наши менеджеры помогут вам с оформлением статуса самозанятого, ответят на вопросы по лимитам и комиссиям, а также подскажут, какой вариант сотрудничества лучше подходит именно вам.
        </P>
        <P>
          <span className="font-semibold text-sky-900">Следите за часами в личном кабинете.</span> В ближайшее время в интерфейсе появится виджет с текущим балансом часов и прогнозом по лимиту на месяц.
        </P>
      </div>
    </div>
  </Section>
);

const Legal = () => (
  <Section className="!py-6 lg:!py-7">
    <div className="container mx-auto max-w-3xl px-4">
      <P>Все изменения основаны на следующих нормативных актах:</P>
      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
        <li>Федеральный закон от 01.09.2026 № 289-ФЗ «Об особенностях регулирования платформенной деятельности и платформенной занятости», ст. 11, 12, 18.</li>
        <li>Постановление Правительства РФ от 15.08.2026 № 987 «О порядке учёта рабочего времени исполнителей на цифровых платформах и правилах контроля лимитов» (п. 3, 5, 7).</li>
      </ul>
    </div>
  </Section>
);

const Contact = () => {
  const { track, phone } = useLanding();
  return (
    <Section id="order" className="l-tint !py-6 lg:!py-7">
      <div className="container mx-auto max-w-3xl px-4">
        <Head tone="amber" title="Обратитесь к менеджеру" />
        <p className="mt-3 text-sm font-bold text-amber-950">Пишите нам сюда, в мессенджер:</p>
        <Messengers labeled place="info_contact" className="mt-2" />
        <a
          href={phone.href}
          onClick={() => track('phone_click', { place: 'info_contact' })}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 text-sm font-bold text-[var(--on-accent)] transition-colors hover:bg-green-600 sm:w-auto"
        >
          <PhoneCall size={17} /> {phone.text}
        </a>
        <a href={siteUrl('/')} className="mt-4 inline-block text-sm font-semibold text-green-800 hover:text-green-700">
          На главную
        </a>
      </div>
    </Section>
  );
};

export const InfoPage = () => (
  <LandingShell
    goalPrefix="info"
    ctaLabel="Написать нам"
    stickyLabel="Написать нам"
    phone={PHONE_SMENA}
    footerAbout="Барори Парк, оператор цифровой платформы. Эта страница объясняет условия сотрудничества с исполнителями с 1 сентября 2026 года."
    legalNote="ООО «БАРОРИ КОР», ИНН 7814820277, ОГРН 1237800027937. Сотрудничество оформляется договором с самозанятым, ИП или по ГПХ и не является трудовыми отношениями. Информация на странице не является публичной офертой. 18+"
    nav={[
      { href: '#now', label: 'Комиссии' },
      { href: '#hours', label: 'Лимит часов' },
      { href: '#choose', label: 'Варианты' },
      { href: '#order', label: 'Связаться' },
    ]}
  >
    <Hero />
    <Rates />
    <Hours />
    <Choose />
    <Legal />
    <Contact />
  </LandingShell>
);
