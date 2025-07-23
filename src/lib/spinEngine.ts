import spinConfig from '../data/spinConfig.json';

export interface SpinResult {
  result: {
    label: string;
    type: string;
    value: string | number;
    rarity: string;
    weight: number;
    description: string;
  };
  timestamp: string;
  spinId: string;
}

export interface UserTicketData {
  wallet: string;
  ticketBalance: number;
  spins: Array<{
    timestamp: string;
    reward: string;
    spinId: string;
  }>;
  history: Array<{
    event: string;
    source: string;
    amount: number;
    timestamp: string;
  }>;
}

export function spinWheel(): SpinResult {
  const { rewards } = spinConfig.spinWheel;

  // Expand weighted list
  const weightedPool = rewards.flatMap((reward) => Array(reward.weight).fill(reward));
  const winner = weightedPool[Math.floor(Math.random() * weightedPool.length)];

  return {
    result: winner,
    timestamp: new Date().toISOString(),
    spinId: generateSpinId()
  };
}

export function generateSpinId(): string {
  return `spin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateTicketEarning(domainCategory: string, isCampaignActive: boolean = false): number {
  const { ticketEarning } = spinConfig;
  const baseAmount = ticketEarning.purchase[domainCategory as keyof typeof ticketEarning.purchase] || 1;
  
  if (isCampaignActive) {
    return baseAmount * spinConfig.campaign.bonusMultiplier;
  }
  
  return baseAmount;
}

export function isCampaignActive(): boolean {
  const now = new Date();
  const startDate = new Date(spinConfig.campaign.startDate);
  const endDate = new Date(spinConfig.campaign.endDate);
  
  return spinConfig.campaign.active && now >= startDate && now <= endDate;
}

export function getCampaignInfo() {
  return {
    ...spinConfig.campaign,
    isActive: isCampaignActive()
  };
}

export function getSpinCost(): number {
  return spinConfig.spinWheel.costPerSpin;
}

export function getRewardsPool() {
  return spinConfig.spinWheel.rewards;
}

// Mock user data - replace with real backend storage
export function getMockUserData(): UserTicketData {
  return {
    wallet: "7vswd...sf9A",
    ticketBalance: 34,
    spins: [
      {
        timestamp: "2025-01-21T19:23:00Z",
        reward: "15% Off Coupon",
        spinId: "spin_1705857780000_abc123"
      }
    ],
    history: [
      {
        event: "Bought copevendor.sol",
        source: "scav-rack",
        amount: 3,
        timestamp: "2025-01-21T18:47:12Z"
      },
      {
        event: "Submitted feedback",
        source: "feedback",
        amount: 3,
        timestamp: "2025-01-19T14:30:00Z"
      },
      {
        event: "Bought 1 Premium domain",
        source: "premium-purchase",
        amount: 2,
        timestamp: "2025-01-15T10:15:00Z"
      },
      {
        event: "Won spin wheel",
        source: "wheel-win",
        amount: 10,
        timestamp: "2025-01-14T16:45:00Z"
      },
      {
        event: "Referred friend",
        source: "referral",
        amount: 5,
        timestamp: "2025-01-10T09:20:00Z"
      }
    ]
  };
}

export function updateUserTicketBalance(userData: UserTicketData, amount: number): UserTicketData {
  return {
    ...userData,
    ticketBalance: Math.max(0, userData.ticketBalance + amount)
  };
}

export function addSpinToHistory(userData: UserTicketData, spinResult: SpinResult): UserTicketData {
  return {
    ...userData,
    spins: [...userData.spins, {
      timestamp: spinResult.timestamp,
      reward: spinResult.result.label,
      spinId: spinResult.spinId
    }],
    ticketBalance: Math.max(0, userData.ticketBalance - getSpinCost())
  };
}

export function addTicketEarning(userData: UserTicketData, event: string, source: string, amount: number): UserTicketData {
  return {
    ...userData,
    ticketBalance: userData.ticketBalance + amount,
    history: [...userData.history, {
      event,
      source,
      amount,
      timestamp: new Date().toISOString()
    }]
  };
} 