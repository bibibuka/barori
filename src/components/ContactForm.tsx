// FILE: src/components/ContactForm.tsx

import React, { useState, useEffect, useRef } from 'react';
import { LegalType } from './LegalModal';
import { trackGoal } from '../utils/analytics';
import { useToast } from './Toast';
import kuraImage from '../assets/kura.webp';
import { CONSENT_VERSION } from '../utils/consent';
import { useSmartCaptcha } from '../hooks/useSmartCaptcha';
import { requireLeadSuccess } from '../utils/leadResponse';
import { ChevronDown } from 'lucide-react';
import {
  DEFAULT_PREFERENCE,
  DIRECTION_PREFERENCES,
  EMPLOYEE_SERVICES,
  WORK_DIRECTIONS,
  getWorkSelection,
  type WorkDirectionId,
} from '../content/workDirections';

interface ContactFormProps {
  onOpenLegal: (type: LegalType) => void;
}

export const ContactForm = ({ onOpenLegal }: ContactFormProps) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Общая заявка',
    status: 'applicant' as 'employee' | 'applicant', // 'employee' = уже работаю, 'applicant' = хочу устроиться
    department: '',
    problem: '',
    direction: 'delivery' as WorkDirectionId,
    preference: DEFAULT_PREFERENCE.delivery,
    city: '',
    message: '',
    soglasie: false,
  });

  // REF хранит актуальные данные (решение проблемы пустых полей внутри замыканий)
  const formDataRef = useRef(formData);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Фиксируем момент, когда пользователь выразил согласие (нажал «Отправить» с отмеченной галочкой).
  // Отправляется на бэкенд вместе с заявкой как доказательство факта и времени согласия (ст. 9 ФЗ-152).
  const consentTimestampRef = useRef<string>('');

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    const textarea = messageRef.current;
    if (!textarea) return;
    textarea.style.height = '0px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [formData.message]);

  const [status, setStatus] = useState<'idle' | 'validating' | 'sending' | 'success' | 'error'>('idle');
  const captcha = useSmartCaptcha(token => { void sendDataToBackend(token); }, () => {
    setStatus('idle');
    showToast('Проверка защиты не завершена. Попробуйте ещё раз или позвоните нам.', 'error');
  });

  const sendDataToBackend = async (token: string) => {
    setStatus('sending');
    try {
      // Берем данные из Ref, чтобы избежать отправки пустых полей
      const currentData = formDataRef.current;
      
      const data = new FormData();
      data.append('name', currentData.name);
      data.append('phone', currentData.phone);
      data.append('type', currentData.type);
      data.append('status', currentData.status === 'employee' ? 'Я уже работаю' : 'Хочу устроиться');
      if (currentData.status === 'employee') {
        data.append('department', currentData.department);
        data.append('problem', currentData.problem);
      } else {
        const selection = getWorkSelection(currentData.direction, currentData.preference);
        data.append('position', selection.position);
        data.append('department', selection.department);
        data.append('city', currentData.city);
        data.append('message', [
          `Направление: ${selection.position}`,
          `Предпочтение: ${selection.preference}`,
          currentData.message.trim(),
        ].filter(Boolean).join('\n'));
      }
      // Отправляем РЕАЛЬНОЕ значение чекбокса, а не хардкод (ст. 9 ФЗ-152: согласие должно быть
      // конкретным и осознанным). Плюс фиксируем редакцию и время согласия для доказуемости.
      data.append('soglasie', currentData.soglasie ? 'Y' : 'N');
      data.append('consent_version', CONSENT_VERSION);
      data.append('consent_timestamp', consentTimestampRef.current);
      data.append('smart-token', token);

      const response = await fetch('/local/tools/form-handler.php', {
        method: 'POST',
        body: data,
        signal: AbortSignal.timeout(30000),
      });

      await requireLeadSuccess(response);
      setStatus('success');
      trackGoal('lead_success', { type: currentData.type });
      setFormData(prev => ({ ...prev, name: '', phone: '', department: '', problem: '', city: '', message: '' }));
      showToast('Спасибо за заявку! Наш оператор свяжется с вами в ближайшее время!', 'success');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setStatus('error');
      showToast('Что-то пошло не так, попробуйте позже.', 'error');
    } finally {
      captcha.reset();
      setStatus('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.soglasie) {
      trackGoal('lead_validation_error', { reason: 'consent' });
      showToast('Необходимо согласие на обработку персональных данных', 'error');
      return;
    }
    if (!formData.name.trim() || !formData.phone.trim()) {
      trackGoal('lead_validation_error', { reason: 'empty_fields' });
      showToast('Пожалуйста, заполните имя и телефон', 'error');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10 || formData.phone.replace(/\D/g, '').length > 15) {
      showToast('Укажите корректный телефон: от 10 до 15 цифр', 'error');
      return;
    }

    if (formData.status === 'employee') {
      if (!formData.department || !formData.problem) {
        trackGoal('lead_validation_error', { reason: 'employee_fields' });
        showToast('Пожалуйста, выберите сервис и опишите проблему', 'error');
        return;
      }
    } else {
      if (!formData.city) {
        trackGoal('lead_validation_error', { reason: 'applicant_fields' });
        showToast('Пожалуйста, укажите город', 'error');
        return;
      }
    }

    // Фиксируем точное время выражения согласия (клиентское ISO-время).
    consentTimestampRef.current = new Date().toISOString();

    trackGoal('lead_submit', { type: formData.type, status: formData.status });
    setStatus('validating');
    
    captcha.execute();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormData(prev => {
      if (target.name === 'direction') {
        const direction = value as WorkDirectionId;
        trackGoal('lead_direction_select', { direction });
        return { ...prev, direction, preference: DEFAULT_PREFERENCE[direction] };
      }
      if (target.name === 'preference') {
        trackGoal('lead_preference_select', { direction: prev.direction, preference: String(value) });
      }
      const next = { ...prev, [target.name]: value };
      return next;
    });
  };

  const isLoading = status === 'sending' || status === 'validating';
  const preferenceLegend: Record<WorkDirectionId, string> = {
    delivery: 'Какой сервис вам подходит?',
    smena: 'Какие смены вам подходят?',
    taxi: 'На каком автомобиле планируете работать?',
    eda: 'Как будете доставлять?',
  };
  const selectClass = 'w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 pr-11 text-sm font-semibold text-gray-800 outline-none transition-colors hover:border-green-300 focus:border-green-600 focus:ring-4 focus:ring-green-100';

  return (
    <section id="order" className="py-6 lg:py-10 scroll-mt-28 bg-gradient-to-br from-green-50 via-green-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Левая часть с картинкой */}
          <div className="h-32 sm:h-36 lg:h-auto lg:w-1/2 relative bg-green-600 flex flex-col justify-center p-3 lg:p-6 overflow-hidden">
            <img
              src={kuraImage}
              alt="Курьер"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-700/80 to-transparent z-0"></div>
            <div className="relative z-10 text-white text-center lg:text-left">
              <h3 className="text-2xl lg:text-5xl font-bold font-oswald uppercase mb-1 lg:mb-3 leading-tight drop-shadow-md">
                Готов начать?
              </h3>
              <p className="text-sm lg:text-xl text-green-50 opacity-90 font-light max-w-md mx-auto lg:mx-0">
                Заполни форму и стань частью команды!
              </p>
            </div>
          </div>

          {/* Правая часть с формой */}
          <div className="lg:w-1/2 p-3 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold font-oswald uppercase mb-1 text-gray-800 text-center lg:text-left">
              Оставить заявку
            </h2>

            <details className="group mb-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                <span className="flex-shrink-0 inline-flex items-center rounded-full bg-red-600 text-white font-bold leading-none text-xs px-2 py-1">16+</span>
                <span className="flex-1">Возраст и документы</span>
                <ChevronDown aria-hidden="true" size={18} className="flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-3 pb-3 text-xs sm:text-sm font-semibold leading-snug">
                Большинство направлений — с 18 лет. В доставке есть варианты с 16 лет: до 18 нужно согласие законного представителя.
              </p>
            </details>

            <form onSubmit={handleSubmit} className="lead-form space-y-3" id="add-job">
              <div id="captcha-container"></div>
              <input type="hidden" name="type" value={formData.type} />
              
              <div
                data-testid="contact-primary-fields"
                className={`grid gap-3 ${formData.status === 'applicant' ? 'sm:grid-cols-2' : ''}`}
              >
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Ваше полное имя</label>
                  <input
                    type="text"
                    id="contact-name" name="name" autoComplete="name"
                    required
                    placeholder="Иван Иванов"
                    className="ym-disable-keys w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {formData.status === 'applicant' && (
                  <div>
                    <label htmlFor="contact-city" className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                    <input
                      type="text"
                      id="contact-city" name="city"
                      required
                      placeholder="Например, Москва"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                )}

              </div>

              <div
                data-testid="contact-phone-status"
                className="grid gap-3 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Ваш телефон</label>
                  <input
                    type="tel"
                    id="contact-phone" name="phone" autoComplete="tel" inputMode="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    className="ym-disable-keys w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Выбор статуса */}
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-1">Кто вы?</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { value: 'employee', label: 'Я уже работаю' },
                      { value: 'applicant', label: 'Хочу устроиться' },
                    ] as const).map(option => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center text-center gap-2 px-3 py-3 rounded-lg border cursor-pointer transition-all text-sm font-medium ${
                          formData.status === option.value
                            ? 'border-green-600 bg-green-50 text-green-700 ring-2 ring-green-600'
                            : 'border-gray-300 text-gray-600 hover:border-green-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={formData.status === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Динамические поля для сотрудников */}
              {formData.status === 'employee' && (
                <>
                  <div>
                    <label htmlFor="contact-department" className="block text-sm font-medium text-gray-700 mb-1">Сервис</label>
                    <select
                      id="contact-department" name="department"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all bg-white"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="">Выберите сервис</option>
                      {EMPLOYEE_SERVICES.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-problem" className="block text-sm font-medium text-gray-700 mb-1">Опишите проблему</label>
                    <textarea
                      id="contact-problem" name="problem"
                      required
                      rows={4}
                      placeholder="Расскажите, с чем нужна помощь"
                      className="ym-disable-keys w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all resize-none"
                      value={formData.problem}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Динамические поля для соискателей */}
              {formData.status === 'applicant' && (
                <>
                  <div data-testid="contact-direction-preference" className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-direction" className="block text-sm font-medium text-gray-700 mb-1">Направление</label>
                      <div className="relative">
                        <select
                          id="contact-direction"
                          name="direction"
                          value={formData.direction}
                          onChange={handleChange}
                          className={selectClass}
                        >
                          {WORK_DIRECTIONS.map(direction => (
                            <option key={direction.id} value={direction.id}>{direction.title}</option>
                          ))}
                        </select>
                        <ChevronDown aria-hidden="true" size={20} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-700" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-preference" className="block text-sm font-medium text-gray-700 mb-1">{preferenceLegend[formData.direction]}</label>
                      <div className="relative">
                        <select
                          id="contact-preference"
                          name="preference"
                          value={formData.preference}
                          onChange={handleChange}
                          className={selectClass}
                        >
                          {DIRECTION_PREFERENCES[formData.direction].map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <ChevronDown aria-hidden="true" size={20} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-700" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                    <textarea
                      ref={messageRef}
                      id="contact-message" name="message"
                      rows={1}
                      placeholder="Пара слов о себе (необязательно)"
                      className="ym-disable-keys w-full overflow-hidden px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-[border-color,box-shadow] resize-none"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="soglasie"
                  checked={formData.soglasie}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-700 accent-green-600"
                />
                <label htmlFor="consent" className="text-xs sm:text-sm text-gray-500">
                  Я даю{' '}
                  <button
                    type="button"
                    onClick={() => {
                      trackGoal('legal_open', { type: 'consent', place: 'contact_form' });
                      onOpenLegal('consent');
                    }}
                    className="text-green-600 underline hover:text-green-800"
                  >
                    согласие на обработку персональных данных
                  </button>
                  {' '}и подтверждаю, что ознакомлен(а) с{' '}
                  <button
                    type="button"
                    onClick={() => {
                      trackGoal('legal_open', { type: 'policy', place: 'contact_form' });
                      onOpenLegal('policy');
                    }}
                    className="text-green-600 underline hover:text-green-800"
                  >
                    Политикой обработки ПД
                  </button>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.soglasie}
                className={`w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 uppercase tracking-wide transform active:scale-[0.99] ${
                  isLoading || !formData.soglasie
                    ? 'opacity-70 cursor-not-allowed'
                    : 'cursor-pointer animate-btn-pulse' // <-- cursor-pointer добавлен СЮДА
                }`}
              >
                {isLoading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
