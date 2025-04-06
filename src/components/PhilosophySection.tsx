
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PhilosophySectionProps {
  id: string;
  isActive: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      elementsRef.current.forEach((element, index) => {
        if (element) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    } else {
      elementsRef.current.forEach(element => {
        if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
        }
      });
    }
  }, [isActive]);

  const philosophyPoints = [
    {
      title: "Perception Shapes Reality",
      description: "We believe that music is not just heard but experienced. Our approach to promotion creates immersive narratives that shape how audiences perceive and connect with music."
    },
    {
      title: "Beyond Conventional Boundaries",
      description: "Like the philosophical brain in a vat, we challenge the notion of what's possible in music promotion, pushing beyond conventional limitations to create memorable experiences."
    },
    {
      title: "Mindful Integration",
      description: "We carefully integrate artist vision, audience psychology, and market dynamics to craft promotion strategies that resonate on multiple levels of consciousness."
    }
  ];

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="scroll-section section-padding"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          ref={el => elementsRef.current[0] = el}
          className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <h2 className="header-text mb-6">Our Philosophy</h2>
          
          <div className="w-20 h-1 bg-black mb-12"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {philosophyPoints.map((point, index) => (
            <div 
              key={index}
              ref={el => elementsRef.current[index + 1] = el}
              className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
            >
              <h3 className="subheader-text mb-4">{point.title}</h3>
              <p className="body-text text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          ref={el => elementsRef.current[4] = el}
          className="mt-16 py-6 border-t border-b border-gray-200 transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <blockquote className="italic text-xl md:text-2xl text-center max-w-3xl mx-auto">
            "We don't just promote music; we create experiences that challenge perception and expand consciousness."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
