
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ServicesSectionProps {
  id: string;
  isActive: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ id, isActive }) => {
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

  const services = [
    {
      title: "Press",
      description: "Strategic placement in key publications and digital platforms that align with your artistic vision. We craft compelling narratives and visual assets that capture the essence of your music, securing meaningful coverage that resonates with both established fans and new audiences.",
      icon: "◎"
    },
    {
      title: "DSP",
      description: "Expert navigation of the digital streaming landscape to maximize your presence on platforms like Spotify, Apple Music, and beyond. We develop tailored strategies for playlist placement, algorithmic optimization, and feature opportunities that exponentially expand your digital footprint.",
      icon: "◑"
    },
    {
      title: "Radio",
      description: "Targeted campaigns for both traditional and digital radio channels, leveraging our extensive network of relationships with programmers and tastemakers. We position your music strategically to reach the right listeners at the right moment across the airwaves.",
      icon: "⊙"
    },
    {
      title: "Tastemaker",
      description: "Curated outreach to influential voices in music culture who can amplify your artistic message. We identify and engage with the perfect constellation of bloggers, podcasters, and cultural commentators whose audiences align with your creative universe.",
      icon: "◓"
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
          className="mb-16 transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <h2 className="header-text mb-6">Our Services</h2>
          <div className="w-20 h-1 bg-black mb-12"></div>
          <p className="subheader-text max-w-3xl">
            We offer a range of specialized services designed to elevate your music beyond conventional promotion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <HoverCard key={index} openDelay={75} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div 
                  ref={el => elementsRef.current[index + 1] = el}
                  className="p-6 border border-gray-200 hover:border-black transition-all duration-300 ease-in-out opacity-0 transform translate-y-4 cursor-pointer shimmer-bg"
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                </div>
              </HoverCardTrigger>
              <HoverCardContent 
                className="w-80 bg-white border border-black p-4 shadow-lg"
                side="top"
                align="center"
              >
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        
        <div 
          ref={el => elementsRef.current[5] = el}
          className="mt-16 text-center transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <button className="px-8 py-3 border-2 border-black font-medium transition-all duration-300 hover:bg-black hover:text-white">
            Contact Us For Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
