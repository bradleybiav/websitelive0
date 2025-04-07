
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

  // Handle logo hover animation
  const handleLogoHover = (isHovering: boolean) => {
    if (logoRef.current) {
      logoRef.current.style.transform = isHovering ? 'scale(1.03)' : 'scale(1)';
    }
  };

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-[80vh] w-full flex flex-col justify-center items-center"
    >
      <div className="text-center">
        <div 
          ref={logoRef} 
          className={cn(
            "mb-8 flex justify-center transition-all duration-400 ease-in-out transform opacity-0",
            showContent && "opacity-100"
          )}
          onMouseEnter={() => handleLogoHover(true)}
          onMouseLeave={() => handleLogoHover(false)}
        >
          <img 
            src="/lovable-uploads/c1499d03-d412-485f-b24e-3b96975d1fdd.png" 
            alt="Brain in a Vat" 
            className="w-32 md:w-48 lg:w-64"
          />
        </div>

        <div 
          className={cn(
            "mt-8 transition-all duration-500 delay-500 transform opacity-0 translate-y-4", 
            showContent && "opacity-100 translate-y-0"
          )}
        >
          <h1 className="header-text">Brain in a Vat</h1>
          <p className="mt-4 subheader-text">Music Promotion Agency</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
