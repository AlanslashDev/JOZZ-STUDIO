import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CONTACT_CONTENT, FAQS, STUDIO_INFO } from '../data/content';
import { ContactForm } from '../components/ui/ContactForm';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || searchParams.get('project') || '';

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-10">
      {/* 1. HEADER */}
      <section className="mb-20">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-amber/10 border border-brand-amber/20 text-[0.6rem] font-mono tracking-[0.5em] uppercase text-brand-amber mb-6">
            <span>START A COLLABORATION</span>
          </div>
        </ScrollReveal>

        <h1 className="text-display-xl uppercase font-thin text-foreground leading-[0.98] max-w-4xl mb-8">
          {CONTACT_CONTENT.heading}
        </h1>

        <p className="text-foreground-muted text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
          {CONTACT_CONTENT.introduction}
        </p>
      </section>

      {/* 2. FORM & CONTACT INFO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
        {/* Left Column: Interactive Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl surface-card spotlight-card shadow-2xl relative">
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-wider text-foreground mb-2">
              Project Inquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted font-light">
              Fill in your requirements below for a detailed project estimate and timeline.
            </p>
          </div>

          <ContactForm initialService={preselectedService} />

          <div className="bracket-tl" />
          <div className="bracket-br" />
        </div>

        {/* Right Column: Direct Lines & Registered Office */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Lines Box */}
          <div className="p-8 rounded-3xl surface-card spotlight-card space-y-6 shadow-xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber">
                Direct Studio Contacts
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Email */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-widest block">
                Primary Studio Inbox
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="font-mono text-sm sm:text-base text-foreground hover:text-brand-amber transition-colors font-medium break-all"
                >
                  {STUDIO_INFO.email}
                </a>
                <button
                  onClick={() => handleCopy(STUDIO_INFO.email, 'email')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-brand-amber transition-colors shrink-0"
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone UK */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-widest block">
                United Kingdom Direct Line
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${STUDIO_INFO.phoneUK}`}
                  className="font-mono text-sm sm:text-base text-brand-amber hover:text-brand-amberHover transition-colors font-medium"
                >
                  {STUDIO_INFO.phoneUK}
                </a>
                <button
                  onClick={() => handleCopy(STUDIO_INFO.phoneUK, 'phoneUK')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-brand-amber transition-colors shrink-0"
                  title="Copy UK line"
                >
                  {copiedField === 'phoneUK' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone India */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-widest block">
                International / India Line
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${STUDIO_INFO.phoneIndia}`}
                  className="font-mono text-sm sm:text-base text-brand-amber hover:text-brand-amberHover transition-colors font-medium"
                >
                  {STUDIO_INFO.phoneIndia}
                </a>
                <button
                  onClick={() => handleCopy(STUDIO_INFO.phoneIndia, 'phoneIndia')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-brand-amber transition-colors shrink-0"
                  title="Copy international line"
                >
                  {copiedField === 'phoneIndia' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Registered Office Details */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <MapPin className="w-4 h-4 text-brand-coral" />
                <span className="font-display uppercase tracking-wider text-xs">Registered London Office</span>
              </div>
              <p className="text-foreground-muted font-mono text-[11px] leading-relaxed">
                {STUDIO_INFO.registeredOffice}
              </p>
            </div>

            <div className="bracket-tl" />
            <div className="bracket-br" />
          </div>

          {/* Quick Confidence Guarantee Box */}
          <div className="p-6 rounded-3xl surface-card space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-amber">
              <Clock className="w-4 h-4" />
              <span>48–72 HOUR CONCEPT TURNAROUND</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed font-light">
              {CONTACT_CONTENT.responseTime}
            </p>
          </div>
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 border-t border-white/[0.05]">
        <div className="mb-14">
          <span className="text-[0.6rem] font-mono uppercase tracking-[0.5em] text-brand-amber block mb-3">
            02 FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-display-lg uppercase font-thin text-foreground">
            Clear answers on <span className="italic text-gradient-gold">process, timelines & delivery.</span>
          </h2>
        </div>

        <div className="max-w-3xl space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl surface-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-display font-semibold text-sm sm:text-base uppercase tracking-wider text-foreground group-hover:text-brand-amber transition-colors">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-foreground-muted transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-amber' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-foreground-muted leading-relaxed font-light border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};


