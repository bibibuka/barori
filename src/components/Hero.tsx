// FILE: src/components/Hero.tsx

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    // Animate counter
    const target = 230000;
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

  return (
    <section className="relative py-10 lg:py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
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
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight mb-3">
            Зарабатывайте до <br />
            <span className="text-blue-600 text-5xl lg:text-6xl xl:text-7xl inline-block">
              {count.toLocaleString('ru-RU')}
            </span>
            <span className="text-4xl lg:text-5xl"> рублей</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-4 font-medium">
            в месяц на гибком графике<span className="text-sm align-top text-gray-400">*</span>
          </p>
          
          <div className={`bg-white p-3 rounded-xl shadow-md inline-block mb-6 border border-green-100 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <p className="font-bold text-base text-gray-800 flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span> Бесплатное оформление медкнижки
            </p>
          </div>

          <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a 
              href="#order" 
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-blue-200 ripple hover-shake"
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
              src="https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1000&auto=format&fit=crop" 
              alt="Счастливый курьер" 
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
          </div>
          
          {/* Плашки удалены здесь */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors">
          <span className="text-xs mb-1">Листай вниз</span>
          <ChevronDown className="animate-bounce" size={24} />
        </a>
      </div>
    </section>
  );
};