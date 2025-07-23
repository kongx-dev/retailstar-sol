/**
 * 🛡️ Not-For-Sale Domain Logic Layer (Global Rule)
 * 
 * These .sol domains must be excluded from:
 * - /marketplace featured + flash offers
 * - /catalog filters (Premium, Mid, Quick Snag)
 * - /vote candidate pool
 * - /directory if marked "available"
 * - Any random rotation / sale widgets
 * - All pricing pages or build CTAs
 */

export const BLOCKLISTED_DOMAINS = [
  "hoodiedrip.sol", "hoodiehq.sol", "hoodieverse.sol",
  "raidprotocol.sol", "retailrunner.sol", "retailverse.sol",
  "rektlog.sol", "rektcasino.sol", "uplinknode.sol",
  "paymyinterns.sol", "pingstation.sol", "neverhooded.sol",
  "johnnysilverhand.sol", "gorillatech.sol", "dojoquest.sol",
  "retailstar.sol"
];

/**
 * Check if a domain is available for sale
 * @param domainName - The domain name to check (with or without .sol extension)
 * @returns boolean - true if domain is for sale, false if blocklisted
 */
export const isForSale = (domainName: string): boolean => {
  const normalizedName = domainName.toLowerCase().endsWith('.sol') 
    ? domainName.toLowerCase() 
    : `${domainName.toLowerCase()}.sol`;
  
  return !BLOCKLISTED_DOMAINS.includes(normalizedName);
};

/**
 * Filter out blocklisted domains from a list
 * @param domains - Array of domain objects or domain names
 * @returns Filtered array excluding blocklisted domains
 */
export const filterBlocklisted = <T extends { name?: string; slug?: string } | string>(
  domains: T[]
): T[] => {
  return domains.filter((domain) => {
    const domainName = typeof domain === 'string' 
      ? domain 
      : domain.name || domain.slug || '';
    
    return isForSale(domainName);
  });
}; 