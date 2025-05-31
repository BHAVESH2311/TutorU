// server/models/Tutor.js
const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
      unique: true, // Ensures a unique tutor profile for each user
    },
    name: {
      type: String,
      required: [true, "Tutor name is required"],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },
    gradesTaught: {
      type: [String], // e.g., ['Grade 5', 'Grade 10', '12th']
      required: [true, "Grades taught are required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one grade must be specified.",
      },
    },
    subjectsTaught: {
      type: [String], // e.g., ['Math', 'Science', 'Physics']
      required: [true, "Subjects taught are required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one subject must be specified.",
      },
    },
    payoutType: {
      type: String,
      enum: ["session-wise", "part-time"],
      required: [true, "Payout type is required"],
      default: "session-wise",
    },
    partTimeBenchmark: {
      type: Number, // Percentage, e.g., 80 for 80% attendance benchmark
      min: [0, "Benchmark cannot be negative"],
      max: [100, "Benchmark cannot exceed 100"],
      required: function () {
        return this.payoutType === "part-time";
      }, // Only required if payoutType is 'part-time'
    },
    // Other tutor-specific fields can be added here (e.g., bio, profile picture, availability)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutor", TutorSchema);
