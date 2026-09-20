export type CourierSelfEmployment = 'Уже оформлена' | 'Готов оформить';
export type CourierService = 'Подберите мне' | 'Яндекс Доставка' | 'Купер' | 'TopGo';

export const SELF_EMPLOYMENT_OPTIONS: { value: CourierSelfEmployment; label: string }[] = [
  { value: 'Уже оформлена', label: 'Уже оформлена' },
  { value: 'Готов оформить', label: 'Готов оформить' },
];

export interface CourierLeadState {
  name: string;
  phone: string;
  city: string;
  service: CourierService;
  selfEmployment: CourierSelfEmployment;
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
  department: lead.service,
  self_employment: lead.selfEmployment,
  ...attribution,
  message: `Сервис доставки: ${lead.service}. Самозанятость: ${lead.selfEmployment}.`,
});
