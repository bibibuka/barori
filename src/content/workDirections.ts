import courierImage from '../assets/kura.webp';
import deliveryImage from '../assets/delivery-hero.webp';

export type WorkDirectionId = 'delivery' | 'smena' | 'taxi' | 'eda';

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface WorkDirection {
  id: WorkDirectionId;
  category: string;
  title: string;
  salary: string;
  note?: string;
  image: string;
  description: string[];
  services: string[];
  formats: string[];
  href: string;
}

export const WORK_DIRECTIONS: WorkDirection[] = [
  {
    id: 'delivery',
    category: 'Доставка',
    title: 'Доставка заказов',
    salary: '4 000 – 7 000 ₽ за день',
    note: 'Формат и сервис подберем под ваш город и транспорт.',
    image: deliveryImage,
    description: [
      'Посылки, продукты и заказы из магазинов, грузы.',
      'Экспресс-доставка и плановые заказы по городу.',
    ],
    services: ['Яндекс Доставка', 'Купер', 'TopGo'],
    formats: ['Пешком', 'Вело и самокат', 'Автомобиль'],
    href: '/dostavka/',
  },
  {
    id: 'smena',
    category: 'Подработка',
    title: 'Подработка по сменам',
    salary: '2 000 – 4 000 ₽ за смену',
    note: 'Выплаты уже на следующий день. Без собеседований.',
    image: deliveryImage,
    description: [
      'Разовые подработки на складах, кассах и кухнях партнёров.',
      'Вы сами выбираете удобные смены и объекты.',
    ],
    services: ['Яндекс Смена'],
    formats: ['Сборка', 'Касса', 'Склад', 'Кухня', 'Клининг'],
    href: '/smena/',
  },
  {
    id: 'taxi',
    category: 'Такси',
    title: 'Водитель такси',
    salary: '4 500 – 12 000 ₽ за смену',
    note: 'Выплаты доступны каждый день.',
    image: deliveryImage,
    description: [
      'Подключение к заказам Яндекс Такси через Барори Парк — поможем с самозанятостью и документами.',
      '',
    ],
    services: ['Яндекс Такси'],
    formats: ['Стаж от 3 лет', 'Свой автомобиль', 'Аренда автомобиля'],
    href: '/taxi/',
  },
  {
    id: 'eda',
    category: 'Доставка еды',
    title: 'Курьер Яндекс Еды',
    salary: '',
    image: courierImage,
    description: [
      'Доставка заказов из ресторанов и магазинов в удобной локации.',
      'Свободные слоты — от 1 часа; плановые — обычно 4–12 часов.',
    ],
    services: ['Яндекс Еда'],
    formats: ['Пешком', 'Вело и самокат', 'Автомобиль'],
    href: '/eda/',
  },
];

export const DIRECTION_PREFERENCES: Record<WorkDirectionId, ChoiceOption[]> = {
  delivery: [
    { value: 'walk', label: 'Пешком' },
    { value: 'bike', label: 'Вело или самокат' },
    { value: 'car', label: 'Автомобиль' },
    { value: 'undecided', label: 'Пока не решил' },
  ],
  smena: [
    { value: 'any', label: 'Любые доступные' },
    { value: 'picking', label: 'Сборка' },
    { value: 'cashier', label: 'Касса' },
    { value: 'warehouse', label: 'Склад и выкладка' },
    { value: 'kitchen', label: 'Кухня' },
    { value: 'cleaning', label: 'Клининг' },
  ],
  taxi: [
    { value: 'own-car', label: 'На своём автомобиле' },
    { value: 'rental', label: 'Нужна аренда' },
    { value: 'undecided', label: 'Пока не решил' },
  ],
  eda: [
    { value: 'walk', label: 'Пешком' },
    { value: 'bike', label: 'Вело или самокат' },
    { value: 'car', label: 'Автомобиль' },
    { value: 'undecided', label: 'Пока не решил' },
  ],
};

export const DEFAULT_PREFERENCE: Record<WorkDirectionId, string> = {
  delivery: 'undecided',
  smena: 'any',
  taxi: 'undecided',
  eda: 'undecided',
};

export const EMPLOYEE_SERVICES = [
  'Яндекс Доставка',
  'Яндекс Еда',
  'Яндекс Такси',
  'Яндекс Смена',
  'Купер',
  'TopGo',
  'Другое',
] as const;

export const getWorkSelection = (direction: WorkDirectionId, preference: string) => {
  const workDirection = WORK_DIRECTIONS.find(item => item.id === direction) ?? WORK_DIRECTIONS[0];
  const preferenceLabel = DIRECTION_PREFERENCES[direction].find(item => item.value === preference)?.label
    ?? DIRECTION_PREFERENCES[direction][0].label;

  return {
    position: workDirection.title,
    department: workDirection.services[0],
    preference: preferenceLabel,
  };
};
