import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for the exam data
const examSchema = new Schema({
  uploaderName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  lectureName: {
    type: String,
    required: true,
  },
  examTime: {
    type: Date,
    required: true,
  },
  examDuration: {
    type: Number,
    required: true,
  },
  questions: [
    {
      type: String,
    },
  ],
  pdfUrls: [
    {
      type: String,
    },
  ],
});

// Create a model from the schema
const Exam = mongoose.model("Exam", examSchema);

export default Exam;
