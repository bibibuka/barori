import { useState, useEffect } from 'react';
import { Menu, X, Send, PhoneCall } from 'lucide-react';
// Импорт логотипа. Убедись, что файл лежит по этому пути!
import logo from '../assets/logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-xl backdrop-blur-md bg-white/95 py-2' : 'bg-white shadow-md py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 group">
            {/* Логотип-картинка вместо CSS круга */}
            <img 
              src={logo} 
              alt="Логотип" 
              className="h-16 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Название текстом (можно удалить, если название есть на самой картинке) */}
            <span className="font-oswald text-xl font-bold uppercase hidden sm:block">
              
            </span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          <a href="#about" className="relative hover:text-blue-600 transition-colors group">
            О нас
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#vacancies" className="relative hover:text-blue-600 transition-colors group">
            Вакансии
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#knowledge" className="relative hover:text-blue-600 transition-colors group">
            База знаний
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* Phone - Visible on Desktop */}
        <div className="hidden lg:block text-lg font-bold">
          <a
            href="tel:+79219000997"
            className="flex items-center gap-2 group"
          >
            <PhoneCall size={22} className="text-blue-600 animate-phone-ring" />
            <span className="animate-shimmer">
              +7 (921) 900 09 97
            </span>
          </a>
        </div>

        {/* Right Section (Button) */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-blue-500 hover:text-blue-600 transition-all hover:scale-110">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center hover:bg-blue-50">
              <Send size={20} />
            </div>
          </a>
          <a
            href="#order"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            Оставить заявку
          </a>
        </div>

        {/* Mobile Burger */}
        <div className="lg:hidden flex items-center gap-4">
          <a href="tel:+79219000997" className="font-bold text-sm sm:text-base mr-2 flex items-center gap-2">
            <PhoneCall size={18} className="text-blue-600 animate-phone-ring" />
            <span className="animate-shimmer">+7 (921) 900 09 97</span>
          </a>
          <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition-colors">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg py-6 flex flex-col items-center gap-6 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-4 font-medium text-lg">
          <a href="#about" onClick={toggleMenu} className="hover:text-blue-600">О нас</a>
          <a href="#vacancies" onClick={toggleMenu} className="hover:text-blue-600">Вакансии</a>
          <a href="#knowledge" onClick={toggleMenu} className="hover:text-blue-600">База знаний</a>
        </nav>

        <div className="flex flex-col items-center gap-4 mt-2">
          <a href="#" className="flex items-center gap-2 text-blue-500 font-medium">
            <Send size={20} /> Telegram
          </a>
          <a
            href="#order"
            onClick={toggleMenu}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </header>
  );
};