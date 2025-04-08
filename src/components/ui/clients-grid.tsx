
"use client"

import { useState } from "react"
import { clientsData } from "@/data/clients/clients-data"
import { cn } from "@/lib/utils"
import { ClientCard } from "./client-card"
import { ClientGridControls } from "./client-grid-controls"
import { gridSizeClasses, getNextGridSize, getPreviousGridSize } from "./client-grid-utils"

const ClientsGrid = () => {
  const [size, setSize] = useState<"small" | "medium" | "large" | "xl">("medium");

  console.info(`Total clients in grid: ${clientsData.length}`);

  const handleZoomIn = () => {
    setSize(getNextGridSize(size));
  };

  const handleZoomOut = () => {
    setSize(getPreviousGridSize(size));
  };

  return (
    <div className="w-full">
      <ClientGridControls 
        size={size} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
      />
      
      <div className={cn("grid gap-4", gridSizeClasses[size])}>
        {clientsData.map((client, index) => (
          <ClientCard key={`${client.name}-${index}`} client={client} size={size} />
        ))}
      </div>
    </div>
  );
};

export { ClientsGrid };
