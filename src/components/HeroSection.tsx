
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/components/ui/Logo';
import FadeInText from '@/components/ui/FadeInText';

interface HeroSectionProps {
  id: string;
  isActive?: boolean;
  onInteraction?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      className="min-h-screen w-full flex flex-col items-center px-6 md:px-12 lg:px-24 pt-36 pb-36" // Changed from justify-center to specific padding
    >
      <div className="text-center space-y-32 flex-1 flex flex-col justify-center"> {/* Added flex properties */}
        <Logo showContent={showContent} />
        <FadeInText 
          text="brain in a vat is a boutique music promotions agency that shapes perception and shifts reality."
          showContent={showContent}
        />
      </div>
    </section>
  );
};

export default HeroSection;
