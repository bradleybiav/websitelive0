
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { clients } from "@/data/clients"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { ClientCard } from "@/components/ui/client-card"
import { ClientGridSize, getGridSizeClasses } from "@/components/ui/clients-grid-utils"

const ClientsGrid = () => {
  const [size, setSize] = useState<ClientGridSize>("medium");
  const { isMobile, initialized } = useIsMobile();
  const [clientsToShow, setClientsToShow] = useState(clients);

  useEffect(() => {
    // On mobile, show fewer clients initially and then add more
    if (initialized && isMobile) {
      // Start with just a few clients to speed up initial rendering
      setClientsToShow(clients.slice(0, 8));
      
      // Then load the rest after a short delay
      const timer = setTimeout(() => {
        setClientsToShow(clients);
        console.log("Loaded all clients");
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setClientsToShow(clients);
    }
  }, [initialized, isMobile]);

  console.info(`Total clients in grid: ${clientsToShow.length}, Device is mobile: ${isMobile}, Initialized: ${initialized}`);

  const handleZoomIn = () => {
    if (size === "small") setSize("medium");
    else if (size === "medium") setSize("large");
    else if (size === "large") setSize("xl");
  };

  const handleZoomOut = () => {
    if (size === "xl") setSize("large");
    else if (size === "large") setSize("medium");
    else if (size === "medium") setSize("small");
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleZoomOut}
            disabled={size === "small"}
            className="bg-white hover:bg-gray-100"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleZoomIn}
            disabled={size === "xl"}
            className="bg-white hover:bg-gray-100"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={cn("grid gap-4", getGridSizeClasses(size))}>
        {clientsToShow.map((client, index) => (
          <ClientCard 
            key={`${client.name}-${index}`} 
            client={client} 
            size={size} 
            isMobile={isMobile} 
          />
        ))}
      </div>
    </div>
  );
};

export { ClientsGrid };
