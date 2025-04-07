
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

  // Improved animation trigger with faster timing
  useEffect(() => {
    if (isActive && sectionRef.current) {
      // Trigger animations immediately with shorter delays
      elementsRef.current.forEach((element, index) => {
        if (element) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 100); // Reduced delay between elements
        }
      });
    } else if (!isActive) {
      // Reset animations when not visible
      elementsRef.current.forEach(element => {
        if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
        }
      });
    }
  }, [isActive]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-6 md:py-8 px-6 md:px-12 lg:px-24"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto w-full",
          isActive ? "opacity-100 transition-opacity duration-300" : "opacity-0"
        )}
      >
        <div 
          ref={el => elementsRef.current[0] = el}
          className="mb-10 transition-all duration-300 ease-out opacity-0 transform translate-y-4"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="header-text">Our Clients</h2>
          </div>
          <div className="w-20 h-1 bg-black mb-8"></div>
        </div>
        
        <div 
          ref={el => elementsRef.current[1] = el}
          className="transition-all duration-300 ease-out opacity-0 transform translate-y-4"
        >
          <ClientsGrid />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
