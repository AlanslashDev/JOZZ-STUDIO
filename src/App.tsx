import React, { useEffect, useState } from 'react';
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

// Scroll to top helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update document title per route
    const titleMap: Record<string, string> = {
      '/': 'Joozz Designing — Graphic Design & Brand Identity Studio (Prince Srileenj Lopez)',
      '/about': 'About Prince Srileenj Lopez — Joozz Designing',
      '/services': 'Disciplines & Services — Joozz Designing',
      '/portfolio': 'Selected Works Archive — Joozz Designing',
      '/contact': 'Inquire & Start a Project — Joozz Designing',
    };

    document.title = titleMap[pathname] || 'Joozz Designing — Graphic Design Studio';
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Initialize Lenis smooth scroll
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-amber selection:text-background font-sans">
      {/* Opening Logo Screen Intro Animation */}
      {showIntro && <OpeningAnimation onComplete={() => setShowIntro(false)} />}

      {/* Noise Texture Overlay */}
      <div className="grain-overlay" />

      {/* Smooth Trailing Magnetic Cursor */}
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
