
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showContent: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, showContent }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={logoRef} 
      className={cn(
        "flex justify-center transition-all duration-400 ease-in-out transform opacity-0",
        showContent && "opacity-100",
        className
      )}
    >
      <img 
        src="/lovable-uploads/ae35b706-929b-4ead-b6f1-1ef0e3dbd7c5.png" 
        alt="Brain in a Vat" 
        className="w-[249.6px] md:w-[78.0rem] lg:w-[93.6rem]"
      />
    </div>
  );
};

export default Logo;
