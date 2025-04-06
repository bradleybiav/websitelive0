
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import HeatShimmerShader from '@/components/HeatShimmerShader';
import Navbar from '@/components/Navbar';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollGlyphRail from '@/components/ScrollGlyphRail';
import HeroSection from '@/components/HeroSection';
import HomeSection from '@/components/HomeSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [heroActive, setHeroActive] = useState(true);
  const [navVisible, setNavVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = ['home', 'philosophy', 'services', 'clients', 'contact'];
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  
  const handleHeroInteraction = () => {
    setHeroActive(false);
    setTimeout(() => {
      setNavVisible(true);
      scrollToSection('home');
    }, 500);
  };
  
  // More robust scroll handler that properly detects sections
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || heroActive) return;
      
      // Throttle scroll events
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 50) return;
      lastScrollTimeRef.current = now;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Only detect sections if not actively scrolling to a section
      if (!isScrollingRef.current) {
        // Determine which section is most visible in the viewport
        let maxVisibleSection = '';
        let maxVisibleArea = 0;
        
        for (const sectionId of sections) {
          const sectionElement = document.getElementById(sectionId);
          if (!sectionElement) continue;
          
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(scrollTop, sectionTop);
          const visibleBottom = Math.min(scrollTop + windowHeight, sectionBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Determine which section has the most visible area
          if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight;
            maxVisibleSection = sectionId;
          }
        }
        
        // Update active section if we found one with visible area
        if (maxVisibleSection && maxVisibleSection !== activeSection) {
          setActiveSection(maxVisibleSection);
        }
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Also check section visibility after any resize
      window.addEventListener('resize', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections, heroActive, activeSection]);
  
  const scrollToSection = (sectionId: string) => {
    // Skip if already scrolling or hero is active
    if (isScrollingRef.current || (heroActive && sectionId !== 'home')) {
      return;
    }
    
    console.log(`Scrolling to section: ${sectionId}`);
    
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement && containerRef.current) {
      // Set scrolling flag to prevent interference
      isScrollingRef.current = true;
      
      // Immediately update active section for UI feedback
      setActiveSection(sectionId);
      
      const offsetTop = sectionElement.offsetTop;
      
      // Smooth scroll to the section
      containerRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
        
        // Verify we ended up at the correct section
        if (containerRef.current) {
          const finalScrollTop = containerRef.current.scrollTop;
          const tolerance = 50; // pixel tolerance
          
          // If we're not close to where we should be, try once more
          if (Math.abs(finalScrollTop - offsetTop) > tolerance) {
            containerRef.current.scrollTo({
              top: offsetTop,
              behavior: 'auto' // Immediate jump the second time
            });
          }
        }
      }, 1000); // Wait for scroll animation to complete
    } else {
      console.error(`Could not find section element with id: ${sectionId}`);
    }
  };
  
  return (
    <>
      <HeatShimmerShader />
      
      <div className="relative min-h-screen">
        <Navbar 
          activeSection={activeSection} 
          onSectionClick={scrollToSection} 
          visible={navVisible}
        />
        
        <ScrollIndicator 
          sections={sections} 
          activeSection={activeSection} 
          onDotClick={scrollToSection}
          visible={navVisible}
        />
        
        <ScrollGlyphRail visible={navVisible} />
        
        <HeroSection 
          id="hero" 
          isActive={heroActive} 
          onInteraction={handleHeroInteraction} 
        />
        
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
      </div>
    </>
  );
};

export default Index;
