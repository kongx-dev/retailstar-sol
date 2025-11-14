// Command usage tracking utility
// This can be implemented later to track command usage in Supabase

export interface CommandLog {
  wallet: string;
  command: string;
  timestamp: Date;
  success: boolean;
  error?: string;
}

export const trackCommandUsage = async (
  wallet: string, 
  command: string, 
  success: boolean, 
  error?: string
): Promise<void> => {
  // Future implementation: Log to Supabase command_log table
  // For now, just log to console for development
  console.log('Command Usage:', {
    wallet: wallet.slice(0, 8) + '...',
    command,
    success,
    error,
    timestamp: new Date().toISOString()
  });
};

// Command analytics (future feature)
export const getCommandStats = async (wallet: string) => {
  // Future: Query Supabase for user's command usage stats
  return {
    totalCommands: 0,
    mostUsedCommand: null,
    lastCommand: null
  };
};
