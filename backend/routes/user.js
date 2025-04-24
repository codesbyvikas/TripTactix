const { Router } = require("express");
const User = require("../models/user");

const router = Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const newUser = await User.create({ fullName, email, password });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Login route (API)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    res
      .status(200)
      .cookie("token", token)
      .json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Invalid email or password" });
  }
});



// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
