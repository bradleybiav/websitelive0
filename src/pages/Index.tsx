
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
  const scrollTargetRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  const handleHeroInteraction = () => {
    setHeroActive(false);
    setTimeout(() => {
      setNavVisible(true);
      scrollToSection('home');
    }, 500);
  };
  
  // Reset scroll state if stuck
  useEffect(() => {
    const resetScrollState = () => {
      if (isScrollingRef.current) {
        console.log('Resetting scroll state after timeout');
        isScrollingRef.current = false;
      }
    };
    
    // Reset scroll state after 2 seconds if still locked
    const interval = setInterval(resetScrollState, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Improved scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || heroActive) return;
      
      // Don't process scroll events during programmatic scrolling
      if (isScrollingRef.current) {
        return;
      }
      
      // Throttle scroll events to improve performance
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 50) return;
      lastScrollTimeRef.current = now;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to determine the final scroll position
      scrollTimeoutRef.current = window.setTimeout(() => {
        if (containerRef.current && !isScrollingRef.current) {
          detectVisibleSection();
        }
        scrollTimeoutRef.current = null;
      }, 100);
    };
    
    const detectVisibleSection = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Determine which section is most visible
      let maxVisibleSection = '';
      let maxVisibleRatio = 0;
      
      sections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;
        
        const sectionRect = sectionElement.getBoundingClientRect();
        const visibleHeight = Math.min(sectionRect.bottom, windowHeight) - 
                             Math.max(sectionRect.top, 0);
        
        // Calculate what percentage of the viewport this section occupies
        const visibleRatio = visibleHeight / windowHeight;
        
        if (visibleRatio > maxVisibleRatio) {
          maxVisibleRatio = visibleRatio;
          maxVisibleSection = sectionId;
        }
      });
      
      // Only update if we found a section and it's different from current
      if (maxVisibleSection && maxVisibleSection !== activeSection) {
        console.log(`Detected section: ${maxVisibleSection} (ratio: ${maxVisibleRatio.toFixed(2)})`);
        setActiveSection(maxVisibleSection);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', detectVisibleSection);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', detectVisibleSection);
      
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sections, heroActive, activeSection]);
  
  const scrollToSection = (sectionId: string) => {
    // Prevent multiple scroll attempts
    if (isScrollingRef.current) {
      console.log(`Ignoring scroll request to ${sectionId} - already scrolling`);
      return;
    }
    
    // Skip if hero is active (except for home)
    if (heroActive && sectionId !== 'home') {
      return;
    }
    
    console.log(`Scrolling to section: ${sectionId}`);
    
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement || !containerRef.current) {
      console.error(`Could not find section element with id: ${sectionId}`);
      return;
    }
    
    // Immediately update active section for UI feedback
    setActiveSection(sectionId);
    
    // Set scrolling flag and target
    isScrollingRef.current = true;
    scrollTargetRef.current = sectionId;
    
    // Get correct scroll position
    const offsetTop = sectionElement.offsetTop;
    
    // Perform the scroll
    containerRef.current.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    
    // Reset scrolling flag after animation completes
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
      scrollTargetRef.current = null;
      
      // Verify the scroll position
      if (containerRef.current) {
        const currentScrollTop = containerRef.current.scrollTop;
        const tolerance = 5; // smaller tolerance
        
        if (Math.abs(currentScrollTop - offsetTop) > tolerance) {
          console.log(`Scroll didn't end at expected position. Adjusting to ${offsetTop}`);
          containerRef.current.scrollTo({
            top: offsetTop,
            behavior: 'auto'
          });
        }
      }
      
      scrollTimeoutRef.current = null;
    }, 1000); // Wait for scroll animation to complete
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
