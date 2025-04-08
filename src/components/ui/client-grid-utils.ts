
export const gridSizeClasses = {
  small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
  medium: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
  xl: "grid-cols-1"
};

export const getNextGridSize = (currentSize: "small" | "medium" | "large" | "xl"): "small" | "medium" | "large" | "xl" => {
  switch (currentSize) {
    case "small": return "medium";
    case "medium": return "large";
    case "large": return "xl";
    case "xl": return "xl"; // No change if already at maximum
    default: return "medium";
  }
};

export const getPreviousGridSize = (currentSize: "small" | "medium" | "large" | "xl"): "small" | "medium" | "large" | "xl" => {
  switch (currentSize) {
    case "small": return "small"; // No change if already at minimum
    case "medium": return "small";
    case "large": return "medium";
    case "xl": return "large";
    default: return "medium";
  }
};
