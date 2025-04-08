
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, ExternalLink } from "lucide-react"
import { Client } from "@/data/clients/types"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface ClientCardProps {
  client: Client;
  size: "small" | "medium" | "large" | "xl";
  isMobile: boolean;
}

const ClientCard = ({ client, size, isMobile }: ClientCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const mountedRef = useRef(true);

  // Process the image URL just once at component initialization
  const processedImageSrc = (() => {
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
    
    return imageSrc;
  })();

  // Use intersection observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!mountedRef.current) return;
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Preload the image
            preloadImage(processedImageSrc);
            // Unobserve once detected
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(imageRef.current);

    return () => {
      mountedRef.current = false;
      observer.disconnect();
    };
  }, [processedImageSrc]);

  // Improved preloading strategy
  const preloadImage = (src: string) => {
    setImageLoaded(false);
    setImageError(false);
    
    const preloadImage = new Image();
    
    // Set crossOrigin attribute
    preloadImage.crossOrigin = "anonymous";
    
    preloadImage.onload = () => {
      if (mountedRef.current) {
        setImageLoaded(true);
      }
    };
    
    preloadImage.onerror = () => {
      if (mountedRef.current) {
        console.error(`Failed to preload image for client: ${client.name} (path: ${client.image})`);
        setImageError(true);
      }
    };
    
    // Apply srcset for responsive images
    if (isMobile) {
      // Smaller image for mobile
      preloadImage.src = src;
    } else {
      preloadImage.src = src;
    }
  };

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

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative overflow-hidden" ref={imageRef}>
          {!imageError ? (
            <img 
              src={processedImageSrc}
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
              width={isMobile ? 400 : 800}
              height={isMobile ? 400 : 800}
            />
          ) : (
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
              <img
                src={getFallbackImage()}
                alt={client.name}
                className="w-full h-full object-cover"
                loading="eager"
                width={400}
                height={400}
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

export { ClientCard };
