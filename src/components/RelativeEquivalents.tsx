import React from 'react';
import { Film, Rocket, Coffee, BookOpen, BatteryCharging, Globe2, Compass, CheckCircle2 } from 'lucide-react';
import { getFinalEquivalents } from '../utils/timeCalculations';

interface RelativeEquivalentsProps {
  totalSeconds: number;
}

export const RelativeEquivalents: React.FC<RelativeEquivalentsProps> = ({ totalSeconds }) => {
  const items = getFinalEquivalents(totalSeconds);

  const getIcon = (id: string) => {
    switch (id) {
      case 'lotr':
        return <Film className="w-5 h-5" />;
      case 'moon':
        return <Rocket className="w-5 h-5" />;
      case 'flight':
        return <Globe2 className="w-5 h-5" />;
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      case 'harrypotter':
        return <BookOpen className="w-5 h-5" />;
      case 'battery':
        return <BatteryCharging className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="relativity" className="py-12 px-6 max-w-6xl mx-auto border-t border-black">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Final Historical Tally · The 24-Day Archive</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
          What Happened In The World While Eddie Waited
        </h2>
        <p className="text-sm text-neutral-700 mt-1 max-w-2xl">
          Now that Eddie has taken possession of his iPhone Duo, here is the official historical audit of what occurred between October 16, 2026 and November 9, 2026:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-2 border-black p-5 flex flex-col justify-between hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform bg-white"
          >
            <div>
              <div className="flex items-center justify-between text-black mb-3">
                <span className="p-1 border border-black">{getIcon(item.id)}</span>
                <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                  FINAL STAT
                </span>
              </div>
              <h3 className="font-bold text-sm text-black uppercase leading-snug">
                {item.activity}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-black">
              <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-black">
                {typeof item.count === 'number' && item.count > 1000
                  ? item.count.toLocaleString()
                  : item.count}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-black mt-1">
                {item.unit}
              </div>
              <p className="text-[11px] font-mono text-neutral-600 mt-2 leading-relaxed">
                {item.formulaDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
