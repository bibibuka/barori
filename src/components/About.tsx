// FILE: src/components/About.tsx
import { useEffect, useRef, useState } from 'react';
import { Home, Clock, MapPin, Briefcase, FileCheck, ShieldCheck, Headphones, Send, MessageCircle, Users, Calendar, MapPinned } from 'lucide-react';
import { trackGoal } from '../utils/analytics';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: <Clock size={24} />,
      title: "Гибкий график",
      text: "Меняй график одним кликом. Работай тогда, когда тебе удобно.",
      accent: "from-green-400 to-emerald-600",
      accentBorder: "#22c55e",
    },
    {
      icon: <MapPin size={24} />,
      title: "Без привязки к месту",
      text: "Берешь смены и работаешь там, где хочешь. Рядом с домом или учебой.",
      accent: "from-teal-400 to-cyan-600",
      accentBorder: "#14b8a6",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Опыт не требуется",
      text: "Отличная возможность начать карьеру и приобрести опыт в крупной компании.",
      accent: "from-emerald-400 to-green-600",
      accentBorder: "#10b981",
    },
    {
      icon: <FileCheck size={24} />,
      title: "Медицинская книжка",
      text: "Поможем оформить бесплатно. Полное сопровождение.",
      accent: "from-lime-400 to-green-600",
      accentBorder: "#84cc16",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Наши принципы",
      text: "Прозрачные выплаты без задержек. Честные условия.",
      accent: "from-green-500 to-emerald-700",
      accentBorder: "#16a34a",
    }
  ];

  const languages = ["🇷🇺 RU", "🇹🇯 TJ", "🇺🇿 UZ", "🇰🇬 KG", "🇬🇧 EN", "🇸🇦 AR", "🇮🇷 FA"];

  // Анимированные счётчики для соцдоказательств
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statValues, setStatValues] = useState({ performers: 0, years: 0, cities: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { performers: 1000, years: 10, cities: 20 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out замедление к концу
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatValues({
        performers: Math.round(targets.performers * eased),
        years: Math.round(targets.years * eased),
        cities: Math.round(targets.cities * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [statsVisible]);

  const stats = [
    {
      icon: <Users size={28} />,
      value: statValues.performers,
      suffix: '+',
      label: 'исполнителей работают с нами',
    },
    {
      icon: <Calendar size={28} />,
      value: statValues.years,
      suffix: '+',
      label: 'лет на рынке',
    },
    {
      icon: <MapPinned size={28} />,
      value: statValues.cities,
      suffix: '+',
      label: 'городов присутствия',
    },
  ];

  return (
    <section id="about" className="py-12 bg-gradient-to-br from-green-50 via-green-50/30 to-white" ref={sectionRef}>
      <div className="container mx-auto">
        {/* Заголовок */}
        <div className={`flex flex-col items-center text-center mb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4 p-3 bg-green-50 rounded-full inline-flex float-animation">
            <Home size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-4">О НАС</h2>
          <p className="max-w-3xl text-lg text-gray-600">
            Барори Парк — таксопарк и курьерский парк для разных регионов: подключаем к Яндекс Смена,
            Яндекс Такси, доставке и Купер. Помогаем начать подработку на выходных, сменами или в
            свободном графике, а также разобраться с документами и выплатами.
          </p>
        </div>

        {/* ===== БЛОК СОЦИАЛЬНЫХ ДОКАЗАТЕЛЬСТВ ===== */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-3 gap-4 mb-10 transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="about-benefit-card about-card-visible group relative overflow-hidden bg-white rounded-2xl border border-gray-100/80 card-3d cursor-pointer p-5 md:p-6 text-center"
            >
              {/* Декоративный фон */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-black font-oswald text-green-700 mb-1 text-center">
                  {stat.value.toLocaleString('ru-RU')}{stat.suffix}
                </div>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-tight text-center">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== КАРТОЧКИ ПРЕИМУЩЕСТВ ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {benefits.map((item, index) => (
            <div
              key={index}
              className={`about-benefit-card group relative overflow-hidden bg-white rounded-2xl border border-gray-100/80 card-3d cursor-pointer ${isVisible ? 'about-card-visible' : ''}`}
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
            >
              {/* Цветная полоска слева — на десктопе скрыта, на мобильном видна */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 md:w-0 rounded-l-2xl transition-all duration-300"
                style={{ backgroundColor: item.accentBorder }}
              />

              <div className="flex items-start gap-4 p-5 md:p-6 md:flex-col">
                {/* Иконка в градиентном круге */}
                <div
                  className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                >
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h5 className="text-base md:text-lg font-bold font-oswald mb-1 md:mb-2 text-gray-900">
                    {item.title}
                  </h5>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>

              {/* Декоративный уголок на мобильном */}
              <div
                className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full opacity-[0.04] md:hidden"
                style={{ backgroundColor: item.accentBorder }}
              />
            </div>
          ))}

          {/* ===== БЛОК ТЕХПОДДЕРЖКИ ===== */}
          <div
            className={`about-support-card flex flex-col relative overflow-hidden rounded-2xl card-3d group ${isVisible ? 'about-card-visible' : ''}`}
            style={{ '--delay': '400ms' } as React.CSSProperties}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 animated-gradient pointer-events-none" />

            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <MessageCircle size={80} className="md:w-[120px] md:h-[120px]" />
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8">
                <Send size={40} className="md:w-[60px] md:h-[60px]" />
              </div>
            </div>

            <div className="relative z-10 p-5 md:p-6 text-white flex flex-col h-full">
              {/* Header row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                  <Headphones size={24} />
                </div>
                <div>
                  <h5 className="text-base md:text-lg font-bold font-oswald flex items-center gap-2">
                    Техподдержка 24/7
                    <span className="about-online-badge text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-normal flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                      Online
                    </span>
                  </h5>
                  <p className="text-green-100 text-xs">Связь в любом мессенджере</p>
                </div>
              </div>

              {/* Языки — бейджи */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 hover:bg-white/20 transition-colors duration-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <p className="text-green-50/80 text-sm leading-relaxed pb-4 mb-auto">
                Всегда на связи — помощь на вашем языке!
              </p>

              {/* CTA Buttons */}
              <div className="mt-auto grid grid-cols-3 gap-2 pb-1 relative z-20">
                <a href="https://t.me/BaroriPark_Bot" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: 'telegram', place: 'about' })} className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm font-medium bg-white/15 hover:bg-white/25 hover:shadow-sm px-1 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 text-center">
                  Telegram
                </a>
                <a href="https://vk.com/baroripark" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: 'vk', place: 'about' })} className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm font-medium bg-white/15 hover:bg-white/25 hover:shadow-sm px-1 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 text-center">
                  ВКонтакте
                </a>
                <a href="https://max.ru/id7814820277_bot" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: 'max', place: 'about' })} className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm font-medium bg-white/15 hover:bg-white/25 hover:shadow-sm px-1 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 text-center">
                  Max Бот
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
