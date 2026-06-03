import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import CSBackgroundAnimation from './components/CSBackgroundAnimation';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll on the 500vh parent container
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Track which horizontal screen is currently active (0 to 4)
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // 5 screens (0: Hero, 1: About, 2: Skills, 3: Projects, 4: Footer)
      const index = Math.round(latest * 4);
      setActiveIndex(index);
    });
  }, [scrollYProgress]);
  
  // Translate container horizontally: at progress 1, translation is -400vw (the last screen is in view)
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-400vw"]);

  // Programmatic scroll helper for horizontal pages
  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: window.innerHeight * index,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#FFFFFF] text-[#0C0C0C] select-none font-sans">
      
      {/* Fixed Header Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 sm:px-16 md:px-28 lg:px-36 py-5 z-50 bg-white/70 backdrop-blur-md border-b border-[#0C0C0C]/5">
        <button 
          onClick={() => scrollToSection(1)} 
          className="text-[#0C0C0C] font-sans font-semibold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm hover:opacity-60 transition-opacity"
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection(2)} 
          className="text-[#0C0C0C] font-sans font-semibold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm hover:opacity-60 transition-opacity"
        >
          Skills
        </button>
        <button 
          onClick={() => scrollToSection(3)} 
          className="text-[#0C0C0C] font-sans font-semibold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm hover:opacity-60 transition-opacity"
        >
          Projects
        </button>
        <button 
          onClick={() => scrollToSection(4)} 
          className="text-[#0C0C0C] font-sans font-semibold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm hover:opacity-60 transition-opacity"
        >
          Contact
        </button>
 
        {/* Scroll Progress Bar at the bottom of the Navbar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0C0C0C]/5 rounded-b-full overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            className="w-full h-full bg-[#0C0C0C]"
          />
        </div>
      </nav>
 
      {/* Sticky Slide Viewport Wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fixed Background CS Animation */}
        <CSBackgroundAnimation />
 
        <motion.div 
          style={{ x }} 
          className="flex flex-row w-[500vw] h-full"
        >
          <HeroSection isActive={activeIndex === 0} />
          <AboutSection isActive={activeIndex === 1} progress={scrollYProgress} />
          <ServicesSection isActive={activeIndex === 2} />
          <ProjectsSection progress={scrollYProgress} activeIndex={activeIndex} />
          <Footer isActive={activeIndex === 4} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
