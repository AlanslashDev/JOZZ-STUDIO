import React from 'react';
import { MARQUEE_KEYWORDS } from '../../data/content';

interface MarqueeProps {
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ className = '' }) => {
  const row1 = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS];
  const row2 = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS];

  return (
    <div className={`w-full overflow-hidden bg-surface-1 py-6 space-y-3.5 border-y border-white/[0.04] ${className}`}>
      {/* Row 1: Left high-speed track */}
      <div className="marquee-wrap">
        <div className="animate-marquee-track-left items-center gap-10 hover:[animation-play-state:paused] shrink-0">
          {row1.map((kw, i) => (
            <div key={`r1-${i}`} className="inline-flex items-center gap-10 shrink-0">
              <span className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-foreground/75 whitespace-nowrap">
                {kw}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber/50 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Right high-speed track */}
      <div className="marquee-wrap">
        <div className="animate-marquee-track-right items-center gap-10 hover:[animation-play-state:paused] shrink-0">
          {row2.map((kw, i) => (
            <div key={`r2-${i}`} className="inline-flex items-center gap-10 shrink-0">
              <span
                className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider whitespace-nowrap"
                style={{
                  WebkitTextStroke: '1px rgba(232, 166, 76, 0.35)',
                  color: 'transparent',
                }}
              >
                {kw}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber/25 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
