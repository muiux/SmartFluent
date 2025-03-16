export interface VisitStats {
  count: number;
  pageUrl: string;
}

export interface TrafficStats {
  count: number;
  visitDate: string;
}

export interface VisitStatsParams {
  startDate: string;
  endDate: string;
}

export interface TrackVisitParams {
  ipAddress: string;
  pageUrl: string;
  referrer: string;
  userAgent: string;
}
