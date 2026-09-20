// FILE: src/components/KnowledgeModal.tsx

import { useModalDialog } from '../hooks/useModalDialog';
import { X, ExternalLink, BookOpen } from 'lucide-react';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeModal = ({ isOpen, onClose }: KnowledgeModalProps) => {
  const dialogRef = useModalDialog(isOpen);

  if (!isOpen) return null;

  // Данные из вашего HTML файла
  const categories = [
    {
      title: "Яндекс Про",
      color: "bg-yellow-100 text-yellow-800",
      links: [
        { text: "Как сохранить доступ к заказам при нестабильном интернете", url: "https://pro.yandex.ru/ru-ru/sankt-peterburg/knowledge-base/taxi/app/unstable-connection" },
        { text: "Какие бывают бонусы и как их получать", url: "https://pro.yandex.ru/ru-ru/sankt-peterburg/knowledge-base/taxi/income-diff/bonuses" },
        { text: "Тренажер для водителей Яндекс Про", url: "https://pro.yandex.ru/ru-ru/moskva/knowledge-base/taxi/new-driver/emulation" },
        { text: "Рейтинг", url: "https://pro.yandex.ru/ru-ru/moskva/knowledge-base/taxi/rides/raiting" },
        { text: "Как соответствовать законодательству", url: "https://parks.yandex/ru-ru/moskva/knowledge-base/legalization" },
        { text: "КИС “АРТ”", url: "https://docs.google.com/document/u/0/d/1K-5rmChBgC7gTwjfaQmOXQ1et2nQciVVZxLB7QDtjIw/mobilebasic" },
        { text: "Как подтвердить данные, если иностранная SIM-карта", url: "https://support.mts.ru/mts_mobilnaya_svyaz/oformlenie-i-podtverzhdenie-sim-karti-inostrannim-grazhdaninom" },
        { text: "Как иностранцу получить российскую сим-карту", url: "https://www.tbank.ru/finance/blog/sim-rules/" },
      ]
    },
    {
      title: "Купер",
      color: "bg-green-100 text-green-800",
      links: [
        { text: "Как соответствовать законодательству", url: "https://parks.yandex/ru-ru/moskva/knowledge-base/legalization" },
        { text: "Обучение курьеров", url: "#" }, // Заглушка из вашего кода
      ]
    },
    {
      title: "Биржа заданий",
      color: "bg-blue-100 text-blue-800",
      links: [
        { text: "Как брать заказы", url: "#" },
        { text: "Правила выплат", url: "#" },
      ]
    }
  ];

  return (
    <dialog ref={dialogRef} onCancel={onClose} aria-labelledby="knowledge-title" className="site-dialog fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90dvh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-lg">
                <BookOpen className="text-green-600" size={24} />
            </div>
            <h2 id="knowledge-title" className="text-2xl font-bold font-oswald uppercase text-gray-800">База знаний</h2>
          </div>
          <button
            aria-label="Закрыть окно"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto bg-gray-50/50">
          <div className="space-y-8">
            {categories.map((category, idx) => (
              <div key={idx}>
                <h3 className={`text-lg font-bold mb-4 px-3 py-1.5 rounded-lg inline-block ${category.color}`}>
                  {category.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url === '#' ? undefined : link.url}
                      role="link"
                      aria-disabled={link.url === '#' || undefined}
                      title={link.url === '#' ? 'Ссылка на материал пока не добавлена' : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-500 transition-all duration-300 flex items-start justify-between gap-3"
                    >
                      <span className="text-gray-700 font-medium text-sm group-hover:text-green-700 leading-snug">
                        {link.text}
                      </span>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-green-600 flex-shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white text-center text-gray-400 text-sm">
            Не нашли ответ? Пишите в поддержку: <a href="https://t.me/BaroriPark_Bot" target="_blank" className="text-green-600 hover:underline">Telegram</a>, <a href="https://vk.com/baroripark" target="_blank" className="text-green-600 hover:underline">ВКонтакте</a> или <a href="https://max.ru/id7814820277_bot" target="_blank" className="text-green-600 hover:underline">Max Бот</a>
        </div>

      </div>
    </dialog>
  );
};
