
import { getAllClients } from './clients/client-service';

// Export all clients as the default export to maintain backward compatibility
export const clients = getAllClients();

// Re-export the client service functions for more specific queries
export { 
  getFeaturedClients,
  getClientsByType,
  searchClientsByName
} from './clients/client-service';

// Re-export the Client type
export type { Client } from './clients/types';
