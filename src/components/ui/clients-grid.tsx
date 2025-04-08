
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Instagram, ExternalLink } from "lucide-react"
import { clients } from "@/data/clients"
import { Client } from "@/data/clients/types"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"

interface ClientCardProps {
  client: Client;
  size: "small" | "medium" | "large" | "xl";
  isMobile: boolean;
}

const ClientCard = ({ client, size, isMobile }: ClientCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image to ensure it's cached
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    
    const preloadImage = new Image();
    
    // Ensure full URL is used (especially important for mobile)
    let imagePath = client.image;
    
    // Convert relative paths to absolute URLs
    if (imagePath.startsWith("/") && !imagePath.startsWith("//")) {
      imagePath = window.location.origin + imagePath;
    }
    
    // For mobile devices, append a cache-busting parameter
    if (isMobile) {
      const cacheBuster = `?mobile=true&t=${new Date().getTime().toString().slice(0, 8)}`;
      imagePath = imagePath.includes('?') ? `${imagePath}&${cacheBuster.slice(1)}` : imagePath + cacheBuster;
    }
    
    preloadImage.src = imagePath;
    
    preloadImage.onload = () => {
      setImageLoaded(true);
    };
    
    preloadImage.onerror = () => {
      console.error(`Failed to preload image for client: ${client.name} (path: ${client.image})`);
      setImageError(true);
    };
    
    return () => {
      // Clean up by removing event listeners
      preloadImage.onload = null;
      preloadImage.onerror = null;
    };
  }, [client.image, client.name, isMobile]);

  // Create a fallback image URL with client name for consistent placeholder generation
  const getFallbackImage = () => {
    // Use an Unsplash random image as placeholder with client name embedded for consistency
    const clientNameEncoded = encodeURIComponent(client.name);
    return `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=800&h=800&q=80&txt=${clientNameEncoded}`;
  };

  const handleImageError = () => {
    console.error(`Failed to load image for client: ${client.name} (path: ${client.image})`);
    setImageError(true);
  };

  // Ensure full URL is used (especially important for mobile)
  let imageSrc = client.image;
  
  // Convert relative paths to absolute URLs
  if (imageSrc.startsWith("/") && !imageSrc.startsWith("//")) {
    imageSrc = window.location.origin + imageSrc;
  }
  
  // For mobile devices, append a cache-busting parameter
  if (isMobile) {
    const cacheBuster = `?mobile=true&t=${new Date().getTime().toString().slice(0, 8)}`;
    imageSrc = imageSrc.includes('?') ? `${imageSrc}&${cacheBuster.slice(1)}` : imageSrc + cacheBuster;
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {!imageError ? (
            <img 
              src={imageSrc}
              alt={`${client.name} - ${client.type}`}
              className={cn(
                "w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale group-hover:grayscale-0",
                !imageLoaded && "opacity-0",
                imageLoaded && "opacity-100"
              )}
              loading={isMobile ? "eager" : "lazy"}
              decoding="async"
              onError={handleImageError}
              onLoad={() => setImageLoaded(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
              <img
                src={getFallbackImage()}
                alt={client.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white text-sm font-semibold px-2 py-1">{client.name}</span>
              </div>
            </div>
          )}
          {/* Loading indicator */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="text-white text-center p-4 font-sans">
              <h3 className="font-bold text-lg mb-1">{client.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{client.type}</p>
              
              {(client.instagramUrl || client.beatportUrl || client.spotifyUrl) && (
                <div className="flex justify-center space-x-3 mt-2">
                  {client.instagramUrl && (
                    <a 
                      href={client.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors"
                      aria-label={`Visit ${client.name}'s Instagram`}
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  
                  {client.beatportUrl && (
                    <a 
                      href={client.beatportUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors"
                      aria-label={`Visit ${client.name}'s Beatport`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  
                  {client.spotifyUrl && (
                    <a 
                      href={client.spotifyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors"
                      aria-label={`Visit ${client.name}'s Spotify`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ClientsGrid = () => {
  const [size, setSize] = useState<"small" | "medium" | "large" | "xl">("medium");
  const isMobile = useIsMobile();

  console.info(`Total clients in grid: ${clients.length}, Device is mobile: ${isMobile}`);

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

  const gridSizeClasses = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    medium: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
    xl: "grid-cols-1"
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
      
      <div className={cn("grid gap-4", gridSizeClasses[size])}>
        {clients.map((client, index) => (
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
