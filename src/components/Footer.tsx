import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contacts */}
          <div>
            <h2 className="text-3xl font-bold uppercase mb-10">Контакты</h2>
            <div className="space-y-6 text-lg">
              <div className="flex items-start gap-4">
                <Phone className="text-blue-500 mt-1" />
                <div>
                  <div className="font-bold text-xl mb-1">+7 (921) 900 09 97</div>
                  <div className="text-gray-400 text-sm">Подключение водителей / курьеров</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-blue-500 mt-1" />
                <div>
                  <div className="font-bold mb-1">inbox@vacancies.ru</div>
                  <div className="text-gray-400 text-sm">По вопросам сотрудничества</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-blue-500 mt-1" />
                <div>
                  <div className="font-bold mb-1">10:00 – 20:00</div>
                  <div className="text-gray-400 text-sm">Без выходных</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-blue-500 mt-1" />
                <div>
                  <div className="font-bold mb-1">Санкт-Петербург, ул. Планерная 15Б</div>
                  <div className="text-gray-400 text-sm">Офис обслуживания</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-80 w-full rounded-2xl overflow-hidden bg-gray-800">
             {/* Yandex Map Placeholder / Iframe */}
             <iframe 
               src="https://yandex.ru/map-widget/v1/?ll=30.228511%2C59.993414&z=17" 
               width="100%" 
               height="100%" 
               frameBorder="0"
               allowFullScreen
               title="Office Location"
             ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p>&copy; 2024 Биржа Вакансий. Все права защищены.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
            <a href="#" className="hover:text-white transition-colors">Политика обработки данных</a>
            <a href="#" className="hover:text-white transition-colors">Согласие на рассылку</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
