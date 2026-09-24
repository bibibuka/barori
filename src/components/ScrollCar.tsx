import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';

const VEHICLE_WIDTH = 80;
const DESKTOP_QUERY = '(min-width: 1024px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const VehicleArtwork = () => (
  <>
    <svg viewBox="0 0 64 40" fill="none" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="28" r="2" fill="#9CA3AF" opacity="0.5" />
      <circle cx="-2" cy="26" r="1.5" fill="#9CA3AF" opacity="0.4" />
      <circle cx="-4" cy="28" r="1" fill="#9CA3AF" opacity="0.3" />
      <rect x="8" y="12" width="40" height="20" rx="2" fill="#129243" />
      <rect x="8" y="12" width="28" height="20" rx="2" fill="#129243" />
      <rect x="16" y="18" width="12" height="8" rx="1" fill="#FCD34D" />
      <path d="M19 20L22 22L25 20" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="36" y="14" width="16" height="18" rx="2" fill="#129243" />
      <rect x="40" y="16" width="10" height="10" rx="1" fill="#BFDBFE" />
      <rect x="40" y="16" width="10" height="10" rx="1" fill="url(#windshield-gradient)" />
      <rect x="50" y="24" width="3" height="2" rx="0.5" fill="#FEF08A" />
      <circle cx="18" cy="34" r="5" fill="#1F2937" />
      <circle cx="18" cy="34" r="2.5" fill="#6B7280" />
      <circle cx="18" cy="34" r="1" fill="#9CA3AF" />
      <circle cx="44" cy="34" r="5" fill="#1F2937" />
      <circle cx="44" cy="34" r="2.5" fill="#6B7280" />
      <circle cx="44" cy="34" r="1" fill="#9CA3AF" />
      <line x1="4" y1="18" x2="-4" y2="18" stroke="#129243" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="22" x2="-2" y2="22" stroke="#129243" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="26" x2="-4" y2="26" stroke="#129243" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="windshield-gradient" x1="40" y1="16" x2="50" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.4" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute -left-2 bottom-0 flex gap-1 opacity-50">
      <div className="w-1 h-1 bg-amber-600 rounded-full opacity-50" />
      <div className="w-1.5 h-1.5 bg-amber-700 rounded-full opacity-40" />
      <div className="w-1 h-1 bg-amber-600 rounded-full opacity-30" />
    </div>
  </>
);

const MovingVehicle = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth, { passive: true });
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious() ?? latest;
    setIsScrollingUp(latest > 0 && latest < previous);
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const x = useTransform(smoothProgress, [0, 1], [0, Math.max(0, viewportWidth - VEHICLE_WIDTH)]);

  return (
    <motion.div style={{ x }} className="scroll-car__vehicle absolute bottom-2 w-20 h-12 will-change-transform">
      <motion.div animate={{ scaleX: isScrollingUp ? -1 : 1 }} transition={{ duration: 0.2 }} className="relative h-full w-full">
        <VehicleArtwork />
      </motion.div>
    </motion.div>
  );
};

export const ScrollCar = () => {
  const [display, setDisplay] = useState(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return { visible: false, animate: false };
    const visible = !document.hidden && window.matchMedia(DESKTOP_QUERY).matches;
    return { visible, animate: visible && !window.matchMedia(REDUCED_MOTION_QUERY).matches };
  });

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => {
      const visible = !document.hidden && desktop.matches;
      const animate = visible && !reducedMotion.matches;
      setDisplay(current => current.visible === visible && current.animate === animate ? current : { visible, animate });
    };

    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  if (!display.visible) return null;

  return (
    <div className="scroll-car fixed bottom-0 left-0 z-40 h-16 w-full overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400">
        <div className="absolute top-1/2 left-0 w-full h-0.5 flex gap-4">
          {Array.from({ length: 50 }, (_, index) => <div key={index} className="w-8 h-0.5 bg-yellow-400 flex-shrink-0" />)}
        </div>
      </div>
      {display.animate ? <MovingVehicle /> : <div className="scroll-car__vehicle absolute bottom-2 left-0 w-20 h-12"><VehicleArtwork /></div>}
    </div>
  );
};
