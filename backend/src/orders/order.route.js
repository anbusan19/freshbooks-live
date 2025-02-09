const express = require('express');
const { createAOrder, getOrderByEmail, createRazorpayOrder } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/create-razorpay-order", createRazorpayOrder);
router.post("/", createAOrder);

// get orders by user email 
router.get("/:email", getOrderByEmail);

module.exports = router;