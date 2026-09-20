// FILE: src/components/NewsDrawer.tsx

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flame, 
  ChevronRight, 
  ChevronDown,
  Calendar,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { trackGoal } from '../utils/analytics';

export interface NewsItem {
  id: string;
  category: 'promo' | 'tariffs' | 'payouts' | 'features';
  categoryLabel: string;
  categoryColor: {
    bg: string;
    text: string;
    border: string;
  };
  title: string;
  date: string;
  readTime: string;
  isHot?: boolean;
  isNew?: boolean;
  summary: string;
  fullText: string[];
  actionLabel?: string;
  actionType?: 'order' | 'tariffs' | 'telegram';
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'tariffs-discount',
    category: 'tariffs',
    categoryLabel: 'Тарифы',
    categoryColor: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
    },
    title: 'Снижение комиссии парка до 3% в Яндекс Доставке',
    date: '2 сентября 2026',
    readTime: '1 мин',
    isHot: true,
    isNew: true,
    summary: 'Автоматическое снижение комиссии парка с 5% до 3% для активных курьеров при регулярных сменах.',
    fullText: [
      'Мы обновили сетку тарифов для всех курьеров Яндекс Доставки: теперь при выходе на смены ставка парка автоматически уменьшается до минимальных 3%.',
      'Никаких скрытых условий: чем стабильнее вы выполняете заказы, тем больше денег остаётся у вас на руках.',
      'Ставка фиксируется в вашем профиле и пересчитывается автоматически.'
    ],
    actionLabel: 'Посмотреть тарифы',
    actionType: 'tariffs'
  },
  {
    id: 'instant-payouts-247',
    category: 'payouts',
    categoryLabel: 'Выплаты',
    categoryColor: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
    },
    title: 'Моментальные выплаты 24/7 без выходных и праздников',
    date: '1 сентября 2026',
    readTime: '1 мин',
    isNew: true,
    summary: 'Вывод заработанных средств доступен на карты любых банков РФ в режиме онлайн за считанные секунды.',
    fullText: [
      'Теперь вы можете выводить средства с баланса приложения в любое время суток, включая субботу, воскресенье и праздничные дни.',
      'Минимальная сумма — от 100 рублей. Деньги зачисляются мгновенно без комиссии банка по СБП.'
    ],
    actionLabel: 'Оставить заявку',
    actionType: 'order'
  },
  {
    id: 'topgo-integration',
    category: 'features',
    categoryLabel: 'Новинка',
    categoryColor: {
      bg: 'bg-amber-100',
      text: 'text-amber-900',
      border: 'border-amber-200',
    },
    title: 'Подключение к логистическому сервису ТопГоу (7% фикс)',
    date: '28 августа 2026',
    readTime: '2 мин',
    summary: 'Единая ставка 7% с первой смены. Доступно для самозанятых и парковых сотрудников без оформления СМЗ.',
    fullText: [
      'Барори Парк стал официальным партнёром сервиса ТопГоу. Вы можете начать выполнять заказы уже в день обращения.',
      'Преимущества: стабильный объём заказов, единая фиксированная комиссия 7% и оперативная поддержка кураторов парка.'
    ],
    actionLabel: 'Подключиться к ТопГоу',
    actionType: 'order'
  },
  {
    id: 'referral-bonus',
    category: 'promo',
    categoryLabel: 'Бонусы',
    categoryColor: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200',
    },
    title: 'Акция «Приведи друга»: получите до 3 000 ₽',
    date: '20 августа 2026',
    readTime: '1 мин',
    isHot: true,
    summary: 'Рекомендуйте Барори Парк коллегам и знакомым — получайте денежный бонус за каждого подключённого.',
    fullText: [
      'Приглашайте друзей работать водителями такси или курьерами через наш парк.',
      'Как только ваш друг выполнит первые 30 заказов или смен, вы получите гарантированную выплату до 3 000 ₽ прямо на карту.',
      'Количество приглашённых друзей не ограничено!'
    ],
    actionLabel: 'Написать в Telegram',
    actionType: 'telegram'
  }
];

export const NewsDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>('tariffs-discount');
  const [hasUnread, setHasUnread] = useState(true);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setHasUnread(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openDrawer = () => {
    trackGoal('news_drawer_open', { place: 'edge_tab' });
    setIsOpen(true);
    setHasUnread(false);
  };

  const handleAction = (item: NewsItem) => {
    trackGoal('news_action_click', { newsId: item.id, actionType: item.actionType });
    setIsOpen(false);

    if (item.actionType === 'tariffs') {
      const tariffsSection = document.getElementById('tariffs');
      if (tariffsSection) {
        tariffsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = '/tariffs/';
      }
    } else if (item.actionType === 'order') {
      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (item.actionType === 'telegram') {
      window.open('https://t.me/BaroriPark_Bot', '_blank');
    }
  };

  const filteredNews = NEWS_DATA.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <>
      {/* ========================================================= */}
      {/* ПРИКРЕПЛЕННЫЙ СПРАВА БЕЙДЖ "БАРОРИ НОВОСТИ" (2 ЦВЕТА)      */}
      {/* ========================================================= */}
      <div className="fixed right-0 top-[52%] sm:top-1/2 -translate-y-1/2 z-40">
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Открыть Барори Новости"
          className="group relative flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-l from-rose-600 via-orange-500 to-amber-400 text-gray-950 font-black pl-3 sm:pl-4 pr-1.5 sm:pr-2.5 py-2.5 sm:py-3.5 rounded-l-2xl sm:rounded-l-3xl shadow-2xl shadow-orange-950/40 border-y border-l border-amber-300/70 backdrop-blur-md transition-all duration-300 hover:pl-5 hover:pr-3.5 active:scale-95 cursor-pointer select-none"
        >
          {/* Animated pulsing glow dot */}
          {hasUnread && (
            <span className="absolute -top-1 -left-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 border-2 border-white"></span>
            </span>
          )}

          {/* Иконка пламени */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-950 text-amber-400 flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform shrink-0">
            <Flame size={18} className="animate-pulse" />
          </div>

          {/* Надпись */}
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[9px] sm:text-[10px] font-extrabold text-gray-900/80 uppercase tracking-wider">
              Барори
            </span>
            <span className="text-xs sm:text-sm font-black text-gray-950 tracking-tight">
              Новости
            </span>
          </div>

          {/* Счетчик новостей */}
          <span className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-gray-950 text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center ml-0.5 shrink-0">
            {NEWS_DATA.length}
          </span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* ВЫДВИЖНАЯ ПАНЕЛЬ С НОВОСТЯМИ (АДАПТИВНАЯ ДЛЯ МОБИЛОК И ПК) */}
      {/* ========================================================= */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-[110] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel: на мобилках снизу (Bottom Sheet) или на весь экран, на десктопе справа */}
      <aside
        className={`fixed z-[120] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out
          inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl sm:rounded-t-none
          sm:inset-y-0 sm:right-0 sm:left-auto sm:w-full sm:max-w-lg sm:max-h-full sm:rounded-none
          ${isOpen 
            ? 'translate-y-0 sm:translate-y-0 sm:translate-x-0' 
            : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
          }
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Барори Новости и акции"
      >
        {/* Мобильный индикатор свайпа (Drag Handle) */}
        <div className="sm:hidden w-full flex items-center justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Drawer Header (с двухцветным градиентом) */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 bg-gradient-to-r from-amber-50 via-orange-50/50 to-rose-50/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30 shrink-0">
              <Flame size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-oswald uppercase text-gray-950 tracking-tight">
                  Барори Новости
                </h2>
                <span className="bg-gradient-to-r from-orange-500 to-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Актуально
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Свежие акции, изменения тарифов и выплаты
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть новости"
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-900 border border-gray-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Filters (Scrollable on mobile) */}
        <div className="px-4 sm:px-6 py-2.5 bg-gray-50/90 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'Все новости' },
            { id: 'tariffs', label: 'Тарифы' },
            { id: 'promo', label: 'Акции и бонусы' },
            { id: 'payouts', label: 'Выплаты' },
            { id: 'features', label: 'Сервисы' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedFilter === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Feed List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 bg-gray-50/40">
          {filteredNews.map((item) => {
            const isExpanded = expandedNewsId === item.id;

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-200 cursor-pointer"
                onClick={() => setExpandedNewsId(isExpanded ? null : item.id)}
              >
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${item.categoryColor.bg} ${item.categoryColor.text} ${item.categoryColor.border}`}>
                      {item.categoryLabel}
                    </span>
                    {item.isHot && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        <Flame size={12} className="text-rose-600" />
                        Горячее
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* News Title */}
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug mb-1.5">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.summary}
                </p>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs sm:text-sm text-gray-700 animate-in fade-in duration-200">
                    {item.fullText.map((paragraph, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-orange-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{paragraph}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Row */}
                <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                    <span>{isExpanded ? 'Свернуть' : 'Читать подробнее'}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </span>

                  {item.actionLabel && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(item);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-orange-500 to-rose-600 text-white hover:from-orange-600 hover:to-rose-700 px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <span>{item.actionLabel}</span>
                      <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Drawer Bottom Contact Banner */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-white">
          <div className="bg-gradient-to-r from-gray-950 via-slate-900 to-gray-950 rounded-2xl p-3.5 sm:p-4 text-white flex items-center justify-between gap-3 border border-gray-800 shadow-lg">
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Поддержка 24/7
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-200">
                Есть вопрос по новости?
              </div>
            </div>

            <a
              href="https://t.me/BaroriPark_Bot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('messenger_click', { service: 'telegram', place: 'news_drawer' })}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-gray-950 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase transition-all hover:scale-105 active:scale-95 shrink-0 shadow-md"
            >
              <Send size={13} />
              <span>Написать</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
