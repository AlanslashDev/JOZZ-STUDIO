import React from 'react';
import { ScrollReveal } from '../animations/ScrollReveal';

interface SectionHeadingProps {
  pillText: string;
  title: string;
  italicWord?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  pillText,
  title,
  italicWord,
  description,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      } ${className}`}
    >
      <ScrollReveal direction="up" distance={20} delay={0.1}>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-elevated border border-background-border text-[11px] font-mono tracking-widest uppercase text-brand-amber mb-4 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-amber"></span>
          <span>{pillText}</span>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" distance={25} delay={0.2}>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.1]">
          {title}{' '}
          {italicWord && (
            <span className="italic font-light text-brand-amber">{italicWord}</span>
          )}
        </h2>
      </ScrollReveal>

      {description && (
        <ScrollReveal direction="up" distance={20} delay={0.3}>
          <p className="mt-4 text-foreground-muted text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
};
