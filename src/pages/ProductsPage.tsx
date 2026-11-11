import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCircle2, Lock, MonitorCheck, ShoppingCart, Tv } from 'lucide-react';
import { PRODUCTS, TV_PLATFORMS, type TvPlatform } from '../data/products';
import { formatPrice } from '../data/regions';
import { useStore } from '../context/StoreContext';
import { useSeoMeta } from '../utils/useSeoMeta';

const BRAND_COMPATIBILITY = [
  {
    brand: 'Samsung Smart TV',
    os: 'Samsung Tizen OS' as TvPlatform,
    minYear: 2019,
    notes:
      'Compatible with Tizen 5.0–8.0+. Includes native AVPlay 4K HDR10+, built-in VPN Shield, and 50/60Hz sports frame sync.',
    installStep: 'Install "CIAF Player" directly from Samsung Apps Store using your TV remote.',
  },
  {
    brand: 'LG OLED / QNED / NanoCell',
    os: 'LG webOS' as TvPlatform,
    minYear: 2019,
    notes:
      'Compatible with webOS 4.5–24+. Supports Magic Remote pointer, Dolby Vision, eARC audio, and 1-click built-in VPN.',
    installStep: 'Download "CIAF Player" from LG Content Store → Entertainment.',
  },
  {
    brand: 'Sony Bravia / TCL / Hisense',
    os: 'Android TV / Google TV' as TvPlatform,
    minYear: 2018,
    notes:
      'Full Android TV 9+ and Google TV compatibility with AV1 hardware decoding and integrated Smart VPN protection.',
    installStep: 'Search "CIAF Player" on Google Play Store directly on your TV.',
  },
  {
    brand: 'Amazon Fire TV Stick 4K / Max',
    os: 'Amazon Fire OS' as TvPlatform,
    minYear: 2019,
    notes:
      'Lightweight Fire OS 7/8 build tuned for 50Hz/60Hz football motion, built-in VPN, and low RAM overhead.',
    installStep: 'Install via Amazon Appstore or CIAF Companion Downloader code.',
  },
  {
    brand: 'Apple TV 4K',
    os: 'Apple tvOS' as TvPlatform,
    minYear: 2018,
    notes:
      'Metal-accelerated tvOS 16+ player with automatic dynamic range matching, smooth EPG, and built-in VPN tunnel.',
    installStep: 'Download "CIAF Player" from the tvOS App Store.',
  },
];

export const ProductsPage: React.FC = () => {
  const { region, addToCart } = useStore();
  const navigate = useNavigate();

  const [selectedBrandIdx, setSelectedBrandIdx] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [chosenPlatform, setChosenPlatform] = useState<TvPlatform>('Samsung Tizen OS');
  const [addedId, setAddedId] = useState<string | null>(null);

  useSeoMeta({
    title: 'CIAF Player + VPN Licenses & TV Compatibility — CIAF Tech',
    description:
      'Compare 1-Year, Lifetime, and Multi-TV digital player licenses with built-in VPN for Samsung Tizen, LG webOS, Google TV, Firestick, and Apple TV.',
  });

  const compat = BRAND_COMPATIBILITY[selectedBrandIdx];
  const isCompatible = selectedYear >= compat.minYear;

  const handleAdd = (product: (typeof PRODUCTS)[number], goCheckout: boolean) => {
    addToCart(product, chosenPlatform);
    if (goCheckout) {
      navigate('/checkout');
    } else {
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <Lock className="h-3.5 w-3.5" />
            Built-In Smart TV VPN Included
          </span>
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Smart TV Player Licenses + VPN
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Compatible with your Samsung Tizen, LG webOS, Google TV, Firestick, or Apple TV. Enjoy your favorite shows, famous live TV channels, movies, and football games smoothly all the time without lag or cut.
          </p>
        </div>

        {/* Default Platform Selector */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Primary Smart TV Platform
          </label>
          <select
            value={chosenPlatform}
            onChange={(e) => setChosenPlatform(e.target.value as TvPlatform)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:outline-none"
          >
            {TV_PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Showcase Banner */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
          <img
            src="/images/vpn-servers.jpg"
            alt="Built-In Smart TV VPN Shield protecting 4K football, movies, and live channels"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
          <img
            src="/images/modern-living-tv.jpg"
            alt="Multi-TV Cloud Sync across Samsung Tizen, LG webOS, and Google TV"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className={`flex flex-col justify-between rounded-3xl border p-7 transition-all ${
              product.popular
                ? 'border-sky-400 bg-gradient-to-br from-sky-50 via-white to-indigo-50/40 shadow-xl shadow-sky-500/10'
                : 'border-slate-200 bg-white shadow-md shadow-slate-900/5'
            }`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {product.category} • {product.deviceLimit}{' '}
                  {product.deviceLimit === 1 ? 'TV' : 'TVs'}
                </span>
                {product.badge && (
                  <span className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-3 py-0.5 text-xs font-bold text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              <h2 className="font-display text-2xl font-bold text-slate-900">{product.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{product.tagline}</p>

              <div className="my-6 flex items-baseline gap-3 border-y border-slate-100 py-4">
                <span className="font-display text-4xl font-bold text-slate-900">
                  {formatPrice(product.priceUSD, region)}
                </span>
                {product.originalPriceUSD && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPriceUSD, region)}
                  </span>
                )}
                <span className="text-xs font-medium text-slate-500">
                  ({region.currency} • {product.billingLabel})
                </span>
              </div>

              <ul className="space-y-2.5 text-sm text-slate-700">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 space-y-3">
              <p className="text-xs text-slate-500">{product.deliveryNote}</p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleAdd(product, true)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
                >
                  Buy Now ({formatPrice(product.priceUSD, region)})
                </button>
                <button
                  type="button"
                  onClick={() => handleAdd(product, false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
                >
                  <ShoppingCart className="h-4 w-4 text-sky-600" />
                  {addedId === product.id ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Smart TV Compatibility Checker */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
            <MonitorCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Check If It Is Compatible With Your Smart TV
            </h2>
            <p className="text-xs text-slate-500">
              Verify Samsung Tizen, LG webOS, or streaming device hardware decoder &amp; VPN support.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Select TV Brand or Device
              </label>
              <div className="grid gap-2">
                {BRAND_COMPATIBILITY.map((item, idx) => (
                  <button
                    key={item.brand}
                    type="button"
                    onClick={() => {
                      setSelectedBrandIdx(idx);
                      setChosenPlatform(item.os);
                    }}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                      selectedBrandIdx === idx
                        ? 'border-sky-500 bg-sky-50 font-semibold text-sky-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Tv className="h-4 w-4 text-sky-600" />
                      {item.brand}
                    </span>
                    <span className="text-xs text-slate-500">{item.os.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>2. Manufacturing Year</span>
                <span className="font-mono text-sm text-sky-700">{selectedYear}</span>
              </label>
              <input
                type="range"
                min={2016}
                max={2026}
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                <span>2016</span>
                <span>2021</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className={`h-6 w-6 ${
                    isCompatible ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                />
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {isCompatible
                    ? `100% Compatible With Your ${selectedYear} ${compat.brand}`
                    : `Legacy Mode Notice (${selectedYear} Model)`}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                {isCompatible
                  ? compat.notes
                  : `Models earlier than ${compat.minYear} may lack HEVC 10-bit or AV1 silicon. Pairing an affordable Fire TV Stick 4K or Apple TV 4K gives instant 4K + VPN smoothness.`}
              </p>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Installation Step
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {compat.installStep}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
              <span>Selected OS: {compat.os}</span>
              <span className="font-bold text-emerald-700">
                7-Day Free Trial Built Into App
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
