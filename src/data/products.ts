export type TvPlatform =
  | 'Samsung Tizen OS'
  | 'LG webOS'
  | 'Android TV / Google TV'
  | 'Apple tvOS'
  | 'Amazon Fire OS';

export interface DigitalProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'Device License' | 'Multi-TV Bundle' | 'Pro Suite';
  priceUSD: number;
  originalPriceUSD?: number;
  billingLabel: string;
  deviceLimit: number;
  badge?: string;
  popular?: boolean;
  supportedPlatforms: TvPlatform[];
  features: string[];
  deliveryNote: string;
}

export const TV_PLATFORMS: TvPlatform[] = [
  'Samsung Tizen OS',
  'LG webOS',
  'Android TV / Google TV',
  'Apple tvOS',
  'Amazon Fire OS',
];

export const PLATFORM_SHOWCASE: { name: TvPlatform; image: string; subtitle: string }[] = [
  {
    name: 'Samsung Tizen OS',
    image: '/images/platforms/tizen.jpg',
    subtitle: '2019–2026 QLED & OLED',
  },
  {
    name: 'LG webOS',
    image: '/images/platforms/webos.jpg',
    subtitle: 'webOS 4.5–24+ & Magic Remote',
  },
  {
    name: 'Android TV / Google TV',
    image: '/images/platforms/googletv.jpg',
    subtitle: 'Sony, TCL, Hisense & Google TV',
  },
  {
    name: 'Apple tvOS',
    image: '/images/platforms/appletv.jpg',
    subtitle: 'Apple TV 4K & Metal HDR',
  },
  {
    name: 'Amazon Fire OS',
    image: '/images/platforms/fireos.jpg',
    subtitle: 'Fire TV & Firestick 4K Max',
  },
];

export const PRODUCTS: DigitalProduct[] = [
  {
    id: 'ciaf-playlist-1yr',
    name: 'CIAF Playlist — 1-Year License',
    tagline: 'Essential 4K Smart TV media playlist activation for one television.',
    category: 'Device License',
    priceUSD: 14.99,
    originalPriceUSD: 19.99,
    billingLabel: '1 year • 1 Smart TV',
    deviceLimit: 1,
    supportedPlatforms: TV_PLATFORMS,
    features: [
      'Built-in CIAF VPN Shield included (prevents ISP throttling)',
      'Hardware-accelerated 4K UHD & HDR10+ playback engine',
      'Ultra-fast XMLTV EPG grid & custom playlist organizer',
      'Low-latency frame-rate matching (24p / 50Hz / 60Hz) for football & shows',
      'Instant digital activation key via email & portal',
    ],
    deliveryNote: 'Digital key delivered immediately after checkout. No physical shipping.',
  },
  {
    id: 'ciaf-playlist-2yr',
    name: 'CIAF Playlist — 2-Year License',
    tagline: 'Extended 2-year activation with all OS updates and built-in VPN.',
    category: 'Device License',
    priceUSD: 24.99,
    originalPriceUSD: 39.98,
    billingLabel: '2 years • 1 Smart TV',
    deviceLimit: 1,
    badge: 'Most Popular',
    popular: true,
    supportedPlatforms: TV_PLATFORMS,
    features: [
      '2-Year license + Built-In VPN Shield for your Smart TV',
      'All Tizen, webOS & Google TV engine updates included',
      'Always-on failover buffer for smooth football, movies & live channels',
      'Dolby Digital Plus & DTS passthrough audio tuning',
      'Cloud-backed playlist & favorites backup (encrypted)',
      'Priority UK / EU / US / CA technical support',
    ],
    deliveryNote: 'Includes 1 free device transfer per year if you upgrade your TV.',
  },
  {
    id: 'ciaf-playlist-family-2yr',
    name: 'CIAF Playlist — 2-Year Multi-TV Pack',
    tagline: 'Equip living room, bedroom & studio TVs with one 2-year household bundle.',
    category: 'Multi-TV Bundle',
    priceUSD: 54.99,
    originalPriceUSD: 89.97,
    billingLabel: '2 years • up to 3 TVs',
    deviceLimit: 3,
    badge: 'Best Value',
    supportedPlatforms: TV_PLATFORMS,
    features: [
      '3 independent 2-Year Smart TV device activations',
      'Mix & match Samsung Tizen, LG webOS, or Google TV',
      'Synced favorites & watch-history profiles across rooms',
      'Zero-buffer adaptive memory cache manager for older TVs',
      'Instant 3-key bundle generated at checkout',
    ],
    deliveryNote: 'Activate all 3 TVs right away or keep unused keys in your account.',
  },
];

