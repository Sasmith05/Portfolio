import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Layers, Database, Users, Award } from 'lucide-react';
import { HoverLetters } from './TextEffects';

const servicesData = [
  {
    num: "01",
    name: "Languages",
    desc: "Python, Java, JavaScript, SQL, HTML, CSS. Strong foundations in object-oriented programming, software architecture, and scripting.",
    icon: Terminal,
    tags: ["Python", "Java", "JavaScript", "SQL", "HTML", "CSS"]
  },
  {
    num: "02",
    name: "Frameworks & Tools",
    desc: "React, Next.js, Node.js, Prisma, Tailwind CSS, Git, GitHub, VS Code. Building modular frontends and secure workflows.",
    icon: Layers,
    tags: ["React", "Next.js", "Node.js", "Prisma", "Tailwind", "Git"]
  },
  {
    num: "03",
    name: "Databases",
    desc: "MySQL, MongoDB, PostgreSQL. Relational and non-relational database design, structuring queries, and secure retrieval.",
    icon: Database,
    tags: ["MySQL", "MongoDB", "PostgreSQL"]
  },
  {
    num: "04",
    name: "Activities & Soft Skills",
    desc: "Office Bearer in Rotaract Club of LICET. Strong team collaboration, problem solving, communication, and leadership skills.",
    icon: Users,
    tags: ["Collaboration", "Problem Solving", "Leadership"]
  },
  {
    num: "05",
    name: "Certifications",
    desc: "Oracle Academy (Java Fundamentals, Java Foundations, OCI, App Dev) and Infosys Springboard JavaScript Certification.",
    icon: Award,
    tags: ["Oracle Academy", "Infosys Springboard", "Java", "JS"]
  }
];

interface ServicesSectionProps {
  isActive: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const [scrollbarProps, setScrollbarProps] = useState({
    thumbHeight: 0,
    thumbY: 0,
    visible: false
  });

  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.215, 0.61, 0.355, 1] as any // smooth and elegant slow finish
      }
    }
  };

  // Track scroll position to update custom scrollbar thumb height & vertical translation
  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    if (scrollHeight <= clientHeight) return;

    const thumbHeight = Math.max(24, (clientHeight / scrollHeight) * clientHeight);
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const thumbY = scrollRatio * (clientHeight - thumbHeight);

    setScrollbarProps({
      thumbHeight,
      thumbY,
      visible: true
    });

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    // Hide scrollbar after 1.2 seconds of inactivity
    scrollTimeoutRef.current = window.setTimeout(() => {
      setScrollbarProps((prev) => ({ ...prev, visible: false }));
    }, 1200);
  };

  // Initialize scrollbar sizes on mount/resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollbarSize = () => {
      const { scrollHeight, clientHeight } = container;
      if (scrollHeight > clientHeight) {
        const thumbHeight = Math.max(24, (clientHeight / scrollHeight) * clientHeight);
        setScrollbarProps((prev) => ({ ...prev, thumbHeight }));
      }
    };

    updateScrollbarSize();
    window.addEventListener('resize', updateScrollbarSize);
    return () => {
      window.removeEventListener('resize', updateScrollbarSize);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, [isActive]);

  return (
    <section 
      id="skills"
      className="relative h-screen w-screen flex-shrink-0 bg-[#FFFFFF] text-[#0C0C0C] px-6 sm:px-12 md:px-20 py-10 md:py-20 flex items-center justify-center z-0 border-l border-r border-[#0C0C0C]/5"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center h-full pt-12">
        {/* Heading with Outfit font style (sans-serif bold italic uppercase) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
          className="w-full"
        >
          <h2 className="font-sans font-black italic uppercase text-center text-[#0C0C0C] text-[clamp(2.5rem,6vw,5.5rem)] tracking-tighter leading-none mb-8 sm:mb-12">
            <HoverLetters text="Skills" />
          </h2>
        </motion.div>

        {/* Outer relative wrapper containing scroll container and custom scrollbar */}
        <div className="relative w-full overflow-hidden pr-4 sm:pr-6">
          
          {/* Scrollable Container (with browser scrollbars hidden completely) */}
          <motion.div 
            ref={containerRef}
            onScroll={handleContainerScroll}
            variants={listContainerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-h-[50vh] overflow-y-auto pr-2 no-scrollbar pb-16"
          >
            {servicesData.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.num} 
                  variants={itemVariants}
                  className="border-2 border-[#0C0C0C] bg-white p-6 rounded-none flex flex-col justify-between min-h-[220px] hover:bg-[#0C0C0C] hover:text-white transition-all duration-300 group cursor-default shadow-sm hover:shadow-xl active:scale-[0.98]"
                >
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex justify-between items-center w-full">
                      <span className="font-sans font-bold text-xs text-[#0C0C0C]/40 group-hover:text-white/40 transition-colors duration-300">
                        {item.num}
                      </span>
                      <Icon className="w-6 h-6 text-[#0C0C0C] group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-sans font-extrabold uppercase text-sm sm:text-base tracking-wider mt-4 mb-2">
                      {item.name}
                    </h3>
                    <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-[#0C0C0C]/70 group-hover:text-white/80 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Row: Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {item.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="text-[9px] uppercase font-sans font-semibold tracking-wider border border-[#0C0C0C]/20 group-hover:border-white/20 px-2 py-0.5 rounded-none transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Custom Animated Scrollbar thumb Overlay */}
          <AnimatePresence>
            {scrollbarProps.thumbHeight > 0 && scrollbarProps.visible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 top-0 w-[3px] h-full bg-[#0C0C0C]/5 pointer-events-none"
              >
                <motion.div
                  style={{
                    height: scrollbarProps.thumbHeight,
                    y: scrollbarProps.thumbY
                  }}
                  className="absolute top-0 right-0 w-[3px] bg-[#0C0C0C]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
