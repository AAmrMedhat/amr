import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Info } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';
import { NextPrayerHeader } from '../components/NextPrayerHeader';
import { QuoteCard } from '../components/QuoteCard';
import { PrayerCard } from '../components/PrayerCard';

export function Dashboard() {
  const { prayerTimes, location, nextPrayer, completedPrayers, togglePrayerCompleted } = useAppStore();
  const { t } = useTranslation();
  const today = new Date().toDateString();

  const prayers = [
    { name: 'Fajr', key: 'fajr' },
    { name: 'Dhuhr', key: 'dhuhr' },
    { name: 'Asr', key: 'asr' },
    { name: 'Maghrib', key: 'maghrib' },
    { name: 'Isha', key: 'isha' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header Info */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2 text-white/40">
          <MapPin size={14} />
          <span className="text-[10px] uppercase tracking-widest font-semibold">
            {location?.city ? `${location.city}, ${location.country}` : t('detectingLocation')}
          </span>
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <Info size={18} />
        </button>
      </div>

      <NextPrayerHeader />

      <QuoteCard />

      <div className="flex flex-col gap-3">
        <div className="px-2 flex justify-between items-end mb-1">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">
            {t('dailyPrayers')}
          </h2>
          <span className="text-[10px] text-white/30 font-medium italic">
            {t('checkToTrack')}
          </span>
        </div>
        
        {prayers.map((prayer) => {
          const prayerKey = `${today}_${prayer.name}`;
          const timeValue = (prayerTimes as any)?.[prayer.name];
          return (
            <PrayerCard
              key={prayer.name}
              name={t(prayer.key as any)}
              time={timeValue || '--:--'}
              active={nextPrayer?.name === prayer.name}
              completed={completedPrayers.includes(prayerKey)}
              onToggle={() => togglePrayerCompleted(prayerKey)}
            />
          );
        })}
      </div>
    </div>
  );
}

