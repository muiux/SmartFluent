import { Request, Response } from "express";
import trafficRepository from "../repositories/traffic.repository";
import { VisitStatsParams, TrackVisitParams, VisitStats } from "../types/traffic.types";

export default class TrafficController {
  async trackVisit(req: Request, res: Response): Promise<void> {
    const { pageUrl, referrer, userAgent }: TrackVisitParams = req.body;
    const ipAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;

    if (!pageUrl) {
      res.status(400).send({ message: "Page URL are required!" });
      return;
    }

    try {
      await trafficRepository.trackVisit({ ipAddress, pageUrl, referrer, userAgent });
      res.status(201).send({ message: "Visit tracked successfully!" });
    } catch (err) {
      res.status(500).send({ message: "Error tracking visit." });
    }
  }

  async getUniqueVisitors(req: Request, res: Response): Promise<void> {
    const { startDate, endDate }: VisitStatsParams = req.query as unknown as VisitStatsParams;

    if (!startDate || !endDate) {
      res.status(400).send({ message: "startDate, and endDate are required!" });
      return;
    }

    try {
      const uniqueVisitors: VisitStats[] = await trafficRepository.getUniqueVisitors({
        startDate: startDate as string,
        endDate: endDate as string,
      });

      res.status(200).send(uniqueVisitors);
    } catch (err) {
      res.status(500).send({ message: "Error retrieving unique visitors." });
    }
  }
}
