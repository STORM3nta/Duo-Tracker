import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Volume2, VolumeX, Maximize2, Minimize2, Sparkles, Smartphone } from 'lucide-react';
import { TimeBreakdown } from '../types';

interface ChronometerProps {
  possessionTime: TimeBreakdown;
  waitRecord: TimeBreakdown;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onTriggerConfetti: () => void;
}

export const Chronometer: React.FC<ChronometerProps> = ({
  possessionTime,
  waitRecord,
  audioEnabled,
  onToggleAudio,
  isFullscreen,
  onToggleFullscreen,
  onTriggerConfetti,
}) => {
  const [activeTab, setActiveTab] = useState<'possession' | 'wait_record'>('possession');

  const padZero = (n: number, len = 2) => String(n).padStart(len, '0');

  return (
    <section id="chronograph" className="pt-8 pb-16 px-6 max-w-6xl mx-auto">
      {/* Official Victory Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 border border-black bg-black text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>MISSION ACCOMPLISHED · POSSESSION CONFIRMED</span>
        </div>

        {/* Triumphant Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black text-balance max-w-4xl mx-auto leading-[1.08] mb-4">
          Eddie has finally taken possession of his iPhone Duo.
        </h1>

        <p className="text-base sm:text-lg font-medium text-neutral-800 max-w-2xl mx-auto mb-3">
          The 24-day international tracking saga is officially over. Handed directly to Eddie on <span className="font-bold underline">November 9, 2026 at 02:48 PM EST</span>.
        </p>

        {/* Inception to Delivery Stamp */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-mono border border-black px-4 py-2 bg-neutral-50 text-black">
          <span>ORDERED: 10/16/2026 08:04 EST</span>
          <span>→</span>
          <span className="font-bold">DELIVERED: 11/09/2026 14:48 EST</span>
          <span>·</span>
          <span className="font-bold">TOTAL WAIT: 24d 7h 44m</span>
        </div>
      </div>

      {/* Main Dual-Mode Display Box */}
      <div className="border-2 border-black bg-white p-6 sm:p-10 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Toggle Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-black">
          <div className="flex items-center gap-1 border border-black p-1">
            <button
              onClick={() => setActiveTab('possession')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'possession'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-neutral-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Live Possession Clock (Active)</span>
            </button>
            <button
              onClick={() => setActiveTab('wait_record')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'wait_record'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-neutral-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The 24-Day Wait Archive</span>
            </button>
          </div>

          {/* Utility Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerConfetti}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 cursor-pointer transition-colors"
              title="Pop victory confetti"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fire Confetti</span>
            </button>

            <button
              onClick={onToggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 cursor-pointer transition-colors"
              title="Toggle audio tick"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Tick: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Tick: OFF</span>
                </>
              )}
            </button>

            <button
              onClick={onToggleFullscreen}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 cursor-pointer transition-colors"
              title="Fullscreen mode"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Full Screen'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Possession Clock */}
        {activeTab === 'possession' && (
          <div>
            <div className="text-center mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-600">
                TIME ELAPSED IN EDDIE&apos;S PHYSICAL HANDS
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center">
              {/* Days */}
              <div className="border border-black p-4 flex flex-col justify-center">
                <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                  {possessionTime.days}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="border border-black p-4 flex flex-col justify-center">
                <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                  {padZero(possessionTime.hours)}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="border border-black p-4 flex flex-col justify-center">
                <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                  {padZero(possessionTime.minutes)}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                  Minutes
                </span>
              </div>

              {/* Seconds */}
              <div className="border border-black p-4 flex flex-col justify-center">
                <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                  {padZero(possessionTime.seconds)}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                  Seconds
                </span>
              </div>

              {/* Milliseconds */}
              <div className="col-span-2 md:col-span-1 border border-black p-4 flex flex-col justify-center bg-black text-white">
                <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-white">
                  .{padZero(possessionTime.milliseconds)}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                  Milliseconds
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs font-mono text-neutral-600">
              Clock started the instant Eddie peeled the screen protectors and booted iOS Duo.
            </div>
          </div>
        )}

        {/* Tab 2: The Final 24-Day Wait Archive */}
        {activeTab === 'wait_record' && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-600">
                FINAL CERTIFIED ORDEAL STATS (OCT 16 – NOV 9, 2026)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="border border-black p-4">
                <div className="font-mono text-4xl sm:text-5xl font-black text-black">
                  24 <span className="text-xl font-bold">DAYS</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mt-2">
                  Total Calendar Days
                </div>
              </div>

              <div className="border border-black p-4">
                <div className="font-mono text-4xl sm:text-5xl font-black text-black">
                  583.7 <span className="text-xl font-bold">HRS</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mt-2">
                  Total Consecutive Hours
                </div>
              </div>

              <div className="border border-black p-4">
                <div className="font-mono text-4xl sm:text-5xl font-black text-black">
                  17 <span className="text-xl font-bold">DAYS</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mt-2">
                  Business Courier Days
                </div>
              </div>

              <div className="border border-black p-4 bg-neutral-100">
                <div className="font-mono text-4xl sm:text-5xl font-black text-black">
                  2.1M <span className="text-xl font-bold">SEC</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mt-2">
                  Exact Seconds Waited
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs font-mono text-neutral-700">
              Verified final duration: 24 days, 7 hours, 44 minutes, 00 seconds. No further waiting required!
            </div>
          </div>
        )}
      </div>

      {/* 4 Hardware Inspection Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Hardware Disposition</div>
          <div className="text-xl font-black uppercase text-black mt-1">In Eddie&apos;s Hands</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">100% physically delivered</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Dual Fold Hinge</div>
          <div className="text-xl font-black font-mono text-black mt-1">Tested 50+ times</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">Zero creases detected</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Old Phone Status</div>
          <div className="text-xl font-black uppercase text-black mt-1">Retired to Drawer</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">Data transfer complete</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Eddie&apos;s Morale</div>
          <div className="text-xl font-black uppercase text-black mt-1">Maximum 100%</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">Patience rewarded</div>
        </div>
      </div>
    </section>
  );
};
