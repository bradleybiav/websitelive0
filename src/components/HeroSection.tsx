
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
      className="min-h-screen w-full flex flex-col justify-center items-center pt-16"
    >
      <div className="text-center space-y-6">
        <div 
          ref={logoRef} 
          className={cn(
            "flex justify-center transition-all duration-400 ease-in-out transform opacity-0",
            showContent && "opacity-100"
          )}
        >
          <img 
            src="/lovable-uploads/ad7d369b-c580-4b75-b322-2777b6cd06bf.png" 
            alt="Brain in a Vat" 
            className="w-[249.6px] md:w-[78.0rem] lg:w-[93.6rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
