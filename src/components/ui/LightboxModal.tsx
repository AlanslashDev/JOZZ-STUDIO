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
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background-elevated border border-background-border rounded-3xl shadow-2xl p-6 sm:p-8 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-background border border-background-border text-foreground-muted hover:text-foreground hover:border-brand-amber/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-2">
            {/* Visual Showcase */}
            <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.imagePlaceholderColor} border border-background-border/80 relative overflow-hidden group`}>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.placeholderLabel}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-brand-amber mb-4">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs text-brand-amber font-semibold uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <p className="font-editorial text-sm text-foreground/90 max-w-xs leading-relaxed">
                    {item.placeholderLabel}
                  </p>
                </div>
              )}
              {/* Category badge overlay */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="text-[10px] font-mono text-brand-amber uppercase tracking-widest px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Details Column */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-brand-amber mb-2">
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

                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>

              <p className="text-foreground-muted text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs uppercase tracking-mega font-mono text-foreground-subtle mb-3">
                  Scope & Deliverables
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {item.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground/85">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Note */}
              <div className="p-3.5 rounded-xl bg-background border border-background-border text-[11px] text-foreground-muted flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground block">Client Attribution Policy</span>
                  <span>{item.client} (Client case study details are published only upon explicit client sign-off).</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={`/contact?project=${encodeURIComponent(item.category)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-amber text-background hover:bg-brand-amberHover transition-all duration-300 shadow-lg shadow-brand-amber/15 group"
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
