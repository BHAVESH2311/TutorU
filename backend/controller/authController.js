// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/helper");
require("dotenv").config();

// Helper function to attach refresh token to cookie
const attachRefreshTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ), // e.g., 7 days
    sameSite: "Lax", // Protects against CSRF
    path: "/api/auth", // Only send cookie to auth endpoints
  };
  res.cookie("refreshToken", token, cookieOptions);
};

// @desc    Register a new user (Tutor, Student, Parent)
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { email, password, role, profileData } = req.body;

  // 1. Basic validation
  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Please enter all required fields: email, password, role.",
    });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }
  if (!["tutor", "student", "parent"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  try {
    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    // 5. Create specific profile based on role
    let profile;
    if (role === "tutor") {
      // Basic validation for tutor profile data
      if (
        !profileData ||
        !profileData.name ||
        !profileData.experience ||
        !profileData.qualification ||
        !profileData.gradesTaught ||
        !profileData.subjectsTaught
      ) {
        await User.findByIdAndDelete(user._id); // Rollback user creation
        return res.status(400).json({
          message:
            "Missing tutor profile data (name, experience, qualification, gradesTaught, subjectsTaught).",
        });
      }
      profile = new Tutor({
        userId: user._id,
        name: profileData.name,
        experience: profileData.experience,
        qualification: profileData.qualification,
        gradesTaught: profileData.gradesTaught,
        subjectsTaught: profileData.subjectsTaught,
        payoutType: profileData.payoutType || "session-wise", // Default if not provided
        partTimeBenchmark: profileData.partTimeBenchmark, // Only if part-time
      });
    } else if (role === "student") {
      if (
        !profileData ||
        !profileData.name ||
        !profileData.grade ||
        !profileData.board
      ) {
        await User.findByIdAndDelete(user._id); // Rollback user creation
        return res.status(400).json({
          message: "Missing student profile data (name, grade, board).",
        });
      }
      profile = new Student({
        userId: user._id,
        name: profileData.name,
        grade: profileData.grade,
        board: profileData.board,
        parentId: profileData.parentId, // Optional
      });
    } else if (role === "parent") {
      if (!profileData || !profileData.name) {
        await User.findByIdAndDelete(user._id); // Rollback user creation
        return res
          .status(400)
          .json({ message: "Missing parent profile data (name)." });
      }
      profile = new Parent({
        userId: user._id,
        name: profileData.name,
        children: profileData.children || [], // Optional
      });
    } else {
      // This case should ideally be caught by initial role validation
      await User.findByIdAndDelete(user._id); // Rollback
      return res
        .status(400)
        .json({ message: "Invalid role specified for profile creation." });
    }

    await profile.save();

    // 6. Update User with profileId
    user.profileId = profile._id;
    await user.save();

    // 7. Generate Tokens
    const accessToken = generateAccessToken(user._id, user.role, profile._id);
    const refreshToken = generateRefreshToken(user._id, user.role, profile._id);

    // 8. Attach refresh token as HttpOnly cookie
    attachRefreshTokenCookie(res, refreshToken);

    // 9. Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profileId: user.profileId,
      },
      accessToken: accessToken,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN, // Inform client about expiry
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter email and password." });
  }

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // 3. Generate Tokens
    const accessToken = generateAccessToken(
      user._id,
      user.role,
      user.profileId
    );
    const refreshToken = generateRefreshToken(
      user._id,
      user.role,
      user.profileId
    );

    // 4. Attach refresh token as HttpOnly cookie
    attachRefreshTokenCookie(res, refreshToken);

    // 5. Send response
    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profileId: user.profileId,
      },
      accessToken: accessToken,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};

// @desc    Log out user / Clear cookie
// @route   POST /api/auth/logout
// @access  Private (or public depending on desired behavior)
exports.logout = (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/api/auth",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Refresh Access Token using Refresh Token
// @route   POST /api/auth/refresh-token
// @access  Public (uses refresh token from cookie)
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided." });
  }

  try {
    // 1. Verify Refresh Token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // 2. Find the user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token, user not found." });
    }

    // 3. Generate NEW Access and Refresh Tokens
    const newAccessToken = generateAccessToken(
      user._id,
      user.role,
      user.profileId
    );
    const newRefreshToken = generateRefreshToken(
      user._id,
      user.role,
      user.profileId
    );

    // 4. Attach NEW refresh token as HttpOnly cookie
    attachRefreshTokenCookie(res, newRefreshToken);

    // 5. Send new Access Token
    res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    // Clear cookie if token is invalid or expired
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/api/auth",
    });
    return res.status(401).json({
      message: "Invalid or expired refresh token. Please log in again.",
    });
  }
};

// @desc    Get current user profile (for testing auth middleware)
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  // req.user is populated by the protect middleware
  let profileDetails = null;

  if (req.user.role === "tutor") {
    profileDetails = await Tutor.findById(req.user.profileId).select(
      "-userId -__v"
    );
  } else if (req.user.role === "student") {
    profileDetails = await Student.findById(req.user.profileId).select(
      "-userId -__v"
    );
  } else if (req.user.role === "parent") {
    profileDetails = await Parent.findById(req.user.profileId).select(
      "-userId -__v"
    );
  }

  res.status(200).json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      profileId: req.user.profileId,
    },
    profile: profileDetails,
  });
};
