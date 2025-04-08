
import React, { useRef, useState, useEffect } from 'react';
import { ClientsGrid } from "@/components/ui/clients-grid";
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from "@/components/ui/skeleton";

interface ClientsSectionProps {
  id: string;
  isActive: boolean;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile, initialized } = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  // Manage loading state with a longer delay on mobile to ensure images have time to load
  useEffect(() => {
    if (initialized) {
      // Give more time for images to start loading on mobile
      const loadingTime = isMobile ? 800 : 400;
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        console.log("Clients section finished loading");
      }, loadingTime);
      
      return () => clearTimeout(timer);
    }
  }, [initialized, isMobile]);

  // Prevent section from being rendered until device detection is complete
  if (!initialized) {
    return (
      <section 
        id={id} 
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center py-4 md:py-6 px-4 md:px-12 lg:px-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-4 md:mb-6">
            <h2 className="header-text">Our Clients</h2>
            <div className="w-20 h-1 bg-black mb-4 md:mb-6"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-4 md:py-6 px-4 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-4 md:mb-6">
          <div className="flex items-baseline justify-between mb-2 md:mb-4">
            <h2 className="header-text">Our Clients</h2>
          </div>
          <div className="w-20 h-1 bg-black mb-4 md:mb-6"></div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <ClientsGrid />
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
