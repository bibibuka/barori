// FILE: src/taxi/TaxiForm.tsx
//
// Форма отклика ТОЛЬКО на направление «Водитель такси» (лендинг /taxi/).
// Должность зашита жёстко, выбора других вакансий нет — страница изолирована.

// Заявка собирает только контакты и город. Наличие автомобиля, стаж и документы
// менеджер выясняет на звонке — храним минимум сведений о человеке.
import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import {
  FormSection, ChoiceGroup, ConsentCheckbox, useLeadSubmit, inputClass, useLanding,
} from '../landing/kit';
import { DIRECTION_PREFERENCES } from '../content/workDirections';

type TaxiVehicle = 'На своём автомобиле' | 'Нужна аренда' | 'Пока не решил';
const VEHICLE_OPTIONS = DIRECTION_PREFERENCES.taxi.map(option => ({
  value: option.label as TaxiVehicle,
  label: option.label,
}));

export const TaxiForm = () => {
  const { track } = useLanding();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [vehicle, setVehicle] = useState<TaxiVehicle>('Пока не решил');
  const [consent, setConsent] = useState(false);

  const { submit, isLoading, showToast } = useLeadSubmit({
    position: 'Водитель такси',
    leadType: 'Такси (лендинг /taxi/)',
    onSuccess: () => { setName(''); setPhone(''); setCity(''); },
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
    if (!consent) {
      track('lead_validation_error', { reason: 'consent' });
      showToast('Нужно согласие на обработку персональных данных', 'error');
      return;
    }

    submit({
      name,
      phone,
      city,
      department: 'Яндекс Такси',
      vehicle,
      message: `Заявка на подключение к такси. Автомобиль: ${vehicle}.`,
    }, consent);
  };

  return (
    <FormSection
      title="Заявка на подключение к такси"
      lead="Три поля — перезвоним и назовём условия, комиссию и требования именно для вашего города. До подключения, а не после."
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

        <ChoiceGroup
          name="taxi-vehicle"
          label="Какой автомобиль будет у вас?"
          options={VEHICLE_OPTIONS}
          value={vehicle}
          onChange={setVehicle}
        />

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

        <p className="text-sm text-gray-500 leading-relaxed">
          Стаж и документы уточним на звонке — в форме оставляем только данные, нужные для подбора подключения.
        </p>

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
