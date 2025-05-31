// server/utils/generateTokens.js
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const generateAccessToken = (userId, role, profileId) => {
  return jwt.sign(
    { id: userId, role, profileId },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    }
  );
};

const generateRefreshToken = (userId, role, profileId) => {
  return jwt.sign(
    { id: userId, role, profileId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
