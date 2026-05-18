const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

module.exports = router;
