import { cn } from "@/lib/utils";
import React from "react";

interface FadeInTextProps {
  text: string;
  showContent: boolean;
  className?: string;
  id?: string;
}

const FadeInText: React.FC<FadeInTextProps> = ({ text, showContent, className, id }) => {
  return (
    <p
      id={id}
      className={cn(
        "text-xl md:text-[2.86rem] lg:text-[3.43rem] font-normal leading-tight max-w-[80ch] mx-auto transition-opacity duration-400 opacity-0",
        showContent && "opacity-100",
        className
      )}
    >
      {text}
    </p>
  );
};

export default FadeInText;
