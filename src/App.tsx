import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { OpeningAnimation } from './components/ui/OpeningAnimation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { publicApi } from './lib/api';
import { applyCmsDocumentPreview, applyPublicContent, PAGE_SEO } from './data/content';

// Global Lenis ref so ScrollToTop can reset it
export const lenisRef: { current: Lenis | null } = { current: null };

// Scroll to top helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset Lenis scroll position first (important — prevents it from fighting window.scrollTo)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Also reset DOM scroll as a fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Update document title per route
    const titleMap: Record<string, string> = {
      '/': 'Joozz Designing — Graphic Design & Brand Identity Studio',
      '/about': 'About Us — Joozz Designing',
      '/services': 'Disciplines & Services — Joozz Designing',
      '/portfolio': 'Selected Works Archive — Joozz Designing',
      '/contact': 'Inquire & Start a Project — Joozz Designing',
    };

    const pageKey = pathname === '/' ? 'home' : pathname.split('/').filter(Boolean)[0] || 'home';
    document.title = PAGE_SEO[pageKey]?.metaTitle || titleMap[pathname] || 'Joozz Designing — Graphic Design Studio';
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(() => !new URLSearchParams(window.location.search).has('cmsPreview'));
  const [contentRevision, setContentRevision] = useState(0);
  const location = useLocation();
  const refreshPublishedContent = useCallback(async () => {
    const payload = await publicApi.bootstrap();
    applyPublicContent(payload);
    setContentRevision((revision) => revision + 1);
  }, []);

  // Render immediately with bundled fallback content. The API replaces it when
  // available, so a cache/database outage never leaves the marketing site blank.
  useEffect(() => {
    refreshPublishedContent()
      .catch(() => {
        // Deliberately retain the static fallback; public pages must stay usable.
      })
      .finally(() => {
        if (window.parent !== window) window.parent.postMessage({ type: 'joozz-preview-ready' }, window.location.origin);
      });
  }, [refreshPublishedContent]);

  useEffect(() => {
    const refresh = () => { refreshPublishedContent().catch(() => undefined); };
    const storageRefresh = (event: StorageEvent) => { if (event.key === 'joozz-content-published') refresh(); };
    window.addEventListener('storage', storageRefresh);
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('joozz-content') : null;
    if (channel) channel.onmessage = (event) => { if (event.data?.type === 'published') refresh(); };
    return () => { window.removeEventListener('storage', storageRefresh); channel?.close(); };
  }, [refreshPublishedContent]);

  useEffect(() => {
    const receivePreview = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'joozz-cms-preview') return;
      if (typeof event.data.key !== 'string' || !event.data.document || typeof event.data.document !== 'object') return;
      applyCmsDocumentPreview(event.data.key, event.data.document);
      setContentRevision((revision) => revision + 1);
    };
    window.addEventListener('message', receivePreview);
    if (window.parent !== window) window.parent.postMessage({ type: 'joozz-preview-ready' }, window.location.origin);
    return () => window.removeEventListener('message', receivePreview);
  }, []);

  useEffect(() => {
    const pageKey = location.pathname === '/' ? 'home' : location.pathname.split('/').filter(Boolean)[0] || 'home';
    const seo = PAGE_SEO[pageKey];
    if (seo?.metaTitle) document.title = seo.metaTitle;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    if (seo?.metaDescription) description.content = seo.metaDescription;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = seo?.indexable === false ? 'noindex,nofollow' : 'index,follow';
  }, [location.pathname, contentRevision]);

  // Initialize Lenis smooth scroll and store ref
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-amber selection:text-background font-sans">
      {/* Opening Logo Screen Intro Animation */}
      {showIntro && <OpeningAnimation onComplete={() => setShowIntro(false)} />}

      {/* Noise Texture Overlay */}
      <div className="grain-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Page Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
