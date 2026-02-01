// FILE: src/components/Vacancies.tsx

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Типизация (Экспортируем, так как используется в App.tsx и Modal.tsx)
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

// Категории вакансий
const categories = [
  "Доставка и такси",
  "Клиентский сервис",
  "Сборка заказов",
  "Кулинария",
  "Клининг"
];

// Данные о вакансиях
export const vacanciesData: Vacancy[] = [
  // Доставка
  {
    id: '1',
    category: "Доставка и такси",
    title: "Пеший курьер",
    salary: "от 3 500 ₽/день",
    image: "https://images.unsplash.com/photo-1576662712957-e2a22534570b?auto=format&fit=crop&q=80&w=400",
    description: ["Доставка заказов из магазинов", "Радиус доставки до 3 км", "Удобная форма"]
  },
  {
    id: '2',
    category: "Доставка и такси",
    title: "Велокурьер",
    salary: "от 4 500 ₽/день",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=400",
    description: ["Быстрая доставка на велосипеде", "Предоставляем транспорт", "Бонусы за скорость"]
  },
  {
    id: '3',
    category: "Доставка и такси",
    title: "Водитель курьер",
    salary: "от 7 000 ₽/день",
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=400",
    description: ["Доставка на авто компании", "Компенсация ГСМ", "Гибкий график"]
  },

  // Клиентский сервис
  {
    id: '4',
    category: "Клиентский сервис",
    title: "Менеджер чата",
    salary: "от 45 000 ₽/мес",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    description: ["Ответы на вопросы клиентов", "Работа из дома", "Обучение"]
  },

  // Сборка заказов
  {
    id: '5',
    category: "Сборка заказов",
    title: "Сборщик заказов",
    salary: "от 3 000 ₽/смена",
    image: "https://images.unsplash.com/photo-1580674285054-bed318e145f59?auto=format&fit=crop&q=80&w=400",
    description: ["Сборка продуктов по списку", "Работа в теплом магазине", "Без тяжестей"]
  },

  // Кулинария
  {
    id: '6',
    category: "Кулинария",
    title: "Повар-универсал",
    salary: "от 60 000 ₽/мес",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    description: ["Приготовление блюд", "Соблюдение техкарт", "Питание включено"]
  },

  // Клининг
  {
    id: '7',
    category: "Клининг",
    title: "Клинер",
    salary: "от 2 500 ₽/смена",
    image: "https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?auto=format&fit=crop&q=80&w=400",
    description: ["Уборка помещений", "Профессиональный инвентарь", "Свободный график"]
  },
];

export const Vacancies = ({ onOpenModal }: VacanciesProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredVacancies = vacanciesData.filter(v => v.category === activeCategory);

  return (
    <section id="vacancies" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold uppercase text-center mb-8">Вакансии</h2>

        {/* Вкладки категорий */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredVacancies.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className="pb-12 px-4"
              >
                {filteredVacancies.map((vacancy) => (
                  <SwiperSlide key={vacancy.id} className="h-auto pb-2">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col group hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={vacancy.image}
                          alt={vacancy.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        <div className="absolute bottom-3 left-3 text-white">
                            <p className="text-sm font-medium opacity-90">{vacancy.category}</p>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h5 className="text-xl font-bold font-oswald mb-2 text-gray-800">{vacancy.title}</h5>
                        <p className="text-blue-600 font-bold mb-4 text-lg">{vacancy.salary}</p>
                        
                        {/* Небольшое описание (первый пункт) для превью */}
                         <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {vacancy.description[0]}
                         </p>

                        <div className="mt-auto pt-2">
                          <button
                            onClick={() => onOpenModal(vacancy)}
                            className="w-full border-2 border-gray-100 text-gray-700 font-bold py-2.5 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Подробнее 
                            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl mx-4 border-2 border-dashed border-gray-200">
                <p>В данной категории пока нет открытых вакансий.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Подсказка для мобильных устройств */}
        <div className="lg:hidden flex justify-center items-center gap-2 text-gray-400 text-xs mt-4 animate-pulse">
          <Hand size={18} />
          <span>Свайпайте влево для просмотра</span>
        </div>
      </div>
    </section>
  );
};