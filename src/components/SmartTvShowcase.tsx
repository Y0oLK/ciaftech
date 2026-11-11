import React, { useState } from 'react';
import {
  Activity,
  Cpu,
  Film,
  Lock,
  Monitor,
  Sliders,
  Subtitles,
  Volume2,
  Wifi,
} from 'lucide-react';

type DemoOs = 'tizen' | 'webos';

interface DemoSource {
  id: string;
  label: string;
  codec: string;
  resolution: string;
  fps: string;
  audio: string;
  bufferMs: string;
  title: string;
  subtitle: string;
  image: string;
}

const DEMO_SOURCES: DemoSource[] = [
  {
    id: 'sports',
    label: 'Live Football Match',
    codec: 'HEVC 50/60fps',
    resolution: '3840 × 2160 UHD 50/60fps',
    fps: '50 / 60 fps locked • Works All Time',
    audio: 'Stadium Surround 5.1',
    bufferMs: '11 ms',
    title: 'Matchday Live • Smooth Football Without Lag or Cut',
    subtitle: 'Built-In VPN Active • Anti-Freeze Hardware Buffer',
    image: '/images/sports-zero-lag.jpg',
  },
  {
    id: 'cinema',
    label: 'Shows, Movies & Channels',
    codec: 'HEVC Main10',
    resolution: '3840 × 2160 HDR10+',
    fps: '24p Cinema Synced',
    audio: 'Dolby Atmos eARC',
    bufferMs: '14 ms',
    title: 'Evening Cinema • Famous Channels, Movies & Series Hub',
    subtitle: 'Instant Channel Zapping • 94 MB RAM Footprint',
    image: '/images/cinema-shows.jpg',
  },
  {
    id: 'epg',
    label: 'Live TV Guide (EPG)',
    codec: 'AV1 10-bit',
    resolution: '3840 × 2160 Dolby Vision',
    fps: '60 fps locked',
    audio: 'EAC3 Passthrough',
    bufferMs: '9 ms',
    title: '24/7 XMLTV Guide • Crisp Shows & Live Schedules',
    subtitle: 'Compatible With Every Modern Smart TV',
    image: '/images/modern-living-tv.jpg',
  },
];

export const SmartTvShowcase: React.FC = () => {
  const [os, setOs] = useState<DemoOs>('tizen');
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [vpnOn, setVpnOn] = useState(true);
  const [hwAccel, setHwAccel] = useState(true);
  const [subtitlesOn, setSubtitlesOn] = useState(true);

  const source = DEMO_SOURCES[activeSourceIndex];

  return (
    <div className="relative">
      {/* Vibrant Ambient Halo */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-400/25 via-indigo-400/20 to-emerald-400/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10">
        {/* Top OS Switcher & Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-4 py-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-200/75 p-1">
            <button
              type="button"
              onClick={() => setOs('tizen')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                os === 'tizen'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Samsung Tizen OS
            </button>
            <button
              type="button"
              onClick={() => setOs('webos')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                os === 'webos'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LG webOS
            </button>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {vpnOn ? 'VPN Protected' : 'Direct Mode'}
            </span>
            <span className="hidden text-sky-700 sm:inline">{source.resolution}</span>
          </div>
        </div>

        {/* TV Screen + Controls */}
        <div className="p-4 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            {/* Realistic OLED TV Bezel */}
            <div className="relative flex min-h-[265px] flex-col justify-between overflow-hidden rounded-2xl border-4 border-slate-900 bg-slate-950 p-4 shadow-lg">
              <img
                src={source.image}
                alt={source.title}
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/65" />

              <div className="relative flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] text-cyan-300 ring-1 ring-cyan-400/35 backdrop-blur-sm">
                  <Monitor className="h-3 w-3" />
                  {os === 'tizen' ? 'Tizen AVPlay Engine' : 'webOS Luna Engine'}
                </span>
                <span className="rounded-md bg-emerald-500/90 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-950 shadow">
                  {hwAccel ? '99.9% UPTIME • ZERO CUT' : 'SW MODE'}
                </span>
              </div>

              <div className="relative my-4 space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  {source.label}
                </p>
                <h4 className="font-display text-lg font-bold text-white drop-shadow sm:text-xl">
                  {source.title}
                </h4>
                <p className="text-xs text-slate-200 drop-shadow">{source.subtitle}</p>
              </div>

              {subtitlesOn && (
                <div className="relative mb-3 self-center rounded-md bg-black/80 px-3 py-1 text-center text-xs font-medium text-amber-100 ring-1 ring-white/15 backdrop-blur-sm">
                  [Crisp Audio &amp; Subtitles Synced • Smooth Playback]
                </div>
              )}

              <div className="relative space-y-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-200">
                  <span className="font-mono">{source.fps}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Volume2 className="h-3.5 w-3.5 text-sky-400" />
                      {source.audio}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Wifi className="h-3.5 w-3.5" />
                      {source.bufferMs}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Light Interactive Control Deck */}
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Sliders className="h-3.5 w-3.5 text-sky-600" />
                  Live Experience Preview
                </p>
                <div className="space-y-1.5">
                  {DEMO_SOURCES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSourceIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                        idx === activeSourceIndex
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-sky-50'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        <Film className="h-3.5 w-3.5 shrink-0" />
                        {item.label}
                      </span>
                      <span
                        className={`font-mono text-[10px] ${
                          idx === activeSourceIndex ? 'text-sky-100' : 'text-slate-400'
                        }`}
                      >
                        {item.codec.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3">
                <button
                  type="button"
                  onClick={() => setVpnOn((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-indigo-600" />
                    Built-In TV VPN
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                      vpnOn ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {vpnOn ? 'ACTIVE' : 'OFF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setHwAccel((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5 text-sky-600" />
                    Anti-Lag HW Engine
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                      hwAccel ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {hwAccel ? 'ON' : 'OFF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubtitlesOn((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <Subtitles className="h-3.5 w-3.5 text-violet-600" />
                    SRT / ASS Overlay
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                      subtitlesOn ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {subtitlesOn ? 'ON' : 'OFF'}
                  </span>
                </button>

                <div className="flex items-center justify-between px-1 pt-1 font-mono text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-sky-600" />
                    RAM: {hwAccel ? '94 MB' : '240 MB'}
                  </span>
                  <span>{os === 'tizen' ? 'Tizen 5.0–8.0+' : 'webOS 4.5–24+'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vibrant Bottom Strip */}
        <div className="flex items-center justify-center border-t border-slate-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 py-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
            COMPATIBLE WITH YOUR TV • BUILT-IN VPN • WORKS ALL THE TIME
          </span>
        </div>
      </div>
    </div>
  );
};
