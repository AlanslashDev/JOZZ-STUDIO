import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CORE_SERVICES, SERVICES_CONTENT } from '../data/content';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { ServiceCard } from '../components/ui/ServiceCard';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-10">
      {/* 1. HEADER */}
      <section className={`${SERVICES_CONTENT.sectionVisibility.hero === false ? 'hidden ' : ''}mb-24`}>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-amber/10 border border-brand-amber/20 text-[0.6rem] font-mono tracking-[0.5em] uppercase text-brand-amber mb-6">
            <span>{SERVICES_CONTENT.eyebrow}</span>
          </div>
        </ScrollReveal>

        <h1 className="text-display-xl uppercase text-foreground leading-[0.98] max-w-4xl mb-8">
          {SERVICES_CONTENT.heading} <br />
          <span className="text-gradient-gold">{SERVICES_CONTENT.highlightedHeading}</span>
        </h1>

        <p className="text-foreground-muted text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {SERVICES_CONTENT.description}
        </p>
      </section>

      {/* 2. THE 7 SERVICES GRID */}
      <section className={`${SERVICES_CONTENT.sectionVisibility.list === false ? 'hidden ' : ''}mb-32`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.filter((service) => service.visible !== false && service.id && service.title).map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} displayNumber={String(idx + 1).padStart(2, '0')} />
          ))}
        </div>
      </section>

      {/* 3. PRESS-READY GUARANTEE */}
      <section className={`${SERVICES_CONTENT.sectionVisibility.guarantee === false ? 'hidden ' : ''}py-24 border-t border-white/[0.05]`}>
        <div className="p-10 sm:p-14 rounded-3xl surface-card spotlight-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-brand-amber font-mono text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>{SERVICES_CONTENT.guaranteeEyebrow}</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-wider text-foreground">
                {SERVICES_CONTENT.guaranteeHeading}
              </h3>
              <p className="text-foreground-muted text-sm sm:text-base leading-relaxed font-light">
                {SERVICES_CONTENT.guaranteeDescription}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link to={SERVICES_CONTENT.guaranteeButtonLink} className="btn-amber">
                {SERVICES_CONTENT.guaranteeButtonText} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="bracket-tl" />
          <div className="bracket-br" />
        </div>
      </section>
    </div>
  );
};


