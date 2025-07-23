#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DomainRotator {
  constructor() {
    this.configPath = join(__dirname, '..', 'retailrunner.json');
    this.config = this.loadConfig();
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

  saveConfig() {
    try {
      writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
      console.log('✅ Config saved');
    } catch (error) {
      console.error('❌ Failed to save config:', error.message);
    }
  }

  rotateDomain(domainName, newCategory) {
    const domain = this.config.domains.find(d => d.name === domainName);
    if (!domain) {
      console.error(`❌ Domain ${domainName} not found in config`);
      return false;
    }

    const oldCategory = domain.category;
    domain.category = newCategory;
    
    console.log(`🔄 Rotating ${domainName}.sol from ${oldCategory} to ${newCategory}`);
    
    // Update config
    this.saveConfig();
    
    console.log(`✅ ${domainName}.sol moved to ${newCategory} wing`);
    return true;
  }

  rotateRandom() {
    const flashDomains = this.config.domains.filter(d => d.category === 'flash' && d.status === 'active');
    const premiumDomains = this.config.domains.filter(d => d.category === 'premium' && d.status === 'active');
    
    if (flashDomains.length === 0 || premiumDomains.length === 0) {
      console.log('⚠️  Need domains in both categories for rotation');
      return;
    }

    // Randomly select one domain from each category
    const flashDomain = flashDomains[Math.floor(Math.random() * flashDomains.length)];
    const premiumDomain = premiumDomains[Math.floor(Math.random() * premiumDomains.length)];

    // Swap categories
    this.rotateDomain(flashDomain.name, 'premium');
    this.rotateDomain(premiumDomain.name, 'flash');
    
    console.log(`🎲 Random rotation complete: ${flashDomain.name} ↔ ${premiumDomain.name}`);
  }

  showStatus() {
    console.log('\n📊 Current Domain Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const flashDomains = this.config.domains.filter(d => d.category === 'flash');
    const premiumDomains = this.config.domains.filter(d => d.category === 'premium');
    
    console.log(`\n🛍️  Flash Rack (${flashDomains.length} domains):`);
    flashDomains.forEach(domain => {
      console.log(`  • ${domain.name}.sol - ${domain.description.substring(0, 50)}...`);
    });
    
    console.log(`\n💎 Premium Wing (${premiumDomains.length} domains):`);
    premiumDomains.forEach(domain => {
      console.log(`  • ${domain.name}.sol - ${domain.description.substring(0, 50)}...`);
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
}

async function main() {
  const rotator = new DomainRotator();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'status':
      rotator.showStatus();
      break;
   case 'rotate': {
  const domain = process.argv[3];
  const category = process.argv[4];

  if (!domain || !category) {
    console.log('Usage: node src/rotate-domains.js rotate <domain> <category>');
    process.exit(1);
  }

  rotator.rotateDomain(domain, category);
  break;
}

    case 'random':
      rotator.rotateRandom();
      break;
    default:
      console.log(`
🛍️  Retailrunner Domain Rotator

Usage:
  node src/rotate-domains.js status          - Show current domain status
  node src/rotate-domains.js rotate <domain> <category>  - Rotate specific domain
  node src/rotate-domains.js random          - Random rotation between categories

Examples:
  node src/rotate-domains.js status
  node src/rotate-domains.js rotate jpegdealer premium
  node src/rotate-domains.js random
      `);
  }
}

main().catch(console.error); 