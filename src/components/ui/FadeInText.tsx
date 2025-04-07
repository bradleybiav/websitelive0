
import React from 'react';
import { cn } from '@/lib/utils';

interface FadeInTextProps {
  text: string;
  showContent: boolean;
  className?: string;
}

const FadeInText: React.FC<FadeInTextProps> = ({ text, showContent, className }) => {
  return (
    <p 
      className={cn(
        "text-3xl md:text-[4.8rem] lg:text-[5.76rem] font-normal leading-relaxed px-6 md:px-12 lg:px-24 transition-opacity duration-400 opacity-0",
        showContent && "opacity-100",
        className
      )}
    >
      {text}
    </p>
  );
};

export default FadeInText;
