// FILE: src/components/MobileApp.tsx

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Smartphone, Wallet, ChevronRight, Star } from 'lucide-react';
import { trackGoal } from '../utils/analytics';

export const MobileApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── 3D tilt для телефона ── */
  const handlePhoneTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handlePhoneLeave = useCallback(() => {
    if (phoneRef.current) {
      phoneRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  const features = [
    { icon: <Wallet size={18} />, text: 'Выплаты онлайн' },
  ];

  /* ── Плавающие рубли ── */
  const rubles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: 14 + Math.random() * 18,
      opacity: 0.04 + Math.random() * 0.06,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * -18,
    })),
  []);

  return (
    <section ref={sectionRef} className="py-8 bg-gradient-to-br from-green-50 via-green-50/30 to-white">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">

          {/* === Фон: анимированный градиент === */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

          {/* === Плавающие ₽ === */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {rubles.map((r) => (
              <span
                key={r.id}
                className="absolute text-white select-none font-bold ruble-float"
                style={{
                  left: r.left,
                  fontSize: `${r.size}px`,
                  opacity: r.opacity,
                  animationDuration: `${r.duration}s`,
                  animationDelay: `${r.delay}s`,
                }}
              >
                ₽
              </span>
            ))}
          </div>

          {/* === Декоративные элементы === */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-500 rounded-full blur-[120px] opacity-25 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-400 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-green-600 rounded-full blur-[80px] opacity-10 pointer-events-none" />
          
          {/* Паттерн точек */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
               style={{
                 backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                 backgroundSize: '24px 24px',
               }}
          />

          {/* === Контент === */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 p-5 lg:p-10">

            {/* Левая часть — текст */}
            <div className={`lg:w-1/2 text-center lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              
              {/* Бейдж */}
              <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1 mb-3">
                <Smartphone size={14} className="text-green-400" />
                <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Мобильное приложение</span>
              </div>

              <h2 className="text-2xl lg:text-4xl font-bold font-oswald uppercase text-white mb-2 leading-tight">
                Всё под <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">контролем</span>
              </h2>

              <p className="text-gray-400 text-sm lg:text-base mb-4 max-w-md mx-auto lg:mx-0">
                Управляй графиком, следи за выплатами и получай поддержку — в одном приложении.
              </p>

              {/* Фичи-чипы */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
                {features.map((f, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-medium border border-white/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${300 + i * 120}ms` }}
                  >
                    <span className="text-green-400">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>

              {/* Кнопка */}
              <a
                href="https://www.rustore.ru/catalog/app/taxi.barory"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('rustore_click', { place: 'mobile_app' })}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:from-green-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-400/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                Скачать в RuStore
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Рейтинг */}
              <div className={`flex items-center justify-center lg:justify-start gap-1.5 mt-3 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-500 text-xs">5.0 в RuStore</span>
              </div>
            </div>

            {/* Правая часть — телефон */}
            <div className={`lg:w-1/2 flex justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '300ms' }}>
              <div className="relative">
                {/* Свечение за телефоном */}
                <div className="absolute inset-0 scale-110 bg-gradient-to-t from-green-500/30 to-transparent rounded-[3rem] blur-2xl pointer-events-none" />
                
                {/* Телефон с 3D tilt */}
                <div
                  ref={phoneRef}
                  className="relative cursor-pointer"
                  style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
                  onMouseMove={handlePhoneTilt}
                  onMouseLeave={handlePhoneLeave}
                >
                  <div className="relative bg-gray-950 rounded-[2.2rem] p-2 shadow-2xl border border-gray-700/50 hover:border-green-500/40 transition-colors duration-500">
                    {/* Камера (нотч) */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-950 rounded-full z-20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-700" />
                    </div>
                    
                    <img
                      src="https://static.rustore.ru/imgproxy/DeRCljY9QkhT8IKKfeMyZ7JzQ-6LSHAZ6c_iX3Z39xY/preset:web_scr_prt_384/plain/https://static.rustore.ru/apk/2063572610/content/SCREENSHOT/d3785b54-f2bd-41db-a640-8985a6e70be4.png@webp"
                      alt="Мобильное приложение Барори Парк для контроля выплат"
                      loading="lazy"
                      decoding="async"
                      width="208"
                      height="416"
                      className="w-44 lg:w-52 rounded-[1.8rem] relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
