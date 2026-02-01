// FILE: src/App.tsx

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VideoSection } from './components/VideoSection';
import { Vacancies, Vacancy } from './components/Vacancies';
import { Modal } from './components/Modal';
import { Partners } from './components/Partners';
import { Schedule } from './components/Schedule';
import { Reviews } from './components/Reviews';
import { Steps } from './components/Steps';
import { ContactForm } from './components/ContactForm';
import { MobileApp } from './components/MobileApp';
import { Footer } from './components/Footer';
import { ScrollCar } from './components/ScrollCar';

export const App = () => {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Состояние для автовыбора вакансии в форме
  const [formVacancy, setFormVacancy] = useState<string | null>(null);

  const handleOpenModal = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // При простом закрытии не сбрасываем selectedVacancy сразу, чтобы не дергалась анимация
  };

  // Функция, которая срабатывает при клике "Откликнуться" в модалке
  const handleApplyFromModal = () => {
    if (selectedVacancy) {
      setFormVacancy(selectedVacancy.title); // Передаем название в форму
      setIsModalOpen(false); // Закрываем модалку
      
      // Плавный скролл к форме
      const orderSection = document.getElementById('order');
      if (orderSection) {
         orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollCar />
      <Header />
      
      {/* Отступ для фиксированной шапки */}
      <div className="h-20"></div>

      <main>
        <Hero />
        <About />
        <VideoSection />
        <Vacancies onOpenModal={handleOpenModal} />
        <Partners />
        <Schedule />
        <Reviews />
        <Steps />
        {/* Передаем выбранную вакансию в форму */}
        <ContactForm selectedVacancy={formVacancy} />
        <MobileApp />
      </main>

      <Footer />

      {/* Модальное окно теперь должно уметь вызывать handleApplyFromModal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        vacancy={selectedVacancy}
        onApply={handleApplyFromModal} // <-- Нам нужно добавить этот пропс в Modal
      />
    </div>
  );
};