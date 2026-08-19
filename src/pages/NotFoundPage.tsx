import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-xl mx-auto space-y-6">
      <span className="font-mono text-xs text-brand-amber uppercase tracking-widest px-3 py-1 rounded bg-background-elevated border border-background-border">
        // 404 ERROR
      </span>
      <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-foreground">
        Page Not Found
      </h1>
      <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
        The page you are looking for does not exist or may have moved. Please return to the homepage or explore our core disciplines.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-amber text-background hover:bg-brand-amberHover transition-all shadow-lg shadow-brand-amber/15"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
