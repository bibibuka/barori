import type { CourierFormat, DeliveryDirection } from './directions';

export type { CourierFormat, DeliveryDirection } from './directions';

export interface CampaignContext {
  city: string;
  format: CourierFormat;
  direction: DeliveryDirection;
  attribution: Record<string, string>;
}

const FORMAT_BY_PARAM: Record<string, CourierFormat> = {
  foot: 'Пеший курьер',
  bike: 'Велокурьер',
  auto: 'Автокурьер',
  cargo: 'Водитель грузовой доставки',
};

const DIRECTION_BY_PARAM: Record<string, DeliveryDirection> = {
  'yandex-eda': 'Еда и продукты',
  food: 'Еда и продукты',
  express: 'Экспресс-доставка',
  planned: 'Плановая доставка',
  auto: 'Автодоставка',
  'cargo-delivery': 'Грузовая доставка',
  'velo-helper': 'Велопомощник',
};

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'yclid',
] as const;

const clean = (value: string | null, maxLength: number) =>
  (value ?? '').replace(/\s+/g, ' ').trim().slice(0, maxLength);

export const readCampaignContext = (search: string): CampaignContext => {
  const params = new URLSearchParams(search);
  const formatParam = clean(params.get('format'), 32).toLowerCase();
  const directionParam = clean(params.get('direction'), 40).toLowerCase();
  const attribution: Record<string, string> = {};

  ATTRIBUTION_KEYS.forEach(key => {
    const value = clean(params.get(key), 200);
    if (value) attribution[key] = value;
  });

  return {
    city: clean(params.get('city'), 60),
    format: FORMAT_BY_PARAM[formatParam] ?? 'Пока не выбрал',
    direction: DIRECTION_BY_PARAM[directionParam] ?? 'Подобрать направление',
    attribution,
  };
};

export const formatCampaignHeadline = ({ city, format }: CampaignContext) => {
  if (format !== 'Пока не выбрал' && city) return `${format}: ${city}`;
  if (format !== 'Пока не выбрал') return `${format}: работа в вашем городе`;
  if (city) return `Работа курьером: ${city}`;
  return 'Работа курьером в вашем городе';
};
