require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const plannerRoutes = require("./routes/planner");
const cookieParser = require("cookie-parser")
const checkForAuthCookie = require("./middlewares/auth");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:3000",
    "https://trip-tactix-two.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use(checkForAuthCookie("token"));

// Apply routes WITHOUT global auth middleware
app.use('/user', userRoutes);

// Apply auth middleware ONLY to protected routes
app.use('/plan', checkForAuthCookie("token"), plannerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");

    console.log("📦 Using database:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.get("/health", (req, res) => {
  res.send("Backend is running!");
});