import React, { useState } from 'react';
import { CheckCircle2, KeyRound, Link2, Lock, Shield, Tv } from 'lucide-react';
import { TV_PLATFORMS, type TvPlatform } from '../data/products';
import { useStore } from '../context/StoreContext';
import { useSeoMeta } from '../utils/useSeoMeta';

export const ActivatePage: React.FC = () => {
  const { orders } = useStore();
  const [licenseKey, setLicenseKey] = useState(
    orders[0]?.licenseKeys[0]?.key || 'CIAF-DEMO-2026-TIZEN',
  );
  const [macAddress, setMacAddress] = useState('A4:5E:60:C8:19:42');
  const [platform, setPlatform] = useState<TvPlatform>('Samsung Tizen OS');
  const [vpnNode, setVpnNode] = useState('Auto (Fastest UK / EU / NA Node)');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [epgUrl, setEpgUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useSeoMeta({
    title: 'Activate Smart TV & Built-In VPN — CIAF Tech Portal',
    description:
      'Pair your CIAF Playlist digital license key and built-in Smart TV VPN with your Samsung Tizen, LG webOS, or Google TV MAC address.',
  });

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedKey = licenseKey.trim().toUpperCase();
    const cleanedMac = macAddress.trim().toUpperCase();

    if (!cleanedKey || !cleanedMac) return;

    setStatusMessage(
      `Device ${cleanedMac} (${platform}) paired with license ${cleanedKey} and VPN profile (${vpnNode}). Restart CIAF Playlist on your TV to sync settings.`,
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-14 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
          <KeyRound className="h-3.5 w-3.5" />
          Smart TV &amp; VPN Pairing Portal
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Activate Your CIAF Playlist License
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          Enter the Device ID / MAC Address shown on your Smart TV screen along with your CIAF license key, choose your built-in VPN routing node, and optionally attach your personal M3U &amp; XMLTV playlist URL.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={handleActivate}
          className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Digital License Key
              </label>
              <input
                type="text"
                required
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="CIAF-XXXX-XXXX-XXXX"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-semibold text-sky-700 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Smart TV Operating System
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as TvPlatform)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
              >
                {TV_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                TV Device ID / MAC Address
              </label>
              <input
                type="text"
                required
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                placeholder="e.g. A4:5E:60:C8:19:42"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1 text-xs font-bold text-slate-700">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                Built-In VPN Region
              </label>
              <select
                value={vpnNode}
                onChange={(e) => setVpnNode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
              >
                <option>Auto (Fastest UK / EU / NA Node)</option>
                <option>United Kingdom (London Ultra-Fast)</option>
                <option>Canada (Toronto / Montreal)</option>
                <option>Europe (Frankfurt / Amsterdam)</option>
                <option>United States (New York / Dallas)</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Link2 className="h-3.5 w-3.5 text-sky-600" />
              Personal Media Playlist &amp; EPG (Optional)
            </p>
            <div className="space-y-3">
              <input
                type="url"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                placeholder="Personal M3U / Local NAS URL (https://...)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
              <input
                type="url"
                value={epgUrl}
                onChange={(e) => setEpgUrl(e.target.value)}
                placeholder="XMLTV EPG Guide URL (optional)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
          >
            Pair Smart TV &amp; Enable Built-In VPN
          </button>

          {statusMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
          )}
        </form>

        {/* Quick Reference & Recent Keys */}
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            <img
              src="/images/remote-hand.jpg"
              alt="CIAF Playlist Live TV Guide & EPG Interface"
              className="aspect-video w-full object-cover"
            />
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
              <Tv className="h-4 w-4 text-sky-600" />
              Where to Find Your TV Device ID
            </h2>
            <ol className="list-decimal space-y-2 pl-4 text-xs leading-relaxed text-slate-600">
              <li>Install <strong>CIAF Playlist</strong> from your Samsung Apps or LG Content Store.</li>
              <li>Open the app on your Smart TV; your unique MAC / Device ID appears on the welcome screen.</li>
              <li>Enter that ID here and press <strong>Pair Smart TV</strong>, then reload the app.</li>
            </ol>
          </div>

          {orders.length > 0 && (
            <div className="space-y-3 rounded-2xl border border-sky-200 bg-sky-50 p-6">
              <h3 className="font-display text-sm font-bold text-slate-900">
                Your Recent Purchased Keys
              </h3>
              <div className="space-y-2">
                {orders.slice(0, 3).flatMap((order) =>
                  order.licenseKeys.map((k) => (
                    <button
                      key={k.key}
                      type="button"
                      onClick={() => {
                        setLicenseKey(k.key);
                        setPlatform(k.platform);
                        if (k.macAddress && !k.macAddress.startsWith('Pending')) {
                          setMacAddress(k.macAddress);
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-xl border border-sky-200 bg-white px-3 py-2 text-left text-xs hover:border-sky-400"
                    >
                      <span className="font-mono font-bold text-sky-700">{k.key}</span>
                      <span className="text-[11px] text-slate-500">{k.platform}</span>
                    </button>
                  )),
                )}
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 shadow-xs">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
            <span>
              Your personal playlist URLs remain private and encrypted in transit. CIAF Tech never inspects, sells, or shares user playlists.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
