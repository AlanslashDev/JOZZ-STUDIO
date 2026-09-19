import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Phone, Mail, Sparkles } from 'lucide-react';
import { CORE_SERVICES, STUDIO_INFO } from '../data/content';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const service = CORE_SERVICES.find((s) => s.id === serviceId) || CORE_SERVICES[0];

  const headlineTop = service.heroHeadlineTop || 'DISCIPLINE';

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* ─────────────────────────────────────────
          1. HERO SECTION (Beyond The Borders style)
          ───────────────────────────────────────── */}
      <section className="relative min-h-screen sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-5 sm:px-10 pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        {/* Hero background image */}
        {service.image && (
          <img
            src={service.image}
            alt={service.imageAlt || service.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20 scale-105"
          />
        )}
        {/* Dark gradient overlay over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/70 to-[#0a0a0a] z-0" />
        
        {/* Subtle radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-amber/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Large faint background watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none">
          <span className="text-[18vw] font-display font-black uppercase tracking-tight text-white whitespace-nowrap">
            {service.number} • {service.id.replace(/-/g, ' ')}
          </span>
        </div>

        {/* Hero Content — flex column with back button at top on mobile */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

          {/* Back Button — compact and left-aligned */}
          <div className="w-full flex justify-start mb-6 sm:mb-0 sm:absolute sm:top-0 sm:left-0">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-foreground-muted hover:text-brand-amber hover:border-brand-amber/40 transition-all duration-300 group"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Services</span>
            </button>
          </div>

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 sm:mb-6 mt-2 sm:mt-0"
          >
            <span className="text-[0.6rem] sm:text-[0.65rem] font-mono tracking-[0.4em] sm:tracking-[0.5em] text-brand-amber uppercase px-3.5 py-1.5 rounded-md bg-brand-amber/10 border border-brand-amber/20">
              {headlineTop}
            </span>
          </motion.div>

          {/* Bebas Neue Giant Dual-Color Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-display-xl uppercase text-foreground leading-[0.95] tracking-[0.06em] mb-6 sm:mb-8 text-center px-2"
          >
            {service.title.split(' ')[0]}{' '}
            <span className="text-gradient-gold">
              {service.title.split(' ').slice(1).join(' ') || service.title}
            </span>
          </motion.h1>

          {/* Descriptive Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base text-foreground-muted max-w-2xl leading-relaxed font-light mb-8 sm:mb-10 text-center px-2"
          >
            {service.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/contact" className="btn-amber text-xs tracking-[0.2em]">
              Start a Project <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom subtle divider line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ─────────────────────────────────────────
          2. 'WHAT WE OFFER' 6-CARD GRID (BTB Image 2)
          ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-32 max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <ScrollReveal direction="up">
            <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3">
              Scope of Capabilities
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-display-xl uppercase text-foreground leading-tight">
              WHAT WE <span className="text-gradient-gold">OFFER</span>
            </h2>
          </ScrollReveal>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-amber to-transparent mx-auto mt-4" />
        </div>

        {/* 6 What We Offer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {(service.whatWeOffer || []).map((offer, idx) => (
            <ScrollReveal key={offer.number} direction="up" delay={idx * 0.08}>
              <div className="relative group p-6 sm:p-8 rounded-2xl bg-[#0f0f12] border border-white/[0.06] hover:border-brand-amber/40 transition-all duration-500 flex flex-col justify-between h-full spotlight-card">
                {/* Top: Number badge */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-base sm:text-xl uppercase tracking-wider text-foreground group-hover:text-brand-amber transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <span className="font-mono text-xs text-brand-amber/40 group-hover:text-brand-amber font-semibold tracking-widest transition-colors duration-300">
                    {offer.number}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                  {offer.description}
                </p>

                {/* Hover bottom bar */}
                <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-amber to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Corner brackets */}
                <div className="bracket-tl" />
                <div className="bracket-br" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Deliverables checklist box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-3xl surface-card spotlight-card border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-2">
                Guaranteed Standard
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wider text-foreground">
                Core Deliverables
              </h3>
              <p className="text-xs text-foreground-muted mt-2 leading-relaxed">
                Every project includes full vector production master files, color-separated proofs, and direct technical printer coordination.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-surface-2 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  <span className="text-xs font-mono text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          3. 'READY TO BUILD / ELEVATE?' (BTB Image 3)
          ───────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-surface-1 border-t border-white/[0.06] text-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,166,76,0.08),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-10 space-y-5 sm:space-y-6">
          <ScrollReveal direction="up">
            <h2 className="text-display-xl uppercase text-foreground tracking-[0.06em]">
              READY TO <span className="text-gradient-gold">COLLABORATE?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-xl mx-auto leading-relaxed font-light">
              Elevate your brand with 14+ years of bespoke design mastery, direct designer collaboration, and guaranteed press-ready excellence.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link to="/contact" className="btn-amber text-xs tracking-[0.2em] w-full sm:w-auto justify-center">
                Get a Quote <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/portfolio" className="btn-outline text-xs tracking-[0.2em] w-full sm:w-auto justify-center">
                View Portfolio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
