import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, ArrowRight, Quote, ChevronDown } from 'lucide-react';
import { STUDIO_INFO, CORE_SERVICES, STATS, PORTFOLIO_ITEMS, TESTIMONIAL } from '../data/content';
import { Marquee } from '../components/ui/Marquee';
import { ServiceCard } from '../components/ui/ServiceCard';
import { StatCard } from '../components/ui/StatCard';
import { LightboxModal } from '../components/ui/LightboxModal';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { HeroDesignShowcaseBg } from '../components/ui/HeroDesignShowcaseBg';
import { PortfolioItem } from '../types';

// â”€â”€â”€ Animated counter hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// â”€â”€â”€ Large Hero Headline with stagger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const HeroTitle: React.FC = () => {
  const lines = [
    { text: 'WE DESIGN', gold: false },
    { text: 'WITH PURPOSE', gold: false, highlight: 'PURPOSE' },
    { text: '& PRECISION.', gold: false },
  ];

  return (
    <div className="overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.6 + i * 0.15,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <span
              className="block text-foreground uppercase leading-[0.95]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', letterSpacing: '0.08em' }}
            >
              {line.highlight ? (
                <>
                  WITH{' '}<span className="text-gradient-gold">PURPOSE</span>
                </>
              ) : (
                line.text
              )}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
};


// â”€â”€â”€ Animated stat block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const AnimStat: React.FC<{
  value: string;
  label: string;
  index: number;
}> = ({ value, label, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const numericPart = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[\d]/g, '');
  const count = useCounter(numericPart, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group border-t border-white/10 pt-6 flex flex-col justify-between gap-2 h-full"
    >
      <div className="text-stat text-gradient-gold">
        <span>{inView ? count : 0}</span>
        <span className="text-brand-amber text-[0.85em] ml-0.5">{suffix}</span>
      </div>
      <div className="text-xs font-mono uppercase tracking-widest text-foreground-subtle group-hover:text-foreground-muted transition-colors leading-relaxed">
        {label}
      </div>
    </motion.div>
  );
};

export const HomePage: React.FC = () => {
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const portfolioPreview = PORTFOLIO_ITEMS.slice(0, 6);

  return (
    <div className="relative overflow-hidden">

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 1: HERO (full-viewport cinematic)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden">
        {/* User Curated Video Backgrounds with Crossfade Transitions */}
        <HeroDesignShowcaseBg />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden no-select pointer-none">
          <span className="text-[22vw] font-display font-extrabold uppercase text-white/[0.022] tracking-[0.04em] whitespace-nowrap">
            JOOZZ
          </span>
        </div>


        {/* Hero headline block (shifted down) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 sm:px-10 pt-36 sm:pt-44 pb-20 flex-grow flex flex-col justify-center">
          <HeroTitle />

          {/* Hero sub-text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-8"
          >
            <div className="text-[0.6rem] tracking-[0.5em] text-brand-amber uppercase mb-3 font-mono">
              Joozz Designing Studio
            </div>
            <p className="max-w-xs text-xs sm:text-sm text-foreground-muted font-light leading-relaxed">
              Boutique graphic design studio by{' '}
              <span className="text-foreground font-medium">Prince Srileenj Lopez</span>.
              Crafting distinctive brand identities, editorial layouts, and press-ready print media.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/portfolio" className="btn-amber">
              View Work <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Start a Project
            </Link>
          </motion.div>
        </div>

        {/* Bottom tag row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="relative z-10 max-w-7xl mx-auto w-full px-8 sm:px-10 pb-8"
        >
          <div className="border-t border-white/5 pt-6 grid grid-cols-3 md:grid-cols-6 gap-4 text-[0.6rem] font-mono text-foreground-subtle">
            {['Brand Identity', 'Brochure Design', 'Business Cards', 'Magazine Layout', 'Print Media', 'Photography'].map((s, i) => (
              <span key={i} className="uppercase tracking-[0.4em] truncate">/ {s}</span>
            ))}
          </div>
        </motion.div>

      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 2: DUAL MARQUEE TICKER (BTB style)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <Marquee className="my-0 border-y border-white/[0.04]" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 3: ABOUT TEASER â€” Two-col asymmetric
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-28 sm:py-36 max-w-7xl mx-auto px-8 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: large editorial number + label */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <ScrollReveal direction="up">
              <div className="text-[8rem] font-display font-extrabold leading-none text-outline-gold no-select opacity-30">
                01
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber">
                About
              </span>
            </ScrollReveal>
          </div>

          {/* Right: body text + CTA */}
          <div className="lg:col-span-9">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-display-xl text-foreground font-thin font-editorial mb-8">
                Independent craft<br />
                <span className="italic text-gradient-gold">with direct collaboration.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-foreground-muted text-sm leading-relaxed max-w-2xl mb-10">
                {STUDIO_INFO.founderBio}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <Link to="/about" className="btn-amber">
                  Discover the Studio <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <div className="flex items-center gap-3 text-xs text-foreground-subtle font-mono">
                  <span className="w-8 h-px bg-white/20" />
                  <span className="tracking-wider">ADOBE ILLUSTRATOR • PHOTOSHOP • INDESIGN</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ———————————————————————————————————————————————————————— 
          SECTION 4: AWWWARDS-STYLE STAT COUNTERS
          ————————————————————————————————————————————————————————  */}
      <section className="py-20 border-y border-white/[0.04] bg-surface-1 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(232,166,76,0.06),transparent_60%)] pointer-none" />

        <div className="max-w-7xl mx-auto px-8 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: '14+', label: 'Years of Craft' },
              { value: '300+', label: 'Brand Identities' },
              { value: '100%', label: 'Press-Ready Output' },
              { value: '6', label: 'Design Disciplines' },
            ].map((s, i) => (
              <AnimStat key={i} value={s.value} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 5: SERVICES GRID (numbered disciplines)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-28 sm:py-36 max-w-7xl mx-auto px-8 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <ScrollReveal direction="up">
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-4">
                03 Core Disciplines
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-display-xl uppercase text-foreground">
                End-to-end design &<br />
                <span className="italic text-gradient-gold">press production.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.2}>
            <Link to="/services" className="btn-outline shrink-0">
              All 6 Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 6: PORTFOLIO PREVIEW (Awwwards gallery grid)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-28 sm:py-36 bg-surface-1 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-8 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <ScrollReveal direction="up">
                <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-4">
                  04 Selected Works
                </span>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-display-xl uppercase text-foreground">
                  Selected identity &<br />
                  <span className="italic text-gradient-gold">editorial projects.</span>
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="up" delay={0.2}>
              <Link to="/portfolio" className="btn-amber shrink-0">
                View Full Archive <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Awwwards masonry-inspired grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioPreview.map((item, idx) => (
              <ScrollReveal key={item.id} direction="up" delay={idx * 0.07}>
                <div
                  data-cursor="view"
                  onClick={() => setActiveModalItem(item)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden surface-card spotlight-card"
                >
                  {/* Visual block */}
                  <div className={`aspect-[4/3] bg-gradient-to-br ${item.imagePlaceholderColor} relative overflow-hidden`}>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                        loading="lazy"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 delay-100 transform translate-y-3 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-amber text-background text-[11px] font-mono font-semibold uppercase tracking-widest shadow-xl">
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-brand-amber border border-white/10 shadow-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-5 flex items-center justify-between bg-surface-1">
                    <div>
                      <h4 className="font-editorial text-base font-medium text-foreground group-hover:text-brand-amber transition-colors duration-300">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-mono text-foreground-subtle">{item.year}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-foreground-muted group-hover:border-brand-amber/50 group-hover:text-brand-amber transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="bracket-tl" />
                  <div className="bracket-br" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 7: LARGE PULL-QUOTE (Awwwards style)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-28 sm:py-40 max-w-7xl mx-auto px-8 sm:px-10">
        <ScrollReveal direction="up">
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="text-[6rem] font-editorial text-brand-amber/10 leading-none absolute -top-8 left-0 no-select">
              &ldquo;
            </div>
            <blockquote className="font-editorial text-display-lg italic text-foreground leading-snug">
              {TESTIMONIAL.quote}
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-4 text-sm text-foreground-muted">
              <span className="w-8 h-px bg-brand-amber/40" />
              <span className="font-medium text-foreground">{TESTIMONIAL.attribution}</span>
              <span>â€”</span>
              <span className="font-mono text-brand-amber text-xs">{TESTIMONIAL.role}</span>
              <span className="w-8 h-px bg-brand-amber/40" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 8: CTA BAND (full-width bold)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-surface-1 border-t border-white/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,166,76,0.07),transparent_70%)] pointer-none" />
        <div className="absolute inset-0 dot-grid opacity-40 pointer-none" />

        {/* Giant BG text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden no-select pointer-none">
          <span className="text-[18vw] font-display font-extrabold uppercase text-white/[0.025] tracking-tight whitespace-nowrap">
            LET'S BUILD
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-10 text-center space-y-8">
          <ScrollReveal direction="up">
            <span className="text-[0.6rem] font-mono tracking-[0.5em] text-brand-amber uppercase">
              Have a Project in Mind?
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-display-xl uppercase text-foreground">
              Let's create something<br />
              <span className="text-gradient-gold">unforgettable</span> together.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-foreground-muted text-sm max-w-lg mx-auto leading-relaxed">
              Direct access to Prince Srileenj Lopez. Fast turnarounds, bespoke craftsmanship, and guaranteed press-ready excellence.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/contact" className="btn-amber">
                Request a Proposal <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a href={`mailto:${STUDIO_INFO.email}`} className="btn-outline">
                Email Directly
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <LightboxModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />
    </div>
  );
};

