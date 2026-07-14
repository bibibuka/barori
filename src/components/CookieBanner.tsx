// FILE: src/components/CookieBanner.tsx
//
// Ненавязчивое уведомление об использовании cookie и аналитики (блок C3).
// Закрывает требование информировать пользователя об обработке cookie/счётчиков
// (ст. 9 ФЗ-152 — информированность субъекта; ст. 10.1 ФЗ-149 о cookie-уведомлении).
//
// Примечание (блок C4): по умолчанию Яндекс.Метрика инициализируется сразу при
// загрузке (см. index.html) ради корректной атрибуции трафика. Этот баннер носит
// информационный характер. Если владелец примет решение откладывать инициализацию
// Метрики до согласия — перенесите вызов ym(...'init') сюда, в обработчик handleAccept,
// и зафиксируйте решение в COMPLIANCE.md.

import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { LegalType } from './LegalModal';
import { trackGoal } from '../utils/analytics';

const STORAGE_KEY = 'barori_cookie_consent';

interface CookieBannerProps {
  onOpenLegal: (type: LegalType) => void;
}

export const CookieBanner = ({ onOpenLegal }: CookieBannerProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

  const persist = (value: 'accepted' | 'dismissed') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* приватный режим — повтор показа допустим */
    }
    setVisible(false);
  };

  const handleAccept = () => {
    trackGoal('cookie_consent', { action: 'accept' });
    persist('accepted');
  };

  const handleClose = () => {
    trackGoal('cookie_consent', { action: 'close' });
    persist('dismissed');
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookie"
      className="fixed z-[100] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md
                 bg-white rounded-2xl shadow-2xl border border-green-100
                 p-4 sm:p-5 animate-toast-in"
    >
      <div className="flex items-start gap-3">
        <div className="bg-green-50 p-2 rounded-lg shrink-0">
          <Cookie className="text-green-600" size={22} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">
            Мы используем файлы cookie и сервисы аналитики (Яндекс.Метрика), чтобы сайт работал
            корректно и удобно. Продолжая пользоваться сайтом, вы соглашаетесь с обработкой данных
            согласно{' '}
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
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold
                         px-5 py-2 rounded-lg transition-colors shadow-sm shadow-green-200"
            >
              Принять
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
