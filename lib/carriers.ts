// ============================================
// Carrier/Platform Configuration
// ============================================
// TODO: Eventually move this to a database table for in-app editing

import { CarrierPlatform } from './types';

export interface CarrierConfig {
  platform: CarrierPlatform;
  displayName: string;
  portalUrl: string;
  hostPattern: string; // Used by extension to detect which carrier portal we're on
  description: string;
  logoColor: string; // For UI badges
}

export const CARRIER_CONFIGS: Record<CarrierPlatform, CarrierConfig> = {
  iPipeline: {
    platform: 'iPipeline',
    displayName: 'iGO / iPipeline',
    portalUrl: 'https://igo.ipipeline.com',
    hostPattern: 'ipipeline.com',
    description: 'Multi-carrier platform (Transamerica, etc.)',
    logoColor: '#0066CC',
  },
  Americo: {
    platform: 'Americo',
    displayName: 'Americo Financial',
    portalUrl: 'https://www.americo.com',
    hostPattern: 'americo.com',
    description: 'Direct Americo portal',
    logoColor: '#1B4D3E',
  },
  Transamerica: {
    platform: 'Transamerica',
    displayName: 'Transamerica',
    portalUrl: 'https://www.transamerica.com/lifepolicyexplorer/get-quote',
    hostPattern: 'transamerica.com',
    description: 'Direct Transamerica portal',
    logoColor: '#0066CC',
  }
};

export const ALL_CARRIERS: CarrierPlatform[] = ['iPipeline', 'Americo'];

export function getCarrierByHost(hostname: string): CarrierConfig | null {
  for (const config of Object.values(CARRIER_CONFIGS)) {
    if (hostname.includes(config.hostPattern)) {
      return config;
    }
  }
  return null;
}

