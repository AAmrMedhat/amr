import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';

export function SplashScreen() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1,
          ease: "easeOut"
        }}
        className="relative mb-8"
      >
        {/* Animated Islamic Geometric Pattern / Logo */}
        <div className="relative w-24 h-24">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-[#10B981]/20 rounded-xl"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border border-[#D4AF37]/20 rounded-xl rotate-45"
          />
          <div className="absolute inset-0 flex items-center justify-center text-[#10B981]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L28.5 15.5H40L30.5 22.5L35 34L24 27L13 34L17.5 22.5L8 15.5H19.5L24 4Z" fill="currentColor" fillOpacity="0.8" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-light tracking-[0.4em] uppercase text-white mb-2"
      >
        {t('appName')}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/30 text-[10px] uppercase tracking-[0.2em]"
      >
        {t('tagline')}
      </motion.p>

      {/* Loading Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-full bg-[#10B981]/50"
        />
      </div>
    </div>
  );
}
