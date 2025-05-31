// server/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email regex
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["admin", "tutor", "student", "parent"], // Defines allowed roles
    },
    // This field will store a reference to the specific profile document
    // (Tutor, Student, or Parent) based on the user's role.
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role", // Dynamically references the collection based on the 'role' field
      required: false, // Not required for Admin initially, or until a profile is created
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Mongoose adds createdAt and updatedAt automatically

module.exports = mongoose.model("User", UserSchema);
