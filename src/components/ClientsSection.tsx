
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Music } from "lucide-react";

interface ClientsSectionProps {
  id: string;
  isActive: boolean;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);

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
      
      // Reset all cards to front side when section is not active
      setFlippedCards(Array(clients.length).fill(false));
    }
  }, [isActive]);

  // Initialize flipped state when component mounts
  useEffect(() => {
    setFlippedCards(Array(clients.length).fill(false));
  }, []);

  // Placeholder client data
  const clients = [
    { name: "Ethereal Echo", type: "Electronic Producer", image: "https://placehold.co/400x300/f5f5f5/333333?text=Ethereal+Echo" },
    { name: "Neuronal Synapse", type: "Experimental Band", image: "https://placehold.co/400x300/f5f5f5/333333?text=Neuronal+Synapse" },
    { name: "Conscious Waves", type: "Ambient Collective", image: "https://placehold.co/400x300/f5f5f5/333333?text=Conscious+Waves" },
    { name: "Quantum Harmony", type: "Jazz Fusion Group", image: "https://placehold.co/400x300/f5f5f5/333333?text=Quantum+Harmony" },
    { name: "Cerebral Soundscapes", type: "Neo-Classical Composer", image: "https://placehold.co/400x300/f5f5f5/333333?text=Cerebral+Soundscapes" },
    { name: "Synaptic Pulse", type: "Electronic Duo", image: "https://placehold.co/400x300/f5f5f5/333333?text=Synaptic+Pulse" },
  ];

  const toggleCardFlip = (index: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

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
              className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
              onMouseEnter={() => toggleCardFlip(index)}
              onMouseLeave={() => toggleCardFlip(index)}
            >
              <div className="w-full h-80 relative perspective">
                <div 
                  className={cn(
                    "w-full h-full absolute backface-hidden transition-transform duration-500",
                    flippedCards[index] ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"
                  )}
                >
                  <Card className="w-full h-full overflow-hidden">
                    <CardContent className="p-0 h-full">
                      <img 
                        src={client.image} 
                        alt={client.name} 
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div 
                  className={cn(
                    "w-full h-full absolute backface-hidden transition-transform duration-500 bg-black text-white flex flex-col items-center justify-center",
                    flippedCards[index] ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
                  )}
                >
                  <Card className="w-full h-full overflow-hidden bg-black text-white border-none">
                    <CardContent className="h-full flex flex-col items-center justify-center space-y-6 p-6">
                      <h3 className="text-2xl font-display font-semibold text-center">{client.name}</h3>
                      <p className="text-gray-300">{client.type}</p>
                      
                      <div className="flex space-x-6 mt-4">
                        <a href="#" className="text-white hover:text-gray-300 transition-colors">
                          <Instagram size={24} />
                        </a>
                        <a href="#" className="text-white hover:text-gray-300 transition-colors">
                          <Music size={24} />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
