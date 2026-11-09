import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Clock, Globe } from 'lucide-react';
import { TimeBreakdown } from '../types';

interface ChronometerProps {
  timeData: TimeBreakdown;
  useStrictEST: boolean;
  onToggleTimezone: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

type DisplayMode = 'standard' | 'hours' | 'minutes' | 'seconds' | 'business';

export const Chronometer: React.FC<ChronometerProps> = ({
  timeData,
  useStrictEST,
  onToggleTimezone,
  audioEnabled,
  onToggleAudio,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('standard');

  const padZero = (n: number, len = 2) => String(n).padStart(len, '0');

  return (
    <section id="chronograph" className="pt-8 pb-16 px-6 max-w-6xl mx-auto">
      {/* Editorial Header & Exact Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Live Chronometer · Monitored Continuously</span>
        </div>

        {/* User's Exact Title with text-wrap: balance */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black text-balance max-w-4xl mx-auto leading-[1.1] mb-6">
          How long it has been since Eddie ordered his iPhone Duo and hasn&apos;t received it yet.
        </h1>

        {/* Start Time Metadata */}
        <div className="text-xs sm:text-sm font-mono text-black space-y-1">
          <p>
            <span className="font-bold">ORDER TIME:</span> October 16, 2026 · 08:04:00 AM{' '}
            <button
              onClick={onToggleTimezone}
              className="inline-flex items-center gap-1 font-bold underline hover:opacity-70 transition-opacity cursor-pointer"
              title="Click to toggle between EDT (US Daylight Time) and Strict EST (UTC-5)"
            >
              <span>[{useStrictEST ? 'Strict EST (UTC-5)' : 'EDT (Eastern Time, UTC-4)'}]</span>
              <Globe className="w-3 h-3" />
            </button>
          </p>
          <p className="text-xs text-neutral-600">
            {useStrictEST
              ? 'Calculated relative to 13:04:00 UTC (Literal standard UTC-5 offset)'
              : 'Calculated relative to 12:04:00 UTC (New York local clock time on Oct 16, 2026)'}
          </p>
        </div>
      </div>

      {/* Main Big Ticker Display */}
      <div className="border-2 border-black bg-white p-6 sm:p-10 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {displayMode === 'standard' && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center">
            {/* Days */}
            <div className="border border-black p-4 flex flex-col justify-center">
              <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                {timeData.days}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="border border-black p-4 flex flex-col justify-center">
              <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                {padZero(timeData.hours)}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="border border-black p-4 flex flex-col justify-center">
              <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                {padZero(timeData.minutes)}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="border border-black p-4 flex flex-col justify-center">
              <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-black">
                {padZero(timeData.seconds)}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                Seconds
              </span>
            </div>

            {/* Milliseconds */}
            <div className="col-span-2 md:col-span-1 border border-black p-4 flex flex-col justify-center bg-black text-white">
              <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums text-white">
                .{padZero(timeData.milliseconds)}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                Milliseconds
              </span>
            </div>
          </div>
        )}

        {displayMode === 'hours' && (
          <div className="text-center py-6">
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tabular-nums tracking-tight text-black">
              {timeData.totalHours.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-3 text-sm font-bold uppercase tracking-widest text-black">
              Total Consecutive Hours Eddie Has Waited
            </div>
          </div>
        )}

        {displayMode === 'minutes' && (
          <div className="text-center py-6">
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tabular-nums tracking-tight text-black">
              {Math.floor(timeData.totalMinutes).toLocaleString('en-US')}
            </div>
            <div className="mt-3 text-sm font-bold uppercase tracking-widest text-black">
              Total Consecutive Minutes Without iPhone Duo
            </div>
          </div>
        )}

        {displayMode === 'seconds' && (
          <div className="text-center py-6">
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tabular-nums tracking-tight text-black">
              {Math.floor(timeData.totalSeconds).toLocaleString('en-US')}
            </div>
            <div className="mt-3 text-sm font-bold uppercase tracking-widest text-black">
              Total Seconds Of Pure Unadulterated Anticipation
            </div>
          </div>
        )}

        {displayMode === 'business' && (
          <div className="text-center py-6">
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tabular-nums tracking-tight text-black">
              {timeData.businessDays}
            </div>
            <div className="mt-3 text-sm font-bold uppercase tracking-widest text-black">
              Business Days Elapsed (Monday through Friday delivery window)
            </div>
            <p className="mt-2 text-xs text-neutral-600 font-mono">
              Excludes weekends. Standard courier delivery promise was typically 2-3 business days.
            </p>
          </div>
        )}

        {/* Interactive Secondary Metric Bar & View Tabs */}
        <div className="mt-8 pt-6 border-t border-black flex flex-wrap items-center justify-between gap-4">
          {/* Segmented display tabs */}
          <div className="flex flex-wrap items-center gap-1 border border-black p-1">
            <button
              onClick={() => setDisplayMode('standard')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                displayMode === 'standard' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
              }`}
            >
              Split Time
            </button>
            <button
              onClick={() => setDisplayMode('hours')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                displayMode === 'hours' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
              }`}
            >
              Total Hours
            </button>
            <button
              onClick={() => setDisplayMode('minutes')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                displayMode === 'minutes' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
              }`}
            >
              Total Minutes
            </button>
            <button
              onClick={() => setDisplayMode('seconds')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                displayMode === 'seconds' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
              }`}
            >
              Total Seconds
            </button>
            <button
              onClick={() => setDisplayMode('business')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                displayMode === 'business' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
              }`}
            >
              Business Days
            </button>
          </div>

          {/* Action buttons (Audio, Fullscreen) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 cursor-pointer transition-colors"
              title="Toggle audio click ticker"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Tick Sound: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Tick Sound: OFF</span>
                </>
              )}
            </button>

            <button
              onClick={onToggleFullscreen}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 cursor-pointer transition-colors"
              title="Display clock in full screen"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Full</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Summary Row with clean editorial borders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Total Calendar Days</div>
          <div className="text-2xl font-black font-mono mt-1">{timeData.days} days</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">{(timeData.totalDays).toFixed(2)} decimal days</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Business Days Overdue</div>
          <div className="text-2xl font-black font-mono mt-1">{timeData.businessDays} days</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">Working delivery days</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Total Hours Waited</div>
          <div className="text-2xl font-black font-mono mt-1">{Math.floor(timeData.totalHours)}h {timeData.minutes}m</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">{Math.floor(timeData.totalHours * 60).toLocaleString()} minutes</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-xs uppercase font-bold text-neutral-600">Delivery Status</div>
          <div className="text-2xl font-black uppercase text-black mt-1">Not Received</div>
          <div className="text-xs text-neutral-500 mt-1 font-mono">Order #W10162026-EDDIE</div>
        </div>
      </div>
    </section>
  );
};
