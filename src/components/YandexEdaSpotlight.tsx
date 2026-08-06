import { CalendarClock, ChevronRight, HeartPulse, MapPin } from 'lucide-react';
import courierImage from '../assets/kura.webp';
import { trackGoal } from '../utils/analytics';

const FACTS = [
  { icon: <CalendarClock size={19} />, text: 'Свободные и плановые слоты' },
  { icon: <MapPin size={19} />, text: 'Локацию выбираете в Яндекс Про' },
  { icon: <HeartPulse size={19} />, text: 'Поможем разобраться с оформлением' },
];

export const YandexEdaSpotlight = () => (
  <aside
    className="mx-4 mt-8 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-lg shadow-green-900/5 lg:mx-12"
    aria-labelledby="yandex-eda-title"
  >
    <div className="grid md:grid-cols-[1.25fr_0.75fr]">
      <div className="p-6 lg:p-8">
        <p className="text-sm font-bold text-green-700">Отдельное направление</p>
        <h3 id="yandex-eda-title" className="mt-2 font-oswald text-3xl font-bold uppercase text-gray-900">
          Курьер Яндекс Еды
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
          Доставляйте пешком, на велосипеде или электротранспорте. Конкретный набор форматов зависит от города.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {FACTS.map(fact => (
            <div key={fact.text} className="flex items-start gap-2 rounded-xl bg-green-50 p-3 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-green-700">{fact.icon}</span>
              <span>{fact.text}</span>
            </div>
          ))}
        </div>

        <a
          // при переезде страницы на поддомен поменять здесь и в src/dostavka/directions.ts
          href="/eda/#apply"
          onClick={() => trackGoal('yandex_eda_spotlight_click', { place: 'main_vacancies' })}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700"
        >
          Посмотреть условия <ChevronRight size={18} />
        </a>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Свободные слоты — от 1 часа при выполненном заказе; плановые — обычно 4–12 часов. Выплаты,
          доступность форматов и требования зависят от города и формы сотрудничества.
        </p>
      </div>

      <div className="relative min-h-64 md:min-h-full">
        <img
          src={courierImage}
          alt="Курьер на городском маршруте"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/45 to-transparent" />
      </div>
    </div>
  </aside>
);
