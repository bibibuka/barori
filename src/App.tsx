// FILE: src/App.tsx

import { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tariffs } from './components/Tariffs';
import { Partners } from './components/Partners';
import { Schedule } from './components/Schedule';
import { Steps } from './components/Steps';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';

const Vacancies = lazy(() => import('./components/Vacancies').then(m => ({ default: m.Vacancies })));
const Reviews = lazy(() => import('./components/Reviews').then(m => ({ default: m.Reviews })));

// Lazy-loaded components (не нужны при первой загрузке)
const SeoLandingContent = lazy(() => import('./components/SeoLandingContent').then(m => ({ default: m.SeoLandingContent })));
const MobileApp = lazy(() => import('./components/MobileApp').then(m => ({ default: m.MobileApp })));
const ScrollCar = lazy(() => import('./components/ScrollCar').then(m => ({ default: m.ScrollCar })));
const KnowledgeModal = lazy(() => import('./components/KnowledgeModal').then(m => ({ default: m.KnowledgeModal })));
// Импортируем тип LegalType отдельно (tree-shakeable)
type LegalType = import('./components/LegalModal').LegalType;
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
const CookieBanner = lazy(() => import('./components/CookieBanner').then(m => ({ default: m.CookieBanner })));


export const App = () => {
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);

  // Состояние для юридических модалок
  const [legalModalType, setLegalModalType] = useState<LegalType>(null);

  // База знаний
  const handleOpenKnowledge = () => setIsKnowledgeOpen(true);
  const handleCloseKnowledge = () => setIsKnowledgeOpen(false);

  // Юридические документы
  const handleOpenLegal = (type: LegalType) => setLegalModalType(type);
  const handleCloseLegal = () => setLegalModalType(null);

  return (
    <ToastProvider>
    <div className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <ScrollCar />
      </Suspense>

      <Header onOpenKnowledge={handleOpenKnowledge} />

      <div className="site-header-spacer" aria-hidden="true"></div>

      <main>
        <Hero />
        <About />
        <Tariffs />
        <Suspense fallback={null}>
          <Vacancies />
        </Suspense>
        <Partners />
        <Schedule />
        <Suspense fallback={null}>
          <Reviews />
        </Suspense>
        <Steps />
        <Suspense fallback={null}>
          <SeoLandingContent />
        </Suspense>
        {/* Передаем функцию открытия Оферты в форму */}
        <ContactForm
            onOpenLegal={handleOpenLegal}
        />
        <Suspense fallback={null}>
          <MobileApp />
        </Suspense>
      </main>

      {/* Передаем функцию открытия документов в футер */}
      <Footer onOpenLegal={handleOpenLegal} />

      <Suspense fallback={null}>
        <KnowledgeModal
          isOpen={isKnowledgeOpen}
          onClose={handleCloseKnowledge}
        />
      </Suspense>

      {/* Юридическая модалка */}
      <Suspense fallback={null}>
        <LegalModal
          type={legalModalType}
          onClose={handleCloseLegal}
        />
      </Suspense>

      {/* Cookie-уведомление (блок C3) */}
      <Suspense fallback={null}>
        <CookieBanner onOpenLegal={handleOpenLegal} />
      </Suspense>


    </div>
    </ToastProvider>
  );
};
