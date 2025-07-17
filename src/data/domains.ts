import domainsJson from './domains.json';

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

// Filtering helpers
export const filterDomains = {
  all: (list: Domain[]) => list,
  premium: (list: Domain[]) => list.filter((d) => d.category === 'premium' && !d.vaulted),
  mid: (list: Domain[]) => list.filter((d) => d.category === 'mid' && !d.vaulted),
  quickSnag: (list: Domain[]) => list.filter((d) => d.quickSnag && !d.vaulted),
  flashRack: (list: Domain[]) => list.filter((d) => d.flashRack && !d.vaulted),
  vaulted: (list: Domain[]) => list.filter((d) => d.vaulted),
}; 