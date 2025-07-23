import domainsJson from './domains.json';
import { filterBlocklisted, isForSale } from './blocklist';

export type Domain = {
  name: string;
  slug: string;
  description: string;
  image: string;
  featured?: boolean;
  status: 'available' | 'not_for_sale' | 'vaulted' | string;
  price: string;
  category: 'premium' | 'mid' | 'quickSnag' | 'flashRack' | 'vaulted' | string;
  quickSnagPrice?: string;
  hasWebsite?: boolean;
  website?: string;
  hasLore?: boolean;
  rarity?: 'epic' | 'rare' | 'base';
  vaulted?: boolean;
  flashRack?: boolean;
  redacted?: boolean;
  [key: string]: any;
};

export const domains: Domain[] = domainsJson.domains.map((d) => {
  // Centralized tagging logic
  let rarity: Domain['rarity'] = 'base';
  if (d.category === 'premium') rarity = 'epic';
  else if (d.category === 'mid') rarity = 'rare';
  const isVaulted = (('vaulted' in d && !!d.vaulted) || d.status === 'vaulted');
  if (isVaulted) rarity = 'epic';

  // Tag flashRack
  const flashRack = !!(('flashRack' in d && d.flashRack) || d.category === 'flashRack');
  // Tag quickSnag
  const quickSnag = !!d.quickSnagPrice || d.category === 'quickSnag';
  // Tag vaulted
  const vaulted = !!isVaulted;

  return {
    ...d,
    rarity,
    flashRack,
    quickSnag,
    vaulted,
  };
});

// Filtering helpers with blocklist integration
export const filterDomains = {
  all: (list: Domain[]) => filterBlocklisted(list),
  premium: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.category === 'premium')),
  mid: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.category === 'mid')),
  quickSnag: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.quickSnag)),
  flashRack: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.flashRack)),
  vaulted: (list: Domain[]) => filterBlocklisted(list.filter((d) => d.vaulted)),
};

// Helper to get domains available for sale (excludes blocklisted)
export const getAvailableForSale = (domainList: Domain[] = domains): Domain[] => {
  return filterBlocklisted(domainList.filter(d => d.status === 'available'));
};

// Helper to check if a specific domain is for sale
export const isDomainForSale = (domainName: string): boolean => {
  return isForSale(domainName);
}; 