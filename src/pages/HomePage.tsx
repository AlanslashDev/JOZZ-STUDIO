import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, ArrowRight, Quote, ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_INFO, CORE_SERVICES, STATS, PORTFOLIO_ITEMS, TESTIMONIAL, CLIENT_REVIEWS } from '../data/content';
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
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const portfolioPreview = PORTFOLIO_ITEMS.slice(0, 6);

  const totalReviewPages = Math.ceil(CLIENT_REVIEWS.length / 2);

  // Auto-slide reviews every 5.5s unless paused
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentReviewIdx((prev) => (prev + 1) % totalReviewPages);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, totalReviewPages]);

  const nextReview = () => {
    setIsAutoPlay(false);
    setCurrentReviewIdx((prev) => (prev + 1) % totalReviewPages);
  };

  const prevReview = () => {
    setIsAutoPlay(false);
    setCurrentReviewIdx((prev) => (prev - 1 + totalReviewPages) % totalReviewPages);
  };

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
              Boutique graphic design studio crafting distinctive brand identities, editorial layouts, and press-ready print media.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link 
              to="/portfolio" 
              className="btn-amber text-[10px] sm:text-xs py-2 sm:py-2.5 px-5 sm:px-6 whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>VIEW WORK</span> <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
            <Link 
              to="/contact" 
              className="btn-outline text-[10px] sm:text-xs py-2 sm:py-2.5 px-5 sm:px-6 whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>START A PROJECT</span>
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
            {['Brand Identity', 'Brochure Design', 'Business Cards', 'Magazine Layout', 'Print Media', 'Reels / Motion'].map((s, i) => (
              <span key={i} className="uppercase tracking-[0.4em] truncate">• {s}</span>
            ))}
          </div>
        </motion.div>

      </section>

      {/* ──────────────────────────────────────────────────────────────────────── 
          SECTION 2: DUAL MARQUEE TICKER (BTB style)
          ────────────────────────────────────────────────────────────────────────  */}
      <Marquee className="my-0 border-y border-white/[0.04]" />

      {/* ──────────────────────────────────────────────────────── 
          FEATURED REEL HERO BLOCK (Our Work in Motion)
          ────────────────────────────────────────────────────────  */}
      <section className="relative py-16 sm:py-24 bg-[#050507] border-y border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-surface-1 spotlight-card">
            {/* Background Reel Video / Fallback Poster */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[340px] sm:min-h-[460px] overflow-hidden bg-black flex items-center justify-center">
              {/* TODO(client): provide compressed .mp4 (H.264, under ~20MB) or embed link for Featured Home Reel */}
              <video
                src="/5092427-hd_1920_1080_30fps - Trim.mp4"
                poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover brightness-75 scale-105"
              />

              {/* Dark Cine Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-black/40 to-black/60 z-10" />

              {/* Content Overlay */}
              <div className="relative z-20 max-w-2xl text-center px-6 py-10 flex flex-col items-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-amber/15 border border-brand-amber/30 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-brand-amber mb-4 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-brand-amber animate-ping" />
                  Kinetic Showcase
                </span>

                <h2 className="text-display-xl uppercase text-foreground leading-tight tracking-[0.04em] mb-4">
                  Our Work in <span className="text-gradient-gold italic">Motion.</span>
                </h2>

                <p className="text-xs sm:text-sm text-foreground-muted max-w-lg leading-relaxed font-light mb-8">
                  From dynamic logo reveals to high-energy editorial lookbooks—bringing brand stories to life with cinematic pacing and precision.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4">
                  <Link
                    to="/portfolio?filter=reel"
                    className="btn-amber text-xs tracking-[0.18em]"
                  >
                    See Full Portfolio <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Decorative brackets */}
              <div className="bracket-tl z-20" />
              <div className="bracket-br z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── 
          SECTION 3: ABOUT TEASER — Two-col asymmetric
          ────────────────────────────────────────────────────────────────────────  */}
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
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-brand-amber font-semibold">
                ABOUT
              </span>
            </ScrollReveal>
          </div>

          {/* Right: body text + CTA */}
          <div className="lg:col-span-9">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-hero uppercase text-foreground leading-[0.92] mb-8 tracking-tight">
                INDEPENDENT CRAFT<br />
                <span className="italic text-gradient-gold">WITH DIRECT COLLABORATION.</span>
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

      {/* ──────────────────────────────────────────────────────── 
          SECTION 3.5: WHY CHOOSE JOOZZ DESIGNING (Trust & Excellence Grid)
          ────────────────────────────────────────────────────────  */}
      <section className="py-20 sm:py-28 bg-[#09090c] border-t border-white/[0.04] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="mb-12 sm:mb-16 max-w-3xl">
            <ScrollReveal direction="up">
              <span className="text-[0.6rem] sm:text-[0.65rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3">
                02 Why Choose Us
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-display-xl uppercase text-foreground leading-[0.98]">
                WHY CHOOSE <br />
                <span className="italic text-gradient-gold">JOOZZ DESIGNING?</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-foreground-muted text-sm sm:text-base leading-relaxed mt-4 font-light max-w-2xl">
                14+ years of professional design experience with a creative, reliable, and client-focused approach. We deliver high-quality designs with quick turnaround tailored to your business goals.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                num: '01',
                title: '14+ Years Experience',
                desc: 'Over a decade of mastering typography, branding systems, and prepress standards across global industries.',
              },
              {
                num: '02',
                title: 'Client-Centric Craft',
                desc: 'Direct collaboration with the principal designer from discovery to delivery without layers of middle management.',
              },
              {
                num: '03',
                title: 'Quick Turnaround',
                desc: 'Fast, dependable production cycles tailored to tight marketing launches and commercial print deadlines.',
              },
              {
                num: '04',
                title: 'Press-Ready Precision',
                desc: 'Zero printer rejections. Flawless CMYK spot color separations, bleed precision, and infinite-resolution vectors.',
              },
            ].map((feature, idx) => (
              <ScrollReveal key={feature.num} direction="up" delay={idx * 0.08}>
                <div className="p-7 rounded-2xl surface-card spotlight-card h-full flex flex-col justify-between group">
                  <div>
                    <span className="font-mono text-xs text-brand-amber font-semibold block mb-4">
                      {feature.num}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-foreground mb-3 group-hover:text-brand-amber transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-foreground-muted leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="bracket-tl" />
                  <div className="bracket-br" />
                </div>
              </ScrollReveal>
            ))}
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
              { value: '5', label: 'Design Disciplines' },
            ].map((s, i) => (
              <AnimStat key={i} value={s.value} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 5: SERVICES GRID (numbered disciplines)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto px-5 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <ScrollReveal direction="up">
              <span className="text-[0.6rem] sm:text-[0.65rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3 sm:mb-4">
                03 Core Disciplines
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-display-xl uppercase text-foreground leading-[0.95]">
                End-to-end design &<br />
                <span className="italic text-gradient-gold">press production.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.2}>
            <Link to="/services" className="btn-outline shrink-0 w-fit inline-flex items-center gap-2">
              All 5 Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
                      <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-foreground group-hover:text-brand-amber transition-colors duration-300 leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-mono text-foreground-subtle">{item.year}</span>
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

      {/* ──────────────────────────────────────────────────────────────────────── 
          SECTION 7: CLIENT REVIEWS & ENDORSEMENTS (Interactive Slider)
          ────────────────────────────────────────────────────────────────────────  */}
      <section className="py-24 sm:py-32 bg-[#09090c] border-y border-white/[0.05] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-amber/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
          {/* Section Header with Slider Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <ScrollReveal direction="up">
                <span className="text-[0.65rem] font-mono tracking-[0.45em] text-brand-amber uppercase block mb-3 font-semibold">
                  CLIENT ENDORSEMENTS
                </span>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-display-xl uppercase text-foreground leading-[0.98]">
                  WHAT FOUNDERS &<br />
                  <span className="text-gradient-gold">DIRECTORS SAY</span>
                </h2>
              </ScrollReveal>
            </div>

            <div className="flex items-center gap-4">
              <p className="hidden md:block text-xs text-foreground-muted max-w-xs font-light leading-relaxed text-right">
                Real feedback from brand founders & creative directors.
              </p>

              {/* Slider Arrow Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-amber/50 bg-surface-1 hover:bg-surface-2 text-foreground-muted hover:text-brand-amber transition-all duration-300 flex items-center justify-center group shadow-lg"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-amber/50 bg-surface-1 hover:bg-surface-2 text-foreground-muted hover:text-brand-amber transition-all duration-300 flex items-center justify-center group shadow-lg"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials Slider Track */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <motion.div
              className="flex transition-transform duration-700 ease-out"
              animate={{ transform: `translateX(-${currentReviewIdx * 100}%)` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Group reviews into 2-slide pages on desktop, 1 on mobile */}
              {Array.from({ length: Math.ceil(CLIENT_REVIEWS.length / 2) }).map((_, pageIdx) => {
                const pair = CLIENT_REVIEWS.slice(pageIdx * 2, pageIdx * 2 + 2);
                return (
                  <div key={pageIdx} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-1">
                    {pair.map((review) => (
                      <div
                        key={review.attribution}
                        className="p-8 sm:p-10 rounded-3xl bg-surface-1 border border-white/[0.08] hover:border-brand-amber/40 transition-all duration-500 flex flex-col justify-between spotlight-card shadow-2xl relative group min-h-[320px] sm:min-h-[340px]"
                      >
                        <div>
                          {/* 5-Star Rating & Quote Symbol */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-1 text-brand-amber">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
                              ))}
                            </div>
                            <span className="font-editorial text-3xl text-brand-amber/30 leading-none">&ldquo;</span>
                          </div>

                          {/* Review Quote */}
                          <p className="text-foreground/90 text-sm sm:text-base leading-relaxed font-light italic mb-8">
                            &ldquo;{review.quote}&rdquo;
                          </p>
                        </div>

                        {/* Client Info Bar */}
                        <div className="pt-6 border-t border-white/[0.06] flex items-center gap-4">
                          <img
                            src={review.avatar}
                            alt={review.attribution}
                            className="w-12 h-12 rounded-full object-cover grayscale contrast-125 border border-white/10 group-hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="flex flex-col">
                            <span className="font-display font-bold text-sm uppercase tracking-wider text-foreground group-hover:text-brand-amber transition-colors duration-300">
                              {review.attribution}
                            </span>
                            <span className="text-[11px] font-mono text-brand-amber font-medium">
                              {review.role}
                            </span>
                            <span className="text-[10px] font-mono text-foreground-subtle">
                              {review.company}
                            </span>
                          </div>
                        </div>

                        {/* Corner accents */}
                        <div className="bracket-tl" />
                        <div className="bracket-br" />
                      </div>
                    ))}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Slider Pagination Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {Array.from({ length: Math.ceil(CLIENT_REVIEWS.length / 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentReviewIdx(i);
                }}
                className={`transition-all duration-400 rounded-full ${
                  currentReviewIdx === i
                    ? 'w-8 h-2 bg-brand-amber'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 7: LARGE PULL-QUOTE (Awwwards style)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 sm:py-36 max-w-7xl mx-auto px-8 sm:px-10">
        <ScrollReveal direction="up">
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="text-[5rem] sm:text-[7rem] font-display text-brand-amber/15 leading-none absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 no-select pointer-events-none">
              &ldquo;
            </div>
            <blockquote className="text-display-lg sm:text-display-xl uppercase text-foreground leading-snug tracking-wide pt-4">
              "{TESTIMONIAL.quote}"
            </blockquote>
            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 text-xs sm:text-sm font-mono">
              <span className="w-8 sm:w-12 h-px bg-brand-amber/40" />
              <span className="text-foreground tracking-widest uppercase font-semibold">{TESTIMONIAL.attribution}</span>
              <span className="text-brand-amber">•</span>
              <span className="text-brand-amber uppercase tracking-wider">{TESTIMONIAL.role}</span>
              <span className="w-8 sm:w-12 h-px bg-brand-amber/40" />
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
              Direct collaboration with senior design expertise. Fast turnarounds, bespoke craftsmanship, and guaranteed press-ready excellence.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-4">
              <Link to="/contact" className="btn-amber">
                Request a Proposal <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a href={`mailto:${STUDIO_INFO.email}`} className="btn-outline">
                Direct Email
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

