import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section 
      id="skills"
      className="relative h-screen w-screen flex-shrink-0 bg-[#FFFFFF] text-[#0C0C0C] px-6 sm:px-12 md:px-20 py-20 flex items-center justify-center z-0 border-l border-r border-[#0C0C0C]/5"
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

        {/* Skills Cards Grid with Staggered entrance */}
        <motion.div 
          variants={listContainerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin pb-4"
        >
          {servicesData.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.num} 
                variants={itemVariants}
                className="border-2 border-[#0C0C0C] bg-white p-6 rounded-none flex flex-col justify-between hover:bg-[#0C0C0C] hover:text-white transition-all duration-300 group cursor-default shadow-sm hover:shadow-xl active:scale-[0.98]"
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
      </div>
    </section>
  );
};

export default ServicesSection;
