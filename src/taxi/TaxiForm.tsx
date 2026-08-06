// FILE: src/taxi/TaxiForm.tsx
//
// Форма отклика ТОЛЬКО на направление «Водитель такси» (лендинг /taxi/).
// Должность зашита жёстко, выбора других вакансий нет — страница изолирована.

import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import {
  FormSection, ChoiceGroup, ConsentCheckbox, useLeadSubmit, inputClass, useLanding,
} from '../landing/kit';

type CarStatus = 'Своё авто' | 'Пока нет авто';
type Experience = 'Менее 3 лет' | '3–5 лет' | 'Более 5 лет';

export const TaxiForm = () => {
  const { track } = useLanding();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [car, setCar] = useState<CarStatus | ''>('');
  const [experience, setExperience] = useState<Experience | ''>('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const { submit, isLoading, showToast } = useLeadSubmit({
    position: 'Водитель такси',
    leadType: 'Такси (лендинг /taxi/)',
    onSuccess: () => { setName(''); setPhone(''); setCity(''); setCar(''); setExperience(''); setMessage(''); },
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
      showToast('Укажите город — от него зависят условия подключения', 'error');
      return;
    }
    if (!car) {
      track('lead_validation_error', { reason: 'car' });
      showToast('Отметьте, есть ли у вас автомобиль', 'error');
      return;
    }
    if (!experience) {
      track('lead_validation_error', { reason: 'experience' });
      showToast('Укажите водительский стаж', 'error');
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
      car_status: car,
      driving_experience: experience,
      message: `Авто: ${car}. Стаж: ${experience}.${message ? ' ' + message : ''}`,
    }, consent);
  };

  return (
    <FormSection
      title="Заявка на подключение к такси"
      lead="Заполните 5 полей — перезвоним и назовём условия, комиссию и требования именно для вашего города. До подключения, а не после."
      bullets={[
        { icon: <Clock size={18} />, text: 'Звонок в течение 15 минут (10:00–20:00)' },
        { icon: <CheckCircle2 size={18} />, text: 'Проверим документы и поможем с самозанятостью' },
        { icon: <ShieldCheck size={18} />, text: 'Данные используем только для обработки заявки' },
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-4" id="taxi-apply">
        <div id="captcha-container"></div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-800/70 font-semibold">Направление</p>
            <p className="font-bold text-green-800 font-oswald text-lg leading-tight">Водитель такси</p>
            <p className="text-xs text-green-800/70">подключение к Яндекс Такси через парк</p>
          </div>
          <CheckCircle2 className="text-green-800 shrink-0" size={24} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tx-name" className="block text-sm font-medium text-gray-700 mb-1.5">Имя и фамилия</label>
            <input id="tx-name" type="text" required placeholder="Иван Иванов"
              className={inputClass} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="tx-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
            <input id="tx-phone" type="tel" required placeholder="+7 (999) 000-00-00"
              className={inputClass} value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="tx-city" className="block text-sm font-medium text-gray-700 mb-1.5">Город</label>
          <input id="tx-city" type="text" required placeholder="Например, Санкт-Петербург"
            className={inputClass} value={city} onChange={e => setCity(e.target.value)} />
        </div>

        <ChoiceGroup<CarStatus>
          name="car_status"
          label="Автомобиль"
          options={[
            { value: 'Своё авто', label: 'Своё авто' },
            { value: 'Пока нет авто', label: 'Пока нет авто' },
          ]}
          value={car}
          onChange={setCar}
        />

        {/* Аренду автомобилей парк не предоставляет — говорим прямо, не тянем лид зря */}
        {car === 'Пока нет авто' && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-3.5">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <p className="text-xs sm:text-sm text-amber-900 leading-snug">
              Для работы в такси нужен свой автомобиль — аренду мы не предоставляем.
              Заявку можно отправить: менеджер расскажет про другие направления парка,
              где машина не нужна.
            </p>
          </div>
        )}

        <ChoiceGroup<Experience>
          name="driving_experience"
          label="Водительский стаж"
          options={[
            { value: 'Менее 3 лет', label: 'Менее 3 лет' },
            { value: '3–5 лет', label: '3–5 лет' },
            { value: 'Более 5 лет', label: 'Более 5 лет' },
          ]}
          value={experience}
          onChange={setExperience}
        />

        {/* Стаж меньше 3 лет — требование сервиса не выполняется, честно предупреждаем сразу */}
        {experience === 'Менее 3 лет' && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-3.5">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <p className="text-xs sm:text-sm text-amber-900 leading-snug">
              Сервис требует стаж от 3 лет — с меньшим стажем подключение к такси, скорее всего,
              будет недоступно. Заявку всё равно можно отправить: менеджер проверит вашу ситуацию
              и предложит доступные направления парка.
            </p>
          </div>
        )}

        <div>
          <label htmlFor="tx-message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Комментарий <span className="text-gray-400 font-normal">(необязательно)</span>
          </label>
          <textarea id="tx-message" rows={3}
            placeholder="Например: марка и год авто, есть ли разрешение на такси, когда удобно позвонить"
            className={`${inputClass} resize-none`} value={message} onChange={e => setMessage(e.target.value)} />
        </div>

        <ConsentCheckbox checked={consent} onChange={setConsent} place="taxi_form" />

        <button
          type="submit"
          disabled={isLoading || !consent}
          className={`w-full bg-green-600 text-[var(--on-accent)] font-bold py-4 rounded-xl uppercase tracking-wide shadow-lg shadow-green-200 transition-all active:scale-[0.99] ${
            isLoading || !consent ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-green-700 animate-btn-pulse'
          }`}
        >
          {isLoading ? 'Отправляем...' : 'Подключиться к такси'}
        </button>

        <p className="text-center text-xs text-gray-400">
          Нажимая кнопку, вы отправляете заявку на подключение к сервису такси.
          Это не трудовой договор — формат сотрудничества обсудим по телефону.
        </p>
      </form>
    </FormSection>
  );
};
