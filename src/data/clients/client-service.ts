
import { Client } from './types';
import { featuredClients } from './featured-clients';
import { electronicClients } from './electronic-clients';
import { experimentalClients } from './experimental-clients';
import { ensembleClients } from './ensemble-clients';
import { studioClients } from './studio-clients';
import { techClients } from './tech-clients';

// Combines all client lists into one array
export const getAllClients = (): Client[] => {
  return [
    ...featuredClients,
    ...electronicClients,
    ...experimentalClients,
    ...ensembleClients,
    ...studioClients,
    ...techClients
  ];
};

// Gets featured clients only
export const getFeaturedClients = (): Client[] => {
  return featuredClients;
};

// Gets clients by type
export const getClientsByType = (type: string): Client[] => {
  return getAllClients().filter(client => 
    client.type.toLowerCase().includes(type.toLowerCase())
  );
};

// Gets clients by name search
export const searchClientsByName = (searchTerm: string): Client[] => {
  return getAllClients().filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
