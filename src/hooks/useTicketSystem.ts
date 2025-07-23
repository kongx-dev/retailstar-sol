import { useState, useEffect } from 'react';
import { 
  UserTicketData, 
  SpinResult, 
  getMockUserData, 
  spinWheel, 
  getCampaignInfo,
  getSpinCost,
  addSpinToHistory,
  addTicketEarning,
  updateUserTicketBalance
} from '../lib/spinEngine';
import { ApiService } from '../lib/apiService';

export function useTicketSystem(useApi: boolean = false) {
  const [userData, setUserData] = useState<UserTicketData>(getMockUserData());
  const [campaignInfo, setCampaignInfo] = useState(getCampaignInfo());
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpinResult, setLastSpinResult] = useState<SpinResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update campaign info periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (useApi) {
        ApiService.getCampaignInfo().then(setCampaignInfo);
      } else {
        setCampaignInfo(getCampaignInfo());
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [useApi]);

  const handleSpin = async (): Promise<SpinResult | null> => {
    if (isSpinning || userData.ticketBalance < getSpinCost()) {
      return null;
    }

    setIsSpinning(true);

    try {
      if (useApi) {
        // Use real API
        const response = await ApiService.spinWheel({
          wallet: userData.wallet,
          tickets: userData.ticketBalance
        });

        // Convert API response to SpinResult format
        const spinResult: SpinResult = {
          result: response.prize,
          timestamp: response.timestamp,
          spinId: `spin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        // Update user data
        const updatedUserData = {
          ...userData,
          ticketBalance: response.newBalance,
          spins: [...userData.spins, {
            timestamp: response.timestamp,
            reward: response.prize.label,
            spinId: spinResult.spinId
          }]
        };

        setUserData(updatedUserData);
        setLastSpinResult(spinResult);
        
        return spinResult;
      } else {
        // Use local mock logic
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const spinResult = spinWheel();
        const updatedUserData = addSpinToHistory(userData, spinResult);
        
        setUserData(updatedUserData);
        setLastSpinResult(spinResult);
        
        return spinResult;
      }
    } catch (error) {
      console.error('Spin failed:', error);
      return null;
    } finally {
      setIsSpinning(false);
    }
  };

  const addTicketEarningEvent = async (event: string, source: string, amount: number) => {
    if (useApi) {
      await ApiService.addTicketEarning(userData.wallet, event, source, amount);
    }
    
    const updatedUserData = addTicketEarning(userData, event, source, amount);
    setUserData(updatedUserData);
  };

  const updateBalance = (amount: number) => {
    const updatedUserData = updateUserTicketBalance(userData, amount);
    setUserData(updatedUserData);
  };

  const refreshUserData = async () => {
    if (useApi) {
      setIsLoading(true);
      try {
        const ticketBalance = await ApiService.getUserTickets(userData.wallet);
        setUserData(prev => ({ ...prev, ticketBalance }));
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const canSpin = userData.ticketBalance >= getSpinCost() && !isSpinning;

  return {
    userData,
    campaignInfo,
    isSpinning,
    lastSpinResult,
    canSpin,
    isLoading,
    handleSpin,
    addTicketEarningEvent,
    updateBalance,
    refreshUserData,
    spinCost: getSpinCost()
  };
} 