
import { Client } from './types';
import { featuredArtists } from './featured-artists';
import { featuredGroups } from './featured-groups';
import { featuredLabels } from './featured-labels';

// Combine all featured clients into one array
// This maintains backward compatibility with existing code
export const featuredClients: Client[] = [
  ...featuredArtists,
  ...featuredGroups,
  ...featuredLabels
];
