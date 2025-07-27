const { Router } = require("express");
const User = require("../models/user");
const checkForAuthCookie = require("../middlewares/auth");

const router = Router();


router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const newUser = await User.create({ fullName, email, password });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("Token generated successfully"); 
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,       
        sameSite: "None",      
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Invalid email or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.status(200).json({ message: "Logged out" });
});


router.get("/profile", checkForAuthCookie("token"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); 
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