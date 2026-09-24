import { ArrowUpRight, PhoneCall } from 'lucide-react';
import {
  LandingShell,
  Messengers,
  Section,
  useLanding,
  PHONE_SMENA,
} from '../landing/kit';
import { siteUrl } from '../utils/siteUrl';
import '../landing/service-editorial.css';

const Head = ({ title, tone = 'green' }: { title: string; tone?: 'green' | 'amber' | 'sky' }) => (
  <h2 className={`info-heading info-heading--${tone}`}>
    {title}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="info-paragraph">{children}</p>
);

const Hero = () => (
  <section className="service-hero info-hero">
    <div className="container mx-auto info-container">
      <p className="service-eyebrow">С 1 сентября 2026</p>
      <h1>
        Уважаемые исполнители!
      </h1>
      <div className="info-intro">
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
  <Section id="now" className="info-section">
    <div className="container mx-auto info-container">
      <Head title="Что меняется прямо сейчас!" />
      <div className="info-rates">
        <div className="info-card info-card--neutral">
          <h3>Единая комиссия для всех исполнителей — 10 %</h3>
          <P>Это базовый тариф платформы, который применяется ко всем заказам с 1 сентября 2026 года.</P>
        </div>
        <div className="info-card info-card--green">
          <h3>Для самозанятых — льготная комиссия 7 %</h3>
          <P>Если вы оформите статус плательщика налога на профессиональный доход (НПД), комиссия платформы для вас будет снижена до 7 %. Это максимально возможная преференция, которую платформа вправе предоставлять в рамках ст. 18 Закона о платформенной деятельности.</P>
        </div>
        <div className="info-card info-card--amber">
          <h3>Для исполнителей по договору ГПХ — 10 % + НДФЛ + социальные взносы</h3>
          <P>Если по объективным причинам вы не можете перейти на самозанятость (например, нет гражданства РФ или исчерпан лимит дохода по НПД), вы продолжаете работать по договору гражданско правового характера. Комиссия в этом случае составляет 10 % + НДФЛ + социальные взносы.</P>
        </div>
      </div>
    </div>
  </Section>
);

const Hours = () => (
  <Section id="hours" className="info-section info-section--hours">
    <div className="container mx-auto info-container">
      <Head tone="sky" title="Лимит часов — что важно знать!" />
      <P>
        В соответствии с ч. 3 ст. 12 Закона о платформенной деятельности, для самозанятых, выполняющих заказы через цифровую платформу, устанавливается ограничение по продолжительности работы с одним заказчиком: не более 60 часов в месяц.
      </P>
      <h3 className="info-subheading">Важные нюансы:</h3>
      <ul className="info-hours-list">
        <li>
          <P>Лимит считается по фактическим часам выполнения заказов, которые фиксируются в карточке заказа и в отчёте платформы. В учёт идут только подтверждённые часы, за которые вы получили оплату.</P>
        </li>
        <li>
          <P>Лимит действует в течение 6 месяцев подряд. Если в течение шести календарных месяцев подряд вы превышаете лимит в 60 часов в месяц с одним заказчиком (платформой), система автоматически ограничит доступ к новым заказам на 2 месяца (ч. 5 ст. 12 Закона).</P>
        </li>
        <li>
          <P>Лимит не суммируется между платформами. Работа с другими цифровыми платформами не влияет на лимит часов на нашей платформе.</P>
        </li>
        <li>
          <P>Лимит не распространяется на исполнителей по ГПХ. Для исполнителей, работающих по гражданско правовому договору, лимит часов не применяется, но к ним применяются иные требования по учёту результатов работ и оформлению актов.</P>
        </li>
      </ul>
    </div>
  </Section>
);

const Choose = () => (
  <Section id="choose" className="info-section">
    <div className="container mx-auto info-container">
      <Head tone="amber" title="Как выбрать оптимальный вариант!" />
      <div className="info-comparison overflow-hidden rounded-2xl border border-slate-200">
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
      <div className="info-next-steps">
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
  <Section className="info-section info-legal">
    <div className="container mx-auto info-container">
      <P>Все изменения основаны на следующих нормативных актах:</P>
      <ul>
        <li>Федеральный закон от 01.09.2026 № 289-ФЗ «Об особенностях регулирования платформенной деятельности и платформенной занятости», ст. 11, 12, 18.</li>
        <li>Постановление Правительства РФ от 15.08.2026 № 987 «О порядке учёта рабочего времени исполнителей на цифровых платформах и правилах контроля лимитов» (п. 3, 5, 7).</li>
      </ul>
    </div>
  </Section>
);

const Contact = () => {
  const { track, phone } = useLanding();
  return (
    <Section id="order" className="info-section info-contact-section">
      <div className="container mx-auto info-container">
      <div className="info-contact-card">
        <div>
        <Head tone="amber" title="Обратитесь к менеджеру" />
        <p className="info-paragraph">Пишите нам сюда, в мессенджер:</p>
        <Messengers labeled place="info_contact" className="info-contact-messengers" />
        </div>
        <div className="info-contact-actions">
        <a
          href={phone.href}
          onClick={() => track('phone_click', { place: 'info_contact' })}
          className="editorial-button"
        >
          {phone.text} <span><PhoneCall size={18} /></span>
        </a>
        <a href={siteUrl('/')} className="editorial-text-link">
          На главную <ArrowUpRight size={18} />
        </a>
        </div>
      </div>
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
