import mongoose from "mongoose";

const schedulerLogSchema = new mongoose.Schema(
  {
    runAt: {
      type: Date,
      default: Date.now,
    },

    ordersChecked: {
      type: Number,
      required: true,
      default: 0,
    },

    ordersUpdated: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true,
    },

    errorMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SchedulerLog = mongoose.model(
  "SchedulerLog",
  schedulerLogSchema
);

export default SchedulerLog;