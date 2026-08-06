import type { CourierFormat, DeliveryDirection } from './campaign';

export interface CourierLeadState {
  name: string;
  phone: string;
  city: string;
  format: CourierFormat;
  direction: DeliveryDirection;
  consent: boolean;
}

export const validateCourierLead = (lead: CourierLeadState) => {
  if (!lead.name.trim() || !lead.phone.trim()) return 'Заполните имя и телефон';
  const phoneDigits = lead.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) return 'Укажите телефон: не менее 10 цифр';
  if (phoneDigits.length > 15) return 'Укажите корректный телефон: от 10 до 15 цифр';
  if (!lead.city.trim()) return 'Укажите город, чтобы подобрать доступные направления';
  if (!lead.consent) return 'Нужно согласие на обработку персональных данных';
  return null;
};

export const buildCourierPayload = (
  lead: CourierLeadState,
  attribution: Record<string, string>,
) => ({
  name: lead.name.trim(),
  phone: lead.phone.trim(),
  city: lead.city.trim(),
  courier_format: lead.format,
  delivery_direction: lead.direction,
  ...attribution,
  message: `Формат: ${lead.format}. Направление: ${lead.direction}.`,
});
