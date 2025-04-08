
"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Client } from "@/data/clients/types"
import { FallbackImage } from "./client-card/fallback-image"
import { ClientOverlay } from "./client-card/client-overlay"
import { ProgressiveImage } from "./client-card/progressive-image"
import { isValidImagePath } from "./client-card/image-utils"

interface ClientCardProps {
  client: Client;
  size: "small" | "medium" | "large" | "xl";
  isMobile: boolean;
}

const ClientCard = ({ client, size, isMobile }: ClientCardProps) => {
  // Get optimized image size based on device
  const imageSize = isMobile ? 400 : 800;
  
  // Enhanced image path validation with more logging
  const validImagePath = isValidImagePath(client.image);
  
  if (!validImagePath) {
    console.warn(`Invalid image path for client: ${client.name}, using fallback`, client.image);
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {validImagePath ? (
            <ProgressiveImage
              src={client.image}
              alt={`${client.name} - ${client.type}`}
              clientName={client.name}
              imageSize={imageSize}
              isMobile={isMobile}
            />
          ) : (
            <FallbackImage
              clientName={client.name}
              imageSize={imageSize}
            />
          )}
          
          <ClientOverlay client={client} />
        </div>
      </CardContent>
    </Card>
  );
};

export { ClientCard };
