import { supabase, Domain } from './supabase';

export interface DomainQueryOptions {
  listed?: boolean;
  vaulted?: boolean;
  category?: string;
  tags?: string[];
  search?: string;
  limit?: number;
  featured?: boolean;
  has_build?: boolean;
  has_pfp?: boolean;
  available?: boolean;
}

// Fallback data for when Supabase is not configured
const fallbackDomains: Domain[] = [
  {
    id: 1,
    name: 'retailstar',
    slug: 'retailstar',
    description: 'The main Retailstar domain - headquarters of the Retailverse',
    image_url: '🏢',
    featured: false,
    status: 'not_for_sale',
    price: 'N/A',
    category: 'headquarters',
    vaulted: true,
    listed: true,
    available: false,
    tags: ['headquarters', 'main']
  },
  {
    id: 2,
    name: 'jpegdealer',
    slug: 'jpegdealer',
    description: 'Your NFT Plug - The JPEG game runs deep',
    image_url: '🖼️',
    featured: true,
    status: 'available',
    price: '5 SOL',
    category: 'premium',
    vaulted: false,
    listed: true,
    available: true,
    tags: ['nft', 'premium', 'art']
  },
  {
    id: 3,
    name: 'copevendor',
    slug: 'copevendor',
    description: 'Cope & Vend Since 2024 - Your one-stop shop for premium copium',
    image_url: '😤',
    featured: false,
    status: 'available',
    price: '2 SOL',
    category: 'basement',
    vaulted: false,
    listed: true,
    available: true,
    tags: ['cope', 'basement', 'meme']
  },
  {
    id: 4,
    name: 'commandhub',
    slug: 'commandhub',
    description: 'AI dashboard + infrastructure ready - For builders who mean business',
    image_url: '⚡',
    featured: true,
    status: 'available',
    price: '8.5 SOL',
    category: 'basement',
    vaulted: false,
    listed: true,
    available: true,
    tags: ['ai', 'basement', 'builder', 'infrastructure']
  },
  {
    id: 5,
    name: 'jpegdealer',
    slug: 'jpegdealer',
    description: 'Your NFT Plug - The JPEG game runs deep',
    image_url: '🖼️',
    featured: true,
    status: 'available',
    price: '5 SOL',
    category: 'basement',
    vaulted: false,
    listed: true,
    available: true,
    tags: ['nft', 'basement', 'art', 'degen']
  },
  {
    id: 6,
    name: 'lurkerlife',
    slug: 'lurkerlife',
    description: 'For the real ones who watch, wait, and strike when the time is right',
    image_url: '👁️',
    featured: false,
    status: 'available',
    price: '3 SOL',
    category: 'basement',
    vaulted: false,
    listed: true,
    available: true,
    tags: ['basement', 'meme', 'culture']
  }
];

export async function getAllDomains(options: DomainQueryOptions = {}): Promise<Domain[]> {
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackDomains;
  }

  try {
    let query = supabase
      .from('domains')
      .select('*');

    // Apply filters
    if (options.listed !== undefined) {
      query = query.eq('listed', options.listed);
    }

    if (options.vaulted !== undefined) {
      query = query.eq('vaulted', options.vaulted);
    }

    if (options.category) {
      query = query.eq('category', options.category);
    }

    if (options.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }

    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }

    if (options.has_build !== undefined) {
      query = query.eq('has_build', options.has_build);
    }

    if (options.has_pfp !== undefined) {
      query = query.eq('has_pfp', options.has_pfp);
    }

    if (options.available !== undefined) {
      query = query.eq('available', options.available);
    }

    if (options.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    // Featured-first sorting with fallbacks
    query = query.order('featured', { ascending: false }).order('created_at', { ascending: false }).order('name', { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching domains:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllDomains:', error);
    return [];
  }
}

export async function getDomainsByCategory(category: string): Promise<Domain[]> {
  return getAllDomains({ category, listed: true });
}

export async function getMarketplaceDomains(filters: DomainQueryOptions = {}): Promise<Domain[]> {
  const defaultFilters = {
    listed: true,
    ...filters
  };
  
  return getAllDomains(defaultFilters);
}

export async function getScavDomains(): Promise<Domain[]> {
  if (!supabase) {
    return fallbackDomains.filter(d => d.category === 'scav' || d.tags.includes('meme'));
  }
  return getAllDomains({ 
    category: 'scav',
    listed: true 
  });
}

export async function getBasementDomains(): Promise<Domain[]> {
  if (!supabase) {
    console.log('Supabase not configured, using fallback basement domains');
    const fallback = fallbackDomains.filter(d => d.category === 'basement');
    console.log('Fallback basement domains:', fallback);
    return fallback;
  }
  const domains = await getAllDomains({ 
    category: 'basement',
    listed: true 
  });
  console.log('Fetched basement domains from Supabase:', domains);
  return domains;
}

export async function getVaultedDomains(): Promise<Domain[]> {
  if (!supabase) {
    return fallbackDomains.filter(d => d.vaulted);
  }
  return getAllDomains({ 
    vaulted: true,
    listed: true 
  });
}

export async function getFeaturedDomains(): Promise<Domain[]> {
  if (!supabase) {
    return fallbackDomains.filter(d => d.featured);
  }
  return getAllDomains({ 
    featured: true,
    listed: true 
  });
}

export async function getMythicDomains(): Promise<Domain[]> {
  if (!supabase) {
    return fallbackDomains.filter(d => d.category === 'premium').slice(0, 2);
  }
  return getAllDomains({ 
    category: 'premium',
    listed: true,
    limit: 2 
  });
}

export async function getFlashOffers(): Promise<Domain[]> {
  if (!supabase) {
    return fallbackDomains.filter(d => d.category === 'flashRack').slice(0, 6);
  }
  return getAllDomains({ 
    category: 'flashRack',
    listed: true,
    limit: 6 
  });
}

export async function searchDomains(query: string): Promise<Domain[]> {
  return getAllDomains({ 
    search: query,
    listed: true 
  });
}

export async function getDomainsByTags(tags: string[]): Promise<Domain[]> {
  return getAllDomains({ 
    tags,
    listed: true 
  });
}

export async function getAvailableDomains(): Promise<Domain[]> {
  return getAllDomains({ 
    listed: true,
    available: true 
  });
}

export async function getDomainByName(name: string): Promise<Domain | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      console.error('Error fetching domain:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getDomainByName:', error);
    return null;
  }
}
