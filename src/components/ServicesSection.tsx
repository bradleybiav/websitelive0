
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
      title: "Strategic Campaign Development",
      description: "Comprehensive promotion strategies tailored to your artistic vision and target audience, crafted to maximize impact across all platforms.",
      icon: "◎"
    },
    {
      title: "Immersive Content Creation",
      description: "Surreal, attention-grabbing visual and written content that elevates your music and creates a cohesive narrative around your releases.",
      icon: "◑"
    },
    {
      title: "Media Relations & Placement",
      description: "Strategic outreach to our extensive network of publications, playlists, radio stations, and influencers to secure meaningful coverage.",
      icon: "⊙"
    },
    {
      title: "Digital Presence Optimization",
      description: "Enhancement of your online presence through website design, social media strategy, and algorithmic optimization techniques.",
      icon: "◓"
    },
    {
      title: "Release Strategy & Planning",
      description: "Detailed release timelines, coordinated cross-platform strategies, and audience engagement tactics to maximize each release's potential.",
      icon: "⦿"
    },
    {
      title: "Performance & Tour Support",
      description: "Comprehensive promotion for live events, tour support, and creation of immersive experiences that extend beyond the traditional concert format.",
      icon: "⊛"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => elementsRef.current[index + 1] = el}
              className="p-6 border border-gray-200 hover:border-black transition-all duration-300 ease-in-out opacity-0 transform translate-y-4"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          ref={el => elementsRef.current[7] = el}
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
