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
      className="h-screen w-screen flex-shrink-0 flex items-center justify-between relative bg-[#FFFFFF] pt-24 pb-0 overflow-hidden"
    >
      <div className="w-full flex flex-col md:flex-row items-stretch h-full">
        
        {/* Left Column: Portrait Photo (Still, sitting flush on the left and bottom edges of the screen, completely static) */}
        <div className="w-full md:w-[45%] flex justify-start items-end h-full">
          <div className="h-full flex items-end">
            <img 
              src="/russel.jpg" 
              alt="Russel Portrait" 
              className="w-full h-auto max-h-[78vh] md:max-h-[85vh] object-contain select-none"
              draggable="false"
            />
          </div>
        </div>

        {/* Right Column: Title & Text content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center items-start text-left pl-6 pr-8 sm:pr-16 md:pr-24 lg:pr-32 pb-12 md:pb-24">
          {/* Subheading: Dynamic Role Cycling with scramble animation */}
          <div className="h-6 overflow-hidden relative w-full flex items-center justify-start mb-1.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-[#0C0C0C]/50 uppercase tracking-widest text-xs sm:text-sm font-bold absolute"
              >
                <ScrambleText text={roles[roleIndex]} duration={0.8} />
              </motion.span>
            </AnimatePresence>
          </div>
          
          {/* Staggered Heading reveal with Springy Hover Bounce */}
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-sans font-black italic text-[#0C0C0C] text-[3.2rem] sm:text-[4.5rem] md:text-[5.8rem] lg:text-[6.8rem] leading-[0.95] mt-2 mb-4 select-none tracking-tighter uppercase flex flex-wrap"
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
            className="text-[#0C0C0C]/70 font-light leading-relaxed text-sm sm:text-base md:text-lg max-w-lg mb-4 select-none"
          />
        </div>
      </div>

      {/* Resume Button - Positioned absolutely at the bottom-right corner of the screen */}
      <div className="absolute right-[5%] sm:right-[8%] bottom-[5%] sm:bottom-[8%] z-20 pointer-events-auto">
        <a href="/resume.pdf" download>
          <button className="rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center cursor-pointer">
            Resume
          </button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
