import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn, formatTime } from '../lib/utils';

import { useTranslation } from '../hooks/useTranslation';

interface PrayerCardProps {
  name: string;
  time: string;
  active?: boolean;
  completed?: boolean;
  onToggle?: () => void;
}

export function PrayerCard({ name, time, active, completed, onToggle }: PrayerCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex items-center justify-between p-5 rounded-2xl transition-all duration-500",
        active ? "bg-white/10 border-white/10" : "bg-white/5 border-transparent",
        "border"
      )}
    >
      {active && (
        <motion.div 
          layoutId="active-highlight"
          className="absolute inset-0 border border-[#10B981]/50 rounded-2xl pointer-events-none"
        />
      )}

      <div className="flex items-center gap-4">
        <button 
          onClick={onToggle}
          className={cn(
            "transition-colors",
            completed ? "text-[#10B981]" : "text-white/20"
          )}
        >
          {completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        
        <div>
          <h3 className={cn(
            "text-base font-medium transition-colors",
            active ? "text-white" : "text-white/60"
          )}>
            {name}
          </h3>
          <p className="text-[#D4AF37] text-xs font-mono tracking-wider opacity-80">
            {formatTime(time)}
          </p>
        </div>
      </div>

      {active && (
        <span className="text-[10px] bg-[#10B981] text-[#050505] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
          {t('now')}
        </span>
      )}
    </motion.div>
  );
}
