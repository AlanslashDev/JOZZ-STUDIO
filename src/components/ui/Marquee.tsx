import React from 'react';
import { MARQUEE_KEYWORDS } from '../../data/content';

interface MarqueeProps {
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ className = '' }) => {
  const row1 = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS];
  const row2 = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS];

  return (
    <div className={`w-full overflow-hidden bg-surface-1 py-5 space-y-3 ${className}`}>
      {/* Row 1: Left → solid text */}
      <div className="marquee-wrap">
        <div className="inline-flex items-center gap-10 animate-marquee-left hover:[animation-play-state:paused]">
          {row1.map((kw, i) => (
            <div key={`r1-${i}`} className="inline-flex items-center gap-10 shrink-0">
              <span className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-foreground/70 whitespace-nowrap">
                {kw}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber/50 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Right → hollow outline text */}
      <div className="marquee-wrap">
        <div className="inline-flex items-center gap-10 animate-marquee-right hover:[animation-play-state:paused]">
          {row2.map((kw, i) => (
            <div key={`r2-${i}`} className="inline-flex items-center gap-10 shrink-0">
              <span
                className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest whitespace-nowrap"
                style={{
                  WebkitTextStroke: '1.5px rgba(232, 166, 76, 0.25)',
                  color: 'transparent',
                }}
              >
                {kw}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber/20 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
