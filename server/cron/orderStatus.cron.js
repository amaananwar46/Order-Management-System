import cron from "node-cron";
import { runSchedulerJob } from "../services/scheduler.service.js";

cron.schedule("*/2 * * *  *", async () => {
  console.log("Running Order Scheduler...");

  await runSchedulerJob();
});