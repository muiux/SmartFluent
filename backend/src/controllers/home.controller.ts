import { Request, Response } from "express";

export function welcome(req: Request, res: Response) {
  res.json({ message: "Welcome to bezkoder application." });
}
