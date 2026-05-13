import React from 'react';
import { motion } from 'motion/react';
import { ISLAMIC_QUOTES } from '../constants/quotes';

export function QuoteCard() {
  const [quote] = React.useState(() => ISLAMIC_QUOTES[Math.floor(Math.random() * ISLAMIC_QUOTES.length)]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-white/5 border border-white/5 p-8 rounded-[32px] mb-8"
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="white">
          <path d="M60 0C60 33.1371 33.1371 60 0 60C33.1371 60 60 86.8629 60 120C60 86.8629 86.8629 60 120 60C86.8629 60 60 33.1371 60 0Z" />
        </svg>
      </div>

      <p className="text-white/80 text-lg leading-relaxed font-serif italic mb-4 relative z-10">
        "{quote.text}"
      </p>
      <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] relative z-10">
        {quote.source}
      </span>
    </motion.div>
  );
}
