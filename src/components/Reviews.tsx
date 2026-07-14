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
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reviews = [
    {
      name: "Владимир Бондарь",
      role: "Знаток города 4 уровня",
      text: "Отличный сервис. Решают очень много вопросов и довольно быстро. Сотрудничаю с ними уже пятый месяц и ни разу не пожалел о выборе парка. Спасибо за Ваш профессионализм. Минусов пока небыло.",
      emoji: "😀",
      rating: 5
    },
    {
      name: "Халил Магомедов",
      role: "Знаток города 3 уровня",
      text: "Пришел,вежливо обслужили,быстро помогли,проверили готовность на работу,дали советы,подсказали как и где лучше брать заказы.Огромное спасибо работникам,отзывчивость на уровне. Спасибо большое",
      emoji: "😃",
      rating: 5
    },
    {
      name: "Александр Султан",
      role: "Знаток города 3 уровня",
      text: "Добрый день! Хочу выразить благодарность сотрудникам Барори Парк за их помощь в решении различных спорных вопросов. Всегда готовы выслушать и помочь. Настоящие профессионалы в своём деле! Спасибо!",
      emoji: "😄",
      rating: 5
    },
    {
      name: "Оксана Б.",
      role: "Знаток города 5 уровня",
      text: "Здравствуйте! Рекомендую данный таксопарк! Очень оперативно работают. Термокоробы не дорогие, не завышают цены! Шахноза очень компетентный работник, проконсультировала. И ещё подарили омывающую! Советую. Пять звезд!",
      emoji: "😊",
      rating: 5
    }
  ];

  return (
    // Уменьшили отступ сверху для мобил (py-8)
    <section className="py-8 lg:py-12 bg-gradient-to-br from-green-50 via-green-50/30 to-white" ref={sectionRef}>
      <div className="container mx-auto">

        {/* Заголовок и кнопки навигации */}
        {/* ВАЖНО: Добавил mb-6 только для ПК (lg:mb-10), чтобы на мобиле не было дырки */}
        <div className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-4 lg:mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Кнопка Назад - скрыта на мобильном */}
          <div className="hidden md:block">
            <button className="review-prev flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowLeft size={24} />
            </button>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold uppercase text-center">
            Отзывы сотрудников
          </h2>

          {/* Кнопка Вперед - скрыта на мобильном */}
          <div className="hidden md:block">
            <button className="review-next flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
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
                <Quote size={36} className="text-green-200 absolute top-4 right-4" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div
                      role="img"
                      aria-label={review.name}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-3xl bg-green-50 border-2 border-green-700"
                    >
                      {review.emoji}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-700 w-4 h-4 rounded-full border-2 border-white" />
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
