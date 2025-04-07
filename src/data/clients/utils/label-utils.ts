
import { Client } from '../types';

/**
 * Validates a record label entry
 * @param label Label client object to validate
 * @returns boolean indicating if the label is valid
 */
export const isValidLabel = (label: Client): boolean => {
  return (
    !!label.name && 
    !!label.image && 
    (label.type === 'Record Label' || label.type === 'Music Distribution')
  );
};

/**
 * Creates a record label client entry with proper type validation
 */
export const createLabelEntry = (
  name: string,
  image: string,
  instagramUrl?: string,
  beatportUrl?: string
): Client => {
  return {
    name,
    type: 'Record Label',
    image,
    instagramUrl,
    beatportUrl
  };
};

/**
 * Creates a music distribution client entry with proper type validation
 */
export const createDistributionEntry = (
  name: string,
  image: string,
  instagramUrl?: string
): Client => {
  return {
    name,
    type: 'Music Distribution',
    image,
    instagramUrl
  };
};
