import { Request, Response } from "express";

export function welcome(req: Request, res: Response) {
  res.json({ message: "The Backend Service is running on the port 5000." });
}
