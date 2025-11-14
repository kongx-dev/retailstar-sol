// Fallback Supabase client for development when credentials are not configured
import { createClient } from '@supabase/supabase-js';

// Create a mock Supabase client that doesn't make real requests
export const createFallbackSupabaseClient = () => {
  return {
    auth: {
      signInWithOAuth: () => Promise.resolve({ error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
        }),
        insert: (data: any) => Promise.resolve({ data: null, error: null }),
        update: (data: any) => ({
          eq: (column: string, value: any) => ({
            select: (columns?: string) => Promise.resolve({ data: null, error: null })
          })
        })
      })
    }),
    sql: (query: string) => query
  };
};
