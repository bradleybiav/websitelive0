
import React, { useState, useEffect, useRef } from 'react';
import HeatShimmerShader from '@/components/HeatShimmerShader';
import Navbar from '@/components/Navbar';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollGlyphRail from '@/components/ScrollGlyphRail';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = ['home', 'philosophy', 'services', 'clients', 'contact'];
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const scrollPosition = Math.abs(containerTop);
      const windowHeight = window.innerHeight;
      
      // Find which section is currently in view
      for (let i = 0; i < sections.length; i++) {
        const sectionElement = document.getElementById(sections[i]);
        if (!sectionElement) continue;
        
        const sectionTop = sectionElement.offsetTop - containerTop;
        const sectionBottom = sectionTop + sectionElement.offsetHeight;
        
        // If the section is in view
        if (
          (scrollPosition >= sectionTop - windowHeight * 0.5) && 
          (scrollPosition < sectionBottom - windowHeight * 0.5)
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sections]);
  
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement && containerRef.current) {
      containerRef.current.scrollTo({
        top: sectionElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <>
      <HeatShimmerShader />
      
      <div className="relative min-h-screen">
        <Navbar activeSection={activeSection} onSectionClick={scrollToSection} />
        
        <ScrollIndicator 
          sections={sections} 
          activeSection={activeSection} 
          onDotClick={scrollToSection} 
        />
        
        <ScrollGlyphRail />
        
        <div ref={containerRef} className="scroll-container">
          <HeroSection id="home" isActive={activeSection === 'home'} />
          <PhilosophySection id="philosophy" isActive={activeSection === 'philosophy'} />
          <ServicesSection id="services" isActive={activeSection === 'services'} />
          <ClientsSection id="clients" isActive={activeSection === 'clients'} />
          <ContactSection id="contact" isActive={activeSection === 'contact'} />
        </div>
      </div>
    </>
  );
};

export default Index;
