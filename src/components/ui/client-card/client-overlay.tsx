
import React from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { Client } from "@/data/clients/types";

interface ClientOverlayProps {
  client: Client;
}

export const ClientOverlay: React.FC<ClientOverlayProps> = ({ client }) => {
  return (
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
  );
};
