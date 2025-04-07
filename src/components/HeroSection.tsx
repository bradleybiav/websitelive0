
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  id: string;
  isActive: boolean;
  onInteraction: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, isActive, onInteraction }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(true);

  // Handle user interaction to enter the site
  const handleEnter = () => {
    setShowContent(false);
    setTimeout(() => {
      onInteraction();
    }, 500); // Slight delay for transition
  };

  // Add event listeners for scroll, click, keydown
  useEffect(() => {
    if (!isActive) return;
    
    const handleScroll = () => handleEnter();
    const handleKeyDown = () => handleEnter();
    const handleClick = () => handleEnter();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, [isActive]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <div className="text-center flex flex-col items-center justify-center h-full">
        <div 
          ref={logoRef} 
          className={cn(
            "flex justify-center transition-all duration-400 ease-in-out transform",
            showContent ? "opacity-100 animate-pulse" : "opacity-0"
          )}
        >
          <img 
            src="/lovable-uploads/c1499d03-d412-485f-b24e-3b96975d1fdd.png" 
            alt="Brain in a Vat" 
            className="w-[124.8px] md:w-[39.0rem] lg:w-[46.8rem]"
          />
        </div>
        
        <div className={cn(
          "mt-12 transition-opacity duration-300 ease-in-out",
          showContent ? "opacity-100" : "opacity-0"
        )}>
          <button 
            onClick={handleEnter} 
            className="text-xl md:text-2xl border-b border-black hover:opacity-70 transition-opacity duration-300 px-4 py-2"
          >
            Enter
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
