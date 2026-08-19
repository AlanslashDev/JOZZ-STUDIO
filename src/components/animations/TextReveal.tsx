import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  tag: Tag = 'h1',
  delay = 0,
  stagger = 0.04,
  highlightWords = [],
  highlightClassName = 'text-brand-amber italic font-editorial',
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -20,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block overflow-hidden ${className}`}
    >
      <Tag className="flex flex-wrap gap-x-[0.28em] gap-y-1">
        {words.map((word, index) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
          );

          return (
            <motion.span
              variants={child}
              key={index}
              className={`inline-block will-change-transform ${
                isHighlighted ? highlightClassName : ''
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </Tag>
    </motion.div>
  );
};
