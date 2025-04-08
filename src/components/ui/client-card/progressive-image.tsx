
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { isValidImagePath, processImageSrc } from "./image-utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  clientName: string;
  imageSize: number;
  isMobile: boolean;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  clientName,
  imageSize,
  isMobile
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const mountedRef = useRef(true);
  const attemptedLoadingRef = useRef(false);
  const progressiveLoadingRef = useRef(false);

  // Process the image URL with optimizations
  const processedImageSrc = processImageSrc(src, clientName);
  const validImagePath = isValidImagePath(src);

  // Setup component lifecycle
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
    attemptedLoadingRef.current = false;
    progressiveLoadingRef.current = false;
  }, [src]);

  // Image loading strategy
  useEffect(() => {
    if (!validImagePath || progressiveLoadingRef.current) return;
    
    progressiveLoadingRef.current = true;
    
    // Always use eager loading strategy regardless of device
    const img = new Image();
    img.src = processedImageSrc;
    img.crossOrigin = "anonymous";
    img.fetchPriority = "high";
    img.decoding = "async";
    
    img.onload = () => {
      if (mountedRef.current) {
        console.log(`Successfully loaded image for client: ${clientName}`);
        setImageLoaded(true);
        setImageError(false);
      }
    };
    
    img.onerror = () => {
      if (mountedRef.current) {
        console.error(`Failed to load image for client: ${clientName} (path: ${processedImageSrc})`);
        setImageError(true);
      }
    };
  }, [processedImageSrc, validImagePath, clientName]);

  const handleImageError = () => {
    console.error(`Failed to load image on render for client: ${clientName} (path: ${processedImageSrc})`);
    setImageError(true);
  };

  if (imageError || !validImagePath) {
    return null; // The parent component will render fallback
  }

  return (
    <>
      <img 
        ref={imageRef}
        src={processedImageSrc}
        alt={alt}
        className={cn(
          "w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105",
          !imageLoaded && "opacity-0",
          imageLoaded && "opacity-100"
        )}
        loading="eager" // Always eager load to prioritize images
        decoding="async"
        onError={handleImageError}
        onLoad={() => setImageLoaded(true)}
        crossOrigin="anonymous"
        width={imageSize}
        height={imageSize}
      />
      
      {/* Loading indicator */}
      {!imageLoaded && !imageError && validImagePath && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Skeleton className="w-full h-full" />
        </div>
      )}
    </>
  );
};
