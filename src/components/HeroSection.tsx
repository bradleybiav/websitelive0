
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
  const [showContent, setShowContent] = useState(false);

  // Fade in content on initial load
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(logoTimer);
  }, []);

  // Set up event listeners for interaction
  useEffect(() => {
    if (!isActive) return;

    const handleInteraction = () => {
      onInteraction();
    };

    // Add event listeners for various interactions
    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [isActive, onInteraction]);

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
      className={cn(
        "scroll-section flex flex-col justify-center items-center min-h-screen w-full fixed inset-0 z-30 transition-opacity duration-1000",
        isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
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
          <button 
            onClick={onInteraction}
            className="uppercase tracking-widest text-sm font-medium"
          >
            Enter
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
