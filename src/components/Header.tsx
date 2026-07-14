import { useState, useEffect } from 'react';
import { Menu, X, Send, PhoneCall, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.webp';
import maxIcon from '../assets/max-icon.svg';
import vkIcon from '../assets/vk-icon.svg';
import { trackGoal } from '../utils/analytics';


// Иконка Telegram
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

interface HeaderProps {
  onOpenKnowledge?: () => void;
}

export const Header = ({ onOpenKnowledge }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackGoal('cta_order_click', { place: 'header' });
    const section = document.getElementById('order');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (isMenuOpen) toggleMenu();
    }
  };

  const handleKnowledgeClick = () => {
    trackGoal('knowledge_open', { place: 'header' });
    onOpenKnowledge?.();
  };

  const GlassTooltip = ({ className, arrowClassName }: { className?: string, arrowClassName?: string }) => (
    <div className={`absolute z-50 pointer-events-auto animate-fade-in ${className}`}>
      <div className="relative">
        <svg 
          width="16" 
          height="12" 
          viewBox="0 0 16 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute -top-[11px] z-10 ${arrowClassName}`}
        >
          <path d="M8 0L16 12H0L8 0Z" fill="rgba(59, 130, 246, 0.2)" />
          <path d="M0 12L8 0L16 12" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
        </svg>
        
        <div className="relative z-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-gray-800 text-xs font-bold whitespace-nowrap">
          <span>Помощь 24/7</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="hover:bg-black/10 rounded-full p-0.5 transition-colors cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4 lg:py-6'}`}>
        <div className="container mx-auto px-4">
          <div className={`relative flex items-center justify-between px-4 lg:px-6 py-3 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/50' : 'bg-white/40 backdrop-blur-md border border-white/30 shadow-sm'}`}>
            
            {/* Logo + Mobile Phone */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="flex items-center gap-3 group relative z-10">
                <img src={logo} alt="Барори Парк" className="h-8 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
              </a>

              <a href="tel:+79219000997" onClick={() => trackGoal('phone_click', { place: 'header_mobile' })} className="lg:hidden flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-green-50 text-green-800 font-bold text-xs whitespace-nowrap active:scale-95 transition-transform border border-green-100 translate-x-2">
                <PhoneCall size={12} className="animate-phone-ring flex-shrink-0" />
                <span>+7 (921) 900 09 97</span>
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
              <a href="#about" className="relative overflow-hidden group py-1">
                <span className="relative z-10 group-hover:text-green-700 transition-colors duration-300">О нас</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#vacancies" className="relative overflow-hidden group py-1">
                <span className="relative z-10 group-hover:text-green-700 transition-colors duration-300">Вакансии</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button onClick={handleKnowledgeClick} className="relative overflow-hidden group py-1 cursor-pointer">
                <span className="relative z-10 group-hover:text-green-700 transition-colors duration-300">База знаний</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            {/* Right Actions (DESKTOP) */}
            <div className="hidden lg:flex items-center gap-6 relative z-10">
              
              {/* Bots Buttons with Glass Tooltip */}
              <div className="relative flex items-center gap-2">
                <a 
                  href="https://t.me/BaroriPark_Bot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackGoal('messenger_click', { service: 'telegram', place: 'header' })}
                  className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all hover:scale-110 shadow-sm relative z-20" 
                  title="Написать в Telegram"
                >
                  <TelegramIcon className="w-10 h-10" />
                </a>

                <a 
                  href="https://vk.com/baroripark" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackGoal('messenger_click', { service: 'vk', place: 'header' })}
                  className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all hover:scale-110 shadow-sm relative z-20" 
                  title="ВК Бот"
                >
                  <img src={vkIcon} alt="VK" className="w-10 h-10 rounded-full object-cover" />
                </a>

                <a 
                  href="https://max.ru/id7814820277_bot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackGoal('messenger_click', { service: 'max', place: 'header' })}
                  className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all hover:scale-110 shadow-sm relative z-20" 
                  title="Max Бот"
                >
                  <img src={maxIcon} alt="Max" className="w-10 h-10 rounded-full object-cover" />
                </a>
                
                {showTooltip && (
                  <GlassTooltip 
                    className="top-full mt-[20px] left-1/2 -translate-x-1/2" 
                    arrowClassName="left-1/2 -translate-x-1/2"
                  />
                )}
              </div>

              <a href="tel:+79219000997" onClick={() => trackGoal('phone_click', { place: 'header_desktop' })} className="flex items-center gap-3 font-bold text-gray-700 hover:text-green-600 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <PhoneCall size={18} className="text-green-600 animate-phone-ring" />
                </div>
                <span className="animate-text-shimmer bg-gradient-to-r from-gray-800 via-green-600 to-gray-800 bg-[length:200%_auto] bg-clip-text text-transparent hidden xl:inline">
                  +7 (921) 900 09 97
                </span>
              </a>

              <a
                href="#order"
                onClick={handleScrollToOrder} 
                className="relative group overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white px-7 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 animate-btn-pulse-custom hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Оставить заявку
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer-slide bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
              </a>
            </div>

            {/* Mobile Burger & Tooltip Container */}
            <div className="lg:hidden relative z-50">
               {showTooltip && !isMenuOpen && (
                  <GlassTooltip 
                    className="top-full right-0 mt-3"
                    arrowClassName="right-[14px]" 
                  />
                )}

              <button onClick={toggleMenu} className="p-2 text-gray-800 hover:bg-black/5 rounded-lg transition-colors relative">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col overflow-y-auto ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center min-h-full justify-center py-24 px-6">
          <nav className="flex flex-col items-center gap-8 text-2xl font-bold text-gray-800">
            <a href="#about" onClick={toggleMenu} className="hover:text-green-600 transition-colors">О нас</a>
            <a href="#vacancies" onClick={toggleMenu} className="hover:text-green-600 transition-colors">Вакансии</a>
            <button onClick={() => { toggleMenu(); handleKnowledgeClick(); }} className="hover:text-green-600 transition-colors">База знаний</button>
          </nav>

          <div className={`mt-10 flex flex-col items-center gap-6 transform transition-all duration-500 delay-300 w-full max-w-xs ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            {/* Телефон */}
            <a href="tel:+79219000997" onClick={() => trackGoal('phone_click', { place: 'mobile_menu' })} className="flex items-center gap-3 font-bold text-gray-700 hover:text-green-600 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <PhoneCall size={20} className="text-green-600 animate-phone-ring" />
              </div>
              <span className="animate-text-shimmer bg-gradient-to-r from-gray-800 via-green-600 to-gray-800 bg-[length:200%_auto] bg-clip-text text-transparent text-xl">
                +7 (921) 900 09 97
              </span>
            </a>

            {/* Мессенджеры — всё в одном блоке */}
            <div className="w-full bg-gray-50 rounded-2xl p-4 flex flex-col items-center gap-3 border border-gray-100 shadow-sm">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Поддержка и оформление</span>
              <div className="flex items-center gap-4">
                <a href="https://t.me/BaroriPark_Bot" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: 'telegram', place: 'mobile_menu' })} className="w-14 h-14 rounded-full overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform">
                  <TelegramIcon className="w-14 h-14" />
                </a>
                <a href="https://vk.com/baroripark" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: 'vk', place: 'mobile_menu' })} className="w-14 h-14 rounded-full overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform">
                  <img src={vkIcon} alt="VK" className="w-14 h-14 rounded-full object-cover" />
                </a>
                <a href="https://max.ru/id7814820277_bot" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal('messenger_click', { service: 'max', place: 'mobile_menu' })} className="w-14 h-14 rounded-full overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform">
                  <img src={maxIcon} alt="Max" className="w-14 h-14 rounded-full object-cover" />
                </a>
              </div>
            </div>

            {/* Кнопка заявки */}
            <a
              href="#order"
              onClick={handleScrollToOrder}
              className="mt-2 bg-green-600 text-white text-lg px-10 py-4 rounded-2xl font-bold shadow-xl shadow-green-200 flex items-center gap-3 active:scale-95 transition-transform animate-btn-pulse-custom"
            >
              Оставить заявку <ChevronRight />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes phone-ring { 0% { transform: rotate(0deg); } 10% { transform: rotate(15deg); } 20% { transform: rotate(-15deg); } 30% { transform: rotate(15deg); } 40% { transform: rotate(-15deg); } 50% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }
        .animate-phone-ring { animation: phone-ring 2s infinite ease-in-out; }
        
        @keyframes text-shimmer { to { background-position: 200% center; } }
        .animate-text-shimmer { animation: text-shimmer 3s linear infinite; }
        
        @keyframes btn-pulse-custom { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); transform: scale(1); } 70% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); transform: scale(1.02); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); transform: scale(1); } }
        .animate-btn-pulse-custom { animation: btn-pulse-custom 2s infinite; }
        
        @keyframes shimmer-slide { 100% { transform: translateX(100%); } }
        .animate-shimmer-slide { animation: shimmer-slide 1.5s infinite; }

        @keyframes fade-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </>
  );
};
