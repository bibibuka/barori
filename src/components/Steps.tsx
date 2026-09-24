import { FileText, Phone, ClipboardCheck, Wallet, ArrowUpRight } from 'lucide-react';

const steps = [
  { title: 'Оставить заявку', text: 'Заполните форму на сайте. Это займет не более 30 секунд!', icon: FileText },
  { title: 'Дождаться звонка', text: 'Наш менеджер свяжется с вами в течение 15 минут и ответит на все вопросы.', icon: Phone },
  { title: 'Оформление', text: 'Ведем пошагово: поможем собрать документы и подключим за 2 часа — бесплатно.', icon: ClipboardCheck },
  { title: 'Первая смена', text: 'Начинайте работу сразу после подключения — выплаты доступны уже за первый заказ.', icon: Wallet },
];

export const Steps = () => (
  <section id="steps" className="home-section home-steps">
    <div className="container">
      <div className="home-section-head home-section-head--centered"><p className="home-eyebrow"><span />От заявки до первого заказа</p><h2 className="home-heading">Как начать <em>работу с нами?</em></h2></div>
      <div className="home-steps-grid">{steps.map(({ title, text, icon: Icon }, i) => <article key={title}><div className="home-step-top"><span>0{i + 1}</span><Icon size={25} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p>{i < 3 && <ArrowUpRight className="home-step-arrow" size={20} aria-hidden="true" />}</article>)}</div>
    </div>
  </section>
);
