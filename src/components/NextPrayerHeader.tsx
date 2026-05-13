import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';
import { formatTime, getTimeRemaining } from '../lib/utils';

export function NextPrayerHeader() {
  const { nextPrayer } = useAppStore();
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    if (!nextPrayer) return;
    
    const update = () => {
      setRemaining(getTimeRemaining(nextPrayer.time));
    };
    
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nextPrayer]);

  if (!nextPrayer) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#10B981] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
      >
        {t('nextPrayer')}
      </motion.span>
      
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="text-6xl font-light tracking-tight mb-4"
      >
        {t(nextPrayer.name.toLowerCase() as any)}
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-baseline gap-2"
      >
        <span className="text-white/40 text-sm font-medium uppercase tracking-widest">{t('in')}</span>
        <span className="text-2xl font-mono tracking-tighter text-[#D4AF37]">{remaining}</span>
      </motion.div>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="w-12 h-[1px] bg-white/10 mt-8"
      />
    </div>
  );
}
