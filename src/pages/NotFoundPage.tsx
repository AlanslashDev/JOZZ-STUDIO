import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GLOBAL_CONTENT } from '../data/content';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-xl mx-auto space-y-6">
      <span className="font-mono text-xs text-brand-amber uppercase tracking-widest px-3 py-1 rounded bg-background-elevated border border-background-border">
        {GLOBAL_CONTENT.notFoundLabel}
      </span>
      <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-foreground">
        {GLOBAL_CONTENT.notFoundHeading}
      </h1>
      <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
        {GLOBAL_CONTENT.notFoundDescription}
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-amber text-background hover:bg-brand-amberHover transition-all shadow-lg shadow-brand-amber/15"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{GLOBAL_CONTENT.notFoundButtonText}</span>
        </Link>
      </div>
    </div>
  );
};
