// FILE: src/components/Partners.tsx

import partnerLogo1 from '../assets/partners/partner-p1.webp';
import partnerLogo2 from '../assets/partners/partner-p2.webp';
import partnerLogo3 from '../assets/partners/partner-p3.webp';
import partnerLogo4 from '../assets/partners/partner-p4.webp';
import partnerLogo5 from '../assets/partners/partner-p5.webp';
import partnerLogo6 from '../assets/partners/partner-p6.webp';
import partnerLogo7 from '../assets/partners/partner-p7.webp';
import partnerLogo8 from '../assets/partners/partner-p8.webp';
import partnerLogo10 from '../assets/partner-9111s.webp';

export const Partners = () => {
  const partners: { name: string; logo: string; fallback?: string }[] = [
    { name: 'Перекрёсток', logo: partnerLogo1 },
    { name: 'X5 Group', logo: partnerLogo2 },
    { name: 'Магнит', logo: partnerLogo3 },
    { name: 'Яндекс Лавка', logo: partnerLogo4 },
    { name: 'Магнит Косметик', logo: partnerLogo5 },
    { name: 'Токио Сити', logo: partnerLogo6 },
    { name: 'GP Workers', logo: partnerLogo7 },
    { name: 'Лента', logo: partnerLogo8 },
    // Partner 9 и 11 остаются хотлинками: их исходные домены (s.rbk.ru, retail.ru)
    // недоступны для скачивания из текущей сети — см. preconnect в index.html.
    { name: 'СберМаркет', logo: 'https://s.rbk.ru/v1_companies_s3/media/trademarks/329e41e1-d24b-4bf2-b309-0ae688318b29.jpg', fallback: 'СберМаркет' },
    { name: 'Яндекс Смена', logo: partnerLogo10 },
    { name: 'Купер', logo: 'https://www.retail.ru/upload/medialibrary/013/y1tyw8d1rpdhqovlp7dq342h4evh8efg/1724166906404.png', fallback: 'Купер' },
  ];

  return (
    <section id="partners" className="home-partners">
      <div className="container">
        <h2>Наши партнеры</h2>
        <div className="home-partners__grid">
          {partners.map((partner, i) => (
            <div className="home-partners__item" key={partner.name}>
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                className={`home-partners__image home-partners__image--${i + 1}`}
                onError={partner.fallback ? event => { event.currentTarget.hidden = true; } : undefined}
              />
              {partner.fallback && <span className="home-partners__fallback">{partner.fallback}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
