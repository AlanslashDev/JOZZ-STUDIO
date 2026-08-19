import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Type, Grid, Sparkles, RefreshCw, Eye } from 'lucide-react';

export const InteractiveTypePlayground: React.FC = () => {
  const [sampleText, setSampleText] = useState('PURPOSE & PRECISION');
  const [fontSize, setFontSize] = useState(56);
  const [letterSpacing, setLetterSpacing] = useState(0.08);
  const [fontFamily, setFontFamily] = useState<'serif' | 'display' | 'sans'>('serif');
  const [showGrid, setShowGrid] = useState(true);
  const [isItalic, setIsItalic] = useState(true);

  const presets = [
    'WHERE CREATIVITY MEETS PURPOSE',
    'JOOZZ DESIGNING STUDIO',
    'EDITORIAL IDENTITY 2025',
    'PRINCE SRILEENJ LOPEZ',
  ];

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-amber uppercase tracking-widest mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Type Laboratory</span>
          </div>
          <h3 className="font-editorial text-2xl font-semibold text-foreground">
            Typography Calibration & Kerning Tool
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
              showGrid ? 'bg-brand-amber text-background font-bold' : 'bg-background border border-white/10 text-foreground-muted'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Optical Grid</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5 rounded-2xl bg-black/40 border border-white/5 mb-8">
        {/* Font Choice */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase text-foreground-subtle block">Typeface Voice</label>
          <div className="flex rounded-lg overflow-hidden border border-white/10 p-0.5 bg-background">
            <button
              onClick={() => setFontFamily('serif')}
              className={`flex-1 py-1.5 text-xs font-mono rounded ${fontFamily === 'serif' ? 'bg-brand-amber text-background font-bold' : 'text-foreground-muted'}`}
            >
              Serif
            </button>
            <button
              onClick={() => setFontFamily('display')}
              className={`flex-1 py-1.5 text-xs font-mono rounded ${fontFamily === 'display' ? 'bg-brand-amber text-background font-bold' : 'text-foreground-muted'}`}
            >
              Display
            </button>
            <button
              onClick={() => setFontFamily('sans')}
              className={`flex-1 py-1.5 text-xs font-mono rounded ${fontFamily === 'sans' ? 'bg-brand-amber text-background font-bold' : 'text-foreground-muted'}`}
            >
              Sans
            </button>
          </div>
        </div>

        {/* Size Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-foreground-subtle">
            <span>Size (pt)</span>
            <span className="text-brand-amber">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={28}
            max={84}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-brand-amber cursor-pointer"
          />
        </div>

        {/* Tracking / Kerning Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-foreground-subtle">
            <span>Tracking (em)</span>
            <span className="text-brand-amber">{letterSpacing.toFixed(2)}em</span>
          </div>
          <input
            type="range"
            min={-0.05}
            max={0.35}
            step={0.01}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full accent-brand-amber cursor-pointer"
          />
        </div>

        {/* Italic toggle */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase text-foreground-subtle block">Posture</label>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-mono border transition-colors ${
              isItalic ? 'border-brand-amber text-brand-amber bg-brand-amber/10' : 'border-white/10 text-foreground-muted bg-background'
            }`}
          >
            {isItalic ? 'Italic Flourish [Active]' : 'Upright Roman'}
          </button>
        </div>
      </div>

      {/* Live Specimen Preview Canvas */}
      <div className={`relative min-h-[220px] rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center p-8 text-center overflow-hidden transition-all ${
        showGrid ? 'bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]' : ''
      }`}>
        {/* Baseline guide lines */}
        {showGrid && (
          <div className="absolute inset-x-0 top-1/2 h-px bg-brand-coral/30 pointer-events-none" />
        )}

        <div
          className={`transition-all duration-200 select-none ${
            fontFamily === 'serif'
              ? 'font-editorial'
              : fontFamily === 'display'
              ? 'font-display uppercase'
              : 'font-sans font-bold'
          } ${isItalic ? 'italic' : 'not-italic'}`}
          style={{
            fontSize: `${fontSize}px`,
            letterSpacing: `${letterSpacing}em`,
            lineHeight: 1.1,
          }}
        >
          <span className="text-gradient-gold">
            {sampleText}
          </span>
        </div>

        {/* Live coordinate overlay */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-foreground-subtle">
          Kerning: {letterSpacing}em • Size: {fontSize}px • Grid: {showGrid ? 'Aligned' : 'Raw'}
        </div>
      </div>

      {/* Quick Text Selector Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-foreground-subtle mr-2">Preset Specimens:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setSampleText(preset)}
            className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/5 hover:bg-brand-amber/20 hover:text-brand-amber text-foreground-muted border border-white/5 transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};
