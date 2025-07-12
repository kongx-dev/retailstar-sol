#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { NameRegistryState, getDomainKey, getDomainKeySync } from '@bonfida/spl-name-service';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class RetailRunner {
  constructor() {
    this.config = this.loadConfig();
    this.connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');
    this.wallet = this.loadWallet();
    this.logger = this.setupLogger();
  }

  loadConfig() {
    try {
      const configPath = join(__dirname, '..', 'retailrunner.json');
      const configData = readFileSync(configPath, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      console.error('❌ Failed to load retailrunner.json:', error.message);
      process.exit(1);
    }
  }

  loadWallet() {
    try {
      const keypairPath = process.env.WALLET_KEYPAIR_PATH || './retailrunner-keypair.json';
      const keypairData = readFileSync(keypairPath, 'utf8');
      const keypairArray = JSON.parse(keypairData);
      return Keypair.fromSecretKey(new Uint8Array(keypairArray));
    } catch (error) {
      console.error('❌ Failed to load wallet keypair:', error.message);
      console.log('💡 Generate a new keypair: solana-keygen new --outfile retailrunner-keypair.json');
      process.exit(1);
    }
  }

  setupLogger() {
    const logLevel = process.env.LOG_LEVEL || 'info';
    return {
      info: (message) => console.log(`ℹ️  ${message}`),
      success: (message) => console.log(`✅ ${message}`),
      warning: (message) => console.log(`⚠️  ${message}`),
      error: (message) => console.log(`❌ ${message}`),
      debug: (message) => {
        if (logLevel === 'debug') console.log(`🔍 ${message}`);
      }
    };
  }

  async updateDomainMetadata(domainName, metadata) {
    try {
      this.logger.info(`🔄 Updating metadata for ${domainName}.sol...`);
      
      // Get domain key
      const domainKey = getDomainKeySync(domainName);
      
      // Get current domain state
      const domainState = await NameRegistryState.retrieve(this.connection, domainKey);
      
      if (!domainState) {
        this.logger.error(`Domain ${domainName}.sol not found or not owned`);
        return false;
      }

      // Check if wallet owns the domain
      if (!domainState.owner.equals(this.wallet.publicKey)) {
        this.logger.error(`Wallet does not own ${domainName}.sol`);
        return false;
      }

      // Update metadata
      const updateInstruction = await NameRegistryState.update(
        this.connection,
        domainKey,
        this.wallet.publicKey,
        {
          ...domainState,
          data: {
            ...domainState.data,
            avatar: metadata.avatar,
            description: metadata.description,
            category: metadata.category,
            website: metadata.website || '',
            email: metadata.email || '',
            twitter: metadata.x || ''
          }
        }
      );

      // Send transaction
      const signature = await this.connection.sendTransaction(updateInstruction, [this.wallet]);
      
      // Wait for confirmation
      await this.connection.confirmTransaction(signature, 'confirmed');
      
      this.logger.success(`✅ Updated ${domainName}.sol metadata`);
      this.logger.debug(`Transaction: ${signature}`);
      
      return true;
    } catch (error) {
      this.logger.error(`Failed to update ${domainName}.sol: ${error.message}`);
      return false;
    }
  }

  async announceChange(domainName, action, details) {
    if (process.env.ENABLE_ANNOUNCEMENTS !== 'true') {
      return;
    }

    const message = `🔄 Retailrunner.sol: ${action} for ${domainName}.sol\n${details}`;
    
    // Console announcement
    this.logger.info(`📢 ANNOUNCEMENT: ${message}`);
    
    // Webhook announcement (if configured)
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message })
        });
        this.logger.success('📢 Webhook announcement sent');
      } catch (error) {
        this.logger.error(`Failed to send webhook: ${error.message}`);
      }
    }
  }

  async rotateDomain(domainName, newCategory) {
    const domain = this.config.domains.find(d => d.name === domainName);
    if (!domain) {
      this.logger.error(`Domain ${domainName} not found in config`);
      return false;
    }

    const oldCategory = domain.category;
    domain.category = newCategory;
    
    // Update metadata
    const success = await this.updateDomainMetadata(domainName, domain);
    
    if (success) {
      await this.announceChange(domainName, 'ROTATION', 
        `${domainName}.sol moved from ${oldCategory} to ${newCategory} wing`);
    }
    
    return success;
  }

  async run() {
    this.logger.info('🚀 Retailrunner.sol starting metadata sync...');
    this.logger.info(`📊 Loaded ${this.config.domains.length} domains from config`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const domain of this.config.domains) {
      if (domain.status === 'active') {
        const success = await this.updateDomainMetadata(domain.name, domain);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    this.logger.success(`🎯 Sync complete: ${successCount} successful, ${failCount} failed`);
    
    // Update config timestamp
    this.config.lastUpdated = new Date().toISOString().split('T')[0];
    this.logger.info(`📅 Config updated: ${this.config.lastUpdated}`);
  }
}

// CLI interface
async function main() {
  const runner = new RetailRunner();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'sync':
      await runner.run();
      break;
    case 'rotate':
      const domain = process.argv[3];
      const category = process.argv[4];
      if (!domain || !category) {
        console.log('Usage: node src/index.js rotate <domain> <category>');
        process.exit(1);
      }
      await runner.rotateDomain(domain, category);
      break;
    default:
      console.log(`
🛍️  Retailrunner.sol - Retailstar Mall Automation

Usage:
  node src/index.js sync          - Sync all domain metadata
  node src/index.js rotate <domain> <category>  - Rotate domain category

Examples:
  node src/index.js sync
  node src/index.js rotate jpegdealer premium
      `);
  }
}

main().catch(console.error); 