import { ArrowUpRight, Globe2 } from 'lucide-react';
import deliveryImage from '../assets/delivery-hero.webp';
import taxiImage from '../assets/hero.webp';
import courierImage from '../assets/kura.webp';

const stats = [
  { value: '1000+', title: 'исполнителей с нами', text: 'Водители, курьеры и исполнители по всей стране.' },
  { value: 'СНГ', title: 'работаем с гражданами СНГ', text: 'Помогаем с оформлением и документами с учетом гражданства.' },
  { value: '10+', title: 'лет на рынке', text: 'Знаем специфику такси, доставки и работы с сервисами.' },
  { value: '20+', title: 'городов', text: 'Подключаем исполнителей в разных регионах России.' },
];

export const About = () => (
  <section id="about" className="home-section home-about">
    <div className="container">
      <div className="home-about-intro"><div><p className="home-eyebrow"><span />О компании</p><h2 className="home-heading">Барори<br /><em>Парк.</em></h2><Globe2 className="home-about-globe" size={84} strokeWidth={.7} aria-hidden="true" /></div><div className="home-about-copy"><p>Мы не просто подключаем к сервисам — сопровождаем водителей, курьеров и исполнителей в работе каждый день.</p><p>Наша команда на связи от подключения до ежедневных рабочих вопросов: помогаем с оформлением, документами и выплатами. В сложных ситуациях разбираемся вместе и находим решение.</p></div></div>
      <div className="home-stats">{stats.map(({ value, title, text }) => <article key={title}><strong>{value}</strong><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="home-work-gallery">
        {[{ src: deliveryImage, title: 'Доставка заказов', alt: 'Курьеры с продуктами и заказами' }, { src: taxiImage, title: 'Такси', alt: 'Автомобиль Барори Парк на улице города' }, { src: courierImage, title: 'Курьерская доставка', alt: 'Курьер с термокоробом на скутере' }].map(photo => <figure key={photo.title}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /><figcaption>{photo.title}<ArrowUpRight size={18} aria-hidden="true" /></figcaption></figure>)}
      </div>
    </div>
  </section>
);
