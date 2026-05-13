import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation';
import { Home, Clock, Bell, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#10B981]/30 selection:text-white overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {/* Top subtle glow */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[#10B981]/5 blur-[120px] rounded-full" />
          
          {/* Bottom subtle glow */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
          
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#0A1A2F]/20 blur-[150px] rounded-full" />
        </motion.div>
      </div>

      <main className={cn("relative z-10 max-w-md mx-auto min-h-screen px-6 py-12 pb-32 flex flex-col", className)}>
        {children}
      </main>

      {/* Navigation Bar (Mobile Style) */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black/80 backdrop-blur-3xl border-t border-white/5 px-8 pt-4 pb-8 flex justify-between items-center z-50 rounded-t-[32px]">
        <NavIcon to="/" icon="Home" label={t('home')} active={location.pathname === '/'} />
        <NavIcon to="/times" icon="Clock" label={t('times')} active={location.pathname === '/times'} />
        <NavIcon to="/alarm" icon="Bell" label={t('alarm')} active={location.pathname === '/alarm'} />
        <NavIcon to="/settings" icon="Settings" label={t('set')} active={location.pathname === '/settings'} />
      </nav>
    </div>
  );
}

function NavIcon({ to, icon, label, active = false }: { to: string, icon: string, label: string, active?: boolean }) {
  const IconMap: any = { Home, Clock, Bell, Settings };
  const Icon = IconMap[icon];

  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Link
        to={to}
        className={cn(
          "flex flex-col items-center gap-1 transition-all duration-300",
          active ? "text-[#10B981]" : "text-white/30 hover:text-white/60"
        )}
      >
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
        <span className="text-[9px] font-bold uppercase tracking-[0.15em]">{label}</span>
        {active && (
          <motion.div 
            layoutId="nav-indicator"
            className="w-1 h-1 bg-[#10B981] rounded-full mt-0.5"
          />
        )}
      </Link>
    </motion.div>
  );
}

