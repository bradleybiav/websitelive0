
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
      className="min-h-screen w-full flex flex-col items-center px-6 md:px-12 lg:px-24 pt-20 pb-16" // Further reduced padding
    >
      <div className="text-center space-y-28 flex-1 flex flex-col justify-center"> {/* Reduced spacing from space-y-32 */}
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
