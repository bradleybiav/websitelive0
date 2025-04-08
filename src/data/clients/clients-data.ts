
import { Client } from './types';
import { electronicArtists } from './artists/electronic-artists';
import { moreArtists } from './artists/more-artists';
import { recordLabels } from './labels/record-labels';

// Combine all client data from separate files
export const clientsData: Client[] = [
  ...electronicArtists,
  ...moreArtists,
  ...recordLabels
];

// Verify number of clients for debugging purposes
console.log(`Total clients loaded: ${clientsData.length} (${electronicArtists.length} electronic artists, ${moreArtists.length} more artists, ${recordLabels.length} labels)`);
