// FILE: src/components/Footer.tsx
import { useEffect, useRef } from 'react';
import { Phone, Mail, Clock, MapPin, Globe, ArrowUpRight, Smartphone } from 'lucide-react';
import { LegalType } from './LegalModal';
import { trackGoal } from '../utils/analytics';
import { resetAnalyticsConsent } from '../utils/metrika';

interface FooterProps {
  onOpenLegal: (type: LegalType) => void;
}

export const Footer = ({ onOpenLegal }: FooterProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.getElementById('yandex-maps-script');

    const initMap = () => {
      const ymaps = (window as any)?.ymaps;
      if (!ymaps) return;

      ymaps.ready(() => {
        if (!mapContainerRef.current) return;
        if (mapContainerRef.current.innerHTML !== '') return;

        const myMap = new ymaps.Map(mapContainerRef.current, {
          center: [59.995476, 30.234526],
          zoom: 13,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        const myPlacemark = new ymaps.Placemark([59.995476, 30.234526], {
          hintContent: 'Офис обслуживания',
          balloonContent: 'Санкт-Петербург, ул. Планерная 15Б',
        });

        myMap.geoObjects.add(myPlacemark);
      });
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'yandex-maps-script';
      script.src =
        'https://api-maps.yandex.ru/2.1/?apikey=a261c1e8-145c-4628-a365-735ef0c40772&lang=ru_RU';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const handleLegalClick = (type: LegalType) => {
    trackGoal('legal_open', { type, place: 'footer' });
    onOpenLegal(type);
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Contacts & Digital Card */}
          <div className="flex flex-col gap-10 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-10">Контакты</h2>

              <div className="space-y-6 text-lg">
                <div className="flex items-start gap-4">
                  <Phone className="text-green-600 mt-1 shrink-0" />
                  <div>
                    <a href="tel:+79219000997" onClick={() => trackGoal('phone_click', { place: 'footer' })} className="font-bold text-xl mb-1 hover:text-green-400 transition-colors inline-block">+7 (921) 900 09 97</a>
                    <div className="text-gray-400 text-sm">Яндекс Смена, такси, доставка и биржа вакансий</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-green-600 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold mb-1">info@baroripark.ru</div>
                    <div className="text-gray-400 text-sm">По вопросам сотрудничества</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-green-600 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold mb-1">10:00 - 20:00</div>
                    <div className="text-gray-400 text-sm">Без выходных</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-green-600 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold mb-1">Санкт-Петербург, ул. Планерная 15Б</div>
                    <div className="text-gray-400 text-sm">Офис обслуживания (этаж 2, офис 2/13)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- БЛОК ВИЗИТКИ --- */}
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800 border border-slate-700 relative overflow-hidden group hover:border-green-600/50 transition-colors w-full lg:max-w-xl">
              {/* Декоративное свечение */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600/20 p-2 rounded-lg shrink-0">
                    <Globe className="text-green-500" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-oswald uppercase tracking-wide">
                    Медиа и Соцсети
                  </h3>
                </div>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Все наши новости, чаты для водителей и курьеров, а также альтернативные способы связи —
                  в одной удобной ссылке.
                </p>

                {/* КНОПКА: растянута на всю ширину (w-full) */}
                <a
                  href="https://my.etag.store/baroripark"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGoal('digital_card_click', { place: 'footer' })}
                  className="
                    mt-4 inline-flex items-center justify-center gap-2
                    w-full
                    px-4 sm:px-5
                    py-3
                    text-sm sm:text-base
                    rounded-xl
                    bg-green-600 hover:bg-green-700
                    text-white font-bold
                    transition-all
                    hover:shadow-lg hover:shadow-green-900/50
                    group/btn
                    text-center
                    whitespace-normal sm:whitespace-nowrap
                  "
                >
                  <Smartphone size={18} className="shrink-0" />
                  <span className="leading-snug">Открыть визитку компании</span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="h-80 sm:h-96 lg:h-auto w-full rounded-2xl overflow-hidden bg-gray-800 shadow-2xl relative z-0 border border-slate-700">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p>&copy; 2026 Барори Парк. Все права защищены.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => handleLegalClick('offer')} className="hover:text-white transition-colors">
              Публичная оферта
            </button>
            <button onClick={() => handleLegalClick('policy')} className="hover:text-white transition-colors">
              Политика обработки персональных данных
            </button>
            <button onClick={() => handleLegalClick('consent')} className="hover:text-white transition-colors">
              Согласие на обработку ПД
            </button>
            {/* Отзыв согласия на аналитические cookie */}
            <button onClick={resetAnalyticsConsent} className="hover:text-white transition-colors">
              Настройки cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
