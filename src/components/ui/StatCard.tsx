import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { StatItem } from '../../types';

interface StatCardProps {
  stat: StatItem;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group h-full p-8 lg:p-10 rounded-3xl surface-card spotlight-card overflow-hidden transition-all duration-500 flex flex-col justify-between"
    >
      {/* Radial Spotlight Glow Following Mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 166, 76, 0.12), transparent 50%)`,
        }}
      />

      {/* Top Corner Number */}
      <div className="flex items-center justify-between mb-6 z-10 relative">
        <span className="text-[10px] font-mono tracking-ultra text-brand-amber font-semibold uppercase">
          Advantage
        </span>
        <span className="text-xs tracking-widest font-mono text-brand-amber/50 group-hover:text-brand-amber transition-colors">
          {stat.number}
        </span>
      </div>

      {/* Metric & Titles */}
      <div className="z-10 relative space-y-3">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-gradient-gold tracking-tight group-hover:scale-105 transition-transform duration-500 origin-left">
          {stat.value}
        </div>
        <div className="text-xs font-mono tracking-widest text-foreground-subtle uppercase">
          {stat.label}
        </div>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed pt-2 font-light">
          {stat.description}
        </p>
      </div>

      {/* Corner Framing Brackets on Hover */}
      <div className="bracket-tl" />
      <div className="bracket-br" />

      {/* Bottom Expanding Accent Bar */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-brand-amber to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
    </motion.div>
  );
};
