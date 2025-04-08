
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
  
  // Convert relative paths to absolute URLs with origin handling for both server and client
  if (imageSrc.startsWith("/") && !imageSrc.startsWith("//")) {
    // Handle both client-side and SSR environments
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    imageSrc = origin + imageSrc;
  }
  
  // Skip cache-busting parameters - they can cause reloads and prevent caching 
  // which is especially important on mobile
  return imageSrc;
};

/**
 * Check if image path is valid
 */
export const isValidImagePath = (imagePath: string | undefined): boolean => {
  if (!imagePath) return false;
  
  // More comprehensive check for valid image paths
  return (
    imagePath.startsWith("/") || 
    imagePath.startsWith("http") || 
    imagePath.startsWith("data:image")
  );
};

/**
 * Get a consistent fallback image based on client name
 * Using Unsplash for more reliable fallbacks
 */
export const getFallbackImage = (clientName: string, imageSize: number = 800): string => {
  // Create a deterministic seed from the client name 
  // to get consistent images for the same client
  const hash = clientName.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + ((hash << 5) - hash);
  }, 0);
  
  // Use a selection of reliable placeholder images
  const placeholders = [
    "photo-1488590528505-98d2b5aba04b", // tech image
    "photo-1518770660439-4636190af475", // tech image alternate
    "photo-1581091226825-a6a2a5aee158", // person using laptop
    "photo-1486312338219-ce68d2c6f44d"  // person using MacBook
  ];
  
  // Use the hash to deterministically select an image
  const index = Math.abs(hash) % placeholders.length;
  const placeholderId = placeholders[index];
  
  // Use smaller images on mobile for better performance
  const optimizedSize = imageSize <= 400 ? 400 : 800;
  
  // Encode the client name for the text overlay
  const clientNameEncoded = encodeURIComponent(clientName);
  return `https://images.unsplash.com/${placeholderId}?fit=crop&w=${optimizedSize}&h=${optimizedSize}&q=80&txt=${clientNameEncoded}`;
};
