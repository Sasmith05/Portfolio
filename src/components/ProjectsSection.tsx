import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { HoverLetters } from './TextEffects';

const projectsData = [
  {
    num: "01",
    category: "Next.js | PostgreSQL | Prisma",
    name: "LexDesk",
    desc: "Legal practice management platform with secure authentication and responsive dashboards.",
    github: "https://github.com/Sasmith05/LexDesk.git",
    live: "https://lexdesk-o.vercel.app",
    status: "Completed"
  },
  {
    num: "02",
    category: "Next.js | TypeScript | Supabase",
    name: "WARAM",
    desc: "Developed a full-stack legal services and property management platform using Next.js, TypeScript, Supabase, and PostgreSQL. Features include property listings, event management, customer enquiry handling, a secure admin dashboard with authentication and CRUD operations, bilingual support (English & Tamil), responsive UI, image uploads, and Row-Level Security (RLS) for secure data management.",
    github: "https://github.com/Sasmith05/Waram.git",
    live: "https://waramdocumentation.vercel.app/",
    status: "Completed"
  },
  {
    num: "03",
    category: "Next.js | Framer Motion",
    name: "MoviEx",
    desc: "Movie discovery web application with modern UI and dynamic movie browsing experience.",
    github: "https://github.com/Sasmith05/eth-moviex.git",
    live: "https://eth-moviex.vercel.app",
    status: "Completed"
  },
  {
    num: "04",
    category: "React | Node.js | MySQL",
    name: "ProTrack",
    desc: "Productivity and task management platform focused on workflow organization and performance tracking.",
    github: "https://github.com/Sasmith05/ProTrack.git",
    live: "",
    status: "On Progress"
  }
];

interface ProjectsSectionProps {
  progress: MotionValue<number>;
  activeIndex: number;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ progress, activeIndex }) => {
  const center = 3 / 4;
  const start = 2 / 4;
  const end = 4 / 4;

  // Animate the entire section scale and opacity as it slides past the viewport center
  const scale = useTransform(progress, [start, center, end], [0.94, 1, 0.94]);
  const opacity = useTransform(progress, [start, center, end], [0.6, 1, 0.6]);

  const isActive = activeIndex === 3;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.215, 0.61, 0.355, 1] as any
      }
    }
  };

  return (
    <section 
      id="projects"
      className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-[#FFFFFF] px-6 sm:px-12 md:px-20 relative z-10"
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full max-w-6xl mx-auto flex flex-col justify-center h-full pt-12"
      >
        {/* Heading with Outfit font style (sans-serif bold italic uppercase) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
          className="w-full"
        >
          <h2 className="font-sans font-black italic uppercase text-center text-[#0C0C0C] text-[clamp(2.5rem,6vw,5.5rem)] tracking-tighter leading-none mb-8 sm:mb-12">
            <HoverLetters text="Projects" />
          </h2>
        </motion.div>

        {/* 4-Column Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-h-[65vh] md:max-h-none overflow-y-auto md:overflow-visible no-scrollbar pb-12 md:pb-0"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.num}
              variants={cardVariants}
              className="border-2 border-[#0C0C0C] bg-[#FFFFFF] p-5 sm:p-6 rounded-none flex flex-col justify-between min-h-[360px] sm:min-h-[380px] md:h-full hover:bg-[#0C0C0C] hover:text-white transition-all duration-300 group cursor-default text-left shadow-md hover:shadow-2xl active:scale-[0.98]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Top Row: Number & Category */}
                  <div className="flex justify-between items-start pb-3 border-b border-[#0C0C0C]/10 group-hover:border-white/10 transition-colors duration-300">
                    <span className="font-sans font-bold text-xs text-[#0C0C0C]/40 group-hover:text-white/40 transition-colors duration-300">
                      {project.num}
                    </span>
                    <span className="font-sans font-semibold text-[#0C0C0C]/50 group-hover:text-white/60 uppercase text-[9px] sm:text-[10px] tracking-wider text-right max-w-[70%]">
                      {project.category}
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="font-sans font-extrabold uppercase text-base sm:text-lg tracking-wide mt-4 mb-2">
                    {project.name}
                  </h3>
                  <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-[#0C0C0C]/70 group-hover:text-white/80 line-clamp-4 transition-colors duration-300">
                    {project.desc}
                  </p>
                </div>

                <div>
                  {/* Project Status */}
                  <div className="mt-4 pt-3 border-t border-[#0C0C0C]/10 group-hover:border-white/10 transition-colors duration-300 flex items-center justify-between">
                    <span className="font-sans font-medium text-[10px] uppercase tracking-wider text-[#0C0C0C]/40 group-hover:text-white/40 transition-colors duration-300">
                      Status
                    </span>
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#0C0C0C] text-[#0C0C0C] group-hover:border-white group-hover:text-white transition-all duration-300 rounded-none">
                      {project.status}
                    </span>
                  </div>

                  {/* Bottom Row: Actions */}
                  <div className={`grid ${project.live ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mt-5`}>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      <button className="w-full rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-wider py-2.5 text-xs transition-all duration-300 hover:bg-[#0C0C0C] hover:text-white group-hover:border-white group-hover:bg-[#0C0C0C] group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-[#0C0C0C] active:scale-[0.97] flex items-center justify-center cursor-pointer">
                        GitHub
                      </button>
                    </a>
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full"
                      >
                        <button className="w-full rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-wider py-2.5 text-xs transition-all duration-300 hover:bg-[#0C0C0C] hover:text-white group-hover:border-white group-hover:bg-[#0C0C0C] group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-[#0C0C0C] active:scale-[0.97] flex items-center justify-center cursor-pointer">
                          Live Demo
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
