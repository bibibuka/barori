// FILE: src/tariffs/TariffsForm.tsx
import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock, Award, Sparkles, Briefcase, Building2 } from 'lucide-react';
import { 
  FormSection, 
  ConsentCheckbox, 
  useLeadSubmit, 
  inputClass, 
  useLanding 
} from '../landing/kit';

const SMZ_SERVICES = [
  { value: 'Такси', label: 'Такси (фикс 3%)' },
  { value: 'Доставка', label: 'Доставка (3–5%)' },
  { value: 'ТопГоу', label: 'ТопГоу (фикс 7%)' },
  { value: 'Яндекс Еда', label: 'Яндекс Еда (5–10%)' },
  { value: 'Купер', label: 'Купер (фикс 5%)' },
  { value: 'Яндекс Смена', label: 'Смены (4–10%)' },
];

const PARK_SERVICES = [
  { value: 'ТопГоу', label: 'ТопГоу (фикс 7%)' },
  { value: 'Яндекс Смена', label: 'Смены (4–10%)' },
];

export const TariffsForm = () => {
  const { track } = useLanding();

  const [employmentType, setEmploymentType] = useState<'smz' | 'park'>('smz');
  const [selectedService, setSelectedService] = useState('Доставка');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [consent, setConsent] = useState(false);

  const availableServices = employmentType === 'smz' ? SMZ_SERVICES : PARK_SERVICES;

  const handleEmploymentTypeChange = (type: 'smz' | 'park') => {
    setEmploymentType(type);
    if (type === 'park' && !['ТопГоу', 'Яндекс Смена'].includes(selectedService)) {
      setSelectedService('ТопГоу');
    }
  };

  const { submit, isLoading, showToast } = useLeadSubmit({
    position: `Тариф: ${selectedService} (${employmentType === 'smz' ? 'СМЗ/ИП' : 'Парковый'})`,
    leadType: 'Тарифы (лендинг /tariffs/)',
    onSuccess: () => {
      setName('');
      setPhone('');
      setCity('');
    },
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
      showToast('Укажите город подключения', 'error');
      return;
    }
    if (!consent) {
      track('lead_validation_error', { reason: 'consent' });
      showToast('Нужно согласие на обработку персональных данных', 'error');
      return;
    }

    submit(
      {
        name,
        phone,
        city,
        department: selectedService,
        message: `Заявка по тарифу: ${selectedService} | Тип занятости: ${employmentType === 'smz' ? 'Самозанятый / ИП' : 'Парковый сотрудник'}. Город: ${city}`,
      },
      consent
    );
  };

  return (
    <FormSection
      title="Заявка на подключение по тарифу"
      lead="Выберите желаемый тип занятости и направление — перезвоним в течение 15 минут, ответим на все вопросы и поможем выйти на линию на самых выгодных условиях."
      bullets={[
        { icon: <Clock size={18} />, text: 'Звонок в течение 15 минут (10:00–20:00)' },
        { icon: <Award size={18} />, text: 'Снижение процента комиссии с ростом выполненных смен' },
        { icon: <CheckCircle2 size={18} />, text: 'Моментальные выплаты на карту любого банка 24/7' },
        { icon: <ShieldCheck size={18} />, text: 'Прозрачные условия, зафиксированные в договоре-оферте' },
      ]}
      minAge={16}
    >
      <form onSubmit={handleSubmit} className="space-y-4" id="tariffs-apply">
        <div id="captcha-container"></div>

        {/* Выбор типа занятости */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Тип занятости:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleEmploymentTypeChange('smz')}
              className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                employmentType === 'smz'
                  ? 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
              }`}
            >
              <Briefcase size={16} />
              <span>Самозанятый / ИП</span>
            </button>
            <button
              type="button"
              onClick={() => handleEmploymentTypeChange('park')}
              className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                employmentType === 'park'
                  ? 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
              }`}
            >
              <Building2 size={16} />
              <span>Парковый сотрудник</span>
            </button>
          </div>
        </div>

        {/* Выбор сервиса */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
            <Sparkles size={16} className="text-green-600" />
            Выберите сервис для подключения:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableServices.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setSelectedService(opt.value)}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold text-center transition-all cursor-pointer ${
                  selectedService === opt.value
                    ? 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Имя */}
        <div>
          <label htmlFor="tariff-name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
          <input id="tariff-name" name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className={inputClass}
          />
        </div>

        {/* Телефон */}
        <div>
          <label htmlFor="tariff-phone" className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
          <input id="tariff-phone" name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 000-00-00"
            className={inputClass}
          />
        </div>

        {/* Город */}
        <div>
          <label htmlFor="tariff-city" className="block text-sm font-medium text-gray-700 mb-1">Ваш город</label>
          <input id="tariff-city" name="city"
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Санкт-Петербург"
            className={inputClass}
          />
        </div>

        {/* Чекбокс согласия */}
        <ConsentCheckbox
          checked={consent}
          onChange={setConsent}
          place="tariffs_form"
        />

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base shadow-xl shadow-green-500/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? 'Отправляем заявку...' : `Подключиться: ${selectedService} (${employmentType === 'smz' ? 'СМЗ' : 'Парк'})`}
        </button>
      </form>
    </FormSection>
  );
};
