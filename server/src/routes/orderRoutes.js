const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createOrder,
  getUserOrders,
} = require("../controllers/orderController");

const router = express.Router();

// Place Order
router.post("/", protect, createOrder);

// Get My Orders
router.get("/my-orders", protect, getUserOrders);

module.exports = router;
