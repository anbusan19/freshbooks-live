const Order = require("./order.model");
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    return res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

const createAOrder = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, ...orderData } = req.body;
    const newOrder = await Order({
      ...orderData,
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      paymentStatus: "completed"
    });
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email })
      .populate({
        path: 'productIds.book',
        select: 'title coverImage price author'
      })
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    return res.status(500).json({ message: "Failed to fetch order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'productIds.book',
        select: 'title coverImage price author'
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, note, trackingUrl } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update delivery status
    order.deliveryStatus = status;
    
    // Update tracking URL if provided
    if (trackingUrl !== undefined) {
      order.trackingUrl = trackingUrl;
    }
    
    // Add to delivery updates history
    order.deliveryUpdates.push({
      status,
      timestamp: new Date(),
      note: note || `Order ${status.replace(/_/g, ' ')}`
    });

    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating delivery status", error);
    return res.status(500).json({ message: "Failed to update delivery status" });
  }
};

const getDeliveryUpdates = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      currentStatus: order.deliveryStatus,
      updates: order.deliveryUpdates
    });
  } catch (error) {
    console.error("Error fetching delivery updates", error);
    return res.status(500).json({ message: "Failed to fetch delivery updates" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  createRazorpayOrder,
  getAllOrders,
  updateDeliveryStatus,
  getDeliveryUpdates
};
