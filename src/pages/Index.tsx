
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
      
      // Reset the scroll lock after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800); // Slightly reduced from 1000ms
    }
  };
  
  useEffect(() => {
    // Set up intersection observer with more sensitive thresholds
    const observer = new IntersectionObserver(
      (entries) => {
        // Only process if we're not in a programmatic scroll
        if (!isScrollingRef.current) {
          entries.forEach((entry) => {
            // Even lower threshold for earlier detection, especially for clients section
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
              setActiveSection(entry.target.id);
              console.log("Section visible:", entry.target.id, "with ratio:", entry.intersectionRatio);
            }
          });
        }
      },
      { 
        threshold: [0.05, 0.1, 0.15, 0.2, 0.3], // More gradual thresholds for smoother transitions
        rootMargin: "-5px 0px" // Even smaller margin for earlier detection
      }
    );
    
    // Observe all sections with shorter delay
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        observer.observe(section);
        console.log("Observing section:", section.id);
      });
    }, 300); // Reduced delay for faster initialization
    
    // Handle manual scrolling
    const handleManualScroll = () => {
      if (!isScrollingRef.current) {
        // We're in a manual scroll, the observer will handle section detection
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
          
          <div className="space-y-6 md:space-y-12"> {/* Further reduced vertical spacing */}
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
