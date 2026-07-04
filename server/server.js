import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoute.js";
import schedulerRoute from "./routes/schedulerRoute.js";
import "./cron/orderStatus.cron.js";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// 🌐 Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",

  // Vercel Frontend
  "https://order-management-system-client.vercel.app",
  "https://order-management-system-virid-ten.vercel.app",
];

// ✅ CORS
app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman & server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Order Management API is running 🚀",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/scheduler", schedulerRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});