import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Character: React.FC<CharacterProps> = ({ char, index, total, progress }) => {
  // Scale range relative to character position
  const start = index / total;
  // Overlap slightly more for a smoother transition sequence
  const end = Math.min(1, (index + 6) / total);
  
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block select-none">
      {/* Invisible placeholder */}
      <span className="opacity-0">{char}</span>
      {/* Absolutely positioned animated span */}
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0"
      >
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  progress?: MotionValue<number>;
  range?: [number, number];
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "", progress, range }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track global page scroll progress as fallback
  const { scrollYProgress: globalScroll } = useScroll();
  
  const baseScroll = progress || globalScroll;
  const targetRange = range || [0, 1/6];
  
  // Map scroll progress to [0, 1] using target range
  const activeProgress = useTransform(baseScroll, targetRange, [0, 1]);

  const words = text.split(' ');
  
  // Pre-calculate character coordinates to remain clean and pure
  let runningIndex = 0;
  const wordData = words.map((word) => {
    const chars = word.split('').map((char) => {
      const index = runningIndex++;
      return { char, index };
    });
    runningIndex++; // account for space
    return chars;
  });

  const totalLength = runningIndex - 1; // total character length including spaces

  return (
    <p ref={containerRef} className={className}>
      {wordData.map((wordChars, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {wordChars.map(({ char, index }) => (
            <Character
              key={index}
              char={char}
              index={index}
              total={totalLength}
              progress={activeProgress}
            />
          ))}
        </span>
      ))}
    </p>
  );
};

export default AnimatedText;
