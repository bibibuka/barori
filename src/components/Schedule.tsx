import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      { threshold: 0.2 }
    );

    if (waitRef.current) observer.observe(waitRef.current);
    if (scheduleRef.current) observer.observe(scheduleRef.current);

    return () => observer.disconnect();
  }, []);

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
      <section className="py-12 overflow-hidden" ref={scheduleRef}>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className={`lg:w-1/2 transition-all duration-700 ${isScheduleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
             <h2 className="text-2xl lg:text-4xl font-bold uppercase mb-4 leading-tight">
               Хочешь свободный график? <br />
               <span className="text-blue-600">Значит тебе к нам!</span>
             </h2>
             <p className="text-base text-gray-600 mb-6 leading-relaxed">
               Наши менеджеры подберут для тебя оптимальный вариант занятости. 
               Ты сам выбираешь дни и часы работы. Утром учеба, вечером работа? 
               Или наоборот? Легко! Мы ценим твое время и комфорт.
             </p>
             <a 
               href="#order" 
               className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-200 ripple group"
             >
               Начать зарабатывать 
               <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
             </a>
          </div>
          
          <div className={`lg:w-1/2 relative transition-all duration-700 delay-200 ${isScheduleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
             {/* Collage Placeholder */}
             <div className="relative h-[350px] w-full">
                <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl z-10 group">
                   <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600" 
                    alt="Team working" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                </div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 group float-animation">
                   <img 
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=400" 
                    alt="Happy worker" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                </div>
                <div className="absolute -z-10 top-1/2 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl animate-pulse"></div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};
