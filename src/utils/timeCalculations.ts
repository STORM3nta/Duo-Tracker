import { TimeBreakdown } from '../types';

// Order Placed: October 16, 2026 08:04:00 AM EDT
export const ORDER_DATE_ISO = '2026-10-16T08:04:00-04:00';

// Delivered & Possession Taken: November 9, 2026 02:48:00 PM EST
export const DELIVERY_DATE_ISO = '2026-11-09T14:48:00-05:00';

export function calculateBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const cur = new Date(startDate);
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

export function getFinalWaitBreakdown(): TimeBreakdown {
  const start = new Date(ORDER_DATE_ISO);
  const delivery = new Date(DELIVERY_DATE_ISO);
  const diffMs = Math.max(0, delivery.getTime() - start.getTime());

  const totalSeconds = diffMs / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  const days = Math.floor(totalDays);
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = 0;

  const businessDays = calculateBusinessDays(start, delivery);

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

export function getPossessionBreakdown(now: Date = new Date()): TimeBreakdown {
  const delivery = new Date(DELIVERY_DATE_ISO);
  const diffMs = Math.max(0, now.getTime() - delivery.getTime());

  const totalSeconds = diffMs / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  const days = Math.floor(totalDays);
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((diffMs % 1000) / 10);

  const businessDays = calculateBusinessDays(delivery, now);

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

export function getFinalEquivalents(totalSeconds: number): ActivityEquivalent[] {
  // Lord of the Rings Extended Trilogy: ~11.4 hours = 41,040 seconds
  const lotr = totalSeconds / 41040;

  // Apollo 11 trip to Moon (one way ~73 hours = 262,800 seconds)
  const moonTrip = totalSeconds / 262800;

  // Commercial flight around the world: ~45 hours = 162,000 seconds
  const worldFlights = totalSeconds / 162000;

  // Beard growth: ~0.4 mm per day
  const beardGrowthMm = (totalSeconds / 86400) * 0.4;

  // Cups of pour-over coffee brewed (1 brew every 5 minutes = 300s)
  const coffees = totalSeconds / 300;

  // Harry Potter series full audiobook listening (117 hours = 421,200s)
  const harryPotterRuns = totalSeconds / 421200;

  // iPhone battery cycles equivalent
  const batteryCycles = totalSeconds / 86400;

  // Mars voyage percentage
  const marsProgress = (totalSeconds / 21859200) * 100;

  return [
    {
      id: 'lotr',
      activity: 'Lord of the Rings (Extended Editions)',
      unit: 'completed marathons',
      count: parseFloat(lotr.toFixed(1)),
      formulaDescription: 'Based on 11.4 hours for the full Peter Jackson extended trilogy',
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
      activity: 'Facial Hair Grown',
      unit: 'millimeters of beard',
      count: parseFloat(beardGrowthMm.toFixed(2)),
      formulaDescription: 'Average human hair grows approx 0.4 mm per 24-hour cycle',
    },
    {
      id: 'coffee',
      activity: 'Artisanal Coffees Brewed',
      unit: 'cups prepared',
      count: Math.floor(coffees),
      formulaDescription: '5 minutes per pour-over extraction while checking delivery status',
    },
    {
      id: 'harrypotter',
      activity: 'Entire Harry Potter Audiobooks',
      unit: 'series completions',
      count: parseFloat(harryPotterRuns.toFixed(2)),
      formulaDescription: 'Entire 7-book audiobook runtime (117 total listening hours)',
    },
    {
      id: 'battery',
      activity: 'Full Battery Cycles Elapsed',
      unit: '0-100% daily charges',
      count: parseFloat(batteryCycles.toFixed(1)),
      formulaDescription: 'Equivalent battery life on Eddie\'s now-retired old phone',
    },
    {
      id: 'mars',
      activity: 'Transit to Mars',
      unit: '% of interplanetary flight',
      count: parseFloat(marsProgress.toFixed(2)),
      formulaDescription: 'Curiosity rover 253-day Hohmann transfer orbit baseline',
    },
  ];
}
