
import React, { useState } from 'react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface PhilosophySectionProps {
  id: string;
  isActive: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ id }) => {
  const [openStates, setOpenStates] = useState<boolean[]>([false, false, false, false]);

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
      className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="header-text mb-6">Our Philosophy</h2>
          <div className="w-20 h-1 bg-black mb-12"></div>
        </div>
        
        <div className="space-y-6">
          {philosophyPoints.map((point, index) => (
            <div key={index}>
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
        
        <div className="mt-16 py-6 border-t border-b border-gray-200">
          <blockquote className="italic text-xl md:text-2xl text-center max-w-3xl mx-auto">
            "We don't just promote music; we create experiences that challenge perception and expand consciousness."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
