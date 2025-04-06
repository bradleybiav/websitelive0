
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
  // Add flag to prevent multiple navigation attempts while scrolling
  const isScrollingRef = useRef(false);
  
  const handleHeroInteraction = () => {
    setHeroActive(false);
    setTimeout(() => {
      setNavVisible(true);
      scrollToSection('home');
    }, 500);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || heroActive || isScrollingRef.current) return;
      
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const scrollPosition = Math.abs(containerTop);
      const windowHeight = window.innerHeight;
      
      // Find the section currently in view
      for (let i = 0; i < sections.length; i++) {
        const sectionElement = document.getElementById(sections[i]);
        if (!sectionElement) continue;
        
        const sectionTop = sectionElement.offsetTop - containerTop;
        const sectionBottom = sectionTop + sectionElement.offsetHeight;
        
        if (
          (scrollPosition >= sectionTop - windowHeight * 0.5) && 
          (scrollPosition < sectionBottom - windowHeight * 0.5)
        ) {
          if (activeSection !== sections[i]) {
            setActiveSection(sections[i]);
          }
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
  }, [sections, heroActive, activeSection]);
  
  const scrollToSection = (sectionId: string) => {
    // Prevent multiple navigation attempts
    if (isScrollingRef.current) {
      return;
    }
    
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement && containerRef.current) {
      // Set scrolling flag to prevent interference
      isScrollingRef.current = true;
      
      const offsetTop = sectionElement.offsetTop;
      console.log(`Section ${sectionId} offsetTop:`, offsetTop);
      
      // Set active section immediately to update UI
      setActiveSection(sectionId);
      
      containerRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800); // Slightly longer than the typical scroll animation
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
