const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const token = jwt.sign(
      { id: user._id, email, role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/update-password", authMiddleware, async (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: "Password is required" });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashed });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

module.exports = router;
