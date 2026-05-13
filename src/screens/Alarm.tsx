import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';
import { Bell, Info, Check, Volume2 } from 'lucide-react';

export function AlarmScreen() {
  const { settings, setSettings } = useAppStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTime, setTempTime] = useState(settings.qiyamAlarmTime || '03:00');

  const handleSave = () => {
    setSettings({ qiyamAlarmTime: tempTime });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-32">
      <header className="px-2 pt-4">
        <h1 className="text-4xl font-light tracking-tight mb-2">{t('qiyamTitle')}</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">{t('qiyamSubtitle')}</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] p-8 text-center"
      >
        <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Bell className="text-[#D4AF37]" size={32} />
        </div>

        <h2 className="text-2xl font-medium mb-2">{t('qiyamAlarm')}</h2>
        <p className="text-white/40 text-sm mb-8 px-4">
          {t('qiyamDesc')}
        </p>

        <div className="bg-black/40 rounded-3xl p-8 mb-8 border border-white/5">
          {isEditing ? (
            <div className="flex flex-col items-center gap-4">
              <input 
                type="time" 
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                className="bg-transparent text-5xl font-mono text-[#D4AF37] focus:outline-none w-full text-center"
              />
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-[#10B981] text-[#050505] rounded-full font-bold text-sm uppercase tracking-widest mt-4"
              >
                <Check size={18} /> {t('saveTime')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">{t('currentAlarm')}</span>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-6xl font-mono tracking-tighter text-[#D4AF37] hover:opacity-80 transition-opacity"
              >
                {settings.qiyamAlarmTime || '03:00'}
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-[10px] uppercase tracking-widest text-[#10B981] font-bold mt-2"
              >
                {t('changeTime')}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-3 text-white/60">
            <Volume2 size={18} />
            <span className="text-sm font-medium">{t('gentleTone')}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{t('default')}</span>
        </div>
      </motion.div>

      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex gap-4">
        <Info className="text-[#10B981] shrink-0" size={20} />
        <p className="text-xs leading-relaxed text-white/60 italic">
          "{t('qiyamQuote')}"
          <span className="block mt-1 text-[10px] not-italic opacity-50">— Sahih Muslim</span>
        </p>
      </div>
    </div>
  );
}
