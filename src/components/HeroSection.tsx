
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  id: string;
  isActive: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isActive && logoRef.current) {
      logoRef.current.classList.add('animate-float');
    } else if (logoRef.current) {
      logoRef.current.classList.remove('animate-float');
    }
  }, [isActive]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="scroll-section flex flex-col justify-center items-center px-6 py-20 md:py-0"
    >
      <div 
        className={cn(
          "text-center max-w-5xl mx-auto transition-opacity duration-1000",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mb-8 flex justify-center" ref={logoRef}>
          <img 
            src="/lovable-uploads/c1499d03-d412-485f-b24e-3b96975d1fdd.png" 
            alt="Brain in a Vat" 
            className="w-32 md:w-48 lg:w-64 transition-all duration-500 ease-in-out"
          />
        </div>

        <h1 className="header-text mb-6">
          <span className="block">Music Promotion</span>
          <span className="block">Reimagined</span>
        </h1>
        
        <p className="subheader-text max-w-3xl mx-auto mb-10 text-muted-foreground">
          A boutique agency crafting surreal music promotion experiences that transcend conventional boundaries.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <button className="px-8 py-3 border-2 border-black font-medium transition-all duration-300 hover:bg-black hover:text-white">
            Our Services
          </button>
          <button className="px-8 py-3 border-2 border-transparent underline font-medium transition-all duration-300 hover:opacity-70">
            Discover Our Work
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2">Scroll Down</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
