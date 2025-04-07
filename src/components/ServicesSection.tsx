
import React, { useState } from 'react';

interface ServicesSectionProps {
  id: string;
  isActive: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ id }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const services = [
    {
      title: "Press",
      description: "Strategic placement in key publications and digital platforms that align with your artistic vision. We craft compelling narratives and visual assets that capture the essence of your music, securing meaningful coverage that resonates with both established fans and new audiences."
    },
    {
      title: "DSP",
      description: "Expert navigation of the digital streaming landscape to maximize your presence on platforms like Spotify, Apple Music, and beyond. We develop tailored strategies for playlist placement, algorithmic optimization, and feature opportunities that exponentially expand your digital footprint."
    },
    {
      title: "Radio",
      description: "Targeted campaigns for both traditional and digital radio channels, leveraging our extensive network of relationships with programmers and tastemakers. We position your music strategically to reach the right listeners at the right moment across the airwaves."
    },
    {
      title: "Tastemaker",
      description: "Curated outreach to influential voices in music culture who can amplify your artistic message. We identify and engage with the perfect constellation of bloggers, podcasters, and cultural commentators whose audiences align with your creative universe."
    }
  ];

  return (
    <section 
      id={id} 
      className="py-10 md:py-12 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="header-text mb-6">Our Services</h2>
          <div className="w-20 h-1 bg-black mb-8"></div>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className="mb-8 cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 className="text-2xl md:text-3xl font-display font-semibold transition-colors duration-300 group-hover:text-gray-600">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
          
          <div className="col-span-12 md:col-span-8 relative">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full transition-opacity duration-300 ease-in-out p-6 md:p-8 border-l-2 border-black ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <p className="text-lg">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
