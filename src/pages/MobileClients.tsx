
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clients } from '@/data/clients';
import { Badge } from "@/components/ui/badge";
import { Instagram, Music, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileClients = () => {
  const navigate = useNavigate();
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  
  // Separate clients by type
  const artistClients = clients.filter(client => client.type === 'Artist');
  const labelClients = clients.filter(client => client.type === 'Label');

  const handleClientClick = (clientName: string) => {
    if (expandedClient === clientName) {
      setExpandedClient(null);
    } else {
      setExpandedClient(clientName);
    }
  };

  const handleBackClick = () => {
    navigate('/#clients');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Our Clients</h1>
        <Button variant="ghost" onClick={handleBackClick}>
          Back to Site
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-3">Artists</h2>
        <div className="space-y-2">
          {artistClients.map((client) => (
            <div key={client.name}>
              <button 
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
                onClick={() => handleClientClick(client.name)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{client.name}</span>
                  <Badge variant="outline" className="ml-2">Artist</Badge>
                </div>
              </button>
              
              {expandedClient === client.name && (
                <div className="flex mt-2 space-x-4 p-2 bg-gray-100 rounded-md">
                  {client.instagramUrl && (
                    <a 
                      href={client.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-pink-600 hover:text-pink-800"
                    >
                      <Instagram className="mr-1" size={18} />
                      <span>Instagram</span>
                    </a>
                  )}
                  
                  {client.spotifyUrl && (
                    <a 
                      href={client.spotifyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 hover:text-green-800"
                    >
                      <Music className="mr-1" size={18} />
                      <span>Spotify</span>
                    </a>
                  )}
                  
                  {client.beatportUrl && (
                    <a 
                      href={client.beatportUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Link className="mr-1" size={18} />
                      <span>Beatport</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-medium mb-3">Labels</h2>
        <div className="space-y-2">
          {labelClients.map((client) => (
            <div key={client.name}>
              <button 
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
                onClick={() => handleClientClick(client.name)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{client.name}</span>
                  <Badge variant="outline" className="ml-2">Label</Badge>
                </div>
              </button>
              
              {expandedClient === client.name && (
                <div className="flex mt-2 space-x-4 p-2 bg-gray-100 rounded-md">
                  {client.instagramUrl && (
                    <a 
                      href={client.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-pink-600 hover:text-pink-800"
                    >
                      <Instagram className="mr-1" size={18} />
                      <span>Instagram</span>
                    </a>
                  )}
                  
                  {client.beatportUrl && (
                    <a 
                      href={client.beatportUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Link className="mr-1" size={18} />
                      <span>Beatport</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileClients;
