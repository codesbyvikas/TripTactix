const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser")
const checkForAuthCookie = require("./middlewares/auth");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Allow requests from your React app
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
app.use(checkForAuthCookie("token"));
app.use('/user', userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/TripTactix")
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
