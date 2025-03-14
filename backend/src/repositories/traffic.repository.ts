import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../db";
import {
  TrackVisitParams,
  VisitStats,
  VisitStatsParams,
} from "../types/traffic.types";

interface ITrafficRepository {
  trackVisit({ ipAddress, pageUrl, referrer, userAgent }: TrackVisitParams): Promise<void>;
  getUniqueVisitors({
    startDate,
    endDate,
  }: VisitStatsParams): Promise<VisitStats[]>;
}

class TrafficRepository implements ITrafficRepository {
  async trackVisit({ ipAddress, pageUrl, referrer, userAgent }: TrackVisitParams): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        `INSERT INTO visits (ip_address, page_url, visit_date, referrer, user_agent)
         VALUES (?, ?, NOW(), ?, ?)`,
        [ipAddress, pageUrl, referrer, userAgent],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async getUniqueVisitors({
    startDate,
    endDate,
  }: VisitStatsParams): Promise<VisitStats[]> {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        `SELECT page_url, COUNT(DISTINCT ip_address) AS count
         FROM visits 
         WHERE visit_date BETWEEN ? AND ?
         GROUP BY page_url`,
        [`${startDate} 00:00:00`, `${endDate} 00:00:00`],
        (err, res) => {
          if (err) reject(err);
          else {
            const visitStats: VisitStats[] = res.map((row) => ({
              pageUrl: row.page_url,
              count: row.count,
            }));
            resolve(visitStats);
          }
        }
      );
    });
  }
}

export default new TrafficRepository();
