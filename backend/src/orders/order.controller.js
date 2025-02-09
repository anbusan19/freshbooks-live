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
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    return res.status(500).json({ message: "Failed to fetch order" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  createRazorpayOrder
};
