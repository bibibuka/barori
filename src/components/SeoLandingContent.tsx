import { CheckCircle, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const directions = [
  {
    title: 'Яндекс Смена в разных регионах',
    text: 'Подключаем к сменам с ежедневными выплатами, помогаем выбрать удобные задания рядом с домом и сопровождаем на старте.',
  },
  {
    title: 'Подработка в Яндекс Такси на выходных',
    text: 'Помогаем водителям подключиться к Яндекс Про, выбрать удобный формат занятости и разобраться с документами, выплатами и рабочими вопросами.',
  },
  {
    title: 'Курьерский парк и доставка',
    text: 'Подключаем курьеров и водителей доставки к подходящим направлениям: экспресс, плановая и грузовая доставка.',
  },
  {
    title: 'Подключение для граждан СНГ',
    text: 'Подсказываем, какие документы могут понадобиться для такси или доставки, и заранее проверяем условия подключения.',
  },
];

const faqItems = [
  {
    question: 'Как подключиться к Яндекс Смена через Барори Парк?',
    answer: 'Оставьте заявку на сайте или напишите в мессенджер. Менеджер уточнит город, документы и удобный формат занятости, после чего поможет пройти оформление.',
  },
  {
    question: 'Какие выплаты доступны на сменах?',
    answer: 'По направлению Яндекс Смена выплаты могут поступать ежедневно. Итоговая сумма зависит от выбранных заданий, длительности смены и условий конкретного партнера.',
  },
  {
    question: 'Можно ли брать смены рядом с домом?',
    answer: 'Да, одно из преимуществ направления - возможность выбирать задания и смены в удобных районах, если они доступны в вашем городе.',
  },
  {
    question: 'Можно ли подрабатывать в Яндекс Такси только на выходных?',
    answer: 'Да, многие водители выбирают такси как подработку на выходных или в свободные дни. Менеджер подскажет, какие условия подключения доступны в вашем регионе.',
  },
  {
    question: 'Можно ли подключиться к такси или доставке гражданам СНГ?',
    answer: 'Возможность подключения зависит от документов, прав, статуса пребывания и требований конкретного сервиса. Барори Парк помогает разобраться с условиями до старта.',
  },
  {
    question: 'Барори Парк подключает только к Яндекс Смена?',
    answer: 'Нет. Мы также работаем как таксопарк и курьерский парк: подключаем к Яндекс Такси, Яндекс Доставке, Купер и другим направлениям.',
  },
  {
    question: 'Нужен ли опыт для старта?',
    answer: 'Для многих смен и курьерских направлений опыт не требуется. По водительским направлениям могут быть требования к возрасту, стажу и документам.',
  },
];

export const SeoLandingContent = () => {
  const headerAnim = useScrollAnimation(0.15);
  const cardsAnim = useScrollAnimation(0.1);
  const whyAnim = useScrollAnimation(0.15);
  const faqAnim = useScrollAnimation(0.1);

  return (
    <section id="seo-directions" className="py-12 bg-white">
      <div className="container mx-auto">
        <div
          ref={headerAnim.ref}
          className={`max-w-4xl mx-auto text-center mb-10 transition-all duration-700 ease-out ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-green-700 font-bold uppercase text-sm mb-2">Работа и подработка в регионах</p>
          <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-4">
            Подработка на выходных, Яндекс Смена, таксопарк и доставка
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
            Барори Парк помогает исполнителям в разных регионах подключиться к Яндекс Смена,
            Яндекс Такси, доставке и курьерским сервисам. Мы объясняем условия, помогаем с оформлением,
            документами, выплатами и остаемся на связи после первой смены.
          </p>
        </div>

        <div ref={cardsAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {directions.map((direction, index) => (
            <article
              key={direction.title}
              className={`bg-green-50 border border-green-100 rounded-2xl p-5 h-full transition-all duration-700 ease-out ${cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CheckCircle className="text-green-600 mb-3" size={28} />
              <h3 className="text-xl font-bold font-oswald mb-2 text-gray-900">{direction.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{direction.text}</p>
            </article>
          ))}
        </div>

        <div className="space-y-8">
          <div
            ref={whyAnim.ref}
            className={`bg-slate-900 text-white rounded-2xl p-6 max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${whyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-2xl font-bold font-oswald uppercase mb-4">Почему это удобно</h3>
            <ul className="space-y-3 text-sm text-gray-200 max-w-2xl mx-auto">
              <li>Ежедневные выплаты по подходящим направлениям.</li>
              <li>Гибкий график: можно совмещать с учебой, основной работой или семейными делами.</li>
              <li>Поддержка 24/7 в Telegram, ВКонтакте и Max.</li>
              <li>Помощь с оформлением, документами и первыми рабочими вопросами.</li>
            </ul>
          </div>

          <div className="max-w-4xl mx-auto" ref={faqAnim.ref}>
            <div className={`flex items-center justify-center gap-2 mb-4 text-center transition-all duration-700 ease-out ${faqAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <HelpCircle className="text-green-600" size={26} />
              <h3 className="text-2xl font-bold font-oswald uppercase text-gray-900">Вопросы и ответы</h3>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  className={`group bg-white border border-gray-200 rounded-2xl p-4 open:border-green-300 open:bg-green-50/40 transition-all duration-700 ease-out ${faqAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <summary className="cursor-pointer list-none font-bold text-gray-900 flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span className="text-green-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
