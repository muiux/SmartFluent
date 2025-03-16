import prisma from "../db";
import {
  TrackVisitParams,
  VisitStatsParams,
  TrafficStats,
  VisitStats,
} from "../types/traffic.types";

class TrafficRepository {
  async trackVisit({
    ipAddress,
    pageUrl,
    referrer,
    userAgent,
  }: TrackVisitParams): Promise<void> {
    await prisma.visit.create({
      data: { ipAddress, pageUrl, referrer, userAgent },
    });
  }

  async getUniqueVisitors({
    startDate,
    endDate,
  }: VisitStatsParams): Promise<VisitStats[]> {
    const uniqueVisits = await prisma.visit.findMany({
      select: { pageUrl: true, ipAddress: true }, // Select only needed fields
      distinct: ["ipAddress", "pageUrl"], // Ensures unique IP per pageUrl
      where: {
        visitDate: { gte: new Date(startDate), lte: new Date(endDate) },
      },
    });

    const visitCounts = uniqueVisits.reduce((acc, visit) => {
      acc[visit.pageUrl] = (acc[visit.pageUrl] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(visitCounts).map(([pageUrl, count]) => ({
      pageUrl,
      count,
    }));
  }

  async getTrafficData({
    startDate,
    endDate,
  }: VisitStatsParams): Promise<TrafficStats[]> {
    const res = await prisma.visit.groupBy({
      by: ["visitDate"],
      _count: { ipAddress: true },
      where: {
        visitDate: { gte: new Date(startDate), lte: new Date(endDate) },
      },
    });

    return res.map(
      (row: { visitDate: Date; _count: { ipAddress: number } }) => ({
        visitDate: row.visitDate.toISOString(),
        count: row._count.ipAddress,
      })
    );
  }
}

export default new TrafficRepository();
