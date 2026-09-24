import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable for touch
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else if (el.closest('a, button, [role="button"]')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [visible]);

  if (!visible) return null;

  const size = cursorState === 'view' ? 72 : cursorState === 'hover' ? 44 : 10;
  const offset = size / 2;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          width: cursorState === 'view' ? 0 : 8,
          height: cursorState === 'view' ? 0 : 8,
          opacity: cursorState === 'view' ? 0 : 0.9,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 40, mass: 0.05 }}
      />

      {/* Outer ring / VIEW lens */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:flex items-center justify-center"
        animate={{
          x: pos.x - offset,
          y: pos.y - offset,
          width: size,
          height: size,
          backgroundColor:
            cursorState === 'view'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.35)',
          borderWidth: 1,
          borderStyle: 'solid',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.15 }}
      >
        {cursorState === 'view' && (
          <span className="text-[10px] font-mono font-bold tracking-wider text-white uppercase no-select">
            VIEW
          </span>
        )}
      </motion.div>
    </>
  );
};
