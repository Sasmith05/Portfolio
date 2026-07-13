import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText, MaskRevealText } from './TextEffects';

interface HeroSectionProps {
  isActive: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isActive }) => {
  const roles = ["Developer", "CS Student", "Problem Solver"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles every 3.2 seconds (slowed down slightly)
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Stagger variants for letter-by-letter heading reveal
  const headingWords = "HI, I'M RUSSEL".split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as any,
        damping: 24, // Increased damping for a slower, more controlled entrance
        stiffness: 70, // Reduced stiffness for slower entry
      }
    }
  };

  return (
    <section
      id="hero"
      className="w-screen h-screen flex-shrink-0 relative bg-[#FFFFFF] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────
          MOBILE LAYOUT  ≤768px
          Order: role → heading → description → resume → image
          Everything is in normal document flow — no absolute positioning.
      ───────────────────────────────────────────── */}
      <div className="flex md:hidden flex-col items-center w-full h-full overflow-y-auto pt-20 pb-0">

        {/* Role label */}
        <div className="h-5 overflow-hidden relative flex items-center justify-center mb-3 w-full">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-[#0C0C0C]/50 uppercase tracking-widest text-[10px] font-bold absolute"
            >
              <ScrambleText text={roles[roleIndex]} duration={0.8} />
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-sans font-black italic text-[#0C0C0C] text-[2.75rem] leading-[0.92] mt-1 mb-5 select-none tracking-tighter uppercase flex flex-wrap justify-center text-center px-5"
        >
          {headingWords.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.2em]">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="inline-block cursor-default origin-bottom"
                  whileHover={{
                    y: -10,
                    scale: 1.15,
                    transition: { type: "spring", stiffness: 350, damping: 10 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Description */}
        <MaskRevealText
          text="Driven by building efficient, high-performance, and user-focused web applications with clean architecture and modern tools."
          isActive={isActive}
          delay={0.5}
          duration={1.4}
          className="text-[#0C0C0C]/65 font-light leading-relaxed text-[0.85rem] text-center select-none mb-7 px-5"
          style={{ maxWidth: '320px' }}
        />

        {/* Resume button — in normal flow, no absolute positioning */}
        <a href="/sasmith_resume.pdf" download="sasmith_resume.pdf" className="mb-14">
          <button className="rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-widest px-9 py-3 text-[10px] hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer">
            Resume
          </button>
        </a>

        {/* Profile image — centered, below the button */}
        <div className="w-full flex justify-center items-end">
          <img
            src="/russel.jpg"
            alt="Russel Portrait"
            className="w-[78vw] max-w-[320px] h-auto object-contain select-none"
            draggable="false"
          />
        </div>

      </div>

      {/* ─────────────────────────────────────────────
          DESKTOP LAYOUT  ≥769px  — UNTOUCHED ORIGINAL
      ───────────────────────────────────────────── */}
      <div className="hidden md:flex w-full flex-row items-stretch h-full">

        {/* Left Column: Portrait Photo */}
        <div className="w-[45%] flex justify-start items-end h-full pb-0">
          <div className="h-full flex items-end">
            <img
              src="/russel.jpg"
              alt="Russel Portrait"
              className="h-full w-auto max-h-[85vh] object-contain select-none"
              draggable="false"
            />
          </div>
        </div>

        {/* Right Column: Title & Text */}
        <div className="w-[55%] flex flex-col justify-center items-start text-left pr-24 lg:pr-32 pb-24 pt-0">

          <div className="h-6 overflow-hidden relative w-full flex items-center justify-start mb-1.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-[#0C0C0C]/50 uppercase tracking-widest text-sm font-bold absolute"
              >
                <ScrambleText text={roles[roleIndex]} duration={0.8} />
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-sans font-black italic text-[#0C0C0C] text-[5.8rem] lg:text-[6.8rem] leading-[0.95] mt-2 mb-4 select-none tracking-tighter uppercase flex flex-wrap"
          >
            {headingWords.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    className="inline-block cursor-default origin-bottom"
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
          </motion.h1>

          <MaskRevealText
            text="Driven by building efficient, high-performance, and user-focused web applications with clean architecture and modern tools."
            isActive={isActive}
            delay={0.5}
            duration={1.4}
            className="text-[#0C0C0C]/70 font-light leading-relaxed text-lg max-w-lg mb-4 select-none"
          />
        </div>

        {/* Resume Button — absolute, desktop only */}
        <div className="absolute right-[8%] bottom-[8%] z-20 pointer-events-auto">
          <a href="/sasmith_resume.pdf" download="sasmith_resume.pdf">
            <button className="rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-widest px-10 py-3.5 text-sm hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center cursor-pointer">
              Resume
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
