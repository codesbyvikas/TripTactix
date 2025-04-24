const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser")
const checkForAuthCookie = require("./middlewares/auth");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
