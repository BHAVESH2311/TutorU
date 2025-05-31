// server/models/Session.js
const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: [true, "Tutor ID is required"],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    grade: {
      type: String, // Consistent with Student model
      required: [true, "Grade is required"],
      trim: true,
    },
    board: {
      type: String, // Consistent with Student model
      required: [true, "Board is required"],
      trim: true,
    },
    scheduledTime: {
      type: Date,
      required: [true, "Scheduled time is required"],
    },
    actualStartTime: {
      type: Date,
      required: false, // Becomes required when attendance is punched in
    },
    actualEndTime: {
      type: Date,
      required: false, // Becomes required when attendance is punched out
    },
    status: {
      type: String,
      enum: [
        "scheduled",
        "completed",
        "cancelled",
        "rescheduled",
        "pending_reschedule",
        "pending_cancellation",
      ],
      default: "scheduled",
      required: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
      required: function () {
        return this.status === "cancelled";
      },
    },
    cancelledBy: {
      type: String,
      enum: ["tutor", "student", "parent", "admin"],
      required: function () {
        return this.status === "cancelled";
      },
    },
    rescheduleRequests: [
      {
        // Array to track reschedule attempts and approvals
        requestedBy: {
          type: String,
          enum: ["tutor", "student", "parent"],
          required: true,
        },
        newTime: { type: Date, required: true },
        reason: { type: String, trim: true },
        requestDate: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
    tutorRatingAttentiveness: {
      type: Number, // 1-5 scale
      min: 1,
      max: 5,
      required: false, // Only set after session completion and rating
    },
    studentRatingTeaching: {
      type: Number, // 1-5 scale
      min: 1,
      max: 5,
      required: false, // Only set after session completion and rating
    },
    payoutCalculated: {
      type: Boolean,
      default: false,
    },
    payoutAmount: {
      type: Number,
      required: function () {
        return this.payoutCalculated;
      },
    },
    // Field to track changes allowed per month (can be calculated dynamically or stored for simplicity)
    // For simplicity, this might be handled by an API route that queries past sessions.
    // However, if you need to enforce client-side limits directly, a counter could be here.
    // e.g., monthlyChangesCount: { type: Number, default: 0 } - (would need monthly reset logic)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", SessionSchema);
