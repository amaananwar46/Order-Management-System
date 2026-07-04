import Order from "../models/orderModel.js";
import OrderHistory from "../models/orderHistoryModel.js";
import SchedulerLog from "../models/schedulerLogModel.js";



export const runSchedulerJob = async () => {
  try {
    let updatedOrders = 0;

    const orders = await Order.find();

    const currentTime = new Date();

    for (const order of orders) {
      const diff =
        (currentTime - order.statusUpdatedAt) / (1000 * 60);

      // PLACED -> PROCESSING
      if (order.orderStatus === "PLACED" && diff >= 0.25) {
        console.log("PLACED -> PROCESSING");

        const oldStatus = order.orderStatus;

        order.orderStatus = "PROCESSING";
        order.statusUpdatedAt = new Date();

        await order.save();

        await OrderHistory.create({
          orderId: order._id,
          fromStatus: oldStatus,
          toStatus: order.orderStatus,
        });

        updatedOrders++;
      }

      // PROCESSING -> READY_TO_SHIP
      else if (
        order.orderStatus === "PROCESSING" &&
        diff >= 0.5
      ) {
        console.log("PROCESSING -> READY_TO_SHIP");

        const oldStatus = order.orderStatus;

        order.orderStatus = "READY_TO_SHIP";
        order.statusUpdatedAt = new Date();

        await order.save();

        await OrderHistory.create({
          orderId: order._id,
          fromStatus: oldStatus,
          toStatus: order.orderStatus,
        });

        updatedOrders++;
      }
    }

    // Save Scheduler Log
    await SchedulerLog.create({
      ordersChecked: orders.length,
      ordersUpdated: updatedOrders,
      status: "SUCCESS",
    });

    console.log("✅ Scheduler Log Saved");

    return {
      totalOrdersChecked: orders.length,
      totalOrdersUpdated: updatedOrders,
    };
  } catch (error) {
    console.log("❌ Scheduler Error:", error.message);

    await SchedulerLog.create({
      ordersChecked: 0,
      ordersUpdated: 0,
      status: "FAILED",
      errorMessage: error.message,
    });

    throw error;
  }
};






//testingggg--------------------------------
// import Order from "../models/orderModel.js";

// export const runSchedulerJob = async () => {
//   let updatedOrders = 0;

//   const orders = await Order.find();

//   const currentTime = new Date();

//   for (const order of orders) {

//     const diff =
//       (currentTime - order.statusUpdatedAt) / (1000 * 60);

//     // 15 seconds
//     if (order.orderStatus === "PLACED" && diff >= 0.25) {
//       order.orderStatus = "PROCESSING";
//       order.statusUpdatedAt = new Date();

//       await order.save();
//       updatedOrders++;
//     }

//     // 30 seconds
//     else if (order.orderStatus === "PROCESSING" && diff >= 0.5) {
//       order.orderStatus = "READY_TO_SHIP";
//       order.statusUpdatedAt = new Date();

//       await order.save();
//       updatedOrders++;
//     }
//   }

//   return {
//     totalOrdersChecked: orders.length,
//     totalOrdersUpdated: updatedOrders,
//   };
// };