import express from "express";
import { runScheduler,getSchedulerLogs } from "../controllers/schedulerController.js";
import { schedulerAuth } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/run", schedulerAuth, runScheduler);
router.get("/logs", getSchedulerLogs);

export default router;