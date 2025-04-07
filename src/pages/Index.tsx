
import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    // Set up intersection observer to update active section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  
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
