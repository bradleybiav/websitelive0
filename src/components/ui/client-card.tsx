
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, ExternalLink } from "lucide-react"
import { Client } from "@/data/clients/types"
import { cn } from "@/lib/utils"

interface ClientCardProps {
  client: Client;
  size: "small" | "medium" | "large" | "xl"
}

const ClientCard = ({ client, size }: ClientCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image to ensure it's cached
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = client.image;
    
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
  }, [client.image, client.name]);

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

  const imageSrc = client.image.startsWith("/") && !client.image.startsWith("//") 
    ? window.location.origin + client.image 
    : client.image;

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
              loading="eager" 
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
              <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
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

export { ClientCard };
