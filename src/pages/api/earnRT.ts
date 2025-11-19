import { NextApiRequest, NextApiResponse } from 'next';
import { createRetailTicketLog } from '../../lib/supabase';

// Action enums for earning retail tickets
export type EarnAction = 
  | 'domain_purchase'
  | 'scavenger_hunt'
  | 'slot_machine'
  | 'referral'
  | 'feedback'
  | 'event_participation'
  | 'bonus_drop'
  | 'admin_grant';

interface EarnRTRequest {
  wallet: string;
  action: EarnAction;
  amount: number;
  reason?: string;
  metadata?: {
    domainSlug?: string;
    huntId?: string;
    slotResult?: string;
    referralCode?: string;
    eventName?: string;
    adminNote?: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet, action, amount, reason, metadata }: EarnRTRequest = req.body;

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
    const validActions: EarnAction[] = [
      'domain_purchase',
      'scavenger_hunt', 
      'slot_machine',
      'referral',
      'feedback',
      'event_participation',
      'bonus_drop',
      'admin_grant'
    ];

    if (!validActions.includes(action)) {
      return res.status(400).json({ 
        error: `Invalid action. Must be one of: ${validActions.join(', ')}` 
      });
    }

    // Create source string based on action and metadata
    let source = '';
    let notes = reason || '';

    switch (action) {
      case 'domain_purchase':
        source = metadata?.domainSlug ? `Domain: ${metadata.domainSlug}` : 'Domain Purchase';
        notes = notes || `Earned ${amount} RT for domain purchase`;
        break;
      case 'scavenger_hunt':
        source = metadata?.huntId ? `Hunt: ${metadata.huntId}` : 'Scavenger Hunt';
        notes = notes || `Earned ${amount} RT for completing scavenger hunt`;
        break;
      case 'slot_machine':
        source = metadata?.slotResult ? `Slot: ${metadata.slotResult}` : 'Slot Machine';
        notes = notes || `Earned ${amount} RT from slot machine`;
        break;
      case 'referral':
        source = metadata?.referralCode ? `Referral: ${metadata.referralCode}` : 'Referral';
        notes = notes || `Earned ${amount} RT for referral`;
        break;
      case 'feedback':
        source = 'Feedback Submission';
        notes = notes || `Earned ${amount} RT for feedback`;
        break;
      case 'event_participation':
        source = metadata?.eventName ? `Event: ${metadata.eventName}` : 'Event Participation';
        notes = notes || `Earned ${amount} RT for event participation`;
        break;
      case 'bonus_drop':
        source = 'Bonus Drop';
        notes = notes || `Earned ${amount} RT from bonus drop`;
        break;
      case 'admin_grant':
        source = 'Admin Grant';
        notes = notes || metadata?.adminNote || `Admin granted ${amount} RT`;
        break;
    }

    // Create the ticket log entry
    const result = await createRetailTicketLog({
      wallet,
      action: 'earn',
      source,
      amount,
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
      message: `Successfully earned ${amount} Retail Tickets`,
      data: {
        wallet,
        action,
        amount,
        source,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in earnRT API:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}













