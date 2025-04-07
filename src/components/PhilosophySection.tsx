
import React, { useState } from 'react';

interface PhilosophySectionProps {
  id: string;
  isActive: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ id }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section 
      id={id} 
      className="py-20 md:py-28 px-6 md:px-12 lg:px-24"
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
            
            {hoveredIndex === null && (
              <div className="opacity-30 p-6 md:p-8 italic text-lg">
                Hover over a philosophy point to see details...
              </div>
            )}
          </div>
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
