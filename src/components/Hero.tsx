// FILE: src/components/Hero.tsx
import { useEffect, useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { trackGoal } from '../utils/analytics';
import heroImage from '../assets/hero.webp';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Animate counter
    const target = 200000;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Функция плавного скролла к форме (ровно к началу)
  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackGoal('cta_order_click', { place: 'hero' });
    const section = document.getElementById('order');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative pt-10 pb-24 lg:py-16 overflow-hidden bg-gradient-to-br from-green-50 via-green-50/30 to-white">
      {/* React 19 поднимает этот <link> в <head> сам — LCP-изображение грузится с приоритетом */}
      <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute top-1/2 -left-20 w-60 h-60 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Text Content */}
        <div className={`lg:w-1/2 text-center lg:text-left z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight mb-3">
            Барори Парк: <span className="text-green-600">Яндекс Смена</span>, такси, доставка и <span className="text-green-600">биржа вакансий</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-4 font-medium">
            <span className="text-green-600">Подберем</span> работу под <span className="text-green-600">Ваши</span> <span className="text-green-600">запросы</span> или поможем с оформлением в такси/доставку/яндекс смены с доходом до{' '}
            <span className="text-green-700 font-extrabold whitespace-nowrap">
              {count.toLocaleString('ru-RU')} ₽
            </span>{' '}
            в месяц<span className="text-sm align-top text-gray-400">*</span>
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-bold border border-green-200">#Подработка</span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm font-bold border border-emerald-200">#Выходные</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-bold border border-yellow-200">#ЯндексСмены</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-bold border border-blue-200">#Таксопарк</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm font-bold border border-orange-200">#Доставка</span>
          </div>

          {/* ИЗМЕНЕНИЕ: Убрал блок bg-white shadow, оставил просто текст */}
          <div className={`mb-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <p className="text-lg font-bold text-green-700 flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle size={24} className="text-green-600" />
              Бесплатное оформление медкнижки
            </p>
          </div>

          <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a
              href="#order"
              onClick={handleScrollToOrder}
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-green-200 ripple hover-shake animate-btn-pulse"
            >
              Начать зарабатывать
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400 max-w-md mx-auto lg:mx-0">
            *в зависимости от выбранного направления, региона и количества рабочих часов.
          </p>
        </div>

        {/* Image Content */}
        <div className={`lg:w-1/2 w-full flex justify-center lg:justify-end relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative w-full max-w-md aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-200 group">
            <img
              src={heroImage}
              alt="Курьер Барори Парк на смене"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1000"
              height="563"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-700/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-green-600 transition-colors">
          <span className="text-xs mb-1">Листай вниз</span>
          <ChevronDown className="animate-bounce" size={24} />
        </a>
      </div>
    </section>
  );
};
