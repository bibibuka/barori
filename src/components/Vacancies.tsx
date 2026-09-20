import { ArrowRight, Bike, CalendarDays, CarFront, PackageCheck } from 'lucide-react';
import { WORK_DIRECTIONS, type WorkDirection } from '../content/workDirections';
import { trackGoal } from '../utils/analytics';

export type Vacancy = WorkDirection;
export const vacanciesData = WORK_DIRECTIONS;

const cardStyles = {
  delivery: {
    panel: 'bg-emerald-950 text-white',
    icon: 'bg-emerald-400 text-emerald-950',
    link: 'bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-600',
  },
  smena: {
    panel: 'bg-amber-400 text-slate-950',
    icon: 'bg-white/75 text-amber-800',
    link: 'bg-amber-500 hover:bg-amber-600 focus-visible:ring-amber-500 text-slate-950',
  },
  taxi: {
    panel: 'bg-slate-950 text-white',
    icon: 'bg-yellow-400 text-slate-950',
    link: 'bg-slate-900 hover:bg-slate-800 focus-visible:ring-slate-900',
  },
  eda: {
    panel: 'bg-orange-500 text-white',
    icon: 'bg-white text-orange-600',
    link: 'bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-600',
  },
} as const;

const cardIcons = {
  delivery: PackageCheck,
  smena: CalendarDays,
  taxi: CarFront,
  eda: Bike,
} as const;

export const Vacancies = () => (
  <section id="vacancies" className="bg-slate-50 py-14 sm:py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-green-700">Направления работы</p>
        <h2 className="text-3xl font-bold uppercase text-slate-950 sm:text-4xl">Выберите, что вам подходит</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Четыре понятных направления вместо длинного списка похожих вакансий. Внутри рассказываем о форматах и помогаем выбрать сервис.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        {vacanciesData.map((vacancy, index) => {
          const Icon = cardIcons[vacancy.id];
          const styles = cardStyles[vacancy.id];

          return (
            <article key={vacancy.id} className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
              <div className={`relative flex min-h-40 items-start justify-between gap-4 overflow-hidden p-6 ${styles.panel}`}>
                <div className="relative z-10 min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] opacity-75">{vacancy.category}</p>
                  <h3 className="mt-2 max-w-sm font-oswald text-3xl font-bold uppercase leading-tight sm:text-4xl">{vacancy.title}</h3>
                </div>
                <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`} aria-hidden="true">
                  <Icon size={30} strokeWidth={2.2} />
                </div>
                <span className="absolute -bottom-8 right-3 font-oswald text-[9rem] font-bold leading-none opacity-[0.07]" aria-hidden="true">
                  {index + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold leading-relaxed text-slate-700">{vacancy.description[0]}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{vacancy.description[1]}</p>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {vacancy.id === 'delivery' ? 'Доступные сервисы' : 'Сервис'}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {vacancy.services.map(service => (
                      <span key={service} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">{vacancy.formats.join(' · ')}</p>

                <a
                  href={vacancy.href}
                  onClick={() => trackGoal('vacancy_direction_click', { direction: vacancy.id })}
                  className={`mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.link}`}
                >
                  Подробнее о направлении
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
