// FILE: src/smena/SmenaForm.tsx
//
// Форма отклика ТОЛЬКО на направление «Яндекс Смена» (лендинг /smena/).
// Других направлений в форме нет — страница изолирована от основного сайта.

import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import {
  FormSection, ChoiceGroup, ConsentCheckbox, useLeadSubmit, inputClass, useLanding,
} from '../landing/kit';

const SHIFT_TYPES = [
  'Любые смены',
  'Магазин и касса',
  'Склад и сборка',
  'Кухня и выпечка',
] as const;

interface SmenaFormProps {
  shiftType: string;
  onShiftTypeChange: (value: string) => void;
}

export const SmenaForm = ({ shiftType, onShiftTypeChange }: SmenaFormProps) => {
  const { track } = useLanding();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [selfEmployment, setSelfEmployment] = useState<'' | 'has' | 'ready'>('');
  const [consent, setConsent] = useState(false);

  const { submit, isLoading, showToast } = useLeadSubmit({
    position: 'Яндекс Смена',
    leadType: 'Яндекс Смена (лендинг /smena/)',
    onSuccess: () => { setName(''); setPhone(''); setCity(''); setMessage(''); setSelfEmployment(''); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      track('lead_validation_error', { reason: 'empty_fields' });
      showToast('Заполните имя и телефон', 'error');
      return;
    }
    if (!city) {
      track('lead_validation_error', { reason: 'city' });
      showToast('Укажите город — от него зависит, какие смены доступны', 'error');
      return;
    }
    if (!selfEmployment) {
      track('lead_validation_error', { reason: 'self_employment' });
      showToast('Отметьте статус самозанятости — без неё на смены не оформить', 'error');
      return;
    }
    if (!consent) {
      track('lead_validation_error', { reason: 'consent' });
      showToast('Нужно согласие на обработку персональных данных', 'error');
      return;
    }

    submit({
      name,
      phone,
      city,
      shift_type: shiftType,
      self_employment: selfEmployment === 'has' ? 'Уже оформлена' : 'Готов оформить',
      message: `Интересуют: ${shiftType}.${message ? ' ' + message : ''}`,
    }, consent);
  };

  return (
    <FormSection
      title="Заявка на смены"
      lead="Заполните 4 поля — менеджер позвонит, объяснит формат простыми словами и подскажет, какие смены есть в вашем городе."
      bullets={[
        { icon: <Clock size={18} />, text: 'Звонок в течение 15 минут (10:00–20:00)' },
        { icon: <CheckCircle2 size={18} />, text: 'Поможем с самозанятостью и медкнижкой' },
        { icon: <ShieldCheck size={18} />, text: 'Данные используем только для обработки заявки' },
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-4" id="smena-apply">
        <div id="captcha-container"></div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-800/70 font-semibold">Направление</p>
            <p className="font-bold text-green-800 font-oswald text-lg leading-tight">Яндекс Смена</p>
            <p className="text-xs text-green-800/70">подработка сменами от 4 часов</p>
          </div>
          <CheckCircle2 className="text-green-800 shrink-0" size={24} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sm-name" className="block text-sm font-medium text-gray-700 mb-1.5">Имя и фамилия</label>
            <input id="sm-name" type="text" required placeholder="Иван Иванов"
              className={inputClass} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sm-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
            <input id="sm-phone" type="tel" required placeholder="+7 (999) 000-00-00"
              className={inputClass} value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="sm-city" className="block text-sm font-medium text-gray-700 mb-1.5">Город и район</label>
          <input id="sm-city" type="text" required placeholder="Например, Санкт-Петербург, Приморский"
            className={inputClass} value={city} onChange={e => setCity(e.target.value)} />
        </div>

        <ChoiceGroup
          name="shift_type"
          label="Какие смены интересны?"
          options={SHIFT_TYPES.map(t => ({ value: t, label: t }))}
          value={shiftType as (typeof SHIFT_TYPES)[number]}
          onChange={onShiftTypeChange}
        />

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 space-y-2.5">
          <p className="text-xs sm:text-sm text-amber-900 leading-snug">
            Смены оформляются как сотрудничество с самозанятым — это <strong>обязательное условие</strong>.
            Статуса нет? Оформим вместе за 15 минут в приложении, бесплатно.
          </p>
          <ChoiceGroup
            name="selfEmployment"
            tone="amber"
            options={[
              { value: 'has', label: 'Самозанятость уже есть' },
              { value: 'ready', label: 'Готов(а) оформить' },
            ]}
            value={selfEmployment}
            onChange={setSelfEmployment}
          />
        </div>

        <div>
          <label htmlFor="sm-message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Комментарий <span className="text-gray-400 font-normal">(необязательно)</span>
          </label>
          <textarea id="sm-message" rows={3}
            placeholder="Например: могу только по вечерам, удобно звонить после 18:00"
            className={`${inputClass} resize-none`} value={message} onChange={e => setMessage(e.target.value)} />
        </div>

        <ConsentCheckbox checked={consent} onChange={setConsent} place="smena_form" />

        <button
          type="submit"
          disabled={isLoading || !consent}
          className={`w-full bg-green-600 text-[var(--on-accent)] font-bold py-4 rounded-xl uppercase tracking-wide shadow-lg shadow-green-200 transition-all active:scale-[0.99] ${
            isLoading || !consent ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-green-700 animate-btn-pulse'
          }`}
        >
          {isLoading ? 'Отправляем...' : 'Хочу брать смены'}
        </button>

        <p className="text-center text-xs text-gray-400">
          Нажимая кнопку, вы отправляете заявку на подключение к сменам.
          Это не трудоустройство — формат сотрудничества обсудим по телефону.
        </p>
      </form>
    </FormSection>
  );
};
