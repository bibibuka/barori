// FILE: src/components/Reviews.tsx

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { Quote, Star, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

const REVIEWS_URL = 'https://yandex.ru/maps/org/barori_park/70152279860/reviews/';

export const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<SwiperInstance | null>(null);
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (paused || !isVisible) sliderRef.current?.autoplay.stop();
    else sliderRef.current?.autoplay.start();
  }, [paused, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reviews = [
    {
      name: 'Алексей Лукас', role: 'Яндекс Карты · 29 августа', rating: 5,
      emoji: '😄',
      text: 'Лояльность парка к работающему персоналу 10 из 10, поддержка 10 из 10 , сотрудничество 10 из 10.Все доходчиво объясняют и можно обратиться с любым вопросом,который решают за считаные минуты. Держите планку ребята и девчата! В современных реалиях этого не хватает от других компаний.',
    },
    {
      name: 'Даша Ласюта', role: 'Яндекс Карты · 20 августа', rating: 5,
      emoji: '😊',
      text: 'Просто лучшие, решили мой вопрос с задержкой выплаты, очень благодарна за быстрый ответ и результат)))',
    },
    {
      name: 'тима тима', role: 'Яндекс Карты · 13 августа', rating: 5,
      emoji: '😎',
      text: 'Красавцы, думал уже из доставки уходить из-за постоянных корректировок в минус баланс, но все решили быстрее чем я им написал. Круто очень',
    },
    {
      name: 'Светлана Катаева', role: 'Яндекс Карты · 9 июля', rating: 5,
      emoji: '🙂',
      text: 'Быстро,понятно,продуктивно. Рекомендую 👍🏻',
    },
    {
      name: 'Иван Евдокимов', role: 'Яндекс Карты · 18 мая', rating: 5,
      emoji: '😀',
      text: 'Хороший парк , добрая поддержка , быстро отвечают',
    },
    {
      name: 'Марта Батырева', role: 'Яндекс Карты · 15 мая', rating: 5,
      emoji: '☺️',
      text: 'Выражаю благодарность Вашему специалисту Льву. Он помог разобраться в программе. Объяснил всё доходчиво. Проявив терпение и знание вопроса. Побольше бы таких сотрудников!',
    },
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
    <section id="reviews" aria-label="Отзывы исполнителей" className="py-8 lg:py-12 bg-gradient-to-br from-green-50 via-green-50/30 to-white" ref={sectionRef}>
      <div className="container mx-auto">

        <div className="home-reviews-heading">
          <div><p className="home-eyebrow"><span />Опыт тех, кто уже с нами</p><h2 className="home-heading">Отзывы <em>исполнителей</em></h2></div>
          <div className="home-review-nav"><button type="button" aria-label="Предыдущий отзыв" className="review-prev"><ArrowLeft size={22} /></button><button type="button" aria-label="Следующий отзыв" className="review-next"><ArrowRight size={22} /></button></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
          onSwiper={swiper => { sliderRef.current = swiper; if (paused || !isVisible) swiper.autoplay.stop(); }}
          onFocusCapture={() => setPaused(true)}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ prevSlideMessage: 'Предыдущий отзыв', nextSlideMessage: 'Следующий отзыв', paginationBulletMessage: 'Перейти к отзыву {{index}}' }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.review-prev',
            nextEl: '.review-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pt-5 !pb-10 px-4"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div
                className="home-review-card bg-white p-6 rounded-2xl border border-gray-100 h-full flex flex-col relative"
              >
                <Quote size={36} className="text-green-200 absolute top-4 right-4" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="home-review-avatar w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-green-50 border-2 border-green-700"
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
                  <p className="home-review-text text-gray-600 text-sm">"{review.text}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="home-reviews-bottom flex flex-wrap items-center justify-center gap-5 pb-3 text-sm">
          <a href={REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-800 underline underline-offset-4 hover:text-green-600">Посмотрите наши отзывы на Яндекс Картах ↗</a>
          <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-green-200 bg-white px-4 text-green-800">
            {paused ? <Play size={15} /> : <Pause size={15} />}{paused ? 'Включить автопрокрутку' : 'Приостановить автопрокрутку'}
          </button>
        </div>
      </div>
    </section>
  );
};
