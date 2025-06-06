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
    "http://localhost:5173",    // For local development
    "http://localhost:3000",    // Alternative local port
    "https://your-actual-frontend-domain.com" // Replace with your actual production domain when you deploy frontend
  ], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Remove the global auth middleware
// app.use(checkForAuthCookie("token")); // ❌ This was the problem!

// Apply routes WITHOUT global auth middleware
app.use('/user', userRoutes);

// Apply auth middleware ONLY to protected routes
app.use('/plan', checkForAuthCookie("token"), plannerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");

    // Log the name of the connected database
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