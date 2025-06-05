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
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(checkForAuthCookie("token"));
app.use('/user', userRoutes);
app.use('/plan', plannerRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
