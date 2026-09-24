import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveCanvas } from './InteractiveCanvas';

const BANNER_VIDEOS = [
  {
    id: 1,
    src: '/media/home/13583272-hd_1920_1080_60fps - Trim-compressed.mp4',
    title: 'Creative Reel 01',
  },
  {
    id: 2,
    src: '/media/home/5092427-hd_1920_1080_30fps - Trim.mp4',
    title: 'Production Reel 02',
  },
  {
    id: 3,
    src: '/media/home/7598770-hd_1920_1080_30fps - Trim-compressed.mp4',
    title: 'Studio Reel 03',
  },
];

export const HeroDesignShowcaseBg: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Smoothly cycle through the 3 user videos every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_VIDEOS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentVideo = BANNER_VIDEOS[currentIndex];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Crossfading Video Player */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentVideo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105 filter saturate-125 contrast-125 brightness-95"
            >
              <source src={currentVideo.src} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Interactive Generative Particle Mesh */}
      <InteractiveCanvas />

      {/* 3. Layered cinematic dark vignette and radial glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,rgba(232,166,76,0.12),transparent_60%)]" />

      {/* 4. Architectural Dot Grid */}
      <div className="absolute inset-0 dot-grid opacity-45" />

    </div>
  );
};
