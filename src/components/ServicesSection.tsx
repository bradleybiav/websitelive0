
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServicesSectionProps {
  id: string;
  isActive: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const services = [
    {
      title: "DSP Promo",
      description: "We pitch directly to editorial teams at platforms like Spotify, Apple Music, Amazon Music, Deezer, and SoundCloud. Our approach includes targeted third-party playlisting and algorithmic positioning to drive fan discovery and engagement."
    },
    {
      title: "Radio Promo",
      description: "We pitch your release for airplay across a global network of radio DJs and programmers — FM, satellite, and digital — and can seed guest mixes to support a release or tour stop in key markets."
    },
    {
      title: "Club/Tastemaker DJ Promo",
      description: "We ensure your music reaches key global tastemaker DJs. Our targeted outreach gets your release into the right hands, creating momentum in clubs, on dance floors, and at festivals worldwide."
    },
    {
      title: "Press",
      description: "We run tailored press campaigns that connect artists and labels with the right voices in electronic music media and beyond. Each campaign is grounded in a clear narrative and focused outreach, building credibility and crafting narrative through deliberate, meaningful placements."
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
        <div className="mb-8">
          <h2 className="header-text mb-6">Our Services</h2>
          <div className="w-20 h-1 bg-black mb-8"></div>
        </div>
        
        {isMobile ? (
          // Mobile layout - vertical accordion style
          <div className="space-y-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="cursor-pointer"
              >
                <div 
                  className={`transition-colors duration-300 ${activeIndex === index ? 'text-gray-600' : ''}`}
                  onClick={() => handleItemClick(index)}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">{service.title}</h3>
                </div>
                {activeIndex === index && (
                  <div className="mt-3 border-l-2 border-black pl-4 animate-fade-in">
                    <p className="text-xl">{service.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Desktop layout - hover with column layout
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="mb-8 cursor-pointer group"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => handleItemClick(index)}
                >
                  <h3 className={`text-2xl md:text-3xl font-display font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-gray-600' : ''}`}>
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
                    activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xl md:text-2xl font-sans">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
