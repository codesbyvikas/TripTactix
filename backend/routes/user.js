const { Router } = require("express");
const User = require("../models/user");
const checkForAuthCookie = require("../middlewares/auth");

const router = Router();

// Public routes (no auth required)
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
  console.log("Login request body:", req.body); // For debugging
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("Token generated successfully"); // For debugging
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,       
        sameSite: "lax",      
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
  res.status(200).json({ message: "Logged out" });
});

// Protected routes (auth required)
// Apply auth middleware to the profile route specifically
router.get("/profile", checkForAuthCookie("token"), async (req, res) => {
  // req.user will be available here because of the middleware
  try {
    const user = await User.findById(req.user._id).select("-password"); // Don't return password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;