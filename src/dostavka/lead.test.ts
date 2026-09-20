import assert from 'node:assert/strict';
import test from 'node:test';

import { buildCourierPayload, validateCourierLead } from './lead.ts';

const validLead = {
  name: 'Иван Иванов',
  phone: '+7 999 000-00-00',
  city: 'Казань',
  service: 'Купер' as const,
  selfEmployment: 'Готов оформить' as const,
  consent: true,
};

test('validates the required contact fields in order', () => {
  assert.equal(validateCourierLead({ ...validLead, name: '' }), 'Заполните имя и телефон');
  assert.equal(validateCourierLead({ ...validLead, phone: 'x' }), 'Укажите телефон: не менее 10 цифр');
  assert.equal(validateCourierLead({ ...validLead, phone: '+7 999 00' }), 'Укажите телефон: не менее 10 цифр');
  assert.equal(validateCourierLead({ ...validLead, phone: '1234567890123456' }), 'Укажите корректный телефон: от 10 до 15 цифр');
  assert.equal(validateCourierLead({ ...validLead, city: '' }), 'Укажите город, чтобы подобрать доступные направления');
  assert.equal(validateCourierLead({ ...validLead, consent: false }), 'Нужно согласие на обработку персональных данных');
  assert.equal(validateCourierLead(validLead), null);
});

test('builds a readable CRM payload with campaign attribution', () => {
  assert.deepEqual(buildCourierPayload(validLead, { utm_source: 'yandex', yclid: '123' }), {
    name: 'Иван Иванов',
    phone: '+7 999 000-00-00',
    city: 'Казань',
    department: 'Купер',
    self_employment: 'Готов оформить',
    utm_source: 'yandex',
    yclid: '123',
    message: 'Сервис доставки: Купер. Самозанятость: Готов оформить.',
  });
});

test('keeps the lead down to contacts, city, service and self-employment', () => {
  assert.deepEqual(
    Object.keys(buildCourierPayload(validLead, {})).sort(),
    ['city', 'department', 'message', 'name', 'phone', 'self_employment'],
  );
});
