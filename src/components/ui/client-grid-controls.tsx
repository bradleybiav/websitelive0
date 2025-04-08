
"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"

interface ClientGridControlsProps {
  size: "small" | "medium" | "large" | "xl";
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ClientGridControls = ({ size, onZoomIn, onZoomOut }: ClientGridControlsProps) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onZoomOut}
          disabled={size === "small"}
          className="bg-white hover:bg-gray-100"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onZoomIn}
          disabled={size === "xl"}
          className="bg-white hover:bg-gray-100"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export { ClientGridControls };
