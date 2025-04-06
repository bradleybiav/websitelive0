
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PhilosophySectionProps {
  id: string;
  isActive: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openStates, setOpenStates] = useState<boolean[]>([false, false, false, false]);

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
      
      // Reset open states when section is not active
      setOpenStates([false, false, false, false]);
    }
  }, [isActive]);

  const philosophyPoints = [
    {
      title: "Perception Shapes Reality",
      description: "We believe that music is not just heard but experienced. Our approach to promotion creates immersive narratives that shape how audiences perceive and connect with music. Through strategic storytelling and sensory engagement, we transform passive listening into active experiences."
    },
    {
      title: "Beyond Conventional Boundaries",
      description: "Like the philosophical brain in a vat, we challenge the notion of what's possible in music promotion, pushing beyond conventional limitations to create memorable experiences. We dismantle traditional frameworks to create campaigns that traverse the boundaries between digital and physical, conscious and subconscious."
    },
    {
      title: "Mindful Integration",
      description: "We carefully integrate artist vision, audience psychology, and market dynamics to craft promotion strategies that resonate on multiple levels of consciousness. This thoughtful approach ensures that each campaign exists in harmony with the artist's creative universe while strategically positioning them within the broader cultural landscape."
    },
    {
      title: "Conscious Evolution",
      description: "Our methodology embraces constant evolution and adaptation. We believe that effective promotion must respond to the fluid nature of consciousness and culture. By continuously questioning assumptions and refining our approach, we ensure that our strategies remain relevant and impactful in an ever-changing landscape."
    }
  ];

  const toggleCollapsible = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

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
        
        <div className="space-y-6">
          {philosophyPoints.map((point, index) => (
            <div 
              key={index}
              ref={el => elementsRef.current[index + 1] = el}
              className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
            >
              <Collapsible
                open={openStates[index]}
                onOpenChange={() => toggleCollapsible(index)}
                className="border-b border-gray-100 pb-4"
              >
                <CollapsibleTrigger className="w-full group flex justify-between items-center">
                  <h3 className="subheader-text font-semibold text-left hover:text-gray-600 transition-colors">
                    {point.title}
                  </h3>
                  <div className={cn(
                    "h-0.5 w-6 bg-black transition-transform duration-300",
                    openStates[index] ? "rotate-90" : ""
                  )}></div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="body-text text-muted-foreground">
                    {point.description}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
        
        <div 
          ref={el => elementsRef.current[5] = el}
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
