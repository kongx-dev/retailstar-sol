import type { NextApiRequest, NextApiResponse } from 'next';
import spinConfig from '../../data/spinConfig.json';

type Prize = { label: string; rarity: string; weight: number };

function weightedRandom(prizes: Prize[]): Prize {
  const totalWeight = prizes.reduce((sum, p) => sum + p.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const prize of prizes) {
    if (rand < prize.weight) return prize;
    rand -= prize.weight;
  }
  return prizes[0]; // fallback
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  
  const { wallet, tickets } = req.body;
  if (!wallet || typeof tickets !== 'number') {
    return res.status(400).json({ message: 'Missing wallet or ticket balance.' });
  }

  if (tickets < 5) {
    return res.status(400).json({ message: 'Insufficient tickets to spin.' });
  }

  const prize = weightedRandom(spinConfig.prizes);
  const newBalance = tickets - 5;

      // TODO: Save to database
    // console.log('Spin completed for wallet:', wallet);
    // console.log('Prize won:', prize.label);

  return res.status(200).json({ 
    prize, 
    newBalance,
    timestamp: new Date().toISOString(),
    message: `🎉 You won: ${prize.label}!`
  });
} 