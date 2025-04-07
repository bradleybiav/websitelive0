
import React, { useState } from 'react';
import HeatShimmerShader from '@/components/HeatShimmerShader';
import Navbar from '@/components/Navbar';
import ScrollGlyphRail from '@/components/ScrollGlyphRail';
import HeroSection from '@/components/HeroSection';
import ContentContainer from '@/components/ContentContainer';
import { useScrollManager } from '@/hooks/useScrollManager';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [heroActive, setHeroActive] = useState(true);
  const [navVisible, setNavVisible] = useState(false);
  const sections = ['home', 'philosophy', 'services', 'clients', 'contact'];
  
  const { containerRef, scrollToSection } = useScrollManager({
    sections,
    heroActive,
    onSectionChange: setActiveSection
  });
  
  const handleHeroInteraction = () => {
    setHeroActive(false);
    setTimeout(() => {
      setNavVisible(true);
      scrollToSection('home');
    }, 500);
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
        
        {/* Removed ScrollIndicator component */}
        
        <ScrollGlyphRail visible={navVisible} />
        
        <HeroSection 
          id="hero" 
          isActive={heroActive} 
          onInteraction={handleHeroInteraction} 
        />
        
        <ContentContainer
          containerRef={containerRef}
          activeSection={activeSection}
          navVisible={navVisible}
        />
      </div>
    </>
  );
};

export default Index;
