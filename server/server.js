import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoute.js";
import schedulerRoute from './routes/schedulerRoute.js'
import "./cron/orderStatus.cron.js";


dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/scheduler",schedulerRoute);

// // Test Route
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Order Management API is Running 🚀",
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});