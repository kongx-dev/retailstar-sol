import { NextApiRequest, NextApiResponse } from 'next';
import { createRetailTicketLog, getUserAccessData } from '../../lib/supabase';

// Action enums for spending retail tickets
export type SpendAction = 
  | 'mall_pass'
  | 're_spin'
  | 'vault_access'
  | 'rank_upgrade'
  | 'slot_machine'
  | 'scav_perks'
  | 'merch_discount'
  | 'admin_deduction';

interface SpendRTRequest {
  wallet: string;
  action: SpendAction;
  amount: number;
  reason?: string;
  metadata?: {
    passDuration?: number; // hours
    slotCredits?: number;
    vaultTier?: string;
    upgradeTier?: string;
    discountPercent?: number;
    adminNote?: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet, action, amount, reason, metadata }: SpendRTRequest = req.body;

    // Validation
    if (!wallet || !action || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: wallet, action, amount' 
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be positive' 
      });
    }

    // Validate action enum
    const validActions: SpendAction[] = [
      'mall_pass',
      're_spin',
      'vault_access',
      'rank_upgrade',
      'slot_machine',
      'scav_perks',
      'merch_discount',
      'admin_deduction'
    ];

    if (!validActions.includes(action)) {
      return res.status(400).json({ 
        error: `Invalid action. Must be one of: ${validActions.join(', ')}` 
      });
    }

    // Check user's current ticket balance
    const userData = await getUserAccessData(wallet);
    if (!userData) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    if (userData.retail_tickets < amount) {
      return res.status(400).json({ 
        error: 'Insufficient Retail Tickets',
        currentBalance: userData.retail_tickets,
        requestedAmount: amount
      });
    }

    // Create source string based on action and metadata
    let source = '';
    let notes = reason || '';

    switch (action) {
      case 'mall_pass':
        const duration = metadata?.passDuration || 24;
        source = `Mall Pass (${duration}h)`;
        notes = notes || `Spent ${amount} RT for ${duration}-hour mall access`;
        break;
      case 're_spin':
        const credits = metadata?.slotCredits || 1;
        source = `Re-Spin (${credits} credits)`;
        notes = notes || `Spent ${amount} RT for ${credits} slot machine credits`;
        break;
      case 'vault_access':
        const vaultTier = metadata?.vaultTier || 'standard';
        source = `Vault Access (${vaultTier})`;
        notes = notes || `Spent ${amount} RT for ${vaultTier} vault access`;
        break;
      case 'rank_upgrade':
        const upgradeTier = metadata?.upgradeTier || 'temporary';
        source = `Rank Upgrade (${upgradeTier})`;
        notes = notes || `Spent ${amount} RT for ${upgradeTier} rank upgrade`;
        break;
      case 'slot_machine':
        source = 'Slot Machine';
        notes = notes || `Spent ${amount} RT on slot machine`;
        break;
      case 'scav_perks':
        source = 'Scavenger Perks';
        notes = notes || `Spent ${amount} RT on scavenger hunt perks`;
        break;
      case 'merch_discount':
        const discount = metadata?.discountPercent || 10;
        source = `Merch Discount (${discount}%)`;
        notes = notes || `Spent ${amount} RT for ${discount}% merchandise discount`;
        break;
      case 'admin_deduction':
        source = 'Admin Deduction';
        notes = notes || metadata?.adminNote || `Admin deducted ${amount} RT`;
        break;
    }

    // Create the ticket log entry (negative amount for spending)
    const result = await createRetailTicketLog({
      wallet,
      action: 'spend',
      source,
      amount: -amount, // Negative for spending
      notes
    });

    if (!result.success) {
      return res.status(500).json({ 
        error: result.error || 'Failed to create ticket log' 
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Successfully spent ${amount} Retail Tickets`,
      data: {
        wallet,
        action,
        amount,
        source,
        newBalance: userData.retail_tickets - amount,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in spendRT API:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}






