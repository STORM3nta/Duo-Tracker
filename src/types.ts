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

export interface SympathyMessage {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  upvotes: number;
}

export interface Milestone {
  id: string;
  label: string;
  targetSeconds: number;
  achieved: boolean;
  dateReached?: string;
  description: string;
}
