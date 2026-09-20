// FILE: src/components/Tariffs.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Car, 
  Package, 
  Navigation, 
  Utensils, 
  ShoppingCart, 
  Clock, 
  TrendingDown, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Percent, 
  Zap,
  Briefcase,
  Building2,
  HelpCircle
} from 'lucide-react';
import { trackGoal } from '../utils/analytics';

export type EmploymentType = 'smz' | 'park';

export interface TariffItem {
  id: string;
  name: string;
  category: string;
  minRate: number;
  maxRate: number;
  isFixed: boolean;
  fixedRate?: number;
  ratesByShifts: {
    start: number;
    medium: number;
    loyal: number;
  };
  icon: React.ElementType;
  color: {
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconColor: string;
    borderAccent: string;
  };
  serviceDescription: string;
  features: string[];
}

// Тарифы для Самозанятых и ИП (6 направлений)
const SMZ_TARIFFS: TariffItem[] = [
  {
    id: 'taxi',
    name: 'Такси',
    category: 'Яндекс Про / Такси',
    minRate: 3,
    maxRate: 3,
    isFixed: true,
    fixedRate: 3,
    ratesByShifts: {
      start: 3,
      medium: 3,
      loyal: 3,
    },
    icon: Car,
    color: {
      badgeBg: 'bg-amber-100 text-amber-900',
      badgeText: 'text-amber-800',
      iconBg: 'bg-amber-500/10 text-amber-600',
      iconColor: 'text-amber-600',
      borderAccent: 'hover:border-amber-400',
    },
    serviceDescription: 'Работа на своём или арендованном авто. Моментальный вывод средств без выходных.',
    features: ['Фиксированные 3%', 'Моментальные выплаты 24/7', 'Заправка с баланса Таксометра'],
  },
  {
    id: 'dostavka',
    name: 'Доставка',
    category: 'Яндекс Доставка',
    minRate: 3,
    maxRate: 5,
    isFixed: false,
    ratesByShifts: {
      start: 5,
      medium: 4,
      loyal: 3,
    },
    icon: Package,
    color: {
      badgeBg: 'bg-orange-100 text-orange-900',
      badgeText: 'text-orange-800',
      iconBg: 'bg-orange-500/10 text-orange-600',
      iconColor: 'text-orange-600',
      borderAccent: 'hover:border-orange-400',
    },
    serviceDescription: 'Курьеры пешие, на авто, мото и грузовых тарифах. Свободный график и высокий спрос.',
    features: ['Снижение 5% → 3%', 'С 16 лет (с согласия)', 'Любой способ передвижения'],
  },
  {
    id: 'topgo',
    name: 'ТопГоу',
    category: 'Логистический сервис TopGo',
    minRate: 7,
    maxRate: 7,
    isFixed: true,
    fixedRate: 7,
    ratesByShifts: {
      start: 7,
      medium: 7,
      loyal: 7,
    },
    icon: Navigation,
    color: {
      badgeBg: 'bg-blue-100 text-blue-900',
      badgeText: 'text-blue-800',
      iconBg: 'bg-blue-500/10 text-blue-600',
      iconColor: 'text-blue-600',
      borderAccent: 'hover:border-blue-400',
    },
    serviceDescription: 'Стабильная фиксированная комиссия с первого дня. Без скрытых условий и переплат.',
    features: ['Единый фикс 7%', 'Без скрытых списаний', 'Прозрачные условия с 1-й смены'],
  },
  {
    id: 'eda',
    name: 'Яндекс Еда',
    category: 'Рестораны и доставка',
    minRate: 5,
    maxRate: 10,
    isFixed: false,
    ratesByShifts: {
      start: 10,
      medium: 7.5,
      loyal: 5,
    },
    icon: Utensils,
    color: {
      badgeBg: 'bg-yellow-100 text-yellow-900',
      badgeText: 'text-yellow-800',
      iconBg: 'bg-yellow-500/10 text-yellow-600',
      iconColor: 'text-yellow-600',
      borderAccent: 'hover:border-yellow-400',
    },
    serviceDescription: 'Доставка готовых блюд из ресторанов. Выплаты каждый день, гибкие слоты от 2 часов.',
    features: ['Снижение 10% → 5%', 'Ежедневные выплаты', 'Слоты рядом с домом'],
  },
  {
    id: 'kuper',
    name: 'Купер',
    category: 'Экс-СберМаркет',
    minRate: 5,
    maxRate: 5,
    isFixed: true,
    fixedRate: 5,
    ratesByShifts: {
      start: 5,
      medium: 5,
      loyal: 5,
    },
    icon: ShoppingCart,
    color: {
      badgeBg: 'bg-emerald-100 text-emerald-900',
      badgeText: 'text-emerald-800',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      iconColor: 'text-emerald-600',
      borderAccent: 'hover:border-emerald-400',
    },
    serviceDescription: 'Доставка заказов из супермаркетов и магазинов. Фиксированная низкая ставка 5%.',
    features: ['Фиксированные 5%', 'Крупные чеки и чаевые', 'Удобные маршруты'],
  },
  {
    id: 'smena',
    name: 'Яндекс Смена',
    category: 'Подработка по сменам',
    minRate: 4,
    maxRate: 10,
    isFixed: false,
    ratesByShifts: {
      start: 10,
      medium: 6.5,
      loyal: 4,
    },
    icon: Clock,
    color: {
      badgeBg: 'bg-purple-100 text-purple-900',
      badgeText: 'text-purple-800',
      iconBg: 'bg-purple-500/10 text-purple-600',
      iconColor: 'text-purple-600',
      borderAccent: 'hover:border-purple-400',
    },
    serviceDescription: 'Смены в магазинах и на складах от 4 до 12 часов. Оплата сразу после подтверждения смены.',
    features: ['Снижение 10% → 4%', 'Оплата сразу за смену', 'Без опыта и собеседований'],
  },
];

// Тарифы для Парковых сотрудников (ТопГоу и Смены)
const PARK_TARIFFS: TariffItem[] = [
  {
    id: 'topgo',
    name: 'ТопГоу',
    category: 'Логистический сервис TopGo',
    minRate: 7,
    maxRate: 7,
    isFixed: true,
    fixedRate: 7,
    ratesByShifts: {
      start: 7,
      medium: 7,
      loyal: 7,
    },
    icon: Navigation,
    color: {
      badgeBg: 'bg-blue-100 text-blue-900',
      badgeText: 'text-blue-800',
      iconBg: 'bg-blue-500/10 text-blue-600',
      iconColor: 'text-blue-600',
      borderAccent: 'hover:border-blue-400',
    },
    serviceDescription: 'Работа через парк без оформления СМЗ. Фиксированная прозрачная комиссия.',
    features: ['Единый фикс 7%', 'Вывод средств через парк 24/7', 'Быстрый старт в день обращения'],
  },
  {
    id: 'smena',
    name: 'Яндекс Смена',
    category: 'Подработка по сменам',
    minRate: 4,
    maxRate: 10,
    isFixed: false,
    ratesByShifts: {
      start: 10,
      medium: 6.5,
      loyal: 4,
    },
    icon: Clock,
    color: {
      badgeBg: 'bg-purple-100 text-purple-900',
      badgeText: 'text-purple-800',
      iconBg: 'bg-purple-500/10 text-purple-600',
      iconColor: 'text-purple-600',
      borderAccent: 'hover:border-purple-400',
    },
    serviceDescription: 'Смены в ритейле и на складах через парк. Оплата по факту завершения смены.',
    features: ['Снижение 10% → 4%', 'Оплата сразу за смену', 'Без открытия СМЗ'],
  },
];

export const Tariffs: React.FC = () => {
  // Выбор типа занятости: 'smz' (Самозанятый/ИП) или 'park' (Парковый сотрудник)
  const [employmentType, setEmploymentType] = useState<EmploymentType>('smz');

  // Актуальный список сервисов для активного режима
  const currentTariffs = useMemo(() => {
    return employmentType === 'smz' ? SMZ_TARIFFS : PARK_TARIFFS;
  }, [employmentType]);

  // State для интерактивного калькулятора
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(140000);
  const [selectedCalcTariff, setSelectedCalcTariff] = useState<string>('dostavka');

  // Если выбранный сервис отсутствует в текущем режиме (например, переключили на "парковый", а было выбрано "Такси")
  useEffect(() => {
    const exists = currentTariffs.some(t => t.id === selectedCalcTariff);
    if (!exists) {
      setSelectedCalcTariff(currentTariffs[0].id);
    }
  }, [employmentType, currentTariffs, selectedCalcTariff]);

  const scrollToOrder = (serviceName?: string) => {
    trackGoal('cta_order_click', { 
      place: 'tariffs_matrix', 
      service: serviceName ?? 'general',
      employmentType 
    });
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Расчёты для калькулятора
  const calcData = useMemo(() => {
    const tariff = currentTariffs.find(t => t.id === selectedCalcTariff) || currentTariffs[0];
    const startRate = tariff.ratesByShifts.start;
    const loyalRate = tariff.ratesByShifts.loyal;
    
    const standardParkFee = Math.round((monthlyRevenue * startRate) / 100);
    const loyalParkFee = Math.round((monthlyRevenue * loyalRate) / 100);
    
    // Экономия между начальной и максимальной ставкой при снижении
    const isFixed = tariff.isFixed;
    const monthlySavings = isFixed 
      ? Math.round((monthlyRevenue * (10 - (tariff.fixedRate || tariff.minRate))) / 100) // выгода по сравнению со средней комиссией 10%
      : standardParkFee - loyalParkFee;
    const yearlySavings = monthlySavings * 12;

    return {
      tariff,
      startRate,
      loyalRate,
      standardParkFee,
      loyalParkFee,
      isFixed,
      monthlySavings,
      yearlySavings,
    };
  }, [monthlyRevenue, selectedCalcTariff, currentTariffs]);

  const handleTypeChange = (type: EmploymentType) => {
    setEmploymentType(type);
    trackGoal('tariffs_employment_type_change', { type });
  };

  return (
    <section id="tariffs" className="py-16 lg:py-24 bg-gradient-to-b from-white via-green-50/20 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles size={14} className="text-green-600" />
            Честные комиссии без скрытых списаний
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-oswald uppercase tracking-tight text-gray-900 mb-4">
            ТАРИФЫ <span className="text-green-600">БАРОРИ ПАРК</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Главное правило нашего парка: <strong className="text-gray-900 font-semibold">чем больше смен вы выполняете — тем ниже процент комиссии!</strong> Выбирайте свой тип занятости и смотрите условия по каждому направлению.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* EMPLOYMENT TYPE SELECTOR TOGGLE (САМОЗАНЯТЫЙ / ИП VS ПАРКОВЫЙ СОТРУДНИК) */}
        {/* ========================================================================= */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-center mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Шаг 1: Выберите ваш тип занятости
            </span>
          </div>

          <div 
            className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border-2 border-green-200/80 shadow-lg shadow-green-900/5 flex flex-col sm:flex-row gap-2"
            role="group"
            aria-label="Выбор типа занятости"
          >
            {/* Кнопка 1: Самозанятый или ИП */}
            <button
              type="button"
              aria-pressed={employmentType === 'smz'}
              onClick={() => handleTypeChange('smz')}
              className={`flex-1 flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                employmentType === 'smz'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-500/25 scale-[1.01]'
                  : 'text-gray-700 hover:text-gray-950 hover:bg-gray-100/70'
              }`}
            >
              <Briefcase size={20} className={employmentType === 'smz' ? 'text-white' : 'text-green-600'} />
              <div className="text-left">
                <div className="leading-tight">Самозанятый / ИП</div>
                <div className={`text-[11px] font-normal ${employmentType === 'smz' ? 'text-green-100' : 'text-gray-400'}`}>
                  Все 6 сервисов • Снижение до 3%
                </div>
              </div>
              <span className={`ml-auto text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                employmentType === 'smz' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'
              }`}>
                6 тарифов
              </span>
            </button>

            {/* Кнопка 2: Парковый сотрудник */}
            <button
              type="button"
              aria-pressed={employmentType === 'park'}
              onClick={() => handleTypeChange('park')}
              className={`flex-1 flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                employmentType === 'park'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-500/25 scale-[1.01]'
                  : 'text-gray-700 hover:text-gray-950 hover:bg-gray-100/70'
              }`}
            >
              <Building2 size={20} className={employmentType === 'park' ? 'text-white' : 'text-blue-600'} />
              <div className="text-left">
                <div className="leading-tight">Парковый сотрудник</div>
                <div className={`text-[11px] font-normal ${employmentType === 'park' ? 'text-green-100' : 'text-gray-400'}`}>
                  Работа через парк без СМЗ
                </div>
              </div>
              <span className={`ml-auto text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                employmentType === 'park' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                2 тарифа
              </span>
            </button>
          </div>

          {/* Информационная подсказка под переключателем */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500 font-medium text-center px-2">
            <HelpCircle size={14} className="text-green-600 shrink-0" />
            <span>
              {employmentType === 'smz' ? (
                <>Прямое подключение со статусом СМЗ / ИП: <strong>Такси (3%), Доставка (5→3%), ТопГоу (7%), Еда (10→5%), Купер (5%), Смены (10→4%)</strong>.</>
              ) : (
                <>Парковое подключение без оформления СМЗ: доступны логистические сервисы <strong>ТопГоу (7%)</strong> и <strong>Яндекс Смена (10→4%)</strong>.</>
              )}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* УТВЕРЖДЕННЫЙ ВАРИАНТ: СВОДНАЯ ТАБЛИЦА СТАВОК + КАЛЬКУЛЯТОР ЭКОНОМИИ */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          {/* Сводная таблица */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Header таблицы */}
            <div className="p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-green-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-oswald uppercase text-gray-950">
                    Сводная таблица комиссий ({employmentType === 'smz' ? 'Самозанятый / ИП' : 'Парковый сотрудник'})
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Сравните начальную ставку на старте и минимальный процент при выходе на смены
                </p>
              </div>

              <div className="text-xs font-bold text-green-800 bg-green-100 px-3.5 py-2 rounded-xl flex items-center gap-2 shrink-0 shadow-xs">
                <Percent size={15} className="text-green-600" />
                <span>Снижение процента с каждой сменой</span>
              </div>
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" aria-label="Таблица тарифов и комиссий парка">
                <thead>
                  <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    <th scope="col" className="py-4 px-4 sm:px-6">Направление</th>
                    <th scope="col" className="py-4 px-4">Тип ставки</th>
                    <th scope="col" className="py-4 px-4">Старт</th>
                    <th scope="col" className="py-4 px-4">Больше смен</th>
                    <th scope="col" className="py-4 px-4 text-green-700">Минимальная ставка</th>
                    <th scope="col" className="py-4 px-4 text-right">Действие</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {currentTariffs.map((tariff) => {
                    const IconComp = tariff.icon;
                    return (
                      <tr 
                        key={tariff.id} 
                        className="hover:bg-green-50/40 transition-colors group cursor-pointer"
                        onClick={() => setSelectedCalcTariff(tariff.id)}
                      >
                        {/* Направление */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tariff.color.iconBg} group-hover:scale-110 transition-transform`}>
                              <IconComp size={20} className={tariff.color.iconColor} />
                            </div>
                            <div>
                              <span className="font-bold text-gray-950 block text-base group-hover:text-green-700 transition-colors">
                                {tariff.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {tariff.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Тип ставки */}
                        <td className="py-4 px-4">
                          {tariff.isFixed ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                              <ShieldCheck size={13} />
                              Фиксированная
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                              <TrendingDown size={13} className="text-amber-600" />
                              Со снижением
                            </span>
                          )}
                        </td>

                        {/* Старт */}
                        <td className="py-4 px-4 font-bold text-gray-800 text-base">
                          {tariff.ratesByShifts.start}%
                        </td>

                        {/* Больше смен */}
                        <td className="py-4 px-4 font-bold text-blue-600 text-base">
                          {tariff.isFixed ? (
                            <span className="text-gray-400 text-xs font-semibold">— (фикс)</span>
                          ) : (
                            <span>{tariff.ratesByShifts.medium}%</span>
                          )}
                        </td>

                        {/* Минимальная ставка */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 font-black text-base text-green-800 bg-green-100 border border-green-200 px-3 py-1 rounded-xl shadow-xs">
                            <Award size={14} className="text-green-600" />
                            {tariff.ratesByShifts.loyal}%
                          </span>
                        </td>

                        {/* Действие */}
                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToOrder(tariff.name);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-600 hover:text-white px-3 py-1.5 rounded-lg border border-green-200 transition-all cursor-pointer"
                          >
                            <span>Подключить</span>
                            <ArrowRight size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Футер таблицы с пояснением */}
            <div className="p-4 bg-gray-50/80 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>* Ставка комиссии снижается автоматически по мере выхода на смены и выполнения заказов.</span>
              <span className="text-green-700 font-bold">Выплаты на карту 24/7 без задержек</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР ВЫГОДЫ */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Левая часть: Управление */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <Zap size={14} className="text-emerald-400" />
                  Калькулятор чистой выгоды ({employmentType === 'smz' ? 'СМЗ / ИП' : 'Парковый'})
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-oswald uppercase text-white leading-tight">
                  Сколько денег останется в вашем кармане?
                </h3>

                {/* Выбор сервиса */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                    Выберите сервис для расчёта:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {currentTariffs.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedCalcTariff(t.id)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                          selectedCalcTariff === t.id
                            ? 'bg-green-500 text-gray-950 shadow-md shadow-green-500/30 scale-105 ring-2 ring-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ползунок оборота */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Ваш ориентировочный оборот в месяц:
                    </span>
                    <span className="text-2xl font-black font-oswald text-green-400">
                      {monthlyRevenue.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <input
                    type="range"
                    aria-label="Доход в месяц"
                    min={40000}
                    max={350000}
                    step={5000}
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-400"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1.5 font-medium">
                    <span>40 000 ₽</span>
                    <span>150 000 ₽</span>
                    <span>350 000 ₽</span>
                  </div>
                </div>
              </div>

              {/* Правая часть: Карточка результата */}
              <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/20 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-300 font-semibold">
                      {calcData.tariff.name} • {calcData.tariff.category}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                      {calcData.isFixed ? `Фикс ${calcData.tariff.fixedRate}%` : `${calcData.startRate}% → ${calcData.loyalRate}%`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 my-2">
                    <div>
                      <span className="text-[11px] text-gray-400 block">
                        {calcData.isFixed ? 'Комиссия парка:' : `На старте (${calcData.startRate}%):`}
                      </span>
                      <span className="text-lg font-bold text-gray-200">
                        {calcData.standardParkFee.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-400 block">
                        {calcData.isFixed ? 'Ставка парка:' : `При активности (${calcData.loyalRate}%):`}
                      </span>
                      <span className="text-lg font-bold text-emerald-400">
                        {calcData.isFixed ? `${calcData.tariff.fixedRate}% фикс` : `${calcData.loyalParkFee.toLocaleString('ru-RU')} ₽`}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-300 uppercase tracking-wider block mb-1">
                    {calcData.isFixed ? 'Экономия vs рынок (10%):' : 'Ваша экономия в месяц:'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-oswald text-green-400">
                    +{calcData.monthlySavings.toLocaleString('ru-RU')} ₽
                  </div>
                  <span className="text-xs text-gray-300 mt-1 block">
                    или <strong className="text-white">+{calcData.yearlySavings.toLocaleString('ru-RU')} ₽ в год</strong> чистой экономии с Барори Парк!
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToOrder(calcData.tariff.name)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-gray-950 font-black text-sm uppercase tracking-wide hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Подключиться к {calcData.tariff.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Guarantee Badge */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-white border border-green-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-green-700" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                Официальная фиксация условий в договоре-оферте
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Никаких скрытых комиссий, скрытых списаний за вывод и внезапных изменений процентных ставок.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToOrder()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </section>
  );
};
