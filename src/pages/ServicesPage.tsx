import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PenTool,
  Palette,
  FileText,
  CreditCard,
  BookOpen,
  Printer,
  Camera,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CORE_SERVICES, SERVICES_CONTENT } from '../data/content';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { ServiceCard } from '../components/ui/ServiceCard';

const iconMap: Record<string, React.ElementType> = {
  PenTool,
  Palette,
  FileText,
  CreditCard,
  BookOpen,
  Printer,
  Camera,
};

const SERVICE_TIERS = [
  {
    name: 'Bespoke Brand Mark',
    badge: 'Core Identity',
    priceEstimate: 'From Â£950',
    turnaround: '5â€“7 Business Days',
    idealFor: 'Early-stage founders & focused rebrands',
    features: [
      'Primary & Secondary Vector Logo Marks',
      'Full Vector Asset Kit (AI, EPS, SVG, PDF, PNG)',
      'Monochrome & Inverted Color Variations',
      'Basic Typography Pairing Recommendations',
      '2 Revisions & Feedback Rounds'
    ],
    recommendedService: 'Logo Design',
  },
  {
    name: 'Complete Brand Universe',
    badge: 'Signature Studio Suite',
    popular: true,
    priceEstimate: 'From Â£2,400',
    turnaround: '2â€“3 Weeks',
    idealFor: 'Growing enterprises commanding premium market tier',
    features: [
      'Everything in Bespoke Brand Mark',
      'Comprehensive Brand Style Guideline Book',
      'Curated Typography & Color System (CMYK, RGB, Pantone)',
      'Stationery Suite (Business Card & Letterhead setup)',
      'Social Media Brand Kit & Graphic Patterns',
      'Unlimited Creative Concept Explorations'
    ],
    recommendedService: 'Branding & Visual Identity',
  },
  {
    name: 'Print & Editorial Suite',
    badge: 'Print Production',
    priceEstimate: 'From Â£1,600',
    turnaround: '1â€“2 Weeks',
    idealFor: 'Magazines, lookbooks, brochures & exhibitions',
    features: [
      'Multi-page Editorial Layout & Grid System',
      'High-res Press-Ready CMYK Imposition & Bleeds',
      'Specialty Finish Specs (Foil, Emboss, Spot UV)',
      'Interactive Digital PDF Editions',
      'Direct Commercial Printer Support'
    ],
    recommendedService: 'Brochure & Poster Design',
  }
];

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


