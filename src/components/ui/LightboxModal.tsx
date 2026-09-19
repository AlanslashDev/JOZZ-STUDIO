import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Image as ImageIcon, CheckCircle, Calendar, Tag, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PortfolioItem } from '../../types';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0e0e12] border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-7 z-10 overscroll-contain"
        >
          {/* Close button — positioned visibly with high contrast and z-index */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-black/80 border border-white/20 text-white hover:text-brand-amber hover:border-brand-amber transition-all z-30 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Modal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-7 items-center">
            {/* Visual Showcase (Image or Video) */}
            <div className={`md:col-span-6 w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.imagePlaceholderColor || 'from-zinc-900 to-stone-900'} border border-background-border/80 relative overflow-hidden group flex items-center justify-center`}>
              {item.type === 'video' ? (
                item.isEmbed ? (
                  <div className="w-full h-full relative aspect-video">
                    <iframe
                      src={item.mediaUrl}
                      title={item.title}
                      className="w-full h-full border-0 rounded-2xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    src={item.mediaUrl}
                    poster={item.thumbnail || item.imageUrl}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-contain bg-black rounded-2xl"
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (item.imageUrl || item.thumbnail) ? (
                <img
                  src={item.thumbnail || item.imageUrl}
                  alt={item.placeholderLabel || item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-brand-amber mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-brand-amber font-semibold uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <p className="font-editorial text-xs text-foreground/90 max-w-xs leading-relaxed">
                    {item.placeholderLabel || item.title}
                  </p>
                </div>
              )}
              {/* Category badge overlay */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                <span className="text-[9px] sm:text-[10px] font-mono text-brand-amber uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-6 space-y-3 sm:space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-brand-amber mb-1">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-foreground-muted">
                    <Calendar className="w-3 h-3" />
                    {item.year}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-xl uppercase tracking-wider text-foreground leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-foreground-muted text-xs leading-relaxed">
                {item.description}
              </p>

              {/* Deliverables */}
              <div>
                <h4 className="text-[10px] sm:text-xs uppercase tracking-mega font-mono text-foreground-subtle mb-1.5 sm:mb-2">
                  Scope & Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {item.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-foreground/85">
                      <CheckCircle className="w-3 h-3 text-brand-amber shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  to={`/contact?project=${encodeURIComponent(item.category)}`}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-amber text-background hover:bg-brand-amberHover transition-all duration-300 shadow-lg shadow-brand-amber/20 group"
                >
                  <span>Commission Similar Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
