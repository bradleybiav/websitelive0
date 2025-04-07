
import React, { useState, useEffect, useRef } from 'react';
import ShaderBackground from '@/components/ShaderBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HomeSection from '@/components/HomeSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
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
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveSection(entry.target.id);
            }
          });
        }
      },
      { 
        threshold: 0.5, // Higher threshold to avoid too-early triggers
        rootMargin: "-10% 0px" // Give a small margin to avoid edge cases
      }
    );
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    // Event listener for manual scrolling
    const handleManualScroll = () => {
      if (!isScrollingRef.current) {
        // We're in a manual scroll, not a programmatic one
        // Do nothing special here, let the IntersectionObserver handle it
      }
    };
    
    window.addEventListener('scroll', handleManualScroll, { passive: true });
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleManualScroll);
    };
  }, []);
  
  return (
    <>
      <ShaderBackground />
      
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
