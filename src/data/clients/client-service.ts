
import { Client } from './types';
import { featuredClients } from './featured-clients';
import { featuredArtists } from './featured-artists';
import { featuredGroups } from './featured-groups';
import { featuredLabels } from './featured-labels';
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

// Gets featured clients only (maintaining backward compatibility)
export const getFeaturedClients = (): Client[] => {
  return featuredClients;
};

// Gets featured clients by category
export const getFeaturedArtists = (): Client[] => {
  return featuredArtists;
};

export const getFeaturedGroups = (): Client[] => {
  return featuredGroups;
};

export const getFeaturedLabels = (): Client[] => {
  return featuredLabels;
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
