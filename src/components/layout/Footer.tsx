import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { STUDIO_INFO } from '../../data/content';

const NAV_COLS = [
  {
    title: 'Studio',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Disciplines',
    links: [
      { label: 'Logo Design', path: '/services' },
      { label: 'Brand Identity', path: '/services' },
      { label: 'Brochure & Print', path: '/services' },
      { label: 'Business Cards', path: '/services' },
      { label: 'Fashion Photography', path: '/services' },
    ],
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-1 border-t border-white/[0.05] text-foreground overflow-hidden">

      {/* Awwwards-style big footer brand text */}
      <div className="overflow-hidden border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 py-12">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-editorial text-[clamp(3rem,10vw,8rem)] font-thin italic leading-none text-foreground/[0.06] no-select tracking-tighter">
              JOOZZ DESIGNING
            </h2>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-foreground-muted hover:border-brand-amber/50 hover:text-brand-amber transition-all duration-300 mb-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-8 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img src="/logo.png" alt="Joozz Designing" className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-[11px] tracking-[0.15em] text-foreground font-semibold uppercase">JOOZZ</span>
                <span className="font-mono text-[9px] tracking-ultra text-foreground-subtle">STUDIO UK</span>
              </div>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
              Independent graphic design, brand architecture, and visual storytelling.
              Chelmsford & London, United Kingdom.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-foreground-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Brand Projects</span>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title} className="md:col-span-2 space-y-5">
              <h4 className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.path}
                      className="text-[13px] text-foreground-muted hover:text-foreground transition-colors underline-slide"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[10px] font-mono uppercase tracking-ultra text-brand-amber">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${STUDIO_INFO.email}`} className="flex items-start gap-2 text-[13px] text-foreground-muted hover:text-brand-amber transition-colors group">
                  <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 group-hover:text-brand-amber" />
                  <span className="break-all">{STUDIO_INFO.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${STUDIO_INFO.phoneUK}`} className="flex items-center gap-2 text-[13px] text-foreground-muted hover:text-brand-amber transition-colors group">
                  <Phone className="w-3.5 h-3.5 shrink-0 group-hover:text-brand-amber" />
                  <span>{STUDIO_INFO.phoneUK} (UK)</span>
                </a>
              </li>
              <li>
                <a href={`tel:${STUDIO_INFO.phoneIndia}`} className="flex items-center gap-2 text-[13px] text-foreground-muted hover:text-brand-amber transition-colors group">
                  <Phone className="w-3.5 h-3.5 shrink-0 group-hover:text-brand-amber" />
                  <span>{STUDIO_INFO.phoneIndia} (IN)</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-[13px] text-foreground-muted">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{STUDIO_INFO.registeredOffice}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-foreground-subtle">
          <span>© {year} Joozz Designing. All Rights Reserved.</span>
          <div className="flex items-center gap-6">
            <span>Chelmsford, Essex · London WC2H 9JQ</span>
            <span>UK Registered Design Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
