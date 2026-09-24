// FILE: src/components/CookieBanner.tsx
//
// Уведомление об использовании cookie и аналитики + УПРАВЛЕНИЕ СОГЛАСИЕМ (блоки C3/C4).
// Информирует субъекта (ст. 9 ФЗ-152, ст. 10.1 ФЗ-149) и решает, грузить ли аналитику.
//
// C4 закрыт: Яндекс.Метрика больше НЕ инициализируется в <head>. Счётчик подгружается
// только после нажатия «Принять» (или на повторном визите, если согласие уже сохранено).
// Кнопка «Только необходимые» отклоняет аналитические cookie — выбор фиксируется в localStorage.

import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { LegalType } from './LegalModal';
import { trackGoal } from '../utils/analytics';
import { cn } from '../utils/cn';
import { CONSENT_STORAGE_KEY, clearMetrikaCookies, loadMetrika, loadMetrikaIfConsented } from '../utils/metrika';

const STORAGE_KEY = CONSENT_STORAGE_KEY;

interface CookieBannerProps {
  onOpenLegal: (type: LegalType) => void;
  /** Доп. классы позиционирования — нужны там, где снизу есть закреплённая кнопка (лендинг /dostavka/). */
  className?: string;
}

export const CookieBanner = ({ onOpenLegal, className }: CookieBannerProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Согласие могло быть дано в прошлый визит — тогда сразу поднимаем счётчик.
    loadMetrikaIfConsented();
    try {
      const choice = localStorage.getItem(STORAGE_KEY);
      if (!choice) {
        // Небольшая задержка, чтобы баннер не мешал первому впечатлению / LCP.
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage может быть недоступен (приватный режим) — показываем баннер один раз за сессию.
      setVisible(true);
    }
  }, []);

  const persist = (value: 'accepted' | 'declined' | 'dismissed') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* приватный режим — повтор показа допустим */
    }
    setVisible(false);
  };

  const handleAccept = () => {
    // Сначала поднимаем счётчик, потом отправляем цель — до согласия ym не существует.
    persist('accepted');
    loadMetrika();
    trackGoal('cookie_consent', { action: 'accept' });
  };

  const handleDecline = () => {
    // Аналитику не грузим вообще — только технически необходимые cookie.
    persist('declined');
    clearMetrikaCookies();
  };

  const handleClose = () => {
    // Закрытие крестиком трактуем как отказ от аналитики (privacy by default).
    persist('dismissed');
    clearMetrikaCookies();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookie"
      className={cn(
        `cookie-notice fixed z-[100] bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] right-[max(1rem,env(safe-area-inset-right))]
         sm:left-auto sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:max-w-md
         bg-white rounded-2xl shadow-2xl border border-green-100
         p-4 sm:p-5 animate-toast-in`,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="bg-green-50 p-2 rounded-lg shrink-0">
          <Cookie className="text-green-600" size={22} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">
            Мы используем технически необходимые файлы cookie, чтобы сайт работал. С вашего согласия
            дополнительно подключим аналитику (Яндекс.Метрика) — она обрабатывает cookie и IP-адрес.
            Без согласия аналитика не загружается. Подробнее — в{' '}
            <button
              type="button"
              onClick={() => {
                trackGoal('legal_open', { type: 'policy', place: 'cookie_banner' });
                onOpenLegal('policy');
              }}
              className="text-green-600 underline hover:text-green-800 font-medium"
            >
              Политике обработки ПД
            </button>.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold
                         px-5 py-2 rounded-lg transition-colors shadow-sm shadow-green-200 cursor-pointer"
            >
              Принять
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-bold
                         px-5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Только необходимые
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Закрыть уведомление"
          className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
