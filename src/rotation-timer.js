#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class RotationTimer {
  constructor() {
    this.configPath = join(__dirname, '..', 'retailrunner.json');
    this.domainsPath = join(__dirname, '..', 'domains.json');
    this.config = this.loadConfig();
    this.domains = this.loadDomains();
    this.logger = this.setupLogger();
  }

  loadConfig() {
    try {
      const configData = readFileSync(this.configPath, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      console.error('❌ Failed to load retailrunner.json:', error.message);
      process.exit(1);
    }
  }

  loadDomains() {
    try {
      const domainsData = readFileSync(this.domainsPath, 'utf8');
      return JSON.parse(domainsData);
    } catch (error) {
      console.error('❌ Failed to load domains.json:', error.message);
      process.exit(1);
    }
  }

  saveDomains() {
    try {
      this.domains.lastUpdated = new Date().toISOString();
      writeFileSync(this.domainsPath, JSON.stringify(this.domains, null, 2));
      this.logger.success('✅ Domains state saved');
    } catch (error) {
      this.logger.error(`Failed to save domains: ${error.message}`);
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

  isDueForRotation(domainName) {
    const domain = this.domains.domains.find(d => d.name === domainName);
    if (!domain || domain.status !== 'active') {
      return false;
    }

    const lastRotated = new Date(domain.lastRotated);
    const now = new Date();
    const timeSinceRotation = now.getTime() - lastRotated.getTime();
    
    const rotationInterval = this.config.rotationTimers[domain.category];
    if (!rotationInterval) {
      this.logger.error(`No rotation timer found for category: ${domain.category}`);
      return false;
    }

    return timeSinceRotation >= rotationInterval;
  }

  getNextRotationTime(domainName) {
    const domain = this.domains.domains.find(d => d.name === domainName);
    if (!domain) return null;

    const lastRotated = new Date(domain.lastRotated);
    const rotationInterval = this.config.rotationTimers[domain.category];
    const nextRotation = new Date(lastRotated.getTime() + rotationInterval);
    
    return nextRotation;
  }

  getRotationCategory(currentCategory, hasWebsite = false) {
    const categories = ['flash', 'mid', 'premium'];
    const currentIndex = categories.indexOf(currentCategory);
    let nextIndex = (currentIndex + 1) % categories.length;
    
    // If domain has a website, skip flash rack
    if (hasWebsite && categories[nextIndex] === 'flash') {
      nextIndex = (nextIndex + 1) % categories.length;
    }
    
    return categories[nextIndex];
  }

  async rotateDomain(domainName) {
    const domain = this.domains.domains.find(d => d.name === domainName);
    if (!domain) {
      this.logger.error(`Domain ${domainName} not found in state`);
      return false;
    }

    // Get domain config to check if it has a website
    const configDomain = this.config.domains.find(d => d.name === domainName);
    const hasWebsite = configDomain ? configDomain.hasWebsite : false;

    const oldCategory = domain.category;
    const newCategory = this.getRotationCategory(oldCategory, hasWebsite);
    
    // Update domain state
    domain.category = newCategory;
    domain.lastRotated = new Date().toISOString();
    
    // Update config to match
    if (configDomain) {
      configDomain.category = newCategory;
      configDomain.lastRotated = domain.lastRotated;
    }

    this.logger.info(`🔄 Rotating ${domainName}.sol from ${oldCategory} to ${newCategory}`);
    
    // Save state
    this.saveDomains();
    
    // Announce rotation
    await this.announceRotation(domainName, oldCategory, newCategory);
    
    this.logger.success(`✅ ${domainName}.sol rotated to ${newCategory}`);
    return true;
  }

  async announceRotation(domainName, oldCategory, newCategory) {
    const categoryNames = {
      flash: 'Flash Rack',
      mid: 'Mid Tier',
      premium: 'Premium Wing'
    };

    const message = `🔄 Retailrunner.sol: ${domainName}.sol moved from ${categoryNames[oldCategory]} to ${categoryNames[newCategory]}`;
    
    this.logger.info(`📢 ROTATION: ${message}`);
    
    // Webhook announcement (if configured)
    if (process.env.WEBHOOK_URL) {
      try {
        const response = await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message })
        });
        if (response.ok) {
          this.logger.success('📢 Webhook announcement sent');
        }
      } catch (error) {
        this.logger.error(`Failed to send webhook: ${error.message}`);
      }
    }
  }

  async checkAndRotate() {
    this.logger.info('🕐 Checking for domains due for rotation...');
    
    let rotatedCount = 0;
    const eligibleDomains = this.domains.domains.filter(d => 
      d.status === 'active' && this.isDueForRotation(d.name)
    );

    if (eligibleDomains.length === 0) {
      this.logger.info('✅ No domains due for rotation');
      return;
    }

    this.logger.info(`🔄 Found ${eligibleDomains.length} domains due for rotation`);

    for (const domain of eligibleDomains) {
      const success = await this.rotateDomain(domain.name);
      if (success) {
        rotatedCount++;
      }
      
      // Rate limiting between rotations
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    this.logger.success(`🎯 Rotation complete: ${rotatedCount} domains rotated`);
  }

  showRotationStatus() {
    console.log('\n📊 Domain Rotation Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const categories = {
      flash: { name: 'Flash Rack', domains: [] },
      mid: { name: 'Mid Tier', domains: [] },
      premium: { name: 'Premium Wing', domains: [] }
    };

    this.domains.domains.forEach(domain => {
      if (domain.status === 'active') {
        const category = categories[domain.category];
        if (category) {
          const isDue = this.isDueForRotation(domain.name);
          const nextRotation = this.getNextRotationTime(domain.name);
          const status = isDue ? '🔄 DUE' : '⏳ WAITING';
          
          category.domains.push({
            name: domain.name,
            status,
            lastRotated: new Date(domain.lastRotated).toLocaleDateString(),
            nextRotation: nextRotation ? nextRotation.toLocaleDateString() : 'N/A'
          });
        }
      }
    });

    Object.entries(categories).forEach(([key, category]) => {
      if (category.domains.length > 0) {
        console.log(`\n🛍️  ${category.name} (${category.domains.length} domains):`);
        category.domains.forEach(domain => {
          console.log(`  • ${domain.name}.sol - ${domain.status} (Last: ${domain.lastRotated}, Next: ${domain.nextRotation})`);
        });
      }
    });

    console.log('\n⏰ Rotation Schedule:');
    console.log('  • Flash Rack: 24 hours');
    console.log('  • Mid Tier: 72 hours');
    console.log('  • Premium Wing: 7 days');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  async run() {
    const command = process.argv[2];
    
    switch (command) {
      case 'check':
        await this.checkAndRotate();
        break;
      case 'status':
        this.showRotationStatus();
        break;
      case 'force':
        const domain = process.argv[3];
        if (!domain) {
          console.log('Usage: node src/rotation-timer.js force <domain>');
          process.exit(1);
        }
        await this.rotateDomain(domain);
        break;
      default:
        console.log(`
🕐 Retailrunner Rotation Timer

Usage:
  node src/rotation-timer.js check          - Check and rotate eligible domains
  node src/rotation-timer.js status         - Show rotation status
  node src/rotation-timer.js force <domain> - Force rotate specific domain

Examples:
  node src/rotation-timer.js check
  node src/rotation-timer.js status
  node src/rotation-timer.js force jpegdealer
        `);
    }
  }
}

// Run the rotation timer
const timer = new RotationTimer();
timer.run().catch(console.error); 