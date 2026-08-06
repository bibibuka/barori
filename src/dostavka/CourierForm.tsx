import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import {
  ConsentCheckbox,
  FormSection,
  inputClass,
  useLanding,
  useLeadSubmit,
} from '../landing/kit';
import kuraImage from '../assets/kura.webp';
import type { CampaignContext, CourierFormat, DeliveryDirection } from './campaign';
import { DELIVERY_DIRECTIONS, DELIVERY_FORMATS } from './directions';
import { buildCourierPayload, type CourierLeadState, validateCourierLead } from './lead';

export const FORMAT_OPTIONS: { value: CourierFormat; label: string }[] = [
  { value: 'Пока не выбрал', label: 'Подобрать формат' },
  ...DELIVERY_FORMATS.map(format => ({ value: format.value, label: format.label })),
];

export const DIRECTION_OPTIONS: { value: DeliveryDirection; label: string }[] = [
  { value: 'Подобрать направление', label: 'Подобрать направление' },
  ...DELIVERY_DIRECTIONS.map(direction => ({ value: direction.value, label: direction.title })),
];

export interface CourierFormController {
  state: CourierLeadState;
  setState: Dispatch<SetStateAction<CourierLeadState>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const useCourierLead = (campaign: CampaignContext): CourierFormController => {
  const { track } = useLanding();
  const [state, setState] = useState<CourierLeadState>({
    name: '',
    phone: '',
    city: campaign.city,
    format: campaign.format,
    direction: campaign.direction,
    consent: false,
  });

  const { submit, isLoading, showToast } = useLeadSubmit({
    position: 'Курьер / Доставка',
    leadType: 'Курьер / Доставка (рекламный лендинг)',
    onSuccess: () => setState(current => ({ ...current, name: '', phone: '', consent: false })),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateCourierLead(state);

    if (error) {
      track('lead_validation_error', { reason: error });
      showToast(error, 'error');
      return;
    }

    submit(buildCourierPayload(state, campaign.attribution), state.consent);
  };

  return { state, setState, handleSubmit, isLoading };
};

interface CourierLeadFormProps extends CourierFormController {
  idPrefix: string;
  captchaMount?: boolean;
  compact?: boolean;
}

export const CourierLeadForm = ({
  idPrefix,
  captchaMount = false,
  compact = false,
  state,
  setState,
  handleSubmit,
  isLoading,
}: CourierLeadFormProps) => {
  const { track } = useLanding();
  const [started, setStarted] = useState(false);
  const setField = <K extends keyof CourierLeadState>(field: K, value: CourierLeadState[K]) =>
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
      aria-label="Заявка на работу курьером"
    >
      {captchaMount && <div id="captcha-container" />}

      {compact ? (
        <div>
          <p className="font-bold font-oswald text-xl text-gray-900">Подберём подходящий вариант</p>
          <p className="text-sm text-gray-500">Свяжемся в рабочее время и проверим предложения по городу</p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-800/70 font-semibold">Вы выбрали</p>
            <p className="font-bold text-green-800 font-oswald text-lg leading-tight">{state.format}</p>
            <p className="text-xs text-green-800/70">{state.direction}</p>
          </div>
          <CheckCircle2 className="text-green-800 shrink-0" size={24} />
        </div>
      )}

      {/* В hero форма стоит в узкой колонке — там поля идут в один столбец, иначе они схлопываются */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className="block text-sm font-medium text-gray-700 mb-1.5">Имя и фамилия</label>
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
          <label htmlFor={`${idPrefix}-phone`} className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
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
        <label htmlFor={`${idPrefix}-city`} className="block text-sm font-medium text-gray-700 mb-1.5">Город</label>
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

      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={`${idPrefix}-format`} className="block text-sm font-medium text-gray-700 mb-1.5">Как хотите доставлять?</label>
          <select
            id={`${idPrefix}-format`}
            className={inputClass}
            value={state.format}
            onChange={event => setField('format', event.target.value as CourierFormat)}
          >
            {FORMAT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-direction`} className="block text-sm font-medium text-gray-700 mb-1.5">Направление</label>
          <select
            id={`${idPrefix}-direction`}
            className={inputClass}
            value={state.direction}
            onChange={event => setField('direction', event.target.value as DeliveryDirection)}
          >
            {DIRECTION_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
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
        className={`w-full bg-green-600 text-[var(--on-accent)] font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
          isLoading || !state.consent ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-green-700'
        }`}
      >
        {isLoading ? 'Отправляем...' : 'Подобрать вариант'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Условия оформления зависят от выбранного сервиса и города. Заявка не является трудовым договором.
      </p>
    </form>
  );
};

export const CourierFinalForm = (controller: CourierFormController) => (
  <FormSection
    title="Подберём доставку под вас"
    lead="Оставьте контакты. Проверим направления в вашем городе и объясним условия конкретного предложения."
    image={kuraImage}
    bullets={[
      { icon: <Clock size={18} />, text: 'Свяжемся в рабочее время с 10:00 до 20:00' },
      { icon: <CheckCircle2 size={18} />, text: 'Подберём формат под ваш транспорт и график' },
      { icon: <ShieldCheck size={18} />, text: 'Документы и статус оформления уточним до подключения' },
    ]}
  >
    <CourierLeadForm idPrefix="final-courier" {...controller} />
  </FormSection>
);
