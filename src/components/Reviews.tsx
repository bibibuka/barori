// FILE: src/components/Reviews.tsx

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

export const Reviews = () => {
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

  const reviews = [
    {
      name: "Алексей Смирнов",
      role: "Курьер",
      text: "Отличная работа для студента. Совмещаю с учебой без проблем. Выплаты всегда вовремя, что для меня самое главное.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      name: "Марина Иванова",
      role: "Сборщик заказов",
      text: "Работаю уже полгода. Нравится коллектив и то, что магазин рядом с домом. Не трачу время на дорогу.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      name: "Дмитрий Петров",
      role: "Водитель",
      text: "Перешел сюда из такси. Заработок выше, а нервов меньше. Машину предоставляют, бензин оплачивают.",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      rating: 5
    },
    {
      name: "Елена Козлова",
      role: "Менеджер чата",
      text: "Работаю из дома, пока ребенок в садике. Очень удобно! Обучили всему за пару дней.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4
    }
  ];

  return (
    <section className="py-12 bg-slate-50" ref={sectionRef}>
      <div className="container mx-auto">
        
        {/* Заголовок с кнопками навигации */}
        <div className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Кнопка "Назад" - Прямоугольная, залитая */}
          <button className="review-prev hidden md:flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <ArrowLeft size={24} />
          </button>

          <h2 className="text-3xl lg:text-4xl font-bold uppercase text-center">
            Отзывы сотрудников
          </h2>

          {/* Кнопка "Вперед" - Прямоугольная, залитая */}
          <button className="review-next hidden md:flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <ArrowRight size={24} />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          // Связываем кнопки по классам
          navigation={{
            prevEl: '.review-prev',
            nextEl: '.review-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!py-10 px-4"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div
                className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col relative card-3d transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Quote size={36} className="text-blue-100 absolute top-4 right-4" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-oswald">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>

                <div className="flex-grow">
                  <p className="text-gray-600 italic text-sm">"{review.text}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};