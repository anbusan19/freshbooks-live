const express = require('express');
const { createAOrder, getOrderByEmail, createRazorpayOrder, getAllOrders, updateDeliveryStatus, getDeliveryUpdates } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/create-razorpay-order", createRazorpayOrder);
router.post("/", createAOrder);

// get orders by user email 
router.get("/:email", getOrderByEmail);

// get all orders (admin)
router.get("/", getAllOrders);

// delivery status endpoints
router.put("/:orderId/delivery-status", updateDeliveryStatus);
router.get("/:orderId/delivery-updates", getDeliveryUpdates);

module.exports = router;