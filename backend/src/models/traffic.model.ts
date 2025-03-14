import { RowDataPacket } from "mysql2";

export default interface Traffic extends RowDataPacket {
  id?: number;
  ip_address: string;
  page_url: string;
  visit_date: Date;
  referrer?: string;
  user_agent?: string;
}