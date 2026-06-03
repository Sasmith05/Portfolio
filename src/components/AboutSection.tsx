import React from 'react';
import { MotionValue, motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import { HoverLetters } from './TextEffects';

interface AboutSectionProps {
  progress?: MotionValue<number>;
  isActive: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ progress, isActive }) => {
  return (
    <section
      id="about"
      className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center overflow-hidden bg-[#FFFFFF] px-6 sm:px-12 md:px-20 py-20 border-l border-[#0C0C0C]/5"
    >
      {/* Content Block */}
      <div className="flex flex-col items-center text-center max-w-4xl z-10 w-full">
        {/* Heading with Custom Active Reveal & Hover Letters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
          className="w-full"
        >
          <h2 className="font-sans font-black italic uppercase text-center text-[#0C0C0C] text-[clamp(2.5rem,6vw,5.5rem)] tracking-tighter leading-none mb-8 sm:mb-12">
            <HoverLetters text="About Me" />
          </h2>
        </motion.div>

        {/* Animated Paragraph */}
        <div className="max-w-[720px] mx-auto">
          <AnimatedText 
            text="Passionate Computer Science student with experience in Python, Java, and React development through academic and personal projects. Strong problem-solving skills, team collaboration, and interest in building efficient and user-focused applications." 
            progress={progress}
            range={[0.3 / 4, 0.95 / 4]}
            className="text-[#0C0C0C]/85 font-sans font-normal text-center leading-relaxed text-[clamp(1.1rem,1.9vw,1.45rem)] tracking-wide"
          />
        </div>

        {/* Rich Details Grid */}
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.35
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 w-full max-w-4xl mt-10 sm:mt-12 text-left border-t border-[#0C0C0C]/5 pt-6 sm:pt-10"
        >
          {/* Column 1: Education */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.215, 0.61, 0.355, 1] } }
            }}
            className="flex flex-col"
          >
            <span className="font-sans font-bold uppercase tracking-widest text-[9px] sm:text-[10px] text-[#0C0C0C]/40 mb-1.5">
              Education
            </span>
            <h4 className="font-sans font-bold text-[#0C0C0C] text-sm sm:text-base mb-0.5">
              B.E. Computer Science & Eng.
            </h4>
            <p className="font-sans font-normal text-[#0C0C0C]/65 text-xs sm:text-sm mb-0.5">
              Loyola-ICAM College of Eng.
            </p>
            <span className="font-sans font-medium text-[#0C0C0C]/40 text-[10px] sm:text-xs">
              2023 - 2027
            </span>
          </motion.div>

          {/* Column 2: Experience */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.215, 0.61, 0.355, 1] } }
            }}
            className="flex flex-col"
          >
            <span className="font-sans font-bold uppercase tracking-widest text-[9px] sm:text-[10px] text-[#0C0C0C]/40 mb-1.5">
              Experience
            </span>
            <h4 className="font-sans font-bold text-[#0C0C0C] text-sm sm:text-base mb-0.5">
              Software Engineering Intern
            </h4>
            <p className="font-sans font-normal text-[#0C0C0C]/65 text-xs sm:text-sm mb-0.5">
              Fives India Eng. & Projects
            </p>
            <span className="font-sans font-medium text-[#0C0C0C]/40 text-[10px] sm:text-xs">
              Mar 2026
            </span>
          </motion.div>

          {/* Column 3: Leadership */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.215, 0.61, 0.355, 1] } }
            }}
            className="flex flex-col"
          >
            <span className="font-sans font-bold uppercase tracking-widest text-[9px] sm:text-[10px] text-[#0C0C0C]/40 mb-1.5">
              Extracurricular
            </span>
            <h4 className="font-sans font-bold text-[#0C0C0C] text-sm sm:text-base mb-0.5">
              Office Bearer
            </h4>
            <p className="font-sans font-normal text-[#0C0C0C]/65 text-xs sm:text-sm mb-0.5">
              Rotaract Club of LICET
            </p>
            <span className="font-sans font-medium text-[#0C0C0C]/40 text-[10px] sm:text-xs">
              2024 - 2025
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Me Button - Positioned absolutely at the bottom-right corner to match Hero's Resume button */}
      <div className="absolute right-[5%] sm:right-[8%] bottom-[5%] sm:bottom-[8%] z-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1], delay: 0.6 }}
        >
          <ContactButton 
            label="Contact Me"
            onClick={() => window.scrollTo({ top: window.innerHeight * 6, behavior: 'smooth' })}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
