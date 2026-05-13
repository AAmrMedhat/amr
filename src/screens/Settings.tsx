import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';
import { CALCULATION_METHODS } from '../types';
import { Globe, Bell, Shield, Info, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function SettingsScreen() {
  const { settings, setSettings } = useAppStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 pb-32">
      <header className="px-2 pt-4">
        <h1 className="text-4xl font-light tracking-tight mb-2">{t('settings')}</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">{t('customization')}</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10B981]">{t('preferences')}</h2>
        
        <div className="bg-white/5 border border-white/5 rounded-3xl divide-y divide-white/5">
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/60 mb-2">
              <Globe size={18} />
              <span className="text-sm font-medium">{t('language')}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSettings({ language: 'ar' })}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-medium transition-all",
                  settings.language === 'ar' ? "bg-[#10B981] text-[#050505]" : "bg-white/5 text-white/40"
                )}
              >
                العربية
              </button>
              <button 
                onClick={() => setSettings({ language: 'en' })}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-medium transition-all",
                  settings.language === 'en' ? "bg-[#10B981] text-[#050505]" : "bg-white/5 text-white/40"
                )}
              >
                English
              </button>
            </div>
          </div>
          
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/60 mb-2">
              <Globe size={18} />
              <span className="text-sm font-medium">{t('calculationMethod')}</span>
            </div>
            <select 
              value={settings.calculationMethod}
              onChange={(e) => setSettings({ calculationMethod: parseInt(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
            >
              {CALCULATION_METHODS.map(m => (
                <option key={m.id} value={m.id} className="bg-[#050505]">{m.name}</option>
              ))}
            </select>
          </div>
          <SettingToggle 
            icon={<Bell size={18} />} 
            label={t('pushNotifications')} 
            active={settings.notificationsEnabled}
            onToggle={() => setSettings({ notificationsEnabled: !settings.notificationsEnabled })}
          />
          <SettingToggle 
            icon={<Shield size={18} />} 
            label={t('adhanPlayback')} 
            active={settings.adhadEnabled}
            onToggle={() => setSettings({ adhadEnabled: !settings.adhadEnabled })}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">{t('support')}</h2>
        <div className="bg-white/5 border border-white/5 rounded-3xl divide-y divide-white/5">
          <SettingItem icon={<Info size={18} />} label={t('aboutNoor')} />
          <SettingItem icon={<Info size={18} />} label={t('privacyPolicy')} />
        </div>
      </section>

      <footer className="text-center py-8">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium">Noor v1.0.0</p>
      </footer>
    </div>
  );
}

function SettingItem({ icon, label, value, onClick }: { icon: React.ReactNode, label: string, value?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full p-5 flex items-center justify-between group hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-3 text-white/60">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-white/30 font-medium">{value}</span>}
        <ChevronRight size={16} className="rtl:rotate-180 text-white/20 group-hover:text-white/40 transition-colors" />
      </div>
    </button>
  );
}

function SettingToggle({ icon, label, active, onToggle }: { icon: React.ReactNode, label: string, active: boolean, onToggle: () => void }) {
  return (
    <div className="w-full p-5 flex items-center justify-between">
      <div className="flex items-center gap-3 text-white/60">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-6 rounded-full relative transition-colors duration-300",
          active ? "bg-[#10B981]" : "bg-white/10"
        )}
      >
        <motion.div 
          animate={{ x: active ? 26 : 4 }}
          className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
        />
      </button>
    </div>
  );
}
