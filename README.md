# 🛍️ Retailrunner.sol - Retailstar Mall Automation

A local automation system for managing metadata on Solana Name Service (SNS) domains tied to the Retailstar Mall Web3 project.

## 🚀 Features

- ✅ **Config-driven metadata management** via `retailrunner.json`
- ✅ **SNS domain updates** using @bonfida/spl-name-service
- ✅ **Secure local execution** with burner wallet keypair
- ✅ **Domain rotation** between Flash Rack and Premium Wing
- ✅ **Announcement system** via webhooks and console logging
- ✅ **Extensible architecture** for custom automation tasks

## 📋 Prerequisites

- Node.js 18+ 
- Solana CLI tools
- SNS domains owned by your wallet
- Local development environment

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Wallet Keypair

```bash
solana-keygen new --outfile retailrunner-keypair.json
```

### 3. Configure Environment

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Solana Network
SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Wallet Configuration
WALLET_KEYPAIR_PATH=./retailrunner-keypair.json

# Optional: Webhook for announcements
WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Logging
LOG_LEVEL=info
ENABLE_ANNOUNCEMENTS=true
```

### 4. Configure Domains

Edit `retailrunner.json` to include your domains:

```json
{
  "domain": "retailrunner",
  "avatar": "https://i.imgur.com/YOURWIFHOODIE.png",
  "description": "Mall automation unit assigned to Retailstar Interchange.",
  "category": "ops",
  "domains": [
    {
      "name": "jpegdealer",
      "avatar": "https://i.imgur.com/jpegdealer.png",
      "description": "The JPEG Dealer's Code - Middleman of JPEG euphoria.",
      "category": "premium",
      "status": "active"
    }
  ]
}
```

## 🎯 Usage

### Sync All Domain Metadata

```bash
npm run sync
# or
node src/index.js sync
```

### Rotate Domain Categories

```bash
# Move specific domain
npm run rotate jpegdealer premium

# Show current status
node src/rotate-domains.js status

# Random rotation
node src/rotate-domains.js random
```

### Development Mode

```bash
npm run dev
```

## 📊 Domain Categories

- **Flash Rack**: High-turnover domains, quick rotations
- **Premium Wing**: Long-term holdings, stable positioning
- **Ops**: System domains (retailrunner.sol)

## 🔧 Configuration

### retailrunner.json Structure

```json
{
  "domain": "retailrunner",
  "avatar": "avatar_url",
  "description": "System description",
  "category": "ops",
  "website": "https://retailstar.sol",
  "x": "@retailrunner",
  "email": "retailrunner@proton.me",
  "loreTasks": ["task1", "task2"],
  "status": "active",
  "handler": "dev-pc-local",
  "lastUpdated": "2025-07-11",
  "domains": [
    {
      "name": "domainname",
      "avatar": "avatar_url",
      "description": "Domain description",
      "category": "premium|flash",
      "status": "active|inactive",
      "lore": "Domain lore text"
    }
  ]
}
```

## 🛡️ Security

- Uses local burner wallet keypair
- Environment variable configuration
- Rate limiting on SNS operations
- Secure key handling practices

## 🔄 Automation Tasks

### Metadata Sync
- Updates avatar, description, category
- Handles website, email, Twitter links
- Batch processing with rate limiting

### Domain Rotation
- Move domains between categories
- Random rotation for variety
- Announcement system integration

### Lore Management
- Sync domain lore to SNS records
- Maintain consistent storytelling
- Track domain evolution

## 📢 Announcements

The system can announce changes via:

- **Console logging** (always enabled)
- **Webhook integration** (Slack, Discord, etc.)
- **Twitter API** (future feature)

## 🏗️ Architecture

```
retailrunner/
├── src/
│   ├── index.js          # Main automation script
│   ├── rotate-domains.js # Domain rotation utility
│   └── announce-changes.js # Announcement system
├── retailrunner.json     # Configuration
├── .env                  # Environment variables
└── retailrunner-keypair.json # Wallet keypair
```

## 🎭 Lore Integration

Retailrunner.sol serves as a lore agent within the Retailstar Mall:

- **Metadata Sync**: Updates domain descriptions and avatars
- **Category Rotation**: Moves domains between Flash Rack and Premium Wing
- **Lore Propagation**: Maintains consistent storytelling across domains
- **Announcement System**: Broadcasts changes to the community

## 🚨 Troubleshooting

### Common Issues

1. **Wallet not found**
   ```bash
   solana-keygen new --outfile retailrunner-keypair.json
   ```

2. **Domain not owned**
   - Ensure wallet owns the SNS domains
   - Check domain names in config

3. **RPC errors**
   - Verify SOLANA_RPC_URL in .env
   - Try different RPC endpoints

4. **Rate limiting**
   - System includes 1-second delays
   - Adjust timing in code if needed

### Debug Mode

```bash
LOG_LEVEL=debug npm run sync
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**🛍️ Retailrunner.sol** - Keeping the Retailstar Mall running smoothly, one domain at a time. 