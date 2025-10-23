import type { NextApiRequest, NextApiResponse } from 'next';
// If you see a type error for 'next', ensure @types/next is installed in your project.
import { getAllDomains } from '../../../lib/domainQueries';
import { filterBlocklisted } from '../../../data/blocklist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const now = new Date();
    const allDomains = await getAllDomains({ listed: true, available: true });
    
    const filtered = allDomains.filter(
      (d: any) => d.escrow === true && d.listed === true && d.vaulted === false
    );
    
    // Apply blocklist filtering to exclude not-for-sale domains
    const availableForRotation = filterBlocklisted(filtered);
    
    const rotation = availableForRotation
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((d: any) => ({
        ...d,
        rotationGroup: 'daily',
        rotationExpires: new Date(now.getTime() + 86400000).toISOString(),
      }));
    
    res.status(200).json(rotation);
  } catch (error) {
    console.error('Error in daily rotation API:', error);
    res.status(500).json({ error: 'Failed to fetch rotation data' });
  }
} 