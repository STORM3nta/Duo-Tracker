import React from 'react';
import { Flag, CheckCircle2, Trophy } from 'lucide-react';

export const MilestoneTimeline: React.FC = () => {
  const milestones = [
    {
      title: '01. Order Placed at 08:04 EST',
      date: 'Oct 16, 2026',
      description: 'Eddie places the pre-order. Credit card charged. Expectations sky-high.',
      isGrandFinal: false,
    },
    {
      title: '02. First 24 Hours Completed',
      date: 'Oct 17, 2026',
      description: 'Checking order status every 30 minutes. Status: Still Processing.',
      isGrandFinal: false,
    },
    {
      title: '03. The 100-Hour Mark',
      date: 'Oct 20, 2026',
      description: 'Friends start asking: "Did your phone arrive yet Eddie?" Eddie smiles through the pain.',
      isGrandFinal: false,
    },
    {
      title: '04. One Full Week (168 Hours)',
      date: 'Oct 23, 2026',
      description: 'Eddie watches 14 unboxing YouTube videos to simulate the feeling.',
      isGrandFinal: false,
    },
    {
      title: '05. The 500-Hour Club',
      date: 'Nov 6, 2026',
      description: 'Half a thousand hours. The tracker website is born. Global solidarity forms.',
      isGrandFinal: false,
    },
    {
      title: '06. Out for Delivery & Handoff',
      date: 'Nov 9, 2026 14:48 EST',
      description: 'The golden moment: Van pulls up, courier signs the tablet, Eddie takes physical possession of the iPhone Duo!',
      isGrandFinal: true,
    },
  ];

  return (
    <section id="milestones" className="py-12 px-6 max-w-6xl mx-auto border-t border-black">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black mb-1">
            <Flag className="w-3.5 h-3.5" />
            <span>Chronological Journey · Complete</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
            The Complete Timeline of Eddie&apos;s Wait
          </h2>
        </div>
      </div>

      {/* Grand Finale Box */}
      <div className="border-2 border-black p-6 mb-8 bg-black text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-1">
            <Trophy className="w-4 h-4 text-white" />
            <span>FINAL DESTINATION REACHED</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
            November 9, 2026: Eddie Possesses The Phone
          </h3>
          <p className="text-xs font-mono text-neutral-300 mt-1">
            Total voyage length: 24 days, 7 hours, 44 minutes. All milestones 100% unlocked.
          </p>
        </div>

        <div className="border border-white bg-white text-black px-6 py-3 text-center shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-600 mb-0.5">
            FINAL OUTCOME
          </div>
          <div className="font-mono text-xl sm:text-2xl font-black text-black">
            DELIVERED
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className={`border-2 p-5 flex flex-col justify-between ${
              m.isGrandFinal
                ? 'border-black bg-neutral-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'border-black bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-black uppercase">
                  {m.date}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold border border-black px-1.5 py-0.5 bg-black text-white">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>COMPLETE</span>
                </span>
              </div>
              <h4 className="font-bold text-sm text-black uppercase">{m.title}</h4>
            </div>

            <div className="mt-4 pt-3 border-t border-black text-xs text-neutral-700 leading-relaxed font-sans">
              {m.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
