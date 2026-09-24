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
import { ABOUT_CONTENT, STUDIO_INFO, CREATIVE_PROCESS, STATS, PRODUCTION_TEAM } from '../data/content';
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

const TOOL_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  PenTool: { icon: PenTool, color: 'text-amber-400' },
  Palette: { icon: Palette, color: 'text-sky-400' },
  BookOpen: { icon: BookOpen, color: 'text-rose-400' },
  Camera: { icon: Camera, color: 'text-cyan-400' },
  Printer: { icon: Printer, color: 'text-emerald-400' },
  Layers: { icon: Layers, color: 'text-orange-400' },
  Sliders: { icon: Sliders, color: 'text-violet-400' },
  Compass: { icon: Compass, color: 'text-blue-400' },
  Cpu: { icon: Cpu, color: 'text-teal-400' },
  Feather: { icon: Feather, color: 'text-pink-400' },
};

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
    <div className="pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-10">
      {/* 1. HERO / INTRO */}
      <section className={`${ABOUT_CONTENT.sectionVisibility.hero === false ? 'hidden ' : ''}mb-24`}>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-amber/10 border border-brand-amber/20 text-[0.6rem] font-mono tracking-[0.5em] uppercase text-brand-amber mb-6">
            <span>ABOUT US</span>
          </div>
        </ScrollReveal>

        <h1 className="text-display-xl uppercase text-foreground leading-[0.98] max-w-4xl mb-8">
          {ABOUT_CONTENT.heading}
        </h1>

        <div className="space-y-6 text-foreground-muted text-base sm:text-lg max-w-4xl leading-relaxed font-light whitespace-pre-line">
          {ABOUT_CONTENT.introduction}
        </div>
      </section>

      {/* 2. FOUNDER DEEP DIVE */}
      <section className={`${ABOUT_CONTENT.sectionVisibility.story === false ? 'hidden ' : ''}py-20 border-y border-white/[0.05]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual Column / Founder Slot */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative aspect-[4/5] rounded-3xl surface-card overflow-hidden group spotlight-card border border-white/10 shadow-2xl">
                {/* Full Bleed Image Filling the Entire Box Edge-to-Edge */}
                <img
                  src={ABOUT_CONTENT.founderImage}
                  alt="Joozz Designing — Studio Workspace & Setup"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="bracket-tl z-20" />
                <div className="bracket-br z-20" />
              </div>
            </ScrollReveal>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3">
                {ABOUT_CONTENT.storyEyebrow}
              </span>
              <h2 className="text-display-lg uppercase font-thin text-foreground">
                {ABOUT_CONTENT.storyHeading}
              </h2>
            </div>

            <div className="space-y-4 text-foreground-muted text-base leading-relaxed font-light">
              {ABOUT_CONTENT.storyParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-2xl surface-card spotlight-card">
                <Layers className="w-5 h-5 text-brand-amber mb-3" />
                <h4 className="font-semibold text-sm text-foreground mb-1 font-editorial">{ABOUT_CONTENT.storyPillars[0]?.title}</h4>
                <p className="text-xs text-foreground-muted leading-relaxed">{ABOUT_CONTENT.storyPillars[0]?.description}</p>
              </div>
              <div className="p-6 rounded-2xl surface-card spotlight-card">
                <Award className="w-5 h-5 text-brand-coral mb-3" />
                <h4 className="font-semibold text-sm text-foreground mb-1 font-editorial">{ABOUT_CONTENT.storyPillars[1]?.title}</h4>
                <p className="text-xs text-foreground-muted leading-relaxed">{ABOUT_CONTENT.storyPillars[1]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN MANIFESTO */}
      <section className={`${ABOUT_CONTENT.sectionVisibility.manifesto === false ? 'hidden ' : ''}py-28`}>
        <div className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
            {ABOUT_CONTENT.manifestoEyebrow}
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            {ABOUT_CONTENT.manifestoHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_CONTENT.manifestoPoints.map((point, idx) => (
            <ScrollReveal key={point.number} direction="up" delay={idx * 0.08}>
              <div className="p-8 rounded-2xl surface-card spotlight-card h-full flex flex-col justify-between group">
                <div>
                  <span className="font-mono text-xs text-brand-amber font-semibold block mb-4">
                    PRINCIPLE {point.number}
                  </span>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-3 group-hover:text-brand-amber transition-colors">
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
      <section className={`${ABOUT_CONTENT.sectionVisibility.tools === false ? 'hidden ' : ''}py-24 border-y border-white/[0.05]`}>
        <div className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
            {ABOUT_CONTENT.toolsEyebrow}
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            {ABOUT_CONTENT.toolsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_CONTENT.tools.map((tool, idx) => {
            const iconChoice = TOOL_ICON_MAP[tool.iconName] || TOOLS_OF_CRAFT[idx] || TOOL_ICON_MAP.PenTool;
            const Icon = iconChoice.icon;
            const color = iconChoice.color;
            return (
              <ScrollReveal key={tool.name} direction="up" delay={idx * 0.07}>
                <div className="p-7 rounded-2xl surface-card spotlight-card space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle">
                      Craft Standard
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base uppercase tracking-wide text-foreground group-hover:text-brand-amber transition-colors">
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

      {/* 5. FOUR-STEP PROCESS */}
      <section className={`${ABOUT_CONTENT.sectionVisibility.process === false ? 'hidden ' : ''}py-24 border-t border-white/[0.05]`}>
        <div className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
            {ABOUT_CONTENT.processEyebrow}
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            {ABOUT_CONTENT.processHeading}
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
                  <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wider text-foreground mb-3 group-hover:text-brand-amber transition-colors">
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
      <section className={`${ABOUT_CONTENT.sectionVisibility.locations === false ? 'hidden ' : ''}py-20 border-t border-white/[0.05]`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl surface-card spotlight-card">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber block mb-3">
              {ABOUT_CONTENT.locationPrimaryLabel}
            </span>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider text-foreground mb-2">{ABOUT_CONTENT.locationPrimaryHeading}</h4>
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
              {ABOUT_CONTENT.locationSecondaryLabel}
            </span>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider text-foreground mb-2">{ABOUT_CONTENT.locationSecondaryHeading}</h4>
            <p className="text-xs text-foreground-muted font-mono leading-relaxed mb-4">
              {ABOUT_CONTENT.locationSecondaryDescription}
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

      {/* 7. PRODUCTION TEAM (The People) */}
      <section className={`${ABOUT_CONTENT.sectionVisibility.team === false ? 'hidden ' : ''}py-24 sm:py-32 border-t border-white/[0.05]`}>
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="up">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.45em] text-brand-amber block mb-3 font-semibold">
              {ABOUT_CONTENT.teamEyebrow}
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-display-xl uppercase text-foreground leading-tight tracking-wide">
              {ABOUT_CONTENT.teamHeading}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light mt-4">
              {ABOUT_CONTENT.teamDescription}
            </p>
          </ScrollReveal>
        </div>

        {/* 5-Member Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {PRODUCTION_TEAM.filter((member) => member.visible !== false).map((member, idx) => (
            <ScrollReveal key={member.name} direction="up" delay={idx * 0.08}>
              <div className="group relative rounded-2xl bg-[#0d0d10] border border-white/[0.08] hover:border-brand-amber/40 transition-all duration-500 overflow-hidden flex flex-col items-center shadow-xl">
                {/* Portrait container */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-black/60 relative flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                </div>

                {/* Name Label Bar */}
                <div className="w-full py-3.5 sm:py-4 px-2 bg-[#08080a] border-t border-white/[0.06] text-center">
                  <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-[0.2em] text-foreground group-hover:text-brand-amber transition-colors duration-300">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="mt-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.14em] text-foreground-muted">
                      {member.role}
                    </p>
                  )}
                </div>

                {/* Corner brackets */}
                <div className="bracket-tl" />
                <div className="bracket-br" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${ABOUT_CONTENT.sectionVisibility.finalCta === false ? 'hidden ' : ''}pt-20 text-center space-y-6`}>
        <h2 className="text-display-lg uppercase font-thin text-foreground">
          {ABOUT_CONTENT.finalHeading}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <Link to="/contact" className="btn-amber">
            {ABOUT_CONTENT.finalPrimaryText} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/portfolio" className="btn-outline">
            {ABOUT_CONTENT.finalSecondaryText}
          </Link>
        </div>
      </section>
    </div>
  );
};

