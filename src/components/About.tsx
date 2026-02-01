import { useEffect, useRef, useState } from 'react';
import { Home, Clock, MapPin, Briefcase, FileCheck, ShieldCheck, Headphones } from 'lucide-react';

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: <Clock size={36} className="text-blue-600" />,
      title: "Гибкий график",
      text: "Меняй график одним кликом. Работай тогда, когда тебе удобно."
    },
    {
      icon: <MapPin size={36} className="text-blue-600" />,
      title: "Без привязки к месту",
      text: "Берешь смены и работаешь там, где хочешь. Рядом с домом или учебой."
    },
    {
      icon: <Briefcase size={36} className="text-blue-600" />,
      title: "Опыт не требуется",
      text: "Отличная возможность начать карьеру и приобрести опыт в крупной компании."
    },
    {
      icon: <FileCheck size={36} className="text-blue-600" />,
      title: "Медицинская книжка",
      text: "Поможем оформить бесплатно. Полное сопровождение."
    },
    {
      icon: <ShieldCheck size={36} className="text-blue-600" />,
      title: "Наши принципы",
      text: "Прозрачные выплаты без задержек. Честные условия."
    }
  ];

  return (
    <section id="about" className="py-12 bg-white" ref={sectionRef}>
      <div className="container mx-auto">
        <div className={`flex flex-col items-center text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4 p-3 bg-blue-50 rounded-full inline-flex float-animation">
            <Home size={40} className="text-blue-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-4">О сервисе</h2>
          <p className="max-w-3xl text-lg text-gray-600">
            Биржа вакансий — это сервис, который помогает найти работу или подработку рядом с домом. 
            Мы соединяем надежных работодателей с теми, кто ищет стабильный доход и свободный график.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 p-6 rounded-2xl border border-gray-100 card-3d cursor-pointer group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h5 className="text-lg font-bold font-oswald mb-2">{item.title}</h5>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}

          {/* Tech Support Block */}
          <div 
            className={`bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center card-3d cursor-pointer group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '500ms' }}
          >
             <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <Headphones size={36} className="text-white" />
             </div>
             <h5 className="text-lg font-bold font-oswald mb-2">Техподдержка 24/7</h5>
             <p className="text-blue-100 text-sm">
               Говорим на русском, таджикском, узбекском и киргизском языках. Всегда на связи!
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};
