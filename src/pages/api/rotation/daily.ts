import type { NextApiRequest, NextApiResponse } from 'next';
// If you see a type error for 'next', ensure @types/next is installed in your project.
import { domains as allDomains } from '../../../data/domains';
import { filterBlocklisted } from '../../../data/blocklist';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
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
} 