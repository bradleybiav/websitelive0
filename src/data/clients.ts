
import { clientsData } from './clients/clients-data';

// Export all clients as the default export to maintain backward compatibility
export const clients = clientsData;

// Re-export the Client type
export type { Client } from './clients/types';
