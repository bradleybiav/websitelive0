
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HomeSection from '@/components/HomeSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const isScrollingRef = useRef(false);
  
  const handleSectionClick = (section: string) => {
    isScrollingRef.current = true;
    setActiveSection(section);
    
    // Smooth scroll to the section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Reset the scroll lock after animation completes (approximately)
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };
  
  useEffect(() => {
    // Set up intersection observer to update active section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        // Only process if we're not in a programmatic scroll
        if (!isScrollingRef.current) {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(entry.target.id);
            }
          });
        }
      },
      { 
        threshold: [0.2, 0.3, 0.4, 0.5], // Multiple thresholds for better detection
        rootMargin: "-5% 0px" // Smaller margin to detect sections earlier
      }
    );
    
    // Observe all sections with a slight delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);
    
    // Event listener for manual scrolling
    const handleManualScroll = () => {
      if (!isScrollingRef.current) {
        // We're in a manual scroll, not a programmatic one
        // Do nothing special here, let the IntersectionObserver handle it
      }
    };
    
    window.addEventListener('scroll', handleManualScroll, { passive: true });
    
    return () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleManualScroll);
    };
  }, []);
  
  return (
    <>
      <div className="relative min-h-screen">
        <Navbar 
          activeSection={activeSection} 
          onSectionClick={handleSectionClick} 
          visible={true}
        />
        
        <main>
          <HeroSection 
            id="hero" 
            isActive={activeSection === 'hero'} 
            onInteraction={() => {}}
          />
          
          <div className="space-y-12 md:space-y-24"> {/* Slightly reduced vertical spacing */}
            <HomeSection 
              id="home" 
              isActive={activeSection === 'home'} 
            />
            
            <PhilosophySection 
              id="philosophy" 
              isActive={activeSection === 'philosophy'} 
            />
            
            <ServicesSection 
              id="services" 
              isActive={activeSection === 'services'} 
            />
            
            <ClientsSection 
              id="clients" 
              isActive={activeSection === 'clients'} 
            />
            
            <ContactSection 
              id="contact" 
              isActive={activeSection === 'contact'} 
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
