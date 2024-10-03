import mongoose from "mongoose";

// Define the Course schema
const courseSchema = new mongoose.Schema({
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
  pdfUrls: {
    type: [String],
    default: [],
  },
  attendance: {
    type: [String],
    default: [],
  },
  vidUrl: {
    type: String,
    default: "",
    required: true,
  },
  timeOfSubject: {
    type: Date,
    default: Date.now,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create a Course model
const Class = mongoose.model("Class", courseSchema);

export default Class;
