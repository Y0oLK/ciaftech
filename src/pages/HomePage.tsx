import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Cpu,
  Globe,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Tv,
  Zap,
} from 'lucide-react';
import { SmartTvShowcase } from '../components/SmartTvShowcase';
import { PLATFORM_SHOWCASE, PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogs';
import { formatPrice } from '../data/regions';
import { useStore } from '../context/StoreContext';
import { useSeoMeta } from '../utils/useSeoMeta';

const EXPERIENCES = [
  {
    icon: Zap,
    accent: 'from-sky-500 to-cyan-500',
    title: 'Football Without Lag or Cut',
    desc: 'Adaptive 50fps / 60fps frame locking and anti-freeze buffering keep big weekend football games crisp from kickoff to full time.',
  },
  {
    icon: Lock,
    accent: 'from-indigo-500 to-violet-500',
    title: 'Built-In VPN Included Free',
    desc: 'Every license includes 1-click Smart TV VPN protection right inside the app—blocking ISP slowdowns so your TV works smoothly all the time.',
  },
  {
    icon: Tv,
    accent: 'from-emerald-500 to-teal-500',
    title: 'Compatible With Your Smart TV',
    desc: 'Runs natively on Samsung Tizen, LG webOS, Google TV, Android TV, Firestick, and Apple TV—no extra cables or complicated setup.',
  },
  {
    icon: Cpu,
    accent: 'from-blue-500 to-indigo-600',
    title: 'Famous Channels, Movies & Shows',
    desc: 'Organize your personal live TV channels, blockbuster movies, and favorite series in a fast, modern living-room grid with instant zapping.',
  },
  {
    icon: Layers,
    accent: 'from-amber-500 to-orange-500',
    title: 'Instant XMLTV Program Guide',
    desc: 'Browse tonight’s shows and match schedules smoothly without freezing or slowing down older Samsung or LG Smart TVs.',
  },
  {
    icon: ShieldCheck,
    accent: 'from-cyan-500 to-sky-600',
    title: 'Works All Time — 24/7 Stability',
    desc: 'Lightweight <110 MB memory usage plus automatic socket recovery keeps playback rock-solid day and night across UK, EU, CA & US.',
  },
];

const FAQS = [
  {
    q: 'Is CIAF Player compatible with my Samsung or LG Smart TV?',
    a: 'Yes! CIAF Player works natively on Samsung Smart TVs (Tizen 5.0+, 2019–2026), LG Smart TVs (webOS 4.5+, 2019–2026), Sony/TCL/Hisense Google TV & Android TV, Amazon Fire TV Stick, and Apple TV 4K.',
  },
  {
    q: 'Does the player really include a VPN to keep everything working smoothly?',
    a: 'Yes. Every CIAF Player license includes our built-in Smart TV VPN Shield. Turning it on inside the app encrypts your TV traffic and prevents ISP bandwidth throttling during busy evening hours and weekend football matches.',
  },
  {
    q: 'Does CIAF Tech sell TV channels or media subscriptions?',
    a: 'No. CIAF Tech strictly builds and licenses Smart TV media player software and integrated VPN routing. No TV channels, movies, or copyrighted streams are included or sold—you load your own local media library or authorized playlists.',
  },
  {
    q: 'How fast do I get my license after paying with PayPal or Crypto?',
    a: 'Your digital activation key is generated immediately at checkout and sent to your email. Enter your TV MAC / Device ID on our Activation Portal and start watching in under two minutes.',
  },
];

export const HomePage: React.FC = () => {
  const { region, addToCart } = useStore();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeoMeta({
    title: 'CIAF Tech — Smart TV Media Player + Built-In VPN for Tizen & webOS',
    description:
      'Compatible with your Samsung Tizen, LG webOS & Google TV. Built-in VPN keeps your famous channels, movies, shows, and football games smooth all the time without lag or cut.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  });

  const handleBuyNow = (product: (typeof PRODUCTS)[number]) => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Vibrant Light Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/images/cinema-shows.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-[#f8fafc]/90 to-[#f8fafc]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1.15fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                <span>
                  {region.flag} {region.label} • Built-In VPN Included • Works 24/7
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
                Watch Football, Movies &amp; TV Channels{' '}
                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Smoothly All the Time.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Compatible with your <strong className="text-slate-900">Samsung Tizen</strong>,{' '}
                <strong className="text-slate-900">LG webOS</strong>, or{' '}
                <strong className="text-slate-900">Google TV</strong>. CIAF Player pairs 4K hardware acceleration with a{' '}
                <strong className="text-sky-700">built-in Smart TV VPN</strong> so your favorite shows, famous channels, and live football matches play without lag, throttling, or sudden cuts.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5 hover:from-sky-400 hover:to-indigo-500"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Get Player + VPN License
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50/50"
                >
                  <BookOpen className="h-4 w-4 text-sky-600" />
                  Best Player Settings Guides
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> Compatible with all major Smart TVs
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> Built-in VPN included
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> PayPal &amp; Crypto instant delivery
                </span>
              </div>
            </div>

            <SmartTvShowcase />
          </div>
        </div>
      </section>

      {/* Compatible With Your TV Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-7 shadow-lg shadow-slate-900/5 sm:px-7">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            100% Compatible With Your Living-Room TV — Ready in 2 Minutes
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PLATFORM_SHOWCASE.map((platform) => (
              <Link
                key={platform.name}
                to="/products"
                className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/60 p-2.5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-md"
              >
                <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white">
                  <img
                    src={platform.image}
                    alt={`${platform.name} compatible with CIAF Player`}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2.5 text-xs font-bold text-slate-900">{platform.name}</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  {platform.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Living-Room Watching Experience Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Real Living-Room Experience
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Big Match Nights, Famous Channels &amp; Cinema Marathons
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            From high-speed weekend football to blockbuster movies and live TV channels, CIAF Player keeps your screen vivid, responsive, and running smoothly all the time.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Football Zero-Lag Card */}
          <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300">
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img
                src="/images/sports-zero-lag.jpg"
                alt="Watching a live football match in 4K HDR on a Smart TV without lag or cut"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-emerald-500 px-3.5 py-1 text-[11px] font-bold text-white shadow-md">
                50/60fps Live Football Engine
              </span>
            </div>
            <div className="space-y-3 p-6 sm:p-7">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Watch Football Without Lag or Cut
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Fast stadium camera pans demand locked frame pacing. CIAF Player pairs 50Hz/60Hz hardware sync with our anti-freeze buffer and built-in VPN so your match never stalls at kickoff.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-sky-700">
                <span className="rounded-lg bg-sky-50 px-2.5 py-1 ring-1 ring-sky-200">
                  Zero Motion Blur
                </span>
                <span className="rounded-lg bg-sky-50 px-2.5 py-1 ring-1 ring-sky-200">
                  Auto 50Hz / 60Hz Lock
                </span>
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-200">
                  Works All Time
                </span>
              </div>
            </div>
          </div>

          {/* Shows & Channels Card */}
          <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300">
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img
                src="/images/cinema-shows.jpg"
                alt="Smart TV in a modern living room showing organized movies, TV shows, and live channels"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-indigo-600 px-3.5 py-1 text-[11px] font-bold text-white shadow-md">
                Movies, Shows &amp; TV Channels
              </span>
            </div>
            <div className="space-y-3 p-6 sm:p-7">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                All Your Favorite Channels &amp; Movies in One View
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Browse famous live channels, weekend movies, and series on your Samsung Tizen or LG webOS screen with sub-second zapping, crisp subtitles, and a clean family-friendly guide.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-indigo-700">
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 ring-1 ring-indigo-200">
                  Instant Channel Zap
                </span>
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 ring-1 ring-indigo-200">
                  4K HDR10+ &amp; Dolby
                </span>
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 ring-1 ring-indigo-200">
                  Favorites Cloud Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Player UI & Hardware Architecture Gallery */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              img: '/images/modern-living-tv.jpg',
              tag: 'XMLTV Guide',
              title: 'Instant TV Guide & EPG',
              desc: 'Scroll thousands of live TV channels & match times with zero UI lag.',
            },
            {
              img: '/images/platforms/webos.jpg',
              tag: 'SoC Pipeline',
              title: 'Zero-Cut 4K Hardware Engine',
              desc: 'Direct Tizen AVPlay & webOS Luna decoding prevents freezes.',
            },
            {
              img: '/images/remote-hand.jpg',
              tag: '1-Click Control',
              title: 'Built for Your TV Remote',
              desc: 'Instant channel zap, subtitles, audio tracks & favorite rows.',
            },
            {
              img: '/images/platforms/tizen.jpg',
              tag: 'Multi-Room',
              title: 'Sync Every TV at Home',
              desc: 'Share favorites and watch history across Tizen, webOS & Google TV.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300"
            >
              <div className="aspect-video overflow-hidden border-b border-slate-100 bg-slate-950">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                  {card.tag}
                </span>
                <h4 className="mt-1 font-display text-sm font-bold text-slate-900">
                  {card.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Built-In VPN Spotlight Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-7 shadow-xl shadow-sky-900/5 sm:p-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <Lock className="h-3.5 w-3.5" />
              Included Free With Every Player License
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Built-In Smart TV VPN So Your Player Works Without Problems
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Many Smart TVs in the UK, Europe, Canada, and the US experience evening ISP speed throttling right when big football games or 4K movie nights begin. CIAF Player builds an encrypted VPN tunnel directly into the TV app—no extra PC or router configuration required.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Stops ISP throttling during peak hours',
                '1-click ON/OFF inside Tizen & webOS',
                'AES-256 privacy for all home TVs',
                'UK, EU, Canada & US high-speed nodes',
              ].map((pt) => (
                <div
                  key={pt}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 shadow-xs"
                >
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <div className="pt-1">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                Explore Licenses + Built-In VPN <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <img
              src="/images/vpn-servers.jpg"
              alt="CIAF Player Built-In Smart TV VPN Shield protecting 4K football, movies, and live channels"
              className="aspect-video w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Watching Experience Upgrades */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Engineered For Every Living Room
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Why Smart TV Viewers Love CIAF Player
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Default TV media apps freeze on large playlists and drop frames during fast sports. CIAF Player unlocks your TV’s hardware silicon for reliable 24/7 watching.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Geo-Tailored Regional Editions */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/uk"
            className="group relative overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-white to-sky-50 p-7 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1 hover:border-sky-400"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                🇬🇧 United Kingdom Edition
              </span>
              <ArrowRight className="h-4 w-4 text-sky-600 transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              UK Smart TV &amp; Firestick Setup (£ GBP)
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Pre-tuned 50Hz UK broadcast &amp; weekend football cadence, built-in VPN protection, and instant Samsung Tizen &amp; LG webOS activation.
            </p>
          </Link>

          <Link
            to="/ca"
            className="group relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-white to-indigo-50 p-7 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1 hover:border-indigo-400"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
                🇨🇦 Canada Edition
              </span>
              <ArrowRight className="h-4 w-4 text-indigo-600 transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Canada Google TV, Tizen &amp; webOS (C$ CAD)
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              60Hz North American frame lock, built-in VPN, EN/FR bilingual UI for Ontario &amp; Québec, and instant CAD checkout.
            </p>
          </Link>
        </div>
      </section>

      {/* Pricing / Digital Licenses Preview */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              Transparent Software + VPN Licensing
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Choose Your CIAF Player License
            </h2>
            <p className="text-sm text-slate-600">
              Showing live regional pricing in{' '}
              <strong className="text-slate-900">
                {region.flag} {region.currency} ({region.symbol})
              </strong>
              . Built-in VPN included with instant PayPal or Crypto checkout.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-xs">
            <Globe className="h-4 w-4 text-sky-600" />
            {region.complianceNote}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                product.popular
                  ? 'border-sky-400 bg-gradient-to-b from-sky-50/90 via-white to-white shadow-xl shadow-sky-500/15 ring-1 ring-sky-400/30'
                  : 'border-slate-200 bg-white shadow-md shadow-slate-900/5 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        product.popular
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="mt-1.5 min-h-[40px] text-xs leading-relaxed text-slate-600">
                  {product.tagline}
                </p>

                <div className="my-5 border-y border-slate-100 py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-slate-900">
                      {formatPrice(product.priceUSD, region)}
                    </span>
                    {product.originalPriceUSD && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(product.originalPriceUSD, region)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {product.billingLabel}
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  {product.features.slice(0, 4).map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleBuyNow(product)}
                  className={`w-full rounded-xl py-3 text-xs font-bold transition ${
                    product.popular
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-500'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Activate with PayPal / Crypto
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Blog / Country & Player Settings Guides */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              UK • Canada • Europe • USA Guides
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Channels, Subscriptions &amp; Smart TV Guides
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-500"
          >
            Read all country &amp; TV guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300"
            >
              <div>
                <div className="aspect-video overflow-hidden border-b border-slate-100 bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between text-[11px] font-semibold">
                    <span className="rounded-md bg-sky-50 px-2.5 py-1 text-sky-700">
                      {post.category}
                    </span>
                    <span className="text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-700">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
                <span>{post.regionFocus}</span>
                <span className="font-bold text-sky-600">Read Guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear answers about TV compatibility, included VPN protection, and digital licensing.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-slate-900 hover:bg-slate-50"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-sky-600 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
