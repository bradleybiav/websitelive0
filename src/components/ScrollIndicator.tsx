
import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  sections: string[];
  activeSection: string;
  onDotClick: (section: string) => void;
  visible: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  sections, 
  activeSection, 
  onDotClick,
  visible
}) => {
  return (
    <div className={cn(
      "scroll-indicator hidden md:block transition-opacity duration-500",
      visible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      {sections.map((section) => (
        <div 
          key={section}
          className="relative group"
          onClick={() => onDotClick(section)}
        >
          <div 
            className={cn(
              "scroll-dot cursor-pointer transition-all duration-300",
              activeSection === section ? "active" : ""
            )} 
          />
          <div className="absolute left-0 transform -translate-x-[calc(100%+15px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <span className="text-xs font-medium capitalize bg-white px-2 py-1 rounded-full shadow-sm">
              {section}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollIndicator;
