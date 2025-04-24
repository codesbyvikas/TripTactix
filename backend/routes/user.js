const { Router } = require("express");
const User = require("../models/user");

const router = Router();


router.post("/signup", async (req, res) => {
  console.log("Incoming body:", req.body); // 👈 add this

  const { fullName, email, password } = req.body;

  try {
    const newUser = await User.create({ fullName, email, password });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
