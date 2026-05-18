const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// auth routes
app.use("/api/auth", authRoutes);

// product routes
app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

// protected route
app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
