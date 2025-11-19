import { supabase } from './supabase';

/**
 * Fetch a single department by slug
 * @param {string} slug - Department slug (e.g., 'meme-arcade')
 * @returns {Promise<Object|null>} Department object or null if not found
 */
export async function getDepartment(slug) {
  if (!supabase) {
    console.warn('Supabase not available, cannot fetch department');
    return null;
  }

  if (!slug || slug === 'undefined') {
    console.warn('getDepartment: Invalid slug provided:', slug);
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching department:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getDepartment:', error);
    return null;
  }
}

/**
 * Fetch all domains for a specific department
 * @param {string} slug - Department slug (e.g., 'meme-arcade')
 * @returns {Promise<Array>} Array of domain objects
 */
export async function getDomainsForDepartment(slug) {
  if (!supabase) {
    console.warn('Supabase not available, cannot fetch domains for department');
    return [];
  }

  if (!slug || slug === 'undefined') {
    console.warn('getDomainsForDepartment: Invalid slug provided:', slug);
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('domain_departments')
      .select(`
        domains!inner(*)
      `)
      .eq('dept_slug', slug);

    if (error) {
      console.error('Error fetching domains for department:', error);
      return [];
    }

    // Extract domains from the joined result
    // Filter out any null domains and filter by active/listed status
    const domains = data?.map(row => row.domains).filter(domain => domain !== null) || [];
    
    // Filter by active/listed status (check both is_active and available/listed fields)
    return domains.filter(domain => {
      // Check if domain is active (using is_active, available, or listed fields)
      return domain.is_active !== false && 
             (domain.available !== false || domain.listed !== false);
    });
  } catch (error) {
    console.error('Error in getDomainsForDepartment:', error);
    return [];
  }
}

/**
 * Fetch all domains with their associated department slugs
 * @returns {Promise<Array>} Array of domain objects with departmentSlugs property
 */
export async function getDomainsWithDepartments() {
  if (!supabase) {
    console.warn('Supabase not available, cannot fetch domains with departments');
    return [];
  }

  try {
    // Fetch all domains with their department relationships using join
    // Try to use the join syntax first
    const { data: domainDepts, error: deptsError } = await supabase
      .from('domain_departments')
      .select(`
        dept_slug,
        domains(*)
      `);

    if (!deptsError && domainDepts) {
      // Group department slugs by domain
      const domainMap = {};
      
      domainDepts.forEach(row => {
        if (row.domains) {
          const domain = row.domains;
          const domainKey = domain.id || domain.slug || domain.name;
          
          if (!domainMap[domainKey]) {
            domainMap[domainKey] = {
              ...domain,
              departmentSlugs: []
            };
          }
          
          if (row.dept_slug) {
            domainMap[domainKey].departmentSlugs.push(row.dept_slug);
          }
        }
      });

      // Convert map to array and remove duplicates
      const uniqueDomains = Object.values(domainMap);
      return uniqueDomains;
    }

    // Fallback: fetch domains and departments separately
    const { data: domains, error: domainsError } = await supabase
      .from('domains')
      .select('*')
      .order('name', { ascending: true });

    if (domainsError) {
      console.error('Error fetching domains:', domainsError);
      return [];
    }

    if (!domains || domains.length === 0) {
      return [];
    }

    // Fetch all domain-department relationships
    const { data: domainDeptsFallback, error: deptsErrorFallback } = await supabase
      .from('domain_departments')
      .select('*');

    if (deptsErrorFallback) {
      console.error('Error fetching domain departments:', deptsErrorFallback);
      // Return domains without department info if join table query fails
      return domains.map(domain => ({ ...domain, departmentSlugs: [] }));
    }

    // Group department slugs by domain
    // Try to match by slug first, then by name
    const deptMap = {};
    if (domainDeptsFallback) {
      domainDeptsFallback.forEach(row => {
        // Try different possible field names for domain reference
        const domainRef = row.domain_slug || row.domain_id || row.domain_name;
        if (domainRef) {
          if (!deptMap[domainRef]) {
            deptMap[domainRef] = [];
          }
          if (row.dept_slug) {
            deptMap[domainRef].push(row.dept_slug);
          }
        }
      });
    }

    // Attach department slugs to each domain
    return domains.map(domain => {
      // Try to match by slug first, then by name
      const domainKey = domain.slug || domain.name;
      return {
        ...domain,
        departmentSlugs: deptMap[domainKey] || []
      };
    });
  } catch (error) {
    console.error('Error in getDomainsWithDepartments:', error);
    return [];
  }
}

/**
 * Fetch all departments
 * @returns {Promise<Array>} Array of department objects
 */
export async function getAllDepartments() {
  if (!supabase) {
    console.warn('Supabase not available, cannot fetch departments');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching departments:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllDepartments:', error);
    return [];
  }
}

/**
 * Get the first department for a specific domain
 * @param {string} domainSlug - Domain slug (e.g., 'jpegdealer')
 * @returns {Promise<Object|null>} Department object or null if not found
 */
export async function getDepartmentForDomain(domainSlug) {
  if (!supabase) {
    console.warn('Supabase not available, cannot fetch department for domain');
    return null;
  }

  if (!domainSlug || domainSlug === 'undefined') {
    console.warn('getDepartmentForDomain: Invalid domainSlug provided:', domainSlug);
    return null;
  }

  try {
    // First, get the department slug from domain_departments
    const { data: domainDept, error: domainDeptError } = await supabase
      .from('domain_departments')
      .select('dept_slug')
      .eq('domain_slug', domainSlug)
      .limit(1)
      .single();

    if (domainDeptError || !domainDept) {
      // Try alternative field names
      const { data: altDomainDept, error: altError } = await supabase
        .from('domain_departments')
        .select('dept_slug')
        .or(`domain_slug.eq.${domainSlug},domain_name.eq.${domainSlug}`)
        .limit(1)
        .maybeSingle();

      if (altError || !altDomainDept) {
        return null;
      }

      // Fetch the department
      return await getDepartment(altDomainDept.dept_slug);
    }

    // Fetch the department
    return await getDepartment(domainDept.dept_slug);
  } catch (error) {
    console.error('Error in getDepartmentForDomain:', error);
    return null;
  }
}

