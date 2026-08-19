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
import { CORE_SERVICES } from '../data/content';
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
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-8 sm:px-10">
      {/* 1. HEADER */}
      <section className="mb-24">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-amber/10 border border-brand-amber/20 text-[0.6rem] font-mono tracking-[0.5em] uppercase text-brand-amber mb-6">
            <span>OUR SERVICES &amp; SOLUTIONS</span>
          </div>
        </ScrollReveal>

        <h1 className="text-display-xl uppercase text-foreground leading-[0.98] max-w-4xl mb-8">
          DESIGN SOLUTIONS. <br />
          <span className="text-gradient-gold">CRAFTED WITH PRECISION.</span>
        </h1>

        <p className="text-foreground-muted text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          With over 14 years of professional experience, Joozz Designing delivers high-impact branding, print mastery, and digital design tailored to your strategic business goals.
        </p>
      </section>

      {/* 2. THE 7 SERVICES GRID */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </section>

      {/* 3. ENGAGEMENT TIERS / PACKAGES */}
      <section className="py-24 border-y border-white/[0.05]">
        <div className="mb-16">
          <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3">
            02 // CURATED ENGAGEMENTS
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            Clear project frameworks <span className="italic text-gradient-gold">with transparent scope.</span>
          </h2>
          <p className="text-foreground-muted text-base max-w-2xl mt-4 font-light">
            Whether you need a standalone trademark or a complete brand universe, we offer structured commission packages with direct designer access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICE_TIERS.map((tier, idx) => (
            <ScrollReveal key={tier.name} direction="up" delay={idx * 0.1}>
              <div
                className={`p-8 sm:p-10 rounded-3xl surface-card spotlight-card h-full flex flex-col justify-between group relative overflow-hidden ${
                  tier.popular ? 'border-brand-amber/40 shadow-2xl bg-[#0e0e11]' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-brand-amber text-background text-[10px] font-mono font-bold uppercase tracking-widest">
                    Signature Choice
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-mono tracking-ultra text-brand-amber uppercase mb-3">
                    {tier.badge}
                  </div>
                  <h3 className="font-editorial text-2xl font-medium text-foreground mb-4 group-hover:text-brand-amber transition-colors">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-3xl font-bold text-foreground">
                      {tier.priceEstimate}
                    </span>
                    <span className="text-xs font-mono text-foreground-subtle">est. guideline</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-amber/80 mb-6">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tier.turnaround}</span>
                  </div>

                  <p className="text-xs text-foreground-muted mb-8 italic">
                    Ideal for: {tier.idealFor}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
                    <span className="text-[10px] font-mono uppercase tracking-ultra text-foreground-subtle block mb-2">
                      Included Deliverables:
                    </span>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-foreground-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-amber shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    to={`/contact?service=${encodeURIComponent(tier.recommendedService)}`}
                    className={`w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                      tier.popular
                        ? 'bg-brand-amber text-background hover:bg-brand-amberHover shadow-lg shadow-brand-amber/20'
                        : 'surface-card text-foreground hover:border-brand-amber/50 hover:text-brand-amber'
                    }`}
                  >
                    <span>Request Commission</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="bracket-tl" />
                <div className="bracket-br" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. PRESS-READY GUARANTEE */}
      <section className="py-24">
        <div className="p-10 sm:p-14 rounded-3xl surface-card spotlight-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-brand-amber font-mono text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>TECHNICAL EXCELLENCE GUARANTEE</span>
              </div>
              <h3 className="font-editorial text-3xl font-medium text-foreground">
                100% Press-Ready & Vector Standards
              </h3>
              <p className="text-foreground-muted text-sm sm:text-base leading-relaxed font-light">
                We eliminate costly printer rejections. Every file pack includes clean spot color separations, Pantone matching, accurate 3mm+ bleeds, trimmed die-lines, and infinite-resolution master SVG/EPS/AI vector files.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link to="/contact" className="btn-amber">
                Discuss Your Specifications <ArrowRight className="w-3.5 h-3.5" />
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


