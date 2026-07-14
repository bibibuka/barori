import { useEffect, useRef, useState } from 'react';
import { FileText, Phone, ClipboardCheck, Wallet } from 'lucide-react';

export const Steps = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: "01",
      title: "Оставить заявку",
      text: "Заполни простую форму на сайте. Это займет не более 30 секунд!",
      icon: <FileText size={28} />
    },
    {
      id: "02",
      title: "Дождаться звонка",
      text: "Наш менеджер свяжется с тобой в течение 15 минут и ответит на все вопросы.",
      icon: <Phone size={28} />
    },
    {
      id: "03",
      title: "Оформление",
      text: "Поможем с документами и медкнижкой. Все быстро и бесплатно.",
      icon: <ClipboardCheck size={28} />
    },
    {
      id: "04",
      title: "Первая смена",
      text: "Выбирай удобное время, выходи на работу и получай первые деньги.",
      icon: <Wallet size={28} />
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 via-green-50/30 to-white relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto relative z-10">
        <h2 className={`text-3xl lg:text-4xl font-bold uppercase text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Что нужно сделать?
        </h2>
        
        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-green-600 transition-all duration-1000 ease-out"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`relative p-5 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step number circle */}
                <div className="relative z-20 flex justify-center mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-green-700 to-green-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`}
                    style={{ transitionDelay: `${index * 200 + 300}ms` }}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="text-6xl font-bold text-gray-100 absolute -top-2 left-0 z-0 group-hover:text-green-200 transition-colors font-oswald select-none">
                  {step.id}
                </div>

                <div className="relative z-10 text-center">
                  <h4 className="text-lg font-bold font-oswald mb-2 group-hover:text-green-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full opacity-5 pointer-events-none">
         <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600 animate-pulse">
            <circle cx="50" cy="50" r="40" />
         </svg>
      </div>
    </section>
  );
};
