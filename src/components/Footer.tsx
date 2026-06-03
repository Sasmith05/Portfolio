import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';
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

  const contactCards = [
    {
      title: "Email",
      value: "russelsasmith@gmail.com",
      link: "mailto:russelsasmith@gmail.com",
      icon: Mail
    },
    {
      title: "Phone",
      value: "+91 7373755585",
      link: "tel:+917373755585",
      icon: Phone
    },
    {
      title: "GitHub",
      value: "Sasmith05",
      link: "https://github.com/Sasmith05",
      icon: Github
    },
    {
      title: "LinkedIn",
      value: "Russel Sasmith",
      link: "https://linkedin.com",
      icon: Linkedin
    }
  ];

  return (
    <footer 
      id="contact" 
      className="relative h-screen w-screen flex-shrink-0 bg-[#FFFFFF] text-[#0C0C0C] border-l border-[#0C0C0C]/10 px-6 md:px-12 py-16 flex flex-col justify-center items-center z-20"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pt-12">
        {/* Left Block */}
        <motion.div 
          variants={leftBlockVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="flex flex-col text-left max-w-xl md:max-w-md w-full"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <h2 className="font-sans font-black italic uppercase text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] text-[#0C0C0C]">
              <HoverLetters text="Let's Build Together" />
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-[#0C0C0C]/60 font-sans font-light text-sm sm:text-base leading-relaxed max-w-md">
              Passionate about developing clean, modern, and user-focused web applications. Open to internships, collaborative projects, and software developer roles.
            </p>
          </motion.div>

          {/* Current Location Section */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 text-[#0C0C0C]/70 font-sans font-medium text-xs sm:text-sm mt-6 sm:mt-8"
          >
            <MapPin className="w-4 h-4 text-[#0C0C0C]" />
            <span>Current Location: Chennai, India</span>
          </motion.div>

          {/* Download Resume Button (matches main Resume outline CTA exactly) */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 sm:mt-8"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <button className="rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center cursor-pointer">
                Download Resume
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Block: 2x2 Grid of Cards */}
        <motion.div 
          variants={rightBlockVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg md:max-w-xl"
        >
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.link}
                target={card.title !== "Phone" && card.title !== "Email" ? "_blank" : undefined}
                rel={card.title !== "Phone" && card.title !== "Email" ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                className="border-2 border-[#0C0C0C] bg-white p-5 rounded-none flex flex-col justify-between min-h-[140px] hover:bg-[#0C0C0C] hover:text-white transition-all duration-300 group cursor-pointer shadow-md hover:shadow-2xl active:scale-[0.98] text-left"
              >
                {/* Card Top: Title & Icon */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#0C0C0C]/40 group-hover:text-white/40 transition-colors duration-300">
                    {card.title}
                  </span>
                  <Icon className="w-5 h-5 text-[#0C0C0C] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Card Bottom: Value */}
                <span className="font-sans font-bold text-sm sm:text-base md:text-lg tracking-tight mt-6 block break-words">
                  {card.value}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Copyright bar - Positioned absolutely at the bottom viewport edge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 flex justify-between items-center text-xs text-[#0C0C0C] border-t border-[#0C0C0C]/5 pt-4"
      >
        <span>© 2025 Russel Sasmith All Rights Reserved.</span>
        <span>Designed & Built with React</span>
      </motion.div>
    </footer>
  );
};

export default Footer;
