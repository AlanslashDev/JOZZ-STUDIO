import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  PenTool, Palette, FileText, CreditCard, BookOpen, Printer, Camera,
} from 'lucide-react';
import { ServiceItem } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  PenTool, Palette, FileText, CreditCard, BookOpen, Printer, Camera,
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, featured = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const Icon = iconMap[service.iconName] || PenTool;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      className={`group relative flex flex-col justify-between rounded-2xl surface-card spotlight-card overflow-hidden cursor-pointer ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link to={`/services/${service.id}`} className="absolute inset-0 z-20" aria-label={`View details for ${service.title}`} />
      {/* Spotlight radial */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(232,166,76,0.09), transparent 45%)`,
        }}
      />

      {/* Image thumbnail strip */}
      {service.image && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={service.image}
            alt={service.imageAlt || service.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
          <div className="absolute bottom-3 left-4 z-10">
            <span className="text-[10px] font-mono tracking-ultra text-brand-amber bg-black/60 backdrop-blur-md border border-brand-amber/20 px-2.5 py-1 rounded-md">
              {service.number}
            </span>
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-7 flex flex-col flex-grow relative z-10">
        {/* Service number + icon (only if no image) */}
        {!service.image && (
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[10px] tracking-ultra text-brand-amber bg-brand-amber/8 border border-brand-amber/15 px-2.5 py-1 rounded-md">
              {service.number}
            </span>
            <div className="w-10 h-10 rounded-xl surface-card flex items-center justify-center text-brand-amber group-hover:bg-brand-amber/10 transition-colors duration-300">
              <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </div>
          </div>
        )}
        {service.image && (
          <div className="flex items-center justify-between mb-5">
            <div className="w-10 h-10 rounded-xl surface-card flex items-center justify-center text-brand-amber group-hover:bg-brand-amber/10 transition-colors duration-300">
              <Icon className="w-[18px] h-[18px]" />
            </div>
          </div>
        )}

        {/* Title */}
        <div className="flex-grow space-y-2 mb-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-editorial text-xl font-medium text-foreground group-hover:text-brand-amber transition-colors duration-300 leading-snug">
              {service.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-brand-amber opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
          </div>
          <p className="text-[11px] font-mono text-brand-amber/70 uppercase tracking-widest">{service.tagline}</p>
          <p className="text-sm text-foreground-muted leading-relaxed">{service.description}</p>
        </div>

        {/* Deliverables */}
        <div className="pt-4 border-t border-white/[0.05] space-y-1.5">
          {service.deliverables.slice(0, 3).map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-foreground-muted">
              <CheckCircle2 className="w-3 h-3 text-brand-amber/60 shrink-0" />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-brand-amber to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

      {/* Corner brackets */}
      <div className="bracket-tl" />
      <div className="bracket-br" />
    </motion.div>
  );
};
