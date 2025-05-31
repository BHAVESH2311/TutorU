// server/models/Parent.js
const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
      unique: true, // Ensures a unique parent profile for each user
    },
    name: {
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // References the Student model
      },
    ],
    // Other parent-specific fields (e.g., contact preference)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", ParentSchema);
