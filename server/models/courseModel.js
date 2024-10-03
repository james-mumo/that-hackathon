import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseType: {
    type: String,
    enum: ["coursework", "study"],
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  uploaderName: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
    enum: ["video", "pdf"],
    required: true,
  },
  dateUploaded: {
    type: Date,
    default: Date.now,
  },
});

const CourseModel = mongoose.model("CourseMaterial", CourseSchema);

export default CourseModel;
