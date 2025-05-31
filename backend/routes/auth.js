// server/routes/authRoutes.js
const express = require("express");
const {
  signup,
  login,
  logout,
  refreshToken,
  getMe,
} = require("../controller/authController.js");
const { protect } = require("../middlewares/authMiddleware"); // Import the middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); // Logout can be public or private depending on how you handle client-side
router.post("/refresh-token", refreshToken);

// Protected route example
router.get("/me", protect, getMe);

module.exports = router;
