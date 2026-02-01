// FILE: src/components/ContactForm.tsx

import React, { useState, useEffect } from 'react';
import { vacanciesData } from './Vacancies'; // Импортируем данные (SSOT)

interface ContactFormProps {
  selectedVacancy?: string | null; // Пропс для автовыбора
}

export const ContactForm = ({ selectedVacancy }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vacancy: vacanciesData[0]?.title || '', // По умолчанию первая вакансия из списка
    consent: false
  });

  // Эффект: если передали вакансию (например, из модалки), выбираем её
  useEffect(() => {
    if (selectedVacancy) {
      setFormData(prev => ({ ...prev, vacancy: selectedVacancy }));
    }
  }, [selectedVacancy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`Заявка отправлена на вакансию: ${formData.vacancy}\n(Демонстрация)`);
    // Здесь будет логика отправки на сервер
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    // ДОБАВЛЕНО: scroll-mt-28 (создает отступ сверху при скролле к этому id)
    <section id="order" className="py-20 bg-slate-50 scroll-mt-28">
      <div className="container mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Image Side - Картинка слева */}
          <div className="lg:w-1/2 relative bg-blue-600 min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80&w=800"
              alt="Курьер"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="relative z-10 p-12 text-white h-full flex flex-col justify-center">
              <h3 className="text-4xl font-bold uppercase mb-6">Готов начать?</h3>
              <p className="text-xl opacity-90">
                Заполни форму и стань частью нашей команды уже сегодня!
              </p>
            </div>
          </div>

          {/* Form Side - Форма */}
          <div className="lg:w-1/2 p-8 lg:p-16">
            <h2 className="text-3xl font-bold uppercase mb-8 text-gray-800">Оставить заявку</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+7 (999) 000-00-00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Вакансия</label>
                <select
                  name="vacancy"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  value={formData.vacancy}
                  onChange={handleChange}
                >
                  {/* ДИНАМИЧЕСКИЙ СПИСОК ВАКАНСИЙ */}
                  {vacanciesData.map((vac) => (
                    <option key={vac.id} value={vac.title}>
                      {vac.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Captcha Placeholder */}
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-center text-sm text-gray-500">
                [Yandex SmartCaptcha Container]
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  id="consent"
                  name="consent"
                  checked={formData.consent} 
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-sm text-gray-500">
                  Я согласен на обработку персональных данных и принимаю условия <a href="#" className="text-blue-600 underline">публичной оферты</a>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 uppercase tracking-wide transform active:scale-[0.99]"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};