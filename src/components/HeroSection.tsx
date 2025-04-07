
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  id: string;
  isActive: boolean;
  onInteraction: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  // Fade in content on initial load
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-[50vh] w-full flex flex-col justify-center items-center"
    >
      <div className="text-center">
        <div 
          ref={logoRef} 
          className={cn(
            "flex justify-center transition-all duration-400 ease-in-out transform opacity-0",
            showContent && "opacity-100"
          )}
        >
          <img 
            src="/lovable-uploads/270d14ee-cd07-46e3-a81b-e1034854d298.png" 
            alt="Brain in a Vat" 
            className="w-[124.8px] md:w-[39.0rem] lg:w-[46.8rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
