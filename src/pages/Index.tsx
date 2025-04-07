
import React, { useState } from 'react';
import HeatShimmerShader from '@/components/HeatShimmerShader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HomeSection from '@/components/HomeSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    // Smooth scroll to the section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <HeatShimmerShader />
      
      <div className="relative min-h-screen">
        <Navbar 
          activeSection={activeSection} 
          onSectionClick={handleSectionClick} 
          visible={true}
        />
        
        <main className="pt-16"> {/* Add padding-top to accommodate fixed navbar */}
          <HeroSection 
            id="hero" 
            isActive={true} 
            onInteraction={() => {}} 
          />
          
          <HomeSection 
            id="home" 
            isActive={true} 
          />
          
          <PhilosophySection 
            id="philosophy" 
            isActive={true} 
          />
          
          <ServicesSection 
            id="services" 
            isActive={true} 
          />
          
          <ClientsSection 
            id="clients" 
            isActive={true} 
          />
          
          <ContactSection 
            id="contact" 
            isActive={true} 
          />
        </main>
      </div>
    </>
  );
};

export default Index;
