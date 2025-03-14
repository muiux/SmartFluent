import { Router } from "express";
import TrafficController from "../controllers/traffic.controller";

class TrafficRoutes {
  router = Router();
  controller = new TrafficController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/track", this.controller.trackVisit);

    this.router.get("/unique-visitors", this.controller.getUniqueVisitors);
  }
}

export default new TrafficRoutes().router;
