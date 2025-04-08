
/**
 * Utility functions for handling client card images
 */

/**
 * Process image URL with optimizations
 */
export const processImageSrc = (imagePath: string | undefined, clientName: string): string => {
  // Handle potential undefined image
  if (!imagePath) {
    console.error(`Missing image for client: ${clientName}`);
    return getFallbackImage(clientName);
  }
  
  // Ensure full URL is used
  let imageSrc = imagePath;
  
  // Convert relative paths to absolute URLs
  if (imageSrc.startsWith("/") && !imageSrc.startsWith("//")) {
    imageSrc = window.location.origin + imageSrc;
  }
  
  // Add cache-busting parameters
  const timestamp = new Date().getTime();
  const cacheBuster = `t=${timestamp}`;
  imageSrc = imageSrc.includes('?') 
    ? `${imageSrc}&${cacheBuster}` 
    : `${imageSrc}?${cacheBuster}`;
  
  return imageSrc;
};

/**
 * Check if image path is valid
 */
export const isValidImagePath = (imagePath: string | undefined): boolean => {
  return !!imagePath && (imagePath.startsWith("/") || imagePath.startsWith("http"));
};

/**
 * Get a consistent fallback image based on client name
 */
export const getFallbackImage = (clientName: string, imageSize: number = 800): string => {
  const clientNameEncoded = encodeURIComponent(clientName);
  return `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=${imageSize}&h=${imageSize}&q=80&txt=${clientNameEncoded}`;
};
