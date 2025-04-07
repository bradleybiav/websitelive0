
import React from 'react';
import { cn } from '@/lib/utils';
import HomeSection from '@/components/HomeSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';

interface ContentContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  activeSection: string;
  navVisible: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  containerRef,
  activeSection,
  navVisible
}) => {
  return (
    <div 
      ref={containerRef} 
      className={cn(
        "scroll-container transition-opacity duration-1000", 
        navVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <HomeSection 
        id="home" 
        isActive={activeSection === 'home'} 
      />
      <PhilosophySection id="philosophy" isActive={activeSection === 'philosophy'} />
      <ServicesSection id="services" isActive={activeSection === 'services'} />
      <ClientsSection id="clients" isActive={activeSection === 'clients'} />
      <ContactSection id="contact" isActive={activeSection === 'contact'} />
    </div>
  );
};

export default ContentContainer;
