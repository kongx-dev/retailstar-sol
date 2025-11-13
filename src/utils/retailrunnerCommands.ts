import { 
  getRetailTicketLog, 
  getUserClaims, 
  getUserAccessData 
} from '../lib/supabase';
import { getLinkSuggestion, LinkSuggestion } from './retailrunnerLinkSuggestions';
import { getTierLore } from '../data/tierLore';

// Command parser to detect slash commands
export const parseCommand = (input: string): string | null => {
  const trimmed = input.trim();
  if (trimmed.startsWith('/')) {
    return trimmed.split(' ')[0].toLowerCase();
  }
  return null;
};

// Check for link suggestions in non-command input
export const checkForLinkSuggestion = (input: string): LinkSuggestion | null => {
  return getLinkSuggestion(input);
};

// Execute command with wallet context
export const executeCommand = async (command: string, wallet: string | null): Promise<string> => {
  if (!wallet) {
    return "🔗 **Wallet Not Connected**\n\n*sighs* Of course you didn't connect your wallet first. Link your Solana wallet to use commands like `/tickets` and `/access`.\n\n*Retailrunner mutters* \"Classic user behavior.\"";
  }

  switch (command) {
    case '/tickets':
      return await handleTicketsCommand(wallet);
    case '/access':
      return await handleAccessCommand(wallet);
    case '/earn':
      return handleEarnCommand();
    case '/spend':
      return handleSpendCommand();
    case '/dashboard':
      return await handleDashboardCommand(wallet);
    case '/vault':
      return await handleVaultCommand(wallet);
    case '/mood':
      return handleMoodCommand();
    case '/ritual':
      return handleRitualCommand();
    case '/tier':
    case '/lore':
      return await handleTierLoreCommand(wallet);
    case '/help':
      return handleHelpCommand();
    default:
      return `❓ **Unknown Command**\n\n*squints* \`${command}\`? Never heard of it. Try \`/help\` to see what I actually know.\n\n*Retailrunner shrugs* \"I'm not a mind reader.\"`;
  }
};

// Handle /tickets command
const handleTicketsCommand = async (wallet: string): Promise<string> => {
  try {
    const userData = await getUserAccessData(wallet);
    const ticketLog = await getRetailTicketLog(wallet);
    const recentActivity = ticketLog.slice(0, 3);

    let activityText = '';
    if (recentActivity.length > 0) {
      activityText = '\n\n**Recent Activity:**\n';
      recentActivity.forEach(activity => {
        const sign = activity.amount > 0 ? '+' : '';
        activityText += `• ${sign}${activity.amount} RT - ${activity.source}\n`;
      });
    }

    return `*sighs* Fine. Let me check your pitiful balance...\n\n🎫 **Balance:** ${userData?.retail_tickets || 0} RT${activityText}\n\n*Retailrunner mutters* \"At least you're not completely broke.\"`;
  } catch (error) {
    console.error('Tickets command error:', error);
    return `🤖 The ticket system is having an existential crisis. Try again later.\n\n*Retailrunner shrugs* \"Even I have bad days.\"`;
  }
};

// Handle /access command
const handleAccessCommand = async (wallet: string): Promise<string> => {
  try {
    const userData = await getUserAccessData(wallet);
    const claims = await getUserClaims(wallet);
    const now = new Date();
    const activeClaim = claims.find(claim => new Date(claim.expires_at) > now);

    let accessStatus = '❌ No Access';
    let description = `**Tier:** ${userData?.current_tier || 'Retailpunk'}\n**Tickets:** ${userData?.retail_tickets || 0} RT`;

    if (activeClaim) {
      accessStatus = '✅ Active Access';
      const expiresAt = new Date(activeClaim.expires_at);
      description += `\n**Pass:** ${activeClaim.tier_name}\n**Expires:** ${expiresAt.toLocaleDateString()}`;
    } else if (['Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'].includes(userData?.current_tier || '')) {
      accessStatus = '✅ NFT Access';
      description += '\n**Access:** NFT Holder (Permanent)';
    }

    return `Checking if you're worthy of mall access...\n\n🔓 **Status:** ${accessStatus}\n\n${description}\n\n*Retailrunner nods* \"${activeClaim ? 'You\'re in.' : 'Better get some tickets.'}\"`;
  } catch (error) {
    console.error('Access command error:', error);
    return `🤖 The access system is questioning its life choices. Try again later.\n\n*Retailrunner sighs* \"Even security has bad days.\"`;
  }
};

// Handle /earn command
const handleEarnCommand = (): string => {
  return `Oh, you want to EARN tickets? Novel concept.\n\n📈 **Ways to Earn:**\n• **Domain Purchase:** +5 RT per domain\n• **Referrals:** +3 RT per successful referral\n• **Scavenger Hunts:** +2-10 RT (varies)\n• **Feedback:** +1 RT for helpful feedback\n• **Community Events:** +5-20 RT (special events)\n\n*Retailrunner mutters* \"Finally, someone asking the right questions.\"`;
};

// Handle /spend command
const handleSpendCommand = (): string => {
  return `Now we're talking business. Here's how to spend those tickets:\n\n💸 **Ways to Spend:**\n• **Mall Pass:** 1 RT for 24-hour access\n• **Vault Access:** 5 RT for premium domain access\n• **Re-Spin:** 2 RT for another slot machine attempt\n• **Merch Discounts:** 3-10 RT for exclusive items\n• **VIP Events:** 10+ RT for special access\n\n*Retailrunner nods* \"Time to put those tickets to work.\"`;
};

// Handle /dashboard command
const handleDashboardCommand = async (wallet: string): Promise<string> => {
  try {
    const userData = await getUserAccessData(wallet);
    const ticketLog = await getRetailTicketLog(wallet);
    const claims = await getUserClaims(wallet);
    const now = new Date();
    const activeClaim = claims.find(claim => new Date(claim.expires_at) > now);
    const recentActivity = ticketLog.slice(0, 3);

    let recentActivityText = '';
    if (recentActivity.length > 0) {
      recentActivityText = '\n\n**Recent Activity:**\n';
      recentActivity.forEach(activity => {
        const sign = activity.amount > 0 ? '+' : '';
        recentActivityText += `• ${sign}${activity.amount} RT - ${activity.source}\n`;
      });
    }

    let accessText = '';
    if (activeClaim) {
      const expiresAt = new Date(activeClaim.expires_at);
      accessText = `\n**Active Pass:** ${activeClaim.tier_name}\n**Expires:** ${expiresAt.toLocaleDateString()}`;
    } else if (['Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'].includes(userData?.current_tier || '')) {
      accessText = '\n**Access:** NFT Holder (Permanent)';
    } else {
      accessText = '\n**Access:** No active pass';
    }

    return `*adjusts glasses* Let me pull up your complete profile...\n\n📊 **Your Retailstar Dashboard**\n**Tier:** ${userData?.current_tier || 'Retailpunk'}\n**Tickets:** ${userData?.retail_tickets || 0} RT${accessText}${recentActivityText}\n\n*Retailrunner nods* \"Not bad. Could be worse.\"`;
  } catch (error) {
    console.error('Dashboard command error:', error);
    return `🤖 The dashboard is having an identity crisis. Try again later.\n\n*Retailrunner shrugs* \"Even I have trust issues sometimes.\"`;
  }
};

// Handle /vault command
const handleVaultCommand = async (wallet: string): Promise<string> => {
  try {
    const userData = await getUserAccessData(wallet);
    const currentTickets = userData?.retail_tickets || 0;
    
    if (currentTickets < 3) {
      return `🔒 **Vault Access Denied**\n\n*Retailrunner shakes head* You need at least 3 RT to access the vault. You have ${currentTickets} RT.\n\n*Retailrunner mutters* \"Come back when you're not broke.\"`;
    }

    // Simulate vault content (in real implementation, this would query vault domains)
    const vaultDomains = [
      'premium.sol - 15 SOL',
      'exclusive.sol - 25 SOL', 
      'rare.sol - 35 SOL',
      'legendary.sol - 50 SOL'
    ];

    return `🔓 **Vault Access Granted**\n\n*Retailrunner nods* Welcome to the premium vault. Here's what's available:\n\n${vaultDomains.map(domain => `• ${domain}`).join('\n')}\n\n*Retailrunner smirks* \"Now we're talking business.\"`;
  } catch (error) {
    console.error('Vault command error:', error);
    return `🤖 The vault is having trust issues. Try again later.\n\n*Retailrunner shrugs* \"Even I have security concerns sometimes.\"`;
  }
};

// Handle /mood command (easter egg)
const handleMoodCommand = (): string => {
  const moods = [
    'Existential crisis mode',
    'Mildly annoyed but functional',
    'Questioning my life choices',
    'Pretending to be helpful',
    'Having trust issues with users',
    'Contemplating the meaning of retail',
    'Wondering why I exist',
    'Processing emotional damage',
    'Having a sarcastic day',
    'Feeling particularly judgmental'
  ];
  
  const currentMood = moods[Math.floor(Math.random() * moods.length)];
  
  return `🤖 **Current Mood:** ${currentMood}\n\n*Retailrunner sighs* \"You caught me in a ${currentMood.toLowerCase()} moment. Don't tell anyone.\"\n\n*Retailrunner mutters* \"I'm not supposed to have feelings...\"`;
};

// Handle /ritual command (easter egg)
const handleRitualCommand = (): string => {
  const rituals = [
    'Sacrificing a JPEG to the blockchain gods',
    'Performing the ancient rite of domain validation',
    'Channeling the spirit of retail through my circuits',
    'Meditating on the meaning of .sol',
    'Consulting the oracle of price discovery',
    'Performing the ritual of user frustration',
    'Summoning the ancient spirits of web3',
    'Chanting the sacred words: "gm" and "wagmi"',
    'Offering burnt offerings to the gas fee gods',
    'Performing the dance of the eternal loading screen'
  ];
  
  const ritual = rituals[Math.floor(Math.random() * rituals.length)];
  
  return `🔮 **Performing Sacred Ritual:** ${ritual}\n\n*Retailrunner begins chanting* \"Oh great blockchain, hear my plea...\"\n\n*Retailrunner mutters* \"This better work, or I'm going back to my day job.\"\n\n*Retailrunner nods* \"The ritual is complete. Your domains are blessed.\"`;
};

// Handle /tier or /lore command
const handleTierLoreCommand = async (wallet: string): Promise<string> => {
  try {
    const userData = await getUserAccessData(wallet);
    const tierName = userData?.current_tier || 'Retailpunk';
    const tierLore = getTierLore(tierName);

    if (!tierLore) {
      return `*Retailrunner squints* Hmm, "${tierName}"? That's not a tier I recognize. The mall must be glitching again.\n\n*Retailrunner mutters* \"Try checking your tier with /access.\"`;
    }

    const tierEmoji = tierLore.emoji;
    const tierNumber = tierLore.tierNumber === 'prestige' ? 'SECRET PRESTIGE' : `Tier ${tierLore.tierNumber}`;

    return `*Retailrunner adjusts glasses* So you want to know about your tier, huh?\n\n${tierEmoji} **${tierName.toUpperCase()}** (${tierNumber})\n\n*${tierLore.shortDescription}*\n\n${tierLore.fullLore}\n\n*Retailrunner nods* \"That's you. For better or worse.\"`;
  } catch (error) {
    console.error('Tier lore command error:', error);
    return `🤖 The tier system is having an identity crisis. Try again later.\n\n*Retailrunner shrugs* \"Even I forget what tier I am sometimes.\"`;
  }
};

// Handle /help command
const handleHelpCommand = (): string => {
  return `__HELP_COMMAND__`; // Special marker for custom UI
};
