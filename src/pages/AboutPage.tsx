import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  User,
  CheckCircle2,
  MapPin,
  Award,
  Layers,
  Sparkles,
  Phone,
  Mail,
  PenTool,
  Sliders,
  Compass,
  Cpu,
  Feather,
  Palette,
  Printer,
  Camera,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { STUDIO_INFO, CREATIVE_PROCESS, STATS } from '../data/content';
import { InteractiveTypePlayground } from '../components/ui/InteractiveTypePlayground';
import { ScrollReveal } from '../components/animations/ScrollReveal';

const TOOLS_OF_CRAFT = [
  {
    name: 'Adobe Illustrator',
    role: 'Vector Identity & Typography',
    description: 'Precision bezier curve construction, custom letterform drafting, and infinite-resolution logo systems.',
    icon: PenTool,
    color: 'text-amber-400'
  },
  {
    name: 'Adobe Photoshop',
    role: 'Art Direction & Retouching',
    description: 'High-end color grading, photographic composites, texture generation, and editorial mockups.',
    icon: Palette,
    color: 'text-sky-400'
  },
  {
    name: 'Adobe InDesign',
    role: 'Publication & Editorial Grid',
    description: 'Master pages, strict Swiss grid systems, paragraph styling, and press-ready book/magazine imposition.',
    icon: BookOpen,
    color: 'text-rose-400'
  },
  {
    name: 'Adobe Lightroom',
    role: 'Fashion & Campaign Grading',
    description: 'Tonal calibration, editorial lookbook styling, and consistent campaign palette development.',
    icon: Camera,
    color: 'text-cyan-400'
  },
  {
    name: 'Prepress Color Standards',
    role: 'CMYK & Pantone Precision',
    description: 'Spot color separations, bleed calibrations, die-line creation, and commercial printer coordination.',
    icon: Printer,
    color: 'text-emerald-400'
  },
  {
    name: 'Tactile Print Finishes',
    role: 'Material & Paper Engineering',
    description: 'Embossing, debossing, hot foil stamping, spot UV varnish, and heavy cotton/linen paper stock curation.',
    icon: Layers,
    color: 'text-orange-400'
  }
];

const MANIFESTO_POINTS = [
  {
    number: '01',
    title: 'Craft Over Templates',
    description: 'We never recycle off-the-shelf templates or generic presets. Every mark, layout, and color swatch is conceived uniquely for your brand narrative.'
  },
  {
    number: '02',
    title: 'Typography as Voice',
    description: 'Typography is not just textâ€”it is the voice and posture of your business. We obsess over kerning, line-height, hierarchy, and optical balance.'
  },
  {
    number: '03',
    title: 'Longevity Over Micro-Trends',
    description: 'Design should endure. We construct identities that look fresh on day one and remain distinguished a decade later.'
  },
  {
    number: '04',
    title: 'Flawless Physical Execution',
    description: 'A great concept is useless if it fails at the press. We guarantee zero errors across resolution, CMYK separations, and die-cuts.'
  }
];

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-8 sm:px-10">
      {/* 1. HERO / INTRO */}
      <section className="mb-24">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-amber/10 border border-brand-amber/20 text-[0.6rem] font-mono tracking-[0.5em] uppercase text-brand-amber mb-6">
            <span>ABOUT US</span>
          </div>
        </ScrollReveal>

        <h1 className="text-display-xl uppercase text-foreground leading-[0.98] max-w-4xl mb-8">
          ABOUT <span className="text-gradient-gold">US</span>
        </h1>

        <div className="space-y-6 text-foreground-muted text-base sm:text-lg max-w-4xl leading-relaxed font-light">
          <p>
            <strong className="text-foreground font-semibold">Joozz Designing</strong> is a creative graphic design studio dedicated to building strong and memorable visual identities. With over 14 years of professional experience, we specialise in logo design, branding, and high-quality print and digital design solutions.
          </p>
          <p>
            We create thoughtful, original designs that help businesses stand out and communicate their message clearly. Our services include logo design, brand identity, magazines, brochures, business cards, posters, and other marketing materials—crafted with creativity, precision, and attention to detail.
          </p>
          <p>
            At Joozz Designing, we believe great design is more than just visuals; it's about telling your story, connecting with your audience, and leaving a lasting impression.
          </p>
        </div>
      </section>

      {/* 2. FOUNDER DEEP DIVE */}
      <section className="py-20 border-y border-white/[0.05]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual Column / Founder Slot */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative aspect-[4/5] rounded-3xl surface-card p-10 text-center flex flex-col items-center justify-center group overflow-hidden spotlight-card">
                <div className="w-24 h-24 rounded-2xl bg-surface-2 border border-brand-amber/30 text-brand-amber flex items-center justify-center mb-6 shadow-inner">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="font-editorial text-2xl text-foreground font-semibold mb-1">
                  {STUDIO_INFO.founder}
                </h3>
                <p className="text-xs uppercase font-mono tracking-widest text-brand-amber mb-4">
                  Founder & Principal Designer
                </p>
                <div className="px-3.5 py-1.5 bg-black/50 rounded-full border border-white/5 text-[11px] font-mono text-foreground-subtle">
                  Creative Direction & Visual Systems
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 w-full flex items-center justify-between text-xs text-foreground-muted">
                  <span className="flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-brand-coral" /> Chelmsford, Essex, UK
                  </span>
                  <span className="font-mono text-brand-amber">14+ Yrs Exp</span>
                </div>

                <div className="bracket-tl" />
                <div className="bracket-br" />
              </div>
            </ScrollReveal>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3">
                01 // THE STORY
              </span>
              <h2 className="text-display-lg uppercase font-thin text-foreground">
                14+ Years of <span className="text-gradient-gold">Design Craft & Purpose.</span>
              </h2>
            </div>

            <div className="space-y-4 text-foreground-muted text-base leading-relaxed font-light">
              <p>
                With over 14 years of dedicated industry experience, Joozz Designing has partnered with ambitious businesses, founders, and enterprises across the United Kingdom and globally to shape powerful brand narratives.
              </p>
              <p>
                From initial custom logo concepts and corporate branding to complex magazine layouts, packaging, and digital marketing visuals, every project is crafted with creativity, precision, and relentless attention to detail.
              </p>
              <p>
                Working across the industry-standard Adobe Creative Suite, we ensure every deliverable bridges digital vibrancy with flawless prepress production.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-2xl surface-card spotlight-card">
                <Layers className="w-5 h-5 text-brand-amber mb-3" />
                <h4 className="font-semibold text-sm text-foreground mb-1 font-editorial">No Middle Management</h4>
                <p className="text-xs text-foreground-muted leading-relaxed">Direct collaboration with the principal designer from discovery to delivery.</p>
              </div>
              <div className="p-6 rounded-2xl surface-card spotlight-card">
                <Award className="w-5 h-5 text-brand-coral mb-3" />
                <h4 className="font-semibold text-sm text-foreground mb-1 font-editorial">Press-Ready Precision</h4>
                <p className="text-xs text-foreground-muted leading-relaxed">Flawless color separation, bleeds, and vector master deliverables.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN MANIFESTO */}
      <section className="py-28">
        <div className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
            02 // DESIGN MANIFESTO
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            The core principles that <span className="italic text-gradient-gold">guide our studio.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MANIFESTO_POINTS.map((point, idx) => (
            <ScrollReveal key={point.number} direction="up" delay={idx * 0.08}>
              <div className="p-8 rounded-2xl surface-card spotlight-card h-full flex flex-col justify-between group">
                <div>
                  <span className="font-mono text-xs text-brand-amber font-semibold block mb-4">
                    // PRINCIPLE {point.number}
                  </span>
                  <h3 className="font-editorial text-xl font-medium text-foreground mb-3 group-hover:text-brand-amber transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                    {point.description}
                  </p>
                </div>
                <div className="bracket-tl" />
                <div className="bracket-br" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. TOOLS OF CRAFT */}
      <section className="py-24 border-y border-white/[0.05]">
        <div className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
            03 // TOOLS OF THE TRADE
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            Deep mastery in <span className="italic text-gradient-gold">Adobe Creative Suite & prepress.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_OF_CRAFT.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <ScrollReveal key={tool.name} direction="up" delay={idx * 0.07}>
                <div className="p-7 rounded-2xl surface-card spotlight-card space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${tool.color}`} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle">
                      Craft Standard
                    </span>
                  </div>
                  <h4 className="font-editorial text-lg font-medium text-foreground group-hover:text-brand-amber transition-colors">
                    {tool.name}
                  </h4>
                  <span className="text-xs font-mono text-brand-amber block">
                    {tool.role}
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed font-light">
                    {tool.description}
                  </p>
                  <div className="bracket-tl" />
                  <div className="bracket-br" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4.5 INTERACTIVE TYPE LABORATORY */}
      <section className="py-24">
        <InteractiveTypePlayground />
      </section>

      {/* 5. FOUR-STEP PROCESS */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
            04 // CREATIVE PROCESS
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            From initial spark to <span className="italic text-gradient-gold">press-ready delivery.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATIVE_PROCESS.map((proc, idx) => (
            <ScrollReveal key={proc.number} direction="up" delay={idx * 0.08}>
              <div className="p-8 rounded-2xl surface-card spotlight-card h-full flex flex-col justify-between group">
                <div>
                  <span className="font-mono text-xs text-brand-amber font-semibold block mb-4">
                    PHASE {proc.number}
                  </span>
                  <h3 className="font-editorial text-2xl font-medium text-foreground mb-3 group-hover:text-brand-amber transition-colors">
                    {proc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light mb-6">
                    {proc.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-brand-amber">
                  Outcome: {proc.deliverables.join(', ')}
                </div>
                <div className="bracket-tl" />
                <div className="bracket-br" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. STUDIO LOCATION HUBS */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl surface-card spotlight-card">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
              Principal Studio Hub
            </span>
            <h4 className="font-editorial text-xl font-medium text-foreground mb-2">Chelmsford, Essex & London</h4>
            <p className="text-xs text-foreground-muted font-mono leading-relaxed mb-4">
              {STUDIO_INFO.registeredOffice}
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-brand-amber">
              <Phone className="w-3.5 h-3.5" />
              <span>{STUDIO_INFO.phoneUK}</span>
            </div>
            <div className="bracket-tl" />
            <div className="bracket-br" />
          </div>

          <div className="p-8 rounded-2xl surface-card spotlight-card">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
              International Line
            </span>
            <h4 className="font-editorial text-xl font-medium text-foreground mb-2">India Coordination Office</h4>
            <p className="text-xs text-foreground-muted font-mono leading-relaxed mb-4">
              Direct remote line for overseas commissions and agile production cycles.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-brand-amber">
              <Phone className="w-3.5 h-3.5" />
              <span>{STUDIO_INFO.phoneIndia}</span>
            </div>
            <div className="bracket-tl" />
            <div className="bracket-br" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-20 text-center space-y-6">
        <h2 className="text-display-lg uppercase font-thin text-foreground">
          Ready to elevate your brand with <span className="text-gradient-gold">Prince Srileenj Lopez</span>?
        </h2>
        <div className="flex justify-center gap-4">
          <Link to="/contact" className="btn-amber">
            Inquire for Availability <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/portfolio" className="btn-outline">
            Browse Archive
          </Link>
        </div>
      </section>
    </div>
  );
};

