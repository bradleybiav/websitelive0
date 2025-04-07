
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ClientsGrid } from "@/components/ui/clients-grid";

interface ClientsSectionProps {
  id: string;
  isActive: boolean;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Improved animation with persistent visibility
  useEffect(() => {
    if (isActive && sectionRef.current) {
      // Trigger animations with minimal delay and keep elements visible
      elementsRef.current.forEach((element, index) => {
        if (element) {
          // Set initial visibility to prevent flickering
          element.style.opacity = '0.6'; // Start slightly visible to prevent complete disappearance
          
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 30); // Even faster animation sequence
        }
      });
    } else if (!isActive && sectionRef.current) {
      // Keep elements partially visible even when section isn't active
      // This prevents the complete disappearance during scroll events
      elementsRef.current.forEach(element => {
        if (element) {
          element.style.opacity = '0.4'; // Keep slightly visible instead of fully hidden
          element.style.transform = 'translateY(5px)'; // Smaller transform to reduce jumpiness
        }
      });
    }
  }, [isActive]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-4 md:py-6 px-6 md:px-12 lg:px-24"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto w-full",
          // Maintain base visibility with smoother transitions
          isActive ? "opacity-100 transition-opacity duration-300" : "opacity-85 transition-opacity duration-200"
        )}
      >
        <div 
          ref={el => elementsRef.current[0] = el}
          className="mb-6 transition-all duration-300 ease-out opacity-0 transform translate-y-2"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="header-text">Our Clients</h2>
          </div>
          <div className="w-20 h-1 bg-black mb-6"></div>
        </div>
        
        <div 
          ref={el => elementsRef.current[1] = el}
          className="transition-all duration-300 ease-out opacity-0 transform translate-y-2 will-change-transform"
        >
          <ClientsGrid />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
