import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Vacancy } from './Vacancies';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: Vacancy | null;
  onApply?: () => void; // Новый необязательный пропс
}

export const Modal = ({ isOpen, onClose, vacancy, onApply }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
       document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !vacancy) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white/50 rounded-full p-1 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="h-48 overflow-hidden">
          <img 
            src={vacancy.image} 
            alt={vacancy.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="mb-4">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">{vacancy.category}</span>
            <h3 className="text-2xl font-bold font-oswald mt-1">{vacancy.title}</h3>
          </div>

          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <span className="block text-green-700 font-bold text-lg">{vacancy.salary}</span>
          </div>

          <div className="mb-8">
            <h5 className="font-bold text-lg mb-3">Условия и требования:</h5>
            <ul className="space-y-2">
              {vacancy.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1.5">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5">•</span>
                <span className="text-gray-700">Гражданство РФ или СНГ (с документами)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5">•</span>
                <span className="text-gray-700">Возраст от 18 лет</span>
              </li>
            </ul>
          </div>

          <a 
            href="#order" 
            onClick={(e) => {
              e.preventDefault(); // Предотвращаем стандартный переход по якорю
              if (onApply) {
                onApply(); // Вызываем нашу логику
              } else {
                onClose(); // Фоллбэк, если пропс не передан
              }
            }}
            className="block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 cursor-pointer"
          >
            Откликнуться на вакансию
          </a>
        </div>
      </div>
    </div>
  );
};
