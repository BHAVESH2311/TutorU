// server/models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
      unique: true, // Ensures a unique student profile for each user
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    grade: {
      type: String, // Or Number, depending on how you define grades (e.g., "10th", "Grade 5", 10)
      required: [true, "Grade is required"],
      trim: true,
    },
    board: {
      type: String, // e.g., "CBSE", "ICSE", "State Board"
      required: [true, "Board is required"],
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent", // References the Parent model if applicable
      required: false, // A student might not have a parent associated in the system if they are adult
    },
    schoolExamTimetable: [
      {
        // Array to store multiple timetables or updates
        date: { type: Date, required: true },
        subject: { type: String, required: true },
        description: { type: String, trim: true },
        fileUrl: { type: String }, // URL to uploaded timetable document/image
      },
    ],
    vacations: [
      {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        reason: { type: String, trim: true },
      },
    ],
    // Other student-specific fields (e.g., guardian contact, school name)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
