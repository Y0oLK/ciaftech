export type RegionCode = 'US' | 'UK' | 'EU' | 'CA';

export interface RegionInfo {
  code: RegionCode;
  label: string;
  flag: string;
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD';
  symbol: string;
  rateFromUSD: number;
  cdnEdge: string;
  complianceNote: string;
}

export const REGIONS: Record<RegionCode, RegionInfo> = {
  US: {
    code: 'US',
    label: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    rateFromUSD: 1,
    cdnEdge: 'Ashburn & Dallas Edge Nodes',
    complianceNote: 'Instant digital license delivery • 60Hz ATSC / HDR10+ tuned',
  },
  UK: {
    code: 'UK',
    label: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    rateFromUSD: 0.79,
    cdnEdge: 'London & Manchester Edge Nodes',
    complianceNote: 'UK VAT-ready digital receipt • 50Hz/60Hz motion-cadence presets',
  },
  EU: {
    code: 'EU',
    label: 'Europe',
    flag: '🇪🇺',
    currency: 'EUR',
    symbol: '€',
    rateFromUSD: 0.92,
    cdnEdge: 'Frankfurt, Amsterdam & Paris Nodes',
    complianceNote: 'GDPR-compliant activation • Multi-language EPG & DVB subtitle support',
  },
  CA: {
    code: 'CA',
    label: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: 'C$',
    rateFromUSD: 1.38,
    cdnEdge: 'Toronto & Vancouver Edge Nodes',
    complianceNote: 'Bilingual EN/FR UI support • Instant CAD digital checkout',
  },
};

export function formatPrice(usdAmount: number, region: RegionInfo): string {
  const converted = usdAmount * region.rateFromUSD;
  return `${region.symbol}${converted.toFixed(2)}`;
}

