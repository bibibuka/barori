import { ArrowUpRight, CarFront, Check, Clock3 } from 'lucide-react';
import { trackGoal } from '../utils/analytics';
import deliveryImage from '../assets/delivery-hero.webp';
import './Hero.css';

const PARTNERS = ['Яндекс', 'Купер', 'ТопГоу'];

export const Hero = () => (
  <section className="home-hero" aria-labelledby="home-hero-heading">
    <link rel="preload" as="image" href={deliveryImage} fetchPriority="high" />
    <div className="container home-hero-grid">
      <div className="home-hero-copy">
        <h1 id="home-hero-heading">
          <span className="home-hero-intro">подключаем к</span>
          <span className="home-hero-title">
            <span className="home-hero-title-line">такси,<span className="home-hero-title-icon" aria-hidden="true"><CarFront /></span></span>{' '}
            <span className="home-hero-title-line">доставке и</span>{' '}
            <em>подработкам.</em>
          </span>
        </h1>
        <p className="home-hero-lead">Подберём направление под ваш график и поможем быстро начать.</p>
        <div className="home-hero-actions">
          <a href="#order" className="home-button" onClick={() => trackGoal('cta_order_click', { place: 'hero' })}>Начать зарабатывать <span><ArrowUpRight size={23} aria-hidden="true" /></span></a>
        </div>
        <div className="home-hero-partners" aria-label="Партнёрские сервисы">
          <span>Наши партнёры</span>
          <ul>{PARTNERS.map(name => <li key={name}>{name}</li>)}</ul>
        </div>
      </div>
      <div className="home-hero-visual">
        <div className="home-hero-photo-wrap">
          <img className="home-hero-photo" src={deliveryImage} alt="Курьеры с заказами, самокатом и автомобилем" width="1536" height="1024" fetchPriority="high" />
          <div className="home-photo-topline"><i aria-hidden="true" /><strong>1000+</strong><span>исполнителей<br />уже с нами</span></div>
          <span className="home-hero-photo-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={1.25} /></span>
        </div>
        <div className="home-photo-caption">
          <div className="home-photo-caption-copy"><span>Один парк.</span><strong>Много<br />возможностей.</strong></div>
          <div className="home-start-badge"><Clock3 size={21} strokeWidth={1.5} aria-hidden="true" /><p><strong>2 часа</strong><span>от заявки до подключения</span></p></div>
        </div>
        <svg className="home-hero-route" viewBox="0 0 140 130" fill="none" aria-hidden="true">
          <path d="M3 116H47C97 116 27 22 81 22H129" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
          <circle cx="6" cy="116" r="5" fill="currentColor" />
          <path d="m119 13 10 9-10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="home-hero-benefit-band">
        <ul className="home-hero-benefits">
          {['Подключение в течение 2 часов', 'Оформление полностью дистанционно', 'Выплаты после первого заказа', 'Доход от 200 000 ₽ в месяц*'].map(text => <li key={text}><Check size={16} aria-hidden="true" /><span>{text}</span></li>)}
        </ul>
        <p className="home-fine-print">*Доход зависит от направления, региона и количества рабочих часов.</p>
      </div>
    </div>
  </section>
);
