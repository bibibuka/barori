import { useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

export const ScrollCar = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < previous && latest > 0) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress (0 to 1) to percentage string (0% to 90% to keep it on screen)
  const xRange = useTransform(scaleX, [0, 1], ["0%", "90%"]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none h-16 overflow-hidden">
      {/* Track line (road) */}
      <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400">
        {/* Road markings */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 flex gap-4">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="w-8 h-0.5 bg-yellow-400 flex-shrink-0"></div>
          ))}
        </div>
      </div>
      
      <motion.div 
        style={{ left: xRange }}
        animate={{ scaleX: isScrollingUp ? -1 : 1 }}
        transition={{ scaleX: { duration: 0.2 } }}
        className="absolute bottom-2 w-20 h-12 will-change-transform"
      >
        {/* Car SVG - Delivery Van */}
        <svg viewBox="0 0 64 40" fill="none" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
          {/* Exhaust smoke */}
          <motion.g
            animate={{ opacity: [0.3, 0.6, 0.3], x: [-2, -6, -2] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <circle cx="2" cy="28" r="2" fill="#9CA3AF" opacity="0.5" />
            <circle cx="-2" cy="26" r="1.5" fill="#9CA3AF" opacity="0.4" />
            <circle cx="-4" cy="28" r="1" fill="#9CA3AF" opacity="0.3" />
          </motion.g>
          
          {/* Van body */}
          <rect x="8" y="12" width="40" height="20" rx="2" fill="#129243" />
          
          {/* Cargo area */}
          <rect x="8" y="12" width="28" height="20" rx="2" fill="#129243" />
          
          {/* Delivery box logo on side */}
          <rect x="16" y="18" width="12" height="8" rx="1" fill="#FCD34D" />
          <path d="M19 20L22 22L25 20" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Cabin */}
          <rect x="36" y="14" width="16" height="18" rx="2" fill="#129243" />
          
          {/* Windshield */}
          <rect x="40" y="16" width="10" height="10" rx="1" fill="#BFDBFE" />
          <rect x="40" y="16" width="10" height="10" rx="1" fill="url(#windshield-gradient)" />
          
          {/* Headlight */}
          <motion.rect 
            x="50" y="24" width="3" height="2" rx="0.5" 
            fill="#FEF08A"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          
          {/* Wheels */}
          <circle cx="18" cy="34" r="5" fill="#1F2937" />
          <circle cx="18" cy="34" r="2.5" fill="#6B7280" />
          <motion.circle 
            cx="18" cy="34" r="1" 
            fill="#9CA3AF"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          />
          
          <circle cx="44" cy="34" r="5" fill="#1F2937" />
          <circle cx="44" cy="34" r="2.5" fill="#6B7280" />
          <motion.circle 
            cx="44" cy="34" r="1" 
            fill="#9CA3AF"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Motion lines */}
          <motion.g
            animate={{ opacity: [0.5, 1, 0.5], x: [-1, -3, -1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            <line x1="4" y1="18" x2="-4" y2="18" stroke="#129243" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="22" x2="-2" y2="22" stroke="#129243" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="26" x2="-4" y2="26" stroke="#129243" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="windshield-gradient" x1="40" y1="16" x2="50" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Dust particles */}
        <motion.div
          className="absolute -left-2 bottom-0 flex gap-1"
          animate={{ opacity: [0, 0.6, 0], x: [-5, -15], y: [0, -5] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-amber-600 rounded-full opacity-50"></div>
          <div className="w-1.5 h-1.5 bg-amber-700 rounded-full opacity-40"></div>
          <div className="w-1 h-1 bg-amber-600 rounded-full opacity-30"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};
