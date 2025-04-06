
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
      
      // Adjust the transform property for a subtle parallax effect
      railRef.current.style.transform = `translateY(${scrollPercentage * -20}%) rotate(${scrollPercentage * 5}deg)`;
      railRef.current.style.opacity = `${Math.min(0.6 + scrollPercentage * 0.4, 1)}`;
      
      // Calculate which glyphs should be active based on scroll position
      const glyphCount = glyphRefs.current.length;
      if (glyphCount > 0) {
        const activeIndex = Math.floor(scrollPercentage * glyphCount);
        
        glyphRefs.current.forEach((glyph, index) => {
          if (!glyph) return;
          
          // Calculate distance from active index (wrap around if needed)
          const distance = Math.abs(index - activeIndex);
          
          // Scale and opacity based on distance from active index
          // Closer glyphs are larger and more opaque
          const scale = distance <= 2 ? 1.3 - (distance * 0.15) : 1;
          const opacity = distance <= 2 ? 1 - (distance * 0.2) : 0.5;
          
          glyph.style.transform = `scale(${scale})`;
          glyph.style.opacity = `${opacity}`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Array of glyph characters for the rail
  const glyphCount = 15;
  const glyphs = Array.from({ length: glyphCount }, (_, i) => {
    // Use a mix of brain-themed characters and abstract symbols
    return i % 3 === 0 ? <Brain size={18} strokeWidth={1.5} /> : ['◯', '⦿', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕'][i % 10];
  });
  
  return (
    <div className={cn(
      "fixed right-6 top-0 h-screen pointer-events-none z-10 flex items-center transition-opacity duration-500 hidden md:flex",
      visible ? "opacity-100" : "opacity-0"
    )}>
      <div 
        ref={railRef} 
        className="flex flex-col items-center space-y-10 transition-transform duration-700 ease-out"
      >
        {glyphs.map((glyph, index) => (
          <div 
            key={index}
            ref={el => glyphRefs.current[index] = el}
            className="text-black transition-all duration-300 ease-out"
            style={{ 
              opacity: 0.5,
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
