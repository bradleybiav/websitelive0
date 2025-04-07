
import { useState, useRef, useEffect } from 'react';

interface UseScrollManagerProps {
  sections: string[];
  heroActive: boolean;
  onSectionChange: (section: string) => void;
}

export function useScrollManager({ 
  sections, 
  heroActive, 
  onSectionChange 
}: UseScrollManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollTargetRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  
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
      
      // Only update if we found a section and it's different from current active section
      if (maxVisibleSection && maxVisibleSection !== activeSection) {
        console.log(`Detected section: ${maxVisibleSection} (ratio: ${maxVisibleRatio.toFixed(2)})`);
        onSectionChange(maxVisibleSection);
      }
    };
    
    // Track the active section locally to fix the comparison bug
    const [activeSection, setActiveSection] = useState('');
    
    // Update local state when onSectionChange is called
    useEffect(() => {
      const originalOnSectionChange = onSectionChange;
      onSectionChange = (section: string) => {
        setActiveSection(section);
        originalOnSectionChange(section);
      };
    }, [onSectionChange]);
    
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
  }, [sections, heroActive, onSectionChange]);
  
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
    onSectionChange(sectionId);
    
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

  return {
    containerRef,
    scrollToSection
  };
}
