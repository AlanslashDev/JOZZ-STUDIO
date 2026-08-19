import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO, CORE_SERVICES } from '../../data/content';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ukTime, setUkTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live UK clock
  useEffect(() => {
    const tick = () => {
      setUkTime(new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
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
            src="/logo.png"
            alt="Joozz Designing"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[11px] tracking-[0.15em] text-foreground font-semibold uppercase">
              JOOZZ
            </span>
            <span className="font-mono text-[9px] tracking-ultra text-foreground-subtle">
              STUDIO UK
            </span>
          </div>
        </Link>

        {/* Live studio clock */}
        <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-foreground-subtle tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>UK</span>
          <span className="text-brand-amber font-medium">{ukTime || '--:--:--'}</span>
        </div>

        {/* Desktop nav — pill container with Services dropdown */}
        <nav className="hidden md:flex items-center glass rounded-full px-2 py-1.5 gap-0.5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            About
          </NavLink>

          {/* Services dropdown */}
          <div className="relative group/dropdown">
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
              <span>Our Services</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </NavLink>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#0e0e11] border border-white/10 p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-300 backdrop-blur-xl z-50">
              <Link
                to="/services"
                className="block px-3 py-2 rounded-xl text-[10px] font-mono tracking-widest text-brand-amber uppercase hover:bg-white/5 transition-colors mb-1 border-b border-white/5"
              >
                // View All 6 Services →
              </Link>
              {CORE_SERVICES.map((srv) => (
                <Link
                  key={srv.id}
                  to={`/services/${srv.id}`}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-foreground-muted hover:text-foreground hover:bg-white/5 transition-all group/item"
                >
                  <span className="truncate">{srv.title}</span>
                  <span className="text-[10px] text-brand-amber/40 group-hover/item:text-brand-amber ml-2 font-semibold">{srv.number}</span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            Portfolio
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-brand-amber text-background font-semibold'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex btn-amber text-[11px] py-2 px-5"
          >
            Start Project <ArrowUpRight className="w-3 h-3" />
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
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#050505] z-30 md:hidden flex flex-col justify-between px-8 py-24"
          >
            <nav className="flex flex-col gap-0">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07, duration: 0.4 }}
                  className="border-b border-white/5"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-5 text-3xl font-editorial font-thin ${
                        isActive ? 'text-brand-amber italic' : 'text-foreground'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <span className="text-sm font-mono text-foreground-subtle opacity-40">0{idx + 1}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-5"
            >
              <div className="border-t border-white/5 pt-5">
                <div className="text-[11px] font-mono text-foreground-subtle mb-2">Direct UK Line:</div>
                <a href={`tel:${STUDIO_INFO.phoneUK}`} className="text-brand-amber font-mono text-sm">
                  {STUDIO_INFO.phoneUK}
                </a>
              </div>
              <Link
                to="/contact"
                className="w-full btn-amber justify-center text-sm"
              >
                Request a Proposal
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
