import { useEffect, useRef, useState } from 'react';

export const Partners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: "Пятерочка", color: "bg-red-500" },
    { name: "Перекресток", color: "bg-green-500" },
    { name: "Магнит", color: "bg-red-600" },
    { name: "Лента", color: "bg-blue-600" },
    { name: "Ozon", color: "bg-blue-500" },
    { name: "Яндекс", color: "bg-yellow-400" },
    { name: "СберМаркет", color: "bg-green-600" },
    { name: "Самокат", color: "bg-orange-500" },
    { name: "ВкусВилл", color: "bg-green-700" },
    { name: "Dodo Pizza", color: "bg-orange-600" },
    { name: "Burger King", color: "bg-red-700" },
    { name: "KFC", color: "bg-red-500" },
  ];

  return (
    <section className="py-10 bg-slate-50 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto text-center">
        <h2 className={`text-2xl lg:text-3xl font-bold uppercase mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Наши партнеры
        </h2>
        
        {/* Marquee effect */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-6">
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 flex justify-center items-center h-16 w-40 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${(i % partners.length) * 50}ms` }}
              >
                <div className={`w-3 h-3 rounded-full ${partner.color} mr-2 group-hover:scale-125 transition-transform`} />
                <span className="font-bold text-gray-600 text-sm group-hover:text-gray-800">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
