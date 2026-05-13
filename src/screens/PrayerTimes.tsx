import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';
import { formatTime } from '../lib/utils';
import { PRAYER_GUIDANCE } from '../types';
import { Music, Volume2 } from 'lucide-react';

export function PrayerTimesScreen() {
  const { prayerTimes } = useAppStore();
  const { t } = useTranslation();
  
  const prayers = [
    { name: 'Fajr', key: 'fajr' },
    { name: 'Sunrise', key: 'sunrise' },
    { name: 'Dhuhr', key: 'dhuhr' },
    { name: 'Asr', key: 'asr' },
    { name: 'Maghrib', key: 'maghrib' },
    { name: 'Isha', key: 'isha' },
    { name: 'Midnight', key: 'midnight' },
    { name: 'Lastthird', key: 'lastthird' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-32">
      <header className="px-2 pt-4">
        <h1 className="text-4xl font-light tracking-tight mb-2">{t('prayerTimes')}</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">{t('detailedSchedule')}</p>
      </header>

      <div className="grid gap-4">
        {prayers.map((prayer, i) => {
          const time = (prayerTimes as any)?.[prayer.name];
          const guidance = PRAYER_GUIDANCE[prayer.name];
          
          return (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <div className="bg-white/5 border border-white/5 rounded-[24px] p-6 hover:bg-white/10 transition-all duration-500">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-white/90">{t(prayer.key as any)}</h3>
                    <p className="text-[#D4AF37] font-mono tracking-widest text-sm">{time ? formatTime(time) : '--:--'}</p>
                  </div>
                  <div className="flex gap-2">
                    {guidance?.isLoud && <Volume2 size={16} className="text-[#10B981]" />}
                    {!guidance?.isLoud && guidance && <Music size={16} className="text-white/20" />}
                  </div>
                </div>

                {guidance && (
                  <div className="flex gap-6 border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{t('fard')}</span>
                      <span className="text-sm font-medium">{guidance.fard} {t('rakats')}</span>
                    </div>
                    {guidance.sunnahBefore > 0 && (
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{t('sunnahBefore')}</span>
                        <span className="text-sm font-medium">{guidance.sunnahBefore} {t('rakats')}</span>
                      </div>
                    )}
                    {guidance.sunnahAfter > 0 && (
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{t('sunnahAfter')}</span>
                        <span className="text-sm font-medium">{guidance.sunnahAfter} {t('rakats')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
