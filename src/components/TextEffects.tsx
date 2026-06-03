import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * HoverLetters splits the provided text into individual characters.
 * Each character animates on mouse hover using a spring physics bounce.
 */
interface HoverLettersProps {
  text: string;
  className?: string;
  letterClassName?: string;
  style?: React.CSSProperties;
}

export const HoverLetters: React.FC<HoverLettersProps> = ({ 
  text, 
  className = "", 
  letterClassName = "",
  style
}) => {
  const words = text.split(" ");

  return (
    <span style={style} className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              className={`inline-block cursor-default origin-bottom ${letterClassName}`}
              whileHover={{
                y: -12,
                scale: 1.18,
                transition: { type: "spring", stiffness: 350, damping: 10 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

/**
 * MaskRevealText splits the text into words and wraps each word in an overflow-hidden span.
 * The words slide up into place when the slide becomes active.
 */
interface MaskRevealTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const MaskRevealText: React.FC<MaskRevealTextProps> = ({
  text,
  isActive,
  className = "",
  wordClassName = "",
  delay = 0,
  duration = 1.3,
  style
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  };

  const wordVariants = {
    hidden: { y: "115%" },
    visible: {
      y: "0%",
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1] as any, // easeOutCubic
      }
    }
  };

  return (
    <motion.span
      style={style}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block overflow-hidden mr-[0.25em] pb-1">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/**
 * ScrambleText shuffles random characters on text change,
 * gradually settling on the target text over the duration.
 */
interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  duration = 1.0, 
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "01{}[];+<>&|!%";

  useEffect(() => {
    let frame = 0;
    const intervalTime = 30; // ms per update
    const totalFrames = Math.max(1, Math.round((duration * 1000) / intervalTime));

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      if (progress >= 1) {
        setDisplayText(text);
        clearInterval(interval);
        return;
      }

      const textLength = text.length;
      const settledCount = Math.floor(progress * textLength);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < settledCount) return char;
          // Randomly show scramble characters or target characters to blend the settlement
          return Math.random() > 0.4 ? chars[Math.floor(Math.random() * chars.length)] : char;
        })
        .join("");

      setDisplayText(scrambled);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration]);

  return <span className={className}>{displayText}</span>;
};
