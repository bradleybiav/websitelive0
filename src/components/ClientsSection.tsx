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

  useEffect(() => {
    if (isActive && sectionRef.current) {
      elementsRef.current.forEach((element, index) => {
        if (element) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    } else {
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
      className="py-10 md:py-12 px-6 md:px-12 lg:px-24"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          ref={el => elementsRef.current[0] = el}
          className="mb-16 transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <h2 className="header-text mb-6">Our Clients</h2>
          <div className="w-20 h-1 bg-black mb-12"></div>
        </div>
        
        <div 
          ref={el => elementsRef.current[1] = el}
          className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <ClientsGrid />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
