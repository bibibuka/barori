// FILE: src/components/ContactForm.tsx

import React, { useState, useEffect, useRef } from 'react';
import { LegalType } from './LegalModal';
import { trackGoal } from '../utils/analytics';
import { useToast } from './Toast';
import kuraImage from '../assets/kura.webp';

// Версия текста Согласия на обработку ПД. Фиксируется вместе с каждой заявкой,
// чтобы можно было доказать, какую редакцию согласия принял пользователь (ст. 9 ФЗ-152).
// При изменении формулировок Согласия/Политики обновите дату здесь и в LegalModal.tsx.
const CONSENT_VERSION = '2026-06-24';

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
    position: '',
    city: '',
    message: '',
    selfEmployment: '' as '' | 'has' | 'ready', // статус самозанятости для позиции "Курьер / Доставка"
    soglasie: false,
  });

  // REF хранит актуальные данные (решение проблемы пустых полей внутри замыканий)
  const formDataRef = useRef(formData);

  // Фиксируем момент, когда пользователь выразил согласие (нажал «Отправить» с отмеченной галочкой).
  // Отправляется на бэкенд вместе с заявкой как доказательство факта и времени согласия (ст. 9 ФЗ-152).
  const consentTimestampRef = useRef<string>('');

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [status, setStatus] = useState<'idle' | 'validating' | 'sending' | 'success' | 'error'>('idle');
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const initCaptcha = () => {
      if (window.smartCaptcha && widgetIdRef.current === null) {
        widgetIdRef.current = window.smartCaptcha.render('captcha-container', {
          sitekey: 'ysc1_ew6LWS0a0XeqfLY7YxmAH4rhPfAEpXi2mnVcvpPg58abfc86',
          invisible: true,
          callback: onCaptchaSuccess,
        });
      }
    };

    if (window.smartCaptcha) {
      initCaptcha();
    } else {
      const checkInterval = setInterval(() => {
        if (window.smartCaptcha) {
          initCaptcha();
          clearInterval(checkInterval);
        }
      }, 500);
      return () => clearInterval(checkInterval);
    }
  }, []);

  const onCaptchaSuccess = (token: string) => {
    sendDataToBackend(token);
  };

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
        data.append('position', currentData.position);
        data.append('city', currentData.city);
        data.append('message', currentData.message);
        if (currentData.position === 'Курьер / Доставка') {
          data.append('self_employment', currentData.selfEmployment === 'has' ? 'Уже оформлена' : 'Готов оформить');
        }
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
      });

      if (response.ok) {
        setStatus('success');
        trackGoal('lead_success', { type: currentData.type });
        setFormData(prev => ({ ...prev, name: '', phone: '', department: '', problem: '', position: '', city: '', message: '', selfEmployment: '' }));
        showToast('Спасибо за заявку! Наш оператор свяжется с вами в ближайшее время!', 'success');
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setStatus('error');
      showToast('Что-то пошло не так, попробуйте позже.', 'error');
    } finally {
      if (window.smartCaptcha && widgetIdRef.current !== null) {
        window.smartCaptcha.reset(widgetIdRef.current);
      }
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
    if (!formData.name || !formData.phone) {
      trackGoal('lead_validation_error', { reason: 'empty_fields' });
      showToast('Пожалуйста, заполните имя и телефон', 'error');
      return;
    }

    if (formData.status === 'employee') {
      if (!formData.department || !formData.problem) {
        trackGoal('lead_validation_error', { reason: 'employee_fields' });
        showToast('Пожалуйста, выберите сервис и опишите проблему', 'error');
        return;
      }
    } else {
      if (!formData.position || !formData.city) {
        trackGoal('lead_validation_error', { reason: 'applicant_fields' });
        showToast('Пожалуйста, укажите желаемую должность и город', 'error');
        return;
      }
      if (formData.position === 'Курьер / Доставка' && !formData.selfEmployment) {
        trackGoal('lead_validation_error', { reason: 'courier_self_employment' });
        showToast('Укажите статус самозанятости — без неё устроиться курьером нельзя', 'error');
        return;
      }
    }

    // Фиксируем точное время выражения согласия (клиентское ISO-время).
    consentTimestampRef.current = new Date().toISOString();

    trackGoal('lead_submit', { type: formData.type, status: formData.status });
    setStatus('validating');
    
    if (window.smartCaptcha && widgetIdRef.current !== null) {
      window.smartCaptcha.execute(widgetIdRef.current);
    } else {
      console.error('Капча не загружена');
      showToast('Ошибка защиты от спама. Пожалуйста, перезагрузите страницу.', 'error');
      setStatus('idle');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormData(prev => {
      const next = { ...prev, [target.name]: value };
      if (target.name === 'position' && value !== 'Курьер / Доставка') {
        next.selfEmployment = '';
      }
      return next;
    });
  };

  const isLoading = status === 'sending' || status === 'validating';

  return (
    <section id="order" className="py-6 lg:py-10 scroll-mt-28 bg-gradient-to-br from-green-50 via-green-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Левая часть с картинкой */}
          <div className="h-40 lg:h-auto lg:w-1/2 relative bg-green-600 flex flex-col justify-center p-3 lg:p-6 overflow-hidden">
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

            <div className="flex items-center gap-2 mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700">
              <span className="flex-shrink-0 inline-flex items-center rounded-full bg-red-600 text-white font-bold leading-none text-xs px-2 py-1">18+</span>
              <p className="text-xs sm:text-sm font-semibold leading-snug">
                Заявки принимаем только от совершеннолетних. Лицам младше 18 лет в трудоустройстве отказываем.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3" id="add-job">
              <div id="captcha-container"></div>
              <input type="hidden" name="type" value={formData.type} />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваше полное имя</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Иван Иванов"
                  className="ym-disable-keys w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваш телефон</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+7 (999) 000-00-00"
                  className="ym-disable-keys w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Выбор статуса */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Кто вы?</label>
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
              </div>

              {/* Динамические поля для сотрудников */}
              {formData.status === 'employee' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сервис</label>
                    <select
                      name="department"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all bg-white"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="">Выберите сервис</option>
                      <option value="Доставка">Доставка</option>
                      <option value="Смены">Смены</option>
                      <option value="Купер">Купер</option>
                      <option value="Пятерочка">Пятерочка</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Опишите проблему</label>
                    <textarea
                      name="problem"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Желаемая должность</label>
                    <select
                      name="position"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all bg-white"
                      value={formData.position}
                      onChange={handleChange}
                    >
                      <option value="">Выберите должность</option>
                      <option value="Кухня">Кухня</option>
                      <option value="Касса">Касса</option>
                      <option value="Сборка заказов">Сборка заказов</option>
                      <option value="Выкладка товаров">Выкладка товаров</option>
                      <option value="Разгрузка товаров">Разгрузка товаров</option>
                      <option value="Курьер / Доставка">Курьер / Доставка</option>
                      <option value="Кулинария">Кулинария</option>
                      <option value="Клининг">Клининг</option>
                    </select>
                  </div>

                  {formData.position === 'Курьер / Доставка' && (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 space-y-2">
                      <p className="text-xs sm:text-sm text-amber-900 leading-snug">
                        Для работы курьером <strong>обязательна самозанятость</strong>. Без неё, к сожалению, устроиться не получится.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {([
                          { value: 'has', label: 'Самозанятость уже оформлена' },
                          { value: 'ready', label: 'Готов(а) оформить самозанятость' },
                        ] as const).map(option => (
                          <label
                            key={option.value}
                            className={`flex items-center justify-center text-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-xs sm:text-sm font-medium ${
                              formData.selfEmployment === option.value
                                ? 'border-amber-500 bg-amber-100 text-amber-900 ring-2 ring-amber-500'
                                : 'border-amber-300 bg-white text-amber-700 hover:border-amber-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="selfEmployment"
                              value={option.value}
                              checked={formData.selfEmployment === option.value}
                              onChange={handleChange}
                              required
                              className="sr-only"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Например, Москва"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Пара слов о себе (необязательно)"
                      className="ym-disable-keys w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-all resize-none"
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
