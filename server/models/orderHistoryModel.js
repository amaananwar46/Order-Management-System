import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    fromStatus: {
      type: String,
      required: true,
      enum: [
        "PLACED",
        "PROCESSING",
        "READY_TO_SHIP",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
    },

    toStatus: {
      type: String,
      required: true,
      enum: [
        "PLACED",
        "PROCESSING",
        "READY_TO_SHIP",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },

    changedBy: {
      type: String,
      enum: ["SCHEDULER", "ADMIN"],
      default: "SCHEDULER",
    },
  },
  {
    timestamps: true,
  }
);

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

export default OrderHistory;