import { useState, useEffect } from 'react';

export type SNSAvailabilityStatus = 'checking' | 'available' | 'taken' | 'error';

export type SNSAvailabilityResult = {
  available: boolean;
  domain: string;
  status: SNSAvailabilityStatus;
  error?: string;
};

// Legacy type for backward compatibility
export type LegacySNSAvailabilityResult = {
  isAvailable: boolean | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Sanitize domain name for SNS checking
 */
export const sanitizeDomainName = (domain: string): string => {
  return domain
    .toLowerCase()
    .replace('.sol', '')
    .replace(/[^a-z0-9-]/g, '')
    .trim();
};

/**
 * Validate domain name format
 */
export const isValidDomainFormat = (domain: string): boolean => {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(domain);
};

/**
 * Format domain name for SNS checking
 */
export const formatDomainForSNS = (domainName: string): string => {
  return domainName.toLowerCase().replace(/[^a-z0-9.-]/g, '');
};

/**
 * Hook to check SNS domain availability using Helius API
 */
export const useCheckSNSAvailability = (domainName: string): SNSAvailabilityResult => {
  const [result, setResult] = useState<SNSAvailabilityResult>({
    available: false,
    domain: domainName,
    status: 'checking'
  });

  useEffect(() => {
    if (!domainName) {
      setResult({
        available: false,
        domain: domainName,
        status: 'error',
        error: 'No domain provided'
      });
      return;
    }

    const checkAvailability = async () => {
      const apiKey = import.meta.env.VITE_HELIUS_API_KEY;
      
      if (!apiKey) {
        console.warn('⚠️ VITE_HELIUS_API_KEY not found in .env');
        setResult({
          available: false,
          domain: domainName,
          status: 'error',
          error: 'API key not configured'
        });
        return;
      }

      // Sanitize domain name
      const sanitizedDomain = sanitizeDomainName(domainName);
      
      if (!isValidDomainFormat(sanitizedDomain)) {
        setResult({
          available: false,
          domain: domainName,
          status: 'error',
          error: 'Invalid domain format'
        });
        return;
      }

      setResult({
        available: false,
        domain: domainName,
        status: 'checking'
      });

      try {
        const response = await fetch(
          `https://api.helius.xyz/v0/domains/${sanitizedDomain}?api-key=${apiKey}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 429) {
          setResult({
            available: false,
            domain: domainName,
            status: 'error',
            error: 'Rate limit reached. Please try again in a moment.'
          });
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Helius API returns registered: true if domain is taken
        const isAvailable = !data.registered;
        
        console.log('🔍 SNS Availability Check:', {
          domain: domainName,
          sanitizedDomain,
          available: isAvailable,
          registered: data.registered,
          timestamp: new Date().toISOString()
        });

        // Track with Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sns_availability_check', {
            event_category: 'tools',
            event_label: domainName,
            value: isAvailable ? 1 : 0
          });
        }

        setResult({
          available: isAvailable,
          domain: domainName,
          status: isAvailable ? 'available' : 'taken'
        });

      } catch (err) {
        console.error('❌ SNS availability check failed:', err);
        
        setResult({
          available: false,
          domain: domainName,
          status: 'error',
          error: err instanceof Error ? err.message : 'Network error'
        });
      }
    };

    checkAvailability();
  }, [domainName]);

  return result;
};

/**
 * Hook for manual individual domain checking with better rate limiting
 */
export const useManualSNSAvailability = (): {
  checkDomain: (domainName: string) => Promise<SNSAvailabilityResult>;
  isChecking: boolean;
} => {
  const [isChecking, setIsChecking] = useState(false);

  const checkDomain = async (domainName: string): Promise<SNSAvailabilityResult> => {
    if (isChecking) {
      return {
        available: false,
        domain: domainName,
        status: 'error',
        error: 'Another check is in progress'
      };
    }

    setIsChecking(true);

    try {
      const result = await checkSingleDomain(domainName);
      return result;
    } finally {
      setIsChecking(false);
    }
  };

  return { checkDomain, isChecking };
};

/**
 * Hook to check multiple domains at once with rate limiting
 */
export const useCheckMultipleSNSAvailability = (domainNames: string[]): {
  results: Record<string, SNSAvailabilityResult>;
  isLoading: boolean;
} => {
  const [results, setResults] = useState<Record<string, SNSAvailabilityResult>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (domainNames.length === 0) {
      setResults({});
      return;
    }

    const checkMultiple = async () => {
      setIsLoading(true);
      const batchResults: Record<string, SNSAvailabilityResult> = {};
      
      // Initialize all domains as checking
      domainNames.forEach(domain => {
        batchResults[domain] = {
          available: false,
          domain,
          status: 'checking'
        };
      });
      setResults(batchResults);
      
      // Check domains sequentially with increased delay to avoid rate limits
      for (let i = 0; i < domainNames.length; i++) {
        const domain = domainNames[i];
        
        try {
          const result = await checkSingleDomain(domain);
          batchResults[domain] = result;
          setResults({ ...batchResults });
          
          // Increased delay between requests (1 second) to prevent resource exhaustion
          if (i < domainNames.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (err) {
          console.error(`Failed to check domain ${domain}:`, err);
          batchResults[domain] = {
            available: false,
            domain,
            status: 'error',
            error: err instanceof Error ? err.message : 'Check failed'
          };
          setResults({ ...batchResults });
          
          // Add extra delay after errors to prevent cascading failures
          if (i < domainNames.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
      
      setIsLoading(false);
    };

    checkMultiple();
  }, [domainNames]);

  return { results, isLoading };
};

/**
 * Check a single domain (helper function) with retry mechanism
 */
const checkSingleDomain = async (domainName: string, retryCount = 0): Promise<SNSAvailabilityResult> => {
  const apiKey = import.meta.env.VITE_HELIUS_API_KEY;
  
  if (!apiKey) {
    return {
      available: false,
      domain: domainName,
      status: 'error',
      error: 'API key not configured'
    };
  }

  const sanitizedDomain = sanitizeDomainName(domainName);
  
  if (!isValidDomainFormat(sanitizedDomain)) {
    return {
      available: false,
      domain: domainName,
      status: 'error',
      error: 'Invalid domain format'
    };
  }

  const maxRetries = 2;
  const baseDelay = 3000; // 3 second base delay for free tier

  try {
    const response = await fetch(
      `https://api.helius.xyz/v0/domains/${sanitizedDomain}?api-key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000) // 10 second timeout
      }
    );

    if (response.status === 429) {
      // Rate limit hit - retry with exponential backoff
      if (retryCount < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount);
        console.log(`Rate limit hit for ${domainName}, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return checkSingleDomain(domainName, retryCount + 1);
      }
      
      return {
        available: false,
        domain: domainName,
        status: 'error',
        error: 'Rate limit reached - too many requests'
      };
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const isAvailable = !data.registered;
    
    return {
      available: isAvailable,
      domain: domainName,
      status: isAvailable ? 'available' : 'taken'
    };

  } catch (err) {
    // Handle network errors with retry
    if (retryCount < maxRetries && (err instanceof Error && (
      err.message.includes('ERR_INSUFFICIENT_RESOURCES') ||
      err.message.includes('NetworkError') ||
      err.message.includes('Failed to fetch')
    ))) {
      const delay = baseDelay * Math.pow(2, retryCount);
      console.log(`Network error for ${domainName}, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return checkSingleDomain(domainName, retryCount + 1);
    }
    
    return {
      available: false,
      domain: domainName,
      status: 'error',
      error: err instanceof Error ? err.message : 'Network error'
    };
  }
};

/**
 * Utility function to validate domain name format (legacy)
 */
export const isValidDomainName = (domainName: string): boolean => {
  const domainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/i;
  return domainRegex.test(domainName.replace('.sol', '')) && domainName.endsWith('.sol');
};
