import FadeInText from "@/components/ui/FadeInText";
import Logo from "@/components/ui/Logo";
import React, { useEffect, useRef, useState } from "react";

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
    }, 800); // Slightly faster initial animation

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center px-6 md:px-12 lg:px-24 pt-16 pb-12" // Further reduced padding
    >
      <div className="text-center space-y-24 flex-1 flex flex-col justify-center">
        {" "}
        {/* Reduced spacing from space-y-28 */}
        <Logo showContent={showContent} />
        <FadeInText
          id="hero-title"
          text="brain in a vat is a boutique music promotions agency that shapes perception and shifts reality."
          showContent={showContent}
        />
      </div>
    </section>
  );
};

export default HeroSection;
