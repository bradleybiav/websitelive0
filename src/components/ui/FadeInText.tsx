
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
        "text-2xl md:text-[3.36rem] lg:text-[4.03rem] font-normal leading-tight max-w-[80ch] mx-auto transition-opacity duration-400 opacity-0",
        showContent && "opacity-100",
        className
      )}
    >
      {text}
    </p>
  );
};

export default FadeInText;
