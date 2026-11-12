import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useSeoMeta } from '../utils/useSeoMeta';

export const LegalPage: React.FC = () => {
  useSeoMeta({
    title: 'Compliance, EULA & Refund Policy — CIAF Tech',
    description:
      'Software-only compliance statement, End User License Agreement (EULA), built-in VPN privacy notice, and digital license refund policy for CIAF Tech.',
  });

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
          <ShieldCheck className="h-3.5 w-3.5" />
          Compliance &amp; Software Transparency
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Terms of Service, EULA &amp; Digital Policy
        </h1>
      </div>

      <section className="space-y-3 rounded-2xl border border-sky-200 bg-sky-50 p-6">
        <h2 className="font-display text-xl font-bold text-slate-900">
          1. Software-Only &amp; Non-Content Guarantee
        </h2>
        <p className="text-sm leading-relaxed text-slate-700">
          CIAF Tech develops and licenses Smart TV media player applications with integrated VPN protection for Samsung Tizen OS, LG webOS, Android TV / Google TV, Amazon Fire OS, and Apple tvOS. CIAF Tech does <strong>not</strong> sell, host, resell, or bundle television channels, VOD libraries, or copyrighted streaming subscriptions. Customers use CIAF Playlist exclusively to play personal local media, NAS/DLNA libraries, or playlists they are legally authorized to access.
        </p>
      </section>

      <section id="refund" className="space-y-3">
        <h2 className="font-display text-xl font-bold text-slate-900">
          2. Digital License Refund Policy
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Every Smart TV installation of CIAF Playlist includes a built-in 7-day evaluation mode so you can verify Tizen or webOS hardware decoding and VPN compatibility on your television before purchasing a digital key. Once a digital activation key has been paired to a TV Device ID, refunds are evaluated within 14 days for verified technical compatibility defects.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-bold text-slate-900">
          3. Built-In VPN Privacy &amp; Regional Compliance (UK, EU GDPR, Canada PIPEDA, US)
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          CIAF Tech collects only your billing email address and the Smart TV Device ID / MAC identifier necessary to validate your software license. Our integrated Smart TV VPN operates with a strict zero-logs policy—personal playlist URLs and streaming traffic are encrypted in transit and never inspected, logged, or shared.
        </p>
      </section>
    </div>
  );
};
