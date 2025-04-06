
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HomeSectionProps {
  id: string;
  isActive: boolean;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      contentRef.current.style.opacity = '1';
      contentRef.current.style.transform = 'translateY(0)';
    } else if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(20px)';
    }
  }, [isActive]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="scroll-section section-padding flex flex-col justify-center items-center"
    >
      <div 
        ref={contentRef}
        className={cn(
          "max-w-[700px] text-center mx-auto transition-all duration-500 ease-out opacity-0 transform translate-y-4",
          isActive ? "opacity-100 translate-y-0" : ""
        )}
      >
        <p className="text-xl md:text-2xl font-normal leading-relaxed">
          Brain in a Vat is a boutique music promotion agency that challenges perception and crafts immersive narratives for artists who defy conventional boundaries in sound and expression.
        </p>
      </div>
    </section>
  );
};

export default HomeSection;
