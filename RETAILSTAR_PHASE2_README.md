# RetailStar Mall - Phase 2 Access System

## 🎫 Overview

The RetailStar Phase 2 Access System implements a comprehensive gating and reward engine for the RetailStar Mall, featuring:

- **Wallet-based access control** with tier-based permissions
- **Retail Ticket (RT) economy** for earning and spending
- **Day pass system** with 24-hour access
- **WifHoodie NFT bypass** for unlimited access
- **LocalStorage fallback** when Supabase is unavailable

## 🏗️ Architecture

### Core Components

1. **`useRetailAccess` Hook** - Main access control logic
2. **`MallAccessGuard`** - Route protection component
3. **`RetailpassPage`** - User onboarding and pass management
4. **`DayPassCountdown`** - Real-time countdown display
5. **Supabase Integration** - Database backend with localStorage fallback

### Database Schema

#### RetailpunkRegistry
- `wallet_address` (TEXT, UNIQUE) - User's wallet
- `tier` (TEXT) - Access tier (Tier 0, Retailpunk, Mallrat, Slotlord, Hoodieguard)
- `wifhoodie_holder` (BOOLEAN) - WifHoodie NFT ownership
- `retailpass_expiry` (TIMESTAMP) - Day pass expiration
- `total_rts` (INT) - Retail Ticket balance

#### TicketLog
- `wallet_address` (TEXT) - User wallet
- `action` (TEXT) - Transaction type (Earn, Spend, etc.)
- `amount` (INT) - RT amount (+/-)
- `access_target` (TEXT) - What was accessed
- `notes` (TEXT) - Additional context

## 🚀 Quick Start

### 1. Database Setup

Run the SQL scripts in `database-setup.sql` in your Supabase SQL editor:

```sql
-- Create tables
CREATE TABLE RetailpunkRegistry (...);
CREATE TABLE TicketLog (...);
-- ... etc
```

### 2. Environment Variables

Add to your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Route Protection

Wrap your mall routes with the access guard:

```tsx
import MallAccessGuard from './components/MallAccessGuard';

// In your router
<Route 
  path="/mall" 
  element={
    <MallAccessGuard>
      <MallPage />
    </MallAccessGuard>
  } 
/>
```

### 4. Access Checking

Use the hook in any component:

```tsx
import { useRetailAccess } from './hooks/useRetailAccess';

function MyComponent() {
  const { publicKey } = useWallet();
  const access = useRetailAccess(publicKey?.toString());
  
  if (access.loading) return <Loading />;
  if (!access.hasAccess) return <NoAccess />;
  
  return <MallContent />;
}
```

## 🎯 Access Logic

### Access Rules (in order of priority)

1. **WifHoodie Holder** → Full access (bypasses all checks)
2. **Active Day Pass** → 24-hour access
3. **Tier ≥ Retailpunk** → Permanent access
4. **Default** → Redirect to `/retailpass`

### Retail Ticket Mechanics

- **Earn 1 RT** per domain purchase (0.25 SOL+)
- **Spend 1 RT** for day pass, respins, scav perks
- **Max 5 RTs** per wallet (stored in localStorage/Supabase)
- **All transactions logged** with timestamps

## 🛠️ Components

### useRetailAccess Hook

```tsx
const access = useRetailAccess(walletAddress);

// Returns:
{
  hasAccess: boolean;
  tier: string;
  expiresAt: string | null;
  wifhoodie: boolean;
  retailTickets: number;
  loading: boolean;
}
```

### MallAccessGuard

Protects routes and redirects unauthorized users:

```tsx
<MallAccessGuard>
  <ProtectedContent />
</MallAccessGuard>
```

### RetailpassPage

User onboarding page with:
- Access status display
- Day pass claiming
- RT earning methods
- Mall benefits overview

### DayPassCountdown

Real-time countdown for active day passes:

```tsx
<DayPassCountdown expiresAt="2024-01-01T12:00:00Z" />
// Displays: "23h 45m 30s remaining"
```

## 💾 Data Storage

### Supabase (Primary)
- User access data
- Transaction logs
- Tier rules
- Day pass claims

### LocalStorage (Fallback)
- Retail ticket balances
- Day pass expiry
- Transaction history
- User access cache

### Storage Keys
```javascript
const STORAGE_KEYS = {
  RETAIL_TICKETS: 'retailstar_retail_tickets',
  USER_ACCESS: 'retailstar_user_access',
  TICKET_LOG: 'retailstar_ticket_log',
  DAY_PASS: 'retailstar_day_pass'
};
```

## 🎨 Styling

Uses existing RetailStar theme:
- **Cyberpunk aesthetic** with neon colors
- **Glass-morphism effects** on modals
- **Neon glow** on active elements
- **Consistent spacing** and typography

## 🔧 Integration Points

### Slot Machine Integration

```tsx
// In ScavDomainCard.tsx
import { logRetailTicket } from '../lib/supabase';

// After jackpot win
await logRetailTicket({
  wallet: walletAddress,
  action: 'Earn',
  amount: 5,
  target: 'Slot Machine',
  notes: 'JACKPOT!'
});
```

### Domain Purchase Integration

```tsx
// After successful domain purchase
await logRetailTicket({
  wallet: buyerWallet,
  action: 'Earn',
  amount: 1,
  target: 'Domain Purchase',
  notes: `Purchased ${domainName}`
});
```

## 🚨 Error Handling

### Fallback Strategy
1. Try Supabase connection
2. If fails, use localStorage
3. If localStorage fails, show error
4. Graceful degradation for offline use

### Common Issues
- **Wallet not connected** → Redirect to connect
- **Insufficient RTs** → Show earning methods
- **Expired day pass** → Offer renewal
- **Database errors** → Use localStorage

## 🔮 Future Enhancements

### Planned Features
- **NFT verification** for WifHoodie detection
- **Real-time updates** via Supabase subscriptions
- **Admin panel** for tier management
- **Analytics dashboard** for RT economy
- **Mobile app** integration

### Potential Integrations
- **Discord bot** for RT management
- **Twitter integration** for social features
- **Merch store** with RT discounts
- **Event system** for special access

## 📝 Development Notes

### Testing
- Test with and without Supabase
- Verify localStorage fallback
- Check wallet connection states
- Test day pass expiration

### Performance
- Lazy load access data
- Cache user permissions
- Optimize database queries
- Minimize localStorage reads

### Security
- Validate wallet addresses
- Sanitize user inputs
- Rate limit RT transactions
- Audit access logs

---

## 🎯 Ready for Implementation

The RetailStar Phase 2 Access System is now ready for deployment! The system provides:

✅ **Complete access control** with tier-based permissions  
✅ **Retail Ticket economy** with earning/spending mechanics  
✅ **Day pass system** with real-time countdown  
✅ **WifHoodie bypass** for unlimited access  
✅ **LocalStorage fallback** for offline functionality  
✅ **Database integration** with Supabase  
✅ **Route protection** with automatic redirects  
✅ **User onboarding** with clear benefits display  

**Next Steps:**
1. Set up Supabase database using `database-setup.sql`
2. Add environment variables
3. Integrate with existing slot machine and domain purchase flows
4. Test all access scenarios
5. Deploy and monitor RT economy

🚀 **Welcome to the RetailStar Mall Phase 2!** 🎫 