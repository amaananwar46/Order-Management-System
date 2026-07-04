import Order from "../models/orderModel.js";
import OrderHistory from "../models/orderHistoryModel.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      productName,
      amount,
      paymentStatus,
    } = req.body;

    // Validation
    if (!customerName || !phone || !productName || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Generate Order ID
    const orderId = `ORD-${Date.now()}`;

    // Create Order
    const order = await Order.create({
      orderId,
      customerName,
      phone,
      productName,
      amount,
      paymentStatus,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get All Orders
export const getOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 5 } = req.query;

    let filter = {};

    if (status) {
      filter.orderStatus = status;
    }

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id);

    const order = await Order.findOne({ orderId: id });

    

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find order using custom orderId (ORD-...)
    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Fetch history using Mongo _id
    const history = await OrderHistory.find({
      orderId: order._id,
    }).sort({ changedAt: -1 });

    return res.status(200).json({
      success: true,
      totalHistory: history.length,
      history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};