import { ArrowUpRight, Bike, CalendarDays, CarFront, PackageCheck } from 'lucide-react';
import { WORK_DIRECTIONS, type WorkDirection } from '../content/workDirections';
import { trackGoal } from '../utils/analytics';
import { siteUrl } from '../utils/siteUrl';

export type Vacancy = WorkDirection;
export const vacanciesData = WORK_DIRECTIONS;
const cardIcons = { delivery: PackageCheck, smena: CalendarDays, taxi: CarFront, eda: Bike } as const;

export const Vacancies = () => (
  <section id="vacancies" className="home-section home-directions">
    <div className="container">
      <div className="home-section-head home-section-head--centered"><p className="home-eyebrow"><span />Найдите свой формат</p><h2 className="home-heading">Направления <em>работы</em></h2><p className="home-section-description">Сравните направления по доходу, графику и формату работы — и выберите свой вариант.</p></div>
      <div className="home-direction-grid">
        {vacanciesData.map((vacancy, index) => {
          const Icon = cardIcons[vacancy.id];
          return (
            <article key={vacancy.id} className={`home-direction-card direction-${vacancy.id}`}>
              <div className="home-direction-top"><span>{vacancy.category}</span><span>0{index + 1} / 04</span></div>
              <div className="home-direction-heading"><h3>{vacancy.title}</h3><div className="home-direction-icon"><Icon size={38} strokeWidth={1.4} /></div></div>
              <div className="home-direction-description">{vacancy.description.filter(Boolean).map(text => <p key={text}>{text}</p>)}</div>
              <p className="home-direction-salary">{vacancy.salary}</p>
              {vacancy.note && <p className="home-direction-note">{vacancy.note}</p>}
              <div className="home-direction-services"><p>{vacancy.id === 'delivery' ? 'Доступные сервисы' : 'Сервис'}</p><div>{vacancy.services.map(service => <span key={service}>{service}</span>)}</div></div>
              <p className="home-direction-formats">{vacancy.formats.join(' · ')}</p>
              <a href={siteUrl(vacancy.href)} onClick={() => trackGoal('vacancy_direction_click', { direction: vacancy.id })} className="home-direction-link">Подробнее о направлении<span><ArrowUpRight size={23} /></span></a>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
