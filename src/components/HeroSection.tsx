
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
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24"
    >
      <div className="text-center space-y-32"> {/* Increased space-y from 8 to 32 */}
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

