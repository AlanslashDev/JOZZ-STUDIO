import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Image as ImageIcon, Sparkles, Eye, CheckCircle2, Tag, Calendar, Layers, Play } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/content';
import { LightboxModal } from '../components/ui/LightboxModal';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { PortfolioItem, PortfolioCategory } from '../types';

const CATEGORIES: ('All' | PortfolioCategory)[] = [
  'All',
  'Logo Design',
  'Branding',
  'Brochures & Posters',
  'Business Cards',
  'Magazine Layout',
  'Photography',
  'Reels / Motion',
];

export const PortfolioPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Auto-select filter from URL query param (e.g., ?filter=reel or ?filter=motion or ?category=...)
  useEffect(() => {
    const filterParam = searchParams.get('filter') || searchParams.get('category');
    if (filterParam) {
      const lower = filterParam.toLowerCase();
      if (lower.includes('reel') || lower.includes('motion')) {
        setActiveCategory('Reels / Motion');
      } else {
        const matched = CATEGORIES.find(
          (c) => c.toLowerCase() === lower || c.toLowerCase().replace(/[^a-z0-9]/g, '') === lower.replace(/[^a-z0-9]/g, '')
        );
        if (matched) setActiveCategory(matched);
      }
    }
  }, [searchParams]);

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return PORTFOLIO_ITEMS.length;
    return PORTFOLIO_ITEMS.filter((item) => item.category === cat).length;
  };

  return (
    <div className="pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-10">
      {/* 1. HEADER */}
      <section className="mb-20">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-amber/10 border border-brand-amber/20 text-[0.6rem] font-mono tracking-[0.5em] uppercase text-brand-amber mb-6">
            <span>CURATED DESIGN ARCHIVE</span>
          </div>
        </ScrollReveal>

        <h1 className="text-display-xl uppercase font-thin text-foreground leading-[0.98] max-w-4xl mb-8">
          A showcase of marks, print collateral & <span className="text-gradient-gold">visual identities.</span>
        </h1>

        <p className="text-foreground-muted text-lg sm:text-xl max-w-3xl leading-relaxed font-light">
          Explore recent works across branding, packaging, editorial layout, fashion photography, and kinetic motion reels. Click any piece to inspect technical deliverables, typography details, and client specifications.
        </p>
      </section>

      {/* 2. CATEGORY FILTER TABS — Responsive, Balanced 2-Col Grid on Mobile & Clean Flex Row on Desktop */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative w-full sm:w-auto px-3 sm:px-5 py-2.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest transition-all duration-300 flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2 z-10 ${
                  isActive
                    ? 'bg-brand-amber text-black font-bold shadow-lg shadow-brand-amber/25 border border-brand-amber'
                    : 'text-foreground-muted bg-surface-1 border border-white/10 hover:text-foreground hover:border-brand-amber/40'
                }`}
              >
                <span className="truncate">{cat}</span>
                <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ${
                  isActive ? 'bg-black/20 text-black font-semibold' : 'bg-white/5 text-foreground-subtle'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. PORTFOLIO GRID */}
      <section className="min-h-[500px]">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const previewImage = item.thumbnail || item.imageUrl;
              const isVideo = item.type === 'video';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  data-cursor="view"
                  onClick={() => setSelectedItem(item)}
                  className="group relative cursor-pointer rounded-3xl surface-card spotlight-card overflow-hidden hover:border-brand-amber/50 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
                >
                  {/* Visual Area */}
                  <div className={`aspect-[4/3] bg-gradient-to-br ${item.imagePlaceholderColor || 'from-zinc-900 to-stone-900'} relative overflow-hidden flex items-center justify-center`}>
                    {isVideo && item.mediaUrl && !item.isEmbed ? (
                      <video
                        src={item.mediaUrl}
                        poster={previewImage}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                      />
                    ) : previewImage ? (
                      <img
                        src={previewImage}
                        alt={item.placeholderLabel || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-brand-amber mb-3 shadow-inner">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-[11px] font-mono text-foreground-muted max-w-[220px] leading-tight">{item.placeholderLabel || item.title}</p>
                      </div>
                    )}

                    {/* Centered Play Button for Video/Reels */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-md border border-brand-amber/40 flex items-center justify-center text-brand-amber shadow-2xl group-hover:scale-110 group-hover:bg-brand-amber group-hover:text-black transition-all duration-300">
                          <Play className="w-5 h-5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono text-brand-amber uppercase tracking-widest px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover inspection prompt */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="px-4 py-2 rounded-full bg-brand-amber text-background text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        {isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isVideo ? 'Expand Full Reel' : 'Inspect Details'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Information Header */}
                  <div className="p-6 bg-surface-1 flex-grow flex flex-col justify-between border-t border-white/5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-brand-amber">
                          {item.client}
                        </span>
                        <span className="text-xs font-mono text-foreground-subtle">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-foreground group-hover:text-brand-amber transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-widest">
                        {item.deliverables.length} Deliverables
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-foreground-muted group-hover:text-brand-amber group-hover:border-brand-amber/40 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="bracket-tl" />
                  <div className="bracket-br" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};


