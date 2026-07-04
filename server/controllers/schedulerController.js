import Order from "../models/orderModel.js";
import SchedulerLog from "../models/schedulerLogModel.js";

export const runScheduler = async (req, res) => {
  try {
    let updatedOrders = 0;

    const orders = await Order.find();

    const currentTime = new Date();

    for (const order of orders) {
      const diffInMinutes =
        (currentTime - order.updatedAt) / (1000 * 60);

      // PLACED -> PROCESSING (10 min)
      if (
        order.orderStatus === "PLACED" &&
        diffInMinutes >= 10
      ) {
        order.orderStatus = "PROCESSING";
        await order.save();
        updatedOrders++;
      }

      // PROCESSING -> READY_TO_SHIP (20 min)
      else if (
        order.orderStatus === "PROCESSING" &&
        diffInMinutes >= 20
      ) {
        order.orderStatus = "READY_TO_SHIP";
        await order.save();
        updatedOrders++;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Scheduler executed successfully",
      totalOrdersChecked: orders.length,
      totalOrdersUpdated: updatedOrders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSchedulerLogs = async (req, res) => {
  try {
    const logs = await SchedulerLog.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};