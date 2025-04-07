
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
  const lastScrollTime = useRef(Date.now());
  
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
      }, 600); // Shorter duration for more responsive controls
    }
  };
  
  useEffect(() => {
    // Improve scroll detection with more granular thresholds
    const observer = new IntersectionObserver(
      (entries) => {
        // Only process if not in programmatic scroll or if enough time has passed
        const now = Date.now();
        if (!isScrollingRef.current || (now - lastScrollTime.current > 100)) {
          lastScrollTime.current = now;
          
          entries.forEach((entry) => {
            // Even lower threshold (10%) for earlier and smoother detection
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
              setActiveSection(entry.target.id);
              console.log("Section visible:", entry.target.id, "with ratio:", entry.intersectionRatio);
            }
          });
        }
      },
      { 
        // More granular thresholds for smoother transitions
        threshold: [0.05, 0.075, 0.1, 0.125, 0.15, 0.2, 0.25, 0.3], 
        rootMargin: "-2px 0px" // Minimal margin for more precise detection
      }
    );
    
    // Set up scroll event to track scroll status
    const handleScroll = () => {
      lastScrollTime.current = Date.now();
      
      // Only handle scroll logic if not during programmatic scrolling
      if (!isScrollingRef.current) {
        // We're manually scrolling now
        // (Intersection observer will handle section detection)
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Observe all sections with shorter delay
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        observer.observe(section);
        console.log("Observing section:", section.id);
      });
    }, 200); // Slightly reduced delay for faster initialization
    
    return () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
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
          
          <div className="space-y-0 md:space-y-6"> {/* Removed vertical spacing completely */}
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
