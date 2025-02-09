const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const { createAOrder, getOrderByEmail, createRazorpayOrder } = require("../orders/order.controller");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found!" }); // Add return here
    }
    if (admin.password !== password) {
      return res.status(401).send({ message: "Invalid password!" }); // Add return here
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin", error);
    return res.status(500).send({ message: "Failed to login as admin" }); // Use 500 for server errors
  }
});

router.post("/orders/create-razorpay-order", createRazorpayOrder);
router.post("/orders", createAOrder);
router.get("/orders/:email", getOrderByEmail);

module.exports = router;
