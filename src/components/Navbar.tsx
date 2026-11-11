import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Globe, Menu, ShoppingBag, Tv, X } from 'lucide-react';
import { REGIONS, type RegionCode } from '../data/regions';
import { useStore } from '../context/StoreContext';

const NAV_LINKS = [
  { to: '/', label: 'Overview' },
  { to: '/products', label: 'Licenses' },
  { to: '/uk', label: '🇬🇧 UK' },
  { to: '/ca', label: '🇨🇦 Canada' },
  { to: '/activate', label: 'Activate TV' },
  { to: '/blog', label: 'Guides & Blog' },
];

export const Navbar: React.FC = () => {
  const { region, setRegionCode, cartCount } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 shadow-md shadow-sky-500/25 transition-transform group-hover:scale-105">
            <Tv className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              CIAF <span className="text-sky-600">Tech</span>
            </span>
            <p className="hidden text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:block">
              Smart TV Player + VPN
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Region / Currency Selector */}
          <div className="relative flex items-center">
            <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-sky-600" />
            <select
              aria-label="Select region and currency"
              value={region.code}
              onChange={(e) => setRegionCode(e.target.value as RegionCode)}
              className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pr-7 pl-8 text-xs font-semibold text-slate-700 transition hover:border-sky-400 focus:border-sky-500 focus:outline-none"
            >
              {Object.values(REGIONS).map((r) => (
                <option key={r.code} value={r.code}>
                  {r.flag} {r.code} ({r.currency})
                </option>
              ))}
            </select>
          </div>

          {/* Checkout / Cart Button */}
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Checkout</span>
            {cartCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-bold text-indigo-700">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/legal"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              Compliance &amp; Legal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
