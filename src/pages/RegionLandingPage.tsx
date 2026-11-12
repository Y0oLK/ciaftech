import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Cpu, Globe, Lock, ShieldCheck, Sparkles, Tv } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatPrice, REGIONS, type RegionCode } from '../data/regions';
import { useStore } from '../context/StoreContext';
import { useSeoMeta } from '../utils/useSeoMeta';

interface RegionLandingProps {
  targetRegion: 'UK' | 'CA';
}

const REGION_COPY = {
  UK: {
    badge: '🇬🇧 United Kingdom Smart TV + VPN Setup',
    headline: 'UK Smart TV & Firestick 4K Player + Built-In VPN',
    subhead:
      'Compatible with UK Samsung Tizen, LG webOS, and Fire TV Stick 4K televisions. Features 50Hz UK broadcast motion sync and built-in Smart VPN so your live football matches, movies, and TV channels work smoothly all the time.',
    highlights: [
      'Built-in UK-ready Smart TV VPN stops evening ISP throttling',
      'Pre-tuned 50fps / 50Hz cadence for smooth weekend football',
      'Compatible with Samsung, LG, Sony, TCL & Firestick UK models',
      'Instant digital license delivery via PayPal (£ GBP) or Crypto',
    ],
    faq: [
      {
        q: 'Does CIAF Playlist work on Samsung UK, LG UK OLED, and Firestick?',
        a: 'Yes. CIAF Playlist runs natively on Samsung Tizen (2019+), LG webOS (2019+), Android/Google TV, and Amazon Fire TV Stick 4K devices across the UK.',
      },
      {
        q: 'How does the included VPN keep my TV working smoothly all the time?',
        a: 'When enabled inside the player, our AES-256 Smart VPN prevents broadband traffic shaping during peak evening and weekend match hours.',
      },
    ],
  },
  CA: {
    badge: '🇨🇦 Canada Smart TV + VPN Setup (EN / FR)',
    headline: 'Canada 4K Smart TV & Google TV Player + Built-In VPN',
    subhead:
      'Built for Canadian households in Ontario, Québec, BC, and Alberta. Compatible with Samsung Tizen, LG webOS, and Google TV, featuring 60Hz sports frame lock, built-in VPN protection, and bilingual EN/FR interface.',
    highlights: [
      'Built-in Canadian & North American VPN stops ISP slowdowns',
      '60fps hardware acceleration for smooth sports, movies & channels',
      'Bilingual English & Français interface for Ontario & Québec',
      'Instant digital delivery in C$ CAD via PayPal or Crypto',
    ],
    faq: [
      {
        q: 'Does CIAF Playlist support bilingual French/English EPG guides in Québec?',
        a: 'Yes. CIAF Playlist supports full UTF-8 character sets for French accents and lets you switch the entire TV interface between English and Français.',
      },
      {
        q: 'Is the Smart TV VPN included with my Canadian license?',
        a: 'Yes. Every license includes our built-in VPN toggle right inside the TV app so you do not need any external router setup.',
      },
    ],
  },
};

export const RegionLandingPage: React.FC<RegionLandingProps> = ({ targetRegion }) => {
  const { setRegionCode, addToCart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    setRegionCode(targetRegion as RegionCode);
  }, [targetRegion, setRegionCode]);

  const copy = REGION_COPY[targetRegion];
  const activeRegion = REGIONS[targetRegion];

  useSeoMeta({
    title: `${copy.headline} — CIAF Tech`,
    description: copy.subhead,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  });

  const handleSelectPlan = (product: (typeof PRODUCTS)[number]) => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50/60 to-indigo-50/70 p-8 shadow-xl shadow-slate-900/5 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3.5 py-1.5 text-xs font-bold text-sky-800">
            <Sparkles className="h-3.5 w-3.5" />
            {copy.badge}
          </span>

          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl">
            {copy.headline}
          </h1>

          <p className="text-base leading-relaxed text-slate-600">{copy.subhead}</p>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {copy.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-medium text-slate-800 shadow-xs"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
            <img
              src={targetRegion === 'UK' ? '/images/sports-zero-lag.jpg' : '/images/cinema-shows.jpg'}
              alt={
                targetRegion === 'UK'
                  ? 'Smooth 4K football playback on Smart TV without lag or cut'
                  : 'Smart TV living room showing favorite TV shows and channels'
              }
              className="aspect-video w-full object-cover"
            />
          </div>
          <p className="text-center text-xs font-medium text-slate-600">
            Built-in VPN keeps your shows, movies, famous TV channels &amp; football games smooth all the time.
          </p>
        </div>
      </section>

      {/* Regional Pricing Grid */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              {activeRegion.label} Digital Player + VPN Licenses ({activeRegion.currency})
            </h2>
            <p className="mt-1 text-sm text-slate-600">{activeRegion.complianceNote}</p>
          </div>
          <Link
            to="/blog"
            className="text-sm font-bold text-sky-600 hover:text-sky-500"
          >
            Read {activeRegion.code} Setup &amp; Player Settings Guides →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col justify-between rounded-3xl border p-6 transition-all hover:-translate-y-1 ${
                product.popular
                  ? 'border-sky-400 bg-gradient-to-b from-sky-50 to-white shadow-xl shadow-sky-500/10'
                  : 'border-slate-200 bg-white shadow-md shadow-slate-900/5'
              }`}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  {product.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-2 font-display text-3xl font-bold text-slate-900">
                  {formatPrice(product.priceUSD, activeRegion)}
                </p>
                <p className="text-xs text-slate-500">{product.billingLabel}</p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  {product.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan(product)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-sky-400 hover:to-indigo-500"
              >
                Get Instant License + VPN
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Specs + FAQ */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Tv className="mb-3 h-6 w-6 text-sky-600" />
          <h3 className="font-display text-base font-bold text-slate-900">Compatible With Your TV</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Runs natively on Samsung Tizen, LG webOS, Google TV, and Firestick with zero external clutter.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Lock className="mb-3 h-6 w-6 text-indigo-600" />
          <h3 className="font-display text-base font-bold text-slate-900">Built-In Smart VPN</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Encrypted routing right inside CIAF Playlist keeps channels, movies, and football working all the time.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Cpu className="mb-3 h-6 w-6 text-emerald-600" />
          <h3 className="font-display text-base font-bold text-slate-900">Hardware 4K Acceleration</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Uses your TV’s dedicated HEVC &amp; AV1 silicon for zero-lag, cool, silent playback.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-sky-600" />
          <h2 className="font-display text-xl font-bold text-slate-900">
            {activeRegion.label} Frequently Asked Questions
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {copy.faq.map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-bold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <Globe className="h-4 w-4 text-sky-600" />
        <span>Instant digital activation across {activeRegion.label}</span>
      </div>
    </div>
  );
};
