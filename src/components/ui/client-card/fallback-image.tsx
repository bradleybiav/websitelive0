
import React from "react";
import { getFallbackImage } from "./image-utils";

interface FallbackImageProps {
  clientName: string;
  imageSize: number;
}

export const FallbackImage: React.FC<FallbackImageProps> = ({ clientName, imageSize }) => {
  return (
    <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden">
      <img
        src={getFallbackImage(clientName, imageSize)}
        alt={clientName}
        className="w-full h-full object-cover"
        loading="eager"
        width={imageSize}
        height={imageSize}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <span className="text-white text-sm font-semibold px-2 py-1">{clientName}</span>
      </div>
    </div>
  );
};
