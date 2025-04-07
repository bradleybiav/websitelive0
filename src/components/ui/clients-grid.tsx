
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { clients } from "@/data/clients"
import { cn } from "@/lib/utils"

interface ClientCardProps {
  client: {
    name: string
    type: string
    image: string
  }
  size: "small" | "medium" | "large" | "xl"
}

const ClientCard = ({ client, size }: ClientCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={client.image}
            alt={`${client.name} - ${client.type}`}
            className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="text-white text-center p-4">
              <h3 className="font-bold text-lg mb-1">{client.name}</h3>
              <p className="text-sm text-gray-300">{client.type}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ClientsGrid = () => {
  const [size, setSize] = useState<"small" | "medium" | "large" | "xl">("medium");

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

  // Determine grid columns based on size
  const gridSizeClasses = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    medium: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
    xl: "grid-cols-1" // Single column
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 space-x-2">
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
      
      <div className={cn("grid gap-4", gridSizeClasses[size])}>
        {clients.map((client, index) => (
          <ClientCard key={`${client.name}-${index}`} client={client} size={size} />
        ))}
      </div>
    </div>
  );
};

export { ClientsGrid };
