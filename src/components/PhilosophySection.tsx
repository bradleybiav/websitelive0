import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PhilosophySectionProps {
  id: string;
  isActive: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const philosophyPoints = [
    {
      title: "Your favorite tastemaker's favorite tastemaker",
      description: "brain in a vat is the unseen force behind some of the most resonant electronic music of today, orchestrating how sound moves through culture."
    },
    {
      title: "Movements — not just campaigns",
      description: "Every strategy is bespoke, every pitch deliberate, every placement meaningful. We don't just amplify music — we shape how it's experienced."
    },
    {
      title: "Context creates impact",
      description: "Discovery is never accidental, it's shaped by the environment in which it's found. We navigate cultural currents to position music where it will be championed."
    },
    {
      title: "Influence isn't accidental",
      description: "brain in a vat connects its clients with the right cultural gatekeepers, ensuring their work is recognized, remembered, and revered."
    }
  ];

  const handleItemClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section 
      id={id} 
      className="py-10 md:py-12 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="header-text mb-6">Our Philosophy</h2>
          <div className="w-20 h-1 bg-black mb-12"></div>
        </div>
        
        {isMobile ? (
          <div className="space-y-8">
            {philosophyPoints.map((point, index) => (
              <div 
                key={index}
                className="cursor-pointer"
              >
                <div 
                  className={`transition-colors duration-300 ${activeIndex === index ? 'text-gray-600' : ''}`}
                  onClick={() => handleItemClick(index)}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">{point.title}</h3>
                </div>
                {activeIndex === index && (
                  <div className="mt-3 border-l-2 border-black pl-4 animate-fade-in">
                    <p className="text-xl">{point.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              {philosophyPoints.map((point, index) => (
                <div 
                  key={index}
                  className="mb-8 cursor-pointer group"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => handleItemClick(index)}
                >
                  <h3 className={`text-2xl md:text-3xl font-display font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-gray-600' : ''}`}>
                    {point.title}
                  </h3>
                </div>
              ))}
            </div>
            
            <div className="col-span-12 md:col-span-7 relative h-full flex items-center">
              {activeIndex !== null && (
                <div className="absolute inset-0 border-l-2 border-black"></div>
              )}
              {philosophyPoints.map((point, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-300 ease-in-out p-6 md:p-8 flex items-center ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xl md:text-2xl font-sans">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhilosophySection;
