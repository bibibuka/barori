// FILE: src/eda/EdaForm.tsx
//
// Форма отклика ТОЛЬКО на направление «Курьер Яндекс Еды» (лендинг /eda/).
// Должность зашита жёстко; выбора других направлений нет — страница изолирована.
// position совпадает со справочником основной формы, различает лендинги поле type.

import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import {
  ConsentCheckbox,
  FormSection,
  inputClass,
  useLanding,
  useLeadSubmit,
} from '../landing/kit';
import courierImage from '../assets/kura.webp';

export type EdaTransport = 'Пешком' | 'Велосипед или самокат' | 'Электротранспорт' | 'Подберём вместе';

export const TRANSPORT_OPTIONS: { value: EdaTransport; label: string }[] = [
  { value: 'Подберём вместе', label: 'Подберём вместе' },
  { value: 'Пешком', label: 'Пешком' },
  { value: 'Велосипед или самокат', label: 'Велосипед или самокат' },
  { value: 'Электротранспорт', label: 'Электротранспорт' },
];

export interface EdaLeadState {
  name: string;
  phone: string;
  city: string;
  transport: EdaTransport;
  consent: boolean;
}

export const validateEdaLead = (lead: EdaLeadState) => {
  if (!lead.name.trim() || !lead.phone.trim()) return 'Заполните имя и телефон';
  const digits = lead.phone.replace(/\D/g, '');
  if (digits.length < 10) return 'Укажите телефон: не менее 10 цифр';
  if (digits.length > 15) return 'Укажите корректный телефон: от 10 до 15 цифр';
  if (!lead.city.trim()) return 'Укажите город — от него зависят доступные форматы';
  if (!lead.consent) return 'Нужно согласие на обработку персональных данных';
  return null;
};

export const buildEdaPayload = (lead: EdaLeadState, attribution: Record<string, string>) => ({
  name: lead.name.trim(),
  phone: lead.phone.trim(),
  city: lead.city.trim(),
  courier_format: lead.transport,
  delivery_direction: 'Еда и продукты',
  ...attribution,
  message: `Яндекс Еда. Передвижение: ${lead.transport}.`,
});

export interface EdaFormController {
  state: EdaLeadState;
  setState: Dispatch<SetStateAction<EdaLeadState>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const useEdaLead = (city: string, attribution: Record<string, string>): EdaFormController => {
  const { track } = useLanding();
  const [state, setState] = useState<EdaLeadState>({
    name: '',
    phone: '',
    city,
    transport: 'Подберём вместе',
    consent: false,
  });

  const { submit, isLoading, showToast } = useLeadSubmit({
    position: 'Курьер / Доставка',
    leadType: 'Яндекс Еда (лендинг /eda/)',
    onSuccess: () => setState(current => ({ ...current, name: '', phone: '', consent: false })),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateEdaLead(state);

    if (error) {
      track('lead_validation_error', { reason: error });
      showToast(error, 'error');
      return;
    }

    submit(buildEdaPayload(state, attribution), state.consent);
  };

  return { state, setState, handleSubmit, isLoading };
};

interface EdaLeadFormProps extends EdaFormController {
  idPrefix: string;
  captchaMount?: boolean;
  compact?: boolean;
}

export const EdaLeadForm = ({
  idPrefix,
  captchaMount = false,
  compact = false,
  state,
  setState,
  handleSubmit,
  isLoading,
}: EdaLeadFormProps) => {
  const { track } = useLanding();
  const [started, setStarted] = useState(false);
  const setField = <K extends keyof EdaLeadState>(field: K, value: EdaLeadState[K]) =>
    setState(current => ({ ...current, [field]: value }));

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (started) return;
        setStarted(true);
        track('lead_start', { place: idPrefix });
      }}
      className={compact ? 'space-y-3' : 'space-y-4'}
      aria-label="Заявка на работу курьером Яндекс Еды"
    >
      {captchaMount && <div id="captcha-container" />}

      {compact ? (
        <div>
          <p className="font-oswald text-xl font-bold text-gray-900">Заявка на подключение</p>
          <p className="text-sm text-gray-500">Проверим доступные форматы в вашем городе и объясним условия</p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-800/70">Направление</p>
            <p className="font-oswald text-lg font-bold leading-tight text-green-800">Курьер Яндекс Еды</p>
            <p className="text-xs text-green-800/70">{state.transport}</p>
          </div>
          <CheckCircle2 className="shrink-0 text-green-800" size={24} />
        </div>
      )}

      {/* В hero форма стоит в узкой колонке — поля идут в один столбец */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className="mb-1.5 block text-sm font-medium text-gray-700">Имя и фамилия</label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            required
            autoComplete="name"
            placeholder="Иван Иванов"
            className={inputClass}
            value={state.name}
            onChange={event => setField('name', event.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="mb-1.5 block text-sm font-medium text-gray-700">Телефон</label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            minLength={10}
            maxLength={26}
            pattern="(?=(?:\D*\d){10,15}\D*$)[\d+\(\)\s\-]+"
            title="Введите корректный телефон: от 10 до 15 цифр"
            aria-describedby={`${idPrefix}-phone-hint`}
            placeholder="+7 (999) 000-00-00"
            className={inputClass}
            value={state.phone}
            onChange={event => setField('phone', event.target.value)}
          />
          <p id={`${idPrefix}-phone-hint`} className="sr-only">Введите корректный телефон, содержащий от 10 до 15 цифр</p>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-city`} className="mb-1.5 block text-sm font-medium text-gray-700">Город</label>
        <input
          id={`${idPrefix}-city`}
          type="text"
          required
          autoComplete="address-level2"
          placeholder="Например, Казань"
          className={inputClass}
          value={state.city}
          onChange={event => setField('city', event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-transport`} className="mb-1.5 block text-sm font-medium text-gray-700">Как удобно передвигаться?</label>
        <select
          id={`${idPrefix}-transport`}
          className={inputClass}
          value={state.transport}
          onChange={event => setField('transport', event.target.value as EdaTransport)}
        >
          {TRANSPORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <ConsentCheckbox
        id={`${idPrefix}-consent`}
        checked={state.consent}
        onChange={value => setField('consent', value)}
        place={idPrefix}
      />

      <button
        type="submit"
        disabled={isLoading || !state.consent}
        className={`w-full rounded-xl bg-green-600 py-4 font-bold text-[var(--on-accent)] shadow-lg shadow-green-200 transition-all active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
          isLoading || !state.consent ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-green-700'
        }`}
      >
        {isLoading ? 'Отправляем...' : 'Отправить заявку'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Заявка не является трудовым договором. Формат сотрудничества и требования зависят от сервиса и города.
      </p>
    </form>
  );
};

export const EdaFinalForm = (controller: EdaFormController) => (
  <FormSection
    title="Хочу доставлять Яндекс Еду"
    lead="Оставьте контакты. Проверим, какие форматы передвижения доступны в вашем городе, и объясним порядок подключения."
    image={courierImage}
    bullets={[
      { icon: <Clock size={18} />, text: 'Свяжемся в рабочее время с 10:00 до 20:00' },
      { icon: <CheckCircle2 size={18} />, text: 'Расскажем про слоты, локации и работу в Яндекс Про' },
      { icon: <ShieldCheck size={18} />, text: 'Документы и форму сотрудничества уточним до подключения' },
    ]}
  >
    <EdaLeadForm idPrefix="final-eda" {...controller} />
  </FormSection>
);
