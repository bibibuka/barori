import { ArrowUpRight, Check, UsersRound } from 'lucide-react';
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
            <span className="home-hero-title-line">такси</span>{' '}
            <span className="home-hero-title-line">доставке и</span>{' '}
            <em>подработкам</em>
          </span>
        </h1>
        <div className="home-hero-partners" aria-label="Партнёрские сервисы">
          <span>Наши партнёры</span>
          <ul>{PARTNERS.map(name => <li key={name}>{name}</li>)}</ul>
        </div>
        <div className="home-hero-actions">
          <a href="#order" className="home-button" onClick={() => trackGoal('cta_order_click', { place: 'hero' })}>Начать зарабатывать <span><ArrowUpRight size={23} aria-hidden="true" /></span></a>
        </div>
      </div>
      <div className="home-hero-visual">
        <div className="home-hero-photo-wrap">
          <img className="home-hero-photo" src={deliveryImage} alt="Курьеры с заказами, самокатом и автомобилем" width="1536" height="1024" fetchPriority="high" />
        </div>
        <div className="home-photo-caption">
          <div className="home-photo-caption-copy"><p>Подберём направление под ваш график и поможем быстро начать.</p></div>
          <div className="home-start-badge"><UsersRound size={21} strokeWidth={1.5} aria-hidden="true" /><p><strong>1000+</strong><span>исполнителей</span></p></div>
        </div>
      </div>
      <div className="home-hero-benefit-area">
        <div className="home-hero-benefit-band">
          <ul className="home-hero-benefits">
            {['Подключение в течение 2 часов', 'Оформление полностью дистанционно', 'Выплаты после первого заказа', 'Доход от 200 000 ₽ в месяц*'].map(text => <li key={text}><Check size={16} aria-hidden="true" /><span>{text}</span></li>)}
          </ul>
        </div>
        <p className="home-fine-print">*Доход зависит от направления, региона и количества рабочих часов.</p>
      </div>
    </div>
  </section>
);
