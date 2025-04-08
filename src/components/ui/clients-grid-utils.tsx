
export type ClientGridSize = "small" | "medium" | "large" | "xl";

export const getGridSizeClasses = (size: ClientGridSize): string => {
  const gridSizeClasses = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    medium: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
    xl: "grid-cols-1"
  };
  
  return gridSizeClasses[size];
};
