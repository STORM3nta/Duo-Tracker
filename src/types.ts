export interface TimeBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  businessDays: number;
}

export interface VictoryMessage {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  upvotes: number;
  tag?: string;
}

export interface Milestone {
  id: string;
  title: string;
  seconds: number;
  dateStr: string;
  description: string;
  achieved: boolean;
  isFinalArrival?: boolean;
}
