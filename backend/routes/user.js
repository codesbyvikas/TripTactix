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
  //  console.log(token);
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

//get user info
router.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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
