import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { HoverLetters } from './TextEffects';

interface FooterProps {
  isActive: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isActive }) => {
  const leftBlockVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const rightBlockVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1] as any // slow and elegant
      }
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative h-screen w-screen flex-shrink-0 bg-[#FFFFFF] text-[#0C0C0C] border-l border-[#0C0C0C]/10 px-6 md:px-12 py-16 flex flex-col justify-center items-center z-20"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        {/* Left Block */}
        <motion.div 
          variants={leftBlockVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="flex flex-col text-left max-w-md"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <h2 className="font-sans font-black italic uppercase text-3xl sm:text-4xl tracking-tighter text-[#0C0C0C]">
              <HoverLetters text="Let's Build Together" />
            </h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-[#0C0C0C]/60 font-sans font-light text-sm sm:text-base leading-relaxed">
              Passionate about developing clean, modern, and user-focused web applications. Open to internships, collaborative projects, and software developer roles.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Block: Contact Info */}
        <motion.div 
          variants={rightBlockVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="flex flex-col gap-4 text-left w-full md:w-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 hover:opacity-75 transition-opacity duration-200">
            <Mail className="w-5 h-5 text-[#0C0C0C]" />
            <a 
              href="mailto:russelsasmith@gmail.com" 
              className="text-[#0C0C0C] font-medium tracking-wide uppercase text-xs sm:text-sm"
            >
              russelsasmith@gmail.com
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 hover:opacity-75 transition-opacity duration-200">
            <Phone className="w-5 h-5 text-[#0C0C0C]" />
            <a 
              href="tel:+917373755585" 
              className="text-[#0C0C0C] font-medium tracking-wide uppercase text-xs sm:text-sm"
            >
              +91 7373755585
            </a>
          </motion.div>

          <div className="flex gap-4 mt-2">
            <motion.div variants={itemVariants}>
              <a 
                href="https://github.com/Sasmith05" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-none border border-[#0C0C0C]/15 bg-[#FFFFFF] hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 flex items-center justify-center"
              >
                <Github className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-none border border-[#0C0C0C]/15 bg-[#FFFFFF] hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Copyright bar - Positioned absolutely at the bottom viewport edge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 flex justify-between items-center text-xs text-[#0C0C0C] border-t border-[#0C0C0C]/5 pt-4"
      >
        <span>&copy; {new Date().getFullYear()} Russel Sasmith. All rights reserved.</span>
        <span>Designed & Built with React</span>
      </motion.div>
    </footer>
  );
};

export default Footer;
