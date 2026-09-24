import { ArrowUpRight, FileCheck2, GraduationCap, Headphones, HeartPulse, ShieldCheck, Trophy, Users } from 'lucide-react';
import { siteUrl } from '../utils/siteUrl';
import { trackGoal } from '../utils/analytics';

const benefits = [
  { icon: ShieldCheck, title: '10+ лет с иностранными гражданами', text: 'Знаем все юридические тонкости и законы РФ — не подведем с документами.' },
  { icon: FileCheck2, title: 'Поможем с самозанятостью', text: 'Оформим и настроим все, чтобы вы работали полностью легально, без рисков.' },
  { icon: Headphones, title: 'Поддержка 24/7 на 7 языках', text: 'На связи в любое время суток на вашем родном языке.' },
  { icon: Trophy, title: 'Бонусы и реферальная программа', text: 'Дополнительный доход за приглашенных друзей и участие в турнирах.' },
  { icon: HeartPulse, title: 'Медкнижка бесплатно', text: 'Оформим без очередей и затрат — полное сопровождение.' },
  { icon: GraduationCap, title: 'Опыт не нужен', text: 'Поможем разобраться во всем с нуля — от заявки до первого заказа.' },
];

export const Benefits = () => (
  <section id="benefits" className="home-section">
    <div className="container">
      <div className="home-section-head home-section-head--centered"><p className="home-eyebrow"><span />Почему исполнители выбирают нас</p><h2 className="home-heading">Наши <em>преимущества.</em></h2></div>
      <div className="home-benefit-grid">{benefits.map(({ icon: Icon, title, text }, i) => <article key={title} className={`home-benefit-card benefit-${i}`}><div className="home-benefit-top"><Icon size={29} strokeWidth={1.5} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div>
  </section>
);

export const TariffsPreview = () => (
  <section id="tariffs" className="home-section home-tariff-preview">
    <div className="container">
      <div className="home-tariff-panel">
        <div className="home-tariff-intro"><div className="home-tariff-art" aria-hidden="true"><span>%</span><i /><i /></div><div><p className="home-eyebrow">Прозрачные условия</p><h2 className="home-heading">Тарифы<br />Барори Парк</h2></div></div>
        <div className="home-tariff-copy"><p>Главное правило нашего парка: <strong>чем больше смен вы выполняете — тем ниже процент комиссии!</strong> Выбирайте свой тип занятости и смотрите условия по каждому направлению.</p><a className="home-button home-button-lime" href={siteUrl('/tariffs/')} onClick={() => trackGoal('tariffs_page_click', { place: 'home' })}>Посмотреть тарифы <span><ArrowUpRight size={21} /></span></a></div>
      </div>
    </div>
  </section>
);

export const Bonuses = () => (
  <section id="bonuses" className="home-section">
    <div className="container">
      <div className="home-section-head home-section-head--centered"><p className="home-eyebrow"><span />Дополнительный доход</p><h2 className="home-heading">Бонусы <em>и турниры.</em></h2></div>
      <div className="home-bonus-grid">
        <article className="home-bonus-card"><div><p className="home-eyebrow">Больше драйва</p><h3>Турниры парка</h3><strong className="home-bonus-amount">2 000 – 12 000 <span>₽</span></strong><p>Участвуйте в регулярных турнирах и забирайте призовой фонд.</p></div><Trophy className="home-bonus-symbol" size={110} strokeWidth={1} /></article>
        <article className="home-bonus-card"><div><p className="home-eyebrow">Вместе — выгоднее</p><h3>Бонусы за друга</h3><strong className="home-bonus-amount">500 – 1 000 <span>₽</span></strong><p>За каждого приглашенного друга, который подключится и начнёт работать.</p></div><Users className="home-bonus-symbol" size={110} strokeWidth={1} /></article>
      </div>
    </div>
  </section>
);
