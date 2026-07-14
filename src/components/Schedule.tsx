// FILE: src/components/Schedule.tsx

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { trackGoal } from '../utils/analytics';
import verxImage from '../assets/verx.webp';
import nizImage from '../assets/niz.webp';

export const Schedule = () => {
  const [isWaitVisible, setIsWaitVisible] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);
  
  const waitRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === waitRef.current) setIsWaitVisible(true);
            if (entry.target === scheduleRef.current) setIsScheduleVisible(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (waitRef.current) observer.observe(waitRef.current);
    if (scheduleRef.current) observer.observe(scheduleRef.current);

    return () => observer.disconnect();
  }, []);

  // Функция плавного скролла к форме
  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackGoal('cta_order_click', { place: 'schedule' });
    const section = document.getElementById('order');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Wait Promo Block */}
      <section 
        className="py-14 animated-gradient text-white text-center relative overflow-hidden"
        ref={waitRef}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <Sparkles 
              key={i}
              className="absolute text-white/30 float-animation"
              size={24}
              style={{ 
                left: `${20 + i * 15}%`, 
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <h2 className={`text-2xl lg:text-4xl font-bold uppercase leading-tight transition-all duration-1000 ${isWaitVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            Возможно эта работа <br className="hidden sm:block" />
            <span className="inline-block mt-2">ждет именно тебя!</span>
          </h2>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-12 overflow-hidden bg-gradient-to-br from-green-50 via-green-50/30 to-white" ref={scheduleRef}>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
          
          {/* Text Content */}
          <div className={`lg:w-1/2 transition-all duration-700 ${isScheduleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-2xl lg:text-4xl font-bold uppercase mb-4 leading-tight">
              Хочешь свободный график? <br />
              <span className="text-green-600">Значит тебе к нам!</span>
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Наши менеджеры подберут для тебя оптимальный вариант занятости. 
              Ты сам выбираешь дни и часы работы. Утром учеба, вечером работа? 
              Или наоборот? Легко! Мы ценим твое время и комфорт.
            </p>
            <a 
              href="#order"
              onClick={handleScrollToOrder}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-900 text-white px-6 py-3 rounded-full font-bold hover:from-green-700 hover:to-green-950 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-200 ripple group animate-btn-pulse"
            >
              Начать зарабатывать
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Image Content (Collage) */}
          {/* hidden lg:block - СКРЫВАЕМ НА МОБИЛЬНОМ, чтобы не было дырки */}
          <div className={`hidden lg:block lg:w-1/2 relative transition-all duration-700 delay-200 ${isScheduleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative h-[350px] w-full group cursor-pointer">
              {/* Большая картинка (фон) */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl z-10">
                <img
                  src={verxImage}
                  alt="Команда Барори Парк помогает с подключением к сменам"
                  loading="lazy"
                  decoding="async"
                  width="598"
                  height="399"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Маленькая картинка (передний план) */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 transition-transform duration-500 ease-out group-hover:translate-y-6">
                <img
                  src={nizImage}
                  alt="Исполнитель Барори Парк на гибком графике"
                  loading="lazy"
                  decoding="async"
                  width="397"
                  height="299"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Декоративный круг */}
              <div className="absolute -z-10 top-1/2 left-1/4 w-64 h-64 bg-green-200 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
