import mongoose from "mongoose";

// Define the Schedule schema
const scheduleSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  lectureName: {
    type: String,
    required: true,
  },
  courseLecturer: {
    type: String,
    required: true,
  },
  timeOfSubject: {
    type: String,
  },
  dayOfSubject: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create a Schedule model
const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
