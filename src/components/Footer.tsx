import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Tv } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Software-Only Transparency Notice */}
        <div className="mb-10 flex flex-col gap-3 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
            <p className="text-xs leading-relaxed text-slate-700">
              <strong className="text-slate-900">Software &amp; VPN Transparency:</strong> CIAF Tech develops and licenses Smart TV media player applications with integrated VPN routing (Samsung Tizen, LG webOS, Android TV, Apple tvOS). We do <strong>not</strong> sell, host, or provide television channels or copyrighted media streams. Users connect their own local or authorized playlists.
            </p>
          </div>
          <Link
            to="/legal"
            className="shrink-0 text-xs font-semibold text-sky-700 hover:text-sky-600"
          >
            Read Compliance Policy →
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600">
                <Tv className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-base font-bold text-slate-900">
                CIAF <span className="text-sky-600">Tech</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Vibrant, hardware-accelerated Smart TV media player software + built-in VPN protection across the UK, Europe, Canada, and the US.
            </p>
            <p className="text-xs font-medium text-slate-500">support@ciaftech.com</p>
          </div>

          {/* Product & Regions */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform &amp; Regions
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-sky-600">
                  Digital Device Licenses + VPN
                </Link>
              </li>
              <li>
                <Link to="/activate" className="hover:text-sky-600">
                  Smart TV Activation Portal
                </Link>
              </li>
              <li>
                <Link to="/uk" className="hover:text-sky-600">
                  United Kingdom Setup (£ GBP)
                </Link>
              </li>
              <li>
                <Link to="/ca" className="hover:text-sky-600">
                  Canada Setup (C$ CAD)
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Blog */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              How-To &amp; Settings Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/blog/optimize-samsung-tizen-hdr-and-motion-for-4k-playback"
                  className="hover:text-sky-600"
                >
                  Samsung Tizen 4K HDR Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/lg-webos-memory-management-prevent-4k-buffering"
                  className="hover:text-sky-600"
                >
                  LG webOS Anti-Buffering Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/ethernet-vs-wifi-6e-home-network-tuning-for-smart-tvs"
                  className="hover:text-sky-600"
                >
                  Smart TV Wi-Fi 6E vs 100Mbps LAN
                </Link>
              </li>
              <li>
                <Link to="/blog" className="font-semibold text-sky-600 hover:text-sky-500">
                  View All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Legal */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              Accepted Payments
            </h3>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {['PayPal', 'USDT TRC20', 'USDC', 'BTC', 'ETH'].map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700"
                >
                  {method}
                </span>
              ))}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/legal" className="hover:text-sky-600">
                  Terms of Service &amp; EULA
                </Link>
              </li>
              <li>
                <Link to="/legal#refund" className="hover:text-sky-600">
                  Digital License Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CIAF Tech Software. All rights reserved.</p>
          <p>Serving Smart TV households across UK • Europe • Canada • United States</p>
        </div>
      </div>
    </footer>
  );
};
