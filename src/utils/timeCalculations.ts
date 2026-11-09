import { TimeBreakdown } from '../types';

// October 16, 2026 08:04:00 AM EDT (America/New_York is UTC-4 in October)
export const START_TIME_EDT = '2026-10-16T08:04:00-04:00';
// Literal EST (UTC-5)
export const START_TIME_EST_STRICT = '2026-10-16T08:04:00-05:00';

export function calculateBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const cur = new Date(startDate);
  // Start from next morning or current day
  cur.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  while (cur < end) {
    cur.setDate(cur.getDate() + 1);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
  }
  return count;
}

export function getTimeBreakdown(startTimeISO: string, now: Date = new Date()): TimeBreakdown {
  const start = new Date(startTimeISO);
  const diffMs = Math.max(0, now.getTime() - start.getTime());

  const totalSeconds = diffMs / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  const days = Math.floor(totalDays);
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((diffMs % 1000) / 10); // 00-99 hundredths of a second

  const businessDays = calculateBusinessDays(start, now);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    businessDays,
  };
}

export interface ActivityEquivalent {
  id: string;
  activity: string;
  unit: string;
  count: number;
  formulaDescription: string;
}

export function getRelativeEquivalents(totalSeconds: number): ActivityEquivalent[] {
  // Lord of the Rings Extended Trilogy: ~11.4 hours = 41,040 seconds
  const lotr = totalSeconds / 41040;

  // Apollo 11 trip to Moon (one way ~73 hours = 262,800 seconds)
  const moonTrip = totalSeconds / 262800;

  // Commercial flight around the world: ~45 hours = 162,000 seconds
  const worldFlights = totalSeconds / 162000;

  // Beard growth: ~0.4 mm per day = ~0.00000463 mm per second
  const beardGrowthMm = (totalSeconds / 86400) * 0.4;

  // Cups of pour-over coffee brewed (1 brew every 5 minutes = 300s)
  const coffees = totalSeconds / 300;

  // Harry Potter series full audiobook listening (117 hours = 421,200s)
  const harryPotterRuns = totalSeconds / 421200;

  // iPhone 15 battery charge cycles (assume 1 full cycle per 24h = 86,400s)
  const batteryCycles = totalSeconds / 86400;

  // Mars voyage percentage (Curiosity took 253 days = 21,859,200 seconds)
  const marsProgress = (totalSeconds / 21859200) * 100;

  return [
    {
      id: 'lotr',
      activity: 'Lord of the Rings (Extended Editions)',
      unit: 'complete marathons',
      count: parseFloat(lotr.toFixed(1)),
      formulaDescription: 'Based on 11.4 hours for the full Peter Jackson extended cut trilogy',
    },
    {
      id: 'moon',
      activity: 'Apollo 11 Journey to the Moon',
      unit: 'one-way missions',
      count: parseFloat(moonTrip.toFixed(2)),
      formulaDescription: 'Based on historical 73-hour translunar coast duration',
    },
    {
      id: 'flight',
      activity: 'Circumnavigate the Earth',
      unit: 'round-the-world flights',
      count: parseFloat(worldFlights.toFixed(2)),
      formulaDescription: 'Based on approx 45 hours commercial multi-stop global routing',
    },
    {
      id: 'beard',
      activity: 'Facial Hair Growth',
      unit: 'millimeters grown',
      count: parseFloat(beardGrowthMm.toFixed(2)),
      formulaDescription: 'Average human hair grows approx 0.4 mm per 24-hour cycle',
    },
    {
      id: 'coffee',
      activity: 'Artisanal Pour-Over Coffees',
      unit: 'cups brewed',
      count: Math.floor(coffees),
      formulaDescription: 'Allowing 5 minutes for grinding, blooming, and careful extraction',
    },
    {
      id: 'harrypotter',
      activity: 'Complete Harry Potter Series',
      unit: 'read-throughs',
      count: parseFloat(harryPotterRuns.toFixed(2)),
      formulaDescription: 'Entire 7-book audiobook runtime (117 total listening hours)',
    },
    {
      id: 'battery',
      activity: 'Standard Smartphone Battery Cycles',
      unit: 'full 0-100% discharges',
      count: parseFloat(batteryCycles.toFixed(1)),
      formulaDescription: 'Assumes average daily discharge and recharge cadence',
    },
    {
      id: 'mars',
      activity: 'Journey to Mars',
      unit: '% of transit to the Red Planet',
      count: parseFloat(marsProgress.toFixed(2)),
      formulaDescription: 'Calculated against typical 253-day Hohmann transfer orbit',
    },
  ];
}
