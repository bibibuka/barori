import { ArrowUpRight, Clock3 } from 'lucide-react';
import { trackGoal } from '../utils/analytics';
import taxiImage from '../assets/hero.webp';
import courierImage from '../assets/kura.webp';

export const Schedule = () => (
  <section id="schedule" className="home-section home-schedule">
    <div className="container home-schedule-grid">
      <div className="home-schedule-copy">
        <p className="home-eyebrow"><span />Мы ждем именно вас!</p>
        <h2 className="home-heading">Работа<br />на ваших<br /><em>условиях</em></h2>
        <p className="home-description">Выбирайте направление, город и график — от нескольких часов подработки до полного рабочего дня. <strong>Поможем подобрать подходящий вариант и быстро оформить подключение.</strong></p>
        <a href="#order" className="home-button" onClick={() => trackGoal('cta_order_click', { place: 'schedule' })}>Начать зарабатывать <span><ArrowUpRight size={21} /></span></a>
      </div>
      <div className="home-schedule-photos">
        <figure><img src={courierImage} alt="Курьер доставляет заказ на скутере" loading="lazy" /><figcaption>Ваш маршрут начинается здесь <ArrowUpRight size={23} /></figcaption></figure>
        <div className="home-schedule-bottom"><figure><img src={taxiImage} alt="Автомобиль Барори Парк" loading="lazy" /><figcaption>Такси</figcaption></figure><div className="home-time-card"><Clock3 size={32} strokeWidth={1.3} /><strong>Ваше время<br />Ваш выбор</strong><span>От пары часов до полной смены</span></div></div>
      </div>
    </div>
  </section>
);
