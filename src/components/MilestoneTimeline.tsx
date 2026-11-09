import React from 'react';
import { Flag, CheckCircle2, Hourglass } from 'lucide-react';
import { TimeBreakdown } from '../types';

interface MilestoneTimelineProps {
  timeData: TimeBreakdown;
  startTimeISO: string;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ timeData, startTimeISO }) => {
  const startDate = new Date(startTimeISO);

  const formatMilestoneDate = (secondsFromStart: number) => {
    const d = new Date(startDate.getTime() + secondsFromStart * 1000);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const milestones = [
    {
      title: '1 Hour of Anticipation',
      seconds: 3600,
      description: 'Eddie vigorously refreshed the Apple Store app, assuming it was already on a van.',
    },
    {
      title: '24 Hours Mark (Day 1)',
      seconds: 86400,
      description: 'First official 24-hour cycle of waiting completed. Optimism still robust.',
    },
    {
      title: '100 Consecutive Hours',
      seconds: 360000,
      description: 'Passed 100 hours. Status remains stubbornly stuck on Stage 1 Processing.',
    },
    {
      title: '1 Full Week (168 Hours)',
      seconds: 604800,
      description: 'A full 7-day week without the folding dual screen. Rumors of iPhone Duo 2 surface.',
    },
    {
      title: '500 Hours Milestone',
      seconds: 1800000,
      description: 'Half a thousand hours of dedicated hardware patience.',
    },
    {
      title: '25 Days Mark',
      seconds: 25 * 86400,
      description: 'A quarter of a hundred days. The tracking page has been bookmarked on 4 devices.',
    },
    {
      title: '1 Month Anniversary (31 Days)',
      seconds: 31 * 86400,
      description: 'A full solar month since the fateful morning of October 16, 2026.',
    },
    {
      title: '1,000 Hours (The Grand Millennial)',
      seconds: 1000 * 3600,
      description: 'Eddie enters the elite 4-digit hour waiting hall of fame.',
    },
  ];

  // Identify next upcoming milestone
  const currentTotalSeconds = timeData.totalSeconds;
  const nextMilestone = milestones.find((m) => m.seconds > currentTotalSeconds) || milestones[milestones.length - 1];
  const secondsRemaining = Math.max(0, nextMilestone.seconds - currentTotalSeconds);

  const remHours = Math.floor(secondsRemaining / 3600);
  const remMinutes = Math.floor((secondsRemaining % 3600) / 60);
  const remSeconds = Math.floor(secondsRemaining % 60);

  return (
    <section id="milestones" className="py-12 px-6 max-w-6xl mx-auto border-t border-black">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black mb-1">
            <Flag className="w-3.5 h-3.5" />
            <span>Chronological Progress</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
            Eddie&apos;s Wait Milestones
          </h2>
        </div>
      </div>

      {/* Next Upcoming Milestone Box */}
      <div className="border-2 border-black p-6 mb-8 bg-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black mb-1">
            <Hourglass className="w-4 h-4 text-black animate-spin" />
            <span>Next Impending Milestone</span>
          </div>
          <h3 className="text-xl font-bold uppercase text-black">{nextMilestone.title}</h3>
          <p className="text-xs font-mono text-neutral-600 mt-1">{nextMilestone.description}</p>
        </div>

        <div className="border border-black bg-white px-5 py-3 text-center shrink-0">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">
            Time Until Milestone
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-black tabular-nums text-black">
            {remHours}h {remMinutes}m {remSeconds}s
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map((m, idx) => {
          const isPassed = currentTotalSeconds >= m.seconds;
          return (
            <div
              key={idx}
              className={`border p-4 transition-all ${
                isPassed
                  ? 'border-black bg-white'
                  : 'border-dashed border-neutral-400 bg-neutral-50 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-black">
                  #{String(idx + 1).padStart(2, '0')} · {m.title}
                </span>
                {isPassed ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-black border border-black px-1.5 py-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>PASSED</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-mono font-bold text-neutral-500 border border-neutral-300 px-1.5 py-0.5">
                    UPCOMING
                  </span>
                )}
              </div>

              <div className="text-xs font-mono text-neutral-600 mb-1">
                Target: {formatMilestoneDate(m.seconds)}
              </div>
              <p className="text-xs text-neutral-800 font-sans leading-relaxed">
                {m.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
