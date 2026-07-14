// FILE: src/components/Modal.tsx
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Vacancy } from './Vacancies';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: Vacancy | null;
  onApply?: () => void;
}

export const Modal = ({ isOpen, onClose, vacancy, onApply }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Блокируем скролл основной страницы
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !vacancy) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay (Затемнение) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Content (Само окно) */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Кнопка закрытия (фиксирована поверх картинки) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 rounded-full p-2 transition-colors shadow-sm backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Картинка (Не сжимается, shrink-0) */}
        <div className="h-40 sm:h-48 shrink-0 overflow-hidden rounded-t-2xl relative">
          <img
            src={vacancy.image}
            alt={vacancy.title}
            className="w-full h-full object-cover"
          />
          {/* Градиент внизу картинки для красоты */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40"></div>
        </div>

        {/* Скроллящаяся часть (Контент + Кнопка) */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-4">
            <span className="text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-1 rounded-md">
              {vacancy.category}
            </span>
            <h3 className="text-2xl font-bold font-oswald mt-2 text-gray-900 leading-tight">
              {vacancy.title}
            </h3>
          </div>

          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
            <span className="block text-green-700 font-bold text-lg text-center">
              {vacancy.salary}
            </span>
          </div>

          <div className="mb-8">
            <h5 className="font-bold text-lg mb-3 text-gray-800">Условия и требования:</h5>
            <ul className="space-y-3">
              {vacancy.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                <span className="text-gray-600 text-sm leading-relaxed">Гражданство РФ или СНГ (с документами)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                <span className="text-gray-600 text-sm leading-relaxed">Возраст от 18 лет</span>
              </li>
            </ul>
          </div>

          {/* Кнопка действия */}
          <div className="sticky bottom-0 bg-white pt-2">
            <a
              href="#order"
              onClick={(e) => {
                e.preventDefault();
                if (onApply) onApply();
                else onClose();
              }}
              className="block w-full bg-green-600 text-white text-center font-bold py-3.5 rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-200"
            >
              Откликнуться на вакансию
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
