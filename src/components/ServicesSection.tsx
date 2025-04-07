
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
      description: "We craft tailored press campaigns that elevate the visibility of artists and labels within electronic music media and beyond. Our approach builds compelling narratives through strategic placements across a variety of mediums. With a deep understanding of the electronic music landscape, we connect you with the tastemakers and platforms that ensure your story resonates authentically."
    },
    {
      title: "DSP Promo",
      description: "We pitch your release directly to editorial contacts across major platforms like Spotify, Apple Music, Amazon Music, Deezer, and SoundCloud. Beyond standard pitching, our DSP service includes a bespoke third-party playlist placement and algorithmic optimization campaign. We target curators who have featured tracks in your micro niche— driving high-quality listens and refining your release's algorithmic associations."
    },
    {
      title: "Radio Promo",
      description: "We pitch your track for airplay across an international network of radio DJs and music programmers, spanning terrestrial, internet, and satellite stations. In addition, we offer guest mix seeding, pitching stations on exclusive mixes (recorded upon confirmation of interest) or syndicating non-exclusive mixes to shows with recurring guest mix slots."
    },
    {
      title: "Club/Tastemaker DJ Promo",
      description: "Our DJ promo service ensures your release reaches key global tastemaker DJs. Leveraging strong relationships across the electronic music spectrum, we place your track in the hands (or onto the USBs) of influential DJs. Our targeted approach amplifies your music's impact at festivals, clubs, and beyond, generating organic buzz on dance floors worldwide."
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
