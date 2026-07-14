// FILE: src/components/Partners.tsx

import { useEffect, useRef, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: "Partner 1", logo: partnerLogo1 },
    { name: "Partner 2", logo: partnerLogo2 },
    { name: "Partner 3", logo: partnerLogo3 },
    { name: "Partner 4", logo: partnerLogo4 },
    { name: "Partner 5", logo: partnerLogo5 },
    { name: "Partner 6", logo: partnerLogo6 },
    { name: "Partner 7", logo: partnerLogo7 },
    { name: "Partner 8", logo: partnerLogo8 },
    // Partner 9 и 11 остаются хотлинками: их исходные домены (s.rbk.ru, retail.ru)
    // недоступны для скачивания из текущей сети — см. preconnect в index.html.
    { name: "Partner 9", logo: "https://s.rbk.ru/v1_companies_s3/media/trademarks/329e41e1-d24b-4bf2-b309-0ae688318b29.jpg" },
    { name: "Partner 10", logo: partnerLogo10 },
    { name: "Partner 11", logo: "https://www.retail.ru/upload/medialibrary/013/y1tyw8d1rpdhqovlp7dq342h4evh8efg/1724166906404.png" },
  ];

  return (
    // ИЗМЕНЕНИЕ: Заменил bg-slate-50 на bg-gradient-to-br from-green-50 via-green-50/30 to-white
    // Это создает тот самый эффект "зелененькой подложки", как на первом экране
    <section className="py-11 bg-gradient-to-br from-green-50 via-green-50/30 to-white overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto text-center">
        <h2 className={`text-2xl lg:text-3xl font-bold uppercase mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Наши партнеры
        </h2>

        {/* Marquee effect */}
        <div className="relative overflow-hidden py-4">
          <div className="flex animate-marquee space-x-8">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex justify-center items-center h-28 w-52 bg-white rounded-xl shadow-md border border-gray-100 
                hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${(i % partners.length) * 50}ms` }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-full object-contain transition-all duration-300 px-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee {
          animation: marquee 120s linear infinite;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
