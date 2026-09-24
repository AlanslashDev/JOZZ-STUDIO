import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading');

  // Keyboard skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleComplete();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Snappy fast loading counter (~1.2s) + quick smooth fade out
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1200; // Fast loading in 1.2s

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      // Smooth cubic easing
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Quick trigger fade out
        setTimeout(handleComplete, 120);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleComplete = () => {
    setPhase('exit');
    setTimeout(onComplete, 500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
      initial={{ opacity: 1 }}
      animate={phase === 'exit' ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Dot grid bg */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,166,76,0.08),transparent_60%)] pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
        className="flex flex-col items-center gap-5 relative z-10"
      >
        {/* Logo image */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full blur-[40px] bg-brand-amber/25 scale-150" />
          <img
            src="/media/global/logo.png"
            alt="Joozz Designing"
            className="h-20 sm:h-24 w-auto object-contain relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Studio name */}
        <div className="text-center space-y-1">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="font-display font-extrabold text-2xl tracking-[0.25em] text-foreground uppercase"
          >
            JOOZZ
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="font-mono text-[10px] tracking-ultra text-brand-amber uppercase"
          >
            DESIGNING STUDIO
          </motion.div>
        </div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-48 mt-3"
        >
          <div className="relative h-px bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-amber to-brand-coral rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono text-foreground-subtle">
            <span>Loading</span>
            <span className="text-brand-amber tabular-nums">{progress}%</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 text-[10px] font-mono text-foreground-subtle tracking-widest"
      >
        <span>WHERE CREATIVITY MEETS PURPOSE</span>
        <span className="w-6 h-px bg-brand-amber/40" />
        <span>CHELMSFORD, UK</span>
      </motion.div>
    </motion.div>
  );
};
