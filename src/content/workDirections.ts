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
    salary: 'Условия зависят от сервиса и города',
    image: deliveryImage,
    description: [
      'Посылки, продукты и заказы из магазинов, экспресс- и грузовая доставка.',
      'Подберём сервис и формат под ваш город и транспорт.',
    ],
    services: ['Яндекс Доставка', 'Купер', 'TopGo'],
    formats: ['Пешком', 'Вело и самокат', 'Автомобиль'],
    href: '/dostavka/',
  },
  {
    id: 'smena',
    category: 'Подработка',
    title: 'Подработка по сменам',
    salary: 'Смены разной длительности в доступных городах',
    image: deliveryImage,
    description: [
      'Касса, сборка заказов, склад, выкладка, кухня, ПВЗ и клининг.',
      'Выбирайте подходящие задания и совмещайте с основной работой или учёбой.',
    ],
    services: ['Яндекс Смена'],
    formats: ['Сборка', 'Касса', 'Склад', 'Кухня', 'Клининг'],
    href: '/smena/',
  },
  {
    id: 'taxi',
    category: 'Такси',
    title: 'Водитель такси',
    salary: 'На своём или арендованном автомобиле',
    image: deliveryImage,
    description: [
      'Подключение к заказам Яндекс Такси через Барори Парк.',
      'Можно работать на своём автомобиле или подобрать аренду.',
    ],
    services: ['Яндекс Такси'],
    formats: ['Свой автомобиль', 'Аренда автомобиля'],
    href: '/taxi/',
  },
  {
    id: 'eda',
    category: 'Доставка еды',
    title: 'Курьер Яндекс Еды',
    salary: 'Свободные и плановые слоты',
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
    { value: 'match', label: 'Подберите мне' },
    { value: 'yandex-delivery', label: 'Яндекс Доставка' },
    { value: 'kuper', label: 'Купер' },
    { value: 'topgo', label: 'TopGo' },
  ],
  smena: [
    { value: 'any', label: 'Любая доступная' },
    { value: 'picking', label: 'Сборка' },
    { value: 'cashier', label: 'Касса' },
    { value: 'warehouse', label: 'Склад и выкладка' },
    { value: 'kitchen', label: 'Кухня' },
    { value: 'cleaning', label: 'Клининг' },
  ],
  taxi: [
    { value: 'own-car', label: 'Свой автомобиль' },
    { value: 'rental', label: 'Нужна аренда' },
    { value: 'undecided', label: 'Пока не решил' },
  ],
  eda: [
    { value: 'walk', label: 'Пешком' },
    { value: 'bike', label: 'Велосипед или самокат' },
    { value: 'car', label: 'Автомобиль' },
    { value: 'undecided', label: 'Пока не решил' },
  ],
};

export const DEFAULT_PREFERENCE: Record<WorkDirectionId, string> = {
  delivery: 'match',
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
    department: direction === 'delivery' && preferenceLabel !== 'Подберите мне'
      ? preferenceLabel
      : workDirection.services[0],
    preference: preferenceLabel,
  };
};
