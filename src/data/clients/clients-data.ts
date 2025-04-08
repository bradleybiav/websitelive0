
import { Client } from './types';
import { artistClients } from './artist-clients';
import { labelClients } from './label-clients';

// Combine artist and label clients in the specified order
export const clientsData: Client[] = [
  ...artistClients,
  ...labelClients
];

// Log the client count for debugging purposes
console.log(`Total clients: ${clientsData.length}`);
