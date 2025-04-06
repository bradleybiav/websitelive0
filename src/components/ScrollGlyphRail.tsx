
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

interface ScrollGlyphRailProps {
  visible: boolean;
}

const ScrollGlyphRail: React.FC<ScrollGlyphRailProps> = ({ visible }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const glyphRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!railRef.current) return;
      
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollPercentage = scrollPos / (docHeight - windowHeight);
      
      // Adjust the rail position slightly based on scroll percentage
      railRef.current.style.transform = `translateY(${scrollPercentage * -10}%)`;
      
      // Calculate which glyphs should be active based on scroll position
      const glyphCount = glyphRefs.current.length;
      if (glyphCount > 0) {
        const activeIndex = Math.floor(scrollPercentage * glyphCount);
        
        glyphRefs.current.forEach((glyph, index) => {
          if (!glyph) return;
          
          // Calculate distance from active index
          const distance = Math.abs(index - activeIndex);
          
          // Scale and opacity based on distance from active index
          // Closer glyphs are larger and more vibrant
          const scale = distance <= 1 ? 1.4 - (distance * 0.2) : 
                       distance <= 3 ? 1.2 - (distance * 0.1) : 1;
          const opacity = distance <= 1 ? 1 : 
                         distance <= 3 ? 0.8 : 0.6;
          
          glyph.style.transform = `scale(${scale})`;
          glyph.style.opacity = `${opacity}`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to set positions on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Array of glyph elements for the rail - use more of them to match reference
  const glyphCount = 20;
  const glyphs = Array.from({ length: glyphCount }, (_, i) => {
    // Use a consistent brain icon for brand identity but vary the size slightly
    const size = 16 + (i % 3) * 2; // Varies between 16, 18, and 20px
    return <Brain size={size} className="text-green-500" strokeWidth={1.25} />;
  });
  
  return (
    <div className={cn(
      "fixed right-4 top-0 h-screen pointer-events-none z-10 flex items-center transition-opacity duration-500 hidden md:flex",
      visible ? "opacity-100" : "opacity-0"
    )}>
      <div 
        ref={railRef} 
        className="flex flex-col items-center space-y-6 transition-transform duration-700 ease-out"
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
