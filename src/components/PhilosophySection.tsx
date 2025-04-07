
import React, { useState } from 'react';

interface PhilosophySectionProps {
  id: string;
  isActive: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ id }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      description: "Discovery is never accidental. Music isn't just heard, it's shaped by the environment in which it's found: who's talking about it, where it appears, and the signals of credibility that surround it. We navigate cultural currents to position music where it will be championed, ensuring it resonates in the right spaces at the right time."
    },
    {
      title: "Influence isn't accidental",
      description: "brain in a vat connects its clients with the right cultural gatekeepers, ensuring their work is recognized, remembered, and revered."
    }
  ];

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
        
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            {philosophyPoints.map((point, index) => (
              <div 
                key={index}
                className="mb-8 cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 className="text-2xl md:text-3xl font-display font-semibold transition-colors duration-300 group-hover:text-gray-600">
                  {point.title}
                </h3>
              </div>
            ))}
          </div>
          
          <div className="col-span-12 md:col-span-7 relative">
            {philosophyPoints.map((point, index) => (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full transition-opacity duration-300 ease-in-out p-6 md:p-8 border-l-2 border-black ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <p className="text-lg">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 py-4 border-t border-b border-gray-200">
          <blockquote className="italic text-xl md:text-2xl text-center max-w-3xl mx-auto">
            "We don't just promote music; we create experiences that challenge perception and expand consciousness."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
