
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

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

  // Placeholder client data
  const clients = [
    { name: "Ethereal Echo", type: "Electronic Producer", image: "https://placehold.co/400x300/f5f5f5/333333?text=Ethereal+Echo" },
    { name: "Neuronal Synapse", type: "Experimental Band", image: "https://placehold.co/400x300/f5f5f5/333333?text=Neuronal+Synapse" },
    { name: "Conscious Waves", type: "Ambient Collective", image: "https://placehold.co/400x300/f5f5f5/333333?text=Conscious+Waves" },
    { name: "Quantum Harmony", type: "Jazz Fusion Group", image: "https://placehold.co/400x300/f5f5f5/333333?text=Quantum+Harmony" },
    { name: "Cerebral Soundscapes", type: "Neo-Classical Composer", image: "https://placehold.co/400x300/f5f5f5/333333?text=Cerebral+Soundscapes" },
    { name: "Synaptic Pulse", type: "Electronic Duo", image: "https://placehold.co/400x300/f5f5f5/333333?text=Synaptic+Pulse" },
  ];

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="scroll-section section-padding"
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
          <p className="subheader-text max-w-3xl">
            We've had the privilege of working with visionary artists across various genres.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <div 
              key={index}
              ref={el => elementsRef.current[index + 1] = el}
              className="group overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={client.image} 
                  alt={client.name} 
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="px-5 py-2 bg-white text-black font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Case Study
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-display font-semibold">{client.name}</h3>
                <p className="text-muted-foreground">{client.type}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          ref={el => elementsRef.current[7] = el}
          className="mt-16 text-center transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <button className="px-8 py-3 border-2 border-transparent underline font-medium transition-all duration-300 hover:opacity-70">
            View All Case Studies
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
