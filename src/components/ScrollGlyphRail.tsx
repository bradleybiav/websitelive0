
import React, { useEffect, useRef } from 'react';

const ScrollGlyphRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!railRef.current) return;
      
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollPercentage = scrollPos / (docHeight - windowHeight);
      
      // Adjust the transform property for a subtle parallax effect
      railRef.current.style.transform = `translateY(${scrollPercentage * -20}%) rotate(${scrollPercentage * 10}deg)`;
      railRef.current.style.opacity = `${Math.min(0.6 + scrollPercentage * 0.4, 1)}`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Array of glyph characters for the rail
  const glyphs = Array.from({ length: 15 }, (_, i) => {
    // Alternate between brain-related and abstract symbols
    const symbols = ['◯', '⦿', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕', '⊛', '⊗', '⊙', '⊚', '⦾'];
    return symbols[i % symbols.length];
  });
  
  return (
    <div className="fixed left-6 top-0 h-screen pointer-events-none z-10 flex items-center">
      <div 
        ref={railRef} 
        className="flex flex-col items-center space-y-8 transition-transform duration-700 ease-out"
      >
        {glyphs.map((glyph, index) => (
          <div 
            key={index} 
            className="text-black opacity-50 text-xl transform transition-all hover:scale-125 hover:opacity-100"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {glyph}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollGlyphRail;
