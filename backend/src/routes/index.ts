import { Router } from "express";
import homeRouter from "./home.routes";
import trafficRouter from "./traffic.routes";

const router = Router();

router.use("/", homeRouter);
router.use("/traffic", trafficRouter);

export default router;