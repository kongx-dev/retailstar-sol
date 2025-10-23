// DEPRECATED: This file is kept for reference only
// Supabase is now the single source of truth for domain data
// Use useDomains hook or domainQueries for fetching domains

import { filterBlocklisted, isForSale } from './blocklist';

// Re-export Domain type from supabase for backward compatibility
export type { Domain } from '../lib/supabase';

// DEPRECATED: Local domain array removed - use Supabase queries instead
// export const domains: Domain[] = ... (removed)

// Filtering helpers with blocklist integration (still useful for client-side filtering)
export const filterDomains = {
  all: (list: Domain[]) => filterBlocklisted(list),
  premium: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.category === 'premium')),
  mid: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.category === 'mid')),
  quickSnag: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.quickSnag)),
  flashRack: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.flashRack)),
  vaulted: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.vaulted)),
};

// Helper to get domains available for sale (excludes blocklisted)
export const getAvailableForSale = (domainList: Domain[]): Domain[] => {
  return filterBlocklisted(domainList.filter(d => d.status === 'available'));
};

// Helper to check if a specific domain is for sale
export const isDomainForSale = (domainName: string): boolean => {
  return isForSale(domainName);
}; 