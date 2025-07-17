// @ts-ignore: PNG imports for Vite
import copevendorPng from '../assets/copevendor.png';
// @ts-ignore: PNG imports for Vite
import jpegdealerPng from '../assets/jpegdealer.png';
// @ts-ignore: PNG imports for Vite
import lowballKingPng from '../assets/lowballking.png';
// @ts-ignore: PNG imports for Vite
import missedPricedAfPng from '../assets/missedpricedaf.png';
// @ts-ignore: PNG imports for Vite
import copThisBroPng from '../assets/copthisbro.png';
// @ts-ignore: PNG imports for Vite
import urNotThatGuyPng from '../assets/urnotthatguy.png';
// @ts-ignore: PNG imports for Vite
import thisAintItPng from '../assets/thisaintit.png';

export const scavDomains = [
  {
    name: 'missedpricedaf.sol',
    pngUrl: missedPricedAfPng,
    tags: ['missed', 'price', 'daf'],
    buyLink: 'https://tensor.trade/item/MISSEDPRICEDAF',
    social: 'https://x.com/missedpricedaf',
    fixerQueue: false,
    fixerActive: false,
    queueExpires: null,
    status: 'active',
  },
  {
    name: 'lowballking.sol',
    pngUrl: lowballKingPng,
    tags: ['lowball', 'king', 'negotiation'],
    buyLink: 'https://tensor.trade/item/LOWBALLKING',
    social: 'https://x.com/lowballking',
    fixerQueue: true,
    fixerActive: false,
    queueExpires: '2025-07-20T23:00:00Z',
    status: 'queued',
  },
  {
    name: 'copthisbro.sol',
    pngUrl: copThisBroPng,
    tags: ['cop', 'this', 'bro'],
    buyLink: 'https://tensor.trade/item/COPTHISBRO',
    social: 'https://x.com/copthisbro',
    fixerQueue: false,
    fixerActive: false,
    queueExpires: null,
    status: 'active',
  },
  {
    name: 'urnotthatguy.sol',
    pngUrl: urNotThatGuyPng,
    tags: ['ur', 'not', 'that', 'guy'],
    buyLink: 'https://tensor.trade/item/URNOTTHATGUY',
    social: 'https://x.com/urnotthatguy',
    fixerQueue: false,
    fixerActive: false,
    queueExpires: null,
    status: 'active',
  },
  {
    name: 'thisaintit.sol',
    pngUrl: thisAintItPng,
    tags: ['this', 'aint', 'it'],
    buyLink: 'https://tensor.trade/item/THISAINTIT',
    social: 'https://x.com/thisaintit',
    fixerQueue: false,
    fixerActive: false,
    queueExpires: null,
    status: 'active',
  },
]; 