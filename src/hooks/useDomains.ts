import { useEffect, useState } from 'react';
import { supabase, Domain } from '../lib/supabase';

export interface UseDomainsOptions {
  listed?: boolean;
  vaulted?: boolean;
  category?: string;
  tags?: string[];
  search?: string;
  limit?: number;
}

export interface UseDomainsReturn {
  domains: Domain[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDomains(options: UseDomainsOptions = {}): UseDomainsReturn {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    if (!supabase) {
      console.warn('Supabase not configured, using fallback data');
      setDomains([]);
      setError('Supabase not configured - using fallback data');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

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

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      // Order by name
      query = query.order('name', { ascending: true });

      const { data, error: queryError } = await query;

      if (queryError) {
        throw new Error(queryError.message);
      }

      setDomains(data || []);
    } catch (err) {
      console.error('Error fetching domains:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch domains');
      setDomains([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, [options.listed, options.vaulted, options.category, options.tags, options.search, options.limit]);

  return {
    domains,
    loading,
    error,
    refetch: fetchDomains
  };
}

// Convenience hooks for common use cases
export function useScavDomains(filters: Record<string, boolean> = {}) {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScavDomains = async () => {
      try {
        setLoading(true);
        setError(null);
        const { getAllDomains } = await import('../lib/domainQueries');
        
        // Build query options from filters
        const queryOptions: any = {
          category: 'scav',
          listed: true
        };
        
        // Apply filters
        if (filters.vaulted !== undefined) queryOptions.vaulted = filters.vaulted;
        if (filters.featured !== undefined) queryOptions.featured = filters.featured;
        if (filters.has_build !== undefined) queryOptions.has_build = filters.has_build;
        if (filters.has_pfp !== undefined) queryOptions.has_pfp = filters.has_pfp;
        
        const scavDomains = await getAllDomains(queryOptions);
        setDomains(scavDomains);
      } catch (err) {
        console.error('Error fetching scav domains:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch scav domains');
        setDomains([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScavDomains();
  }, [filters.vaulted, filters.featured, filters.has_build, filters.has_pfp]);

  return { domains, loading, error, refetch: () => window.location.reload() };
}

export function useBasementDomains() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBasementDomains = async () => {
      try {
        setLoading(true);
        setError(null);
        const { getBasementDomains } = await import('../lib/domainQueries');
        const basementDomains = await getBasementDomains();
        setDomains(basementDomains);
      } catch (err) {
        console.error('Error fetching basement domains:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch basement domains');
        setDomains([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBasementDomains();
  }, []);

  return { domains, loading, error, refetch: () => window.location.reload() };
}

export function useVaultedDomains() {
  return useDomains({ 
    vaulted: true,
    listed: true 
  });
}

export function useFeaturedDomains() {
  return useDomains({ 
    listed: true,
    limit: 10 
  });
}

export function useAvailableDomains() {
  return useDomains({ 
    listed: true,
    available: true 
  });
}
