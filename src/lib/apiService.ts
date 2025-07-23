import { SpinResult } from './spinEngine';

export interface SpinRequest {
  wallet: string;
  tickets: number;
}

export interface SpinResponse {
  wallet: string;
  prize: {
    label: string;
    type: string;
    value: string | number;
    rarity: string;
    weight: number;
    description: string;
  };
  newBalance: number;
  timestamp: string;
  message: string;
}

export class ApiService {
  private static baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://retailstar.sol/api' 
    : 'http://localhost:3000/api';

  static async spinWheel(request: SpinRequest): Promise<SpinResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/spin-wheel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Spin failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  static async getUserTickets(wallet: string): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/user-tickets?wallet=${wallet}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user tickets');
      }

      const data = await response.json();
      return data.ticketBalance;
    } catch (error) {
      console.error('Failed to fetch user tickets:', error);
      // Return mock data for development
      return 34;
    }
  }

  static async addTicketEarning(wallet: string, event: string, source: string, amount: number): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/add-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet,
          event,
          source,
          amount,
        }),
      });
    } catch (error) {
      console.error('Failed to add ticket earning:', error);
    }
  }

  static async getCampaignInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/campaign-info`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaign info');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch campaign info:', error);
      // Return mock data for development
      return {
        name: "🎯 Scav Madness",
        description: "Buy 2 Scav Rack domains = 🎟️ x5",
        isActive: true,
        endDate: "2025-01-28T23:59:59Z"
      };
    }
  }
} 