
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

  // Progressive loading approach for images
  useEffect(() => {
    if (!validImagePath || progressiveLoadingRef.current) return;
    
    progressiveLoadingRef.current = true;
    
    // Start with low quality placeholder for immediate visual
    if (isMobile) {
      // For mobile, load directly to avoid extra network requests
      preloadImage(processedImageSrc);
    } else {
      // For desktop, use IntersectionObserver for lazy loading
      if (!imageRef.current || typeof IntersectionObserver === 'undefined') {
        // Fallback if IntersectionObserver not available
        preloadImage(processedImageSrc);
        return;
      }

      const options = { 
        threshold: 0.1, 
        rootMargin: "50px"
      };

      const observer = new IntersectionObserver((entries) => {
        if (!mountedRef.current) return;
        
        entries.forEach(entry => {
          if (entry.isIntersecting && !attemptedLoadingRef.current) {
            attemptedLoadingRef.current = true;
            preloadImage(processedImageSrc);
            observer.unobserve(entry.target);
          }
        });
      }, options);

      observer.observe(imageRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [processedImageSrc, isMobile, validImagePath]);

  const preloadImage = (src: string) => {
    if (!mountedRef.current || !validImagePath) return;
    
    setImageLoaded(false);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      if (mountedRef.current) {
        console.log(`Successfully loaded image for client: ${clientName}`);
        setImageLoaded(true);
        setImageError(false);
      }
    };
    
    img.onerror = () => {
      if (mountedRef.current) {
        console.error(`Failed to load image for client: ${clientName} (path: ${src})`);
        setImageError(true);
      }
    };
    
    // Set priority loading hints
    img.fetchPriority = isMobile ? "high" : "auto";
    img.decoding = "async";
    
    // Start loading
    img.src = src;
  };

  const handleImageError = () => {
    if (!validImagePath) return;
    console.error(`Failed to load image on render for client: ${clientName} (path: ${src})`);
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
          "w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale group-hover:grayscale-0",
          !imageLoaded && "opacity-0",
          imageLoaded && "opacity-100"
        )}
        loading={isMobile ? "eager" : "lazy"}
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
