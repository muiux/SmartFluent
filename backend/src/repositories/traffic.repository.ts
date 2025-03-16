import prisma from "../db";
import { TrackVisitParams, VisitStatsParams, TrafficStats, VisitStats } from "../types/traffic.types";

class TrafficRepository {
  async trackVisit({ ipAddress, pageUrl, referrer, userAgent }: TrackVisitParams): Promise<void> {
    await prisma.visit.create({
      data: { ipAddress, pageUrl, referrer, userAgent }
    });
  }

  async getUniqueVisitors({ startDate, endDate }: VisitStatsParams): Promise<VisitStats[]> {
    const res = await prisma.visit.groupBy({
      by: ["pageUrl"],
      _count: { ipAddress: true },
      where: {
        visitDate: { gte: new Date(startDate), lte: new Date(endDate) }
      }
    });

    return res.map((row: { pageUrl: string; _count: { ipAddress: number } }) => ({
      pageUrl: row.pageUrl,
      count: row._count.ipAddress
    }));
  }

  async getTrafficData({ startDate, endDate }: VisitStatsParams): Promise<TrafficStats[]> {
    const res = await prisma.visit.groupBy({
      by: ["visitDate"],
      _count: { ipAddress: true },
      where: {
        visitDate: { gte: new Date(startDate), lte: new Date(endDate) }
      }
    });

    return res.map((row: { visitDate: Date; _count: { ipAddress: number } }) => ({
      visitDate: row.visitDate.toISOString(),
      count: row._count.ipAddress
    }));
  }
}

export default new TrafficRepository();
