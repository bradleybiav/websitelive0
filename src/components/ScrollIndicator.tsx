
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import brainIcon from '/lovable-uploads/55ba2a74-4fc3-45c5-aa66-9fb7986e555d.png';

const ScrollIndicator = () => {
  const [scrollY, setScrollY] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Number of brain icons to display
  const iconCount = 12;
  
  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollY(window.scrollY);
      setDocumentHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    
    // Initialize
    updateScrollPosition();
    
    window.addEventListener('scroll', updateScrollPosition);
    window.addEventListener('resize', updateScrollPosition);
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, []);
  
  // Don't render on mobile
  if (!isDesktop) return null;
  
  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: iconCount }).map((_, index) => {
        // Calculate which icon should be magnified based on scroll position
        const scrollPercentage = Math.min(scrollY / documentHeight, 1);
        const iconPosition = index / (iconCount - 1);
        
        // Calculate distance from current scroll position (0 means this icon is at the scroll position)
        const distanceFromScrollPosition = Math.abs(scrollPercentage - iconPosition);
        
        // Scale effect - closest icon gets largest, others scale down based on distance
        const maxScale = 1.8;
        const scale = maxScale - Math.min(distanceFromScrollPosition * 5, maxScale - 0.6);
        
        // Opacity - make distant icons slightly transparent
        const opacity = 0.3 + Math.max(0, 1 - distanceFromScrollPosition * 3) * 0.7;
        
        return (
          <div 
            key={index}
            className="my-1 transition-all duration-300 ease-in-out hover:animate-jiggle"
            style={{ 
              transform: `scale(${scale})`,
              opacity
            }}
          >
            <img 
              src={brainIcon} 
              alt="" 
              className="w-6 h-6 dark:invert"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScrollIndicator;
