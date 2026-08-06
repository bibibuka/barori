// FILE: src/components/Vacancies.tsx

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, Hand, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { trackGoal } from '../utils/analytics';
import { YandexEdaSpotlight } from './YandexEdaSpotlight';

export interface Vacancy {
  id: string;
  category: string;
  title: string;
  salary: string;
  image: string;
  description: string[];
}

interface VacanciesProps {
  onOpenModal: (vacancy: Vacancy) => void;
}

const standardCategories = [
  "Доставка и такси",
  "Клиентский сервис",
  "Сборка заказов",
  "Кулинария",
  "Клининг"
];

const specialCategory = "Яндекс Смена";

// ИСПРАВЛЕНЫ ССЫЛКИ НА КАРТИНКИ
const vacanciesData: Vacancy[] = [
  // --- СПЕЦИАЛЬНАЯ КАТЕГОРИЯ ---
  {
    id: 'yandex-smena',
    category: specialCategory,
    title: "Сменщик Яндекс Смена",
    salary: "до 8 000 ₽/смена",
    image: "/upload/iblock/smenshik.webp",
    description: [
      "Ежедневные выплаты на карту",
      "Смены в удобных районах доступных городов",
      "Смены от 4 часов, можно совмещать",
      "Оформление и поддержка через Барори Парк"
    ]
  },
  // --- ДОСТАВКА И ТАКСИ ---
  {
    id: 'taxi-driver',
    category: "Доставка и такси",
    title: "Водитель такси",
    salary: "от 7 000 ₽/день",
    image: "/upload/iblock/5f2/pn4b7cswjbbfc0fz3mi4vd75hg1luk12.webp",
    description: ["Возраст от 21 года, стаж от 3 лет", "Подработка на выходных или свободный график", "Смартфон с Яндекс Про", "Помощь с подключением через таксопарк"]
  },
  {
    id: 'velo-helper',
    category: "Доставка и такси",
    title: "Велопомощник",
    salary: "от 4 000 ₽/день",
    image: "/upload/iblock/4a9/z8chb5masxyes9w081kthj8fx18w3dnk.webp",
    description: ["Дежурство на территории доставки", "Помощь курьерам с поломками", "Инструктаж по ПДД"]
  },
  {
    id: 'cargo-delivery',
    category: "Доставка и такси",
    title: "Грузовая доставка",
    salary: "от 6 000 ₽/день",
    image: "/upload/iblock/995/ftec97ksw8epemqlzdh64a56x7twwjaj.webp",
    description: ["Доставка грузов получателю", "Поддержание чистоты автомобиля", "Вежливое общение с клиентами"]
  },
  {
    id: 'express-delivery',
    category: "Доставка и такси",
    title: "Экспресс доставка (авто/вело)",
    salary: "от 4 000 ₽/день",
    image: "/upload/iblock/c98/dk3m9suuhmqmea0djowsiv87kyl33578.webp",
    description: ["Прием и доставка заказов", "Общение с клиентами", "Ответственность за сохранность товара"]
  },
  {
    id: 'planned-delivery',
    category: "Доставка и такси",
    title: "Плановая доставка",
    salary: "от 7 000 ₽/день",
    image: "/upload/iblock/b05/vtj379mlbbhjciqfgo968qu1gulzlujh.webp",
    description: ["До 10 заказов на рейс", "Планирование маршрутов", "Обеспечение сохранности товаров"]
  },
  // --- КЛИЕНТСКИЙ СЕРВИС ---
  {
    id: 'ops-services',
    category: "Клиентский сервис",
    title: "Операционные услуги",
    salary: "от 3 000 ₽/день",
    image: "/upload/iblock/ec4/qf4mgiqnnyzxld6dlnbhakkmdawt6vvg.webp",
    description: ["Разгрузка и размещение товара", "Проверка сроков годности", "Сборка и разборка заказов"]
  },
  {
    id: 'cashier',
    category: "Клиентский сервис",
    title: "Обслуживание на кассе",
    salary: "от 3 300 ₽/день",
    image: "/upload/iblock/11d/exzyy5ptrxjj1ka5vhgaer4nt8kgzisj.webp",
    description: ["Расчет покупателей", "Участие в акциях", "Выкладка в прикассовой зоне"]
  },
  {
    id: 'counter-service',
    category: "Клиентский сервис",
    title: "Обслуживание за прилавком",
    salary: "от 2 800 ₽/день",
    image: "/upload/iblock/01b/vobsp8v7l4f1doz59g7gthyxwqznc71c.webp",
    description: ["Выкладка и нарезка товара", "Обслуживание посетителей", "Обновление ценников"]
  },
  // --- СБОРКА ЗАКАЗОВ ---
  {
    id: 'order-picker',
    category: "Сборка заказов",
    title: "Сборка заказов",
    salary: "от 3 500 ₽/день",
    // ИСПРАВЛЕНА ССЫЛКА (было om вместо 0m)
    image: "/upload/iblock/db3/7lf9v9ie5vp4w0t9y73omgtguzd5lols.webp",
    description: ["Работа с терминалом (ТСД)", "Контроль сроков годности", "Взвешивание и упаковка"]
  },
  {
    id: 'merchandiser',
    category: "Сборка заказов",
    title: "Выкладка товаров",
    salary: "от 3 000 ₽/день",
    image: "/upload/iblock/fa1/c06hr8wdk64310hmicx8dxapl0qujdvy.webp",
    description: ["Выкладка в торговом зале", "Консультирование покупателей", "Отслеживание сроков реализации"]
  },
  {
    id: 'unloader',
    category: "Сборка заказов",
    title: "Разгрузка товаров",
    salary: "от 2 800 ₽/день",
    // ИСПРАВЛЕНА ССЫЛКА (было al вместо a1)
    image: "/upload/iblock/dc2/02xcg96al02n54qqztf09mwxsaiggnjy.webp",
    description: ["Погрузка/разгрузка", "Перенос на склад", "Поддержание порядка"]
  },
  {
    id: 'packer',
    category: "Сборка заказов",
    title: "Фасовка продукции",
    salary: "от 3 000 ₽/день",
    image: "/upload/iblock/983/hq8bfi2w36pbcr6imw2fijc039i1xdlu.webp",
    description: ["Сортировка овощей и фруктов", "Стикеровка", "Поддержание чистоты"]
  },
  {
    id: 'press-operator',
    category: "Сборка заказов",
    title: "Прессовка материалов",
    salary: "до 2 300 ₽/день",
    image: "/upload/iblock/db5/lncqlf9eugbnilv42zqp6d9ghq0vyzt6.webp",
    description: ["Прессовка картона и пленки", "Работа на пресс-машине", "Соблюдение техники безопасности"]
  },
  {
    id: 'pvz-manager',
    category: "Сборка заказов",
    title: "Выдача заказов на ПВЗ",
    salary: "от 2 000 ₽/день",
    image: "/upload/iblock/5cb/em2qiqj4j1a1meuaiu39gaajfw6mm8ph.webp",
    description: ["Прием и выдача заказов", "Ведение документации", "Поддержание чистоты в пункте"]
  },
  // --- КУЛИНАРИЯ ---
  {
    id: 'baker',
    category: "Кулинария",
    title: "Выпечка хлеба",
    salary: "от 2 500 ₽/день",
    image: "/upload/iblock/db8/11qy91prq0ivedg7bq95ri9xutr0in61.webp",
    description: ["Изготовление продукции", "Формовка и раскатка теста", "Выкладка на витрину"]
  },
  {
    id: 'cook-helper',
    category: "Кулинария",
    title: "Помощник повара",
    salary: "от 2 200 ₽/день",
    image: "/upload/iblock/032/2qfb3jzvdyi2iylb3uw1jr6pz7vcmwzk.webp",
    description: ["Помощь поварам", "Нарезка и фасовка", "Соблюдение санитарных норм"]
  },
  {
    id: 'chef',
    category: "Кулинария",
    title: "Приготовление пищи",
    salary: "от 4 000 ₽/день",
    image: "/upload/iblock/c7b/7dnplih1vcjap23ytds55zwvq4i807s8.webp",
    description: ["Работа по тех. картам", "Разделка мяса/рыбы", "Контроль качества сырья"]
  },
  // --- КЛИНИНГ ---
  {
    id: 'cleaning',
    category: "Клининг",
    title: "Уборка",
    salary: "от 3 000 ₽/день",
    image: "/upload/iblock/34c/9ogcoh7ku93nobl301u427uy7ytice5e.webp",
    description: ["Сухая и влажная уборка", "Уборка торговых и сервисных зон", "Вынос мусора"]
  },
  {
    id: 'dishwasher',
    category: "Клининг",
    title: "Мытье посуды",
    salary: "от 3 000 ₽/день",
    image: "/upload/iblock/ee3/nwbokq0mdnnfshqc83ivpr39z55zoh7r.webp",
    description: ["Мытье посуды и инвентаря", "Сортировка чистой посуды", "Подготовка растворов"]
  }
];

export const Vacancies = ({ onOpenModal }: VacanciesProps) => {
  const [activeCategory, setActiveCategory] = useState(specialCategory);

  const filteredVacancies = vacanciesData.filter(v => v.category === activeCategory);

  const handleCategoryClick = (category: string) => {
    trackGoal('vacancy_category_click', { category });
    setActiveCategory(category);
  };

  const handleOpenVacancy = (vacancy: Vacancy) => {
    trackGoal('vacancy_details_click', { vacancy: vacancy.id, category: vacancy.category });
    onOpenModal(vacancy);
  };

  return (
    <section id="vacancies" className="py-12 bg-gradient-to-br from-green-50 via-green-50/30 to-white">
      <div className="container mx-auto relative group/slider">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-3">Вакансии и смены</h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Подработка через Яндекс Смена, работа курьером, подключение к Яндекс Такси и доставке в разных регионах.
          </p>
        </div>

        {/* Контейнер для кнопок */}
        <div className="mb-10 px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {standardCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`cursor-pointer px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 border ${
                  activeCategory === cat
                    ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-200 hover:bg-green-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* СПЕЦИАЛЬНАЯ КНОПКА С ИСКРАМИ И БЛИКОМ */}
          <div className="flex justify-center">
            <button
              onClick={() => handleCategoryClick(specialCategory)}
              className={cn(
                "cursor-pointer relative overflow-hidden w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform flex items-center justify-center gap-2 text-white animate-fire-glow bg-[length:300%_300%] bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-gradient-fire",
                activeCategory === specialCategory 
                  ? 'scale-105 ring-4 ring-orange-400 ring-offset-2' 
                  : 'hover:scale-105'
              )}
            >
              {/* Блик с паузой (перелетает) */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shine" />
              
              {/* Искры */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(6)].map((_, i) => (
                  <span 
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-200 rounded-full sparkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      '--tx': `${(Math.random() - 0.5) * 50}px`,
                      '--ty': `-${Math.random() * 50 + 20}px`
                    } as React.CSSProperties}
                  />
                ))}
              </div>

              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                <Flame size={24} className="fill-yellow-300 text-yellow-100 animate-pulse" />
                <span className="tracking-wide">{specialCategory}</span>
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative px-4 lg:px-12"
          >
            {filteredVacancies.length > 0 ? (
              <>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  centerInsufficientSlides
                  navigation={{
                    prevEl: '.vac-prev',
                    nextEl: '.vac-next',
                  }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  className="!pb-14"
                >
                  {filteredVacancies.map((vacancy) => {
                    const isSpecial = activeCategory === specialCategory;
                    
                    // ЛОГИКА КНОПОК С ПРИНУДИТЕЛЬНОЙ ЗАЛИВКОЙ (!IMPORTANT)
                    const buttonClass = isSpecial
                      ? "cursor-pointer w-full border-2 font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn bg-white border-orange-200 text-gray-800 hover:!bg-orange-500 hover:!border-orange-500 hover:!text-white relative z-20"
                      : "cursor-pointer w-full border-2 font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn bg-white border-gray-200 text-gray-700 hover:!bg-green-600 hover:!border-green-600 hover:!text-white relative z-20";

                    return (
                      <SwiperSlide key={vacancy.id} className="!h-auto pb-2">
                        <div className={cn(
                          "rounded-2xl shadow-lg overflow-hidden border h-full flex flex-col group transition-all duration-300 hover:shadow-xl relative",
                          isSpecial 
                            ? 'bg-orange-50 border-orange-200 hover:border-orange-400' 
                            : 'bg-white border-gray-100 hover:border-green-600'
                        )}>
                          <div className="relative h-48 overflow-hidden flex-shrink-0">
                            <img 
                              src={vacancy.image} 
                              alt={vacancy.title} 
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 pointer-events-none"></div>
                            <div className="absolute bottom-3 left-3 text-white">
                              <p className="text-sm font-medium opacity-90">{vacancy.category}</p>
                            </div>
                          </div>

                          <div className="p-5 flex flex-col flex-grow relative z-10">
                            <div className="min-h-[3.5rem] flex items-center mb-2">
                              <h5 className="text-xl font-bold font-oswald text-gray-800 line-clamp-2 leading-tight">
                                {vacancy.title}
                              </h5>
                            </div>
                            
                            {isSpecial ? (
                              <div className="mb-2 text-center">
                                <div className="relative inline-block">
                                  {/* Горящая подложка */}
                                  <div className="absolute inset-0 -inset-x-3 -inset-y-1 rounded-xl bg-gradient-to-r from-yellow-400/30 via-orange-400/40 to-red-400/30 blur-md animate-fire-bg"></div>
                                  <p className="relative text-2xl sm:text-3xl font-black font-oswald animate-fire-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-fire-text"
                                     style={{ WebkitTextStroke: '1.5px rgba(234, 88, 12, 0.6)', paintOrder: 'stroke fill' }}
                                  >
                                    {vacancy.salary}
                                  </p>
                                </div>
                                <p className="text-[9px] text-gray-400/60 mt-1.5 leading-tight">
                                  при определенных условиях с учетом бонуса новичка
                                </p>
                              </div>
                            ) : (
                              <p className="font-bold mb-2 text-lg text-green-600">
                                {vacancy.salary}
                              </p>
                            )}

                            <div className="mt-auto pt-4 relative z-20">
                              <button 
                                onClick={() => handleOpenVacancy(vacancy)}
                                className={buttonClass}
                              >
                                Подробнее
                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                <button className="vac-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center text-green-600 shadow-md hover:bg-green-50 hover:scale-110 transition-all disabled:opacity-0 disabled:cursor-auto cursor-pointer">
                  <ChevronLeft size={24} />
                </button>
                <button className="vac-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center text-green-600 shadow-md hover:bg-green-50 hover:scale-110 transition-all disabled:opacity-0 disabled:cursor-auto cursor-pointer">
                  <ChevronRight size={24} />
                </button>
              </>
            ) : (
              <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl mx-4 border-2 border-dashed border-gray-200">
                <p>В данной категории пока нет открытых вакансий.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="lg:hidden flex justify-center items-center gap-2 text-gray-400 text-xs mt-4 animate-pulse">
          <Hand size={18} />
          <span>Свайпайте влево для просмотра</span>
        </div>

        <YandexEdaSpotlight />
      </div>

      <style>{`
        /* Блик с паузой */
        @keyframes shine-fly {
          0% { transform: translateX(-100%) skewX(-20deg); }
          20% { transform: translateX(250%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .animate-shine {
          animation: shine-fly 3s infinite linear;
        }
        
        /* Плавный градиент */
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-fire {
          animation: gradient-flow 5s ease infinite;
        }

        /* Мягкая пульсация */
        @keyframes fire-glow-soft {
          0%, 100% { box-shadow: 0 0 15px rgba(234, 88, 12, 0.4); }
          50% { box-shadow: 0 0 25px rgba(234, 88, 12, 0.7); }
        }
        .animate-fire-glow {
          animation: fire-glow-soft 3s ease-in-out infinite;
        }

        /* Искры */
        @keyframes sparkle-move {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .sparkle {
          animation: sparkle-move 2s infinite ease-out;
        }

        /* Горящий градиентный текст — линейная, без рывков */
        @keyframes gradient-fire-text {
          from { background-position: 0% center; }
          to { background-position: 200% center; }
        }
        .animate-gradient-fire-text {
          animation: gradient-fire-text 3s linear infinite;
        }

        /* Пульсация огненного текста — плавная синусоида */
        @keyframes fire-text-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-fire-text {
          animation: fire-text-pulse 2s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(234, 88, 12, 0.3), 0 0 20px rgba(234, 88, 12, 0.1);
        }

        /* Горящая подложка — пульсация свечения */
        @keyframes fire-bg-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-fire-bg {
          animation: fire-bg-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
