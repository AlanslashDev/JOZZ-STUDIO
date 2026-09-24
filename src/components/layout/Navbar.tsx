import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO, CORE_SERVICES, NAVIGATION_ITEMS, GLOBAL_CONTENT } from '../../data/content';

const getNavLinks = () => NAVIGATION_ITEMS
  .filter((item) => item.location === 'header' && item.visible)
  .map((item) => ({ name: item.label, path: item.url }));

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerNav = NAVIGATION_ITEMS.filter((item) => item.location === 'header' && item.visible);
  const navItem = (path: string, fallback: string) => ({ label: headerNav.find((item) => item.url === path)?.label || fallback, visible: headerNav.some((item) => item.url === path) });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/92 backdrop-blur-xl border-b border-white/[0.05] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-10 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-3 z-50">
          <img
            src={GLOBAL_CONTENT.logo}
            alt={STUDIO_INFO.brandName}
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[11px] tracking-[0.15em] text-foreground font-semibold uppercase">
              {GLOBAL_CONTENT.brandLabel}
            </span>
            <span className="font-mono text-[9px] tracking-ultra text-foreground-subtle">
              {GLOBAL_CONTENT.brandLocation}
            </span>
          </div>
        </Link>

        {/* Desktop nav — pill container with Services dropdown */}
        <nav className="hidden md:flex items-center glass rounded-full px-2 py-1.5 gap-0.5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem('/', 'Home').visible ? '' : 'hidden '}relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            {navItem('/', 'Home').label}
          </NavLink>
          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navItem('/about', 'About').visible ? '' : 'hidden '}relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            {navItem('/about', 'About').label}
          </NavLink>

          {/* Services dropdown */}
          <div className={`${navItem('/services', 'Services').visible ? '' : 'hidden '}relative group/dropdown`}>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 inline-flex items-center gap-1.5 ${
                  isActive || location.pathname.startsWith('/services')
                    ? 'bg-brand-amber text-background font-semibold'
                    : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
                }`
              }
            >
              <span>{GLOBAL_CONTENT.servicesMenuLabel}</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </NavLink>

            {/* Dropdown Menu — wide with full title display */}
            <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#0e0e12] border border-white/10 p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-300 backdrop-blur-xl z-50">
              <Link
                to="/services"
                className="block px-3.5 py-2.5 rounded-xl text-[11px] font-mono tracking-widest text-brand-amber uppercase hover:bg-brand-amber/10 transition-colors mb-1 border-b border-white/5 font-semibold"
              >
                {GLOBAL_CONTENT.servicesMenuAllText} →
              </Link>
              {CORE_SERVICES.filter((srv) => srv.visible !== false).map((srv) => (
                <Link
                  key={srv.id}
                  to={`/services/${srv.id}`}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-foreground-muted hover:text-brand-amber hover:bg-white/[0.04] transition-all group/item"
                >
                  <span className="whitespace-normal leading-tight">{srv.title}</span>
                  <span className="text-[10px] text-brand-amber/50 group-hover/item:text-brand-amber ml-2 font-semibold shrink-0">{srv.number}</span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `${navItem('/portfolio', 'Portfolio').visible ? '' : 'hidden '}relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            {navItem('/portfolio', 'Portfolio').label}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navItem('/contact', 'Contact').visible ? '' : 'hidden '}relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            {navItem('/contact', 'Contact').label}
          </NavLink>
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex btn-amber text-[11px] py-2 px-5"
          >
            {GLOBAL_CONTENT.startProjectText} <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl glass text-foreground hover:text-brand-amber transition-colors z-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 w-screen h-screen bg-[#060608] z-40 md:hidden flex flex-col justify-between px-7 pt-28 pb-10 overflow-y-auto"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Nav list — Clean full pages view */}
            <nav className="flex flex-col w-full divide-y divide-white/[0.08] my-auto">
              {getNavLinks().map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + idx * 0.04, duration: 0.25 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 text-2xl sm:text-3xl font-editorial tracking-wide transition-colors ${
                        isActive ? 'text-brand-amber font-semibold italic' : 'text-foreground hover:text-brand-amber'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-foreground-subtle opacity-50">0{idx + 1}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom contact info + button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-4 pt-4 shrink-0 border-t border-white/[0.08]"
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle mb-1">{GLOBAL_CONTENT.mobilePhoneLabel}</div>
                <a href={`tel:${STUDIO_INFO.phoneUK}`} className="text-brand-amber font-mono text-sm">
                  {STUDIO_INFO.phoneUK}
                </a>
              </div>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-amber justify-center text-xs tracking-widest uppercase py-3"
              >
                {GLOBAL_CONTENT.startProjectText}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
