
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

interface ScrollGlyphRailProps {
  visible: boolean;
}

const ScrollGlyphRail: React.FC<ScrollGlyphRailProps> = ({ visible }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const glyphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magnifierRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!railRef.current || !magnifierRef.current) return;
      
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollPercentage = scrollPos / (docHeight - windowHeight);
      
      // More dramatic rail movement based on scroll
      railRef.current.style.transform = `translateY(${scrollPercentage * -25}%)`;
      
      // Position the magnifier to indicate current position - moves at a slower rate
      magnifierRef.current.style.top = `${scrollPercentage * 70}%`;
      
      // Calculate which glyphs should be active based on scroll position
      const glyphCount = glyphRefs.current.length;
      if (glyphCount > 0) {
        const activeIndex = Math.floor(scrollPercentage * glyphCount);
        
        glyphRefs.current.forEach((glyph, index) => {
          if (!glyph) return;
          
          // Calculate distance from active index
          const distance = Math.abs(index - activeIndex);
          
          // More dramatic scaling and opacity effects
          const scale = distance === 0 ? 1.8 :
                       distance === 1 ? 1.5 :
                       distance <= 3 ? 1.2 - (distance * 0.1) : 0.9;
                       
          const opacity = distance === 0 ? 1 :
                         distance === 1 ? 0.9 :
                         distance <= 3 ? 0.8 : 0.5;
          
          // Add a slight rotation for more visual interest
          const rotation = distance <= 1 ? (index % 2 === 0 ? 5 : -5) : 0;
          
          glyph.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
          glyph.style.opacity = `${opacity}`;
          
          // Add a glow effect to active glyphs
          if (distance <= 1) {
            glyph.style.filter = `drop-shadow(0 0 ${8 - distance * 3}px #4ade80)`;
          } else {
            glyph.style.filter = 'none';
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to set positions on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Increased number of glyphs for the rail
  const glyphCount = 24;
  const glyphs = Array.from({ length: glyphCount }, (_, i) => {
    // Use a consistent brain icon for brand identity with more size variation
    const size = 16 + (i % 4) * 2; // Varies between 16, 18, 20, and 22px
    return <Brain size={size} className="text-green-500" strokeWidth={1.25} />;
  });
  
  return (
    <div className={cn(
      "fixed right-4 top-0 h-screen pointer-events-none z-10 flex items-center transition-opacity duration-500 hidden md:flex",
      visible ? "opacity-100" : "opacity-0"
    )}>
      {/* Magnifier container that moves independently of the rail */}
      <div 
        ref={magnifierRef}
        className="absolute right-0 w-16 h-32 bg-gradient-to-b from-transparent via-black/5 to-transparent rounded-full z-20 transition-all duration-300 ease-out"
        style={{ 
          backdropFilter: 'blur(1px)', 
          top: '10%'
        }}
      />
      
      <div 
        ref={railRef} 
        className="flex flex-col items-center space-y-5 transition-transform duration-700 ease-out"
      >
        {glyphs.map((glyph, index) => (
          <div 
            key={index}
            ref={el => glyphRefs.current[index] = el}
            className="transition-all duration-300 ease-out"
            style={{ 
              opacity: 0.6,
              transform: 'scale(1)'
            }}
          >
            {glyph}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollGlyphRail;
